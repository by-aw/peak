"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/**
 * The three logo strips ("Top" / "Bottom" / "Third") of the "Volume Without Admin" card. On the live site
 * they are Framer scroll transforms: as the card travels up the viewport the strips slide sideways
 * (0 -> +80px, 0 -> -178px, 0 -> -56px between ~32% and ~80% of the card's journey through the viewport).
 * Left offsets per breakpoint: 22/58/114 phone, 4/14/154 tablet, 40/50/190 desktop.
 */
export function LogoStrips() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const range = [0.32, 0.55, 0.8];
  const top = useTransform(scrollYProgress, range, [0, 48, 80]);
  const bottom = useTransform(scrollYProgress, range, [0, -107, -178]);
  const third = useTransform(scrollYProgress, range, [0, -34, -56]);
  return (
    <div ref={ref} className="absolute inset-0">
      <motion.div style={{ x: top }} className="pointer-events-none absolute top-[50px] left-[22px] h-[76px] w-[490px] md:left-1 lg:left-10">
        <Image src="/framer/y5qkkWrH7zmWQ34waRrQg37c5Mw.png" alt="" width={1960} height={304} sizes="490px" className="h-full w-full object-contain" />
      </motion.div>
      <motion.div style={{ x: bottom }} className="absolute top-[130px] left-[58px] h-[74px] w-[492px] md:left-3.5 lg:left-[50px]">
        <Image src="/framer/fxzJ919asUgIO25xuu2nBeTnWX8.png" alt="" width={1968} height={296} sizes="492px" className="h-full w-full object-contain" />
      </motion.div>
      <motion.div style={{ x: third }} className="absolute top-[208px] left-[114px] h-[76px] w-[490px] md:left-[154px] lg:left-[190px]">
        <Image src="/framer/8X8o7F4BQlBlTi4GPyC7fFn1eg.png" alt="" width={1960} height={304} sizes="490px" className="h-full w-full object-contain" />
      </motion.div>
    </div>
  );
}
