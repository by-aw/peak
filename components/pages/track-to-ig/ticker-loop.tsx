"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

/**
 * Framer Ticker (vertical, 30px/s, upwards) as a CSS-free motion loop: the items are rendered twice and the
 * column slides by exactly one copy (-50%), so the seam is invisible whatever the item heights are.
 * One copy is about 570px high, so a 19s cycle is the 30px/s of the live ticker.
 */
export function TickerLoop({ children, duration = 19 }: { children: ReactNode; duration?: number }) {
  return (
    <motion.div className="flex w-full flex-col" animate={{ y: ["0%", "-50%"] }} transition={{ duration, ease: "linear", repeat: Infinity }}>
      <div className="flex w-full flex-col gap-2 pb-2">{children}</div>
      <div aria-hidden className="flex w-full flex-col gap-2 pb-2">
        {children}
      </div>
    </motion.div>
  );
}
