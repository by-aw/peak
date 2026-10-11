"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { descriptionText } from "@/components/ui/text";
import { RevenueDesktop } from "@/components/home/revenue-desktop";
import { RevenueTabBar } from "@/components/home/revenue-tabs";

/**
 * Phone copy of each tab, in tab order (Ask Mochi, Funnel Dashboard, Performance Reports), verbatim from the live
 * /business phone blocks. Live's Funnel Dashboard block repeats the Ask Mochi heading over the Performance Reports
 * paragraph; kept as is.
 */
const PHONE_TABS = [
  {
    heading: "Understand what customers are asking",
    body: "Ask questions about your Instagram conversations through Mochi AI. Learn which services people ask about and where they need more information.",
  },
  {
    heading: "Understand what customers are asking",
    body: "See which inquiries need attention, where customers came from, and what your team has already done. Follow up with the full conversation in view.",
  },
  {
    heading: "Keep your team on the same page",
    body: "See which inquiries need attention, where customers came from, and what your team has already done. Follow up with the full conversation in view.",
  },
];

/** Phone crops of the three tab screens, in tab order (as on home). */
const PHONE_IMAGES = [
  "/framer/olRuGYZTBVZ1rFwyr27XIL8yjk.png",
  "/framer/YwSNElC51gjQxQOgPMKOjiz2eZY.png",
  "/framer/34VS7d4XslKaGfuVt0q8TfyM.webp",
];

/**
 * Phone variant, laid out like the home one (components/home/revenue-mobile.tsx): the active tab's heading and
 * paragraph, the tabs, then the active tab's screen, all tabs stacked in one grid cell so nothing moves on switch.
 */
function RevenueMobile() {
  const [active, setActive] = useState(0);

  return (
    <Reveal y={80} className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-6">
        <div className="grid">
          {PHONE_TABS.map((t, i) => (
            <div
              key={i}
              aria-hidden={i !== active}
              className={`col-start-1 row-start-1 flex flex-col items-center gap-[14px] text-center ${i === active ? "" : "invisible"}`}
            >
              <h3 className="max-w-[516px] font-display text-[36px] leading-[39.6px] font-semibold tracking-[1.4px] text-balance whitespace-pre-wrap text-ink">
                {t.heading}
              </h3>
              <p className={`whitespace-pre-wrap ${descriptionText}`}>{t.body}</p>
            </div>
          ))}
        </div>

        <RevenueTabBar active={active} onChange={setActive} labels="active" />
      </div>

      <div className="grid w-full">
        {PHONE_IMAGES.map((src, i) => (
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

/**
 * /business "Revenue Section". Tablet/desktop show exactly the home section (same tabs and copy on live), so the
 * home RevenueDesktop is reused; on phone, live /business rewrote the tab copy for service businesses.
 */
export function BusinessRevenue() {
  return (
    <section className="flex w-full items-center justify-center overflow-clip">
      <div className="flex w-full flex-1 items-center justify-center px-5 py-12 md:px-8 md:py-16 lg:px-[100px] lg:pt-[180px] lg:pb-0">
        <div className="flex w-full max-w-[1000px] flex-1 flex-col items-center gap-8 md:gap-12">
          <div className="w-full md:hidden">
            <RevenueMobile />
          </div>
          <div className="hidden w-full md:block">
            <RevenueDesktop />
          </div>
        </div>
      </div>
    </section>
  );
}
