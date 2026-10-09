"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const WISTIA_MEDIA_ID = "903tdvdx5v";
const PREVIEW_SRC = "/framer/upfEHKkQFf7yoGCwplg6Z06eXU.mp4";
const POSTER = "/framer/f5b2d3b0affec1ae1494e9b67dfa9be3.jpg";

type WistiaPlayerEl = HTMLElement & {
  play?: () => void;
  pause?: () => void;
  muted?: boolean;
  volume?: number;
  state?: string;
};

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "wistia-player": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, unknown>;
    }
  }
}

function loadWistia() {
  if (document.querySelector('script[data-wistia="player"]')) return;
  const player = document.createElement("script");
  player.src = "https://fast.wistia.com/player.js";
  player.async = true;
  player.dataset.wistia = "player";
  document.head.appendChild(player);
  const embed = document.createElement("script");
  embed.src = `https://fast.wistia.com/embed/${WISTIA_MEDIA_ID}.js`;
  embed.async = true;
  embed.type = "module";
  document.head.appendChild(embed);
}

/**
 * Hero founder video. Idle: muted looping mp4 preview with a play button (hover: video zooms 1.03,
 * dark overlay, button scales 1.08). Click: the Wistia player (same media as the live site) fades in
 * with sound; the centre button then toggles pause and a mute button sits top-right.
 */
export function FounderVideo() {
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const playerRef = useRef<WistiaPlayerEl>(null);

  useEffect(() => {
    if (!playing) return;
    loadWistia();
    const el = playerRef.current;
    if (!el) return;
    let tries = 0;
    const id = window.setInterval(() => {
      tries += 1;
      if (typeof el.play === "function") {
        el.muted = false;
        el.volume = 1;
        el.play();
        window.clearInterval(id);
      } else if (tries > 100) {
        window.clearInterval(id);
      }
    }, 100);
    return () => window.clearInterval(id);
  }, [playing]);

  const togglePause = useCallback(() => {
    const el = playerRef.current;
    if (!el) return;
    if (paused) el.play?.();
    else el.pause?.();
    setPaused(!paused);
  }, [paused]);

  const toggleMute = useCallback(() => {
    const el = playerRef.current;
    if (!el) return;
    el.muted = !muted;
    setMuted(!muted);
  }, [muted]);

  return (
    <div className="group relative aspect-video w-full cursor-pointer overflow-hidden rounded-[20px] bg-gray-950">
      <video
        src={PREVIEW_SRC}
        poster={POSTER}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="Video preview"
        aria-hidden={playing}
        className={`absolute inset-0 z-[1] block h-full w-full object-cover transition-transform duration-500 ease-[ease] ${
          playing ? "scale-[1.03]" : "group-hover:scale-[1.03]"
        }`}
      />
      {playing ? (
        <>
          <div className="absolute inset-0 z-[2] overflow-hidden">
            <wistia-player
              ref={playerRef}
              media-id={WISTIA_MEDIA_ID}
              playbutton="false"
              smallplaybutton="false"
              playbar="false"
              volumecontrol="false"
              fullscreenbutton="false"
              settingscontrol="false"
              qualitycontrol="false"
              playpausenotifier="false"
              playbackratecontrol="false"
              controlsvisibleonload="false"
              fitstrategy="cover"
              videofoam="true"
              volume="1"
              style={{ width: "100%", height: "100%", display: "block" }}
            />
          </div>
          <button
            type="button"
            aria-label={paused ? "Play" : "Pause"}
            onClick={togglePause}
            className="absolute top-1/2 left-1/2 z-[10] flex size-[72px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 backdrop-blur-[8px] transition-[opacity,transform] duration-[220ms]"
          >
            {paused ? (
              <svg width="27.36" height="27.36" viewBox="0 0 24 24" fill="none" className="ml-[2.88px]" aria-hidden="true">
                <path d="M6 4l14 8-14 8V4z" fill="rgb(17, 17, 17)" />
              </svg>
            ) : (
              <svg width="27.36" height="27.36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="6" y="4" width="4" height="16" rx="1" fill="rgb(17, 17, 17)" />
                <rect x="14" y="4" width="4" height="16" rx="1" fill="rgb(17, 17, 17)" />
              </svg>
            )}
          </button>
          <button
            type="button"
            aria-label={muted ? "Unmute" : "Mute"}
            onClick={toggleMute}
            className="absolute top-6 right-6 z-[11] flex size-10 cursor-pointer items-center justify-center rounded-full border-0 bg-black/50 p-0 backdrop-blur-[8px] transition-transform duration-[180ms]"
          >
            <svg width="16.8" height="16.8" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M11 5L6 9H2v6h4l5 4V5z" fill="#fff" />
              {muted ? (
                <path d="M16 9l6 6M22 9l-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
              ) : (
                <>
                  <path d="M15.5 8.5c1.4 1.2 2.2 2.5 2.2 3.5s-.8 2.3-2.2 3.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <path d="M18.5 5.5c2.5 1.9 3.7 4.1 3.7 6.5s-1.2 4.6-3.7 6.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
                </>
              )}
            </svg>
          </button>
        </>
      ) : (
        <>
          <div className="pointer-events-none absolute inset-0 z-[2] bg-black/0 transition-[background] duration-[250ms] ease-[ease] group-hover:bg-black/15" />
          <button
            type="button"
            aria-label="Play video"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 z-[5] cursor-pointer"
          />
          <div className="pointer-events-none absolute top-1/2 left-1/2 z-[6] flex size-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 backdrop-blur-[8px] transition-transform duration-[250ms] ease-[ease] group-hover:scale-[1.08]">
            <svg width="27.36" height="27.36" viewBox="0 0 24 24" fill="none" className="ml-[2.88px]" aria-hidden="true">
              <path d="M6 4l14 8-14 8V4z" fill="rgb(17, 17, 17)" />
            </svg>
          </div>
        </>
      )}
    </div>
  );
}
