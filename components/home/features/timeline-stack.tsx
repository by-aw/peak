"use client";

import { motion, useInView, type Variants } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { STEPS, StepCard } from "../revenue-step-cards";

/** How long each step stays at the front of the stack. */
const HOLD_MS = 2200;

const shadow = "shadow-[0_12px_24px_0_rgba(0,0,0,0.05),0_0_0_0.5px_#e0e0e0]";

/**
 * Where each card sits: at the front, waiting behind it (in the spot of the card peeking out above, 20px narrower,
 * and hidden), or dropping away after its turn.
 */
const POSITIONS: Variants = {
  front: { y: 0, scale: 1, opacity: 1, zIndex: 2 },
  behind: { y: -12, scale: 0.95, opacity: 0, zIndex: 1 },
  gone: { y: 20, scale: 1, opacity: 0, zIndex: 3 },
};

/**
 * Phone variant of the "Turn DMs into revenue" timeline (Figma 544:19959): the steps as a stack of cards, with the
 * next one peeking out 12px above the front card. While the stack is on screen, the front card drops away every
 * couple of seconds and the one behind moves forward. Every card sits in the same grid cell, so the stack is as tall
 * as its tallest card and the copy underneath never moves.
 */
export function TimelineStack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const [front, setFront] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setFront((f) => (f + 1) % STEPS.length), HOLD_MS);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <div ref={ref} className="relative grid w-full">
      <div aria-hidden className={`absolute inset-x-2.5 -top-3 h-12 rounded-3xl bg-white ${shadow}`} />
      {STEPS.map((s, i) => {
        const offset = (i - front + STEPS.length) % STEPS.length;
        const position = offset === 0 ? "front" : offset === STEPS.length - 1 ? "gone" : "behind";
        return (
          <motion.div
            key={s.name}
            aria-hidden={position !== "front"}
            variants={POSITIONS}
            initial={false}
            animate={position}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="origin-top self-start [grid-area:1/1]"
          >
            <StepCard step={s} />
          </motion.div>
        );
      })}
    </div>
  );
}
