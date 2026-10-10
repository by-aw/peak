"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { motion } from "motion/react";

const BAR = "bg-[linear-gradient(90deg,rgba(227,227,227,0.12)_0%,#e1e1e1_100%)]";
const MSG_SHADOW = "shadow-[0_0_0_0.5px_#e0e0e0,0_1px_2px_0_rgba(0,0,0,0.06),0_1px_4px_0_rgba(0,0,0,0.04)]";

const AVATARS = ["/framer/d1nfVQBSwTWQaYxnwQxGpTSBBCc.png", "/framer/DCxmp7EnShaIGNo3c0w6eqTpM.png", "/framer/ypHbFAiQsLLBnwtFvrdtyfdhY.png"];

/** Skeleton message: short grey bar + gradient bar, vertically centred. */
function SkeletonMessage({ width }: { width: number }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="h-[7px] w-[52px] rounded-2xl bg-[#f0f0f0]" />
      <div className={`h-[7px] max-w-full rounded-2xl ${BAR}`} style={{ width }} />
    </div>
  );
}

/** Spam message: gradient bar + faded text. */
function TextMessage({ width, text }: { width: number; text: string }) {
  return (
    <div className="flex flex-col gap-[10.73px]">
      <div className={`h-2 max-w-full rounded-2xl ${BAR}`} style={{ width }} />
      <p className="text-[13px] leading-[15.6px] font-normal tracking-[-0.22px] text-black opacity-40">{text}</p>
    </div>
  );
}

function Message({ avatar, children, centered = false }: { avatar: string; children: ReactNode; centered?: boolean }) {
  return (
    <div className={`flex w-full gap-4 overflow-hidden rounded-[10px] bg-white p-3 ${centered ? "items-center" : "items-start"} ${MSG_SHADOW}`}>
      <div className="flex h-[39px] shrink-0 items-center">
        <Image src={avatar} alt="" width={140} height={140} className="size-8 rounded-full" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center">{children}</div>
    </div>
  );
}

/**
 * Framer "Card" of the Efficiency section: a 442px-wide inbox panel pinned to the right edge of the
 * card (32px from the left on phones) with a title, three message rows and a fade on its right side.
 */
function InboxPanel({ title, count, children, overlay }: { title: string; count: string; children: ReactNode; overlay?: ReactNode }) {
  return (
    <>
      <div className="absolute top-12 right-0 -bottom-[92px] left-8 flex flex-col overflow-hidden rounded-[14px] bg-white shadow-[0_0_0_0.5px_#e0e0e0,0_1px_2px_0_rgba(0,0,0,0.05),0_4px_12px_0_rgba(0,0,0,0.08)] md:left-auto md:w-[442px]">
        <div className="flex items-center gap-[4.49px] p-[17.95px]">
          <p className="text-[14px] leading-[14px] font-medium tracking-[-0.2px] whitespace-pre text-black opacity-50">{title}</p>
          <p className="text-[15.71px] leading-[15.71px] font-medium tracking-[-0.22px] whitespace-pre text-gray-500 opacity-50">{count}</p>
        </div>
        {overlay}
        <div className="flex flex-col items-center gap-4 p-[17.95px]">{children}</div>
      </div>
      <div aria-hidden className="pointer-events-none absolute top-0 -right-7 -bottom-[29px] w-[257px] bg-[linear-gradient(270deg,#fafafa_0%,rgba(250,250,250,0)_100%)]" />
    </>
  );
}

/** "Message Request [5]": the spam requests get covered by purple "FILTERED" overlays sliding in from the left. */
export function MessageRequestsMockup() {
  return (
    <InboxPanel
      title="Message Request"
      count="[5]"
      overlay={
        <motion.div
          className="absolute inset-x-0 top-[52px] z-[1] flex flex-col items-center gap-4 p-[17.95px]"
          animate={{ x: [-221, -221, 0, 0, 221], opacity: [0, 0, 1, 1, 0] }}
          transition={{ duration: 6, repeat: Infinity, times: [0, 0.35, 0.5, 0.85, 1], ease: "easeInOut" }}
        >
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex h-[63px] w-full items-center justify-center overflow-hidden rounded-[10px] bg-[rgba(253,247,255,0.58)] p-3 backdrop-blur-[2px]">
              <p className="text-[13px] leading-[15.6px] font-medium tracking-[0.39px] whitespace-pre text-[rgba(146,52,235,0.8)]">FILTERED</p>
            </div>
          ))}
        </motion.div>
      }
    >
      <Message avatar={AVATARS[0]} centered>
        <SkeletonMessage width={201} />
      </Message>
      <Message avatar={AVATARS[1]}>
        <TextMessage width={180} text="DM me for collabo!! promo only 💸💸💸" />
      </Message>
      <Message avatar={AVATARS[2]}>
        <TextMessage width={92} text="xk9##Make $800 daily!! click here---" />
      </Message>
    </InboxPanel>
  );
}

/** "Accounts Excluded [12]": personal accounts kept out of the working inbox. */
export function AccountsExcludedMockup() {
  return (
    <InboxPanel title="Accounts Excluded" count="[12]">
      <Message avatar={AVATARS[0]}>
        <TextMessage width={92} text="follow 4 follow?? 👀 👀 check bio bro" />
      </Message>
      <Message avatar={AVATARS[1]} centered>
        <SkeletonMessage width={172} />
      </Message>
      <Message avatar={AVATARS[2]} centered>
        <SkeletonMessage width={125} />
      </Message>
    </InboxPanel>
  );
}
