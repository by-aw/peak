"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { fireConfetti } from "@/components/pages/vsl/confetti";

/** Framer variant transition of "PDF Animation": spring, bounce 0.2, 1.1s. */
const SPRING = { type: "spring" as const, bounce: 0.2, duration: 1.1 };
/** Delays (ms after mount) at which the component steps to its variants 2..6 (Framer: 200, 600, 600, 600, 200ms apart). */
const STEP_TIMES = [200, 800, 1400, 2000, 2200];

/** Folder front/back: grow from 20% to 80%, overshoot to 100% (tilted 1deg), settle at 90%. */
const FOLDER = [
  { rotate: 0, scale: 0.2 },
  { rotate: 0, scale: 0.8 },
  { rotate: 1, scale: 1 },
  { rotate: 1, scale: 0.9 },
  { rotate: 1, scale: 0.9 },
  { rotate: 1, scale: 0.9 },
];

type BookState = { left: number; top: number; opacity: number; rotate: number; scale: number; zIndex: number };
/**
 * The three PDF covers (90px wide) per step, as top/left in the 310x420 box (Framer anchors them with
 * top/right/bottom per variant): they fly in from the top right, fade in above the folder and drop into it.
 */
const BOOKS: { src: string; aspect: string; states: BookState[] }[] = [
  {
    src: "/framer/ZqAicD08eLA7jYKtxjojWKcZwk.png",
    aspect: "aspect-[0.7066189624329159]",
    states: [
      { left: 370, top: -118, opacity: 0, rotate: 30, scale: 1, zIndex: 0 },
      { left: 336, top: -45.367, opacity: 0, rotate: 30, scale: 1, zIndex: 0 },
      { left: 149, top: 52.633, opacity: 1, rotate: 30, scale: 1, zIndex: 1 },
      { left: 106, top: 138.633, opacity: 1, rotate: 30, scale: 1, zIndex: 1 },
      { left: 106, top: 137.633, opacity: 1, rotate: 30, scale: 0.9, zIndex: 1 },
      { left: 106, top: 137.633, opacity: 1, rotate: 30, scale: 0.9, zIndex: 1 },
    ],
  },
  {
    src: "/framer/fn73DabVl3aY5hi8vFEmlT3sjVo.png",
    aspect: "aspect-[0.7086614173228346]",
    states: [
      { left: 452, top: -247, opacity: 0, rotate: 45, scale: 1, zIndex: 0 },
      { left: 332, top: -147, opacity: 0, rotate: 45, scale: 1, zIndex: 0 },
      { left: 217, top: -56, opacity: 1, rotate: 49, scale: 1, zIndex: 0 },
      { left: 133, top: 132, opacity: 1, rotate: 29, scale: 0.8, zIndex: 0 },
      { left: 133, top: 121, opacity: 1, rotate: 29, scale: 0.7, zIndex: 0 },
      { left: 133, top: 121, opacity: 1, rotate: 29, scale: 0.7, zIndex: 0 },
    ],
  },
  {
    src: "/framer/yfmmCnjVAHFl9CQVOpQT9Z9kkQ.png",
    aspect: "aspect-[0.7066189624329159]",
    states: [
      { left: 588, top: -314, opacity: 0, rotate: 48, scale: 1, zIndex: 0 },
      { left: 482, top: -223, opacity: 0, rotate: 48, scale: 1, zIndex: 0 },
      { left: 302, top: -74.367, opacity: 1, rotate: 57, scale: 1, zIndex: -1 },
      { left: 121, top: 121.633, opacity: 1, rotate: 51, scale: 0.7, zIndex: 0 },
      { left: 121, top: 118.633, opacity: 1, rotate: 51, scale: 0.8, zIndex: 0 },
      { left: 121, top: 118.633, opacity: 1, rotate: 51, scale: 0.8, zIndex: 0 },
    ],
  },
];

/**
 * Framer "PDF Animation" (/thank-you-pdf hero): a 310x420 box where a blue folder grows in, three PDF covers fly in
 * from the top right and drop into it, then a confetti burst (Framer "Confetti": 60 particles, 360deg, velocity 15)
 * fires from the middle of a 400x200 box at the top. Six variants stepped by timers on mount
 * (200 / 600 / 600 / 600 / 200ms), each change animated with a spring (bounce 0.2, 1.1s).
 */
export function PdfAnimation() {
  const [step, setStep] = useState(0);
  const confettiRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const timers = STEP_TIMES.map((t, i) => window.setTimeout(() => setStep(i + 1), t));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);
  useEffect(() => {
    if (step !== 5 || !confettiRef.current) return;
    const r = confettiRef.current.getBoundingClientRect();
    fireConfetti({
      particleCount: 60,
      spread: 360,
      startVelocity: 15,
      decay: 0.95,
      origin: { x: (r.left + r.width / 2) / window.innerWidth, y: (r.top + r.height / 2) / window.innerHeight },
    });
  }, [step]);

  return (
    <div className="relative aspect-[0.738095] w-[310px] shrink-0 overflow-visible">
      <motion.div
        initial={false}
        animate={FOLDER[step]}
        transition={SPRING}
        className="absolute top-[53%] left-1/2 z-[2] aspect-[1.4330708661417322] w-[182px] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="absolute top-0 left-0 h-[127px] w-[182px] overflow-hidden rounded-[13.95px] shadow-[inset_0_-6.2px_128px_0_rgba(11,112,167,0.3),inset_0_1.16px_6px_0_rgba(255,255,255,0.2)]">
          <Image src="/framer/0CfqiDwW35zXGtqVV27ZYjCgThw.png" alt="" fill sizes="182px" className="object-fill" />
        </div>
        <div className="absolute top-[101px] left-0 h-[11px] w-[182px]">
          <div className="absolute top-0 left-0 h-[3px] w-[182px] bg-[rgba(255,255,255,0.1)] shadow-[0_1.16px_6px_0_rgba(0,132,205,0.1),inset_0_-1.16px_6px_0_rgba(0,132,205,0.1)]" />
          <div className="absolute top-[7px] left-0 h-[3px] w-[182px] bg-[rgba(255,255,255,0.1)] shadow-[0_1.16px_6px_0_rgba(0,132,205,0.1),inset_0_-1.16px_6px_0_rgba(0,132,205,0.1)]" />
        </div>
      </motion.div>
      <motion.div
        initial={false}
        animate={FOLDER[step]}
        transition={SPRING}
        className="absolute top-[51%] left-1/2 aspect-[1.123456790123457] w-[182px] -translate-x-1/2 -translate-y-1/2 opacity-89 drop-shadow-[0_-8px_11px_rgba(0,0,0,0.12)]"
      >
        <Image src="/framer/P1Ybvxk45PlCsp9tm0n7z9O8.png" alt="" fill sizes="182px" className="object-contain" />
      </motion.div>
      {BOOKS.map((b) => {
        const { zIndex, ...target } = b.states[step];
        return (
          <motion.div
            key={b.src}
            initial={false}
            animate={target}
            transition={SPRING}
            style={{ zIndex }}
            className={`absolute w-[90px] overflow-hidden rounded-[8px] ${b.aspect}`}
          >
            <Image src={b.src} alt="" fill sizes="90px" className="object-cover" />
          </motion.div>
        );
      })}
      <div ref={confettiRef} aria-hidden className="pointer-events-none absolute top-0 right-[-45px] left-[-45px] h-[200px] rotate-1" />
    </div>
  );
}
