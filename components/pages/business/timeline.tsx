"use client";

import { motion, useInView, type Transition, type Variants } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { StepCard, TimelineStep, type Step } from "@/components/home/revenue-step-cards";

/*
 * The home page's two timeline renderings (components/home/features/timeline.tsx and timeline-stack.tsx), taking
 * the steps as a prop so /business can show its own copy. Timing and layout are unchanged.
 */

/** Live site: the timeline scrolls upward at ~30.6px/s. */
const SPEED_PX_PER_S = 30.6;

/**
 * Tablet/desktop timeline: the steps looping upward, fading out at the top and bottom. The list holds three copies
 * (8px apart, as padding so all three are the same height) and moves up by exactly one copy. `className` sizes the box.
 */
export function Timeline({ steps, className = "" }: { steps: Step[]; className?: string }) {
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
            {steps.map((s) => (
              <TimelineStep key={s.name} step={s} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** How long each step stays at the front of the stack. */
const HOLD_MS = 2200;

const shadow = "shadow-[0_12px_24px_0_rgba(0,0,0,0.05),0_0_0_0.5px_#e0e0e0]";

const TRANSITION: Transition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] };

/** Front card, the ones waiting behind it (hidden, 12px up and 5% narrower) and the one dropping away. */
const POSITIONS: Variants = {
  front: { y: 0, scale: 1, opacity: 1, zIndex: 2 },
  behind: { y: -12, scale: 0.95, opacity: 0, zIndex: 1 },
  gone: { y: 20, scale: 1, opacity: 0, zIndex: 3 },
};

/**
 * Phone timeline: the steps as a stack of cards with the next one peeking out 12px above the front card. While the
 * stack is on screen the front card drops away every 2.2s. All cards share one grid cell, so the stack is as tall as
 * its tallest card and the copy underneath never moves.
 */
export function TimelineStack({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const inView = useInView(ref, { amount: 0.5 });
  const [front, setFront] = useState(0);
  const [frontHeight, setFrontHeight] = useState<number>();

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setFront((f) => (f + 1) % steps.length), HOLD_MS);
    return () => clearInterval(id);
  }, [inView, steps.length]);

  useEffect(() => {
    const el = cards.current[front];
    if (!el) return;
    const observer = new ResizeObserver(() => setFrontHeight(el.offsetHeight));
    observer.observe(el);
    return () => observer.disconnect();
  }, [front]);

  return (
    <div ref={ref} className="relative grid w-full">
      {frontHeight === undefined ? null : (
        // 48px tall with its top 12px above the front card's, so the rest hides behind it.
        <motion.div
          aria-hidden
          initial={false}
          animate={{ y: 36 - frontHeight }}
          transition={TRANSITION}
          className={`absolute inset-x-2.5 bottom-0 h-12 rounded-3xl bg-white ${shadow}`}
        />
      )}
      {steps.map((s, i) => {
        const offset = (i - front + steps.length) % steps.length;
        const position = offset === 0 ? "front" : offset === steps.length - 1 ? "gone" : "behind";
        return (
          <motion.div
            key={s.name}
            ref={(el) => {
              cards.current[i] = el;
            }}
            aria-hidden={position !== "front"}
            variants={POSITIONS}
            initial={false}
            animate={position}
            transition={TRANSITION}
            className="origin-top self-end [grid-area:1/1]"
          >
            <StepCard step={s} />
          </motion.div>
        );
      })}
    </div>
  );
}
