"use client";

import Image from "next/image";
import { motion } from "motion/react";

/**
 * Framer "Mochi mascot" (money bag) at the bottom-right corner of the hero container: 114x84, tilted 2deg,
 * 66px past the right edge and 50px below the bottom. Tablet/desktop only; fades and slides up (y 48, spring 150/30,
 * 0.25s delay) while straightening from 0 to 2deg.
 */
export function HeroMascot() {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0.001, y: 48, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: 2 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 150, damping: 30, mass: 1, delay: 0.25 }}
      className="pointer-events-none absolute -right-[66px] -bottom-[50px] z-[6] hidden h-[84px] w-[114px] md:block"
    >
      <Image src="/framer/9IvVd7hYrirXFxGgTC9U7clLEf0.png" alt="" fill sizes="114px" className="object-cover" />
    </motion.div>
  );
}
