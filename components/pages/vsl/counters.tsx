"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";

const formatNumber = (v: number) => Math.round(v).toLocaleString("en-US");

/**
 * Framer "AnimatedCounter" code component in "Layer in View" mode: whenever 40% of it is in view the number counts
 * from `start` to `end` (easeOut, `duration` s); leaving the viewport resets it to `start`, so it replays.
 * Renders the h1 as a centred flex row with tabular numbers (Framer's `monospace`).
 */
export function ReplayCounter({
  start,
  end,
  duration,
  prefix = "",
  suffix = "",
  className = "",
  style,
}: {
  start: number;
  end: number;
  duration: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const value = useMotionValue(start);
  const text = useTransform(value, (v) => `${prefix}${formatNumber(v)}${suffix}`);
  useEffect(() => {
    value.set(start);
    if (!inView) return;
    const controls = animate(value, end, { duration, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, start, end, duration, value]);
  return (
    <motion.h1 ref={ref} className={`flex w-full items-center justify-center text-center tabular-nums select-none [text-wrap:balance] ${className}`} style={style}>
      {text}
    </motion.h1>
  );
}

/**
 * Framer "Animated Number Counter" code component ("Layer in View", no replay): counts from `start` to `end` with a
 * bounce-less spring the first time any part of it enters the viewport. An invisible copy of the target value keeps the
 * box at its final width while the visible number (absolutely positioned on top) counts.
 */
export function InViewCounter({
  start,
  end,
  duration,
  prefix = "",
  className = "",
}: {
  start: number;
  end: number;
  duration: number;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true });
  const value = useMotionValue(start);
  const text = useTransform(value, (v) => `${prefix}${formatNumber(v)}`);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, end, { type: "spring", bounce: 0, duration });
    return () => controls.stop();
  }, [inView, end, duration, value]);
  return (
    <div className="relative">
      <p aria-hidden className={`pointer-events-none m-0 text-center opacity-0 select-none ${className}`}>
        {prefix}
        {formatNumber(inView ? end : start)}
      </p>
      <motion.p ref={ref} className={`absolute inset-0 m-0 text-center ${className}`}>
        {text}
      </motion.p>
    </div>
  );
}
