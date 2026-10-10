"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  BackfillCheckIcon,
  CheckmarkCircleIcon,
  LoadingIcon,
  MetaCircleIcon,
  MochiCircleIcon,
  PillCheckIcon,
  PixelRowIcon,
  ToggleCalendarIcon,
  ToggleCreditCardIcon,
  ToggleUserCheckIcon,
  ToggleUserPlusIcon,
} from "@/components/icons/meta-ads-icons";
import { PixelPickerRow, PlaybookCardA, PlaybookCardB, PlaybookCardC } from "@/components/icons/meta-ads-tabs";

const EASE = [0.2, 0, 0, 1] as const;
const PERIOD = 2000;

/** Cycles 0..n-1 every `PERIOD` ms (the Framer mockups loop through their variants). */
function useCycle(n: number) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % n), PERIOD);
    return () => clearInterval(id);
  }, [n]);
  return i;
}

/** 147x4 dashed connector between the two circles: a purple 24% dash travelling along a #f3e8ff hairline. */
function ConnectorLine() {
  return (
    <svg viewBox="0 0 264 1" className="h-1 w-[147px]" aria-hidden>
      <path d="M.25.25h263.5v.5H.25z" stroke="#f3e8ff" strokeWidth=".5" strokeLinejoin="round" strokeLinecap="round" fill="transparent" />
      <motion.path
        d="M.25.25h263.5v.5H.25z"
        stroke="#a855f7"
        strokeWidth=".5"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="transparent"
        pathLength={100}
        strokeDasharray="24 100"
        initial={{ strokeDashoffset: 124 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 2.4, ease: "linear", repeat: Infinity }}
      />
    </svg>
  );
}

