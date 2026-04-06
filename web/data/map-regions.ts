/**
 * California wine region data for the interactive map.
 *
 * Each region has five sections, each following the same writing structure:
 *   - One thesis sentence (the main point)
 *   - 3–4 supporting sentences (plain, specific facts — no wine jargon)
 *
 * Polygon coordinates are rough [lat, lng] outlines for each AVA.
 * Exact TTB GeoJSON boundaries are planned for v2.
 *
 * Data coverage: ~20 AVAs representing ~90% of retail encounters.
 * Full list: TTB publishes 150+ California AVAs at ttb.gov.
 */

export type WineStyle = "cab" | "pinot" | "zin" | "rhone" | "mixed";
export type RegionTier = "major" | "sub";
export type MacroRegion =
  | "north-coast"
  | "central-coast"
  | "sierra-foothills"
  | "southern-california"
  | "far-north"
  | "inland-valleys";

/**
 * Macro-region color palette matched to the official Wine Institute PDF map.
 * Used for polygon fills and markers on the Leaflet map.
 */
export const MACRO_REGION_CONFIG: Record<
  MacroRegion,
  { label: string; fill: string; border: string; text: string }
> = {
  "north-coast": {
    label: "North Coast",
    fill: "#5c7a3e",
    border: "#3d5229",
    text: "text-green-200",
  },
  "central-coast": {
    label: "Central Coast",
    fill: "#2e7d6e",
    border: "#1a5248",
    text: "text-teal-200",
  },
  "sierra-foothills": {
    label: "Sierra Foothills",
    fill: "#a0692a",
    border: "#6b4418",
    text: "text-amber-200",
  },
  "southern-california": {
    label: "Southern California",
    fill: "#b85c2c",
    border: "#7a3a18",
    text: "text-orange-200",
  },
  "far-north": {
    label: "Far North",
    fill: "#2e5c3e",
    border: "#1a3826",
    text: "text-green-300",
  },
  "inland-valleys": {
    label: "Inland Valleys",
    fill: "#8a7a4a",
    border: "#5c5030",
    text: "text-yellow-200",
  },
};

export interface MapRegion {
  key: string;
  name: string;
  lat: number;
  lng: number;
  tier: RegionTier;
  style: WineStyle;
  macroRegion: MacroRegion;
  parentKey?: string;

  /** Rough polygon outline [lat, lng]. Major AVAs only — sub-AVAs use center markers. */
  polygon?: [number, number][];

  // ── Five content sections, each: thesis + 3–4 supporting sentences ──

  terroirThesis: string;
  terroirPoints: string[];

  climateThesis: string;
  climatePoints: string[];

  soilThesis: string;
  soilPoints: string[];

  vintageThesis: string;
  vintagePoints: string[];

  wineryThesis: string;
  wineryPoints: string[];
}

