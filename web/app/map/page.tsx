"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { MapRegionSelection } from "@/data/map-regions";
import { WINE_MAP_THEME } from "@/data/wine-institute-theme";
import RegionPanel from "@/components/RegionPanel";

const WineMap = dynamic(() => import("@/components/WineMap"), { ssr: false });

export default function MapPage() {
  const [selection, setSelection] = useState<MapRegionSelection | null>(null);

  const handleSelect = useCallback((s: MapRegionSelection | null) => {
    setSelection(s);
  }, []);

  return (
    <div
      className="flex flex-col h-screen"
      style={{
        background: WINE_MAP_THEME.paper,
        color: WINE_MAP_THEME.ink,
      }}
    >
      <div
        className="flex items-center justify-between px-5 py-3.5 shrink-0 border-b"
        style={{
          background: WINE_MAP_THEME.paperElevated,
          borderColor: WINE_MAP_THEME.rule,
        }}
      >
        <div className="flex items-center gap-3">
          <div>
            <h1
              className="text-base font-bold tracking-tight"
              style={{ fontFamily: "ui-serif, Georgia, 'Times New Roman', serif", color: WINE_MAP_THEME.ink }}
            >
              California Wine Regions
            </h1>
            <p className="text-xs mt-0.5" style={{ color: WINE_MAP_THEME.inkFaint }}>
              {selection
                ? selection.kind === "full"
                  ? selection.region.name
                  : selection.name
                : "154 AVAs (TTB) · Click any boundary"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] hidden sm:block uppercase tracking-wider" style={{ color: WINE_MAP_THEME.inkFaint }}>
            North Coast · Central Coast · Sierra Foothills · Inland · South
          </span>
          <Link
            href="/"
            className="text-[11px] transition-colors rounded px-2.5 py-1 border uppercase tracking-wide"
            style={{
              color: WINE_MAP_THEME.inkMuted,
              borderColor: WINE_MAP_THEME.rule,
              background: WINE_MAP_THEME.paperElevated,
            }}
          >
            Label Analyzer →
          </Link>
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        <div className="flex-1 min-w-0 p-3" style={{ background: WINE_MAP_THEME.paperDeep }}>
          <WineMap onSelect={handleSelect} selected={selection} />
        </div>

        <div
          className="w-80 shrink-0 overflow-hidden flex flex-col border-l"
          style={{
            background: WINE_MAP_THEME.panel,
            borderColor: WINE_MAP_THEME.ruleHair,
          }}
        >
          <RegionPanel selection={selection} onClose={() => setSelection(null)} />
        </div>
      </div>

      {selection && (
        <div
          className="sm:hidden fixed inset-x-0 bottom-0 z-50 rounded-t-2xl max-h-[65vh] overflow-y-auto shadow-xl border-t"
          style={{
            background: WINE_MAP_THEME.panel,
            borderColor: WINE_MAP_THEME.rule,
          }}
        >
          <div
            className="w-10 h-1 rounded-full mx-auto mt-3 mb-1"
            style={{ background: WINE_MAP_THEME.ruleHair }}
          />
          <RegionPanel selection={selection} onClose={() => setSelection(null)} />
        </div>
      )}
    </div>
  );
}
