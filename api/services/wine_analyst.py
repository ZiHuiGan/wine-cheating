"""
Wine analyst: synthesizes region + producer + vintage + grape into a narrative.
Uses local knowledge base first, then Claude for the synthesis layer.
"""

import anthropic

from api.models.wine import (
    ParsedLabel,
    RegionProfile,
    ProducerProfile,
    VintageNote,
    GrapeProfile,
    WineAnalysis,
)
from api.data.california_avas import find_ava
from api.data.vintage_notes import get_vintage_note
from api.data.grape_profiles import find_grape


def _build_region_profile(appellation: str | None) -> RegionProfile | None:
    if not appellation:
        return None
    ava = find_ava(appellation)
    if not ava:
        return None
    return RegionProfile(**ava)


def _build_vintage_note(appellation: str | None, vintage: int | None) -> VintageNote | None:
    if not appellation or not vintage:
        return None
    note = get_vintage_note(appellation, vintage)
    if not note:
        return None
    return VintageNote(
        year=vintage,
        region=appellation,
        rating=note["rating"],
        weather_summary=note["weather_summary"],
        aging_potential=note["aging_potential"],
    )


def _build_grape_profile(grape_variety: str | None) -> GrapeProfile | None:
    if not grape_variety:
        return None
    grape = find_grape(grape_variety)
    if not grape:
        return None
    return GrapeProfile(
        variety=grape["variety"],
        skin_color=grape["skin_color"],
        california_character=grape["california_character"],
        flavor_profile=grape["flavor_profile"],
        structure=grape["structure"],
        food_pairings=grape["food_pairings"],
        peak_drinking_window=grape["peak_drinking_window"],
    )


SYNTHESIS_PROMPT = """You are a master sommelier and wine educator. Given the following data about a California wine,
write three sections:

1. TERROIR_NARRATIVE (3-4 sentences): How do the region, producer tier, vintage conditions, and grape variety
   interact to shape THIS specific bottle? Be specific, educational, and geek-level. Mention what makes this
   combination unique or notable. Avoid generic descriptions.

2. BUYING_GUIDANCE (2-3 sentences): Should the buyer drink it now or cellar it? Is it good value?
   Any caveats (e.g., smoke taint years, stylistic polarization)?

3. GEEK_NOTES (2-3 sentences): Deep-cut knowledge: clonal selections, soil specifics, producer philosophy,
   historical context, how this wine fits in the California wine canon. The stuff a Vivino scan won't tell you.

Wine data:
{wine_data}

Return ONLY valid JSON:
{{
  "terroir_narrative": "...",
  "buying_guidance": "...",
  "geek_notes": "..."
}}"""


def analyze_wine(parsed_label: ParsedLabel) -> WineAnalysis:
    region_profile = _build_region_profile(parsed_label.appellation)
    vintage_note = _build_vintage_note(parsed_label.appellation, parsed_label.vintage)
    grape_profile = _build_grape_profile(parsed_label.grape_variety)

    # Build context for Claude synthesis
    wine_data_parts = []

    if parsed_label.winery:
        wine_data_parts.append(f"Winery: {parsed_label.winery}")
    if parsed_label.wine_name:
        wine_data_parts.append(f"Wine name/tier: {parsed_label.wine_name}")
    if parsed_label.vintage:
        wine_data_parts.append(f"Vintage: {parsed_label.vintage}")
    if parsed_label.grape_variety:
        wine_data_parts.append(f"Grape: {parsed_label.grape_variety}")
    if parsed_label.appellation:
        wine_data_parts.append(f"Appellation: {parsed_label.appellation}")
    if parsed_label.alcohol_pct:
        wine_data_parts.append(f"Alcohol: {parsed_label.alcohol_pct}%")
    if parsed_label.estate_bottled:
        wine_data_parts.append("Estate bottled: Yes")
    if parsed_label.reserve:
        wine_data_parts.append("Reserve: Yes")

    if region_profile:
        wine_data_parts.append(f"\nRegion profile: {region_profile.known_for}")
        wine_data_parts.append(f"Climate: {region_profile.climate_summary}")

    if vintage_note:
        wine_data_parts.append(f"\nVintage {vintage_note.year}: {vintage_note.rating.upper()}")
        wine_data_parts.append(f"Weather: {vintage_note.weather_summary}")
        wine_data_parts.append(f"Character: {vintage_note.character}")
        wine_data_parts.append(f"Aging potential: {vintage_note.aging_potential}")

    if grape_profile:
        wine_data_parts.append(f"\nGrape: {grape_profile.california_character}")
        wine_data_parts.append(f"Structure: {grape_profile.structure}")

    wine_data = "\n".join(wine_data_parts)

    # determine confidence
    filled = sum([
        bool(parsed_label.winery),
        bool(parsed_label.vintage),
        bool(parsed_label.grape_variety),
        bool(parsed_label.appellation),
    ])
    confidence = "high" if filled >= 3 else ("medium" if filled >= 2 else "low")

    # synthesize with Claude
    client = anthropic.Anthropic()
    message = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=1024,
        messages=[
            {
                "role": "user",
                "content": SYNTHESIS_PROMPT.format(wine_data=wine_data),
            }
        ],
    )

    import json
    import re
    content = message.content[0].text
    content = re.sub(r"```json\s*", "", content)
    content = re.sub(r"```\s*", "", content)
    content = content.strip()
    synthesis = json.loads(content)

    # Build producer profile stub (placeholder — future: producer DB lookup)
    producer_profile: ProducerProfile | None = None
    if parsed_label.winery:
        producer_profile = ProducerProfile(
            name=parsed_label.winery,
            founded=None,
            region=parsed_label.appellation or "California",
            philosophy="See geek notes for producer context.",
            tier="unknown",
            known_wines=[parsed_label.wine_name] if parsed_label.wine_name else [],
        )

    return WineAnalysis(
        parsed_label=parsed_label,
        region_profile=region_profile,
        producer_profile=producer_profile,
        vintage_note=vintage_note,
        grape_profile=grape_profile,
        terroir_narrative=synthesis["terroir_narrative"],
        buying_guidance=synthesis["buying_guidance"],
        geek_notes=synthesis["geek_notes"],
        confidence=confidence,
    )
