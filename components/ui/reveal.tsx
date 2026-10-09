"use client";

import { motion, type HTMLMotionProps } from "motion/react";

type RevealProps = HTMLMotionProps<"div"> & {
  /** Vertical offset in px the element travels from (Framer used 32-48). */
  y?: number;
  /** Delay in seconds before the spring starts (Framer used 0.2-0.35). */
  delay?: number;
};

/**
 * Framer "appear" effect: fade + slide up with a spring once in view.
 * Matches the published site's animator config:
 * initial {opacity: 0.001, y} -> animate {opacity: 1, y: 0}, spring stiffness 150 / damping 30 / mass 1.
 */
export function Reveal({ y = 48, delay = 0.2, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0.001, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 150, damping: 30, mass: 1, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
