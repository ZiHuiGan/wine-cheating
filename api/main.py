"""
Wine Label Analyst API
FastAPI backend — deploy on Render or Railway
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from api.models.wine import LabelParseRequest, WineAnalysis
from api.services.label_reader import parse_label
from api.services.wine_analyst import analyze_wine

app = FastAPI(
    title="Wine Label Analyst",
    description="Decode California wine labels: region × producer × vintage × grape",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten in production to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/analyze", response_model=WineAnalysis)
def analyze(request: LabelParseRequest) -> WineAnalysis:
    """
    Main endpoint. Accepts a wine label as:
    - image_base64: base64-encoded image string
    - image_url: publicly accessible image URL
    - raw_text: manually typed label text (fallback)

    Returns a full WineAnalysis with terroir narrative, vintage note,
    grape profile, region profile, and buying guidance.
    """
    if not any([request.image_base64, request.image_url, request.raw_text]):
        raise HTTPException(
            status_code=400,
            detail="Provide one of: image_base64, image_url, or raw_text",
        )

    try:
        parsed = parse_label(
            image_base64=request.image_base64,
            image_url=request.image_url,
            raw_text=request.raw_text,
        )
    except Exception as e:
        raise HTTPException(status_code=422, detail=f"Label parsing failed: {e}")

    try:
        analysis = analyze_wine(parsed)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {e}")

    return analysis


@app.get("/regions")
def list_regions():
    """List all supported California AVAs with their profiles."""
    from api.data.california_avas import CALIFORNIA_AVAS
    return {
        "count": len(CALIFORNIA_AVAS),
        "regions": [
            {"key": k, "name": v["name"], "parent": v.get("parent_ava"), "key_grapes": v["key_grapes"]}
            for k, v in CALIFORNIA_AVAS.items()
        ],
    }


@app.get("/regions/{region_key}")
def get_region(region_key: str):
    """Full profile for a specific AVA."""
    from api.data.california_avas import CALIFORNIA_AVAS, find_ava
    ava = find_ava(region_key)
    if not ava:
        raise HTTPException(status_code=404, detail=f"Region '{region_key}' not found")
    return ava


@app.get("/grapes")
def list_grapes():
    """List all supported grape variety profiles."""
    from api.data.grape_profiles import GRAPE_PROFILES
    return {
        "count": len(GRAPE_PROFILES),
        "grapes": [
            {"variety": v["variety"], "skin_color": v["skin_color"]}
            for v in GRAPE_PROFILES.values()
        ],
    }


@app.get("/grapes/{variety}")
def get_grape(variety: str):
    """Full profile for a grape variety."""
    from api.data.grape_profiles import find_grape
    grape = find_grape(variety)
    if not grape:
        raise HTTPException(status_code=404, detail=f"Grape '{variety}' not found")
    return grape


@app.get("/vintages/{region}/{year}")
def get_vintage(region: str, year: int):
    """Vintage note for a region + year."""
    from api.data.vintage_notes import get_vintage_note
    note = get_vintage_note(region, year)
    if not note:
        raise HTTPException(
            status_code=404,
            detail=f"No vintage data for {region} {year}. Covered: Napa 1994-2023, Sonoma/Central Coast key years.",
        )
    return {"region": region, "year": year, **note}
