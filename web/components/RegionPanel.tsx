"use client";

import { useState } from "react";
import {
  MAP_REGIONS,
  MACRO_REGION_CONFIG,
  STYLE_LABEL,
  type MacroRegion,
  type MapRegion,
  type MapRegionSelection,
} from "@/data/map-regions";
import { WINE_MAP_THEME } from "@/data/wine-institute-theme";
import { tierDescription } from "@/lib/ava-niche-tier";
import { panelFromKnowledge, panelFromTemplates } from "@/lib/geo-ava-panel-model";
import { lookupAvaKnowledge } from "@/lib/lookup-ava-knowledge";

interface Props {
  selection: MapRegionSelection | null;
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
    <div
      className="border-b last:border-0"
      style={{ borderColor: WINE_MAP_THEME.ruleHair }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-left transition-colors"
        onMouseEnter={(e) => {
          e.currentTarget.style.background = WINE_MAP_THEME.paperElevated;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
        }}
      >
        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: WINE_MAP_THEME.inkMuted, fontFamily: "ui-serif, Georgia, serif" }}
        >
          {title}
        </span>
        <span style={{ color: WINE_MAP_THEME.inkFaint }} className="text-sm font-light">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 space-y-3">
          <p
            className="text-sm leading-relaxed font-semibold"
            style={{ color: WINE_MAP_THEME.ink, fontFamily: "ui-serif, Georgia, serif" }}
          >
            {thesis}
          </p>
          <ul className="space-y-2">
            {points.map((point, i) => (
              <li key={i} className="flex gap-2.5 text-sm leading-relaxed" style={{ color: WINE_MAP_THEME.inkMuted }}>
                <span className="mt-1 shrink-0 text-xs" style={{ color: WINE_MAP_THEME.accentGold }}>
                  ▸
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function RegionPanel({ selection, onClose }: Props) {
  if (!selection) {
    return (
      <div
        className="flex flex-col items-center justify-center h-full text-center px-6 gap-5"
        style={{ background: WINE_MAP_THEME.paperElevated }}
      >
        <div className="text-4xl select-none opacity-50">🍇</div>
        <p className="text-sm leading-relaxed max-w-xs" style={{ color: WINE_MAP_THEME.inkMuted }}>
          Click any TTB boundary. Broad regions paint lighter; nested, niche AVAs paint darker within the same
          Wine Institute macro color. Side panel fills in terroir, climate, soil, vintages, and producers when we
          have them in the cellar book — otherwise you get clear defaults.
        </p>
        <Legend />
      </div>
    );
  }

  if (selection.kind === "geo") {
    const mc = MACRO_REGION_CONFIG[selection.macroRegion];
    const knowledge = lookupAvaKnowledge(selection.name, selection.avaId);
    const model = knowledge
      ? panelFromKnowledge(knowledge, selection.created)
      : panelFromTemplates(
          selection.name,
          selection.macroRegion,
          selection.tier,
          selection.county,
          selection.within
        );

    return (
      <div className="flex flex-col h-full overflow-y-auto" style={{ background: WINE_MAP_THEME.panel }}>
        <div
          className="sticky top-0 z-10 px-5 py-4 shrink-0 border-b"
          style={{
            background: WINE_MAP_THEME.panel,
            borderColor: WINE_MAP_THEME.ruleHair,
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-1">
                <div
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded"
                  style={{
                    background: mc.fill + "22",
                    color: mc.fill,
                    border: `1px solid ${mc.fill}55`,
                    fontFamily: "ui-serif, Georgia, serif",
                  }}
                >
                  <span className="w-2 h-2 rounded-full inline-block" style={{ background: mc.fill }} />
                  {mc.label}
                </div>
                <span
                  className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded"
                  style={{
                    border: `1px solid ${WINE_MAP_THEME.rule}`,
                    color: WINE_MAP_THEME.inkMuted,
                    background: WINE_MAP_THEME.paperElevated,
                  }}
                >
                  {tierDescription(selection.tier)}
                </span>
              </div>
              <h2
                className="text-lg font-bold leading-tight"
                style={{ color: WINE_MAP_THEME.ink, fontFamily: "ui-serif, Georgia, serif" }}
              >
                {selection.name}
              </h2>
              <p className="text-[11px] leading-snug" style={{ color: WINE_MAP_THEME.inkFaint }}>
                {knowledge
                  ? "Notes synced from the project’s California AVA cellar book (same source as the API)."
                  : "Defaults + your map tier: lighter fills = broad AVAs, darker = nested niche AVAs."}
                {selection.cfrIndex ? ` · CFR 27 § ${selection.cfrIndex}` : ""}
                {selection.created ? ` · Established ${selection.created}` : ""}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-2xl leading-none shrink-0 mt-1 transition-colors"
              style={{ color: WINE_MAP_THEME.inkFaint }}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>

        <div
          className="px-5 py-5 border-b"
          style={{ background: WINE_MAP_THEME.paper, borderColor: WINE_MAP_THEME.ruleHair }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: WINE_MAP_THEME.inkFaint, fontFamily: "ui-serif, Georgia, serif" }}
          >
            Terroir summary
          </p>
          <p
            className="text-sm leading-relaxed font-semibold mb-3"
            style={{ color: WINE_MAP_THEME.ink, fontFamily: "ui-serif, Georgia, serif" }}
          >
            {model.terroirThesis}
          </p>
          <ul className="space-y-2">
            {model.terroirPoints.map((pt, i) => (
              <li key={i} className="flex gap-2.5 text-sm leading-relaxed" style={{ color: WINE_MAP_THEME.inkMuted }}>
                <span className="mt-1 shrink-0 text-xs" style={{ color: WINE_MAP_THEME.accentGold }}>
                  ▸
                </span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1">
          <Section title="Climate" thesis={model.climateThesis} points={model.climatePoints} defaultOpen />
          <Section title="Soil" thesis={model.soilThesis} points={model.soilPoints} />
          <Section title="Vintage years" thesis={model.vintageThesis} points={model.vintagePoints} />
          <Section title="Winery" thesis={model.wineryThesis} points={model.wineryPoints} />
        </div>
      </div>
    );
  }

  const region: MapRegion = selection.region;
  const mc = MACRO_REGION_CONFIG[region.macroRegion];
  const styleLabel = STYLE_LABEL[region.style];
  const parent = region.parentKey ? MAP_REGIONS.find((r) => r.key === region.parentKey) : null;
  const subs = MAP_REGIONS.filter((r) => r.parentKey === region.key);

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: WINE_MAP_THEME.panel }}>
      <div
        className="sticky top-0 z-10 px-5 py-4 shrink-0 border-b"
        style={{ background: WINE_MAP_THEME.panel, borderColor: WINE_MAP_THEME.ruleHair }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded"
              style={{
                background: mc.fill + "22",
                color: mc.fill,
                border: `1px solid ${mc.fill}55`,
                fontFamily: "ui-serif, Georgia, serif",
              }}
            >
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: mc.fill }} />
              {mc.label}
            </div>
            <h2
              className="text-lg font-bold leading-tight"
              style={{ color: WINE_MAP_THEME.ink, fontFamily: "ui-serif, Georgia, serif" }}
            >
              {region.name}
            </h2>
            <div className="flex items-center gap-2 flex-wrap text-xs" style={{ color: WINE_MAP_THEME.inkFaint }}>
              {parent && <span>within {parent.name}</span>}
              <span>{styleLabel}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-2xl leading-none shrink-0 mt-1"
            style={{ color: WINE_MAP_THEME.inkFaint }}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        {subs.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {subs.map((s) => (
              <span
                key={s.key}
                className="text-xs rounded px-2 py-0.5"
                style={{
                  background: WINE_MAP_THEME.paperElevated,
                  border: `1px solid ${WINE_MAP_THEME.rule}`,
                  color: WINE_MAP_THEME.inkMuted,
                }}
              >
                {s.name}
              </span>
            ))}
          </div>
        )}
      </div>

      <div
        className="px-5 py-5 border-b"
        style={{ background: WINE_MAP_THEME.paper, borderColor: WINE_MAP_THEME.ruleHair }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: WINE_MAP_THEME.inkFaint, fontFamily: "ui-serif, Georgia, serif" }}
        >
          Terroir Summary
        </p>
        <p
          className="text-sm leading-relaxed font-semibold mb-3"
          style={{ color: WINE_MAP_THEME.ink, fontFamily: "ui-serif, Georgia, serif" }}
        >
          {region.terroirThesis}
        </p>
        <ul className="space-y-2">
          {region.terroirPoints.map((pt, i) => (
            <li key={i} className="flex gap-2.5 text-sm leading-relaxed" style={{ color: WINE_MAP_THEME.inkMuted }}>
              <span className="mt-1 shrink-0 text-xs" style={{ color: WINE_MAP_THEME.accentGold }}>
                ▸
              </span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1">
        <Section title="Climate" thesis={region.climateThesis} points={region.climatePoints} defaultOpen />
        <Section title="Soil" thesis={region.soilThesis} points={region.soilPoints} />
        <Section title="Vintage Years" thesis={region.vintageThesis} points={region.vintagePoints} />
        <Section title="Winery" thesis={region.wineryThesis} points={region.wineryPoints} />
      </div>
    </div>
  );
}

function Legend() {
  return (
    <div className="w-full space-y-3 text-left">
      <p
        className="text-xs font-semibold uppercase tracking-widest"
        style={{ color: WINE_MAP_THEME.inkFaint, fontFamily: "ui-serif, Georgia, serif" }}
      >
        Macro regions
      </p>
      <div className="space-y-2">
        {(Object.entries(MACRO_REGION_CONFIG) as [MacroRegion, (typeof MACRO_REGION_CONFIG)[MacroRegion]][]).map(
          ([, conf]) => (
            <div key={conf.label} className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-sm shrink-0" style={{ background: conf.fill }} />
              <span className="text-xs" style={{ color: WINE_MAP_THEME.inkMuted }}>
                {conf.label}
              </span>
            </div>
          )
        )}
        <div
          className="flex items-center gap-2.5 pt-1 mt-1 border-t"
          style={{ borderColor: WINE_MAP_THEME.ruleHair }}
        >
          <div
            className="w-3 h-3 rounded-full shrink-0"
            style={{ background: WINE_MAP_THEME.selectFill, border: `1px solid ${WINE_MAP_THEME.selectStroke}` }}
          />
          <span className="text-xs" style={{ color: WINE_MAP_THEME.inkMuted }}>
            Selected AVA
          </span>
        </div>
      </div>
    </div>
  );
}
