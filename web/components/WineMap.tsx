"use client";

import { useEffect, useRef, useState } from "react";
import { MAP_REGIONS, STYLE_CONFIG, type MapRegion } from "@/data/map-regions";

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

function buildMarkerHtml(styleConf: { markerColor: string }, isSub: boolean, isSelected = false) {
  const size = isSelected ? 14 : 10;
  const bg = isSelected ? "#fbbf24" : styleConf.markerColor;
  const border = isSelected ? "2px solid #fef3c7" : "1.5px solid rgba(255,255,255,0.5)";
  const shadow = `0 0 0 3px ${isSelected ? "#fbbf2440" : styleConf.markerColor + "50"}`;
  void isSub;
  return {
    html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${bg};border:${border};box-shadow:${shadow};cursor:pointer;"></div>`,
    size,
  };
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
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20,
      }).addTo(map);

      mapRef.current = map;

      MAP_REGIONS.forEach((region) => {
        const styleConf = STYLE_CONFIG[region.style];
        const isSub = region.tier === "sub";

        // ── Draw polygon for major AVAs ──────────────────────────────────
        if (region.polygon && !isSub) {
          const poly = L.polygon(region.polygon, {
            color: styleConf.fillColor,
            fillColor: styleConf.fillColor,
            fillOpacity: 0.12,
            weight: 1.5,
            opacity: 0.55,
          }).addTo(map);

          poly.bindTooltip(region.name, {
            sticky: true,
            className: "wine-tooltip",
            direction: "top",
          });

          poly.on("click", () => {
            onSelect(region);
          });

          poly.on("mouseover", () => {
            poly.setStyle({ fillOpacity: 0.22, opacity: 0.85 });
          });
          poly.on("mouseout", () => {
            // selected state will be corrected in the selection effect
            poly.setStyle({ fillOpacity: 0.12, opacity: 0.55 });
          });

          polygonsRef.current.set(region.key, poly);
        }

        // ── Marker (always shown — center dot for major AVAs, only marker for sub-AVAs) ──
        const { html, size } = buildMarkerHtml(styleConf, isSub);
        const icon = L.divIcon({ html, className: "", iconSize: [size, size], iconAnchor: [size / 2, size / 2] });

        const marker = L.marker([region.lat, region.lng], { icon })
          .addTo(map)
          .bindTooltip(region.name, {
            permanent: false,
            direction: "top",
            offset: [0, -12],
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

    if (window.L) {
      initMap();
      return;
    }

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

  // Update marker + polygon styles when selection changes
  useEffect(() => {
    if (!mapReady || !window.L) return;
    const L = window.L;

    // Update markers
    markersRef.current.forEach((marker, key) => {
      const region = MAP_REGIONS.find((r) => r.key === key);
      if (!region) return;
      const styleConf = STYLE_CONFIG[region.style];
      const isSelected = selected?.key === key;
      const { html, size } = buildMarkerHtml(styleConf, region.tier === "sub", isSelected);
      marker.setIcon(L.divIcon({ html, className: "", iconSize: [size, size], iconAnchor: [size / 2, size / 2] }));
    });

    // Update polygons
    polygonsRef.current.forEach((poly, key) => {
      const region = MAP_REGIONS.find((r) => r.key === key);
      if (!region) return;
      const styleConf = STYLE_CONFIG[region.style];
      const isSelected = selected?.key === key;
      poly.setStyle({
        color: isSelected ? "#fbbf24" : styleConf.fillColor,
        fillOpacity: isSelected ? 0.30 : 0.12,
        opacity: isSelected ? 1 : 0.55,
        weight: isSelected ? 2.5 : 1.5,
      });
    });
  }, [selected, mapReady]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full rounded-xl overflow-hidden" />
      {!mapReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-900 rounded-xl">
          <span className="text-stone-500 text-sm animate-pulse">Loading map…</span>
        </div>
      )}
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
          box-shadow: none;
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
