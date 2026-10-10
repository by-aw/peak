"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

/**
 * Claude composer mockup of the /mcp hero ("Chat > Top"): a typewriter that alternates between the greeting
 * "/Mochi How can I help you today?" (grey, with a faded "/Mochi" prefix) and a sales question (black).
 * Timing measured on the live site: ~103ms per character typed and deleted, 2.4s hold when complete,
 * 1.5px cursor blinking with a 0.8s step animation.
 */
const GREETING = "How can I help you today?";
const QUESTIONS = [
  "Can you generate a Mochi report for the last 7 days?",
  "What is our deal velocity trend over the last 4 quarters?",
  "How is Sarah performing compared to the rest of the team?",
  "Who are the other top performers on the team?",
];
const SEQUENCE = QUESTIONS.flatMap((q) => [GREETING, q]);
const CHAR_MS = 103;
const HOLD_MS = 2400;

export function ChatTypewriter() {
  const [step, setStep] = useState(0);
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");
  const phrase = SEQUENCE[step % SEQUENCE.length];
  const greeting = phrase === GREETING;

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (count < phrase.length) t = setTimeout(() => setCount((c) => c + 1), CHAR_MS);
      else t = setTimeout(() => setPhase("holding"), 0);
    } else if (phase === "holding") {
      t = setTimeout(() => setPhase("deleting"), HOLD_MS);
    } else {
      if (count > 0) t = setTimeout(() => setCount((c) => c - 1), CHAR_MS);
      else
        t = setTimeout(() => {
          setStep((s) => s + 1);
          setPhase("typing");
        }, 0);
    }
    return () => clearTimeout(t);
  }, [phase, count, phrase]);

  return (
    <span
      className={`inline-flex items-center font-[sans-serif] text-[13px] leading-[1.2] whitespace-nowrap ${greeting ? "text-[#645e58]" : "text-black"}`}
      aria-live="off"
    >
      {greeting && <span className="mr-1 block text-[rgba(100,94,88,0.32)]">/Mochi</span>}
      <span className="block">{phrase.slice(0, count)}</span>
      <motion.span
        aria-hidden
        className="ml-px inline-block h-[13px] w-[1.5px] bg-current align-middle"
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear", times: [0, 0.5, 0.5, 1] }}
      />
    </span>
  );
}
