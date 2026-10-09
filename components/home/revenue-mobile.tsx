"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { RevenueTabBar, revenueTabs } from "./revenue-tabs";

/** Phone crops of the three tab screens, in tab order. */
const mobileImages = [
  "/framer/olRuGYZTBVZ1rFwyr27XIL8yjk.png",
  "/framer/YwSNElC51gjQxQOgPMKOjiz2eZY.png",
  "/framer/34VS7d4XslKaGfuVt0q8TfyM.webp",
];

/**
 * Phone variant of the Framer "Revenue Section", tabbed like tablet/desktop: the 3 tabs, then the active tab's heading,
 * paragraph and screen. Every tab's copy and screen is stacked in one grid cell with only the active one visible, so
 * the screen never moves when the copy changes length and the screens are already loaded when switched to.
 */
export function RevenueMobile() {
  const [active, setActive] = useState(0);

  return (
    <Reveal y={80} className="flex w-full flex-col gap-8">
      <RevenueTabBar active={active} onChange={setActive} layoutId="revenue-tab-indicator-mobile" />

      <div className="grid">
        {revenueTabs.map((t, i) => (
          <div
            key={t.label}
            aria-hidden={i !== active}
            className={`col-start-1 row-start-1 flex flex-col gap-[14px] ${i === active ? "" : "invisible"}`}
          >
            <h3 className="font-display text-[32px] font-semibold leading-[35.2px] tracking-[1px] text-balance text-ink whitespace-pre-wrap">
              {t.heading}
            </h3>
            <p className="text-[16px] font-normal leading-[22.4px] tracking-[-0.24px] text-gray-800 whitespace-pre-wrap">
              {t.body}
            </p>
          </div>
        ))}
      </div>

      <div className="grid w-full overflow-clip [mask-image:linear-gradient(#000_74%,rgba(0,0,0,0)_91%)]">
        {mobileImages.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            width={1336}
            height={1248}
            sizes="350px"
            className={`col-start-1 row-start-1 h-auto w-full ${i === active ? "" : "invisible"}`}
          />
        ))}
      </div>
    </Reveal>
  );
}
