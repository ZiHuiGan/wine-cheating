/**
 * Single design token set for the California map page — warm print / Wine Institute wall-map feel.
 * Basemap stays light; parchment UI; muted macro fills match the folded reference map palette.
 */
export const WINE_MAP_THEME = {
  paper: "#ebe3d4",
  paperDeep: "#e2d8c4",
  paperElevated: "#f5efe2",
  panel: "#faf6ec",
  rule: "#c4b591",
  ruleHair: "#dccfb5",
  ink: "#2a2318",
  inkMuted: "#5e5644",
  inkFaint: "#8a8170",
  accentGold: "#b8860b",
  selectFill: "#d9b24c",
  selectStroke: "#6b4f0e",
  /** Light wash over raster tiles — reads like aged paper */
  tileFilter: "sepia(0.07) saturate(0.85) brightness(1.04) contrast(0.97)",
} as const;
