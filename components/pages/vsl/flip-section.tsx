"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { CostCalculator } from "@/components/pages/vsl/cost-calculator";
import { RoiCalculator } from "@/components/pages/vsl/roi-calculator";

/** Framer "onScrollTarget" smoothing spring of the flip (stiffness 150, damping 30, mass 1.2). */
const FLIP_SPRING = { stiffness: 150, damping: 30, mass: 1.2, restDelta: 0.001 };

/**
 * Framer "Flip Container" of /vsl, /vsl-2 and /thank-you-pdf: a 250vh scroll track whose 100vh "Coin Wrapper" sticks to
 * the top of the screen and holds two back-to-back faces in a 2000px perspective: the dark "Cost Calculator" and the
 * white "ROI Calculator" behind it (both `backface-visibility: hidden`).
 *
 * The flip is scroll-scrubbed like Framer's "Scroll Target" transform: while the 65vh "Target Area" (placed right under
 * the sticky wrapper) travels from the middle of the screen up by its own height, the front turns rotateX 0 -> -180deg
 * and fades 1 -> 0 and the back turns 180 -> 0deg and fades in; the progress follows the scroll through a spring.
 * The front's texts appear once the container's top passes the middle of the screen and hide again above it.
 */
export function FlipSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start center", "end center"] });
  const progress = useSpring(scrollYProgress, FLIP_SPRING);
  const frontRotate = useTransform(progress, [0, 1], [0, -180]);
  const frontOpacity = useTransform(progress, [0, 1], [1, 0]);
  const backRotate = useTransform(progress, [0, 1], [180, 0]);

  // "animate" once the flip container's top is above the middle of the screen (Framer threshold 0.5).
  const { scrollYProgress: entered } = useScroll({ target: containerRef, offset: ["start center", "start start"] });
  const [shown, setShown] = useState(false);
  useMotionValueEvent(entered, "change", (v) => setShown(v > 0));

  return (
    <div ref={containerRef} className="relative flex h-[250vh] w-full flex-col items-center">
      <div className="sticky top-0 z-[1] flex h-screen w-full flex-col items-center [transform:perspective(2000px)] [transform-style:preserve-3d]">
        <motion.section
          aria-label="The cost of doing nothing"
          style={{ rotateX: frontRotate, opacity: frontOpacity }}
          className="absolute top-0 left-0 z-[3] flex h-screen w-full flex-col items-center justify-center overflow-clip bg-[linear-gradient(113deg,#410e0e_0%,#0a0a0a_100%)] [backface-visibility:hidden]"
        >
          <CostCalculator shown={shown} />
        </motion.section>
        <motion.section
          aria-label="A 5% improvement in booking rate"
          style={{ rotateX: backRotate, opacity: progress }}
          className="relative z-[2] flex h-screen w-full flex-row items-center justify-center overflow-clip bg-white [backface-visibility:hidden]"
        >
          <RoiCalculator />
        </motion.section>
      </div>
      <div aria-hidden className="h-px w-full shrink-0" />
      <div ref={targetRef} aria-hidden className="h-[65vh] w-full shrink-0" />
      <div aria-hidden className="h-px w-full shrink-0" />
      <div aria-hidden className="h-[65vh] w-full shrink-0" />
    </div>
  );
}
