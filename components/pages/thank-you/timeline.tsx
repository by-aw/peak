"use client";

import { useEffect, useRef, useState } from "react";

/** Dot tops and (top, height, colour) of the bars inside the progress pill, from the Framer "Filled Up Bar" component. */
const DOTS: { top: number; ring: boolean }[] = [
  { top: 20, ring: false },
  { top: 174, ring: false },
  { top: 350, ring: false },
  { top: 526, ring: true },
  { top: 680, ring: true },
];
const BARS: [number, number, string][] = [
  [48, 114, "#fff"],
  [202, 136, "#fff"],
  [398, 116, "#f7f7f7"],
  [554, 114, "#f7f7f7"],
];
const EASE = "cubic-bezier(0.27,0,0.51,1)";

/**
 * "Content Timeline" row of /thank-you ("What happens next"): the step card (`children`, whose last step has `id="bar-fill"`) beside a
 * vertical purple progress pill (52px wide, 40px on phone) with a white dot per step. The pill is a two-state Framer variant:
 * 386px tall fading from purple (#5a31c0) to white, then 713px and #5a31c0 -> #744cd9 once the top of the last step has come
 * into the bottom of the viewport (it stays that way when scrolling on and returns when scrolling back up past that point),
 * switching in 0.4s (ease .27,0,.51,1). The two bottom dots are ringed (1.5px #f0ecec) and the two bottom bars are #f7f7f7.
 */
export function Timeline({ children }: { children: React.ReactNode }) {
  const row = useRef<HTMLDivElement>(null);
  const [full, setFull] = useState(false);

  useEffect(() => {
    const update = () => {
      const last = row.current?.querySelector("#bar-fill");
      if (!last) return;
      setFull(last.getBoundingClientRect().top <= window.innerHeight);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={row} className="flex w-full max-w-[770px] items-start gap-4 md:gap-12">
      <div className="relative w-10 flex-none md:w-[52px]">
        <div className="relative w-full transition-[height] duration-[400ms]" style={{ height: full ? 713 : 386, transitionTimingFunction: EASE }}>
          <div className="absolute inset-0 overflow-hidden rounded-[120px] bg-[linear-gradient(#5a31c0_0%,#fff_100%)]">
            <div
              className="absolute inset-0 bg-[linear-gradient(#5a31c0_0%,#744cd9_100%)] transition-opacity duration-[400ms]"
              style={{ opacity: full ? 1 : 0, transitionTimingFunction: EASE }}
            />
          </div>
          {DOTS.map(({ top, ring }) => (
            <div
              key={top}
              aria-hidden
              className={`absolute left-1/2 size-4 -translate-x-1/2 rounded-full bg-white ${ring ? "border-[1.5px] border-[#f0ecec]" : ""}`}
              style={{ top }}
            />
          ))}
          {BARS.map(([top, height, color]) => (
            <div key={top} aria-hidden className="absolute left-[calc(50%-3px)] w-1.5 rounded-[24px]" style={{ top, height, backgroundColor: color }} />
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}
