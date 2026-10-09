"use client";

import { useEffect, useRef } from "react";
import { STEPS, TimelineStep } from "../revenue-step-cards";

/** Live site: the timeline scrolls upward at ~30.6px/s. */
const SPEED_PX_PER_S = 30.6;

/**
 * Tablet/desktop "Turn DMs into revenue" visual: a lead's steps from first DM to won, looping upward and fading out
 * at the top and bottom.
 * The list holds three copies (8px apart, as padding so all three are the same height) and moves up by a third of
 * its own height, i.e. exactly one copy. `className` sizes the box.
 */
export function Timeline({ className = "" }: { className?: string }) {
  const listRef = useRef<HTMLUListElement>(null);
  const firstRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const first = firstRef.current;
    if (!list || !first) return;
    let anim: Animation | undefined;
    const start = () => {
      anim?.cancel();
      const distance = first.offsetHeight;
      if (!distance) return;
      anim = list.animate([{ transform: "translateY(0)" }, { transform: "translateY(calc(-100% / 3))" }], {
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
    <div
      className={`overflow-hidden [mask-image:linear-gradient(180deg,rgba(0,0,0,0)_0%,#000_15%,#000_85%,rgba(0,0,0,0)_100%)] ${className}`}
    >
      <ul ref={listRef} className="flex flex-col will-change-transform">
        {[0, 1, 2].map((i) => (
          <li key={i} ref={i === 0 ? firstRef : undefined} aria-hidden={i > 0} className="flex flex-col gap-2 pb-2">
            {STEPS.map((s) => (
              <TimelineStep key={s.name} step={s} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
