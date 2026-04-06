/**
 * California wine region data for the interactive map.
 *
 * Coordinates are approximate centroids for each AVA.
 * Tier: "major" (always visible) vs "sub" (visible when zoomed in, zoom >= 10)
 *
 * Style categories drive marker color:
 *   "cab"     → deep red   (Cabernet Sauvignon country)
 *   "pinot"   → burgundy   (cool-climate Pinot/Chard)
 *   "zin"     → orange     (Zinfandel/heritage)
 *   "rhone"   → purple     (Rhône varieties)
 *   "mixed"   → slate      (diverse)
 *
 * Data completeness note:
 *   The TTB recognizes 150+ California AVAs. This file covers the ~25
 *   that account for ~90% of what a wine shopper encounters at retail.
 *   Full GeoJSON boundaries are available from the Wine Institute /
 *   TTB public data — planned for v2.
 */

export type WineStyle = "cab" | "pinot" | "zin" | "rhone" | "mixed";
export type RegionTier = "major" | "sub";

export interface MapRegion {
  key: string;
  name: string;
  lat: number;
  lng: number;
  tier: RegionTier;
  style: WineStyle;
  parentKey?: string;

  // Terroir
  climate: string;
  soils: string[];
  keyGrapes: string[];
  knownFor: string;
  climateSummary: string;

  // Vintage coverage (years we have data for)
  vintageCoverage: string;

  // Benchmark producers
  benchmarkProducers: string[];

  // Grape profiles (keys into grape data)
  grapeProfiles: string[];
}

