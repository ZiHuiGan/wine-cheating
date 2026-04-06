"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { MapRegion } from "@/data/map-regions";
import RegionPanel from "@/components/RegionPanel";

const WineMap = dynamic(() => import("@/components/WineMap"), { ssr: false });

export default function MapPage() {
  const [selected, setSelected] = useState<MapRegion | null>(null);

  return (
    <div className="flex flex-col h-screen bg-stone-100 text-stone-900">

      {/* Header — matches the warm print-map aesthetic */}
      <div className="flex items-center justify-between px-5 py-3 bg-white border-b border-amber-200 shrink-0">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-base font-bold text-stone-900 tracking-tight">
              California Wine Regions
            </h1>
            <p className="text-stone-400 text-xs mt-0.5">
              {selected ? selected.name : "154 AVAs · Click any region to explore"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-stone-300 text-xs hidden sm:block">
            North Coast · Central Coast · Sierra Foothills · Southern California
          </span>
          <Link
            href="/"
            className="text-xs text-stone-500 hover:text-stone-900 transition-colors border border-stone-200 rounded px-2.5 py-1 bg-white"
          >
            Label Analyzer →
          </Link>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex flex-1 min-h-0">

        {/* Map */}
        <div className="flex-1 min-w-0 p-3">
          <WineMap onSelect={setSelected} selected={selected} />
        </div>

        {/* Sidebar */}
        <div className="w-80 shrink-0 border-l border-amber-100 overflow-hidden flex flex-col bg-white">
          <RegionPanel region={selected} onClose={() => setSelected(null)} />
        </div>
      </div>

      {/* Mobile bottom sheet */}
      {selected && (
        <div className="sm:hidden fixed inset-x-0 bottom-0 z-50 bg-white border-t border-amber-100 rounded-t-2xl max-h-[65vh] overflow-y-auto shadow-xl">
          <div className="w-10 h-1 bg-stone-200 rounded-full mx-auto mt-3 mb-1" />
          <RegionPanel region={selected} onClose={() => setSelected(null)} />
        </div>
      )}
    </div>
  );
}
