"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type * as Leaflet from "leaflet";
import type { Feature, FeatureCollection } from "geojson";
import {
  MAP_REGIONS,
  MACRO_REGION_CONFIG,
  type MapRegion,
  type MapRegionSelection,
} from "@/data/map-regions";
import { WINE_MAP_THEME } from "@/data/wine-institute-theme";
import {
  AVA_GEO_ATTRIBUTION,
  findMapRegionForFeature,
  macroRegionFromAvaFeature,
} from "@/lib/ava-geo";
import { avaNicheTierFromFeature } from "@/lib/ava-niche-tier";
import { polygonStyleForTier } from "@/lib/ava-tier-style";

declare global {
  interface Window {
    L: typeof Leaflet;
  }
}

const GEOJSON_URL =
  process.env.NEXT_PUBLIC_CA_AVAS_GEOJSON ?? "/data/ca-avas.geojson";

interface Props {
  onSelect: (selection: MapRegionSelection | null) => void;
  selected: MapRegionSelection | null;
}

function dotHtml(fill: string, border: string, size: number, selected: boolean) {
  const gold = WINE_MAP_THEME.selectFill;
  const goldBd = WINE_MAP_THEME.selectStroke;
  const bg = selected ? gold : fill;
  const bd = selected ? `${goldBd} 2px solid` : `${border} 1.5px solid`;
  const shadow = selected
    ? `0 0 0 3px ${gold}55, 0 1px 4px rgba(0,0,0,0.35)`
    : `0 1px 3px rgba(0,0,0,0.3)`;
  return `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${bg};border:${bd};box-shadow:${shadow};cursor:pointer;"></div>`;
}

function avaIdFromFeature(f: Feature): string {
  const p = f.properties as Record<string, unknown> | null;
  return String(p?.ava_id ?? "");
}

