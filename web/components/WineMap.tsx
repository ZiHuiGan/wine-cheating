"use client";

import { useEffect, useRef, useState } from "react";
import { MAP_REGIONS, MACRO_REGION_CONFIG, type MapRegion } from "@/data/map-regions";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    L: any;
  }
}

interface Props {
  onSelect: (region: MapRegion | null) => void;
  selected: MapRegion | null;
}

function dotHtml(fill: string, border: string, size: number, selected: boolean) {
  const bg = selected ? "#e8b84b" : fill;
  const bd = selected ? "#7a5a10 2px solid" : `${border} 1.5px solid`;
  const shadow = selected
    ? `0 0 0 3px #e8b84b55, 0 1px 4px rgba(0,0,0,0.4)`
    : `0 1px 3px rgba(0,0,0,0.35)`;
  return `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${bg};border:${bd};box-shadow:${shadow};cursor:pointer;"></div>`;
}

export default function WineMap({ onSelect, selected }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<Map<string, any>>(new Map());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const polygonsRef = useRef<Map<string, any>>(new Map());
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    const initMap = () => {
      if (mapRef.current || !containerRef.current) return;
      const L = window.L;

      const map = L.map(containerRef.current, {
        center: [37.5, -120.8],
        zoom: 7,
        zoomControl: true,
        // Constrain to California area
        maxBounds: [[31, -126], [43, -113]],
        minZoom: 6,
      });

      // CartoDB Voyager — warm cream tones, matches the printed Wine Institute map
      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20,
      }).addTo(map);

      mapRef.current = map;

      MAP_REGIONS.forEach((region) => {
        const mc = MACRO_REGION_CONFIG[region.macroRegion];
        const isSub = region.tier === "sub";

        // ── Polygon for major AVAs ─────────────────────────────────────
        if (region.polygon && !isSub) {
          const poly = L.polygon(region.polygon, {
            color: mc.border,
            fillColor: mc.fill,
            fillOpacity: 0.18,
            weight: 1.5,
            opacity: 0.7,
          }).addTo(map);

          poly.bindTooltip(region.name, {
            sticky: true,
            className: "wine-tooltip",
            direction: "top",
          });

          poly.on("click", () => onSelect(region));
          poly.on("mouseover", () => poly.setStyle({ fillOpacity: 0.32, weight: 2 }));
          poly.on("mouseout", () => {
            const isSelected = selected?.key === region.key;
            poly.setStyle({ fillOpacity: isSelected ? 0.35 : 0.18, weight: isSelected ? 2.5 : 1.5 });
          });

          polygonsRef.current.set(region.key, poly);
        }

        // ── Dot marker (all regions) ───────────────────────────────────
        const size = isSub ? 8 : 12;
        const icon = L.divIcon({
          html: dotHtml(mc.fill, mc.border, size, false),
          className: "",
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        });

        const marker = L.marker([region.lat, region.lng], { icon })
          .addTo(map)
          .bindTooltip(region.name, {
            permanent: false,
            direction: "top",
            offset: [0, -10],
            className: "wine-tooltip",
          });

        marker.on("click", () => {
          onSelect(region);
          map.setView([region.lat, region.lng], Math.max(map.getZoom(), isSub ? 11 : 9), { animate: true });
        });

        markersRef.current.set(region.key, marker);
      });

      setMapReady(true);
    };

    if (window.L) { initMap(); return; }

    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    if (!document.getElementById("leaflet-js")) {
      const script = document.createElement("script");
      script.id = "leaflet-js";
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = initMap;
      document.head.appendChild(script);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync selection state → marker + polygon visual
  useEffect(() => {
    if (!mapReady || !window.L) return;
    const L = window.L;

    markersRef.current.forEach((marker, key) => {
      const region = MAP_REGIONS.find((r) => r.key === key);
      if (!region) return;
      const mc = MACRO_REGION_CONFIG[region.macroRegion];
      const isSub = region.tier === "sub";
      const isSelected = selected?.key === key;
      const size = isSelected ? (isSub ? 12 : 18) : (isSub ? 8 : 12);
      marker.setIcon(
        L.divIcon({
          html: dotHtml(mc.fill, mc.border, size, isSelected),
          className: "",
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        })
      );
    });

    polygonsRef.current.forEach((poly, key) => {
      const region = MAP_REGIONS.find((r) => r.key === key);
      if (!region) return;
      const mc = MACRO_REGION_CONFIG[region.macroRegion];
      const isSelected = selected?.key === key;
      poly.setStyle({
        color: isSelected ? "#7a5a10" : mc.border,
        fillColor: isSelected ? "#e8b84b" : mc.fill,
        fillOpacity: isSelected ? 0.38 : 0.18,
        opacity: isSelected ? 1 : 0.7,
        weight: isSelected ? 2.5 : 1.5,
      });
    });
  }, [selected, mapReady]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full rounded-xl overflow-hidden" />
      {!mapReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-100 rounded-xl">
          <span className="text-stone-400 text-sm animate-pulse">Loading map…</span>
        </div>
      )}
      <style>{`
        .wine-tooltip {
          background: #fffbf0;
          border: 1px solid #c8b882;
          color: #3a2e10;
          font-size: 12px;
          font-family: ui-sans-serif, system-ui, sans-serif;
          font-weight: 500;
          padding: 3px 9px;
          border-radius: 4px;
          white-space: nowrap;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        }
        .wine-tooltip::before { display: none; }
        .leaflet-attribution-flag { display: none !important; }
        .leaflet-control-attribution {
          background: rgba(255,251,240,0.85) !important;
          color: #9a8a5a !important;
          font-size: 10px !important;
        }
        .leaflet-control-attribution a { color: #7a6a3a !important; }
        .leaflet-bar a {
          background: #fffbf0 !important;
          color: #3a2e10 !important;
          border-color: #c8b882 !important;
        }
        .leaflet-bar a:hover { background: #fdf5d8 !important; }
      `}</style>
    </div>
  );
}
