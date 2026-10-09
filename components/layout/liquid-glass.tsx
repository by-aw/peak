"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * Framer "Liquid Glass" layer used behind the nav pill: a transparent overlay whose
 * backdrop-filter is an SVG displacement map (edge-refraction + slight chromatic aberration),
 * ported from the SVG filter the published site injects. The map is drawn at half size
 * (448x26 for the 896x52 pill), so it is regenerated on resize.
 */
export function LiquidGlass({ scale = 410, blur = 10 }: { scale?: number; blur?: number }) {
  const rawId = useId();
  const filterId = `liquid-glass-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 896, h: 52 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) setSize({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const w = size.w / 2;
  const h = size.h / 2;
  const map =
    "data:image/svg+xml," +
    encodeURIComponent(
      `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="red" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="red"/></linearGradient><linearGradient id="blue" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="blue"/></linearGradient></defs><rect x="0" y="0" width="${w}" height="${h}" fill="black"/><rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="url(#red)"/><rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="url(#blue)" style="mix-blend-mode: difference"/><rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="hsl(0 0% 10% / 0)" style="filter:blur(5px)"/></svg>`,
    );

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]" aria-hidden="true">
      <div className="absolute inset-0 rounded-[14px] bg-white/0" style={{ backdropFilter: `url(#${filterId})` }}>
        <svg className="absolute inset-0 h-full w-full overflow-hidden">
          <defs>
            <filter id={filterId} colorInterpolationFilters="sRGB">
              <feImage href={map} x="0" y="0" width="100%" height="100%" result="map" />
              <feDisplacementMap in="SourceGraphic" in2="map" scale={scale} xChannelSelector="R" yChannelSelector="B" result="dispRed" />
              <feColorMatrix in="dispRed" type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" result="red" />
              <feDisplacementMap in="SourceGraphic" in2="map" scale={scale} xChannelSelector="R" yChannelSelector="B" result="dispGreen" />
              <feColorMatrix in="dispGreen" type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" result="green" />
              <feDisplacementMap in="SourceGraphic" in2="map" scale={scale} xChannelSelector="R" yChannelSelector="B" result="dispBlue" />
              <feColorMatrix in="dispBlue" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0" result="blue" />
              <feBlend in="red" in2="green" mode="screen" result="rg" />
              <feBlend in="rg" in2="blue" mode="screen" result="output" />
              <feGaussianBlur in="output" stdDeviation={blur} />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}
