"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

const format = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/**
 * Framer "Animated Number Counter" (trigger: layer in view, no replay, spring 1s / bounce 0, thousands commas):
 * counts from `start` to `end` the first time any part of it scrolls into view. Framer's spring settles critically
 * damped at ~18 rad/s (99% after 0.4s), which is stiffness 324 / damping 36 here. An invisible copy of the final
 * number reserves the width, like the Framer component does.
 */
export function Counter({ end, start = 0, className = "" }: { end: number; start?: number; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: "some" });
  const [value, setValue] = useState(start);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(start, end, { type: "spring", stiffness: 324, damping: 36, mass: 1, onUpdate: setValue });
    return () => controls.stop();
  }, [inView, start, end]);

  return (
    <div className="relative">
      <p aria-hidden className={`pointer-events-none whitespace-pre opacity-0 select-none ${className}`}>
        {format(end)}
      </p>
      <p ref={ref} className={`absolute inset-0 whitespace-pre ${className}`}>
        {format(value)}
      </p>
    </div>
  );
}
