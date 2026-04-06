"use client";

import { useState } from "react";
import { MAP_REGIONS, MACRO_REGION_CONFIG, STYLE_LABEL, type MapRegion } from "@/data/map-regions";

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
    <div className="border-b border-amber-100 last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-amber-50/60 transition-colors"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-stone-500">{title}</span>
        <span className="text-stone-400 text-sm font-light">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="px-5 pb-5 space-y-3">
          <p className="text-stone-800 text-sm leading-relaxed font-semibold">{thesis}</p>
          <ul className="space-y-2">
            {points.map((point, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-stone-600 leading-relaxed">
                <span className="text-amber-600 mt-1 shrink-0 text-xs">▸</span>
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
      <div className="flex flex-col items-center justify-center h-full text-center px-6 gap-5 bg-amber-50/30">
        <div className="text-4xl select-none opacity-60">🍇</div>
        <p className="text-stone-500 text-sm leading-relaxed max-w-xs">
          Click any region on the map to learn about it.
        </p>
        <Legend />
      </div>
    );
  }

  const mc = MACRO_REGION_CONFIG[region.macroRegion];
  const styleLabel = STYLE_LABEL[region.style];
  const parent = region.parentKey ? MAP_REGIONS.find((r) => r.key === region.parentKey) : null;
  const subs = MAP_REGIONS.filter((r) => r.parentKey === region.key);

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-white">

      {/* ── Header ── */}
      <div className="sticky top-0 z-10 bg-white border-b border-amber-100 px-5 py-4 shrink-0">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            {/* Macro region badge */}
            <div
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded"
              style={{ background: mc.fill + "22", color: mc.fill, border: `1px solid ${mc.fill}55` }}
            >
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ background: mc.fill }}
              />
              {mc.label}
            </div>
            <h2 className="text-lg font-bold text-stone-900 leading-tight">{region.name}</h2>
            <div className="flex items-center gap-2 flex-wrap">
              {parent && <span className="text-xs text-stone-400">within {parent.name}</span>}
              <span className="text-xs text-stone-400">{styleLabel}</span>
            </div>
          </div>
          <button onClick={onClose} className="text-stone-300 hover:text-stone-600 text-2xl leading-none shrink-0 mt-1">
            ×
          </button>
        </div>
        {subs.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {subs.map((s) => (
              <span key={s.key} className="text-xs bg-amber-50 border border-amber-200 text-amber-800 rounded px-2 py-0.5">
                {s.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── Terroir Summary (always visible) ── */}
      <div className="px-5 py-5 border-b border-amber-100 bg-amber-50/40">
        <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-3">Terroir Summary</p>
        <p className="text-stone-900 text-sm leading-relaxed font-semibold mb-3">{region.terroirThesis}</p>
        <ul className="space-y-2">
          {region.terroirPoints.map((pt, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-stone-600 leading-relaxed">
              <span className="text-amber-500 mt-1 shrink-0 text-xs">▸</span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Four collapsible sections ── */}
      <div className="flex-1">
        <Section title="Climate"       thesis={region.climateThesis} points={region.climatePoints} defaultOpen />
        <Section title="Soil"          thesis={region.soilThesis}    points={region.soilPoints} />
        <Section title="Vintage Years" thesis={region.vintageThesis} points={region.vintagePoints} />
        <Section title="Winery"        thesis={region.wineryThesis}  points={region.wineryPoints} />
      </div>
    </div>
  );
}

function Legend() {
  return (
    <div className="w-full space-y-3 text-left">
      <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">Regions</p>
      <div className="space-y-2">
        {(Object.entries(MACRO_REGION_CONFIG) as [string, typeof MACRO_REGION_CONFIG[keyof typeof MACRO_REGION_CONFIG]][]).map(
          ([, conf]) => (
            <div key={conf.label} className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-sm shrink-0" style={{ background: conf.fill }} />
              <span className="text-xs text-stone-500">{conf.label}</span>
            </div>
          )
        )}
        <div className="flex items-center gap-2.5 pt-1 border-t border-stone-100 mt-1">
          <div className="w-3 h-3 rounded-full bg-amber-400 shrink-0" />
          <span className="text-xs text-stone-500">Selected region</span>
        </div>
      </div>
    </div>
  );
}
