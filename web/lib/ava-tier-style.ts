import type { MacroRegion } from "@/data/map-regions";
import { MACRO_REGION_CONFIG } from "@/data/map-regions";
import { WINE_MAP_THEME } from "@/data/wine-institute-theme";

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
}

/** Darken RGB towards black; factor 0 = no change, ~0.12 = noticeably deeper */
function deepenHex(hex: string, factor: number): string {
  const [r, g, b] = hexToRgb(hex);
  const f = Math.max(0, Math.min(1, factor));
  const r2 = Math.round(r * (1 - f));
  const g2 = Math.round(g * (1 - f));
  const b2 = Math.round(b * (1 - f));
  return rgbToHex(r2, g2, b2);
}

/**
 * Tier 0 = broadest areas (lightest). Higher tier = more nested / niche = deeper hue + stronger fill.
 */
export function polygonStyleForTier(
  macro: MacroRegion,
  tier: number,
  selected: boolean
): { color: string; fillColor: string; fillOpacity: number; weight: number; opacity: number } {
  if (selected) {
    return {
      color: WINE_MAP_THEME.selectStroke,
      fillColor: WINE_MAP_THEME.selectFill,
      fillOpacity: 0.44,
      weight: 2.75,
      opacity: 1,
    };
  }

  const t = Math.max(0, Math.min(tier, 4));
  const mc = MACRO_REGION_CONFIG[macro];
  const deep = 0.042 + t * 0.048;
  const fill = deepenHex(mc.fill, deep);
  const border = deepenHex(mc.border, deep + 0.02);
  const fillOpacity = 0.1 + t * 0.055;
  const weight = 1.05 + t * 0.22;
  const opacity = 0.62 + t * 0.035;

  return {
    color: border,
    fillColor: fill,
    fillOpacity,
    weight,
    opacity,
  };
}
