"use client";

import type { WineAnalysis } from "@/types/wine";

const RATING_COLOR: Record<string, string> = {
  exceptional: "text-amber-300 bg-amber-900/30",
  legendary: "text-yellow-300 bg-yellow-900/30",
  "very good to excellent": "text-green-300 bg-green-900/30",
  "very good": "text-green-400 bg-green-900/20",
  excellent: "text-green-300 bg-green-900/30",
  good: "text-stone-300 bg-stone-800",
  "good (uneven)": "text-orange-300 bg-orange-900/20",
};

function Badge({ label, value, colorClass }: { label: string; value: string; colorClass?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClass || "bg-stone-800 text-stone-300"}`}>
      <span className="text-stone-500">{label}</span>
      {value}
    </span>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-500">{title}</h3>
      {children}
    </div>
  );
}

export default function WineCard({ analysis }: { analysis: WineAnalysis }) {
  const { parsed_label: label, region_profile, vintage_note, grape_profile } = analysis;

  const vintageRatingClass = vintage_note
    ? RATING_COLOR[vintage_note.rating] || "text-stone-300 bg-stone-800"
    : "";

  return (
    <div className="space-y-6">
      {/* Hero: wine identity */}
      <div className="rounded-2xl border border-stone-800 bg-stone-900 p-6 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-amber-100">
              {label.winery || "Unknown Winery"}
            </h2>
            {label.wine_name && (
              <p className="text-stone-400 text-sm mt-0.5">{label.wine_name}</p>
            )}
          </div>
          <span className={`shrink-0 text-xs font-medium rounded px-2 py-1 ${analysis.confidence === "high" ? "bg-green-900/30 text-green-400" : analysis.confidence === "medium" ? "bg-yellow-900/30 text-yellow-400" : "bg-stone-800 text-stone-500"}`}>
            {analysis.confidence} confidence
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {label.vintage && <Badge label="" value={String(label.vintage)} colorClass="bg-amber-900/30 text-amber-200" />}
          {label.grape_variety && <Badge label="" value={label.grape_variety} colorClass="bg-stone-800 text-stone-200" />}
          {label.appellation && <Badge label="" value={label.appellation} colorClass="bg-stone-800 text-stone-300" />}
          {label.alcohol_pct && <Badge label="alc" value={`${label.alcohol_pct}%`} />}
          {label.estate_bottled && <Badge label="" value="Estate Bottled" colorClass="bg-stone-800 text-stone-400" />}
          {label.reserve && <Badge label="" value="Reserve" colorClass="bg-amber-900/20 text-amber-400" />}
        </div>
      </div>

      {/* Terroir narrative — the core differentiator */}
      <div className="rounded-2xl border border-amber-900/40 bg-amber-950/20 p-6 space-y-2">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-600">Terroir Story</h3>
        <p className="text-stone-200 text-sm leading-relaxed">{analysis.terroir_narrative}</p>
      </div>

      {/* 4-panel grid: region, vintage, grape, producer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Region */}
        {region_profile && (
          <div className="rounded-xl border border-stone-800 bg-stone-900 p-4 space-y-2">
            <Section title="Region">
              <p className="text-amber-200 text-sm font-medium">{region_profile.name}</p>
              {region_profile.parent_ava && (
                <p className="text-stone-500 text-xs">within {region_profile.parent_ava}</p>
              )}
              <p className="text-stone-400 text-xs leading-relaxed">{region_profile.climate_summary}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {region_profile.soil_types.slice(0, 3).map((s) => (
                  <span key={s} className="text-xs bg-stone-800 text-stone-400 rounded px-2 py-0.5">{s}</span>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* Vintage */}
        {vintage_note && (
          <div className="rounded-xl border border-stone-800 bg-stone-900 p-4 space-y-2">
            <Section title={`Vintage ${vintage_note.year}`}>
              <span className={`inline-block text-xs font-semibold uppercase tracking-wide rounded px-2 py-0.5 ${vintageRatingClass}`}>
                {vintage_note.rating}
              </span>
              <p className="text-stone-400 text-xs leading-relaxed">{vintage_note.weather_summary}</p>
              <p className="text-stone-500 text-xs">Drink: {vintage_note.aging_potential}</p>
            </Section>
          </div>
        )}

        {/* Grape */}
        {grape_profile && (
          <div className="rounded-xl border border-stone-800 bg-stone-900 p-4 space-y-2">
            <Section title="Grape">
              <p className="text-amber-200 text-sm font-medium">{grape_profile.variety}</p>
              <p className="text-stone-400 text-xs leading-relaxed">{grape_profile.structure}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {grape_profile.flavor_profile.slice(0, 5).map((f) => (
                  <span key={f} className="text-xs bg-stone-800 text-stone-400 rounded px-2 py-0.5">{f}</span>
                ))}
              </div>
              <p className="text-stone-500 text-xs mt-1">Peak window: {grape_profile.peak_drinking_window}</p>
            </Section>
          </div>
        )}

        {/* Food pairings */}
        {grape_profile && (
          <div className="rounded-xl border border-stone-800 bg-stone-900 p-4 space-y-2">
            <Section title="Food Pairings">
              <div className="flex flex-wrap gap-1">
                {grape_profile.food_pairings.map((f) => (
                  <span key={f} className="text-xs bg-stone-800 text-stone-400 rounded px-2 py-0.5">{f}</span>
                ))}
              </div>
            </Section>
          </div>
        )}
      </div>

      {/* Buying guidance */}
      <div className="rounded-xl border border-stone-700 bg-stone-900/50 p-5 space-y-1">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-500">Buying Guidance</h3>
        <p className="text-stone-300 text-sm leading-relaxed">{analysis.buying_guidance}</p>
      </div>

      {/* Geek notes */}
      <div className="rounded-xl border border-stone-800 p-5 space-y-1">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-500">Geek Notes</h3>
        <p className="text-stone-400 text-sm leading-relaxed">{analysis.geek_notes}</p>
      </div>

      {/* California character */}
      {grape_profile && (
        <div className="rounded-xl border border-stone-800 p-5 space-y-1">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-500">
            {grape_profile.variety} in California
          </h3>
          <p className="text-stone-400 text-sm leading-relaxed">{grape_profile.california_character}</p>
        </div>
      )}
    </div>
  );
}
