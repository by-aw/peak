"use client";

import { motion } from "motion/react";
import { Reveal } from "@/components/ui/reveal";
import { RollingButton } from "@/components/shared/rolling-button";
import { CaretDownIcon, ClaudeSparkIcon, PlusIcon, VoiceLineIcon } from "@/components/icons/payments-icons";
import { CheckItem } from "./features";

const CHECKS = ["Works with Claude, ChatGPT, and any AI via MCP", "Reads your live payment data in real time", "Can generate exports and reports on demand", "Understands your team, products, and providers"];

/** Framer "Desktop/3" / "Phone/3": a Claude chat with the user's question, a pulsing "thinking" spark and the composer. */
function ChatMockup() {
  return (
    <div className="flex h-[516px] w-full flex-col justify-between overflow-hidden rounded-[24px] bg-gray-25 pt-6 pb-2 md:h-[576px] md:rounded-[32px] md:pt-[72px] md:pb-0 lg:h-[616px]">
      <div className="flex w-full flex-col gap-6 overflow-clip">
        <div className="flex w-full flex-col items-end px-7">
          <div className="flex items-center rounded-[7px] bg-black px-3.5 py-[7px] opacity-88">
            <p className="font-dm text-[14px] leading-[20px] font-medium tracking-[-0.5px] whitespace-pre-wrap text-white">which setter has the highest close rate?</p>
          </div>
        </div>
        <div className="flex w-full items-center px-7">
          <motion.span
            className="flex h-[22px] w-[23px] items-center justify-center"
            animate={{ scale: [0.76, 1, 0.76] }}
            transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
          >
            <ClaudeSparkIcon className="h-[22px] w-[23px]" />
          </motion.span>
        </div>
      </div>
      <div className="flex w-full flex-col gap-2 p-3">
        <div className="flex w-full flex-col items-center gap-2.5">
          <div className="w-full rounded-[16px] bg-[url(/framer/GhC1na4Yv4zJeyQac5D1brz4dY.jpg)] bg-cover bg-center p-0.5">
            <div className="flex h-[120px] w-full flex-col justify-between overflow-hidden rounded-[14px] bg-white p-[18px]">
              <p className="font-dm text-[13px] leading-[15.6px] font-normal whitespace-pre">
                <span className="text-[rgba(99,94,88,0.32)]">/Mochi</span>
                <span className="text-[#635e58]"> How can I help you today?</span>
              </p>
              <div className="flex w-full items-center justify-between">
                <PlusIcon className="size-4" />
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-0.5">
                    <p className="font-dm text-center text-[12px] leading-[14.4px] font-normal tracking-[-0.36px] whitespace-pre text-[#635e58]">Opus 4.7</p>
                    <CaretDownIcon className="size-3" />
                  </div>
                  <VoiceLineIcon className="size-[18px]" />
                </div>
              </div>
            </div>
          </div>
          <p className="font-dm text-center text-[12px] leading-[15.6px] font-normal whitespace-pre text-[#8c8c8c]">Claude is AI and can make mistakes.</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Framer "AI Section" of /payments: "Ask your business anything" copy, check list and "Check Claude MCP"
 * button next to the chat mockup. 1440x776 / 1024x704 / 390x1197.
 */
export function PaymentsAi() {
  return (
    <section className="relative flex w-full flex-col items-center px-5 py-12 md:px-12 md:py-16 lg:px-[100px] lg:py-20">
      <div className="flex w-full max-w-[1100px] flex-col items-start gap-8 md:flex-row md:items-center md:gap-12">
        <Reveal x={-80} y={0} delay={0.2} className="flex w-full flex-col items-start gap-6 overflow-clip md:flex-1 md:basis-0">
          <div className="flex w-full flex-col gap-3 md:gap-2">
            <h3 className="font-display text-[24px] leading-[28.8px] font-semibold whitespace-pre-wrap text-black md:text-[32px] md:leading-[38.4px] lg:text-[40px] lg:leading-[48px]">Ask your business anything</h3>
            <div className="opacity-80">
              <p className="text-[15px] leading-[22.5px] font-normal tracking-[-0.3px] whitespace-pre-wrap text-ink-3 md:text-[16px] md:leading-[24px] md:tracking-[-0.32px] lg:text-[18px] lg:leading-[27px] lg:tracking-[-0.36px]">
                {
                  'All your payment data lives in Mochi\'s intelligence layer. Connect Claude or ChatGPT and ask anything. "Which product has the highest close rate?" "What\'s Jane\'s commission this month?" "Which leads bought the most this quarter?" Your payments become answers, not just numbers.\n\nBecause payments are connected to leads, you can ask questions no payment dashboard can answer: "which content drove the most revenue?" "what type of lead converts fastest?" The data is already there. Try the examples →'
                }
              </p>
            </div>
          </div>
          <div className="h-0.5 w-full overflow-hidden bg-[#efefef]" />
          <div className="flex flex-col gap-4">
            {CHECKS.map((c) => (
              <CheckItem key={c}>{c}</CheckItem>
            ))}
          </div>
          <RollingButton href="/mcp" size="lg" className="w-full md:w-auto">
            Check Claude MCP
          </RollingButton>
        </Reveal>
        <div className="w-full md:flex-1 md:basis-0">
          <ChatMockup />
        </div>
      </div>
    </section>
  );
}