export const MAP_REGIONS: MapRegion[] = [
  // ── NAPA VALLEY & SUB-AVAs ──────────────────────────────────────────
  {
    key: "napa-valley",
    name: "Napa Valley",
    lat: 38.5,
    lng: -122.4,
    tier: "major",
    style: "cab",
    climate: "Mediterranean, hot days + bay cooling",
    soils: ["alluvial loam", "volcanic", "clay", "gravelly loam"],
    keyGrapes: ["Cabernet Sauvignon", "Merlot", "Chardonnay", "Sauvignon Blanc"],
    knownFor:
      "World-class Cabernet Sauvignon. The benchmark for American fine wine. Structured, age-worthy reds with ripe dark fruit, cassis, cedar, and firm tannins.",
    climateSummary:
      "Hot days with afternoon cooling from San Pablo Bay fog. Valley floor averages 15°F warmer than hillside sites. Long dry growing season (~25 in rain, almost all in winter).",
    vintageCoverage: "1994–2023",
    benchmarkProducers: ["Opus One", "Harlan Estate", "Screaming Eagle", "Stag's Leap Wine Cellars", "Robert Mondavi", "Caymus"],
    grapeProfiles: ["cabernet sauvignon", "merlot", "sauvignon blanc"],
  },
  {
    key: "oakville",
    name: "Oakville",
    lat: 38.435,
    lng: -122.405,
    tier: "sub",
    style: "cab",
    parentKey: "napa-valley",
    climate: "Warm days, cool nights, moderate bay influence",
    soils: ["gravelly loam (Bale series)", "well-drained alluvial"],
    keyGrapes: ["Cabernet Sauvignon", "Merlot", "Cabernet Franc"],
    knownFor:
      "Napa's 'golden mile.' Home to Opus One, Harlan Estate, Robert Mondavi To Kalon. Polished, structured Cab with blackcurrant, graphite, and tobacco.",
    climateSummary:
      "Benchmark Cabernet terroir. Gravelly soils force vine stress, concentrating flavors. Mid-valley position balances heat accumulation.",
    vintageCoverage: "See Napa Valley",
    benchmarkProducers: ["Opus One", "Harlan Estate", "Robert Mondavi (To Kalon)", "Far Niente", "Plumpjack"],
    grapeProfiles: ["cabernet sauvignon"],
  },
  {
    key: "rutherford",
    name: "Rutherford",
    lat: 38.466,
    lng: -122.41,
    tier: "sub",
    style: "cab",
    parentKey: "napa-valley",
    climate: "Warm continental, slightly warmer than Oakville",
    soils: ["Bale gravelly loam", "deep alluvial benchland"],
    keyGrapes: ["Cabernet Sauvignon", "Merlot"],
    knownFor:
      "'Rutherford Dust' — the savory, earthy mid-palate quality unique to this bench. Inglenook, Beaulieu Vineyard, Frog's Leap.",
    climateSummary:
      "Benchland vineyards produce the most distinctive terroir expression. Famous dusty tannin texture alongside ripe dark fruit.",
    vintageCoverage: "See Napa Valley",
    benchmarkProducers: ["Inglenook", "Beaulieu Vineyard (BV)", "Frog's Leap", "Swanson"],
    grapeProfiles: ["cabernet sauvignon"],
  },
  {
    key: "stags-leap",
    name: "Stags Leap District",
    lat: 38.4,
    lng: -122.36,
    tier: "sub",
    style: "cab",
    parentKey: "napa-valley",
    climate: "Coolest Napa valley floor — afternoon wind tunnel from bay",
    soils: ["volcanic tuff", "loam over volcanic ash"],
    keyGrapes: ["Cabernet Sauvignon", "Merlot", "Petite Sirah"],
    knownFor:
      "Site of the 1976 Paris Tasting winner. Elegant, silky Cab: red fruit, iron, cedar. More refined than southern Napa.",
    climateSummary:
      "'Silverado Bench' catches afternoon cooling winds. Volcanic soils give distinctive iron/mineral notes unique in Napa.",
    vintageCoverage: "See Napa Valley",
    benchmarkProducers: ["Stag's Leap Wine Cellars (SLV)", "Shafer", "Silverado Vineyards", "Pine Ridge"],
    grapeProfiles: ["cabernet sauvignon", "petite sirah"],
  },
  {
    key: "mount-veeder",
    name: "Mount Veeder",
    lat: 38.38,
    lng: -122.47,
    tier: "sub",
    style: "cab",
    parentKey: "napa-valley",
    climate: "Cool, high-elevation (400–2,677 ft), fog-free above inversion layer",
    soils: ["rocky volcanic", "thin clay-loam", "shale"],
    keyGrapes: ["Cabernet Sauvignon", "Zinfandel", "Chardonnay"],
    knownFor:
      "Austere, structured mountain Cab. High acidity, firm tannins, dark fruit. Requires longer aging — exceptional longevity (20+ years).",
    climateSummary:
      "Above morning fog, exposed to cooling Pacific air. Low-vigor soils yield small berries with extraordinary concentration.",
    vintageCoverage: "See Napa Valley",
    benchmarkProducers: ["Mount Veeder Winery", "Hess Collection", "Mayacamas"],
    grapeProfiles: ["cabernet sauvignon", "zinfandel"],
  },
  {
    key: "spring-mountain",
    name: "Spring Mountain District",
    lat: 38.505,
    lng: -122.49,
    tier: "sub",
    style: "cab",
    parentKey: "napa-valley",
    climate: "Cool mountain, above fog line, diurnal range 40–50°F",
    soils: ["volcanic", "rocky clay-loam", "shale"],
    keyGrapes: ["Cabernet Sauvignon", "Merlot", "Cabernet Franc", "Chardonnay"],
    knownFor:
      "Dramatic, tannic, structured Cabernet. West-facing slopes above Napa town. Terra Valentine, Pride Mountain, Smith-Madrone.",
    climateSummary:
      "Cool Pacific air, high diurnal range preserves acidity. Springs and streams provide natural irrigation.",
    vintageCoverage: "See Napa Valley",
    benchmarkProducers: ["Pride Mountain", "Terra Valentine", "Smith-Madrone", "Newton"],
    grapeProfiles: ["cabernet sauvignon", "cabernet franc"],
  },
  {
    key: "howell-mountain",
    name: "Howell Mountain",
    lat: 38.58,
    lng: -122.38,
    tier: "sub",
    style: "cab",
    parentKey: "napa-valley",
    climate: "High elevation (1,400 ft min), above fog, intense sun, cool nights",
    soils: ["volcanic ash (Aiken loam)", "thin rocky soils"],
    keyGrapes: ["Zinfandel", "Cabernet Sauvignon", "Merlot", "Petite Sirah"],
    knownFor:
      "First AVA above the fog line. Big, tannic, dense mountain Zinfandel and Cabernet. Dunn Vineyards. Slow to develop — 25+ year agers.",
    climateSummary:
      "Intense UV at altitude, cool nights slow ripening. Thin soils force vine stress, producing deeply concentrated fruit.",
    vintageCoverage: "See Napa Valley",
    benchmarkProducers: ["Dunn Vineyards", "La Jota", "Ladera"],
    grapeProfiles: ["cabernet sauvignon", "zinfandel"],
  },

  // ── CARNEROS ─────────────────────────────────────────────────────────
  {
    key: "carneros",
    name: "Los Carneros",
    lat: 38.22,
    lng: -122.38,
    tier: "major",
    style: "pinot",
    climate: "Cool maritime, strong bay influence, Region I/II",
    soils: ["shallow clay", "poorly drained Haire series"],
    keyGrapes: ["Pinot Noir", "Chardonnay", "Merlot"],
    knownFor:
      "Coldest part of Napa/Sonoma. Benchmark California Pinot Noir and Chardonnay. Saintsbury, Etude, Acacia — bright red fruit, high acidity, Burgundian character.",
    climateSummary:
      "Persistent morning fog, strong afternoon winds from San Pablo Bay. Short growing season. One of the coolest appellations in California.",
    vintageCoverage: "See Napa Valley / Sonoma County",
    benchmarkProducers: ["Saintsbury", "Etude", "Acacia", "Domaine Carneros", "Hyde Vineyards"],
    grapeProfiles: ["pinot noir", "chardonnay"],
  },

  // ── SONOMA ────────────────────────────────────────────────────────────
  {
    key: "russian-river-valley",
    name: "Russian River Valley",
    lat: 38.42,
    lng: -122.92,
    tier: "major",
    style: "pinot",
    climate: "Cool maritime, heavy morning fog, Region I",
    soils: ["Goldridge sandy loam", "well-drained sandy soils over clay"],
    keyGrapes: ["Pinot Noir", "Chardonnay", "Gewürztraminer"],
    knownFor:
      "California's Pinot Noir heartland. Williams Selyem, Rochioli, Kosta Browne. Red cherry, cola, spice, silky tannins — Goldridge soils give fine-grained texture unique in the New World.",
    climateSummary:
      "Petaluma Wind Gap funnels cold Pacific air inland. Fog burns off by midday — warm afternoons ripen fruit while cool nights preserve structure.",
    vintageCoverage: "2016–2023",
    benchmarkProducers: ["Williams Selyem", "Rochioli", "Gary Farrell", "Kosta Browne", "Merry Edwards"],
    grapeProfiles: ["pinot noir", "chardonnay"],
  },
  {
    key: "sonoma-coast",
    name: "Sonoma Coast",
    lat: 38.6,
    lng: -123.1,
    tier: "major",
    style: "pinot",
    climate: "Extreme maritime cool, fog, wind — some of California's coldest vineyards",
    soils: ["rocky clay-loam", "shale", "diverse coastal"],
    keyGrapes: ["Pinot Noir", "Chardonnay", "Syrah"],
    knownFor:
      "Tense, mineral Pinot Noir with great acidity and aging potential. Hirsch Vineyards, Littorai, Freestone. Challenges conventional California ripeness wisdom.",
    climateSummary:
      "True coastal sites (Fort Ross-Seaview) are among the coldest in California. Average growing temps barely above Burgundy. Extreme 50°F diurnal range.",
    vintageCoverage: "2016–2023",
    benchmarkProducers: ["Hirsch Vineyards", "Littorai", "Flowers", "Peay Vineyards"],
    grapeProfiles: ["pinot noir", "chardonnay", "syrah"],
  },
  {
    key: "alexander-valley",
    name: "Alexander Valley",
    lat: 38.72,
    lng: -122.89,
    tier: "major",
    style: "cab",
    climate: "Warm, inland, sheltered, Region III",
    soils: ["sandy loam", "alluvial benchland", "volcanic hillside"],
    keyGrapes: ["Cabernet Sauvignon", "Merlot", "Zinfandel", "Chardonnay"],
    knownFor:
      "Jordan, Silver Oak Alexander Valley. Ripe, approachable Cabernet: plum, chocolate, smooth tannins. Often more accessible young than Napa Cab.",
    climateSummary:
      "Warm, sheltered inland valley. Higher temps than coastal Sonoma. Long hang time produces ripe, plush wines at more accessible price points than Napa.",
    vintageCoverage: "See Sonoma County",
    benchmarkProducers: ["Jordan", "Silver Oak (Alexander Valley)", "Stonestreet", "Clos du Bois"],
    grapeProfiles: ["cabernet sauvignon", "merlot"],
  },
  {
    key: "dry-creek-valley",
    name: "Dry Creek Valley",
    lat: 38.61,
    lng: -122.91,
    tier: "major",
    style: "zin",
    climate: "Warm days, cool nights, moderate marine influence",
    soils: ["benchland: gravelly loam", "valley floor: clay, sandy loam"],
    keyGrapes: ["Zinfandel", "Sauvignon Blanc", "Cabernet Sauvignon"],
    knownFor:
      "Quintessential California Zinfandel: Ridge Lytton Springs, Rafanelli, Quivira. Spicy, brambly, jammy Zin with great structure. Old vines over 100 years old.",
    climateSummary:
      "Small, fog-free valley. Ideal for Zinfandel. Benchland sites with Dry Creek benchland soils produce the most concentrated, structured fruit.",
    vintageCoverage: "See Sonoma County",
    benchmarkProducers: ["A. Rafanelli", "Ridge Lytton Springs", "Quivira", "Seghesio", "Dry Creek Vineyard"],
    grapeProfiles: ["zinfandel", "sauvignon blanc"],
  },

  // ── ANDERSON VALLEY ────────────────────────────────────────────────
  {
    key: "anderson-valley",
    name: "Anderson Valley",
    lat: 38.99,
    lng: -123.5,
    tier: "major",
    style: "pinot",
    climate: "Cool maritime, Region I–II, extreme 50°F diurnal swing",
    soils: ["Pinole gravelly loam", "Bearwallow series", "loam"],
    keyGrapes: ["Pinot Noir", "Chardonnay", "Gewürztraminer", "Riesling"],
    knownFor:
      "Roederer Estate (best California sparkling), Navarro, Breggo. Delicate, high-acid Pinot and world-class Alsatian-style Gewürztraminer.",
    climateSummary:
      "Mendocino's narrow coastal valley. Morning fog, afternoon sun, cold nights. Diurnal range up to 50°F. Ideal for aromatic whites and Pinot with European structure.",
    vintageCoverage: "Key years",
    benchmarkProducers: ["Roederer Estate", "Navarro Vineyards", "Littorai", "Husch"],
    grapeProfiles: ["pinot noir", "chardonnay"],
  },

  // ── CENTRAL COAST ─────────────────────────────────────────────────────
  {
    key: "santa-cruz-mountains",
    name: "Santa Cruz Mountains",
    lat: 37.18,
    lng: -122.1,
    tier: "major",
    style: "cab",
    climate: "Cool maritime to warm inland — elevation-driven (400–2,600 ft)",
    soils: ["sandstone", "shale", "clay over limestone"],
    keyGrapes: ["Cabernet Sauvignon", "Pinot Noir", "Chardonnay"],
    knownFor:
      "Ridge Monte Bello — one of California's most age-worthy Cabs. Mt. Eden, Rhys Vineyards. Structured, mineral, long-lived wines that rival Napa at a fraction of the price.",
    climateSummary:
      "Elevations shape the wines dramatically. East-facing slopes are cooler; west-facing get more maritime influence. High diurnal range locks in freshness.",
    vintageCoverage: "See Central Coast",
    benchmarkProducers: ["Ridge Monte Bello", "Mt. Eden Vineyards", "Rhys Vineyards", "Bonny Doon"],
    grapeProfiles: ["cabernet sauvignon", "pinot noir", "chardonnay"],
  },
  {
    key: "paso-robles",
    name: "Paso Robles",
    lat: 35.6,
    lng: -120.7,
    tier: "major",
    style: "rhone",
    climate: "Hot, dry, extreme 50°F diurnal range (day–night swing)",
    soils: ["calcareous clay", "limestone", "shale", "sandy loam"],
    keyGrapes: ["Cabernet Sauvignon", "Zinfandel", "Syrah", "Grenache", "Mourvèdre"],
    knownFor:
      "Big, bold, ripe reds. Zinfandel heartland (Turley). Emerging Rhône blends: Tablas Creek (Perrin family). Limestone terroir rivals parts of southern France.",
    climateSummary:
      "Hot inland valley with exceptional nighttime cooling. The rare 50°F diurnal swing preserves natural acidity in otherwise very ripe fruit — a global anomaly.",
    vintageCoverage: "2019, 2022",
    benchmarkProducers: ["Tablas Creek", "Turley Wine Cellars", "Saxum", "Justin", "J. Lohr"],
    grapeProfiles: ["zinfandel", "syrah"],
  },
  {
    key: "sta-rita-hills",
    name: "Sta. Rita Hills",
    lat: 34.62,
    lng: -120.22,
    tier: "major",
    style: "pinot",
    climate: "Extreme cool maritime — direct Pacific exposure through Lompoc gap",
    soils: ["diatomaceous earth", "sandy loam", "clay"],
    keyGrapes: ["Pinot Noir", "Chardonnay"],
    knownFor:
      "Sea Smoke, Brewer-Clifton, Melville, Sanford & Benedict. Taut, mineral, high-acid Pinot with great longevity. Diatomaceous earth (fossilized algae) gives unique flinty character.",
    climateSummary:
      "Westernmost loop of Santa Ynez Valley. Some of the coldest growing conditions in California — persistent fog and wind from the Pacific Ocean.",
    vintageCoverage: "2019, 2022",
    benchmarkProducers: ["Sea Smoke", "Brewer-Clifton", "Melville", "Sanford", "Foley"],
    grapeProfiles: ["pinot noir", "chardonnay"],
  },
  {
    key: "santa-barbara",
    name: "Santa Barbara County",
    lat: 34.7,
    lng: -120.0,
    tier: "major",
    style: "pinot",
    climate: "Cool — transverse mountain range creates east-west ocean exposure",
    soils: ["sandy loam", "diatomaceous earth", "calcareous clay"],
    keyGrapes: ["Pinot Noir", "Chardonnay", "Syrah"],
    knownFor:
      "The Sideways effect. Au Bon Climat, Hitching Post, Melville. Elegant, Burgundian Pinot Noir and Chardonnay with California sunshine.",
    climateSummary:
      "Unique east-west oriented valleys (Santa Ynez, Santa Maria) channel Pacific air far inland. The Hollywood of cool-climate California wine.",
    vintageCoverage: "2019, 2022",
    benchmarkProducers: ["Au Bon Climat", "Hitching Post", "Foxen", "Dierberg"],
    grapeProfiles: ["pinot noir", "chardonnay", "syrah"],
  },

  // ── SIERRA FOOTHILLS ─────────────────────────────────────────────────
  {
    key: "sierra-foothills",
    name: "Sierra Foothills",
    lat: 38.5,
    lng: -120.5,
    tier: "major",
    style: "zin",
    climate: "Warm days, cool nights, high elevation (1,500–3,500 ft)",
    soils: ["decomposed granite (Gold Rush era)", "clay loam", "volcanic"],
    keyGrapes: ["Zinfandel", "Syrah", "Barbera", "Tempranillo"],
    knownFor:
      "Gold Country heritage grapes. Renwood, Easton/Terre Rouge. Rustic, concentrated, spicy old-vine Zin with incredible history — some vines pre-date Prohibition.",
    climateSummary:
      "Elevation provides cooling in otherwise warm Gold Country. Dry-farmed old vines survive on rainfall alone — a rare practice in California.",
    vintageCoverage: "Key years",
    benchmarkProducers: ["Turley Wine Cellars (Amador)", "Renwood", "Terre Rouge", "Easton"],
    grapeProfiles: ["zinfandel"],
  },
];

export const STYLE_CONFIG: Record<WineStyle, { label: string; color: string; textColor: string; markerColor: string }> = {
  cab: {
    label: "Cabernet Country",
    color: "bg-red-900/80",
    textColor: "text-red-200",
    markerColor: "#7f1d1d",
  },
  pinot: {
    label: "Pinot & Chardonnay",
    color: "bg-rose-900/80",
    textColor: "text-rose-200",
    markerColor: "#9d174d",
  },
  zin: {
    label: "Zinfandel Heritage",
    color: "bg-orange-900/80",
    textColor: "text-orange-200",
    markerColor: "#9a3412",
  },
  rhone: {
    label: "Rhône Varieties",
    color: "bg-purple-900/80",
    textColor: "text-purple-200",
    markerColor: "#581c87",
  },
  mixed: {
    label: "Diverse",
    color: "bg-stone-700/80",
    textColor: "text-stone-200",
    markerColor: "#44403c",
  },
};
