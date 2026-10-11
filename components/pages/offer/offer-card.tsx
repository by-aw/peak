"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "motion/react";

type Props = {
  src: string;
  /** Tailwind aspect class of the mask group (Framer: 1.71521 / 1.71197, close to but not the PNG's own ratio). */
  aspect: string;
  title: string;
  body: string;
  /** Hover tilt of the picture in degrees (Framer alternates +0.5 / -0.5 down the grid). */
  skew: 0.5 | -0.5;
  /** Appear delay (seconds) on tablet/desktop, where the right-hand column enters 0.1s after the left one. */
  delay?: number;
};

/**
 * Framer "feature-card-1": #fafafa card, 24px radius, min-height 497px (465px on phone), content centred with 10px
 * between the picture and the text block. The picture ("Mask group", object-fit contain) rises 100px with a spring
 * (bounce 0.1, 1s) once any of it is in view, and on hover scales to 1.03 and tilts skewY +/-0.5 (spring bounce
 * 0.25, 0.45s). The text block is 32px padded, heading 20/28 Inter 600 (-0.8px) over a 16/24 paragraph, 12px apart.
 */
export function OfferCard({ src, aspect, title, body, skew, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0 });
  const wide = typeof window !== "undefined" && window.matchMedia("(min-width: 810px)").matches;

  return (
    <div className="relative flex min-h-[465px] w-full flex-col items-center justify-center gap-2.5 self-start overflow-hidden rounded-[24px] bg-gray-25 md:min-h-[497px]">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 100 }}
        animate={inView ? { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.1, duration: 1, delay: wide ? delay : 0 } } : undefined}
        whileHover={{ opacity: 1, scale: 1.03, skewY: skew, transition: { type: "spring", bounce: 0.25, duration: 0.45 } }}
        className={`relative w-full ${aspect}`}
      >
        <Image src={src} alt="" fill sizes="(min-width: 810px) 497px, 358px" className="object-contain" />
      </motion.div>
      <div className="flex w-full flex-col items-start gap-3 p-8">
        <h4 className="w-full text-[20px] leading-7 font-semibold tracking-[-0.8px] whitespace-pre-wrap text-ink-3 [font-feature-settings:'blwf','cv03','cv04','cv09','cv11']">
          {title}
        </h4>
        <p className="w-full text-[16px] leading-6 font-normal whitespace-pre-wrap text-gray-750 [font-feature-settings:'blwf','cv03','cv04','cv09','cv11']">
          {body}
        </p>
      </div>
    </div>
  );
}
