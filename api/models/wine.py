from pydantic import BaseModel
from typing import Optional


class LabelParseRequest(BaseModel):
    image_base64: Optional[str] = None
    image_url: Optional[str] = None
    raw_text: Optional[str] = None  # fallback: user types the label manually


class ParsedLabel(BaseModel):
    winery: Optional[str] = None
    wine_name: Optional[str] = None
    vintage: Optional[int] = None
    grape_variety: Optional[str] = None          # e.g. "Cabernet Sauvignon"
    appellation: Optional[str] = None            # e.g. "Napa Valley", "Oakville"
    alcohol_pct: Optional[float] = None
    estate_bottled: Optional[bool] = None
    reserve: Optional[bool] = None
    raw_label_text: Optional[str] = None         # full extracted text


class RegionProfile(BaseModel):
    name: str
    parent_ava: Optional[str]
    climate_type: str                            # e.g. "maritime", "continental"
    soil_types: list[str]
    key_grapes: list[str]
    climate_summary: str
    known_for: str


class ProducerProfile(BaseModel):
    name: str
    founded: Optional[int]
    region: str
    philosophy: str                              # winemaking style/philosophy
    tier: str                                    # "boutique", "mid-size", "large estate"
    known_wines: list[str]


class VintageNote(BaseModel):
    year: int
    region: str
    rating: str                                  # "exceptional", "good", "average", "challenging"
    weather_summary: str
    aging_potential: str


class GrapeProfile(BaseModel):
    variety: str
    skin_color: str                              # "red", "white"
    california_character: str                    # how it expresses in CA specifically
    flavor_profile: list[str]
    structure: str                               # tannin, acid, body description
    food_pairings: list[str]
    peak_drinking_window: str                    # e.g. "5-15 years from vintage"


class WineAnalysis(BaseModel):
    parsed_label: ParsedLabel
    region_profile: Optional[RegionProfile]
    producer_profile: Optional[ProducerProfile]
    vintage_note: Optional[VintageNote]
    grape_profile: Optional[GrapeProfile]
    terroir_narrative: str      # the synthesized story: how all 4 factors shape THIS bottle
    buying_guidance: str        # drink now vs cellar, value assessment
    geek_notes: str             # deep cuts: clonal selection, oak regime, elevation, etc.
    confidence: str             # "high" / "medium" / "low" based on label clarity
