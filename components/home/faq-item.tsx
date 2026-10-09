"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FaqPlusIcon } from "@/components/icons/faq-plus";

const EASE = [0.2, 0, 0, 1] as const;

/**
 * Framer FAQ accordion item ("Desktop/Close" <-> "Desktop/Open").
 * Items toggle independently. Open: bg rgba(0,0,0,.05), border fades out, plus icon rotates 45deg and
 * turns black, answer height animates (~300ms ease-out).
 */
export function FaqItem({ question, answer, defaultOpen = false }: { question: string; answer: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <motion.div
      className="w-full rounded-[20px]"
      initial={false}
      animate={{ backgroundColor: open ? "rgba(0,0,0,0.05)" : "rgba(0,0,0,0)", boxShadow: open ? "inset 0 0 0 0.8px rgba(0,0,0,0)" : "inset 0 0 0 0.8px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-start gap-4 rounded-[20px] p-6 text-left"
      >
        <p className="flex-1 text-[16px] leading-[22.4px] font-medium tracking-[-0.24px] text-black md:text-[18px] md:leading-[25.2px] lg:text-[20px] lg:leading-[28px]">{question}</p>
        <motion.span
          className="flex size-[29px] shrink-0 items-center justify-center"
          initial={false}
          animate={{ rotate: open ? 45 : 0, color: open ? "#000000" : "#a855f7" }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <FaqPlusIcon />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            className="overflow-hidden"
            initial={{ height: 0, marginTop: 0 }}
            animate={{ height: "auto", marginTop: -8 }}
            exit={{ height: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <div className="px-6 pb-6">
              <p className="text-[15px] leading-[21.75px] font-normal tracking-[-0.3px] whitespace-pre-wrap text-gray-800 md:text-[16px] md:leading-[23.2px] md:tracking-[-0.32px] lg:text-[18px] lg:leading-[26.1px] lg:tracking-[-0.36px]">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
