"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

/**
 * Phone-layout iPhone inside the wallpaper mockup of the Download page. Framer drives its translateY with
 * scroll: ~90px while the mockup is still below the viewport, easing to 0 by the time it reaches the top
 * (spring-smoothed, like Framer's scroll transforms). Tablet/desktop have no such effect.
 */
export function PhoneParallax({ className = "", children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.12"] });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [90, 0]), { stiffness: 150, damping: 30, mass: 1 });
  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
