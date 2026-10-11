"use client";

import { useRef, useState, type ReactNode } from "react";
import { uploadImage } from "./upload";

export const inputClass = "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200";

export function Field({ label, hint, error, htmlFor, children }: { label: string; hint?: ReactNode; error?: string; htmlFor?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-900">{label}</label>
      {hint && <p className="mt-0.5 text-xs text-gray-500">{hint}</p>}
      <div className="mt-1.5">{children}</div>
      {error && <p role="alert" className="mt-1 text-xs font-medium text-red-700">{error}</p>}
    </div>
  );
}

/** "42 / 60" that turns amber past the recommended length (search engines cut longer text off). */
export function Count({ value, limit }: { value: string; limit: number }) {
  const n = value.length;
  return <span className={`text-xs ${n > limit ? "font-medium text-amber-700" : "text-gray-500"}`}>{n} / {limit}{n > limit ? " (may be cut off in search results)" : ""}</span>;
}

export function Card({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5">
      <h2 className="text-base font-semibold text-gray-900">{title}</h2>
      {description && <p className="mt-0.5 text-sm text-gray-600">{description}</p>}
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

/** Upload / replace / remove for one picture. `onChange` receives the Blob URL and the picture's pixel size. */
export function ImageField({ src, onChange, label }: { src: string; onChange: (v: { src: string; width: number | null; height: number | null } | null) => void; label: string }) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  return (
    <div>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="max-h-48 rounded-lg border border-gray-200 bg-gray-50 object-contain" />
      ) : (
        <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-sm text-gray-500">No picture yet</div>
      )}
      <div className="mt-2 flex flex-wrap gap-2">
        <button type="button" disabled={busy} onClick={() => input.current?.click()} className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium hover:bg-gray-100 disabled:opacity-50">
          {busy ? "Uploading…" : src ? `Replace ${label}` : `Upload ${label}`}
        </button>
        {src && (
          <button type="button" onClick={() => onChange(null)} className="rounded-lg px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100">Remove</button>
        )}
      </div>
      {error && <p role="alert" className="mt-1 text-xs font-medium text-red-700">{error}</p>}
      <input
        ref={input}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        hidden
        onChange={async (e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (!file) return;
          setError(null);
          setBusy(true);
          try {
            const img = await uploadImage(file);
            onChange({ src: img.url, width: img.width, height: img.height });
          } catch (err) {
            setError(err instanceof Error ? err.message : "Upload failed.");
          } finally {
            setBusy(false);
          }
        }}
      />
    </div>
  );
}
