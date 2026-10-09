"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const spring = { type: "spring", stiffness: 150, damping: 30, mass: 1 } as const;

/**
 * "Mochi Hero Left/Right": the mochi-on-a-cloud illustrations beside the hero video.
 * On the live site they are hidden at the top of the page and pop in (opacity 0.6→1 scale, y 24→0)
 * once the page has been scrolled about a quarter viewport, reversing when scrolling back up.
 * Positioned relative to the hero "Bottom Stack" (896px wide); hidden on phone.
 */
export function HeroClouds() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY >= window.innerHeight * 0.25);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const anim = shown ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.6, y: 24 };

  return (
    <>
      <motion.div
        aria-hidden
        initial={false}
        animate={anim}
        transition={spring}
        className="pointer-events-none absolute top-[-182px] left-[-173px] z-[1] hidden aspect-[1.42424/1] w-[250px] md:block lg:top-[-198px] lg:left-[-180px] lg:w-[282px]"
      >
        <Image src="/framer/NpvagSRT9dgJkG9s0nbOzKeywg.png" alt="" width={1248} height={832} sizes="282px" className="h-full w-full object-cover" />
      </motion.div>
      <motion.div
        aria-hidden
        initial={false}
        animate={anim}
        transition={spring}
        className="pointer-events-none absolute top-[-182px] left-[827px] z-[1] hidden aspect-[1.42424/1] w-[327px] md:block lg:top-[-198px] lg:left-[782px] lg:w-[396px]"
      >
        <Image src="/framer/QpXF2llpzQjzZEwxxbDuVTWKSA.png" alt="" width={1448} height={1086} sizes="396px" className="h-full w-full object-cover" />
      </motion.div>
    </>
  );
}
