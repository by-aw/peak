"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FaqPlusSmallIcon } from "@/components/icons/feature-icons";

const EASE = [0.2, 0, 0, 1] as const;

/**
 * Framer feature-page FAQ item ("Closed" <-> "Open"): white 16px-radius card, 16px 20px padding,
 * question + (when open) gray answer below it, 20px plus icon on the right. Items toggle independently.
 */
export function FeatureFaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full overflow-hidden rounded-[16px] bg-white shadow-[0_1px_0_0_rgba(20,21,26,0.04)]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="group flex w-full cursor-pointer items-start gap-3 px-5 py-4 text-left"
      >
        <div className="flex min-w-0 flex-1 flex-col items-start">
          <p className="text-[15px] leading-[21.75px] font-medium tracking-[-0.15px] whitespace-pre-wrap text-ink-3 transition-colors duration-200 group-hover:text-[#222225] md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px]">
            {question}
          </p>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="answer"
                className="w-full overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <p className="pt-3 text-[15px] leading-[21.75px] font-normal tracking-[-0.15px] whitespace-pre-wrap text-gray-550 md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px]">
                  {answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <FaqPlusSmallIcon className="size-5 shrink-0 text-[#42424a]" />
      </button>
    </div>
  );
}
