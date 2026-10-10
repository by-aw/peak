"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";

/**
 * Framer number counter: counts from 0 to `to` once the element scrolls into view (~1.5s ease-out),
 * formatted with thousands separators and an optional prefix ("$").
 */
export function CountUp({ to, prefix = "", className = "" }: { to: number; prefix?: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, { duration: 1.5, ease: "easeOut", onUpdate: (v) => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [inView, to]);
  return (
    <p ref={ref} className={className}>
      {prefix}
      {value.toLocaleString("en-US")}
    </p>
  );
}
