"use client";

import { useEffect, useId, useRef, useState } from "react";

/** Bezel strength from the pill's edge inwards (quadratic ease-out): full refraction at the edge, none past it. */
const BEZEL_PROFILE = [1, 0.5625, 0.25, 0.0625, 0];

/**
 * Displacement map: transparent except for a bezel along each edge that pulls the backdrop in from inside the pill
 * (R drives x, B drives y; 255 samples from the right/below, 0 from the left/above). It points inwards because Chrome
 * clips the backdrop to the element and mirrors anything sampled past its edge.
 */
function bezelMap(w: number, h: number, bezel: number) {
  const bx = Math.min(bezel, w / 2);
  const by = Math.min(bezel, h / 2);
  const gradient = (id: string, direction: string, color: string) =>
    `<linearGradient id="${id}" ${direction}>${BEZEL_PROFILE.map((a, i) => `<stop offset="${i / 4}" stop-color="${color}" stop-opacity="${a}"/>`).join("")}</linearGradient>`;
  return (
    "data:image/svg+xml," +
    encodeURIComponent(
      `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg"><defs>` +
        gradient("l", 'x2="1"', "#ff8080") +
        gradient("r", 'x1="1" x2="0"', "#008080") +
        gradient("t", 'x2="0" y2="1"', "#8080ff") +
        gradient("b", 'x2="0" y1="1" y2="0"', "#808000") +
        `</defs><rect width="${bx}" height="${h}" fill="url(#l)"/><rect x="${w - bx}" width="${bx}" height="${h}" fill="url(#r)"/>` +
        `<rect width="${w}" height="${by}" fill="url(#t)"/><rect y="${h - by}" width="${w}" height="${by}" fill="url(#b)"/></svg>`,
    )
  );
}

/**
 * Framer "Liquid Glass" layer used behind the nav pill: a transparent overlay whose backdrop-filter is an SVG
 * displacement map (edge refraction + slight chromatic aberration), ported from the SVG filter the published site
 * injects. Framer's map displaced the whole backdrop like a lens; here only a bezel along the edges refracts and the
 * middle stays put, so the page seen through the pill lines up with the page around it. The map is regenerated on
 * resize.
 */
export function LiquidGlass({ scale = 50, blur = 2, bezel = 16 }: { scale?: number; blur?: number; bezel?: number }) {
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

  const map = bezelMap(size.w, size.h, bezel);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]" aria-hidden="true">
      <div className="absolute inset-0 rounded-[14px] bg-white/0" style={{ backdropFilter: `url(#${filterId})` }}>
        <svg className="absolute inset-0 h-full w-full overflow-hidden">
          <defs>
            <filter id={filterId} colorInterpolationFilters="sRGB">
              {/* the map sits on a flat neutral grey (no displacement); Chrome doesn't keep a grey inside the map image
                  exactly neutral, which shifted everything behind the glass by a few pixels */}
              <feFlood floodColor="rgb(128,128,128)" result="neutral" />
              <feImage href={map} x="0" y="0" width="100%" height="100%" result="bezel" />
              <feComposite in="bezel" in2="neutral" operator="over" result="map" />
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
