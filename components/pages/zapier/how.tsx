"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { ZapierSection } from "./section";
import {
  BlockchainIcon,
  BubbleChatIcon,
  CatalogueIcon,
  CheckCircleIcon,
  FileIcon,
  FilterIcon,
  LayersLogoIcon,
  NotionIcon,
  PaymentSuccessIcon,
  SlackIcon,
  SplitVerticalIcon,
} from "./icons";

const EASE = [0.2, 0, 0, 1] as const;
/** Each step stays active ~6s on the live site (the 2px purple bar fills at ~82px/s over 492px). */
const STEP_MS = 6000;

type Pill = { icon: ReactNode; label: string };
type Step = { title: string; description: string; image: string; pills: [Pill[], Pill[]] };

const STEPS: Step[] = [
  {
    title: "Events happen in Mochi",
    description:
      "Whenever something important happens in Mochi—a new lead from Instagram DMs, a status change as they move through your funnel, a deal won or lost, or a payment created—Mochi captures it instantly.",
    image: "/framer/5HE7H56nRZydK7DkqReV0edXk.png",
    pills: [
      [
        { icon: <BubbleChatIcon className="size-[22px]" />, label: "New lead from Instagram DM" },
        { icon: <SplitVerticalIcon className="size-6" />, label: "Lead status changed" },
      ],
      [
        { icon: <CheckCircleIcon className="size-[21px]" />, label: "Deal won or lost" },
        { icon: <PaymentSuccessIcon className="h-[22px] w-6" />, label: "Payment created" },
      ],
    ],
  },
  {
    title: "Zapier triggers instantly",
    description:
      "Mochi fires a real-time webhook to Zapier the moment an event occurs. No scheduled checks, no delays. Your Zaps respond in seconds so your team always has the freshest data.",
    image: "/framer/2IUq6KQxrpCVkYfFOCGjOAJIe4.png",
    pills: [
      [
        { icon: <BlockchainIcon className="size-[22px]" />, label: "Sub-second webhook delivery" },
        { icon: <FileIcon className="h-6 w-5" />, label: "Structured JSON payload" },
      ],
      [
        { icon: <FilterIcon className="h-[18px] w-[19px]" />, label: "Retry logic built in" },
        { icon: <CatalogueIcon className="size-[21px]" />, label: "Full event history" },
      ],
    ],
  },
  {
    title: "Your apps update automatically",
    description:
      "Zapier routes the event data to any of 6,000+ connected apps. Google Sheets gets a new row, Slack posts an alert, HubSpot creates a contact—all without anyone lifting a finger.",
    image: "/framer/8oLpgDuW5ArRmBTohIZFVuSWuWE.png",
    pills: [
      [
        {
          icon: <Image src="/framer/au5ozrnYpCi5F5bLyYOsc8vdA.png" alt="" width={60} height={83} className="h-4 w-3 object-cover" />,
          label: "Google Sheets row added",
        },
        { icon: <SlackIcon className="size-6" />, label: "Slack message sent" },
      ],
      [
        { icon: <LayersLogoIcon className="size-[21px]" />, label: "CRM contact created" },
        { icon: <NotionIcon className="h-6 w-[23px]" />, label: "Notion database updated" },
      ],
    ],
  },
];

