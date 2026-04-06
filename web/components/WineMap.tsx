"use client";

import { useEffect, useRef, useState } from "react";
import { MAP_REGIONS, STYLE_CONFIG, type MapRegion } from "@/data/map-regions";

// Leaflet is loaded dynamically to avoid SSR issues.
// Types are declared inline so we don't need @types/leaflet at build time.
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

export default function WineMap({ onSelect, selected }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<Map<string, any>>(new Map());
  const [ready, setReady] = useState(false);

  // Load Leaflet CSS + JS dynamically
  useEffect(() => {
    if (document.getElementById("leaflet-css")) {
      setReady(true);
      return;
    }
    const link = document.createElement("link");
    link.id = "leaflet-css";
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => setReady(true);
    document.head.appendChild(script);
  }, []);

  // Initialize map once Leaflet is ready
  useEffect(() => {
    if (!ready || !containerRef.current || mapRef.current) return;
    const L = window.L;

    const map = L.map(containerRef.current, {
      center: [37.5, -120.8],
      zoom: 7,
      zoomControl: true,
    });

    // Dark CartoDB tiles — no API key needed
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20,
      }
    ).addTo(map);

    mapRef.current = map;

    // Create markers for all regions
    MAP_REGIONS.forEach((region) => {
      const styleConf = STYLE_CONFIG[region.style];
      const isSub = region.tier === "sub";

      const markerHtml = `
        <div style="
          width: ${isSub ? 10 : 16}px;
          height: ${isSub ? 10 : 16}px;
          border-radius: 50%;
          background: ${styleConf.markerColor};
          border: ${isSub ? "1.5px" : "2px"} solid rgba(255,255,255,0.4);
          box-shadow: 0 0 0 ${isSub ? 3 : 5}px ${styleConf.markerColor}40;
          cursor: pointer;
          transition: transform 0.15s;
        "></div>
      `;

      const icon = L.divIcon({
        html: markerHtml,
        className: "",
        iconSize: [isSub ? 10 : 16, isSub ? 10 : 16],
        iconAnchor: [isSub ? 5 : 8, isSub ? 5 : 8],
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
        map.setView([region.lat, region.lng], Math.max(map.getZoom(), isSub ? 11 : 9), {
          animate: true,
        });
      });

      markersRef.current.set(region.key, marker);
    });
  }, [ready, onSelect]);

  // Highlight selected marker
  useEffect(() => {
    if (!mapRef.current) return;
    const L = window.L;

    markersRef.current.forEach((marker, key) => {
      const region = MAP_REGIONS.find((r) => r.key === key);
      if (!region) return;
      const styleConf = STYLE_CONFIG[region.style];
      const isSub = region.tier === "sub";
      const isSelected = selected?.key === key;

      const markerHtml = `
        <div style="
          width: ${isSub ? 10 : 16}px;
          height: ${isSub ? 10 : 16}px;
          border-radius: 50%;
          background: ${isSelected ? "#fbbf24" : styleConf.markerColor};
          border: ${isSelected ? "2px solid #fef3c7" : isSub ? "1.5px solid rgba(255,255,255,0.4)" : "2px solid rgba(255,255,255,0.4)"};
          box-shadow: 0 0 0 ${isSub ? 3 : 5}px ${isSelected ? "#fbbf2440" : styleConf.markerColor + "40"};
          transform: scale(${isSelected ? 1.4 : 1});
          cursor: pointer;
          transition: transform 0.15s;
        "></div>
      `;
      const size = isSelected ? (isSub ? 14 : 22) : (isSub ? 10 : 16);
      marker.setIcon(
        L.divIcon({
          html: markerHtml,
          className: "",
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        })
      );
    });
  }, [selected]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full rounded-xl overflow-hidden" />
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-900 rounded-xl">
          <span className="text-stone-500 text-sm animate-pulse">Loading map…</span>
        </div>
      )}

      {/* Injected tooltip styles */}
      <style>{`
        .wine-tooltip {
          background: #1c1917;
          border: 1px solid #44403c;
          color: #e7e5e4;
          font-size: 12px;
          font-family: ui-sans-serif, system-ui, sans-serif;
          padding: 3px 8px;
          border-radius: 4px;
          white-space: nowrap;
        }
        .wine-tooltip::before { display: none; }
        .leaflet-attribution-flag { display: none !important; }
        .leaflet-control-attribution {
          background: rgba(0,0,0,0.5) !important;
          color: #57534e !important;
          font-size: 10px !important;
        }
        .leaflet-control-attribution a { color: #78716c !important; }
        .leaflet-bar a {
          background: #1c1917 !important;
          color: #e7e5e4 !important;
          border-color: #44403c !important;
        }
        .leaflet-bar a:hover { background: #292524 !important; }
      `}</style>
    </div>
  );
}
