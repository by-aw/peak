"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const PLAY = 56;
const MUTE = 40;

type WistiaHandle = {
  play: () => void;
  pause: () => void;
  mute: () => void;
  unmute: () => void;
  volume: (v?: number) => number;
  isMuted?: () => boolean;
  bind: (event: string, cb: () => void) => void;
};

/** Wistia's E-v1 queue of `{ id, onReady }` handlers (typed locally rather than augmenting `Window`). */
type WistiaWindow = Window & { _wq?: { id: string; onReady: (video: WistiaHandle) => void }[] };

function loadWistia(mediaId: string) {
  if (!document.getElementById("wistia-sdk")) {
    const sdk = document.createElement("script");
    sdk.id = "wistia-sdk";
    sdk.src = "https://fast.wistia.com/assets/external/E-v1.js";
    sdk.async = true;
    document.head.appendChild(sdk);
  }
  if (!document.getElementById(`wistia-media-${mediaId}`)) {
    const media = document.createElement("script");
    media.id = `wistia-media-${mediaId}`;
    media.src = `https://fast.wistia.com/embed/medias/${mediaId}.jsonp`;
    media.async = true;
    document.head.appendChild(media);
  }
}

/** Play / pause glyphs (24px viewBox, drawn at 38% of the button size like the Framer component). */
function PlayGlyph({ size }: { size: number }) {
  return (
    <svg width={size * 0.38} height={size * 0.38} viewBox="0 0 24 24" fill="none" style={{ marginLeft: size * 0.04 }} aria-hidden>
      <path d="M6 4l14 8-14 8V4z" fill="#111" />
    </svg>
  );
}

function PauseGlyph({ size }: { size: number }) {
  return (
    <svg width={size * 0.38} height={size * 0.38} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="6" y="4" width="4" height="16" rx="1" fill="#111" />
      <rect x="14" y="4" width="4" height="16" rx="1" fill="#111" />
    </svg>
  );
}

/**
 * Framer "WistiaVideoCarousel" code component with one video, as configured on /thank-you (16 cards) and on the /demo
 * "you're a bit early" screen: a card with the video's Wistia poster (`thumb`, the delivery hash of the poster mirrored to
 * `/framer/<hash>.jpg`) and a 56px frosted play button (hover: poster zooms 1.03, 15% dark overlay, button scales 1.08).
 * Clicking loads Wistia's E-v1 player muted and chrome-less (`muteOnPlay`); the card then toggles pause, the centre button
 * shows while paused or hovered, and a 40px mute toggle sits 24px from the top-right corner. `className` sets the card's size
 * and radius (20px, 16px on phone) and any background; `sizes` is the poster's `sizes` attribute.
 */
export function WistiaCard({ mediaId, thumb, title, sizes, className }: { mediaId: string; thumb: string; title: string; sizes: string; className: string }) {
  const [started, setStarted] = useState(false);
  const [hover, setHover] = useState(false);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const video = useRef<WistiaHandle | null>(null);

  useEffect(() => {
    if (!started) return;
    loadWistia(mediaId);
    const w = window as WistiaWindow;
    w._wq = w._wq || [];
    w._wq.push({
      id: mediaId,
      onReady: (v) => {
        video.current = v;
        try {
          v.mute();
          v.volume(0);
        } catch {}
        setMuted(true);
        v.bind("play", () => setPaused(false));
        v.bind("pause", () => setPaused(true));
        v.bind("end", () => setPaused(true));
        v.bind("volumechange", () => {
          try {
            setMuted(Boolean(v.isMuted?.()) || v.volume() === 0);
          } catch {}
        });
        try {
          v.play();
        } catch {}
      },
    });
  }, [started, mediaId]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = video.current;
    if (!v) return;
    if (paused) v.play();
    else v.pause();
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !muted;
    setMuted(next);
    const v = video.current;
    if (!v) return;
    try {
      if (next) {
        v.mute();
        v.volume(0);
      } else {
        v.unmute();
        v.volume(1);
      }
    } catch {}
  };

  const showCentre = started && (paused || hover);

  return (
    <div
      onClick={() => setStarted(true)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`relative w-full cursor-pointer overflow-hidden ${className}`}
    >
      {started ? (
        <>
          <div
            className={`wistia_embed wistia_async_${mediaId} videoFoam=true fitStrategy=cover controlsVisibleOnLoad=false playButton=false smallPlayButton=false playbar=false volumeControl=false fullscreenButton=false settingsControl=false qualityControl=false playPauseNotifier=false playbackRateControl=false volumeOnLoad=0 muted=true absolute inset-0 overflow-hidden`}
          />
          {/* Hide Wistia's own chrome, as the Framer component does. */}
          <style>{`.wistia_embed .w-bottom-bar,.wistia_embed .w-bottom-bar-wrapper,.wistia_embed .w-big-play-button,.wistia_embed .w-control-bar{display:none!important}`}</style>
          <div onClick={togglePlay} className="absolute inset-0 z-[5] cursor-pointer" />
          <button
            type="button"
            onClick={togglePlay}
            aria-label={paused ? "Play" : "Pause"}
            className="absolute top-1/2 left-1/2 z-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-[8px] transition-[opacity,transform] duration-[220ms] ease-[ease]"
            style={{ width: PLAY, height: PLAY, opacity: showCentre ? 1 : 0, transform: `translate(-50%, -50%) scale(${showCentre ? 1 : 0.85})` }}
          >
            {paused ? <PlayGlyph size={PLAY} /> : <PauseGlyph size={PLAY} />}
          </button>
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
            className="absolute top-6 right-6 z-[11] flex items-center justify-center rounded-full bg-black/50 p-0 backdrop-blur-[8px] transition-transform duration-[180ms] ease-[ease] hover:scale-[1.08]"
            style={{ width: MUTE, height: MUTE }}
          >
            <Image
              src={muted ? "/framer/KmBmi5Jyiya36h8PUsaKz10HF4A.png" : "/framer/Bc92Er4NzHWvWTZwaLNkpe8RU.png"}
              alt={muted ? "Muted" : "Unmuted"}
              width={MUTE / 2}
              height={MUTE / 2}
              className="pointer-events-none object-contain"
            />
          </button>
        </>
      ) : (
        <>
          <Image
            src={`/framer/${thumb}.jpg`}
            alt={title}
            fill
            sizes={sizes}
            draggable={false}
            className={`object-cover transition-transform duration-500 ease-[ease] ${hover ? "scale-[1.03]" : "scale-100"}`}
          />
          <div className={`pointer-events-none absolute inset-0 transition-colors duration-[250ms] ease-[ease] ${hover ? "bg-black/15" : "bg-black/0"}`} />
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-[8px] transition-transform duration-[250ms] ease-[ease]"
            style={{ width: PLAY, height: PLAY, transform: `translate(-50%, -50%) scale(${hover ? 1.08 : 1})` }}
          >
            <PlayGlyph size={PLAY} />
          </div>
        </>
      )}
    </div>
  );
}
