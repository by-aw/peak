"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { line } from "@/components/shared/attribution/grid";
import {
  AtSymbolMicroIcon,
  CalendarMicroIcon,
  ChevronUpMicroIcon,
  ClockMiniIcon,
  FollowupTimelineIcon,
  PhotoMicroIcon,
  VerticalDividerIcon,
} from "@/components/icons/attribution-followup-icons";

const TABS = ["Without Mochi", "With Mochi"] as const;

const spring = { type: "spring", stiffness: 320, damping: 34 } as const;

/** The white "Follow up with..." automation card that appears over the "With Mochi" dashboard (tablet/desktop). */
function FollowUpCard() {
  return (
    <motion.div
      className="absolute right-4 bottom-4 z-[2] hidden w-[329px] overflow-hidden rounded-[14px] bg-white shadow-[0_2px_20px_0_rgba(0,0,0,0.12)] after:pointer-events-none after:absolute after:inset-0 after:rounded-[14px] after:border after:border-gray-150 md:block"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.3, delay: 0.15 }}
    >
      <div className="flex items-center gap-3 p-4">
        <div className="h-[205px] w-5 shrink-0">
          <FollowupTimelineIcon />
        </div>
        <div className="flex flex-1 flex-col items-start gap-2.5">
          <div className="flex items-center py-[3px]">
            <p className="text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] text-black">Follow up with...</p>
          </div>
          <div className="flex w-full flex-col items-start pb-4">
            <div className="flex w-full items-center rounded-[12px_12px_6px_12px] bg-gray-50 px-3 py-3.5">
              <p className="text-[14px] leading-[24px] font-normal tracking-[-0.2px] whitespace-pre-wrap text-black">Just checking back in - if you have any more questions feel free to ask!</p>
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-2.5">
            <div className="relative flex w-full items-center gap-2 overflow-hidden rounded-[16px] bg-white p-2 after:pointer-events-none after:absolute after:inset-0 after:rounded-[16px] after:border after:border-[#e0e0e0]">
              <div className="flex items-center">
                <div className="flex size-7 items-center rounded-[8px] p-1.5">
                  <div className="relative size-4">
                    <AtSymbolMicroIcon className="absolute inset-px" />
                  </div>
                </div>
                <div className="flex size-7 items-center rounded-[8px] bg-white p-1.5">
                  <div className="relative size-4 overflow-hidden">
                    <PhotoMicroIcon className="absolute inset-0.5" />
                  </div>
                </div>
                <div className="flex size-7 items-center rounded-[8px] bg-white p-1.5">
                  <div className="relative size-4 overflow-hidden">
                    <CalendarMicroIcon className="absolute inset-x-0.5 top-px bottom-0.5" />
                  </div>
                </div>
              </div>
              <div className="h-4 w-2.5 shrink-0">
                <VerticalDividerIcon />
              </div>
              <p className="text-[14px] leading-[14px] font-normal tracking-[-0.2px] whitespace-pre-wrap text-gray-400">Write a message...</p>
            </div>
            <div className="flex items-center gap-px overflow-hidden rounded-[8px] bg-white shadow-[0_0_0_0.5px_#e0e0e0,0_1px_2px_0_rgba(0,0,0,0.05)]">
              <div className="flex items-center gap-0.5 overflow-hidden rounded-l-[8px] bg-white px-2.5 py-2 shadow-[0_0_0_0.5px_#e0e0e0,0_1px_2px_0_rgba(0,0,0,0.05)]">
                <div className="relative size-4 overflow-hidden">
                  <ClockMiniIcon className="absolute top-0.5 right-px bottom-px left-0.5" />
                </div>
                <p className="px-0.5 text-[14px] leading-[14px] font-medium tracking-[-0.4px] whitespace-pre text-black">Delay</p>
              </div>
              <div className="flex items-center overflow-hidden rounded-r-[8px] bg-white px-2.5 py-2">
                <p className="px-0.5 text-[14px] leading-[14px] font-medium tracking-[-0.4px] whitespace-pre text-gray-500">3</p>
                <div className="flex items-center gap-0.5">
                  <p className="px-0.5 text-[14px] leading-[14px] font-medium tracking-[-0.4px] whitespace-pre text-black">hours</p>
                  <div className="size-4">
                    <ChevronUpMicroIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Framer "Desktop/Without" <-> "Desktop/With" switcher ("25% of your links never get clicked"): two
 * 88px tabs (56px on phones) whose grey highlight + 2px black underline slides to the picked side, the
 * funnel dashboard screenshot and (tablet/desktop) the follow-up automation card on the "With" state.
 */
export function WithoutWithMochi() {
  const [active, setActive] = useState(0);
  return (
    <div className="flex w-full flex-col items-start">
      <div className={`${line("after:border-b")} flex w-full items-center`}>
        <div aria-hidden className={`${line("after:border-r")} absolute inset-0 z-[1]`}>
          <motion.div className="absolute inset-y-0 left-0 flex w-1/2 flex-col justify-end bg-gray-25" animate={{ x: active ? "100%" : "0%" }} transition={spring}>
            <div className="h-0.5 w-full bg-black" />
          </motion.div>
        </div>
        {TABS.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setActive(i)}
            className={`${i === 0 ? line("after:border-r") : "relative"} z-[1] flex h-14 flex-1 basis-0 cursor-pointer items-center justify-center md:h-[88px]`}
          >
            <span className="text-[15px] leading-[21.75px] font-medium tracking-[-0.15px] whitespace-pre text-gray-750 md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px]">{label}</span>
          </button>
        ))}
      </div>
      <div className={`${line("after:border-x after:border-b")} relative aspect-[1.92678] w-full overflow-hidden`}>
        <AnimatePresence initial={false}>
          <motion.div key={active} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <Image
              src={active ? "/framer/4H4q4qQts1mSkWc6YU7vJd0c4tY.png" : "/framer/o8wZJsfFZ2NFIDP72kuHH8kwHw.png"}
              width={2000}
              height={1038}
              alt=""
              sizes="(min-width: 1200px) 1100px, (min-width: 810px) calc(100vw - 96px), calc(100vw - 40px)"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>{active === 1 ? <FollowUpCard key="followup" /> : null}</AnimatePresence>
      </div>
    </div>
  );
}
