"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "@/components/ui/reveal";
import { RollingButton } from "@/components/shared/rolling-button";
import { ArrowRightMicroIcon, CostsBadgeIcon, CurrencyDollarMicroIcon, ExclamationCircleIcon, PiggyIcon } from "@/components/icons/payments-icons";
import { LeadsList } from "./mockups";

const EASE = [0.2, 0, 0, 1] as const;

const STEPS = [
  {
    title: "Connect your payment providers",
    description: "Enter API keys of Stripe, Whop, Ablefy and FanBasis. All historical transactions sync instantly. Payment links are fetched automatically and ready to send by your team",
  },
  {
    title: "Leads auto-match to payments",
    description: "Mochi automatically matches payments to your leads by email and IG handle. For edge cases like wire transfers or cash, you manually match with one click. Setters pre-fill from your CRM.",
  },
  {
    title: "Understand your revenue",
    description: "See what you keep after fees and commissions. Know which leads are worth pursuing. Ask your AI anything about your payments. Export clean reports for your accountant.",
  },
];

/**
 * Provider tiles on the 320px ring of Card#1 (positions are the Framer insets, un-rotated). Empty slots are
 * #fcfcfc squares with a dashed hairline; the ablefy tile has the hairline too (transparent artwork).
 */
const ORBIT: { left: number; top: number; src?: string; dashed?: boolean }[] = [
  { left: 136, top: 0, src: "/framer/YvzCDUDYVF5lIVitk2XGTP0Xti8.jpeg" },
  { left: 242, top: 48, dashed: true },
  { left: 30, top: 224, src: "/framer/TnybGzHTzcPlUTsxS9M9fWs.png" },
  { left: 30, top: 48, dashed: true },
  { left: 136, top: 272, src: "/framer/cXKLpQFwYqeJV2oACXV6KP7Ae3Y.png", dashed: true },
  { left: 242, top: 224, dashed: true },
  { left: 272, top: 136, src: "/framer/GaNJ0Uno2oBWMLZtbEUsS4Wq9U4.jpeg" },
  { left: 0, top: 136, dashed: true },
];

const DASHED = "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border after:border-dashed after:border-[#e7e7e7]";

/**
 * Card#1: Mochi avatar on a #fcfcfc disc inside a ring of provider tiles. On the live site the disc, the avatar
 * and the ring (tiles are not counter-rotated) all spin together once every 10s, starting when scrolled into view.
 */
