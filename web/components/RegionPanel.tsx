"use client";

import { MAP_REGIONS, STYLE_CONFIG, type MapRegion } from "@/data/map-regions";

interface Props {
  region: MapRegion | null;
  onClose: () => void;
}

const GRAPE_EMOJI: Record<string, string> = {
  "Cabernet Sauvignon": "🍇",
  "Pinot Noir": "🍒",
  "Chardonnay": "🍋",
  "Zinfandel": "🫐",
  "Syrah": "🫐",
  "Merlot": "🍇",
  "Sauvignon Blanc": "🍈",
  "Grenache": "🍓",
  "Mourvèdre": "🫐",
  "Gewürztraminer": "🌸",
  "Riesling": "🍏",
  "Cabernet Franc": "🍇",
  "Petite Sirah": "🫐",
  "Barbera": "🍇",
  "Tempranillo": "🍇",
};

export default function RegionPanel({ region, onClose }: Props) {
  if (!region) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-6 gap-4">
        <div className="text-4xl select-none">🗺️</div>
        <p className="text-stone-400 text-sm leading-relaxed max-w-xs">
          Click any marker on the map to explore a California wine region.
        </p>
        <Legend />
      </div>
    );
  }

  const styleConf = STYLE_CONFIG[region.style];
  const parent = region.parentKey
    ? MAP_REGIONS.find((r) => r.key === region.parentKey)
    : null;

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-stone-950 border-b border-stone-800 px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-semibold text-amber-100">{region.name}</h2>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${styleConf.color} ${styleConf.textColor}`}
              >
                {styleConf.label}
              </span>
            </div>
            {parent && (
              <p className="text-stone-500 text-xs mt-0.5">within {parent.name}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-stone-500 hover:text-stone-300 text-xl leading-none shrink-0 mt-0.5"
          >
            ×
          </button>
        </div>
      </div>

      <div className="px-5 py-4 space-y-5">
        {/* Known for */}
        <div>
          <p className="text-stone-200 text-sm leading-relaxed">{region.knownFor}</p>
        </div>

        {/* Climate */}
        <div className="space-y-1">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-500">Climate</h3>
          <p className="text-stone-300 text-sm leading-relaxed">{region.climateSummary}</p>
          <p className="text-stone-500 text-xs mt-1 italic">{region.climate}</p>
        </div>

        {/* Soils */}
        <div className="space-y-1.5">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-500">Soils</h3>
          <div className="flex flex-wrap gap-1.5">
            {region.soils.map((s) => (
              <span key={s} className="text-xs bg-stone-800 text-stone-300 rounded px-2 py-0.5">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Key grapes */}
        <div className="space-y-1.5">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-500">Key Grapes</h3>
          <div className="flex flex-wrap gap-1.5">
            {region.keyGrapes.map((g) => (
              <span key={g} className="text-xs bg-stone-800 text-stone-200 rounded px-2 py-0.5">
                {GRAPE_EMOJI[g] || "🍇"} {g}
              </span>
            ))}
          </div>
        </div>

        {/* Benchmark producers */}
        <div className="space-y-1.5">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-500">
            Benchmark Producers
          </h3>
          <ul className="space-y-0.5">
            {region.benchmarkProducers.map((p) => (
              <li key={p} className="text-sm text-stone-300 flex items-center gap-1.5">
                <span className="text-stone-600 text-xs">→</span> {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Vintage coverage */}
        <div className="rounded-lg border border-stone-800 bg-stone-900/50 px-3 py-2.5">
          <span className="text-stone-500 text-xs">Vintage data: </span>
          <span className="text-stone-300 text-xs">{region.vintageCoverage}</span>
        </div>

        {/* Sub-AVAs if this is a major region */}
        {region.tier === "major" && (() => {
          const subs = MAP_REGIONS.filter((r) => r.parentKey === region.key);
          if (subs.length === 0) return null;
          return (
            <div className="space-y-1.5">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-500">
                Sub-Appellations
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {subs.map((s) => (
                  <span key={s.key} className="text-xs bg-stone-800 text-amber-300/80 rounded px-2 py-0.5">
                    {s.name}
                  </span>
                ))}
              </div>
              <p className="text-stone-600 text-xs">Zoom in on the map to see sub-AVA markers.</p>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

function Legend() {
  return (
    <div className="w-full space-y-2">
      <p className="text-xs font-semibold uppercase tracking-widest text-stone-600 text-left">Legend</p>
      <div className="space-y-1.5">
        {(Object.entries(STYLE_CONFIG) as [string, typeof STYLE_CONFIG[keyof typeof STYLE_CONFIG]][]).map(
          ([key, conf]) => (
            <div key={key} className="flex items-center gap-2.5">
              <div
                className="w-3 h-3 rounded-full shrink-0 ring-1 ring-white/20"
                style={{ background: conf.markerColor }}
              />
              <span className="text-xs text-stone-400">{conf.label}</span>
            </div>
          )
        )}
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-full bg-amber-400 shrink-0 ring-1 ring-amber-200/40" />
          <span className="text-xs text-stone-400">Selected region</span>
        </div>
        <div className="flex items-center gap-2.5 mt-1">
          <div className="flex gap-1">
            <div className="w-4 h-4 rounded-full bg-stone-600 shrink-0" />
            <div className="w-2.5 h-2.5 rounded-full bg-stone-600 shrink-0 self-end" />
          </div>
          <span className="text-xs text-stone-400">Large = major AVA, small = sub-AVA</span>
        </div>
      </div>
    </div>
  );
}
