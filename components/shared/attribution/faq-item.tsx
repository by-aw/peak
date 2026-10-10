"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const EASE = [0.2, 0, 0, 1] as const;

/** Plus (closed) / minus (open) icon used by the attribution FAQ (Framer icon with 1.5 stroke, #42424a). */
function PlusMinus({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden="true" className="shrink-0 text-gray-750">
      <path d="M 3.75 12 L 20.25 12" fill="transparent" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <motion.path
        d="M 12 3.75 L 12 20.25"
        fill="transparent"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={{ opacity: open ? 0 : 1, scaleY: open ? 0 : 1 }}
        style={{ transformOrigin: "12px 12px" }}
        transition={{ duration: 0.25, ease: EASE }}
      />
    </svg>
  );
}

/**
 * Attribution FAQ accordion item (Framer "Closed" <-> "Open"): white card, 16px radius, 1px #e7e7e7
 * line, 1px shadow. The answer (gap 12px) slides open in ~300ms; the plus icon becomes a minus.
 */
export function AttributionFaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative w-full overflow-hidden rounded-[16px] bg-white shadow-[0_1px_0_0_rgba(20,21,26,0.04)] after:pointer-events-none after:absolute after:inset-0 after:rounded-[16px] after:border after:border-gray-150">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex w-full cursor-pointer items-start gap-3 px-5 py-4 text-left">
        <div className="flex flex-1 flex-col items-start gap-3">
          <p className="text-[15px] font-medium leading-[21.75px] tracking-[-0.15px] whitespace-pre-wrap text-ink-3 md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px]">{question}</p>
          <AnimatePresence initial={false}>
            {open ? (
              <motion.div
                key="answer"
                className="w-full overflow-hidden"
                initial={{ height: 0, opacity: 0, marginTop: -12 }}
                animate={{ height: "auto", opacity: 1, marginTop: 0 }}
                exit={{ height: 0, opacity: 0, marginTop: -12 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <p className="text-[15px] font-normal leading-[21.75px] tracking-[-0.15px] whitespace-pre-wrap text-gray-550 md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px]">{answer}</p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        <PlusMinus open={open} />
      </button>
    </div>
  );
}
