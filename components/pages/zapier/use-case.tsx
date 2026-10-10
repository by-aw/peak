"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { ZapierSection } from "./section";
import { CrmMockup, SlackMockup, SpreadsheetMockup } from "./use-case-mockups";

const EASE = [0.2, 0, 0, 1] as const;

/** Framer "Isometric": the faint 1248x733 illustration bleeding out of the section's top-right corner (desktop only). */
const ISOMETRIC = (
  <div aria-hidden className="pointer-events-none absolute top-[-288px] left-[682px] z-0 hidden h-[733px] w-[1248px] lg:block">
    <Image src="/framer/sz9QIsCHOzQkOv7bwPbaQhyRVLI.png" alt="" width={2496} height={1466} sizes="1248px" className="h-full w-full object-cover" />
  </div>
);

type UseCase = { label: string; color: string; title: string; description: string };

const USE_CASES: UseCase[] = [
  {
    label: "Spreadsheet Sync",
    color: "#23a566",
    title: "Auto-export every lead to Google Sheets",
    description: "Automatically export every new lead to Google Sheets. Build reports, share with your team, and never copy-paste again.",
  },
  {
    label: "Team Alerts",
    color: "#74159e",
    title: "Instant Slack alerts on every deal move",
    description: "Get instant Slack alerts when leads change status or deals close. Your whole team stays in the loop without checking the app.",
  },
  {
    label: "HubSpot / Salesforce",
    color: "#ff4800",
    title: "Push lead data to your existing CRM",
    description: "Push lead data to your existing CRM. Keep your sales stack connected and your data consistent across tools.",
  },
];

/** Vertical offsets (px) of the Spreadsheet / Slack / CRM mockups inside the 574x503 frame for each selected use case (measured live). */
const OFFSETS: [number, number, number][] = [
  [22, 533, 926],
  [-676, 67, 926],
  [-1352, -676, 53],
];

/**
 * Framer "Use Case Section" of /zapier ("What teams actually build with it"): three selectable cards on the left
 * (the active one expands to show its description) and a #fafafa frame on the right in which the Google Sheets
 * flow, the Slack notifications and the CRM pipeline slide vertically into view (~0.7s ease-out).
 * On phones the frame sits above the cards and is scaled to 350x278. 1440x837 / 1024x773 / 390x999.
 */
export function ZapierUseCase() {
  const [active, setActive] = useState(0);
  const [s, sl, c] = OFFSETS[active];
  return (
    <ZapierSection label="What teams actually build with it" className="overflow-hidden" wrapperClassName="relative z-[2]" containerClassName="gap-12 lg:gap-16" extra={ISOMETRIC}>
      <Reveal y={48} delay={0.2} className="w-full">
        <SectionHeader
          align="left"
          title="What teams actually build with it"
          description="The setups Instagram sales teams put in place on day one."
          descriptionClassName="max-w-[388px]"
        />
      </Reveal>
      <Reveal y={48} delay={0.2} className="flex w-full flex-col items-center gap-4 md:flex-row md:gap-6">
        <div className="relative h-[278px] w-full shrink-0 overflow-hidden rounded-[20px] bg-gray-25 md:order-2 md:h-[503px] md:min-w-0 md:flex-1">
          <div className="absolute top-0 left-1/2 h-[503px] w-[574px] origin-top -translate-x-1/2 scale-[0.553] md:left-0 md:translate-x-0 md:scale-100">
            <motion.div initial={false} animate={{ y: s }} transition={{ duration: 0.7, ease: EASE }} className="absolute top-0 left-0 h-full w-full">
              <SpreadsheetMockup />
            </motion.div>
            <motion.div initial={false} animate={{ y: sl }} transition={{ duration: 0.7, ease: EASE }} className="absolute top-0 left-0 h-full w-full">
              <SlackMockup />
            </motion.div>
            <motion.div initial={false} animate={{ y: c }} transition={{ duration: 0.7, ease: EASE }} className="absolute top-0 left-0 h-full w-full">
              <CrmMockup />
            </motion.div>
          </div>
        </div>
        <div className="flex w-full min-w-0 flex-col items-start gap-3 md:order-1 md:flex-1">
          {USE_CASES.map((u, i) => {
            const on = i === active;
            return (
              <button
                key={u.label}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={on}
                className="flex w-full cursor-pointer flex-col items-start gap-4 rounded-[20px] bg-gray-25 p-6 text-left"
              >
                <div className="flex items-center justify-center gap-1.5" style={{ color: u.color }}>
                  <span aria-hidden className="h-px w-5 bg-current" />
                  <p className="text-center text-[14px] leading-[16.8px] font-medium whitespace-pre">{u.label}</p>
                  <span aria-hidden className="h-px w-5 bg-current" />
                </div>
                <div className="flex w-full flex-col items-start">
                  <div className="flex w-full items-center gap-2">
                    <p className="w-[228px] text-[16px] leading-[19.2px] font-semibold tracking-[-0.48px] whitespace-pre-wrap text-black md:text-[18px] md:leading-[21.6px] md:tracking-[-0.54px] lg:text-[20px] lg:leading-6 lg:tracking-[-0.6px]">
                      {u.title}
                    </p>
                  </div>
                  <motion.div initial={false} animate={{ height: on ? "auto" : 0, marginTop: on ? 8 : 0, opacity: on ? 1 : 0 }} transition={{ duration: 0.5, ease: EASE }} className="w-full overflow-hidden">
                    <p className="w-full text-[14px] leading-[20.3px] font-normal tracking-[-0.14px] whitespace-pre-wrap text-[#383840] md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px]">
                      {u.description}
                    </p>
                  </motion.div>
                </div>
              </button>
            );
          })}
        </div>
      </Reveal>
    </ZapierSection>
  );
}
