"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, type Transition } from "motion/react";

/**
 * Framer "appear" effects of /dm-audit (read from the page module):
 * - "title": h1, `y: 25 -> 0`, spring bounce 0.2 / 0.6s;
 * - "button": hero CTA, `scale: 0.8 -> 1`, spring bounce 0.2 / 1s with a 0.4s delay;
 * - "row": step / criteria / option cards, `y: 50 -> 0`, 0.3s tween (ease .12,.23,.5,1) with a 0.1s delay per `index`.
 * All of them start from opacity 0, fire once as soon as one pixel is in view (threshold 0).
 */
const KINDS: Record<"title" | "button" | "row", { from: { y?: number; scale?: number }; transition: Transition }> = {
  title: { from: { y: 25 }, transition: { type: "spring", bounce: 0.2, duration: 0.6 } },
  button: { from: { scale: 0.8 }, transition: { type: "spring", bounce: 0.2, delay: 0.4, duration: 1 } },
  row: { from: { y: 50 }, transition: { type: "tween", duration: 0.3, ease: [0.12, 0.23, 0.5, 1] } },
};

export function Appear({ kind, index = 0, className, children }: { kind: keyof typeof KINDS; index?: number; className?: string; children: ReactNode }) {
  const { from, transition } = KINDS[kind];
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: from.y ?? 0, scale: from.scale ?? 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ ...transition, ...(kind === "row" ? { delay: index * 0.1 } : {}) }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Framer scroll-triggered "image 43" (the mascot panels next to the steps and criteria cards): hidden at
 * opacity 0 / scale 0.9 / rotated `rest * 2`, and tweens (0.4s, ease .44,0,.56,1) to opacity 1 / scale 1 / `rest` degrees while at least
 * half of it is in the viewport; it tweens back out when it leaves (the effect is not "once").
 */
export function FloatingImage({ rest, className, children }: { rest: number; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const hidden = { opacity: 0, scale: 0.9, rotate: rest * 2 };
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={hidden}
      animate={inView ? { opacity: 1, scale: 1, rotate: rest } : hidden}
      transition={{ type: "tween", duration: 0.4, ease: [0.44, 0, 0.56, 1] }}
    >
      {children}
    </motion.div>
  );
}
