"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Clouds } from "@/components/pages/vsl/clouds";
import { InViewCounter } from "@/components/pages/vsl/counters";
import { ArrowRightIcon } from "@/components/pages/vsl/icons";
import { INTER_ALT, leadText, sectionHeadingText, smallLabelText } from "@/components/pages/vsl/styles";

const card = "flex w-min flex-col items-center gap-5 overflow-hidden rounded-[24px] px-12 py-8";
const cardTitle = `text-[14px] leading-[20.3px] font-normal tracking-[-0.14px] whitespace-pre text-ink-3 md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px] ${INTER_ALT}`;
/** Mascot stickers: 197px squares, 12px radius, 3px white border on top, dark 12px shadow; pop in (scale 0.6, spring bounce 0.2, 0.4s). */
const sticker =
  "absolute z-[1] hidden aspect-square w-[197px] overflow-hidden rounded-[12px] shadow-[0_1px_12px_#00000040] after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border-[3px] after:border-white md:block";
const stickerAppear = {
  initial: { opacity: 0, scale: 0.6 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { type: "spring" as const, bounce: 0.2, duration: 0.4 },
};

/**
 * Framer "ROI Calculator" (back face of the /vsl flip card): a white 100vh card with clouds at the top and bottom
 * (254px bands), "A 5% improvement in booking rate. That's it", its lead line (518px max) and the
 * "Without Mochi $110,000 / 8% booking rate" -> "With Mochi $178,750 / 13% booking rate" cards (40px apart, stacked
 * 24px apart with the arrow turned down on phone). The With Mochi number counts up from $0 (spring, 0.5s) the first
 * time it scrolls into view. Two tilted mascot stickers hang off the 1000px content column from tablet up.
 *
 * Content padding 80/0/160 with 80px gaps on desktop, 80/0 with 48px gaps on tablet, 48/20/64 with 40px gaps on phone.
 */
export function RoiCalculator() {
  return (
    <div className="relative flex h-full w-px flex-1 flex-col items-center justify-center overflow-clip">
      <div className="relative z-[1] flex w-full max-w-[1000px] flex-col items-center gap-10 px-5 pt-12 pb-16 md:gap-12 md:px-0 md:py-20 lg:gap-20 lg:pb-40">
        <div className="flex w-full max-w-[578px] flex-col items-center gap-4">
          <h2 className={`w-full text-black ${sectionHeadingText}`}>A 5% improvement in booking rate. That&apos;s it</h2>
          <p className={`w-full max-w-[518px] text-center text-ink-3 ${leadText}`}>
            Same traffic. Same offer. Same closers. The only thing that changes is what happens inside your DMs.
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-6 md:w-min md:flex-row md:gap-10">
          <div className={`${card} bg-[#fafafa]`}>
            <p className={cardTitle}>Without Mochi</p>
            <div className="flex w-min flex-col items-center gap-2">
              <h2 className={`whitespace-pre text-ink-3 ${sectionHeadingText}`}>$110,000</h2>
              <p className={`whitespace-pre ${smallLabelText}`}>8% booking rate</p>
            </div>
          </div>
          <ArrowRightIcon className="size-6 shrink-0 rotate-90 md:rotate-0" />
          <div className={`${card} bg-[linear-gradient(#f1d2ff_0%,#cee7ff_100%)]`}>
            <p className={cardTitle}>With Mochi</p>
            <div className="flex w-min flex-col items-center gap-2">
              <InViewCounter
                start={0}
                end={178750}
                duration={0.5}
                prefix="$"
                className="font-display text-[32px] leading-[1.2] font-semibold whitespace-pre text-black [font-feature-settings:'zero','tnum'] md:text-[48px] lg:leading-none"
              />
              <p className={`whitespace-pre ${smallLabelText}`}>13% booking rate</p>
            </div>
          </div>
        </div>
        <motion.div {...stickerAppear} className={`${sticker} bottom-[-37px] left-[-88px] rotate-[-7deg] lg:bottom-[88px]`}>
          <Image src="/framer/k6F4p3NtQMfZvj8H4m7EJy7sTA.jpg" alt="" fill sizes="197px" className="object-cover" />
        </motion.div>
        <motion.div {...stickerAppear} className={`${sticker} top-[-49px] right-[-116px] rotate-[7deg] lg:top-[52px]`}>
          <Image src="/framer/I7EFAkKxv3zhHfD88RVtBnZ2ikg.png" alt="" fill sizes="197px" className="object-cover" />
        </motion.div>
      </div>
      <Clouds position="bottom" className="h-[254px]" />
      <Clouds position="top" className="h-[254px]" />
    </div>
  );
}
