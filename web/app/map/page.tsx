"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { MapRegion } from "@/data/map-regions";
import RegionPanel from "@/components/RegionPanel";

// Leaflet must not be server-side rendered (it accesses window)
const WineMap = dynamic(() => import("@/components/WineMap"), { ssr: false });

export default function MapPage() {
  const [selected, setSelected] = useState<MapRegion | null>(null);

  return (
    <div className="flex flex-col h-screen bg-stone-950 text-stone-100">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-stone-800 shrink-0">
        <div>
          <h1 className="text-base font-semibold text-amber-200">California Wine Regions</h1>
          <p className="text-stone-500 text-xs mt-0.5">
            {selected ? selected.name : "Click a marker to explore an AVA"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-stone-600 text-xs hidden sm:block">
            20 AVAs · Napa · Sonoma · Central Coast · Sierra Foothills
          </span>
          <Link
            href="/"
            className="text-xs text-stone-400 hover:text-amber-200 transition-colors border border-stone-700 rounded px-2.5 py-1"
          >
            Label Analyzer →
          </Link>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex flex-1 min-h-0">
        {/* Map — takes most of the screen */}
        <div className="flex-1 min-w-0 p-3">
          <WineMap onSelect={setSelected} selected={selected} />
        </div>

        {/* Sidebar panel */}
        <div className="w-80 shrink-0 border-l border-stone-800 overflow-hidden flex flex-col bg-stone-950">
          <RegionPanel region={selected} onClose={() => setSelected(null)} />
        </div>
      </div>

      {/* Mobile: bottom sheet (visible on small screens) */}
      {selected && (
        <div className="sm:hidden fixed inset-x-0 bottom-0 z-50 bg-stone-950 border-t border-stone-800 rounded-t-2xl max-h-[60vh] overflow-y-auto">
          <div className="w-10 h-1 bg-stone-700 rounded-full mx-auto mt-3 mb-1" />
          <RegionPanel region={selected} onClose={() => setSelected(null)} />
        </div>
      )}
    </div>
  );
}
