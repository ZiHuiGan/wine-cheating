"""
California AVA (American Viticultural Area) knowledge base.
Covers major appellations with terroir details relevant to wine character.
"""

CALIFORNIA_AVAS: dict = {
    # ── NAPA VALLEY ──────────────────────────────────────────────────────────
    "napa valley": {
        "name": "Napa Valley",
        "parent_ava": None,
        "climate_type": "Mediterranean with cooling marine influence",
        "soil_types": ["alluvial loam", "volcanic", "clay", "gravelly loam"],
        "key_grapes": ["Cabernet Sauvignon", "Merlot", "Chardonnay", "Sauvignon Blanc", "Zinfandel"],
        "climate_summary": (
            "Hot days with afternoon cooling from San Pablo Bay fog. "
            "Valley floor averages 15°F warmer than hillside sites. "
            "Long dry growing season with ~25 inches of rain, almost all in winter."
        ),
        "known_for": (
            "World-class Cabernet Sauvignon. Structured, age-worthy reds with ripe dark fruit, "
            "cassis, cedar, and firm tannins. The benchmark for American fine wine."
        ),
    },
    "oakville": {
        "name": "Oakville",
        "parent_ava": "Napa Valley",
        "climate_type": "Warm days, cool nights, moderate bay influence",
        "soil_types": ["gravelly loam (Bale series)", "well-drained alluvial"],
        "key_grapes": ["Cabernet Sauvignon", "Merlot", "Cabernet Franc"],
        "climate_summary": (
            "Considered Napa's 'golden mile'. Sits mid-valley with benchmark Cabernet terroir. "
            "Gravelly soils force vine stress, concentrating flavors."
        ),
        "known_for": (
            "Home to Opus One, Harlan Estate, Robert Mondavi To Kalon. "
            "Polished, structured Cab with blackcurrant, graphite, and tobacco. Archetypal Napa."
        ),
    },
    "rutherford": {
        "name": "Rutherford",
        "parent_ava": "Napa Valley",
        "climate_type": "Warm continental, slightly warmer than Oakville",
        "soil_types": ["Bale gravelly loam", "deep alluvial benchland"],
        "key_grapes": ["Cabernet Sauvignon", "Merlot"],
        "climate_summary": (
            "Famous for 'Rutherford Dust' — a savory, earthy mid-palate quality. "
            "Benchland vineyards produce the most distinctive terroir expression."
        ),
        "known_for": (
            "Inglenook, Beaulieu Vineyard, Frog's Leap. "
            "'Rutherford dust' gives wines a unique mineral, dusty tannin texture alongside ripe fruit."
        ),
    },
    "stags leap district": {
        "name": "Stags Leap District",
        "parent_ava": "Napa Valley",
        "climate_type": "Coolest Napa valley floor, afternoon wind tunnel from bay",
        "soil_types": ["volcanic tuff", "loam over volcanic ash"],
        "key_grapes": ["Cabernet Sauvignon", "Merlot", "Petite Sirah"],
        "climate_summary": (
            "The 'Silverado Bench' area benefits from afternoon cooling winds. "
            "Volcanic soils give distinctive iron/mineral notes."
        ),
        "known_for": (
            "Site of the 1976 Paris Tasting winner (Stag's Leap Wine Cellars S.L.V.). "
            "Elegant, silky Cab: red fruit, iron, cedar. More refined than southern Napa."
        ),
    },
    "mount veeder": {
        "name": "Mount Veeder",
        "parent_ava": "Napa Valley",
        "climate_type": "Cool, high-elevation, fog-free above inversion layer",
        "soil_types": ["rocky volcanic", "thin clay-loam", "shale"],
        "key_grapes": ["Cabernet Sauvignon", "Zinfandel", "Chardonnay"],
        "climate_summary": (
            "Elevations 400–2,677 ft. Above morning fog but exposed to cooling Pacific air. "
            "Low-vigor soils yield small berries with concentrated flavors."
        ),
        "known_for": (
            "Austere, structured mountain Cab. High acidity, firm tannins, dark fruit. "
            "Requires longer aging but exceptional longevity (20+ years)."
        ),
    },
    "spring mountain district": {
        "name": "Spring Mountain District",
        "parent_ava": "Napa Valley",
        "climate_type": "Cool mountain, above fog line, diurnal range 40-50°F",
        "soil_types": ["volcanic", "rocky clay-loam", "shale"],
        "key_grapes": ["Cabernet Sauvignon", "Merlot", "Cabernet Franc", "Chardonnay"],
        "climate_summary": (
            "West-facing slopes above Napa town. Cool Pacific air, high diurnal range preserves acidity. "
            "Springs and streams provide natural irrigation."
        ),
        "known_for": (
            "Dramatic, tannic, structured Cabernet. Terra Valentine, Pride Mountain, Smith-Madrone. "
            "Mountain character with great aging potential."
        ),
    },
    "howell mountain": {
        "name": "Howell Mountain",
        "parent_ava": "Napa Valley",
        "climate_type": "High elevation, above fog, intense sun, cool nights",
        "soil_types": ["volcanic ash (Aiken loam)", "thin rocky soils"],
        "key_grapes": ["Zinfandel", "Cabernet Sauvignon", "Merlot", "Petite Sirah"],
        "climate_summary": (
            "First AVA above the fog line (1,400 ft minimum). Intense UV, cool nights. "
            "Thin soils force vine stress."
        ),
        "known_for": (
            "Ladera, La Jota, Dunn Vineyards. "
            "Big, tannic, dense mountain Zinfandel and Cabernet. "
            "Slow to develop but exceptional 25+ year agers."
        ),
    },
    "atlas peak": {
        "name": "Atlas Peak",
        "parent_ava": "Napa Valley",
        "climate_type": "High elevation plateau, cool and windy",
        "soil_types": ["volcanic clay", "rocky loam"],
        "key_grapes": ["Sangiovese", "Cabernet Sauvignon"],
        "climate_summary": (
            "Distinct plateau above 1,700 ft. Cooler than valley floor by 10-15°F. "
            "Home to Antica (Antinori's California venture)."
        ),
        "known_for": (
            "Sangiovese and mountain Cabernet. More Italian-influenced style: higher acid, "
            "earthy character."
        ),
    },
    "carneros": {
        "name": "Los Carneros",
        "parent_ava": None,
        "climate_type": "Cool maritime, strong bay influence, Region I/II",
        "soil_types": ["shallow clay", "poorly drained Haire series"],
        "key_grapes": ["Pinot Noir", "Chardonnay", "Merlot"],
        "climate_summary": (
            "Coldest part of Napa/Sonoma boundary. Persistent morning fog, afternoon winds from "
            "San Pablo Bay. Short growing season. Region I (coolest)."
        ),
        "known_for": (
            "Benchmark California Pinot Noir and Chardonnay. Saintsbury, Etude, Acacia. "
            "Bright red fruit, high acidity, Burgundian character."
        ),
    },

    # ── SONOMA ────────────────────────────────────────────────────────────────
    "sonoma county": {
        "name": "Sonoma County",
        "parent_ava": None,
        "climate_type": "Diverse — from cool maritime coast to warm inland valleys",
        "soil_types": ["diverse: alluvial, volcanic, clay, sandy loam"],
        "key_grapes": ["Pinot Noir", "Chardonnay", "Zinfandel", "Cabernet Sauvignon", "Syrah"],
        "climate_summary": (
            "More diverse than Napa. Pacific Coast brings extreme cool to western Sonoma; "
            "inland areas like Alexander Valley are warm. Contains 18 sub-AVAs."
        ),
        "known_for": (
            "The full spectrum of California wine. Cooler areas rival Burgundy for Pinot/Chard; "
            "warmer pockets rival Napa for Zin and Cab."
        ),
    },
    "russian river valley": {
        "name": "Russian River Valley",
        "parent_ava": "Sonoma County",
        "climate_type": "Cool maritime, heavy morning fog, Region I",
        "soil_types": ["Goldridge sandy loam", "well-drained sandy soils over clay"],
        "key_grapes": ["Pinot Noir", "Chardonnay", "Gewürztraminer"],
        "climate_summary": (
            "Classic Pinot Noir territory. Petaluma Wind Gap funnels cold Pacific air inland. "
            "Fog burns off by midday; warm afternoons preserve structure."
        ),
        "known_for": (
            "Williams Selyem, Rochioli, Gary Farrell, Kosta Browne. "
            "Benchmark California Pinot: red cherry, cola, spice, silky tannins. "
            "Goldridge soils give wine a distinctive fine-grained texture."
        ),
    },
    "sonoma coast": {
        "name": "Sonoma Coast",
        "parent_ava": "Sonoma County",
        "climate_type": "Extreme maritime cool, fog, wind",
        "soil_types": ["rocky clay-loam", "shale", "diverse coastal"],
        "key_grapes": ["Pinot Noir", "Chardonnay", "Syrah"],
        "climate_summary": (
            "The true coastal sites (Fort Ross-Seaview sub-zone) are the coolest in California. "
            "Average growing season temps barely above Burgundy. Extreme diurnal range."
        ),
        "known_for": (
            "Freestone, Fort Ross-Seaview, Hirsch Vineyards, Littorai. "
            "Tense, mineral Pinot Noir with great acidity and aging potential. "
            "Challenges conventional California ripeness wisdom."
        ),
    },
    "alexander valley": {
        "name": "Alexander Valley",
        "parent_ava": "Sonoma County",
        "climate_type": "Warm, inland, Region III",
        "soil_types": ["sandy loam", "alluvial benchland", "volcanic hillside"],
        "key_grapes": ["Cabernet Sauvignon", "Merlot", "Zinfandel", "Chardonnay"],
        "climate_summary": (
            "Warm, sheltered inland valley. Higher temps than coastal Sonoma. "
            "Long hang time produces ripe, plush wines."
        ),
        "known_for": (
            "Jordan, Silver Oak Alexander Valley, Stonestreet. "
            "Ripe, approachable Cabernet: plum, chocolate, smooth tannins. "
            "Often more accessible young than Napa Cab."
        ),
    },
    "dry creek valley": {
        "name": "Dry Creek Valley",
        "parent_ava": "Sonoma County",
        "climate_type": "Warm days, cool nights, moderate marine influence",
        "soil_types": ["benchland: gravelly loam", "valley floor: clay, sandy loam"],
        "key_grapes": ["Zinfandel", "Sauvignon Blanc", "Cabernet Sauvignon"],
        "climate_summary": (
            "Small, fog-free valley. Ideal for Zinfandel. Benchland sites with Dry Creek "
            "benchland soils produce the most concentrated fruit."
        ),
        "known_for": (
            "Quintessential California Zinfandel: Ridge, Rafanelli, Quivira. "
            "Spicy, brambly, jammy Zin with great structure. "
            "Old-vine Zin over 100 years old."
        ),
    },
    "anderson valley": {
        "name": "Anderson Valley",
        "parent_ava": None,
        "climate_type": "Cool maritime, Region I-II, extreme diurnal swing",
        "soil_types": ["Pinole gravelly loam", "Bearwallow series", "loam"],
        "key_grapes": ["Pinot Noir", "Chardonnay", "Gewürztraminer", "Riesling"],
        "climate_summary": (
            "Mendocino's narrow coastal valley. Morning fog, afternoon sun, cold nights. "
            "Diurnal range up to 50°F. Ideal for aromatic whites and Pinot."
        ),
        "known_for": (
            "Roederer Estate (best California sparkling), Navarro, Breggo, Littorai. "
            "Delicate, high-acid Pinot and world-class Alsatian-style Gewürztraminer."
        ),
    },

    # ── CENTRAL COAST ─────────────────────────────────────────────────────────
    "central coast": {
        "name": "Central Coast",
        "parent_ava": None,
        "climate_type": "Diverse — coastal cool to warm inland",
        "soil_types": ["calcareous clay", "sandy loam", "limestone", "diatomaceous"],
        "key_grapes": ["Pinot Noir", "Chardonnay", "Syrah", "Cabernet Sauvignon", "Zinfandel"],
        "climate_summary": (
            "Stretches 250 miles from San Francisco to LA. Transverse mountain ranges create "
            "wind gaps that funnel Pacific influence inland."
        ),
        "known_for": (
            "Extremely diverse. Santa Cruz Mtns to Paso Robles to Santa Ynez. "
            "Home to Ridge Monte Bello, Bien Nacido, Sea Smoke."
        ),
    },
    "santa cruz mountains": {
        "name": "Santa Cruz Mountains",
        "parent_ava": "Central Coast",
        "climate_type": "Cool maritime to warm inland — elevation-driven",
        "soil_types": ["sandstone", "shale", "clay over limestone"],
        "key_grapes": ["Cabernet Sauvignon", "Pinot Noir", "Chardonnay"],
        "climate_summary": (
            "Elevations 400–2,600 ft shape the wines. East-facing slopes are cooler; "
            "west-facing get more maritime influence. High diurnal range."
        ),
        "known_for": (
            "Ridge Monte Bello — one of California's most age-worthy Cabs. "
            "Mt. Eden, Rhys Vineyards. Structured, mineral, long-lived wines."
        ),
    },
    "paso robles": {
        "name": "Paso Robles",
        "parent_ava": "Central Coast",
        "climate_type": "Hot, dry, extreme diurnal range (50°F day-night swing)",
        "soil_types": ["calcareous clay", "limestone", "shale", "sandy loam"],
        "key_grapes": ["Cabernet Sauvignon", "Zinfandel", "Syrah", "Grenache", "Rhône varieties"],
        "climate_summary": (
            "Hot inland valley with exceptional nighttime cooling. The 50°F diurnal swing "
            "is rare globally and preserves natural acidity in otherwise very ripe fruit."
        ),
        "known_for": (
            "Big, bold, ripe reds. Zinfandel heartland (Turley). "
            "Emerging Rhône blends: Tablas Creek (Perrin family). "
            "Limestone terroir rivals parts of southern France."
        ),
    },
    "santa barbara county": {
        "name": "Santa Barbara County",
        "parent_ava": "Central Coast",
        "climate_type": "Cool — transverse range creates east-west ocean exposure",
        "soil_types": ["sandy loam", "diatomaceous earth", "calcareous clay"],
        "key_grapes": ["Pinot Noir", "Chardonnay", "Syrah"],
        "climate_summary": (
            "Unique east-west oriented valleys (Santa Ynez, Santa Maria) channel Pacific air. "
            "This is the Hollywood of cool-climate California wine."
        ),
        "known_for": (
            "Sideways effect. Au Bon Climat, Hitching Post, Melville, Sea Smoke. "
            "Elegant, Burgundian Pinot Noir and Chardonnay with California sunshine."
        ),
    },
    "santa rita hills": {
        "name": "Sta. Rita Hills",
        "parent_ava": "Santa Barbara County",
        "climate_type": "Extreme cool maritime, Region I, heavy fog influence",
        "soil_types": ["diatomaceous earth", "sandy loam", "clay"],
        "key_grapes": ["Pinot Noir", "Chardonnay"],
        "climate_summary": (
            "Westernmost loop of Santa Ynez Valley. Direct Pacific exposure through Lompoc gap. "
            "Some of the coldest growing conditions in California."
        ),
        "known_for": (
            "Sea Smoke, Brewer-Clifton, Melville, Sanford & Benedict. "
            "Taut, mineral, high-acid Pinot with great longevity. "
            "Diatomaceous earth (fossilized algae) gives unique flinty character."
        ),
    },

    # ── SIERRA FOOTHILLS ─────────────────────────────────────────────────────
    "sierra foothills": {
        "name": "Sierra Foothills",
        "parent_ava": None,
        "climate_type": "Warm days, cool nights, high elevation (1,500-3,500 ft)",
        "soil_types": ["gold-rush-era decomposed granite", "clay loam", "volcanic"],
        "key_grapes": ["Zinfandel", "Syrah", "Barbera", "Tempranillo"],
        "climate_summary": (
            "Gold Country. Elevation provides cooling. Dry-farmed old vines (some pre-Prohibition). "
            "Irrigation rare — old vines survive on rainfall alone."
        ),
        "known_for": (
            "Amador County Zinfandel. Renwood, Easton/Terre Rouge. "
            "Rustic, concentrated, spicy old-vine Zin with incredible history."
        ),
    },
}


def find_ava(query: str) -> dict | None:
    """Fuzzy match an AVA from label text."""
    q = query.lower().strip()
    # exact match first
    if q in CALIFORNIA_AVAS:
        return CALIFORNIA_AVAS[q]
    # partial match
    for key, ava in CALIFORNIA_AVAS.items():
        if q in key or key in q:
            return ava
        if q in ava["name"].lower():
            return ava
    return None
