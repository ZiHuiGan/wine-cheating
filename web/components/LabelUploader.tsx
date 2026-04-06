"use client";

import Image from "next/image";
import { useState, useRef } from "react";

interface Props {
  onAnalyze: (payload: {
    image_base64?: string;
    image_url?: string;
    raw_text?: string;
  }) => void;
  loading: boolean;
}

export default function LabelUploader({ onAnalyze, loading }: Props) {
  const [mode, setMode] = useState<"upload" | "text">("upload");
  const [rawText, setRawText] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPreview(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleSubmit = () => {
    if (mode === "text") {
      if (!rawText.trim()) return;
      onAnalyze({ raw_text: rawText });
    } else {
      if (!preview) return;
      // strip the "data:image/jpeg;base64," prefix
      const base64 = preview.split(",")[1];
      onAnalyze({ image_base64: base64 });
    }
  };

  return (
    <div className="space-y-4">
      {/* Mode tabs */}
      <div className="flex gap-2">
        {(["upload", "text"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${
              mode === m
                ? "bg-amber-700 text-amber-100"
                : "bg-stone-800 text-stone-400 hover:text-stone-200"
            }`}
          >
            {m === "upload" ? "Photo / Image" : "Type Label Text"}
          </button>
        ))}
      </div>

      {mode === "upload" ? (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-stone-700 rounded-xl p-8 text-center cursor-pointer hover:border-amber-700 transition-colors"
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          {preview ? (
            <Image
              src={preview}
              alt="Label preview"
              width={800}
              height={800}
              unoptimized
              className="max-h-64 mx-auto rounded object-contain w-auto h-auto"
            />
          ) : (
            <div className="space-y-2">
              <div className="text-3xl">📷</div>
              <p className="text-stone-400 text-sm">
                Drop a label photo here, or tap to select
              </p>
              <p className="text-stone-600 text-xs">JPEG, PNG, HEIC</p>
            </div>
          )}
        </div>
      ) : (
        <textarea
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          placeholder={`Paste or type the wine label, e.g.:\n\nRobert Mondavi Winery\nTo Kalon Vineyard\nCabernet Sauvignon\nOakville, Napa Valley\n2019\n14.5% alc by vol`}
          rows={8}
          className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-3 text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-amber-700 resize-none font-mono"
        />
      )}

      <button
        onClick={handleSubmit}
        disabled={loading || (mode === "upload" ? !preview : !rawText.trim())}
        className="w-full py-3 rounded-xl bg-amber-700 hover:bg-amber-600 disabled:bg-stone-800 disabled:text-stone-600 text-amber-100 font-medium transition-colors text-sm"
      >
        {loading ? "Analyzing..." : "Analyze Label"}
      </button>
    </div>
  );
}
