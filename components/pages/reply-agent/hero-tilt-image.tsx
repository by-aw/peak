"use client";

import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

/**
 * Reply Agent hero dashboard screenshot (Framer "Image Wrapper"): fades/slides in on load and sits tilted
 * back (perspective 1200px, rotateX 24deg) at the top of the page; the tilt flattens as the page scrolls
 * (scrollY 0 -> 400px maps 24deg -> 0deg, smoothed with a spring like Framer's scroll transform).
 */
export function HeroTiltImage() {
  const { scrollY } = useScroll();
  const target = useTransform(scrollY, [0, 400], [24, 0]);
  const rotateX = useSpring(target, { stiffness: 150, damping: 30, mass: 1 });
  return (
    <motion.div
      className="relative w-full overflow-hidden aspect-[1.97628/1]"
      style={{ rotateX, transformPerspective: 1200, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0.001, y: 48 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 150, damping: 30, mass: 1, delay: 0.3 }}
    >
      <Image
        src="/framer/YEeAgEmqlxMst7oLA6SG1QBN8.png"
        alt=""
        width={2158}
        height={1089}
        preload
        sizes="(min-width: 1200px) 1200px, 100vw"
        className="pointer-events-none absolute inset-0 h-full! w-full object-cover"
      />
    </motion.div>
  );
}
