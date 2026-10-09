"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/site";
import { Reveal } from "@/components/ui/reveal";
import { AskMochiMockup } from "./ask-mochi-mockup";

type Tab = {
  label: string;
  heading: string;
  body: string;
};

/** Tab copy taken verbatim from the live Framer page (desktop variant). */
export const revenueTabs: Tab[] = [
  {
    label: "Ask Mochi",
    heading: "See exactly where revenue is leaking",
    body: "Connect Mochi AI to Claude via MCP to chat with conversations, automations, and sales data. Uncover bottlenecks and discover opportunities.",
  },
  {
    label: "Funnel Dashboard",
    heading: "See exactly where revenue is leaking",
    body: "Mochi connects every conversation, setter action, funnel stage and lead source in one live view. See what needs fixing before another opportunity goes cold.",
  },
  {
    label: "Performance Reports",
    heading: "Know if the work is actually getting done",
    body: "See replies, follow-ups, conversations started and calls booked across your entire team without chasing setters for updates.",
  },
];

const mask = "[mask-image:linear-gradient(0deg,rgba(0,0,0,0)_0%,#000_7%)]";

/**
 * Tablet / desktop variant of the Framer "Revenue Section" (Desk/2):
 * header (heading left, paragraph right), 3 tabs with a sliding active pill, product mockup, CTA.
 */
export function RevenueDesktop() {
  const [active, setActive] = useState(0);
  const tab = revenueTabs[active];

  return (
    <div className="flex w-full flex-col items-center gap-12">
      <Reveal y={80} className="flex w-full flex-col items-center gap-12 overflow-clip">
        <div className="flex w-full items-center justify-between lg:min-h-[112px]">
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-[40px] font-semibold leading-[44px] tracking-[1.6px] text-ink whitespace-pre-wrap lg:text-[48px] lg:leading-[52.8px]">
              {tab.heading}
            </h3>
          </div>
          <div className="w-[440px] shrink-0">
            <p className="text-[18px] font-normal leading-[25.2px] tracking-[-0.24px] text-gray-800 whitespace-pre-wrap lg:text-[20px] lg:leading-[28px]">
              {tab.body}
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-12">
          <div className="relative flex w-full rounded-[12px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]">
            {revenueTabs.map((t, i) => (
              <button
                key={t.label}
                type="button"
                onClick={() => setActive(i)}
                className="relative z-[3] flex min-h-12 flex-1 cursor-pointer flex-col items-center justify-center rounded-[12px] p-[14px]"
              >
                {active === i && (
                  <motion.span
                    layoutId="revenue-tab-indicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute inset-0 z-0 rounded-[12px] bg-black/5"
                  />
                )}
                <span className="relative z-[1] text-[18px] font-medium leading-5 tracking-[-0.24px] text-black/80 whitespace-pre">
                  {t.label}
                </span>
              </button>
            ))}
          </div>

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

      <Button
        variant="primaryBig"
        href={APP_URL}
        className="text-[16px] leading-[23.2px] tracking-[-0.32px] lg:text-[18px] lg:leading-[26.1px] lg:tracking-[-0.36px]"
      >
        Start Free Trial
      </Button>
    </div>
  );
}
