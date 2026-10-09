"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Live site: the phone list scrolls upward at ~30.6px/s, three copies with an 8px gap. */
const SPEED_PX_PER_S = 30.6;
const GAP = 8;

/**
 * Phone variant of the timeline: a 600px gray card with the step list looping upward,
 * blurred gray masks fading the top and bottom edges. `children` = the step rows.
 */
export function RevenueStepsMobile({ children }: { children: ReactNode }) {
  const listRef = useRef<HTMLUListElement>(null);
  const firstRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const first = firstRef.current;
    if (!list || !first) return;
    let anim: Animation | undefined;
    const start = () => {
      anim?.cancel();
      const distance = first.getBoundingClientRect().height + GAP;
      if (!distance) return;
      anim = list.animate([{ transform: "translateY(0)" }, { transform: `translateY(-${distance}px)` }], {
        duration: (distance / SPEED_PX_PER_S) * 1000,
        iterations: Infinity,
        easing: "linear",
      });
    };
    start();
    const ro = new ResizeObserver(start);
    ro.observe(first);
    return () => {
      ro.disconnect();
      anim?.cancel();
    };
  }, []);

  return (
    <div className="relative z-[3] flex h-[600px] w-full flex-col overflow-hidden rounded-3xl bg-[#f7f7f7] p-4">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-5 -left-5 z-[2] h-[100px] bg-[#f7f7f7] blur-[17px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[520px] -right-5 -bottom-10 -left-5 z-[2] bg-[#f7f7f7] blur-[17px]"
      />
      <div className="flex flex-1 flex-col">
        <ul ref={listRef} className="flex flex-col items-center gap-2 will-change-transform">
          {[0, 1, 2].map((i) => (
            <li
              key={i}
              ref={i === 0 ? firstRef : undefined}
              aria-hidden={i > 0}
              className="flex w-full flex-col gap-2"
            >
              {children}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
