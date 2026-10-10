"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { CheckCircleMicroIcon, DashedLineIcon, MinusSignIcon, PhoneMicroIcon } from "@/components/icons/attribution-icons";

type Lead = { avatar: string; avatarSize: number; name: string; url: string; time: string; clicked: boolean };

const LEADS: Lead[] = [
  { avatar: "/framer/F0lXd7bzdUiP3vDNELlpzCxA6w.jpg", avatarSize: 1024, name: "mikecoach", url: "calendly.com/coach/discovery", time: "15m", clicked: false },
  { avatar: "/framer/u34gkV71qW8ZhOogjt290v9SC4.png", avatarSize: 160, name: "jessisca_jones", url: "calendly.com/coach/discovery", time: "31m", clicked: true },
  { avatar: "/framer/1fxmqrMbdSN27dD0CGdkXSQuc0.png", avatarSize: 160, name: "devon_snr", url: "calendly.com/coach/discovery", time: "1hr", clicked: false },
  { avatar: "/framer/F0lXd7bzdUiP3vDNELlpzCxA6w.jpg", avatarSize: 1024, name: "mikecoach", url: "calendly.com/coach/discovery", time: "15m", clicked: false },
];

const CARD_H = 98;
const GAP = 8;
const SET_H = LEADS.length * (CARD_H + GAP);
const SPEED = 25; // px per second, measured on the live ticker

