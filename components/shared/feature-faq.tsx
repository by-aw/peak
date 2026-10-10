"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FaqToggleIcon } from "@/components/icons/feature-icons";
import { Reveal } from "@/components/ui/reveal";

export type FaqEntry = { question: string; answer: string };

const EASE = [0.2, 0, 0, 1] as const;

/**
 * Framer FAQ item of the feature pages ("Closed" <-> "Open"): white 16px-radius card with a hairline
 * border, question + plus icon; the answer slides open underneath (12px gap) and the plus becomes a minus.
 * Hovering the question greys the text.
 */
export function FeatureFaqItem({ question, answer, defaultOpen = false }: FaqEntry & { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="w-full rounded-[16px] bg-white shadow-[0_1px_0_0_rgba(20,21,26,0.04),inset_0_0_0_1px_#e7e7e7]">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex w-full cursor-pointer items-start gap-3 px-5 py-4 text-left">
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <p className="text-[15px] leading-[21.75px] font-medium tracking-[-0.15px] text-ink-3 transition-colors duration-200 hover:text-[rgba(169,169,169,0.8)] md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px]">
            {question}
          </p>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="answer"
                className="overflow-hidden"
                initial={{ height: 0, marginTop: -12, opacity: 0 }}
                animate={{ height: "auto", marginTop: 0, opacity: 1 }}
                exit={{ height: 0, marginTop: -12, opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <p className="text-[15px] leading-[21.75px] font-normal tracking-[-0.15px] whitespace-pre-wrap text-gray-550 md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px]">
                  {answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <FaqToggleIcon open={open} />
      </button>
    </div>
  );
}

/**
 * Framer "FAQ Section" of the feature-page template: "Frequently Asked / Questions" heading, a 700px
 * column of accordion items and a cloud strip fading in at the bottom of the section. The heading and the
 * list each fade/slide in (y 48) when scrolled into view, like the Framer template.
 */
export function FeatureFaq({
  items,
  clouds = true,
  className = "",
  animate = true,
}: {
  items: FaqEntry[];
  /** Appear animation (fade + slide up) of the heading and the list; the live template has it on every feature page. */
  animate?: boolean;
  /** The cloud strip at the bottom of the section (the integration pages /meta-ads, /payments have none). */
  clouds?: boolean;
  /** Extra classes for the padded wrapper (e.g. `pt-0` on pages whose phone layout has no top padding). */
  className?: string;
}) {
  const heading = (
    <h2 className="text-center font-display text-[32px] leading-[32px] font-semibold text-black md:text-[40px] md:leading-[40px] lg:text-[48px] lg:leading-[48px]">
      Frequently Asked <span className="text-gray-550">Questions</span>
    </h2>
  );
  const list = items.map((item) => <FeatureFaqItem key={item.question} {...item} />);
  return (
    <section className="relative flex w-full flex-col items-center overflow-clip" aria-label="Frequently asked questions">
      <div className={`flex w-full flex-col items-center overflow-clip px-5 py-12 md:px-12 md:py-16 lg:px-[100px] lg:py-20 ${className}`.trim()}>
        <div className="relative z-[1] flex w-full max-w-[1000px] flex-col items-center gap-10 overflow-clip md:gap-16">
          {animate ? (
            <Reveal y={48} delay={0.2} className="flex w-full flex-col gap-2 md:w-[468px]">
              {heading}
            </Reveal>
          ) : (
            <div className="flex w-full flex-col gap-2 md:w-[468px]">{heading}</div>
          )}
          {animate ? (
            <Reveal y={48} delay={0.2} className="flex w-full max-w-[700px] flex-col items-center gap-2 overflow-clip">
              {list}
            </Reveal>
          ) : (
            <div className="flex w-full max-w-[700px] flex-col items-center gap-2 overflow-clip">{list}</div>
          )}
        </div>
      </div>
      {clouds && (
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[312px] overflow-hidden [mask-image:linear-gradient(181deg,rgba(0,0,0,0)_0%,#000_100%)]">
          <Image src="/framer/3fb6w8IKfGgJQqarb2yoBkkYhw.png" alt="" width={2398} height={624} sizes="100vw" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      )}
    </section>
  );
}
