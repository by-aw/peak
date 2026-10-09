"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Measured on the live site: the step row translates from 0 to -1725px (desktop ≥1200) /
 * -2112px (tablet) while the 400px "Scroller" spacer enters the viewport (its top crossing the
 * viewport bottom → its bottom reaching the viewport bottom), with ~150ms first-order smoothing.
 */
const END_DESKTOP = 1725;
const END_TABLET = 2112;

/**
 * Sticky block (steps row + heading content) followed by the scroll spacer that drives the
 * horizontal movement of the steps. `children` = the step columns, `content` = heading + paragraph.
 */
export function RevenueStepsTrack({ children, content }: { children: ReactNode; content: ReactNode }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [end, setEnd] = useState(END_DESKTOP);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1200px)");
    const update = () => setEnd(mq.matches ? END_DESKTOP : END_TABLET);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({ target: scrollerRef, offset: ["start end", "end end"] });
  const x = useTransform(scrollYProgress, (p) => -p * end);
  const smoothX = useSpring(x, { stiffness: 150, damping: 26, mass: 1 });

  return (
    <>
      <div className="sticky top-0 z-[1] flex w-full flex-col items-center pt-20">
        <div className="flex w-full flex-col py-16">
          <motion.div style={{ x: smoothX }} className="flex w-fit gap-4 bg-white will-change-transform">
            {children}
          </motion.div>
        </div>
        {content}
      </div>
      <div ref={scrollerRef} aria-hidden className="h-[400px] w-full" />
    </>
  );
}
