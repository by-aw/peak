"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { descriptionText } from "@/components/ui/text";
import { RevenueTabBar, revenueTabs } from "./revenue-tabs";

/** Phone crops of the three tab screens, in tab order. */
const mobileImages = [
  "/framer/olRuGYZTBVZ1rFwyr27XIL8yjk.png",
  "/framer/YwSNElC51gjQxQOgPMKOjiz2eZY.png",
  "/framer/34VS7d4XslKaGfuVt0q8TfyM.webp",
];

/**
 * Phone variant of the Framer "Revenue Section" (mochi-web-v2 Figma, node 545:20669): the active tab's heading and
 * paragraph, the tabs, then the active tab's screen. Every tab's copy and screen is stacked in one grid cell with only
 * the active one visible, so nothing moves when the copy changes length and the screens are already loaded when
 * switched to.
 */
export function RevenueMobile() {
  const [active, setActive] = useState(0);

  return (
    <Reveal y={80} className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-6">
        <div className="grid">
          {revenueTabs.map((t, i) => (
            <div
              key={t.label}
              aria-hidden={i !== active}
              className={`col-start-1 row-start-1 flex flex-col items-center gap-[14px] text-center ${i === active ? "" : "invisible"}`}
            >
              <h3 className="font-display text-[36px] font-semibold leading-[39.6px] tracking-[1.4px] text-balance text-ink whitespace-pre-wrap max-w-[516px]">
                {t.heading}
              </h3>
              <p className={`whitespace-pre-wrap ${descriptionText}`}>
                {t.body}
              </p>
            </div>
          ))}
        </div>

        <RevenueTabBar active={active} onChange={setActive} labels="active" />
      </div>

      <div className="grid w-full">
        {mobileImages.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            width={1336}
            height={1248}
            sizes="calc(100vw - 40px)"
            className={`col-start-1 row-start-1 h-auto w-full ${i === active ? "" : "invisible"}`}
          />
        ))}
      </div>
    </Reveal>
  );
}