export const MAP_REGIONS: MapRegion[] = [

  // ── NAPA VALLEY & SUB-AVAs ────────────────────────────────────────────────

  {
    key: "napa-valley",
    name: "Napa Valley",
    lat: 38.5,
    lng: -122.42,
    tier: "major",
    style: "cab",
    macroRegion: "north-coast",
    polygon: [
      [38.86, -122.69], [38.86, -122.40],
      [38.18, -122.20], [38.18, -122.55],
    ],

    terroirThesis: "Napa Valley grows some of the world's best red wine because its climate and soils are almost perfectly matched to Cabernet Sauvignon.",
    terroirPoints: [
      "The valley is sheltered from the ocean by mountains on both sides, which keeps summers warm enough for Cabernet to fully ripen.",
      "Cool air from San Pablo Bay drifts north each morning, slowing ripening and giving grapes time to build flavor without getting overripe.",
      "Rain falls almost entirely in winter, so the growing season is dry and grapes rarely get mold or disease.",
      "The valley floor, hillsides, and mountain ridges all ripen fruit at different speeds — which is why a bottle from Rutherford and one from Howell Mountain taste so different.",
    ],

    climateThesis: "Napa gets warm enough to fully ripen Cabernet, but cool enough at night to keep the wine balanced and not heavy.",
    climatePoints: [
      "Summer days regularly reach 90–95°F, giving grapes enough heat to develop deep, dark fruit flavors.",
      "Temperatures drop 20–30°F after sunset every night, slowing the ripening process and keeping the wine from tasting flat.",
      "Morning fog from San Pablo Bay cools the southern end of the valley more than the north — which is why the south grows Pinot Noir and Chardonnay instead of Cabernet.",
      "The growing season lasts around 200 days, one of the longer seasons in California, giving grapes more time to develop complexity.",
    ],

    soilThesis: "Napa Valley has over 30 different soil types, and where you plant your vines determines what the wine tastes like.",
    soilPoints: [
      "Deep alluvial soils on the valley floor hold water well and produce bigger crops of ripe, easy-to-drink wine.",
      "Rocky soils on the hillsides drain fast, stress the vines, and produce smaller grapes with more concentrated flavor.",
      "The gravelly Bale loam soils in Oakville and Rutherford are considered the best Cabernet soils in the United States.",
      "Volcanic soils near Calistoga and on the mountain AVAs add a sharp, mineral quality to the wine that valley floor wines rarely have.",
    ],

    vintageThesis: "Most Napa vintages produce good wine, but the difference between a great year and a troubled one is significant and worth knowing.",
    vintagePoints: [
      "2022 had near-perfect conditions — no extreme heat, no fires, steady ripening all season. These wines should age 15–25 years.",
      "2013 and 2019 are also exceptional: long, even growing seasons with no major problems.",
      "2020 and 2017 were hit by wildfires during harvest. Some wines from those years have a smoky taste — worth asking before you buy.",
      "Drought years like 2021 and 2015 produced smaller crops but often very concentrated, powerful wines.",
    ],

    wineryThesis: "Napa Valley has wineries at every price level, from large commercial operations to tiny producers making fewer than 500 cases a year.",
    wineryPoints: [
      "Screaming Eagle and Harlan Estate are among the most sought-after wines in the world, each making fewer than 1,000 cases a year and selling for $1,000+.",
      "Robert Mondavi Winery, opened in 1966, was the first major Napa winery to seriously compete with France — it set the standard for what California wine could be.",
      "Stag's Leap Wine Cellars won the famous 1976 Paris blind tasting, beating top Bordeaux wines with a Napa Cabernet and putting the valley on the world map.",
      "Opus One is a partnership between the Mondavi family and Bordeaux's Château Mouton Rothschild — it opened in 1979 as a symbol of Napa's arrival as a world-class region.",
    ],
  },

  {
    key: "oakville",
    name: "Oakville",
    lat: 38.435,
    lng: -122.405,
    tier: "sub",
    style: "cab",
    macroRegion: "north-coast",
    parentKey: "napa-valley",

    terroirThesis: "Oakville is often called Napa's best mile because its soils and climate hit the sweet spot for Cabernet Sauvignon.",
    terroirPoints: [
      "The flat benchland gets enough heat to fully ripen Cabernet but benefits from bay breezes that keep the wine fresh.",
      "Gravelly loam soils drain well, forcing vines to grow deep roots and produce small, intensely flavored grapes.",
      "Three of Napa's most famous vineyards — To Kalon, Harlan, and Opus One — all sit within Oakville's boundaries.",
    ],

    climateThesis: "Oakville sits in the middle of the valley where heat and bay cooling balance each other almost perfectly.",
    climatePoints: [
      "It's warm enough to ripen Cabernet fully but far enough from the bay to avoid the cold that limits the south.",
      "Afternoon winds pick up around 3–4pm, cooling the vines during the warmest part of the day.",
      "This location means Oakville Cabernet tends to be ripe and full but not too soft or heavy.",
    ],

    soilThesis: "The Bale gravelly loam that covers most of Oakville's benchland is considered the finest Cabernet soil in America.",
    soilPoints: [
      "The gravel drains quickly after rain, forcing vines to work harder to find water.",
      "Stressed vines produce smaller berries with thicker skins, which means more flavor and color in the wine.",
      "Deeper in the soil there are layers of clay that hold just enough water to keep vines alive during dry summers without irrigation.",
    ],

    vintageThesis: "Oakville follows the same vintage pattern as Napa Valley overall — good most years, exceptional a few times a decade.",
    vintagePoints: [
      "2022, 2019, and 2013 were the standout recent vintages — long, even seasons that produced deeply structured wines.",
      "Being in the middle of the valley, Oakville avoided some of the fire smoke that affected northern and eastern parts of Napa in 2017 and 2020.",
      "Even in average years, the benchland soils tend to produce consistently good wine.",
    ],

    wineryThesis: "Oakville has a higher concentration of famous wineries per square mile than almost anywhere in California.",
    wineryPoints: [
      "Opus One, the Mondavi-Rothschild joint venture, sits on Oakville's western benchland and produces one of California's most recognizable bottles.",
      "Harlan Estate, from the same small area, consistently sells out its allocation each year at $400+ per bottle.",
      "Robert Mondavi's To Kalon Vineyard in Oakville has been producing Cabernet since 1966 and is considered a benchmark for the region.",
    ],
  },

  {
    key: "rutherford",
    name: "Rutherford",
    lat: 38.466,
    lng: -122.41,
    tier: "sub",
    style: "cab",
    macroRegion: "north-coast",
    parentKey: "napa-valley",

    terroirThesis: "Rutherford is famous for a quality known as 'Rutherford Dust' — a dry, earthy, slightly savory texture that shows up on the finish of wines made here.",
    terroirPoints: [
      "This quality comes from the combination of the benchland soils, the slightly warmer temperatures, and the age of the vines.",
      "Winemakers noticed the dusty mid-palate texture decades ago and could never quite explain it — it's widely accepted as a real, place-specific quality.",
      "The best Rutherford Cabs show ripe dark fruit on the front, then that dry, earthy texture in the middle, and a long, firm finish.",
    ],

    climateThesis: "Rutherford runs slightly warmer than Oakville to its south, which gives wines a fuller body and a slightly richer texture.",
    climatePoints: [
      "Sitting farther from the bay, Rutherford accumulates a bit more heat over the growing season.",
      "Evenings still cool down significantly, preserving enough acid to give the wine structure.",
      "The combination of warm days and cool nights is what allows Cabernet to ripen fully while staying balanced.",
    ],

    soilThesis: "Rutherford's benchland soils are similar to Oakville's but slightly deeper, producing wines with a little more weight.",
    soilPoints: [
      "The Bale gravelly loam continues north from Oakville into Rutherford, giving similar drainage and vine stress.",
      "Deeper alluvial deposits under the benchland hold more water, which means larger crops than on rockier hillside sites.",
      "Soils closer to the hills become thinner and more volcanic, producing more structured and longer-aging wines.",
    ],

    vintageThesis: "Rutherford follows the same vintage conditions as Napa Valley, but the benchland sites tend to produce consistently even across different years.",
    vintagePoints: [
      "2022, 2019, and 2013 are the recent highlight vintages for Rutherford Cabernet.",
      "The deep benchland soils hold water from winter rains, which buffers vines against drought — useful in dry years like 2021.",
      "Fire smoke from 2017 and 2020 affected some producers more than others depending on harvest timing.",
    ],

    wineryThesis: "Rutherford is home to some of Napa's oldest and most storied wineries, including operations that date back to the 1880s.",
    wineryPoints: [
      "Inglenook (formerly Niebaum-Coppola) was founded in 1879 and is one of the oldest continuously operating wineries in Napa.",
      "Beaulieu Vineyard (BV) was founded in 1900 and its Georges de Latour Private Reserve Cabernet has been made every vintage since 1936.",
      "Frog's Leap, founded in 1981, became one of California's early organic farming advocates and produces Rutherford Cabs built to age.",
    ],
  },

  {
    key: "stags-leap",
    name: "Stags Leap District",
    lat: 38.4,
    lng: -122.36,
    tier: "sub",
    style: "cab",
    macroRegion: "north-coast",
    parentKey: "napa-valley",

    terroirThesis: "Stags Leap makes Napa's most elegant Cabernet — less powerful than hillside wines, more refined than valley floor wines.",
    terroirPoints: [
      "The combination of volcanic soils and afternoon bay winds produces Cabernet with red fruit instead of dark fruit, and silky tannins instead of firm ones.",
      "This style was what won the 1976 Paris blind tasting — judges thought they were drinking fine Bordeaux.",
      "The iron-rich volcanic soils give the wine a mineral quality you don't find in other parts of Napa.",
    ],

    climateThesis: "Stags Leap is the coolest part of the Napa Valley floor because strong afternoon winds funnel through the Silverado area.",
    climatePoints: [
      "The Vaca Mountains to the east create a natural wind gap that funnels cool bay air across the benchland each afternoon.",
      "This means Stags Leap has lower total heat than Oakville or Rutherford, which keeps Cabernet flavors on the red and fresh side.",
      "Grapes tend to ripen about a week later than in the middle valley, giving them more time to develop complexity.",
    ],

    soilThesis: "The volcanic tuff soils in Stags Leap are different from the alluvial soils elsewhere in Napa, and they shape the wine's flavor directly.",
    soilPoints: [
      "Volcanic tuff is porous rock formed from compressed volcanic ash — it drains fast and holds warmth well.",
      "These soils are high in iron, which contributes a savory, slightly metallic mineral note to the wine.",
      "The volcanic character is one reason why Stags Leap Cabernet is so different from Rutherford or Oakville even though they're only a few miles apart.",
    ],

    vintageThesis: "Stags Leap's cooler conditions make it more sensitive to vintage variation than warmer parts of Napa.",
    vintagePoints: [
      "In great years like 2022 and 2013, the long season produces wines with remarkable depth and age potential.",
      "In hot years, the extra warmth actually helps Stags Leap reach full ripeness that cooler temperatures might otherwise prevent.",
      "The 2019 vintage produced exceptionally elegant Stags Leap Cabernet — worth seeking out.",
    ],

    wineryThesis: "Stags Leap has a small number of wineries but several of them are historically significant.",
    wineryPoints: [
      "Stag's Leap Wine Cellars (with an apostrophe) is where the 1976 Paris Tasting wine was made — one of the most important bottles in American wine history.",
      "Shafer Vineyards, family-owned since 1972, makes Hillside Select from the rocky slopes above the benchland — one of California's most collected Cabs.",
      "Pine Ridge Winery farms several distinct blocks within the district, each bottled separately to show terroir differences.",
    ],
  },

  {
    key: "mount-veeder",
    name: "Mount Veeder",
    lat: 38.38,
    lng: -122.47,
    tier: "sub",
    style: "cab",
    macroRegion: "north-coast",
    parentKey: "napa-valley",

    terroirThesis: "Mount Veeder makes the most structured and long-lived Cabernet in Napa — wines that need years to open up but can last 30+ years.",
    terroirPoints: [
      "High elevation (400–2,600 feet), thin rocky soils, and strong winds off the Pacific force vines into extreme stress.",
      "Stressed mountain vines produce tiny grapes with very thick skins, which means high tannin and deep color.",
      "These wines are not made for early drinking — they reward patience more than any other Napa AVA.",
    ],

    climateThesis: "Mount Veeder sits above the morning fog and gets direct sunlight earlier, but the Pacific breeze and elevation keep temperatures significantly cooler than the valley floor.",
    climatePoints: [
      "Elevation drops the average temperature by 5–10°F compared to the valley floor below.",
      "Strong afternoon winds from the Pacific cool vines during the hottest part of the day.",
      "The longer hang time at cooler temperatures produces grapes with more complexity and better natural acidity.",
    ],

    soilThesis: "The thin, rocky soils on Mount Veeder's slopes are the main reason the wines taste so different from valley floor Napa Cab.",
    soilPoints: [
      "Soils are mostly volcanic in origin — loose, stony, and quick-draining with very little organic matter.",
      "Thin soils mean vines have a small root volume, limiting how much fruit they can produce.",
      "Low yields from stressed vines concentrate flavor into fewer grapes, which is why mountain Cabs from here are so intense.",
    ],

    vintageThesis: "Mountain vintages in Napa Valley follow the same broad patterns as the valley, but weather events hit harder at elevation.",
    vintagePoints: [
      "Cool years like 2010 produced exceptional mountain Cabs — the extra hang time was perfectly suited to these already-cool sites.",
      "Hot years can actually help Mount Veeder reach full ripeness on sites that might otherwise struggle.",
      "2022 and 2019 were both strong years for mountain Cabernet across Napa.",
    ],

    wineryThesis: "Mount Veeder has fewer wineries than the valley floor, but several have built reputations for some of Napa's most age-worthy wines.",
    wineryPoints: [
      "Mayacamas Vineyards has farmed the mountain since 1941 and makes Cabernet in a deliberately restrained style built for long aging.",
      "Hess Collection acquired its Mount Veeder vineyard in the 1980s and produces one of the more widely available mountain Cabs.",
      "Mount Veeder Winery focuses entirely on the single AVA, making Cabernet that regularly earns scores in the mid-90s.",
    ],
  },

  {
    key: "spring-mountain",
    name: "Spring Mountain District",
    lat: 38.505,
    lng: -122.49,
    tier: "sub",
    style: "cab",
    macroRegion: "north-coast",
    parentKey: "napa-valley",

    terroirThesis: "Spring Mountain makes powerful, structured Cabernet from west-facing mountain slopes above the town of St. Helena.",
    terroirPoints: [
      "The west-facing exposure means vines get afternoon sun and cool quickly in the evenings, building both ripeness and acid.",
      "Natural springs and streams run through the district, providing water during dry summers without the need for much irrigation.",
      "Wines here tend to be darker and more tannic than valley floor wines — they need 7–10 years to start drinking well.",
    ],

    climateThesis: "Spring Mountain's elevation (400–2,600 feet) creates temperatures 10–15°F cooler than the valley floor directly below.",
    climatePoints: [
      "Cool Pacific air from the west hits the mountain directly, especially in the afternoon.",
      "Morning fog often sits below the vineyards, meaning mountain vines get sunlight earlier than valley vines.",
      "The large day-night temperature swing (up to 50°F) slows ripening and preserves the natural tartness that holds wines together.",
    ],

    soilThesis: "Spring Mountain soils are a mix of volcanic and sedimentary rock that drains fast and forces vines to dig deep.",
    soilPoints: [
      "Much of the mountain is formed from ancient seabed material — shale and sandstone — that holds warmth from the sun.",
      "Volcanic intrusions create pockets of mineral-rich soil across the mountain.",
      "The steep gradient means topsoil is thin, which naturally limits how big the crop can be.",
    ],

    vintageThesis: "Spring Mountain follows Napa's general vintage pattern but the mountain microclimate buffers against some valley-floor extremes.",
    vintagePoints: [
      "In hot years, the elevation keeps temperatures in check, avoiding the over-ripe flavors that can affect valley wines.",
      "In cold years, the extra sun exposure on steep slopes helps achieve full ripeness.",
      "2022, 2019, and 2013 were all exceptional years for Spring Mountain Cabernet.",
    ],

    wineryThesis: "Spring Mountain has a small group of dedicated estate producers who farm steep terrain that few large operations would attempt.",
    wineryPoints: [
      "Pride Mountain Vineyards straddles the Napa-Sonoma county line on Spring Mountain and produces Cabernet, Merlot, and Viognier.",
      "Smith-Madrone has farmed the mountain since 1971 — one of the oldest continuous farming operations on Napa's western slopes.",
      "Terra Valentine specializes in old-vine Cabernet from some of the highest elevation sites in the district.",
    ],
  },

  {
    key: "howell-mountain",
    name: "Howell Mountain",
    lat: 38.58,
    lng: -122.38,
    tier: "sub",
    style: "cab",
    macroRegion: "north-coast",
    parentKey: "napa-valley",

    terroirThesis: "Howell Mountain was the first American wine region officially recognized for being above the fog line — its wines are among the most powerful and longest-lived in Napa.",
    terroirPoints: [
      "The AVA begins at 1,400 feet, where the mountain rises above the morning fog that fills the valley below.",
      "Above the fog means more direct sunlight, more UV exposure, and thicker grape skins — all of which add depth and structure to the wine.",
      "Howell Mountain Zinfandel and Cabernet both need 5–10 years of cellaring before they really open up.",
    ],

    climateThesis: "Howell Mountain gets intense sunlight during the day but cools down dramatically at night — the gap between daytime and nighttime temperatures is one of the widest in Napa.",
    climatePoints: [
      "Being above the fog means vines receive full sun from sunrise instead of waiting for the fog to burn off.",
      "At 1,400–2,600 feet, nighttime temperatures regularly drop below 50°F, even in summer.",
      "This dramatic swing between warm days and cold nights builds flavor slowly and preserves the natural acid that holds wines together over decades.",
    ],

    soilThesis: "Howell Mountain's volcanic soils — a pale grey ash called Aiken loam — are unique in Napa and produce wines with a distinct mineral character.",
    soilPoints: [
      "Aiken loam is light in color, low in organic matter, and extremely well-drained.",
      "Vines planted in this soil produce small crops automatically — the soil is too poor to support high yields.",
      "The volcanic origin gives wines a slight earthy, mineral edge that distinguishes them from the fruit-forward valley floor style.",
    ],

    vintageThesis: "Howell Mountain follows Napa's vintage conditions but the mountain elevation provides some natural insulation from heat events.",
    vintagePoints: [
      "In very hot years, elevation keeps peak temperatures several degrees cooler than the valley floor.",
      "Dunn Vineyards, the most famous producer here, has made wines in every vintage since 1979 — looking at those wines shows how consistently good the mountain performs.",
      "2022, 2019, and 2013 were all strong years across the mountain AVAs.",
    ],

    wineryThesis: "Howell Mountain has a small but committed group of producers who specifically chose the mountain for its ability to make wines that age for decades.",
    wineryPoints: [
      "Dunn Vineyards was founded in 1979 by Randy Dunn and is one of the most celebrated names in California for age-worthy Cabernet.",
      "La Jota Vineyard Company has farmed Howell Mountain since 1974 and focuses on Cabernet and Cabernet Franc.",
      "Ladera Vineyards took over the old Stag's Leap winery building and now farms certified organic estate vineyards on the mountain.",
    ],
  },

  // ── CARNEROS ─────────────────────────────────────────────────────────────

  {
    key: "carneros",
    name: "Los Carneros",
    lat: 38.22,
    lng: -122.38,
    tier: "major",
    style: "pinot",
    macroRegion: "north-coast",
    polygon: [
      [38.29, -122.60], [38.29, -122.25],
      [38.13, -122.25], [38.13, -122.60],
    ],

    terroirThesis: "Carneros is the coolest part of both Napa and Sonoma, and it's where both regions grow their best Pinot Noir and Chardonnay.",
    terroirPoints: [
      "The region sits right at the northern tip of San Pablo Bay, where cold, foggy air from the bay reaches the vineyards directly.",
      "That constant wind and cool temperature make it too cold for Cabernet to ripen — but perfect for varieties that prefer a shorter, colder season.",
      "Carneros spans both Napa and Sonoma counties, and the county line runs right through the middle of some vineyards.",
    ],

    climateThesis: "Carneros is cold, windy, and foggy — conditions that make it feel more like northern France than California.",
    climatePoints: [
      "San Pablo Bay fog rolls in every morning and the wind off the bay blows almost every afternoon.",
      "Average summer temperatures here are 10–15°F cooler than the Napa Valley floor just a few miles north.",
      "The growing season is about three weeks shorter than central Napa, which means grapes retain more natural tartness.",
      "Strong afternoon winds physically harden the grape skins, which contributes to the wine's texture.",
    ],

    soilThesis: "Carneros has shallow, poorly-drained clay soils that are difficult to farm but naturally limit how much fruit the vines produce.",
    soilPoints: [
      "The shallow clay layer sits over hardpan, which stops vine roots from growing too deep.",
      "These soils hold water from winter rain and slowly release it through the summer, acting as a natural drip system.",
      "Low fertility means small crops, which forces the vine to concentrate flavor into fewer grapes.",
      "The soil's moisture-holding quality is unusual in California — most wine regions drain quickly and rely on irrigation.",
    ],

    vintageThesis: "Carneros performs best in warmer vintages when the extra heat helps fully ripen Pinot Noir without losing the freshness that defines the region.",
    vintagePoints: [
      "Cool years can leave Carneros wines thin and sharp — not enough heat to develop the mid-palate weight that makes Pinot satisfying.",
      "2022 and 2019 were standout years: warm enough to ripen fully but with the cool, slow finish that Carneros does best.",
      "Harvest here typically happens 2–3 weeks after warmer parts of Napa and Sonoma.",
    ],

    wineryThesis: "Carneros built its reputation in the 1980s as a serious source of California Pinot Noir and Chardonnay, and several of its original wineries are still the best.",
    wineryPoints: [
      "Saintsbury was one of the first wineries to focus exclusively on Pinot Noir in Carneros, starting in 1981 — it helped prove the region's potential.",
      "Domaine Carneros is a joint venture between the Taittinger family of Champagne and the Kobrand Corporation; they make California's best traditional-method sparkling wine.",
      "Etude makes single-vineyard Pinot Noir from both Carneros and other cool California regions, often showing how much difference the specific site makes.",
    ],
  },

  // ── SONOMA ───────────────────────────────────────────────────────────────

  {
    key: "russian-river-valley",
    name: "Russian River Valley",
    lat: 38.42,
    lng: -122.92,
    tier: "major",
    style: "pinot",
    macroRegion: "north-coast",
    polygon: [
      [38.64, -123.08], [38.64, -122.68],
      [38.23, -122.68], [38.23, -123.08],
    ],

    terroirThesis: "Russian River Valley makes California's most consistent and celebrated Pinot Noir because of a rare combination of sandy soils and cold Pacific air funneled inland through a gap in the hills.",
    terroirPoints: [
      "The Petaluma Wind Gap — a low point in the coastal hills — channels cold, foggy Pacific air directly into the valley every morning.",
      "The sandy Goldridge soil drains fast and warms up quickly once the fog lifts, giving vines cool mornings and warm afternoons.",
      "This push-pull of cold and warmth is what lets Pinot Noir here develop both ripe red fruit and the tartness that gives wine its structure.",
    ],

    climateThesis: "Russian River Valley is cold enough for Pinot Noir to develop complexity but warm enough to ripen it fully — a balance few California regions achieve.",
    climatePoints: [
      "Fog from the Pacific rolls in through the Petaluma Gap every morning and takes until mid-morning to burn off.",
      "Once the fog lifts, afternoon temperatures can reach 80–85°F, giving grapes a warm second half of the day.",
      "Evenings cool quickly, dropping 30–40°F from the afternoon high — which is what builds complexity in Pinot Noir.",
      "The region is classified as Region I or II on the heat scale, which puts it in the same range as Burgundy and Champagne.",
    ],

    soilThesis: "The Goldridge sandy loam soil that covers most of Russian River Valley is unlike any other Pinot Noir soil in California.",
    soilPoints: [
      "Goldridge is a light, sandy soil that warms up fast in the morning after the fog lifts.",
      "It drains so quickly that vines experience mild water stress without irrigation, which concentrates flavor.",
      "The fine-grained texture of Goldridge soil is believed to contribute to the silky, almost powder-soft texture of Russian River Pinot.",
      "Where the soil changes to clay or heavier loam, the wines change character noticeably — farmers pay close attention to soil type.",
    ],

    vintageThesis: "Russian River Pinot is better in years when the cool season stretches long, allowing slow ripening over many weeks rather than a quick burst of heat.",
    vintagePoints: [
      "2019 produced textbook Russian River Pinot: long, slow, even ripening with exceptional balance between fruit and freshness.",
      "2016 is widely considered the finest recent vintage here — wines with remarkable structure and aging potential.",
      "2022 was also excellent — cooler than usual through most of the season before a warm finish brought everything to ripeness.",
      "Hot, compressed seasons like parts of 2015 can produce soft, early-drinking wines that lack the structure Russian River is known for.",
    ],

    wineryThesis: "Russian River Valley has some of the most sought-after Pinot Noir producers in America, ranging from cult bottlings that sell by allocation to widely distributed labels.",
    wineryPoints: [
      "Williams Selyem started in a garage in 1981 and became famous for making some of California's first world-class Pinot Noir — its wines still sell out within hours of release.",
      "Rochioli has farmed the same family vineyard since the 1930s and makes four single-vineyard Pinot Noirs that regularly rank among California's best.",
      "Kosta Browne was founded by two restaurant workers in 1997 who started with $2,600 and built one of the most recognized Pinot Noir brands in America.",
      "Gary Farrell makes a more European-leaning style of Pinot — lighter, more structured — from the same region, showing that producer choices matter as much as place.",
    ],
  },

  {
    key: "sonoma-coast",
    name: "Sonoma Coast",
    lat: 38.55,
    lng: -123.1,
    tier: "major",
    style: "pinot",
    macroRegion: "north-coast",
    polygon: [
      [38.85, -123.55], [38.85, -122.85],
      [38.10, -122.85], [38.10, -123.55],
    ],

    terroirThesis: "The true coastal Sonoma Coast AVA — particularly the Fort Ross-Seaview area along the cliffs — makes some of the most structurally intense and age-worthy Pinot Noir in California.",
    terroirPoints: [
      "Vineyards sit right on the Pacific Coast, which means temperatures are cold and consistent all season with very little summer heat.",
      "The vines here rarely see temperatures above 75°F, which slows ripening dramatically and builds acid and structure into the wine.",
      "The resulting wines are tighter and more mineral than warmer Sonoma Pinot — they need more time in bottle and reward patience.",
    ],

    climateThesis: "Sonoma Coast is among the coldest wine-growing areas in California because the Pacific Ocean is right next door.",
    climatePoints: [
      "Cold Pacific water just offshore keeps air temperatures low even in midsummer.",
      "Fog is nearly constant from spring through mid-summer, sometimes never fully clearing on the coolest coastal sites.",
      "The daytime-to-nighttime temperature swing here can reach 50°F — wider than almost any other California wine region.",
      "Growing degree days (a measure of total heat over the season) are comparable to Burgundy and some years even cooler.",
    ],

    soilThesis: "Coastal Sonoma soils are rocky and shallow, formed from ancient seabed material pushed up by tectonic activity.",
    soilPoints: [
      "The soils are rich in minerals from their marine origin and drain quickly on the steep hillside terrain.",
      "Shallow depth forces vine roots to penetrate rock, which slows vine growth and keeps yields naturally low.",
      "Different slope aspects — whether a hillside faces north, south, east, or west — can change the wine character significantly within the same vineyard.",
    ],

    vintageThesis: "Cool coastal sites like this are more vintage-sensitive than warm inland areas because there's less buffer — bad weather has a bigger impact.",
    vintagePoints: [
      "In warm years like 2022, coastal Sonoma produces wines with more richness and mid-palate weight without losing its signature freshness.",
      "In cold years, underripe fruit can produce green, sharp wines that don't develop well.",
      "The best producers farm intensively and harvest by taste rather than by calendar — timing matters enormously here.",
    ],

    wineryThesis: "Sonoma Coast has a small group of pioneering producers who specifically sought out the coldest, most challenging sites to make wine that stands apart from warmer California styles.",
    wineryPoints: [
      "Hirsch Vineyards farms the David Hirsch's original coastal site, which he planted in 1980 when no one else believed grapes could ripen there — the wines proved them wrong.",
      "Littorai, founded by Ted Lemon who trained in Burgundy, has farmed biodynamically for decades and makes Pinot and Chardonnay with pronounced mineral and tension.",
      "Peay Vineyards is a family farm on one of the most exposed ridges in the region, making wines that are unlike anything from warmer California AVAs.",
    ],
  },

  {
    key: "alexander-valley",
    name: "Alexander Valley",
    lat: 38.72,
    lng: -122.89,
    tier: "major",
    style: "cab",
    macroRegion: "north-coast",
    polygon: [
      [38.85, -123.07], [38.85, -122.77],
      [38.57, -122.77], [38.57, -123.07],
    ],

    terroirThesis: "Alexander Valley makes approachable, ripe Cabernet Sauvignon that is often easier to drink young than Napa Valley Cab at a much lower price point.",
    terroirPoints: [
      "The valley runs 25 miles north to south and is completely enclosed by mountains, which traps warm air and makes summers consistently hot.",
      "Warm temperatures mean Cabernet ripens to full maturity every year — there's very little vintage variation compared to cooler regions.",
      "The style tends toward plum, chocolate, and smooth tannins rather than the structured cassis and graphite of Napa — friendlier for everyday drinking.",
    ],

    climateThesis: "Alexander Valley is warmer than most of Sonoma County because it sits inland and the surrounding mountains block the coastal cold.",
    climatePoints: [
      "Daytime temperatures regularly reach 95–100°F in summer, which is rare in most of Sonoma.",
      "The Russian River runs through the valley floor and creates pockets of cooler, more humid air near the riverbank.",
      "Morning fog reaches the southern end of the valley from the Chalk Hill gap but rarely penetrates the warmer northern sections.",
      "This range of temperatures within a single valley means different parts of Alexander Valley produce quite different wines.",
    ],

    soilThesis: "Alexander Valley has a mix of soils — sandy loam near the river, clay on the benchland, and volcanic on the hillsides — each producing a distinct wine style.",
    soilPoints: [
      "River benchland soils are well-drained sandy loam that produces consistent, even ripening and full-flavored fruit.",
      "Clay soils hold more water and produce wines with a rounder, more plush texture.",
      "Hillside volcanic soils make more structured, firm-tannin Cabernet that ages better than the valley floor wines.",
    ],

    vintageThesis: "Alexander Valley's warm climate produces reliably good wine most years, with very few outright failures even in difficult vintages.",
    vintagePoints: [
      "Because the valley is warm and sheltered, it rarely has the cold summers or harvest rains that can damage cooler regions.",
      "2022 and 2019 were excellent across the board; the valley's warmth pushed fruit to full, even ripeness.",
      "Very hot years can produce wines that are a bit soft and low in acid, but most Alexander Valley producers manage for this by harvesting early.",
    ],

    wineryThesis: "Alexander Valley is home to well-known brands that offer quality Cabernet at more accessible prices than Napa Valley.",
    wineryPoints: [
      "Jordan Vineyard & Winery has been making Bordeaux-style Cabernet in Alexander Valley since 1972, and its wines are known for elegance over power.",
      "Silver Oak Alexander Valley is the more affordable bottling from the Silver Oak brand, which also makes Napa Valley Cabernet — the two show clearly how much location changes the wine.",
      "Stonestreet Estate farms mountain vineyards above the valley floor and makes some of Alexander Valley's most structured, age-worthy Cabernet.",
    ],
  },

  {
    key: "dry-creek-valley",
    name: "Dry Creek Valley",
    lat: 38.61,
    lng: -122.91,
    tier: "major",
    style: "zin",
    macroRegion: "north-coast",
    polygon: [
      [38.73, -123.04], [38.73, -122.88],
      [38.57, -122.88], [38.57, -123.04],
    ],

    terroirThesis: "Dry Creek Valley is the best place in California to grow Zinfandel, and some of its old vines have been producing fruit for over 100 years.",
    terroirPoints: [
      "The small, elongated valley stays fog-free compared to most of Sonoma — Zinfandel needs warmth, and Dry Creek delivers it.",
      "Old vines (some over 100 years old) have deep root systems that find water far underground, keeping them alive in dry years without irrigation.",
      "These ancient vines produce very small crops of tiny, intensely flavored grapes — the opposite of a young vine planted to maximize yield.",
    ],

    climateThesis: "Dry Creek Valley is warm enough for Zinfandel to ripen fully but gets enough morning cool to keep the wine from being just jam in a glass.",
    climatePoints: [
      "Summer days reach 85–95°F, which is warm enough to develop Zinfandel's characteristic blackberry and spice flavors.",
      "A gap at the southern end of the valley allows some marine air to moderate temperatures in the late afternoon.",
      "The lack of constant fog means grapes dry out quickly after any morning dew, keeping the fruit clean and disease-free.",
      "Harvest is typically in September for Zinfandel, about two weeks earlier than cooler Sonoma regions.",
    ],

    soilThesis: "The two distinct soil types in Dry Creek — benchland and valley floor — produce two different styles of Zinfandel.",
    soilPoints: [
      "The benchland (a raised terrace above the valley floor) has well-drained gravelly loam that forces vine stress and produces the best, most concentrated fruit.",
      "Valley floor soils are heavier clay, hold more water, and produce larger, softer Zinfandel.",
      "Most serious producers focus on the benchland sites where soil stress naturally limits the crop.",
      "Old vines regardless of soil location tend to regulate themselves — they produce small crops no matter what.",
    ],

    vintageThesis: "Dry Creek's warm, sheltered climate means it rarely has a truly bad year, but the best vintages are those with a cool stretch in late summer.",
    vintagePoints: [
      "A cool period in August slows the final push to ripeness and lets Zinfandel develop complexity rather than just sweetness.",
      "Very hot years can push Zinfandel to high sugar levels, producing wines with 16%+ alcohol that feel heavy.",
      "2022, 2019, and 2016 were all excellent years for Dry Creek Zinfandel — balanced heat and freshness.",
    ],

    wineryThesis: "Dry Creek Valley's Zinfandel producers range from large-volume brands to tiny family farms, and the family farms consistently make the more interesting wine.",
    wineryPoints: [
      "A. Rafanelli Winery is a fourth-generation family farm that sells only from the tasting room — no retailers, no mail order for most wines — and the Zinfandel is consistently one of California's finest.",
      "Ridge Lytton Springs farms old vines on both sides of the valley and makes Zinfandel blended with small amounts of Petite Sirah and Carignane — the way it would have been made 100 years ago.",
      "Seghesio Family Vineyards has farmed the same Zinfandel vines since 1895 and is one of the most historically connected producers in the valley.",
    ],
  },

  // ── ANDERSON VALLEY ───────────────────────────────────────────────────────

  {
    key: "anderson-valley",
    name: "Anderson Valley",
    lat: 38.99,
    lng: -123.5,
    tier: "major",
    style: "pinot",
    macroRegion: "north-coast",
    polygon: [
      [39.22, -123.73], [39.22, -123.35],
      [38.87, -123.35], [38.87, -123.73],
    ],

    terroirThesis: "Anderson Valley in Mendocino County is one of California's best-kept wine secrets — a cold, narrow coastal valley that produces Pinot Noir and aromatic white wines that taste more like Alsace than California.",
    terroirPoints: [
      "The valley is only about 15 miles long and opens at the western end directly toward the Pacific Ocean.",
      "Cold Pacific air floods in from the coast each afternoon, keeping temperatures cool enough for grapes that struggle in warmer California regions.",
      "Gewürztraminer and Riesling grow exceptionally well here — varieties that require cool temperatures and struggle almost everywhere else in California.",
    ],

    climateThesis: "Anderson Valley has one of the widest day-to-night temperature swings in California — warm enough to ripen, cold enough at night to preserve freshness.",
    climatePoints: [
      "Summer days can reach 85°F in the valley's interior, but nighttime temperatures regularly drop to 45–50°F.",
      "This 40-degree daily swing is what builds both ripeness and acidity into the grapes.",
      "Morning fog from the Pacific sits in the valley for several hours, significantly reducing how much heat vines accumulate.",
      "The western end of the valley — closer to the coast — is markedly colder than the eastern end, a 10-mile stretch that changes wine character dramatically.",
    ],

    soilThesis: "Anderson Valley soils are a mix of gravelly loam and clay, but it's the climate that defines the wines more than the soil here.",
    soilPoints: [
      "The valley floor has deep alluvial deposits that hold water through the dry season.",
      "Hillside sites have thinner, rockier soils that produce lower yields and more concentrated wine.",
      "Benchland soils near the middle of the valley are considered the prime growing areas for Pinot Noir.",
    ],

    vintageThesis: "Anderson Valley performs best in slightly warmer years when the extra heat helps Pinot Noir fully ripen without losing the freshness the region is known for.",
    vintagePoints: [
      "Cold years can leave wines underripe and too sharp — the narrow temperature window here means there's little room for error.",
      "Warmer years like 2022 and 2019 produced excellent results: fully ripe Pinot with the high acid that makes these wines age well.",
      "Sparkling wine production benefits from even the cooler years — Roederer Estate uses underripe fruit intentionally for its base wine.",
    ],

    wineryThesis: "Anderson Valley's small number of serious producers have focused on quality over volume, building a strong reputation in a region that most California wine drinkers have never visited.",
    wineryPoints: [
      "Roederer Estate is owned by the Champagne house Louis Roederer and makes California's finest traditional-method sparkling wine entirely from Anderson Valley grapes.",
      "Navarro Vineyards, family-owned since 1974, makes some of California's only serious Gewürztraminer and Riesling alongside excellent Pinot Noir.",
      "Littorai, better known for its Sonoma Coast wines, also farms Anderson Valley and uses the grapes to make Pinot of exceptional structure and minerality.",
    ],
  },

  // ── CENTRAL COAST ────────────────────────────────────────────────────────

  {
    key: "santa-cruz-mountains",
    name: "Santa Cruz Mountains",
    lat: 37.18,
    lng: -122.1,
    tier: "major",
    style: "cab",
    macroRegion: "central-coast",
    polygon: [
      [37.58, -122.27], [37.58, -121.86],
      [36.83, -121.86], [36.83, -122.27],
    ],

    terroirThesis: "Santa Cruz Mountains makes some of California's most age-worthy Cabernet Sauvignon — wines that rival Napa at a fraction of the price — from elevations above the Bay Area fog.",
    terroirPoints: [
      "The mountains sit just south of San Francisco, rising from sea level to over 2,600 feet.",
      "Ridge Monte Bello, from a single vineyard at 2,300 feet, was one of the wines that beat Bordeaux in the famous 1976 Paris Tasting.",
      "Elevation, thin soils, and cool Pacific air combine to produce wines with remarkable freshness and structure that can age 20–30 years.",
    ],

    climateThesis: "Santa Cruz Mountains temperatures are shaped by elevation and which side of the ridge you're on — the difference within a few miles can be striking.",
    climatePoints: [
      "West-facing slopes get more Pacific influence and cool down quickly each afternoon.",
      "East-facing slopes get more warmth from the sun and accumulate more heat through the day.",
      "Fog from the Pacific and San Francisco Bay fills the low valleys, but sites above 1,000 feet often sit above the fog in full sunshine.",
      "The average temperature is 5–10°F cooler than the Napa Valley floor at the same time of year.",
    ],

    soilThesis: "The thin, rocky soils of the Santa Cruz Mountains naturally limit grape yields and concentrate flavor into fewer, smaller berries.",
    soilPoints: [
      "Most soils are a mix of shale, sandstone, and compressed clay over bedrock — none of them particularly fertile.",
      "Low fertility keeps vine yields small without any effort from the farmer.",
      "The Monte Bello site specifically has a thin layer of limestone-influenced soil that contributes a mineral quality to the wine.",
    ],

    vintageThesis: "Santa Cruz Mountains is more sensitive to vintage conditions than warmer regions — the cooler baseline means a cold year can produce underripe wine.",
    vintagePoints: [
      "The best vintages are slightly warmer years when full ripeness is achievable without losing freshness.",
      "2022 and 2019 were excellent — enough warmth for full development, enough cool nights for structure.",
      "Ridge Monte Bello releases each vintage about two years after harvest, suggesting how slowly these wines develop.",
    ],

    wineryThesis: "Santa Cruz Mountains has a small number of wineries making wines of exceptional quality, almost entirely under the radar of the mainstream wine market.",
    wineryPoints: [
      "Ridge Vineyards at Monte Bello has been making Cabernet from the same high-elevation site since 1962, producing one of California's most historically significant wines.",
      "Mt. Eden Vineyards farms ancient Chardonnay and Pinot Noir vines at 2,000 feet — the Chardonnay alone is reason to pay attention to this region.",
      "Rhys Vineyards is a newer operation focused on single-vineyard Pinot Noir from high-elevation Santa Cruz Mountain sites, building a strong reputation for wines of exceptional precision.",
    ],
  },

  {
    key: "paso-robles",
    name: "Paso Robles",
    lat: 35.6,
    lng: -120.7,
    tier: "major",
    style: "rhone",
    macroRegion: "central-coast",
    polygon: [
      [35.96, -121.08], [35.96, -120.33],
      [35.29, -120.33], [35.29, -121.08],
    ],

    terroirThesis: "Paso Robles is one of the most unusual wine regions in California — extremely hot days followed by extremely cold nights produce wines that are both powerful and surprisingly fresh.",
    terroirPoints: [
      "The temperature drops 50°F from afternoon to midnight in Paso Robles — a swing that's rare anywhere in the wine world.",
      "This allows grapes to ripen to full sweetness during the day while the cold nights preserve the natural tartness that keeps wine balanced.",
      "The region is best known for bold Zinfandel and Rhône varieties like Syrah, Grenache, and Mourvèdre — styles that love the heat.",
    ],

    climateThesis: "Paso Robles has hot, dry, Mediterranean summers but with a nightly temperature crash that sets it apart from other warm California regions.",
    climatePoints: [
      "Daytime highs of 95–105°F are common in summer, comparable to the warmest parts of the Central Valley.",
      "But the Templeton Gap — a break in the coastal hills — funnels cold marine air into the valley each evening, dropping temperatures rapidly after sunset.",
      "This nightly cooling is what allows grapes to develop complexity and preserve natural acid despite the intense daytime heat.",
      "The west side of Paso Robles (closer to the Templeton Gap) is meaningfully cooler than the east side — a distinction that producers pay close attention to.",
    ],

    soilThesis: "Paso Robles sits on a thick layer of calcareous (calcium-rich) soil and limestone that is unusual in California and similar to parts of southern France.",
    soilPoints: [
      "Calcareous soils are well-drained, warm up quickly, and contribute a particular mineral quality to wine.",
      "The limestone content is especially relevant for the Rhône varieties planted here — Grenache, Syrah, and Mourvèdre thrive in this type of soil in France's southern Rhône Valley.",
      "East of the Salinas River, deeper alluvial soils produce different (usually more fruit-forward) wine than the thinner calcareous soils to the west.",
      "Tablas Creek, one of the region's most important wineries, specifically chose Paso for its limestone soils when they were looking for a California location to plant French Rhône varieties.",
    ],

    vintageThesis: "Paso Robles is one of California's most consistent regions year to year because the extreme heat ensures full ripeness almost every vintage.",
    vintagePoints: [
      "Underripe fruit is rarely a problem here — the main challenge is harvesting before sugar levels get too high and alcohol too heavy.",
      "Years with a longer cool spring followed by a warm summer produce the most balanced wines.",
      "2022 and 2019 were both strong years — enough warmth without extreme heat spikes that can rush ripening.",
    ],

    wineryThesis: "Paso Robles has grown from a little-known Central Coast appellation into a serious wine region over the last 30 years, largely due to a group of committed producers who recognized its potential.",
    wineryPoints: [
      "Tablas Creek Vineyard was founded in 1989 as a joint venture between the Perrin family (of Château Beaucastel in Châteauneuf-du-Pape) and the Haas family — they brought Rhône cuttings from France and planted them in Paso's limestone soils.",
      "Turley Wine Cellars is the most famous Zinfandel producer in the region, farming old-vine sites across Paso and producing wines that can be cellared for 10+ years.",
      "Saxum Vineyards, founded in 2001, put Paso Robles on the map for high-end Rhône blends — its James Berry Vineyard wine has received near-perfect scores from critics.",
      "Justin Vineyards is the region's most visible brand nationally and helped establish Paso Robles' reputation for accessible, well-made Cabernet and Bordeaux-style blends.",
    ],
  },

  {
    key: "sta-rita-hills",
    name: "Sta. Rita Hills",
    lat: 34.62,
    lng: -120.22,
    tier: "major",
    style: "pinot",
    macroRegion: "central-coast",
    polygon: [
      [34.74, -120.50], [34.74, -120.08],
      [34.50, -120.08], [34.50, -120.50],
    ],

    terroirThesis: "Sta. Rita Hills makes the most structurally tense and mineral Pinot Noir in Southern California — the cold, the ancient seabed soils, and the wind all push the wine toward freshness over richness.",
    terroirPoints: [
      "The region sits at the western end of the Santa Ynez Valley, where the valley opens toward the Pacific and cold marine air floods in almost without interruption.",
      "Soils here are formed from diatomaceous earth — compressed shells of ancient microscopic algae — which gives the wine a unique flinty, mineral quality.",
      "Wines from here are typically tighter, more acidic, and more structured than Santa Barbara Pinot from warmer parts of the valley.",
    ],

    climateThesis: "Sta. Rita Hills is among the coldest wine-growing areas in Southern California because the Lompoc Gap allows direct Pacific influence with almost no buffering.",
    climatePoints: [
      "The Lompoc Gap is a break in the Santa Ynez Mountains that channels cold, foggy ocean air directly into the western valley.",
      "Average temperatures during the growing season are 5–10°F cooler than vineyards just 10 miles east.",
      "Fog frequently sits over the region through late morning, limiting sunshine hours and keeping heat accumulation low.",
      "The harvest here can be 2–4 weeks later than warmer Santa Barbara sites — the grapes need more time to ripen in the cold.",
    ],

    soilThesis: "Diatomaceous earth — the region's signature soil — is unlike any other wine soil in California and contributes directly to the wine's mineral quality.",
    soilPoints: [
      "Diatomite is formed from billions of microscopic marine organisms that died and settled on an ancient seabed — this land was underwater millions of years ago.",
      "The soil is extremely well-draining and low in fertility, which naturally limits vine yields.",
      "Its light color reflects heat back upward, warming the fruit from below and helping ripening in an otherwise cold site.",
      "Winemakers consistently point to the flinty, almost chalky mineral note in Sta. Rita Hills wines as coming directly from this soil.",
    ],

    vintageThesis: "Cool sites like Sta. Rita Hills are more vintage-variable than warm regions because small changes in seasonal temperature have a large impact on ripening.",
    vintagePoints: [
      "Warm vintages like 2022 produce wines with more richness and mid-palate weight while retaining the freshness the region is known for.",
      "Cool vintages can produce wines that are bright and energetic but sometimes lack the flesh to balance the high acidity.",
      "2019 was a standout year — long, cool ripening season followed by a warm October finish brought the grapes to perfect maturity.",
    ],

    wineryThesis: "Sta. Rita Hills has a tight group of producers who built their reputations specifically on the region's ability to make Pinot Noir unlike anywhere else in Southern California.",
    wineryPoints: [
      "Sea Smoke Cellars farms a steep south-facing slope and makes six different single-vineyard Pinot Noirs from the same property — each showing how much aspect and elevation change the wine.",
      "Brewer-Clifton was founded in 1996 specifically to prove that the west end of the Santa Ynez Valley could make world-class Pinot, and it succeeded quickly.",
      "Melville Winery has farmed the region since 1996 and makes both Pinot Noir and Chardonnay — the Chardonnay is often overlooked but is excellent.",
      "The original Sanford & Benedict Vineyard, planted in 1971, was the first to show that the cold western valley could ripen Pinot Noir — all subsequent producers owe something to that planting.",
    ],
  },

  {
    key: "santa-barbara",
    name: "Santa Barbara County",
    lat: 34.7,
    lng: -120.0,
    tier: "major",
    style: "pinot",
    macroRegion: "central-coast",
    polygon: [
      [34.95, -120.60], [34.95, -119.45],
      [34.36, -119.45], [34.36, -120.60],
    ],

    terroirThesis: "Santa Barbara County is the only place in California where east-west mountain valleys funnel cold Pacific air directly inland — which is why its Pinot Noir and Chardonnay taste so different from the rest of California.",
    terroirPoints: [
      "Almost everywhere else in California, the mountains run north-south and block the ocean. In Santa Barbara, the mountains run east-west, creating valleys that open straight toward the Pacific.",
      "Cold marine air flows inland through the Santa Ynez and Santa Maria valleys, keeping vineyards up to 50 miles from the coast significantly cooler than their distance would suggest.",
      "The result is Pinot Noir and Chardonnay with California's richness and warm-weather flavor but also the freshness and structure that are normally only possible in cold-climate regions.",
    ],

    climateThesis: "Santa Barbara County has a cool, almost maritime climate despite its location in Southern California — the geography forces it.",
    climatePoints: [
      "The east-west valley orientation creates a natural wind tunnel that channels cold air and fog inland every afternoon.",
      "The Santa Maria Valley, at the northern end of the county, is the coldest — temperatures rarely rise above 75°F during the growing season.",
      "The Santa Ynez Valley to the south is warmer and more varied: the western end (Sta. Rita Hills) is very cold, while the eastern end (near Santa Ynez town) is almost as warm as Paso Robles.",
      "This range of temperatures within a single county means Santa Barbara can grow everything from cool-climate Pinot Noir to warm-climate Syrah and Grenache.",
    ],

    soilThesis: "Santa Barbara's soils are mostly sandy loam and diatomaceous earth — both fast-draining and low-fertility, which limits yields naturally.",
    soilPoints: [
      "Sandy loam dominates the valley floors and benchlands, warming quickly in the morning sun after cold nights.",
      "Diatomaceous earth appears in the western Sta. Rita Hills and gives those wines their distinctive mineral quality.",
      "Calcareous (calcium-rich) soils on some hillside sites make them suitable for Rhône varieties alongside the Pinot and Chardonnay.",
    ],

    vintageThesis: "Santa Barbara vintages are generally consistent but warm years produce better, more complete wines than cold years.",
    vintagePoints: [
      "2022 was excellent across the county — a long, even season that produced balanced Pinot Noir and Chardonnay.",
      "2019 was the previous standout: slow, cool ripening followed by a warm October harvest.",
      "The cool Santa Maria Valley is more vulnerable to cold-year underripeness than the warmer eastern Santa Ynez.",
    ],

    wineryThesis: "Santa Barbara County became famous after the film Sideways (2004) drove enormous interest in local wine, but the quality was already there before Hollywood discovered it.",
    wineryPoints: [
      "Au Bon Climat, founded by Jim Clendenen in 1982, was making world-class Pinot Noir and Chardonnay two decades before Sideways made the region famous.",
      "Bien Nacido Vineyard in the Santa Maria Valley has been a benchmark farming operation since 1969 and sells grapes to dozens of producers — a single-vineyard wine from Bien Nacido tells you what the best Santa Barbara fruit can do.",
      "Foxen Winery farms a historic ranch in the Santa Maria Valley and makes both Pinot Noir and Italian varieties, showing the county's range.",
      "The Hitching Post restaurant in Buellton became internationally known after Sideways — it also makes wine, and the Pinot Noir is actually good.",
    ],
  },

  // ── SIERRA FOOTHILLS ─────────────────────────────────────────────────────

  {
    key: "sierra-foothills",
    name: "Sierra Foothills",
    lat: 38.5,
    lng: -120.5,
    tier: "major",
    style: "zin",
    macroRegion: "sierra-foothills",
    polygon: [
      [39.28, -121.12], [39.28, -120.17],
      [37.85, -120.17], [37.85, -121.12],
    ],

    terroirThesis: "The Sierra Foothills is California's most historically significant wine region — the Gold Rush brought settlers here in 1849, and some of the vines they planted are still producing fruit today.",
    terroirPoints: [
      "Some Zinfandel vines in Amador County are over 125 years old — planted by Italian and Dalmatian immigrants in the late 1800s.",
      "These ancient dry-farmed vines survive entirely on winter rain with no irrigation, producing tiny crops of intensely flavored fruit.",
      "The wine style is distinctly old-fashioned: rustic, concentrated, high-alcohol, and built to pair with food rather than to impress on first sniff.",
    ],

    climateThesis: "High elevation and Gold Rush-era geography create a warm but refreshing climate — daytime heat that fully ripens old-vine Zinfandel, with cool mountain nights.",
    climatePoints: [
      "Vineyards sit at 1,500–3,500 feet elevation, where temperatures are meaningfully cooler than the Central Valley floor below.",
      "Warm days (85–95°F) give Zinfandel the heat it needs to develop its characteristic berry jam and spice flavors.",
      "Cool nights drop temperatures 30–40°F, which preserves the acidity that keeps these big wines from being just syrup.",
      "The elevation also means lower UV-blocking atmosphere — grapes develop thicker skins that contribute to the deep color and firm tannins.",
    ],

    soilThesis: "Decomposed granite — the bedrock material left over from the same geological activity that deposited gold in these mountains — is the signature soil of the Sierra Foothills.",
    soilPoints: [
      "Decomposed granite is coarse, rocky, and extremely well-drained — exactly the kind of stressful environment that makes old vines produce small, concentrated crops.",
      "The gold was deposited here by ancient volcanic and hydrothermal activity, which also created the rocky terrain that shapes vine growth today.",
      "Granite soils are low in nutrients and organic matter, meaning the land produces less fruit but what it does produce is more intense.",
    ],

    vintageThesis: "Sierra Foothills vintages are generally consistent because the region's warmth ensures ripening every year, but the quality of the specific growing season determines how structured and age-worthy the wines are.",
    vintagePoints: [
      "Years with a cool spring followed by a long, even summer produce the most complex old-vine Zinfandel.",
      "Very hot years can push Zinfandel past 16% alcohol, producing wines that feel heavy and that age less gracefully.",
      "2022 and 2019 were both strong years — moderate temperatures with a warm finish brought fruit to ideal ripeness.",
    ],

    wineryThesis: "The Sierra Foothills has a small number of dedicated producers, and Turley Wine Cellars has done more than anyone to make the region internationally known.",
    wineryPoints: [
      "Turley Wine Cellars farms old-vine Zinfandel and Petite Sirah across multiple counties, including several historic Foothills sites — they're the most important producer for understanding what this region can do.",
      "Terre Rouge and Easton are two labels run by the same producer, Bill Easton, focusing on Sierra Foothills Rhône varieties and Zinfandel respectively — among the most consistent in the region.",
      "Renwood Winery in Amador County was one of the first to put Sierra Foothills Zinfandel on the national map and still farms original old-vine blocks.",
    ],
  },
];

/** Wine style labels — used in the info panel only, not for map colors. */
export const STYLE_LABEL: Record<WineStyle, string> = {
  cab:   "Cabernet Country",
  pinot: "Pinot & Chardonnay",
  zin:   "Zinfandel Heritage",
  rhone: "Rhône Varieties",
  mixed: "Diverse",
};
