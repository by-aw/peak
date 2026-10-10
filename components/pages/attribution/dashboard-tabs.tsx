"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type Tab = { label: string; src: string; width: number; height: number };

const TABS: Tab[] = [
  { label: "DM Links", src: "/framer/lhM1iNoFx430f67d5umMdPUiWs.png", width: 2880, height: 1820 },
  { label: "Tracking Pixel", src: "/framer/OoKv667HbXMTlk4JMN9L7z92w.png", width: 2682, height: 1695 },
  { label: "Youtube", src: "/framer/TN5ul4f0QWe36aRQar9Wgipux1U.png", width: 2682, height: 1695 },
  { label: "Lead Profiles", src: "/framer/m1H9HCoo1gxgMCUVnf7kg9ubeek.png", width: 2682, height: 1695 },
];

const spring = { type: "spring", stiffness: 400, damping: 36 } as const;

/**
 * Framer "Desktop/1" / "Mobile/1" dashboard switcher: white pill tab bar (the grey "Follow" highlight slides
 * to the active tab), the 1.5823:1 screenshot of the picked product area and the caption. Tabs switch on
 * click only (no autoplay on the live site); the tab bar scrolls horizontally on phones.
 */
export function DashboardTabs() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];
  return (
    <div className="flex w-full flex-col items-center gap-8 overflow-clip md:gap-10">
      <div className="flex w-full flex-col items-start overflow-x-auto rounded-[32px] bg-white p-2 [scrollbar-width:none] md:w-auto md:items-center [&::-webkit-scrollbar]:hidden">
        <div className="relative flex items-center">
          {TABS.map((t, i) => (
            <button
              key={t.label}
              type="button"
              onClick={() => setActive(i)}
              className="relative flex min-h-9 shrink-0 flex-col items-center justify-center rounded-full px-3 py-4 transition-opacity duration-200 hover:opacity-80 md:py-2"
            >
              {i === active ? (
                <motion.span layoutId="dashboard-tab-follow" transition={spring} className="absolute inset-0 rounded-full bg-black/5" aria-hidden />
              ) : null}
              <span className={`relative text-[14px] leading-[15.4px] font-medium whitespace-pre transition-colors duration-200 ${i === active ? "text-black" : "text-[#999]"}`}>{t.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col items-center gap-[17px] overflow-clip md:gap-6">
        <div className="relative aspect-[1.5823] w-full overflow-hidden rounded-[8px] shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_1px_3px_0_rgba(0,0,0,0.08)] md:rounded-[12px]">
          <AnimatePresence initial={false}>
            <motion.div key={tab.src} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <Image
                src={tab.src}
                width={tab.width}
                height={tab.height}
                alt=""
                sizes="(min-width: 1200px) 1100px, (min-width: 810px) calc(100vw - 96px), calc(100vw - 40px)"
                className="h-full w-full object-cover"
                preload={active === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="text-center text-[14px] leading-[19.6px] font-normal text-gray-550 md:text-[15px] md:leading-[21px] md:whitespace-pre">
          Not a link shortener. Not an ad tracker. Full-lifecycle attribution for teams that close in DMs
        </p>
      </div>
    </div>
  );
}
