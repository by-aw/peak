"use client";

import { useEffect, useRef, useState } from "react";

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/** Deterministic bar heights (6-22px) so the server and client render the same waveform. */
function waveform(seed: number, count: number) {
  const out: number[] = [];
  let x = seed || 1;
  for (let i = 0; i < count; i++) {
    x = (x * 1103515245 + 12345) & 0x7fffffff;
    out.push(6 + (x % 1600) / 100);
  }
  return out;
}

/**
 * Inline audio player of the Framer rich text (voice-message posts): grey 12px-radius bar with a
 * play button, "0:00 / 0:19" counter and a 2px-bar waveform that doubles as the seek bar.
 */
export function AudioPlayer({ src, duration, bars }: { src: string; duration: string | null; bars?: number[] }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [total, setTotal] = useState<number | null>(null);
  const heights = bars && bars.length >= 40 ? bars : [...(bars ?? []), ...waveform(src.length * 31 + (bars?.length ?? 0), 60 - (bars?.length ?? 0))];

  useEffect(() => {
    const a = ref.current;
    if (!a) return;
    const onTime = () => setTime(a.currentTime);
    const onMeta = () => setTotal(a.duration);
    const onEnd = () => setPlaying(false);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
    };
  }, []);

  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (a.paused) {
      void a.play();
      setPlaying(true);
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = ref.current;
    if (!a || !total) return;
    const r = e.currentTarget.getBoundingClientRect();
    a.currentTime = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * total;
  };

  const progress = total ? time / total : 0;
  return (
    <div className="flex w-full items-center gap-3 rounded-[12px] bg-gray-25 px-5 py-4">
      <audio ref={ref} src={src} preload="metadata" className="hidden" />
      <button type="button" onClick={toggle} aria-label={playing ? "Pause" : "Play"} className="flex size-6 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full">
        {playing ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="7" y="6" width="3.5" height="12" rx="1" fill="#6d6d6d" />
            <rect x="13.5" y="6" width="3.5" height="12" rx="1" fill="#6d6d6d" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z" fill="#6d6d6d" />
          </svg>
        )}
      </button>
      <div className="flex shrink-0 items-center font-[system-ui,-apple-system,sans-serif] text-[14px] font-[450] tracking-[0.3px] whitespace-nowrap text-[#666]">
        {fmt(time)} / {total ? fmt(total) : (duration ?? "0:00")}
      </div>
      <div className="relative flex h-6 min-w-0 flex-1 cursor-pointer items-center justify-between overflow-hidden" onClick={seek} role="presentation">
        {heights.map((h, i) => (
          <div
            key={i}
            className="w-[2px] shrink-0 rounded-[1px] transition-[background] duration-150"
            style={{ height: `${h}px`, background: i / heights.length < progress ? "#6d6d6d" : "#b0b0b0" }}
          />
        ))}
      </div>
    </div>
  );
}
