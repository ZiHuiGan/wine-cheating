"""
California vintage quality notes — Napa and Sonoma focus.
Each entry captures the weather story and what it means for the wine in the glass.
"""

VINTAGE_NOTES: dict[str, dict[int, dict]] = {
    "napa valley": {
        2023: {
            "rating": "very good",
            "weather_summary": (
                "Record atmospheric rivers flooded the valley in January. "
                "Cool, wet spring delayed bud break. Long, even summer with no heat spikes. "
                "Harvest pushed into October — one of the latest on record."
            ),
            "character": "High natural acidity, good structure, elegant rather than opulent. Lower alcohol.",
            "aging_potential": "8-18 years",
        },
        2022: {
            "rating": "exceptional",
            "weather_summary": (
                "Near-perfect growing season. Mild winter, dry spring, moderate summer. "
                "No significant heat events. Extended hang time through September. "
                "Early October harvest under ideal conditions."
            ),
            "character": "Classic, balanced Napa: ripe dark fruit, firm tannins, integrated acid. Benchmark vintage.",
            "aging_potential": "15-30 years",
        },
        2021: {
            "rating": "very good to excellent",
            "weather_summary": (
                "Third year of drought. Low yields concentrated flavors. "
                "Some smoke exposure from Caldor and Dixie fires (less impact than 2020). "
                "Warm, early harvest."
            ),
            "character": "Concentrated, powerful, rich. Best examples have focus; watch for over-ripe on lesser sites.",
            "aging_potential": "12-25 years",
        },
        2020: {
            "rating": "good (uneven)",
            "weather_summary": (
                "The Glass Fire burned ~1,500 acres in Napa during harvest. "
                "Significant smoke taint affected many wines. "
                "Pre-fire fruit picked early was excellent; post-fire fruit variable."
            ),
            "character": "Highly variable. Some exceptional wines from fruit picked before fires; others show smoke. Caveat emptor.",
            "aging_potential": "varies — 5-20 years",
        },
        2019: {
            "rating": "excellent",
            "weather_summary": (
                "Cool, wet winter replenished aquifers. "
                "Mild summer with good hang time. "
                "Late-season warmth brought fruit to full ripeness. Perfect harvest conditions."
            ),
            "character": "Structured, balanced, classic. Arguably the best since 2013. Full flavors with natural acidity.",
            "aging_potential": "15-30 years",
        },
        2018: {
            "rating": "very good",
            "weather_summary": (
                "Early bud break. August heat spike stressed some vines. "
                "Cooler September allowed recovery. "
                "Large crop of high quality."
            ),
            "character": "Generous, approachable Cab. Rich fruit, plush tannins. Earlier drinking style.",
            "aging_potential": "10-20 years",
        },
        2017: {
            "rating": "good to very good (smoke taint risk)",
            "weather_summary": (
                "Exceptional growing conditions until October. "
                "Atlas Peak and Tubbs Fires burned during harvest. "
                "Fruit harvested pre-fire is excellent; late-harvest wines potentially smoky."
            ),
            "character": "Two-tiered vintage. Pre-fire: excellent. Post-fire: check carefully.",
            "aging_potential": "10-20 years (best examples)",
        },
        2016: {
            "rating": "excellent",
            "weather_summary": (
                "Third dry year but with good winter rain. "
                "Even, warm growing season. No extreme heat. "
                "Ideal September conditions. Small berries, concentrated wines."
            ),
            "character": "Opulent, powerful, concentrated. Classic California style with depth and longevity.",
            "aging_potential": "15-30 years",
        },
        2015: {
            "rating": "very good to excellent",
            "weather_summary": (
                "Drought-stressed vines, small yields. Very warm year. "
                "High sugars at harvest, alcohol can be elevated. "
                "Best producers managed through careful canopy work."
            ),
            "character": "Ripe, full-bodied, generous. Lower acidity than ideal but hedonistic and crowd-pleasing.",
            "aging_potential": "10-20 years",
        },
        2014: {
            "rating": "excellent",
            "weather_summary": (
                "Warm, dry, early vintage. Harvest started in August. "
                "Consistent quality across the valley. "
                "August 24 earthquake (6.0) added excitement."
            ),
            "character": "Ripe, lush, accessible early. Great immediate pleasure; solid agers.",
            "aging_potential": "12-22 years",
        },
        2013: {
            "rating": "exceptional",
            "weather_summary": (
                "Cool, wet winter. Perfect spring. "
                "Long, warm growing season without extreme events. "
                "Classic September harvest. Near-perfect conditions all year."
            ),
            "character": "Possibly the best Napa vintage since 1994. Power and elegance together. Remarkable balance.",
            "aging_potential": "20-35 years",
        },
        2012: {
            "rating": "very good",
            "weather_summary": (
                "Average to above-average. Some spring frost. "
                "Good summer, warm fall. Solid all-around vintage."
            ),
            "character": "Classic, well-structured. Good fruit and acid balance.",
            "aging_potential": "12-20 years",
        },
        2010: {
            "rating": "excellent",
            "weather_summary": (
                "Cool, long vintage. Wet spring, cool summer delayed ripening. "
                "Extended hang time produced elegant wines with natural acidity."
            ),
            "character": "More European in style: higher acid, refined tannins, lower alcohol. Outstanding agers.",
            "aging_potential": "15-30 years",
        },
        2007: {
            "rating": "exceptional",
            "weather_summary": (
                "Warm, dry year. Near-ideal conditions. "
                "Some of the greatest Napa Cabs ever produced."
            ),
            "character": "Powerful, opulent, concentrated. The definition of 'classic California'. Massive agers.",
            "aging_potential": "20-40 years",
        },
        2002: {
            "rating": "very good",
            "weather_summary": "Good growing conditions, some rain at harvest but generally clean fruit.",
            "character": "Balanced, medium-weight, approachable.",
            "aging_potential": "10-20 years",
        },
        1997: {
            "rating": "legendary",
            "weather_summary": (
                "El Niño winter but superb growing season. "
                "The vintage that put Napa Cab on the global luxury map."
            ),
            "character": "Massive, opulent, hedonistic. Parker's 'vintage of the century' for Napa.",
            "aging_potential": "25-50 years (still evolving)",
        },
        1994: {
            "rating": "exceptional",
            "weather_summary": (
                "Long, even growing season. Classic structure and ripeness together. "
                "Benchmark Napa vintage."
            ),
            "character": "Elegant and powerful. Many wines still drinking beautifully today.",
            "aging_potential": "20-40 years (drinking well now)",
        },
    },
    "sonoma county": {
        2022: {
            "rating": "excellent",
            "weather_summary": "Near-perfect season. Extended cool period ideal for Pinot Noir complexity.",
            "character": "Elegant, structured Pinot with great balance. Russian River Valley shines.",
            "aging_potential": "8-15 years",
        },
        2021: {
            "rating": "very good",
            "weather_summary": "Drought year. Concentrated fruit. Some smoke but less than 2020.",
            "character": "Rich, dense. Lower yields improved quality on most estates.",
            "aging_potential": "8-15 years",
        },
        2019: {
            "rating": "excellent",
            "weather_summary": "Classic cool season. Extended hang time. Textbook Russian River conditions.",
            "character": "Benchmark Russian River Pinot: red cherry, cola, silky tannins.",
            "aging_potential": "10-18 years",
        },
        2016: {
            "rating": "exceptional",
            "weather_summary": "Small crop, concentrated. Ideal weather throughout.",
            "character": "Profound Pinot Noir across Sonoma. Deep, structured, age-worthy.",
            "aging_potential": "12-20 years",
        },
    },
    "central coast": {
        2022: {
            "rating": "excellent",
            "weather_summary": "Long, cool season with good hang time. Ideal for Sta. Rita Hills Pinot.",
            "character": "Vibrant, energetic wines. High acid, precise fruit.",
            "aging_potential": "8-15 years",
        },
        2019: {
            "rating": "very good",
            "weather_summary": "Cool growing season. Paso Robles benefited from dry, warm fall.",
            "character": "Paso: bold Zin and Rhônes. Santa Barbara: refined Pinot.",
            "aging_potential": "8-18 years",
        },
    },
}


def get_vintage_note(region: str, year: int) -> dict | None:
    """Return vintage note for region + year, with fallback to parent region."""
    region_lower = region.lower()
    # direct match
    for key, vintages in VINTAGE_NOTES.items():
        if key in region_lower or region_lower in key:
            if year in vintages:
                return vintages[year]
    # fallback: if region contains "napa" -> use napa valley
    if "napa" in region_lower:
        return VINTAGE_NOTES["napa valley"].get(year)
    if "sonoma" in region_lower or "russian river" in region_lower:
        return VINTAGE_NOTES["sonoma county"].get(year)
    if "santa barbara" in region_lower or "sta. rita" in region_lower or "santa rita" in region_lower:
        return VINTAGE_NOTES["central coast"].get(year)
    return None
