"""
Grape variety profiles — California expression focus.
Covers structure, flavor, aging, and how California terroir shapes each variety.
"""

GRAPE_PROFILES: dict = {
    "cabernet sauvignon": {
        "variety": "Cabernet Sauvignon",
        "skin_color": "red",
        "origin": "Bordeaux, France (Cab Franc × Sauvignon Blanc cross)",
        "california_character": (
            "California Cab is the New World benchmark. Warmer climate gives fuller body, "
            "riper dark fruit (blackcurrant, plum, cassis), and softer tannins than Bordeaux. "
            "Napa Valley is the apex: structured, layered, age-worthy. "
            "High natural tannin + California sunshine = wines that reward cellaring."
        ),
        "flavor_profile": ["blackcurrant", "cassis", "black cherry", "cedar", "tobacco", "graphite", "eucalyptus", "dark chocolate"],
        "structure": "Full body, firm tannins, moderate-high acidity, 13-15.5% alcohol",
        "food_pairings": ["ribeye steak", "lamb chops", "aged cheddar", "portobello mushrooms", "braised short rib"],
        "peak_drinking_window": "5-25 years from vintage (mountain/reserve: 10-40 years)",
        "winemaking_notes": (
            "Typically aged 18-28 months in French oak (50-100% new). "
            "Malolactic fermentation universal. "
            "Often blended: Merlot for softness, Cab Franc for perfume, Petit Verdot for color."
        ),
        "california_cult_producers": ["Screaming Eagle", "Harlan Estate", "Bryant Family", "Colgin", "Opus One", "Ridge Monte Bello"],
        "value_producers": ["Jordan", "Stag's Leap Wine Cellars", "Duckhorn", "Cakebread", "Frog's Leap"],
    },
    "pinot noir": {
        "variety": "Pinot Noir",
        "skin_color": "red",
        "origin": "Burgundy, France",
        "california_character": (
            "The most terroir-transparent grape. California Pinot spans from rich/ripe (Kosta Browne) "
            "to Burgundian-lean (Hirsch, Littorai). "
            "Cool coastal sites (Russian River, Sta. Rita Hills, Sonoma Coast) produce the best. "
            "Thin skin = sensitive to heat; great vintages require long, cool growing seasons."
        ),
        "flavor_profile": ["red cherry", "raspberry", "strawberry", "cola", "forest floor", "violet", "spice", "mushroom (with age)"],
        "structure": "Light-medium body, silky tannins, high acidity, 13-14.5% alcohol",
        "food_pairings": ["salmon", "duck", "mushroom risotto", "grilled chicken", "earthy cheeses", "charcuterie"],
        "peak_drinking_window": "3-12 years (coastal/structured: 8-20 years)",
        "winemaking_notes": (
            "Whole-cluster fermentation common for complexity. "
            "Aged 10-18 months in French oak (25-50% new to preserve fruit). "
            "Punching down vs pump-over dramatically affects texture."
        ),
        "california_cult_producers": ["Williams Selyem", "Kosta Browne", "Rochioli", "Sea Smoke", "Hirsch"],
        "value_producers": ["Meiomi", "La Crema", "Sonoma-Cutrer", "Flowers"],
    },
    "chardonnay": {
        "variety": "Chardonnay",
        "skin_color": "white",
        "origin": "Burgundy, France",
        "california_character": (
            "Most planted white in California. Two distinct styles: "
            "(1) Rich/oaked — buttery, vanilla, tropical fruit (Rombauer, classic Sonoma-Cutrer style); "
            "(2) Restrained/unoaked — mineral, citrus, Burgundian (Hanzell, Mount Eden, Hyde). "
            "Carneros and Russian River are the benchmarks; Santa Barbara rising fast."
        ),
        "flavor_profile": ["apple", "pear", "citrus", "tropical fruit", "vanilla", "butter", "hazelnut", "cream (oaked styles)", "flint/mineral (unoaked)"],
        "structure": "Medium-full body, moderate acidity, 13-15% alcohol",
        "food_pairings": ["lobster", "roast chicken", "cream sauces", "soft cheeses", "white fish", "scallops"],
        "peak_drinking_window": "2-8 years (unoaked/high-acid: 3-12 years)",
        "winemaking_notes": (
            "Malolactic fermentation converts malic → lactic acid (creamy texture, reduces sharpness). "
            "Batonnage (lees stirring) adds richness. "
            "100% MLF + heavy oak = 'Butter Bomb'; partial MLF + neutral oak = elegant."
        ),
        "california_cult_producers": ["Kistler", "Marcassin", "Aubert", "Hyde de Villaine"],
        "value_producers": ["Rombauer", "Jordan", "Sonoma-Cutrer", "Cakebread"],
    },
    "zinfandel": {
        "variety": "Zinfandel",
        "skin_color": "red",
        "origin": "Croatia (Tribidrag/Crljenak Kaštelanski) — but California is its spiritual home",
        "california_character": (
            "California's heritage grape. Old vines (50-130+ years) in Dry Creek, Lodi, "
            "Amador County, and Sonoma produce tiny berries with extraordinary concentration. "
            "Thin skin ripens unevenly — same cluster can have raisins AND underripe berries, "
            "creating complexity. High natural sugar → high alcohol (14.5-16.5% common)."
        ),
        "flavor_profile": ["blackberry jam", "raspberry", "black pepper", "spice", "brambly fruit", "chocolate", "dried fruit", "leather"],
        "structure": "Full body, soft tannins, moderate acidity, 14.5-16.5% alcohol",
        "food_pairings": ["BBQ ribs", "pizza", "pasta arrabbiata", "sausages", "sharp cheddar", "game meat"],
        "peak_drinking_window": "3-10 years (old vine: 8-20 years)",
        "winemaking_notes": (
            "Old vine Zin benefits from minimal intervention. "
            "Some producers use whole clusters for freshness. "
            "Short maceration preserves fruit purity; extended maceration adds structure."
        ),
        "california_cult_producers": ["Turley Wine Cellars", "Ridge Lytton Springs", "Ravenswood", "Bedrock Wine Co."],
        "value_producers": ["Seghesio", "Ravenswood", "Frog's Leap", "Dry Creek Vineyard"],
    },
    "syrah": {
        "variety": "Syrah",
        "skin_color": "red",
        "origin": "Rhône Valley, France (Northern Rhône)",
        "california_character": (
            "Two California Syrah personalities: "
            "(1) Northern Rhône-inspired — cool-climate, savory, meaty, black olive, bacon fat. "
            "Best from Edna Valley, Sta. Rita Hills, Bennett Valley. "
            "(2) Warm-climate — opulent, jammy, powerfully fruited. Paso Robles, Central Valley. "
            "Criminally underrated; often exceptional value vs. equivalent French Syrah."
        ),
        "flavor_profile": ["blackberry", "blueberry", "black pepper", "bacon fat", "leather", "violet", "olive", "smoked meat"],
        "structure": "Full body, medium-firm tannins, moderate acidity, 13.5-15.5% alcohol",
        "food_pairings": ["grilled lamb", "wild boar", "aged cheeses", "beef stew", "black truffle", "charcuterie"],
        "peak_drinking_window": "5-15 years (Northern Rhône style: 10-25 years)",
        "winemaking_notes": (
            "Co-fermentation with small amount of Viognier (5-15%) is traditional. "
            "Whole-cluster adds spice, structure, and pepper notes. "
            "Best results in California use partial whole-cluster."
        ),
        "california_cult_producers": ["Sine Qua Non", "Alban Vineyards", "Saxum", "Ojai Vineyard"],
        "value_producers": ["Qupé", "Beckmen", "Bonny Doon", "Tablas Creek"],
    },
    "merlot": {
        "variety": "Merlot",
        "skin_color": "red",
        "origin": "Bordeaux, France",
        "california_character": (
            "Often overshadowed by Cab but California Merlot at its best is plush, velvety, and expressive. "
            "Duckhorn Napa Merlot essentially re-invented American Merlot in the 1980s. "
            "Softer tannins and earlier approachability than Cab make it a gateway luxury wine. "
            "Best from Carneros, Napa, and Columbia Valley-influenced cooler sites."
        ),
        "flavor_profile": ["plum", "black cherry", "mocha", "chocolate", "bay leaf", "tobacco", "truffle"],
        "structure": "Medium-full body, soft tannins, moderate acidity, 13.5-15% alcohol",
        "food_pairings": ["roast pork", "duck confit", "lamb", "pasta with meat sauce", "mild cheeses"],
        "peak_drinking_window": "3-12 years",
        "winemaking_notes": (
            "Often blended with Cab Franc and Cab Sauv. Ripens earlier than Cab. "
            "Responds well to moderate oak; heavy toast can overwhelm."
        ),
        "california_cult_producers": ["Duckhorn", "Paloma", "Pride Mountain"],
        "value_producers": ["Duckhorn 'Three Palms'", "Stags' Leap Winery", "Rutherford Hill"],
    },
    "sauvignon blanc": {
        "variety": "Sauvignon Blanc",
        "skin_color": "white",
        "origin": "Loire Valley & Bordeaux, France",
        "california_character": (
            "California Sauv Blanc ranges from citrus-forward and herbaceous (Napa grassy style) "
            "to richer, barrel-fermented 'Fumé Blanc' (Robert Mondavi popularized this). "
            "Napa Valley produces some of the world's best: white grapefruit, "
            "lemongrass, passion fruit. Often underrated vs. New Zealand versions."
        ),
        "flavor_profile": ["grapefruit", "lemon", "lime", "passion fruit", "lemongrass", "fresh herbs", "stone fruit"],
        "structure": "Light-medium body, high acidity, 12.5-14% alcohol",
        "food_pairings": ["oysters", "goat cheese", "green salads", "white fish", "asparagus", "Vietnamese cuisine"],
        "peak_drinking_window": "1-5 years (Fumé Blanc oak-aged: 2-8 years)",
        "winemaking_notes": (
            "Stainless steel preserves freshness and aromatics. "
            "Oak fermentation (Fumé Blanc style) adds weight and complexity. "
            "Some producers use Sémillon in the blend for texture."
        ),
        "california_cult_producers": ["Spottswoode", "Duckhorn", "Mason"],
        "value_producers": ["Frog's Leap", "Dry Creek Vineyard", "Robert Mondavi Fumé Blanc"],
    },
    "cabernet franc": {
        "variety": "Cabernet Franc",
        "skin_color": "red",
        "origin": "Bordeaux/Loire Valley, France",
        "california_character": (
            "Usually a blending grape in California (adds perfume and structure to Cab Sauv). "
            "Stand-alone Cab Franc is emerging — especially from cooler sites like Napa hillsides. "
            "More aromatic and lighter than Cab Sauv: red fruit, graphite, fresh herbs. "
            "Beckoning comparisons to Loire Valley Chinon/Bourgueil."
        ),
        "flavor_profile": ["red cherry", "raspberry", "violet", "pencil shaving", "tobacco", "fresh herbs", "graphite"],
        "structure": "Medium body, medium tannins, bright acidity, 13-14.5% alcohol",
        "food_pairings": ["roast chicken", "duck", "charcuterie", "earthy vegetables", "lamb"],
        "peak_drinking_window": "4-12 years",
        "winemaking_notes": (
            "Benefits from whole-cluster fermentation. "
            "Light oak treatment to preserve aromatics. "
            "Increasingly bottled as a single varietal on Napa hillsides."
        ),
        "california_cult_producers": ["Lang & Reed", "Corison", "Chappellet"],
        "value_producers": ["Peju Province", "Robert Sinskey"],
    },
    "petite sirah": {
        "variety": "Petite Sirah",
        "skin_color": "red",
        "origin": "France (Durif) — but California is its home",
        "california_character": (
            "Not the same as Syrah! Petite Sirah is Durif, a cross of Syrah and Peloursin. "
            "California's own signature variety. Ink-dark color, massive tannins, "
            "almost immortal aging potential. Napa, Dry Creek, Lodi are key areas. "
            "Often blended with Zin to add structure and color."
        ),
        "flavor_profile": ["blueberry", "blackberry", "dark chocolate", "black pepper", "iron", "tar", "leather"],
        "structure": "Full body, massive tannins, moderate acidity, 14-16% alcohol",
        "food_pairings": ["braised oxtail", "venison", "blue cheese", "dark chocolate", "spiced lamb"],
        "peak_drinking_window": "7-20 years",
        "winemaking_notes": (
            "High tannin requires careful extraction. Extended maceration builds color. "
            "Needs bottle age to integrate. Not for early drinkers."
        ),
        "california_cult_producers": ["Turley", "Stag's Leap Wine Cellars (Petite Sirah)", "Rosenblum"],
        "value_producers": ["Bogle", "Concannon", "Michael David"],
    },
    "viognier": {
        "variety": "Viognier",
        "skin_color": "white",
        "origin": "Northern Rhône (Condrieu), France",
        "california_character": (
            "Explosive aromatics: apricot, peach, orange blossom, honeysuckle. "
            "California Viognier can be hedonistic and rich with floral perfume. "
            "Edna Valley, Paso Robles, and El Dorado County produce compelling examples. "
            "Often co-fermented with Syrah for added aromatics."
        ),
        "flavor_profile": ["apricot", "peach", "orange blossom", "honeysuckle", "mango", "ginger"],
        "structure": "Full body, low acidity, 13.5-15% alcohol",
        "food_pairings": ["lobster", "Thai curry", "roast chicken", "foie gras", "stone fruits"],
        "peak_drinking_window": "1-5 years (drink fresh)",
        "winemaking_notes": (
            "Low acidity makes it tricky — harvest timing critical. "
            "Partial barrel fermentation common. Must be drunk young or acidity diminishes further."
        ),
        "california_cult_producers": ["Alban Vineyards", "Calera", "Sine Qua Non"],
        "value_producers": ["Qupé", "Beckmen", "Gainey"],
    },
}


def find_grape(query: str) -> dict | None:
    """Match grape variety from label text."""
    q = query.lower().strip()
    if q in GRAPE_PROFILES:
        return GRAPE_PROFILES[q]
    for key, grape in GRAPE_PROFILES.items():
        if q in key or key in q:
            return grape
    # common abbreviations
    aliases = {
        "cab": "cabernet sauvignon",
        "cab sauv": "cabernet sauvignon",
        "cab franc": "cabernet franc",
        "pinot": "pinot noir",
        "chard": "chardonnay",
        "sauv blanc": "sauvignon blanc",
        "zin": "zinfandel",
        "ps": "petite sirah",
        "pet sirah": "petite sirah",
    }
    if q in aliases:
        return GRAPE_PROFILES[aliases[q]]
    return None
