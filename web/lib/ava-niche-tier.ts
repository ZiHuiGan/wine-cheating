import type { Feature } from "geojson";

/** Cartographic “mega” AVAs — very large multi-county areas, lightest tier. */
const MEGA_MULTI_COUNTY = new Set([
  "North Coast",
  "Central Coast",
  "Sierra Foothills",
  "South Coast",
]);

/** Large county-wide appellations (no parent in TTB data) — still broad, keep light. */
const BROAD_COUNTY_AVAS = new Set(["Sonoma County", "Santa Barbara County"]);

export function avaNicheTierFromFeature(feature: Feature): number {
  const p = feature.properties as Record<string, string | null | undefined> | null | undefined;
  if (!p) return 1;
  const name = String(p.name ?? "").trim();
  if (MEGA_MULTI_COUNTY.has(name)) return 0;
  if (BROAD_COUNTY_AVAS.has(name)) return 0;

  const within = String(p.within ?? "").trim();
  if (!within) return 1;

  const depth = within.split("|").filter((s) => s.trim().length > 0).length;
  return Math.min(Math.max(depth, 1), 4);
}

/** Human label for sidebar (e.g. “Sub-AVA · 2 levels nested”). */
export function tierDescription(tier: number): string {
  if (tier <= 0) return "Broad regional AVA";
  if (tier === 1) return "Regional AVA";
  if (tier === 2) return "Nested AVA";
  if (tier === 3) return "Deeply nested AVA";
  return "Niche / multi-nest AVA";
}