export default function WineMap({ onSelect, selected }: Props) {
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Leaflet.Map | null>(null);
  const markersRef = useRef<Map<string, Leaflet.Marker>>(new Map());
  const layerByAvaIdRef = useRef<Map<string, Leaflet.Layer>>(new Map());
  const featureByAvaIdRef = useRef<Map<string, Feature>>(new Map());
  const geoGroupRef = useRef<Leaflet.LayerGroup | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [geoReady, setGeoReady] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  const applyLayerStyle = useCallback((layer: Leaflet.Layer, feature: Feature, isSel: boolean) => {
    const L = window.L;
    if (!(layer instanceof L.Path)) return;
    const macro = macroRegionFromAvaFeature(feature);
    const tier = avaNicheTierFromFeature(feature);
    layer.setStyle(polygonStyleForTier(macro, tier, isSel));
  }, []);

  const syncGeoSelectionStyles = useCallback(() => {
    if (!geoReady) return;
    layerByAvaIdRef.current.forEach((layer, avaId) => {
      const feature = featureByAvaIdRef.current.get(avaId);
      if (!feature) return;
      let isSel = false;
      if (!selected) isSel = false;
      else if (selected.kind === "geo") isSel = selected.avaId === avaId;
      else {
        const hit = findMapRegionForFeature(feature);
        isSel = hit?.key === selected.region.key;
      }
      applyLayerStyle(layer, feature, isSel);
    });
  }, [geoReady, selected, applyLayerStyle]);

  useEffect(() => {
    syncGeoSelectionStyles();
  }, [syncGeoSelectionStyles]);

  useEffect(() => {
    if (!mapReady || !window.L) return;
    const L = window.L;

    markersRef.current.forEach((marker, key) => {
      const region = MAP_REGIONS.find((r) => r.key === key);
      if (!region) return;
      const mc = MACRO_REGION_CONFIG[region.macroRegion];
      const isSub = region.tier === "sub";
      const isSelected =
        selected?.kind === "full" && selected.region.key === key;
      const size = isSelected ? (isSub ? 12 : 18) : isSub ? 8 : 12;
      marker.setIcon(
        L.divIcon({
          html: dotHtml(mc.fill, mc.border, size, !!isSelected),
          className: "",
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        })
      );
    });
  }, [selected, mapReady]);

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    const initMap = () => {
      if (mapRef.current || !containerRef.current) return;
      const L = window.L;

      const map = L.map(containerRef.current, {
        center: [37.5, -120.8],
        zoom: 7,
        zoomControl: true,
        maxBounds: [
          [31, -126],
          [43, -113],
        ],
        minZoom: 6,
      });

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 20,
          className: "wine-map-tiles",
        }
      ).addTo(map);

      mapRef.current = map;
      const geoGroup = L.layerGroup().addTo(map);
      geoGroupRef.current = geoGroup;

      MAP_REGIONS.forEach((region) => {
        const mc = MACRO_REGION_CONFIG[region.macroRegion];
        const isSub = region.tier === "sub";
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
          onSelectRef.current({ kind: "full", region });
          map.setView(
            [region.lat, region.lng],
            Math.max(map.getZoom(), isSub ? 11 : 9),
            { animate: true }
          );
        });

        markersRef.current.set(region.key, marker);
      });

      setMapReady(true);

      fetch(GEOJSON_URL)
        .then((r) => {
          if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
          return r.json() as Promise<FeatureCollection>;
        })
        .then((data) => {
          L.geoJSON(data, {
            onEachFeature: (feature, layer) => {
              const avaId = avaIdFromFeature(feature);
              if (!avaId) return;
              featureByAvaIdRef.current.set(avaId, feature);
              layerByAvaIdRef.current.set(avaId, layer);

              const name = String((feature.properties as { name?: string })?.name ?? "").trim();
              layer.bindTooltip(name, {
                sticky: true,
                className: "wine-tooltip",
                direction: "top",
              });

              const macro = macroRegionFromAvaFeature(feature);
              applyLayerStyle(layer, feature, false);

              layer.on("click", (e) => {
                L.DomEvent.stopPropagation(e);
                const editorial = findMapRegionForFeature(feature);
                if (editorial) onSelectRef.current({ kind: "full", region: editorial });
                else {
                  const raw = feature.properties as Record<string, string | null | undefined>;
                  const tier = avaNicheTierFromFeature(feature);
                  onSelectRef.current({
                    kind: "geo",
                    avaId,
                    name,
                    macroRegion: macro,
                    tier,
                    county: raw.county != null ? String(raw.county) : null,
                    within: raw.within != null ? String(raw.within) : null,
                    created: raw.created != null ? String(raw.created) : null,
                    cfrIndex: raw.cfr_index != null ? String(raw.cfr_index) : null,
                  });
                }
              });
            },
          }).addTo(geoGroup);

          setGeoReady(true);
        })
        .catch((err: unknown) => {
          setGeoError(err instanceof Error ? err.message : "Could not load AVA boundaries");
        });
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

  return (
    <div className="relative w-full h-full">
      <div
        ref={containerRef}
        className="w-full h-full rounded-xl overflow-hidden ring-1 shadow-inner"
        style={{
          background: WINE_MAP_THEME.paperElevated,
          boxShadow: `inset 0 0 0 1px ${WINE_MAP_THEME.ruleHair}`,
        }}
      />

      {!mapReady && (
        <div
          className="absolute inset-0 flex items-center justify-center rounded-xl"
          style={{ background: WINE_MAP_THEME.paperElevated }}
        >
          <span style={{ color: WINE_MAP_THEME.inkFaint }} className="text-sm animate-pulse">
            Loading map…
          </span>
        </div>
      )}

      {geoError && (
        <div
          className="absolute bottom-14 left-3 right-3 text-xs rounded-lg px-3 py-2 z-[400]"
          style={{
            background: WINE_MAP_THEME.panel,
            border: `1px solid ${WINE_MAP_THEME.rule}`,
            color: WINE_MAP_THEME.inkMuted,
          }}
        >
          {geoError}. Place{" "}
          <code className="text-[11px]">public/data/ca-avas.geojson</code> or set{" "}
          <code className="text-[11px]">NEXT_PUBLIC_CA_AVAS_GEOJSON</code>.
        </div>
      )}

      <p
        className="absolute bottom-1 left-3 right-3 text-[10px] leading-snug z-[400] pointer-events-none"
        style={{ color: WINE_MAP_THEME.inkFaint }}
      >
        {AVA_GEO_ATTRIBUTION}
      </p>

      <style>{`
        .wine-map-tiles {
          filter: ${WINE_MAP_THEME.tileFilter};
        }
        .wine-tooltip {
          background: ${WINE_MAP_THEME.paperElevated};
          border: 1px solid ${WINE_MAP_THEME.rule};
          color: ${WINE_MAP_THEME.ink};
          font-size: 12px;
          font-family: ui-serif, "Georgia", "Times New Roman", serif;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 2px;
          white-space: nowrap;
          box-shadow: 0 2px 6px rgba(42,35,24,0.12);
        }
        .wine-tooltip::before { display: none; }
        .leaflet-attribution-flag { display: none !important; }
        .leaflet-control-attribution {
          background: ${WINE_MAP_THEME.paperElevated}e6 !important;
          color: ${WINE_MAP_THEME.inkFaint} !important;
          font-size: 10px !important;
          font-family: ui-serif, Georgia, serif !important;
        }
        .leaflet-control-attribution a { color: ${WINE_MAP_THEME.inkMuted} !important; }
        .leaflet-bar a {
          background: ${WINE_MAP_THEME.paperElevated} !important;
          color: ${WINE_MAP_THEME.ink} !important;
          border-color: ${WINE_MAP_THEME.rule} !important;
        }
        .leaflet-bar a:hover { background: ${WINE_MAP_THEME.paper} !important; }
      `}</style>
    </div>
  );
}
