"use client";

import { motion } from "motion/react";

/** Glowing green status dot; `pulse` fades it in and out like the "Scanning" indicator on the live site. */
export function LiveDot({ color = "#44d358", pulse = false }: { color?: string; pulse?: boolean }) {
  return (
    <motion.span
      aria-hidden
      className="block size-1 shrink-0 rounded-full"
      style={{ backgroundColor: color, boxShadow: "0 0 8px 2px rgba(117,215,132,0.6)" }}
      animate={pulse ? { opacity: [0.07, 1, 0.07] } : undefined}
      transition={pulse ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" } : undefined}
    />
  );
}
