"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/site";
import { Reveal } from "@/components/ui/reveal";
import { descriptionText } from "@/components/ui/text";
import { AskMochiMockup } from "./ask-mochi-mockup";
import { RevenueTabBar, revenueTabs } from "./revenue-tabs";

const mask = "[mask-image:linear-gradient(0deg,rgba(0,0,0,0)_0%,#000_7%)]";

/**
 * Tablet / desktop variant of the Framer "Revenue Section" (Desk/2):
 * centered header (heading over paragraph), 3 icon + label tabs, product mockup, CTA. Every tab's copy is stacked in
 * one grid cell with only the active one visible, so the tabs don't move when the copy changes length.
 */
export function RevenueDesktop() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex w-full flex-col items-center gap-12">
      <Reveal y={80} className="flex w-full flex-col items-center gap-12 overflow-clip">
        <div className="grid w-full">
          {revenueTabs.map((t, i) => (
            <div
              key={t.label}
              aria-hidden={i !== active}
              className={`col-start-1 row-start-1 flex flex-col items-center gap-[14px] text-center ${i === active ? "" : "invisible"}`}
            >
              <h3 className="max-w-[640px] text-balance font-display text-[40px] font-semibold leading-[44px] tracking-[1.6px] text-ink whitespace-pre-wrap lg:text-[48px] lg:leading-[52.8px]">
                {t.heading}
              </h3>
              <p className={`max-w-[560px] whitespace-pre-wrap ${descriptionText}`}>
                {t.body}
              </p>
            </div>
          ))}
        </div>

        <div className="flex w-full flex-col items-center gap-12">
          <RevenueTabBar active={active} onChange={setActive} labels="all" />

          <div className={`relative flex w-full flex-col items-center overflow-clip ${mask}`}>
            {active === 0 && (
              <div className="relative z-[2] flex h-[638px] w-full items-start">
                <AskMochiMockup />
              </div>
            )}
            {active === 1 && (
              <Image
                src="/framer/jIBIM9iPAFfUQoZGRA8WbdjE1E.png"
                alt=""
                width={2048}
                height={1276}
                sizes="(min-width: 1200px) 1000px, 960px"
                className="h-auto w-full"
              />
            )}
            {active === 2 && (
              <Image
                src="/framer/Ks0aHQBi3oSdtCrWhKeq5cgoU.png"
                alt=""
                width={2048}
                height={1352}
                sizes="(min-width: 1200px) 1000px, 960px"
                className="h-auto w-full"
              />
            )}
          </div>
        </div>
      </Reveal>

      <Button variant="primaryBig" href={APP_URL}>
        Start Free Trial
      </Button>
    </div>
  );
}
