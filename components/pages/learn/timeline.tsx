"use client";

import { useEffect, useRef, useState } from "react";

/** Dot tops and bar (top, height) pairs inside the progress pill, from the Framer "Default" variant. */
const DOTS = [20, 174, 350, 526, 680];
const BARS: [number, number, string][] = [
  [48, 114, "#fff"],
  [202, 136, "#fff"],
  [398, 116, "#f7f7f7"],
  [554, 114, "#f7f7f7"],
];
const EASE = "cubic-bezier(0.22,1,0.36,1)";

/**
 * Framer "Content Timeline" row of "What Happens After You Apply": the rollout card (`children`) beside a vertical purple
 * progress pill (52px wide, 40px on phone) with a white dot per rollout. The pill is a two-state Framer variant: 386px tall
 * and fading from purple (#5a31c0) to white while the row is still below the fold, then 713px and #5a31c0 -> #744cd9 once
 * 70% of the rollout card is above the bottom of the viewport (it stays that way when scrolling on, and returns when scrolling back
 * up past that point). The switch eases over about 0.6s.
 */
export function Timeline({ children }: { children: React.ReactNode }) {
  const row = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const update = () => {
      const el = row.current;
      if (!el) return;
      // Measure the rollout card, not the row: the row grows with the pill, which would make the switch flap near its threshold.
      const card = el.lastElementChild as HTMLElement | null;
      if (!card) return;
      setDone(el.getBoundingClientRect().top <= window.innerHeight - 0.71 * card.offsetHeight);
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
    <div ref={row} className="relative flex w-full max-w-[770px] items-start gap-4 md:gap-12">
      <div className="relative w-10 flex-none md:w-[52px]">
        <div className="relative w-full transition-[height] duration-[600ms]" style={{ height: done ? 713 : 386, transitionTimingFunction: EASE }}>
          <div className="absolute inset-0 overflow-hidden rounded-[120px] bg-[linear-gradient(#5a31c0_0%,#fff_100%)]">
            <div
              className="absolute inset-0 bg-[linear-gradient(#5a31c0_0%,#744cd9_100%)] transition-opacity duration-[600ms]"
              style={{ opacity: done ? 1 : 0, transitionTimingFunction: EASE }}
            />
          </div>
          {DOTS.map((top) => (
            <div key={top} aria-hidden className="absolute left-1/2 size-4 -translate-x-1/2 rounded-full bg-white" style={{ top }} />
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