function PillRow({ pills }: { pills: Pill[] }) {
  return (
    <div className="flex w-full flex-col items-start gap-3 lg:w-auto lg:flex-row lg:items-center">
      {pills.map((p) => (
        <div key={p.label} className="flex w-full items-center justify-start gap-2.5 rounded-[8px] bg-gray-25 px-3.5 py-2.5 md:w-auto md:justify-center">
          <span className="flex size-6 shrink-0 items-center justify-center">{p.icon}</span>
          <p className="text-[14px] leading-[21px] font-medium tracking-[-0.56px] whitespace-pre text-[#262626]">{p.label}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * Framer "How Section" of /zapier ("Three steps from event to action"): three steps that auto-advance every
 * ~6s (or on click). The active step shows its description, a 2px progress bar filling in purple and two rows
 * of info pills; inactive steps collapse to their title over a dashed #f2f2f2 rule. The image on the right
 * (above the list on phones) swaps with the step. 1440x902 / 1024x849 / 390x1181.
 */
export function ZapierHow() {
  const [active, setActive] = useState(0);
  const [run, setRun] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setActive((a) => (a + 1) % STEPS.length), STEP_MS);
    return () => clearTimeout(t);
  }, [active, run]);
  const select = (i: number) => {
    setActive(i);
    setRun((r) => r + 1);
  };
  return (
    <ZapierSection label="Three steps from event to action" className="bg-white" containerClassName="gap-8 md:gap-12 lg:gap-[84px]">
      <Reveal y={48} delay={0.2} className="w-full">
        <SectionHeader
          align="left"
          title="Three steps from event to action"
          description="Mochi handles the data. Zapier handles the routing. You handle the deals."
          titleClassName="max-w-[440px]"
          descriptionClassName="max-w-[440px]"
        />
      </Reveal>
      <Reveal y={48} delay={0.2} className="flex w-full flex-col items-start gap-6 md:flex-row md:gap-6 lg:gap-10">
        <div className="relative aspect-[0.936] w-full shrink-0 overflow-hidden rounded-[24px] md:order-2 md:w-[384px] lg:h-[500px] lg:w-[468px]">
          {STEPS.map((s, i) => (
            <Image
              key={s.image}
              src={s.image}
              alt=""
              width={936}
              height={1000}
              sizes="(min-width: 1200px) 468px, (min-width: 810px) 384px, 100vw"
              preload={i === 0}
              className={`absolute inset-0 h-full w-full rounded-[24px] object-cover ${i === active ? "" : "invisible"}`}
            />
          ))}
        </div>
        <div className="flex w-full min-w-0 flex-1 flex-col items-start gap-10 md:order-1">
          {STEPS.map((s, i) => {
            const on = i === active;
            return (
              <div key={s.title} className="flex w-full flex-col items-start">
                <div className="flex w-full flex-col items-start gap-6">
                  <button type="button" onClick={() => select(i)} className="flex w-full cursor-pointer flex-col items-start text-left">
                    <p className="w-full text-[16px] leading-[19.2px] font-semibold tracking-[-0.48px] whitespace-pre-wrap text-black md:text-[18px] md:leading-[21.6px] md:tracking-[-0.54px] lg:text-[20px] lg:leading-6 lg:tracking-[-0.6px]">
                      {s.title}
                    </p>
                    <motion.div initial={false} animate={{ height: on ? "auto" : 0, marginTop: on ? 12 : 0, opacity: on ? 1 : 0 }} transition={{ duration: 0.5, ease: EASE }} className="w-full overflow-hidden">
                      <p className="w-full text-[14px] leading-[20.3px] font-normal tracking-[-0.14px] whitespace-pre-wrap text-[#42424a] md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px]">
                        {s.description}
                      </p>
                    </motion.div>
                  </button>
                  {on ? (
                    <div className="relative z-[2] h-0.5 w-full overflow-hidden bg-[#f2f2f2]">
                      <motion.div
                        key={`${i}-${run}`}
                        className="absolute inset-y-0 left-0 bg-purple-500"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                      />
                    </div>
                  ) : (
                    <div aria-hidden className="h-0.5 w-full border border-dashed border-[#f2f2f2]" />
                  )}
                </div>
                <motion.div initial={false} animate={{ height: on ? "auto" : 0, marginTop: on ? 24 : 0, opacity: on ? 1 : 0 }} transition={{ duration: 0.5, ease: EASE }} className="w-full overflow-hidden">
                  <div className="flex w-full flex-col items-start gap-3">
                    <PillRow pills={s.pills[0]} />
                    <PillRow pills={s.pills[1]} />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </ZapierSection>
  );
}
