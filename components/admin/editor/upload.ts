"use client";

import { upload } from "@vercel/blob/client";

export const IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];
export const AUDIO_TYPES = ["audio/mpeg", "audio/mp4", "audio/x-m4a", "audio/m4a", "audio/wav", "audio/x-wav", "audio/wave"];
export const IMAGE_MAX_MB = 10;
export const AUDIO_MAX_MB = 50;

export type UploadedImage = { url: string; width: number | null; height: number | null };
export type UploadedAudio = { url: string; duration: string | null; bars: number[] };

function safeName(name: string): string {
  const dot = name.lastIndexOf(".");
  const ext = dot > 0 ? name.slice(dot + 1).toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 5) : "";
  const base = (dot > 0 ? name.slice(0, dot) : name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80) || "file";
  return ext ? `${base}.${ext}` : base;
}

async function send(file: File, kind: "image" | "audio", onProgress?: (percent: number) => void): Promise<string> {
  const types = kind === "image" ? IMAGE_TYPES : AUDIO_TYPES;
  const maxMb = kind === "image" ? IMAGE_MAX_MB : AUDIO_MAX_MB;
  if (!types.includes(file.type)) {
    throw new Error(kind === "image" ? "Please choose a PNG, JPG, WebP or GIF image." : "Please choose an MP3, M4A or WAV audio file.");
  }
  if (file.size > maxMb * 1024 * 1024) throw new Error(`That file is too big. The limit is ${maxMb} MB.`);
  try {
    const blob = await upload(`cms/${kind}/${safeName(file.name)}`, file, {
      access: "public",
      handleUploadUrl: "/api/admin/upload",
      clientPayload: kind,
      contentType: file.type,
      multipart: file.size > 20 * 1024 * 1024,
      onUploadProgress: ({ percentage }) => onProgress?.(Math.round(percentage)),
    });
    return blob.url;
  } catch (e) {
    const msg = e instanceof Error ? e.message : "";
    if (/isn't connected|not connected|BLOB/i.test(msg)) throw new Error("File storage isn't connected yet, so uploads aren't available.");
    throw new Error(msg && msg.length < 140 ? `Upload failed: ${msg}` : "Upload failed. Check your connection and try again.");
  }
}

function imageSize(file: File): Promise<{ width: number; height: number } | null> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      resolve(null);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  });
}

function audioDuration(file: File): Promise<string | null> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const a = new Audio();
    const done = (v: string | null) => {
      URL.revokeObjectURL(url);
      resolve(v);
    };
    a.preload = "metadata";
    a.onloadedmetadata = () => {
      const s = Math.round(a.duration);
      done(Number.isFinite(s) ? `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}` : null);
    };
    a.onerror = () => done(null);
    a.src = url;
  });
}

export async function uploadImage(file: File, onProgress?: (percent: number) => void): Promise<UploadedImage> {
  const [url, size] = await Promise.all([send(file, "image", onProgress), imageSize(file)]);
  return { url, width: size?.width ?? null, height: size?.height ?? null };
}

export async function uploadAudio(file: File, onProgress?: (percent: number) => void): Promise<UploadedAudio> {
  const [url, duration] = await Promise.all([send(file, "audio", onProgress), audioDuration(file)]);
  // The player draws a small decorative waveform; new clips get a random one in the same range as the existing ones.
  const bars = Array.from({ length: 8 }, () => Math.round((4 + Math.random() * 19) * 10) / 10);
  return { url, duration, bars };
}
