"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { FeatureCardData } from "@/components/pages/vsl/data";
import { InfoIcon, MinusIcon18, PlusIcon18 } from "@/components/pages/vsl/icons";
import { INTER_ALT } from "@/components/pages/vsl/styles";

/** Framer layout spring of the card (stiffness 600, damping 50). */
const SPRING = {
  type: "spring" as const,
  stiffness: 600,
  damping: 50,
  mass: 1,
};

/**
 * Framer "Card Features" (Desktop/Close <-> Desktop/Open), the Benefits grid card: a white 24px-radius top panel
 * (32px padding, 0.5px #e0e0e0 ring + 1px shadow) with the title (Inter 600 24/36, 20/30 tablet, 18/27 phone,
 * -0.03em), a two-line-clamped description (Inter 16/23.2, 14/20.3 phone, rgba(82,82,82,0.8)) and the purple ROI line.
 * Closed (the default) shows a minus icon; hovering fades the title and icon to 50%. Clicking opens the lavender
 * "More Details" panel under it (purple dots, Inter 14/21 rgba(0,0,0,0.8)), unclamps the description and swaps the
 * icon to a plus; clicking again closes it.
 */
export function FeatureCard({ title, body, info, details }: FeatureCardData) {
  const [open, setOpen] = useState(false);
  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={open}
      onClick={() => setOpen((o) => !o)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen((o) => !o);
        }
      }}
      className="group flex w-full cursor-pointer flex-col items-start self-start rounded-[24px] bg-[#faf5ff]"
    >
      <div className="relative flex w-full flex-col items-start gap-4 overflow-hidden rounded-[24px] bg-white p-8 shadow-[0_0_0_0.5px_#e0e0e0,0_1px_2px_0_rgba(0,0,0,0.05)]">
        <div className="flex w-full items-start gap-5">
          <div className="flex w-px flex-1 flex-col items-start gap-2.5">
            <p
              className={`w-full text-[18px] leading-[27px] font-semibold tracking-[-0.54px] whitespace-pre-wrap text-black transition-opacity duration-200 md:text-[20px] md:leading-[30px] md:tracking-[-0.6px] lg:text-[24px] lg:leading-[36px] lg:tracking-[-0.72px] ${open ? "" : "group-hover:opacity-50"} ${INTER_ALT}`}
            >
              {title}
            </p>
            <p
              className={`w-full text-[14px] leading-[20.3px] font-normal tracking-[-0.14px] text-[rgba(82,82,82,0.8)] md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px] ${open ? "whitespace-pre-wrap" : "line-clamp-2 whitespace-pre-line"} ${INTER_ALT}`}
            >
              {body}
            </p>
          </div>
          <div className="flex w-min flex-col items-center justify-center pt-1.5">
            {open ? <PlusIcon18 /> : <MinusIcon18 className="size-[18px] transition-opacity duration-200 group-hover:opacity-50" />}
          </div>
        </div>
        <div className="flex w-full items-center gap-1">
          <InfoIcon />
          <p className="w-px flex-1 text-[14px] leading-[21px] font-normal whitespace-pre-wrap text-[#a855f7]">{info}</p>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={SPRING}
            className="w-full overflow-hidden"
          >
            <div className="flex w-full flex-col items-start gap-6 p-8">
              <p className="text-[18px] leading-[21.6px] font-medium tracking-[-0.72px] whitespace-pre text-[#a855f7]">More Details</p>
              <ul className="flex w-full flex-col items-start gap-4">
                {details.map((d, i) => (
                  <li key={i} className="flex w-full items-start gap-2">
                    <span className="flex w-min items-center pt-1.5">
                      <span className="size-1.5 rounded-[10px] bg-[#a855f7]" />
                    </span>
                    <span className="w-px flex-1 text-[14px] leading-[21px] font-normal whitespace-pre-wrap text-[rgba(0,0,0,0.8)]">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
