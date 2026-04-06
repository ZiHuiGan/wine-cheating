import {
  MAP_REGIONS,
  type MacroRegion,
  type MapRegion,
} from "@/data/map-regions";

/** UC Davis / TTB `ava_id` uses underscores; collapse runs for matching. */
export function hyphenKeyFromAvaId(avaId: string): string {
  return avaId.replace(/_+/g, "-");
}

/** Boundaries digitized from TTB sources (UC Davis Library AVA project). */
export const AVA_GEO_ATTRIBUTION =
  "AVA boundaries: UC Davis Library digitizing project (TTB legal descriptions). Web copy simplified (~1.5%) for performance.";

/** Top-level AVAs (no `within` in TTB data) need an explicit Wine–Institute macro color. */
const TOP_LEVEL_MACRO_BY_NAME: Record<string, MacroRegion> = {
  "North Coast": "north-coast",
  "Central Coast": "central-coast",
  "Sierra Foothills": "sierra-foothills",
  "South Coast": "southern-california",
  Lodi: "inland-valleys",
  Clarksburg: "inland-valleys",
  Madera: "inland-valleys",
  "Dunnigan Hills": "inland-valleys",
  "River Junction": "inland-valleys",
  "Tracy Hills": "inland-valleys",
  "Winters Highlands": "inland-valleys",
  "Antelope Valley of the California High Desert": "southern-california",
  "Cucamonga Valley": "southern-california",
  "Malibu Coast": "southern-california",
  "Palos Verdes Peninsula": "southern-california",
  "Sierra Pelona Valley": "southern-california",
  "Tehachapi Mountains": "southern-california",
  "Yucaipa Valley": "southern-california",
  "Leona Valley": "southern-california",
  "Salado Creek": "inland-valleys",
  "Capay Valley": "far-north",
  Covelo: "far-north",
  "Long Valley-Lake County": "far-north",
  "Crystal Springs of Napa Valley": "north-coast",
  "Willow Creek": "far-north",
  "Trinity Lakes": "far-north",
  "Seiad Valley": "far-north",
  "Dos Rios": "far-north",
  "Squaw Valley-Miramonte": "sierra-foothills",
  "Inwood Valley": "sierra-foothills",
  "Manton Valley": "sierra-foothills",
  "Paulsell Valley": "sierra-foothills",
  "Santa Cruz Mountains": "central-coast",
  "Contra Costa": "central-coast",
  "Diablo Grande": "inland-valleys",
  "Gabilan Mountains": "central-coast",
};

export function centroidLngLat(feature: GeoJSON.Feature): [number, number] {
  const g = feature.geometry;
  if (!g) return [-119.5, 37.2];
  if (g.type === "Polygon") return ringCentroid(g.coordinates[0] as [number, number][]);
  if (g.type === "MultiPolygon") {
    const ring = (g.coordinates[0] as [number, number][][])[0];
    return ringCentroid(ring);
  }
  return [-119.5, 37.2];
}

function ringCentroid(ring: [number, number][]): [number, number] {
  let sx = 0;
  let sy = 0;
  const n = ring.length;
  for (let i = 0; i < n; i++) {
    const [lng, lat] = ring[i];
    sx += lng;
    sy += lat;
  }
  return [sx / n, sy / n];
}

function macroFromWithin(within: string | null | undefined): MacroRegion | null {
  if (!within?.trim()) return null;
  const parts = within.split("|").map((p) => p.trim());
  for (const part of parts) {
    if (part === "North Coast") return "north-coast";
    if (part === "Central Coast") return "central-coast";
    if (part === "Sierra Foothills") return "sierra-foothills";
    if (part === "South Coast") return "southern-california";
  }
  return null;
}

function macroFromCentroid(lat: number, lng: number): MacroRegion {
  if (lat >= 41.2 && lng <= -118) return "far-north";
  if (lat >= 39.5 && lat < 41.2 && lng <= -122.5) return "far-north";
  if (lat >= 38.25 && lat <= 39.9 && lng <= -122.35) return "north-coast";
  if (lng >= -120.2 && lat >= 37.0 && lat <= 39.2) return "sierra-foothills";
  if (lat >= 35.0 && lat < 36.2 && lng >= -118.0) return "southern-california";
  if (lat >= 34.3 && lat <= 38.8 && lng >= -120.5 && lng <= -118.8) return "inland-valleys";
  if (lat >= 34.5 && lat < 38.5 && lng < -117.5) return "central-coast";
  return "central-coast";
}

export function macroRegionFromAvaFeature(feature: GeoJSON.Feature): MacroRegion {
  const props = feature.properties as Record<string, string | null> | null;
  if (!props) return macroFromCentroid(37.2, -119.5);
  const name = (props.name ?? "").trim();
  const hit = MAP_REGIONS.find(
    (r) => r.name.toLowerCase() === name.toLowerCase()
  );
  if (hit) return hit.macroRegion;
  const fromPipe = macroFromWithin(props.within as string | null);
  if (fromPipe) return fromPipe;
  const top = TOP_LEVEL_MACRO_BY_NAME[name];
  if (top) return top;
  const [lng, lat] = centroidLngLat(feature);
  return macroFromCentroid(lat, lng);
}

export function findMapRegionForFeature(feature: GeoJSON.Feature): MapRegion | undefined {
  const props = feature.properties as Record<string, string | null> | null;
  if (!props) return undefined;
  const avaId = String(props.ava_id ?? "");
  const name = String(props.name ?? "").trim();

  const hyphen = hyphenKeyFromAvaId(avaId);
  let r = MAP_REGIONS.find((x) => x.key === hyphen);
  if (r) return r;

  const noDistrict = hyphen.replace(/-district$/, "");
  r = MAP_REGIONS.find((x) => x.key === noDistrict);
  if (r) return r;

  r = MAP_REGIONS.find((x) => x.name.toLowerCase() === name.toLowerCase());
  if (r) return r;

  if (hyphen === "los-carneros") return MAP_REGIONS.find((x) => x.key === "carneros");
  return undefined;
}
