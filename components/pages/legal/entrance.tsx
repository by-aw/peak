"use client";

import { motion } from "motion/react";

/**
 * Framer "appear" effect on the page's content container: fades in from opacity 0 and 32px below on load
 * (spring 150 / 30 / mass 1, no delay); like Framer it keeps `will-change: transform`, which puts the document on its own
 * layer and so snaps text to the pixel grid the same way as the live page. Not `Reveal`: that waits for 20% of the element to be in view, which a
 * 20,000px-tall legal document never is.
 */
export function Entrance({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <motion.div
      className={className}
      style={{ willChange: "transform" }}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 150, damping: 30, mass: 1 }}
    >
      {children}
    </motion.div>
  );
}
