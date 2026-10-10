"use client";

import { motion } from "motion/react";

/**
 * The eight curves of the Framer "Integration SVG Animation" (layers "1".."8"): a faint full stroke plus a
 * 30%-long dash that travels along the path. On the live site every dash animates stroke-dashoffset
 * 160 -> 30 (pathLength 100) with an ease-in-out over ~2.1s, rests ~0.25s and repeats; the curves start
 * staggered (1 first, then 2/3, then 5/6/7, then 8, then 4).
 */
const PATHS: { viewBox: string; d: string; top: number; height: number; delay: number }[] = [
  { viewBox: "0 0 997 76", d: "M.133.485c380.483 102.112 599.207 97.525 996 0", top: 12, height: 74, delay: 0 },
  { viewBox: "0 0 890 49", d: "M.094.492c339.608 65.462 534.834 62.522 889 0", top: 44, height: 48, delay: 0.15 },
  { viewBox: "0 0 801 33", d: "M.07.496c305.609 43.641 481.291 41.681 800 0", top: 68, height: 32, delay: 0.15 },
  { viewBox: "0 0 997 26", d: "M.047.498c380.483 34.095 599.207 32.563 996 0", top: 82, height: 25, delay: 0.57 },
  { viewBox: "0 0 998 3", d: "M1 1.5h996", top: 103, height: 20, delay: 0.3 },
  { viewBox: "0 0 997 26", d: "M996.039 25.5c-380.483-34.095-599.207-32.563-996 0", top: 118, height: 25, delay: 0.3 },
  { viewBox: "0 0 801 33", d: "M800.062 32.5c-305.609-43.641-481.29-41.68-800 0", top: 124, height: 32, delay: 0.3 },
  { viewBox: "0 0 997 76", d: "M996.117 75.373c-380.483-102.112-599.207-97.525-996 0", top: 132, height: 74, delay: 0.44 },
];

export function IntegrationPaths() {
  return (
    <>
      {PATHS.map((p, i) => (
        <div key={i} className="absolute inset-x-0 z-[1] flex items-center justify-center overflow-hidden" style={{ top: p.top, height: p.height }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox={p.viewBox} className="h-full w-full">
            <path d={p.d} stroke="rgba(168, 85, 247, 0.48)" strokeWidth="1" strokeLinejoin="round" strokeLinecap="round" fill="transparent" />
            <motion.path
              d={p.d}
              stroke="rgb(168, 85, 247)"
              strokeWidth="1"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="transparent"
              initial={{ pathLength: 0.3, pathSpacing: 1, pathOffset: -1.6 }}
              animate={{ pathLength: 0.3, pathSpacing: 1, pathOffset: -0.3 }}
              transition={{ duration: 2.1, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.25, delay: p.delay }}
            />
          </svg>
        </div>
      ))}
    </>
  );
}

/** The green "Dot" of the "Text Stack" label, pulsing between 100% and 40% opacity (~1.6s cycle). */
export function PulsingDot() {
  return (
    <motion.div
      aria-hidden
      className="size-1.5 shrink-0 rounded-full bg-[#10b92e]"
      animate={{ opacity: [1, 0.4, 1] }}
      transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
    />
  );
}
