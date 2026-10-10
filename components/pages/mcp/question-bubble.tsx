"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

/**
 * Looping typewriter used by the question bubbles: type (70ms/char), hold (1.6s), delete (37ms/char),
 * pause (0.5s), repeat; `delay` offsets the first run so the seven bubbles are out of phase like on the live site.
 */
function useLoopingTypewriter(text: string, delay: number) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"wait" | "typing" | "holding" | "deleting" | "pause">("wait");
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    switch (phase) {
      case "wait":
        t = setTimeout(() => setPhase("typing"), delay);
        break;
      case "typing":
        t = count < text.length ? setTimeout(() => setCount((c) => c + 1), 70) : setTimeout(() => setPhase("holding"), 0);
        break;
      case "holding":
        t = setTimeout(() => setPhase("deleting"), 1600);
        break;
      case "deleting":
        t = count > 0 ? setTimeout(() => setCount((c) => c - 1), 37) : setTimeout(() => setPhase("pause"), 0);
        break;
      case "pause":
        t = setTimeout(() => setPhase("typing"), 500);
        break;
    }
    return () => clearTimeout(t);
  }, [phase, count, text, delay]);
  return text.slice(0, count);
}

export type QuestionBubbleProps = {
  text: string;
  avatar: string;
  /** Avatar on the right, bubble tail on the right (the bubbles on the right-hand side). */
  reverse?: boolean;
  delay?: number;
  className?: string;
};

/**
 * Framer "#1".."#7" chat bubbles of the "Questions Section": 32px avatar on a peach gradient, an orange
 * (#da7756) 24px-radius bubble with a 5px tail dot and a typewriter question. Scales in from 0.6 when in view.
 */
export function QuestionBubble({ text, avatar, reverse = false, delay = 0, className = "" }: QuestionBubbleProps) {
  const typed = useLoopingTypewriter(text, delay);
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ scale: 0.6 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ type: "spring", stiffness: 150, damping: 20, mass: 1 }}
    >
      <div className={`flex w-fit items-start gap-0.5 select-none ${reverse ? "flex-row-reverse" : ""}`}>
        <div className="flex shrink-0 items-start pt-4">
          <div className="size-8 shrink-0 overflow-hidden rounded-full bg-[linear-gradient(135deg,#f5a27a,#da7756)]">
            <Image src={avatar} alt="avatar" width={32} height={32} className="size-8 object-cover" />
          </div>
        </div>
        <div className={`flex flex-col items-start gap-2 ${reverse ? "pl-5" : "pr-5"}`}>
          <div className="relative flex min-h-10 items-center rounded-[24px] bg-[#da7756] bg-[linear-gradient(160deg,rgba(255,255,255,0.1)_0%,rgba(0,0,0,0)_55%)] px-3.5 py-[7px]">
            <div aria-hidden className={`absolute top-[35px] size-[5px] rounded-full bg-[#da7756] ${reverse ? "right-px" : "left-px"}`} />
            <span className="flex items-center font-sans text-[16px] leading-5 font-normal tracking-[-0.5px] whitespace-nowrap text-white">
              {typed}
              <span aria-hidden className="ml-0.5 inline-block w-0.5 self-center" />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
