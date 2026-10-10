"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { MochiSmallIcon, TickIcon } from "@/components/icons/reply-agent-icons";
import { TextStack, cardShadow } from "./mockup-primitives";

const CONVOS = [
  { question: "how much does it cost?", pick: 0, reply: "Great question — our program starts at $2,000 and most clients see 3x ROI in 90 days. Worth a quick call?" },
  { question: "I need to think about it.", pick: 1, reply: "I get that! Quick question — what would need to be true for you to feel confident moving forward?" },
];

/** typing dots -> question + "AI reading..." -> options slide in -> one gets picked -> reply sent */
const STEPS: [string, number][] = [
  ["typing", 900],
  ["reading", 900],
  ["options", 900],
  ["picked", 900],
  ["sent", 2400],
];

const EASE = [0.2, 0, 0, 1] as const;

/**
 * "A/B Testing Built In" chat card. Framer cycles through ten component variants; this replays the same loop:
 * two conversations, each going through typing / reading / options / selection / sent phases.
 */
export function AbTestCard() {
  const [convo, setConvo] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => {
      if (step === STEPS.length - 1) {
        setStep(0);
        setConvo((c) => (c + 1) % CONVOS.length);
      } else {
        setStep(step + 1);
      }
    }, STEPS[step][1]);
    return () => clearTimeout(t);
  }, [step]);

  const phase = STEPS[step][0];
  const c = CONVOS[convo];
  const showQuestion = phase !== "typing";
  const showReading = phase === "reading" || phase === "options";
  const showOptions = phase === "options" || phase === "picked" || phase === "sent";
  const picked = phase === "picked" || phase === "sent" ? c.pick : null;
  const showReply = phase === "sent";

  return (
    <div className={`flex w-full flex-col items-start overflow-hidden rounded-[16px] bg-white ${cardShadow}`}>
      <div className="flex w-full flex-col items-start gap-6 px-5 py-6">
        <div className="flex w-full flex-col items-start gap-4">
          <div className="flex w-full flex-col items-start gap-3">
            <div className="flex h-[38px] w-full flex-col justify-center rounded-tl-[6px] rounded-tr-[12px] rounded-b-[12px] px-3 inset-ring-1 inset-ring-[#e0e0e0]">
              {showQuestion ? (
                <motion.p
                  key={`q${convo}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-[14px] leading-[24px] font-normal tracking-[-0.2px] whitespace-pre-wrap text-black"
                >
                  {c.question}
                </motion.p>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src="/framer/srB0z1bIUhgLtJnMcrJNHQ4PU.gif" alt="" width={54} height={24} className="block h-6 w-[54px] object-cover" />
              )}
            </div>
            <motion.div
              className="flex items-center gap-2"
              initial={false}
              animate={{ opacity: showReading ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            >
              <MochiSmallIcon />
              <span className="text-[10px] leading-[10.5px] font-medium tracking-[-0.2px] whitespace-pre text-[#8d8d8d]">AI reading...</span>
            </motion.div>
          </div>
          <motion.div
            className="flex w-full flex-col items-start gap-[6px]"
            initial={false}
            animate={{ opacity: showOptions ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            {(["A", "B"] as const).map((letter, i) => {
              const isPicked = picked === i;
              const dim = picked !== null && !isPicked;
              return (
                <motion.div
                  key={letter}
                  className="relative z-[1] flex w-full items-center gap-6 rounded-[8px] px-3 py-[14px] inset-ring-1"
                  initial={false}
                  animate={{
                    x: showOptions ? 0 : -194,
                    opacity: dim ? 0.4 : 0.8,
                    backgroundColor: isPicked ? "rgba(16,185,129,0.1)" : "#fafafa",
                    "--tw-inset-ring-color": isPicked ? "#10b981" : "#e0e0e0",
                  }}
                  transition={{ duration: 0.45, ease: EASE, delay: showOptions ? i * 0.08 : 0 }}
                >
                  <span className="flex min-w-0 flex-1 items-start gap-2">
                    <span className="flex size-[19px] items-center justify-center rounded-full p-[6px] inset-ring-1 inset-ring-[#ddd]">
                      <span className="text-[10px] leading-[20px] font-normal tracking-[-0.2px] whitespace-pre text-[#c7c7c7]">{letter}</span>
                    </span>
                    <TextStack className={isPicked ? "opacity-80" : ""} />
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
          <motion.div
            className="flex w-full items-end gap-2"
            initial={false}
            animate={{ opacity: showReply ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <MochiSmallIcon className="shrink-0" />
            <div className="flex min-w-0 flex-1 flex-col items-start gap-[6px]">
              <div className="flex w-full items-center gap-6 rounded-[8px] bg-[rgba(16,185,129,0.1)] px-3 py-[14px] opacity-80 inset-ring-1 inset-ring-[#10b981]">
                <p className="flex-1 text-[10px] leading-[18px] font-normal tracking-[-0.2px] whitespace-pre-wrap text-[#3f3f3f]">{c.reply}</p>
              </div>
            </div>
            <span className="flex items-center gap-[2px]">
              <span className="text-[10px] leading-[18px] font-normal tracking-[-0.2px] whitespace-pre text-[#10b981]">Sent</span>
              <span className="flex size-[14px] items-center justify-center pb-0.5">
                <TickIcon />
              </span>
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
