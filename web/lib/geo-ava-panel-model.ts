import type { MacroRegion } from "@/data/map-regions";
import { MACRO_REGION_CONFIG } from "@/data/map-regions";
import type { AvaKnowledgeEntry } from "@/data/ava-knowledge";

export interface GeoAvaPanelModel {
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

function splitSentences(paragraph: string, max = 4): string[] {
  return paragraph
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, max);
}

const MACRO_TERROIR: Record<MacroRegion, string> = {
  "north-coast":
    "The North Coast gathers cold Pacific air, ridges, and valleys that slow ripening — the classic California zone for structured reds and cool-climate Pinot.",
  "central-coast":
    "The Central Coast spans a long strip where mountains and ocean gaps shape fog, wind, and heat — same state, wildly different mesoclimates block by block.",
  "sierra-foothills":
    "Sierra Foothills vineyards sit on slopes east of the valley floor: more sun and elevation, thinner soils, and old-vine character.",
  "southern-california":
    "Southern California’s pockets of coastal cool and inland warmth create intense, often sun-forward wines in smaller, sharply defined AVAs.",
  "far-north":
    "The far-north coastal forests and ridges keep things cool and slow — wines tend toward savory tension and acid more than sheer ripeness.",
  "inland-valleys":
    "Inland valleys get hotter, drier summers than the coast; vines here often see riper fruit and softer profiles unless picked early or farmed for balance.",
};

export function panelFromKnowledge(k: AvaKnowledgeEntry, created: string | null): GeoAvaPanelModel {
  const grapes = k.key_grapes.join(", ");
  return {
    terroirThesis: `${k.name} is mainly understood through ${k.climate_type.toLowerCase()} and these signature soils.`,
    terroirPoints: [
      k.known_for.split(". ")[0] + (k.known_for.includes(".") ? "." : ""),
      `Dominant varieties people look for: ${grapes}.`,
      k.parent_ava ? `Legally nested inside ${k.parent_ava} — tighter rules than the big umbrella above it.` : "A stand-alone AVA on the TTB map — compare its boundary to neighbors on the left.",
    ].filter(Boolean),
    climateThesis: k.climate_type,
    climatePoints: splitSentences(k.climate_summary, 5),
    soilThesis: "Soil types listed in the federal register for this area include:",
    soilPoints: k.soil_types.map((s) => s.charAt(0).toUpperCase() + s.slice(1)),
    vintageThesis:
      "Vintage character here follows California-wide patterns — heat waves, fog years, fires, and rainfall timing — but this AVA’s specifics show up in balance and picking dates.",
    vintagePoints: created
      ? [`TTB recognition: AVA effective ${created}.`, "Check recent years for smoke, drought, or long mild finishes — they change texture more than the legal line on the map."]
      : [
          "Use the Label Analyzer’s vintage note when you have a year in hand.",
          "Hot seasons emphasize plush fruit; cool seasons keep tannin and acid firmer.",
        ],
    wineryThesis: "Producer snapshot (not exhaustive):",
    wineryPoints: splitSentences(k.known_for, 4),
  };
}

export function panelFromTemplates(
  name: string,
  macro: MacroRegion,
  tier: number,
  county: string | null,
  within: string | null
): GeoAvaPanelModel {
  const mc = MACRO_REGION_CONFIG[macro].label;
  const countyLabel = county ? county.replace(/\|/g, ", ") : "several counties";
  const nest = within ? within.split("|").join(" → ") : null;

  return {
    terroirThesis: `${name} sits in the ${mc} family on the Wine Institute–style map${nest ? `, nested under: ${nest}` : ""}.`
      + (tier >= 2 ? " Smaller TTB polygons usually mean a tighter set of allowed vineyard sources." : ""),
    terroirPoints: [
      MACRO_TERROIR[macro],
      county ? `Counties on file: ${countyLabel}.` : "County list: see TTB petition maps for this AVA.",
      tier >= 3
        ? "Deeply nested AVA: expect more specific labeling rules than a broad parent zone."
        : "Compare fill shade on the map — lighter = broader AVA, darker = more niche nested area.",
    ],
    climateThesis: `${mc} climate patterns dominate until you zoom to individual sites — elevation and distance from cold water change ripening more than the color on the overview map.`,
    climatePoints: [
      "Cool sectors lean toward higher acid and herbal notes; warm sectors emphasize riper fruit and softer tannin.",
      "Morning fog and afternoon wind (where present) stretch the growing day and slow sugar accumulation.",
      "Check elevation in vineyard tech sheets: a few hundred feet can matter as much as county lines.",
    ],
    soilThesis: "Soils are highly local; the printed overview map is about jurisdiction, not a soil survey.",
    soilPoints: [
      "Benchlands vs hillsides vs mountains differ in drainage — the same AVA can hold both.",
      "For this AVA, use winery tech sheets or UC Davis soil resources for block-level detail.",
      "Limestone, sand, clay, and volcanic derivatives each steer water stress differently.",
    ],
    vintageThesis: "California vintage quality swings with spring frost, summer heat spikes, and harvest rains — the legal boundary stays fixed while weather does not.",
    vintagePoints: [
      "Mild, long seasons often give seamless, age-worthy structure.",
      "Compressed heat waves can push alcohol unless fruit is picked early.",
      "Fire-smoke years need bottle-by-bottle caution even inside the same AVA outline.",
    ],
    wineryThesis: "We have not yet paired this AVA with a curated winery list in this app.",
    wineryPoints: [
      "Search producers who bottle with this AVA on the label — that guarantees fruit sourcing meets TTB rules.",
      "Cross-check sub-AVAs: many estates bottle a broader parent name for flexibility.",
    ],
  };
}