/** One lead row (Framer "Card" 286x98): avatar, handle, link + latency and the Clicked / Unclicked badge. */
function LeadCard({ lead, className = "" }: { lead: Lead; className?: string }) {
  return (
    <div className={`relative flex items-start gap-4 overflow-hidden rounded-[12px] bg-white p-4 ${className}`}>
      <div className="relative size-10 shrink-0 overflow-hidden rounded-full">
        <Image src={lead.avatar} width={lead.avatarSize} height={lead.avatarSize} alt="" sizes="40px" className="size-full object-cover" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col items-start gap-3">
        <div className="flex w-full flex-col items-start gap-1">
          <p className="w-full text-[13px] leading-[13.65px] font-medium tracking-[-0.2px] text-black">{lead.name}</p>
          <div className="flex w-full items-center justify-between gap-2">
            <p className="min-w-0 truncate text-[12px] leading-[12px] font-normal tracking-[-0.2px] text-gray-500">{lead.url}</p>
            <p className="shrink-0 text-right text-[10px] leading-[10px] font-medium whitespace-pre text-gray-500">{lead.time}</p>
          </div>
        </div>
        <div className="flex items-start gap-2 overflow-hidden">
          <div className="relative flex items-center gap-0.5 rounded-full bg-[#efefef] py-1 pr-2 pl-[5px] after:pointer-events-none after:absolute after:inset-0 after:rounded-full after:border after:border-[#e0e0e0]">
            <div className="relative size-4 shrink-0">
              {lead.clicked ? <CheckCircleMicroIcon className="absolute inset-px" /> : <MinusSignIcon className="absolute inset-x-0.5 top-2 h-px" />}
            </div>
            <p className="px-px text-[12px] leading-[12.6px] font-medium whitespace-pre text-gray-500">{lead.clicked ? "Clicked" : "Unclicked"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const cardLine = "after:pointer-events-none after:absolute after:inset-0 after:rounded-[12px] after:border after:border-gray-150";

/**
 * "Did they even click it?" mockup: an endless upward ticker of lead cards (25px/s) behind a floating
 * "mike.coach – Unclicked" card, both faded out at the bottom by the Framer mask gradients.
 */
export function LeadTicker() {
  return (
    <div className="relative flex w-full items-start p-6 [mask-image:linear-gradient(rgb(0,0,0)_83%,rgba(0,0,0,0)_100%)]">
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-[2] w-[312px] -translate-x-1/2 -translate-y-1/2">
        <LeadCard
          lead={{ avatar: "/framer/HoMs1ZaqfaLWHV8xjmnPTyoFk.jpg", avatarSize: 1024, name: "mike.coach", url: "calendly.com/coach/discovery", time: "4hrs", clicked: false }}
          className="shadow-[0_0_0_0.5px_#e0e0e0,0_1px_2px_0_rgba(0,0,0,0.05),0_2px_16px_0_rgba(0,0,0,0.08),0_2px_40px_0_rgba(0,0,0,0.08)] after:pointer-events-none after:absolute after:inset-0 after:rounded-[12px] after:border-b after:border-gray-150"
        />
      </div>
      <div className="relative h-[374px] w-full overflow-clip [mask-image:linear-gradient(rgb(0,0,0)_83%,rgba(0,0,0,0)_100%)]">
        <div className="absolute top-1/2 left-1/2 h-[1260px] w-[286px] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
          <motion.ul
            className="flex w-full flex-col gap-2 will-change-transform"
            animate={{ y: [0, -SET_H] }}
            transition={{ duration: SET_H / SPEED, ease: "linear", repeat: Infinity }}
          >
            {[0, 1, 2].flatMap((set) =>
              LEADS.map((lead, i) => (
                <li key={`${set}-${i}`} className="w-full shrink-0 list-none">
                  <LeadCard lead={lead} className={cardLine} />
                </li>
              )),
            )}
          </motion.ul>
        </div>
      </div>
    </div>
  );
}

/** "Which setter actually drives results?" mockup: the stacked setter-card illustration, faded on both sides. */
export function SetterStack() {
  return (
    <div className="flex w-full items-start p-6 [mask-image:linear-gradient(270deg,rgba(0,0,0,0)_3%,rgb(0,0,0)_25%)] md:min-h-[398px]">
      <div className="relative h-[328px] w-full overflow-hidden [mask-image:linear-gradient(90deg,rgba(0,0,0,0)_-7%,rgb(0,0,0)_24%)] md:h-[350px] md:[mask-image:linear-gradient(90deg,rgba(0,0,0,0)_17%,rgb(0,0,0)_29%)] lg:[mask-image:linear-gradient(90deg,rgba(0,0,0,0)_0%,rgb(0,0,0)_17%)]">
        <Image
          src="/framer/IvCQj44oClmYjqjx2X0GeLolk7I.png"
          width={571}
          height={467}
          alt=""
          sizes="(min-width: 1200px) 319px, (min-width: 810px) 397px, 331px"
          className="absolute top-1/2 left-1/2 w-[331px] max-w-none -translate-x-1/2 -translate-y-1/2 md:w-[397px] lg:w-full"
        />
      </div>
    </div>
  );
}

const ROWS: [string, boolean][] = [
  ["Reel PDF link?", true],
  ["Cold DM link?", false],
  ["Story link?", false],
];

/** "What content actually converts?" mockup: unknown booking sources, dashed line and the "Call Booked" pill. */
export function CallBookedMockup() {
  return (
    <div className="flex w-full flex-col items-center justify-center p-4 md:min-h-[398px] md:p-6">
      <div className="relative flex w-full max-w-[316px] flex-col items-start gap-3.5 overflow-hidden rounded-[12px] p-2 after:pointer-events-none after:absolute after:inset-0 after:rounded-[12px] after:border after:border-dashed after:border-gray-150 md:max-w-[285px]">
        <div className="flex w-full flex-col items-start gap-1">
          {ROWS.map(([label, labelGrows]) => (
            <div key={label} className="flex w-full items-center gap-1">
              <div className={`flex items-center rounded-[10px] bg-gray-25 p-3 ${labelGrows ? "flex-1 basis-0" : ""}`}>
                <p className="text-[14px] leading-[14.7px] font-normal whitespace-pre text-ink-3">{label}</p>
              </div>
              <div className={`flex items-center justify-end rounded-[10px] bg-gray-25 p-3 ${labelGrows ? "w-[98px]" : "flex-1 basis-0"}`}>
                <p className="text-[14px] leading-[14px] font-normal tracking-[-0.2px] whitespace-pre text-[#8d8d8d]">unknown</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-[rgba(212,113,255,0.05)] px-3.5 py-3">
          <p className="w-full max-w-[241px] text-center text-[14px] leading-[16.8px] font-medium tracking-[-0.2px] whitespace-pre-wrap text-[#d265ff]">⚠ Booking source: unknown. Scaling guesswork.</p>
        </div>
      </div>
      <div className="h-16 w-2 shrink-0">
        <DashedLineIcon />
      </div>
      <div className="relative flex items-center justify-center gap-2.5 overflow-hidden rounded-[48px] bg-gray-25 py-4 pr-4 pl-3.5 after:pointer-events-none after:absolute after:inset-0 after:rounded-[48px] after:border after:border-gray-150">
        <div className="relative size-4 shrink-0 overflow-hidden">
          <PhoneMicroIcon className="absolute inset-0.5" />
        </div>
        <p className="text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre text-gray-750">Call Booked</p>
      </div>
    </div>
  );
}
