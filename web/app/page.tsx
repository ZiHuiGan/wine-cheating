"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import type { WineAnalysis } from "@/types/wine";
import LabelUploader from "@/components/LabelUploader";
import WineCard from "@/components/WineCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function Home() {
  const [analysis, setAnalysis] = useState<WineAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (payload: {
    image_base64?: string;
    image_url?: string;
    raw_text?: string;
  }) => {
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const res = await fetch(`${API_URL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Analysis failed");
      }

      const data: WineAnalysis = await res.json();
      setAnalysis(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100">
      {/* Header */}
      <div className="border-b border-stone-800 px-6 py-5">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-semibold tracking-tight text-amber-200">
            Wine Label Analyst
          </h1>
          <p className="text-stone-400 text-sm mt-1">
            California wines · Region × Producer × Vintage × Grape
          </p>
          <Link
            href="/map"
            className="inline-block mt-2 text-xs text-amber-500 hover:text-amber-300 transition-colors"
          >
            Explore California wine regions map →
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">
        <LabelUploader onAnalyze={handleAnalyze} loading={loading} />

        {error && (
          <div className="rounded-lg border border-red-800 bg-red-950/40 px-4 py-3 text-red-300 text-sm">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-12 text-stone-400 text-sm animate-pulse">
            Reading the label and consulting the cellar book...
          </div>
        )}

        {analysis && <WineCard analysis={analysis} />}
      </div>
    </main>
  );
}
