"use client";

import { useState } from "react";
import { MAP_REGIONS, STYLE_CONFIG, type MapRegion } from "@/data/map-regions";

interface Props {
  region: MapRegion | null;
  onClose: () => void;
}

interface SectionProps {
  title: string;
  thesis: string;
  points: string[];
  defaultOpen?: boolean;
}

function Section({ title, thesis, points, defaultOpen = false }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-stone-800 last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-stone-900/50 transition-colors"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-stone-400">{title}</span>
        <span className="text-stone-600 text-sm">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="px-5 pb-4 space-y-3">
          {/* Thesis */}
          <p className="text-stone-200 text-sm leading-relaxed font-medium">{thesis}</p>
          {/* Supporting points */}
          <ul className="space-y-2">
            {points.map((point, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-stone-400 leading-relaxed">
                <span className="text-stone-600 mt-0.5 shrink-0">·</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function RegionPanel({ region, onClose }: Props) {
  if (!region) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-6 gap-5">
        <div className="text-3xl select-none">🗺️</div>
        <p className="text-stone-400 text-sm leading-relaxed max-w-xs">
          Click any region on the map to read about it.
        </p>
        <Legend />
      </div>
    );
  }

  const styleConf = STYLE_CONFIG[region.style];
  const parent = region.parentKey
    ? MAP_REGIONS.find((r) => r.key === region.parentKey)
    : null;
  const subRegions = MAP_REGIONS.filter((r) => r.parentKey === region.key);

  return (
    <div className="flex flex-col h-full overflow-y-auto">

      {/* Header */}
      <div className="sticky top-0 z-10 bg-stone-950 border-b border-stone-800 px-5 py-4 shrink-0">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-semibold text-amber-100">{region.name}</h2>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${styleConf.color} ${styleConf.textColor}`}>
                {styleConf.label}
              </span>
            </div>
            {parent && (
              <p className="text-stone-500 text-xs mt-0.5">within {parent.name}</p>
            )}
            {subRegions.length > 0 && (
              <p className="text-stone-600 text-xs mt-0.5">
                {subRegions.length} sub-regions — zoom in to see them
              </p>
            )}
          </div>
          <button onClick={onClose} className="text-stone-500 hover:text-stone-300 text-xl leading-none shrink-0 mt-0.5">
            ×
          </button>
        </div>
      </div>

      {/* Terroir Summary — always open, no toggle */}
      <div className="px-5 py-4 border-b border-stone-800">
        <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-3">Terroir Summary</p>
        <p className="text-stone-100 text-sm leading-relaxed font-medium mb-3">{region.terroirThesis}</p>
        <ul className="space-y-2">
          {region.terroirPoints.map((point, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-stone-300 leading-relaxed">
              <span className="text-stone-600 mt-0.5 shrink-0">·</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Four collapsible sections */}
      <div className="flex-1">
        <Section
          title="Climate"
          thesis={region.climateThesis}
          points={region.climatePoints}
          defaultOpen={true}
        />
        <Section
          title="Soil"
          thesis={region.soilThesis}
          points={region.soilPoints}
        />
        <Section
          title="Vintage Years"
          thesis={region.vintageThesis}
          points={region.vintagePoints}
        />
        <Section
          title="Winery"
          thesis={region.wineryThesis}
          points={region.wineryPoints}
        />
      </div>
    </div>
  );
}

function Legend() {
  return (
    <div className="w-full space-y-2.5 text-left">
      <p className="text-xs font-semibold uppercase tracking-widest text-stone-600">Map legend</p>
      <div className="space-y-2">
        {(Object.entries(STYLE_CONFIG) as [string, typeof STYLE_CONFIG[keyof typeof STYLE_CONFIG]][]).map(
          ([key, conf]) => (
            <div key={key} className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full shrink-0 ring-1 ring-white/20" style={{ background: conf.markerColor }} />
              <span className="text-xs text-stone-400">{conf.label}</span>
            </div>
          )
        )}
        <div className="flex items-center gap-2.5 pt-1 border-t border-stone-800 mt-1">
          <div className="w-3 h-3 rounded-full bg-amber-400 shrink-0 ring-1 ring-amber-200/40" />
          <span className="text-xs text-stone-400">Selected region</span>
        </div>
      </div>
    </div>
  );
}