function Swap({ id, children }: { id: string; children: ReactNode }) {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div key={id} className="flex items-center gap-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, ease: EASE }}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/** Step 1 "Connect Meta": Mochi and Meta avatars joined by the connector with an "OAuth" -> "Connected" pill. */
export function ConnectMockup() {
  const connected = useCycle(2) === 1;
  return (
    <div className="relative flex items-center gap-px">
      <MochiCircleIcon className="size-20" />
      <div className="relative z-[1] flex items-center justify-center overflow-hidden">
        <ConnectorLine />
      </div>
      <MetaCircleIcon className="size-20" />
      <motion.div
        layout
        className="absolute top-1/2 left-1/2 z-[1] flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full bg-white px-2 py-1 shadow-[inset_0_0_0_1px_#e7e7e7]"
        transition={{ duration: 0.3, ease: EASE }}
      >
        <Swap id={connected ? "connected" : "oauth"}>
          <span className="flex size-[14px] items-center justify-center overflow-clip">
            {connected ? <PillCheckIcon className="size-[13px]" /> : <LoadingIcon className="size-3 animate-spin" />}
          </span>
          <p className="text-[12px] leading-[16.8px] font-medium tracking-[-0.2px] whitespace-pre text-[#505050]">{connected ? "Connected" : "OAuth"}</p>
        </Swap>
      </motion.div>
    </div>
  );
}

/** Step 2 "Pick your pixel": white picker card, the check mark moving between the two pixel rows. */
export function PixelPickerMockup() {
  const step = useCycle(3); // 0: second row checked, 1: first row checked, 2: no check
  return (
    <div className="relative flex w-[288px] flex-col overflow-hidden rounded-[16px] bg-white shadow-[0_1px_10px_0_rgba(0,0,0,0.04),inset_0_0_0_1px_rgba(231,231,231,0.5)]">
      <PixelPickerRow className="h-[74px] w-[288px]" />
      <div className="flex h-[74px] w-full items-center justify-between pr-4">
        <div className="flex items-start gap-4 overflow-hidden px-4 py-3">
          <PixelRowIcon className="size-8" />
          <div className="flex flex-col gap-[5px]">
            <div className="flex items-center py-[3px]">
              <p className="text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre text-black">fb.com/mochi</p>
            </div>
            <p className="text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre text-[#6d6d6d]">Updated 18m ago</p>
          </div>
        </div>
      </div>
      <motion.span
        className="absolute right-4 z-[1] flex size-6 items-center justify-center"
        initial={false}
        animate={{ top: step === 1 ? 25 : 99, opacity: step === 2 ? 0 : 1, scale: step === 2 ? 0.8 : 1 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <CheckmarkCircleIcon className="size-[22px]" />
      </motion.span>
    </div>
  );
}

const TOGGLES: { icon: ReactNode; label: string; on: boolean }[] = [
  { icon: <ToggleUserPlusIcon className="size-4" />, label: "Lead", on: true },
  { icon: <ToggleUserCheckIcon className="h-[14px] w-[15px]" />, label: "Qualified Lead", on: false },
  { icon: <ToggleCalendarIcon className="h-[15px] w-[14px]" />, label: "Schedule", on: false },
  { icon: <ToggleCreditCardIcon className="h-[14px] w-[17px]" />, label: "Purchase", on: false },
];

/** Step 3 "Toggle which events fire": four pill rows with a switch (static on the live site). */
export function TogglesMockup() {
  return (
    <div className="flex w-[220px] flex-col items-center gap-2">
      {TOGGLES.map((t) => (
        <div
          key={t.label}
          className="relative flex w-full items-center justify-between overflow-hidden rounded-[48px] bg-white/64 px-3 py-2.5 shadow-[0_1px_6px_0_rgba(0,0,0,0.02)] after:pointer-events-none after:absolute after:inset-0 after:rounded-[48px] after:border after:border-dashed after:border-[#e7e7e7]"
        >
          <div className="flex items-center gap-1.5">
            <span className="flex size-4 items-center justify-center">{t.icon}</span>
            <p className="text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre text-black">{t.label}</p>
          </div>
          <div className={`flex h-5 w-9 items-center overflow-hidden rounded-[12px] p-0.5 ${t.on ? "justify-end bg-[#0082fb]" : "justify-start bg-[#f2f2f2]"}`}>
            <span className="size-4 rounded-full bg-white shadow-[0_1px_2px_0_rgba(16,24,40,0.06),0_1px_3px_0_rgba(16,24,40,0.1)]" />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Step 4 "Hit backfill": status pill toggling between "replaying historical events" and "replayed successfully". */
export function BackfillMockup() {
  const done = useCycle(2) === 1;
  return (
    <motion.div
      layout
      className={`flex items-center justify-center overflow-hidden rounded-[48px] px-3 py-2.5 ${done ? "bg-[rgba(60,190,114,0.12)]" : "bg-[rgba(0,130,251,0.12)]"}`}
      transition={{ duration: 0.3, ease: EASE }}
    >
      <Swap id={done ? "done" : "loading"}>
        <span className="mr-0.5 flex size-4 items-center justify-center">
          {done ? <BackfillCheckIcon className="size-[15px]" /> : <LoadingIcon className="size-[14px] animate-spin" />}
        </span>
        <div className="flex items-center pb-0.5">
          <p className={`text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre ${done ? "text-[#3cbe72]" : "text-[#0082fb]"}`}>
            {done ? "replayed successfully" : "replaying historical events"}
          </p>
        </div>
      </Swap>
    </motion.div>
  );
}

const CARDS = [PlaybookCardA, PlaybookCardB, PlaybookCardC];

/** Step 5 "Brief your media buyer": stack of three playbook cards, the front one cycling to the back. */
export function PlaybookStackMockup() {
  const active = useCycle(3);
  return (
    <div className="relative h-14 w-[304px]">
      {CARDS.map((Card, i) => {
        const depth = (i - active + 3) % 3; // 0 = front
        return (
          <motion.div
            key={i}
            className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-[14px] bg-white shadow-[0_1px_10px_0_rgba(0,0,0,0.04),inset_0_0_0_1px_rgba(231,231,231,0.5)]"
            initial={false}
            animate={{ scale: 1 - depth * 0.1, y: depth * 10, zIndex: 2 - depth }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <Card className="h-14 w-[304px]" />
          </motion.div>
        );
      })}
    </div>
  );
}