function OrbitCard() {
  return (
    <div className="relative size-full overflow-hidden rounded-[20px] bg-white">
      <motion.div
        className="absolute top-[49px] left-[42px] size-[320px]"
        initial={{ rotate: 0 }}
        whileInView={{ rotate: 360 }}
        viewport={{ once: true }}
        transition={{ duration: 10, ease: "linear", repeat: Infinity }}
      >
        <div className={`absolute top-1/2 left-1/2 size-[164px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fcfcfc] ${DASHED}`} />
        <div className="absolute top-1/2 left-1/2 size-16 -translate-x-1/2 -translate-y-1/2">
          <Image src="/framer/A8F4Pouhg6N037Kt9gFrC98VHfI.png" alt="" width={148} height={148} className="size-full object-contain" />
        </div>
        {ORBIT.map((tile, i) => (
          <div
            key={i}
            className={`absolute size-12 overflow-hidden rounded-[12px] ${tile.src ? "" : "bg-[#fcfcfc]"} ${tile.dashed ? DASHED : ""}`}
            style={{ left: tile.left, top: tile.top }}
          >
            {tile.src && <Image src={tile.src} alt="" width={96} height={96} className="size-full object-cover" />}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

const STAT = "text-[18px] leading-[18px] font-medium tracking-[-0.54px] whitespace-pre text-black";
const LABEL = "text-[13px] leading-[13px] font-normal tracking-[-0.2px] whitespace-pre text-[#6d6d6d]";

/** Card#3: revenue stat rows (net, keep, matched + the tilted "Total costs" row). */
function StatsCard() {
  return (
    <div className="relative size-full overflow-hidden rounded-[20px] bg-white">
      <div className="absolute top-1/2 left-1/2 flex w-[356px] -translate-x-1/2 -translate-y-1/2 flex-col gap-1">
        <div className="flex flex-col gap-5 overflow-hidden rounded-[10px] bg-white p-4">
          <p className={LABEL}>Net revenue</p>
          <div className="flex items-center justify-between">
            <p className={STAT}>$68.4K</p>
            <span className="flex size-6 items-center justify-center rounded-[6px] bg-[#b0b0b0] p-0.5">
              <CurrencyDollarMicroIcon className="size-[14px]" />
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-5 overflow-hidden rounded-[10px] bg-white p-4">
          <p className={LABEL}>You keep</p>
          <div className="flex items-center justify-between">
            <p className={STAT}>$53.7K</p>
            <PiggyIcon className="size-[26px]" />
          </div>
        </div>
        <div className="flex flex-col gap-5 overflow-hidden rounded-[10px] bg-white p-4">
          <p className={LABEL}>Leads Matched</p>
          <div className="flex items-center justify-between">
            <p className={STAT}>22</p>
            <span className="flex items-center gap-0.5 rounded-full bg-[#fff1f2] p-1">
              <ExclamationCircleIcon className="size-4" />
              <p className="px-px text-[12px] leading-[12.6px] font-medium tracking-[-0.2px] whitespace-pre text-[#9f1239]">4 unmatched</p>
              <span className="flex size-4 items-center justify-center">
                <ArrowRightMicroIcon className="h-[11px] w-3" />
              </span>
            </span>
          </div>
        </div>
        <div className="relative -mt-1 flex w-[362px] -rotate-[4deg] flex-col gap-5 self-center overflow-hidden rounded-[10px] bg-white p-4 shadow-[0_1px_32px_0_rgba(0,0,0,0.07),0_1px_20px_0_rgba(0,0,0,0.04)] after:pointer-events-none after:absolute after:inset-0 after:rounded-[10px] after:border after:border-[#e7e7e7]">
          <p className={LABEL}>Total costs</p>
          <div className="flex items-center justify-between">
            <p className={STAT}>$17.2K</p>
            <CostsBadgeIcon className="size-7 rotate-[4deg]" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Card#2: the leads list, centered. */
function LeadsCard() {
  return (
    <div className="relative size-full overflow-hidden rounded-[20px] bg-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <LeadsList variant="setup" />
      </div>
    </div>
  );
}

const CARDS = [OrbitCard, LeadsCard, StatsCard];

/**
 * Framer "Setup Section" of /payments: "Connect. Match. Done." with three clickable steps (inactive at 50%)
 * and the grey "Image Corner" whose card swaps with the active step. 1440x905 / 1024x856 / 390x961.
 */
export function PaymentsSetup() {
  const [active, setActive] = useState(0);
  const Card = CARDS[active];
  return (
    <section className="relative flex w-full flex-col items-center px-5 py-12 md:px-12 md:py-16 lg:px-[100px] lg:py-20">
      <div className="flex w-full max-w-[1100px] flex-col items-center gap-8 md:gap-12 lg:gap-16">
        <Reveal y={48} delay={0.2} className="w-full">
          <h3 className="w-full text-left font-display md:max-w-[640px] text-[24px] leading-[28.8px] font-semibold whitespace-pre-wrap text-black md:text-center md:text-[32px] md:leading-[38.4px] lg:text-[40px] lg:leading-[48px]">
            Connect. Match. <span className="text-black/50">Done.</span>
          </h3>
        </Reveal>
        <div className="flex w-full flex-col items-center gap-12">
          <div className="flex w-full max-w-[1000px] flex-col items-center gap-10 md:flex-row">
            <div className="flex w-full flex-col gap-4 md:flex-1 md:basis-0 md:gap-10">
              {STEPS.map((step, i) => {
                const on = i === active;
                return (
                  <button
                    key={step.title}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`flex w-full cursor-pointer flex-col gap-6 overflow-clip text-left transition-opacity duration-300 ${on ? "opacity-100" : "opacity-50 hover:opacity-70"}`}
                  >
                    <div className="flex w-full flex-col gap-3">
                      <p className="text-[16px] leading-[19.2px] font-semibold tracking-[-0.48px] whitespace-pre-wrap text-black md:text-[18px] md:leading-[21.6px] md:tracking-[-0.54px] lg:text-[20px] lg:leading-[24px] lg:tracking-[-0.6px]">{step.title}</p>
                      <p className={`text-[14px] leading-[20.3px] font-normal tracking-[-0.14px] whitespace-pre-wrap text-gray-750 md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px] ${on ? "" : "hidden md:block"}`}>{step.description}</p>
                    </div>
                    <div className="h-0.5 w-full bg-[#efefef]" />
                  </button>
                );
              })}
            </div>
            <div className="relative h-[352px] w-full overflow-hidden rounded-[24px] bg-[#f2f2f2] md:h-[482px] md:flex-1 md:basis-0">
              <div className="absolute top-[-33px] left-[-27px] h-[418px] w-[404px] origin-top-left scale-[0.7] md:top-5 md:left-5 lg:top-8 lg:left-8 lg:scale-100">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={active} className="size-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: EASE }}>
                    <Card />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-center gap-4">
            <RollingButton href="/demo" size="lg">
              Book a Demo
            </RollingButton>
            <p className="max-w-[270px] text-center text-[14px] leading-[19.6px] font-normal whitespace-pre-wrap text-gray-550">Already on Mochi? Payments is live in your dashboard right now.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
