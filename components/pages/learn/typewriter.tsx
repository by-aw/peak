"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./typewriter.module.css";

const GREETING = "How can I help you today?";
const PREFIX = "/Mochi";
/** The prompts the /learn chat mockup types out between greetings (order and text as on live). */
const QUERIES = [
  "Why is Sarah booking more calls than Luke?",
  "What happened in the DMs yesterday and did outbound work?",
  "How many qualified leads came in last week and how many of them actually booked a call?",
  "Can you generate a Mochi report for the last 7 days?",
  "What is our deal velocity trend over the last 4 quarters?",
  "How is Sarah performing compared to the rest of the team?",
  "Who are the other top performers on the team?",
];
/** Framer defaults: ms per typed / erased character, and the pauses once the greeting / a prompt is complete. */
const TYPING_MS = 45;
const ERASING_MS = 25;
const GREETING_PAUSE_MS = 2400;
const QUERY_PAUSE_MS = 2800;

type Phase = "typing-greeting" | "hold-greeting" | "erasing-greeting" | "typing-query" | "hold-query" | "erasing-query";

/**
 * Framer "Mochitypewriter" code component ("Chat > Top" of the "AI Reporting Layer" card): types the grey greeting
 * "/Mochi How can I help you today?", holds it, erases it, types one of `QUERIES` in black, holds, erases, and moves on
 * to the next query. 13px, sans-serif. Desktop/tablet render it on one clipped line (line-height 120%); phone uses
 * Framer's "mobile" layout, where long prompts wrap (130%). The caret hides while the greeting is held.
 */
export function Typewriter() {
  const [phase, setPhase] = useState<Phase>("typing-greeting");
  const [query, setQuery] = useState(0);
  const [count, setCount] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const clear = () => {
      if (timer.current) {
        clearTimeout(timer.current);
        clearInterval(timer.current);
        timer.current = null;
      }
    };
    clear();
    if (phase === "typing-greeting") {
      let n = 0;
      timer.current = setInterval(() => {
        n += 1;
        setCount(n);
        if (n >= GREETING.length) {
          clear();
          setPhase("hold-greeting");
        }
      }, TYPING_MS);
    } else if (phase === "hold-greeting") {
      timer.current = setTimeout(() => setPhase("erasing-greeting"), GREETING_PAUSE_MS);
    } else if (phase === "erasing-greeting") {
      let n = GREETING.length;
      timer.current = setInterval(() => {
        n -= 1;
        setCount(n);
        if (n <= 0) {
          clear();
          setPhase("typing-query");
        }
      }, ERASING_MS);
    } else if (phase === "typing-query") {
      const text = QUERIES[query] ?? "";
      let n = 0;
      timer.current = setInterval(() => {
        n += 1;
        setCount(n);
        if (n >= text.length) {
          clear();
          setPhase("hold-query");
        }
      }, TYPING_MS);
    } else if (phase === "hold-query") {
      timer.current = setTimeout(() => setPhase("erasing-query"), QUERY_PAUSE_MS);
    } else {
      let n = (QUERIES[query] ?? "").length;
      timer.current = setInterval(() => {
        n -= 1;
        setCount(n);
        if (n <= 0) {
          clear();
          setQuery((q) => (q + 1) % QUERIES.length);
          setPhase("typing-greeting");
        }
      }, ERASING_MS);
    }
    return clear;
  }, [phase, query]);

  const greeting = phase === "typing-greeting" || phase === "hold-greeting" || phase === "erasing-greeting";
  const text = greeting ? GREETING.slice(0, count) : (QUERIES[query] ?? "").slice(0, count);
  const caret = phase !== "hold-greeting";
  const ink = greeting ? "rgba(100, 94, 88, 1)" : "#000";

  return (
    <div className="flex h-full w-full items-center overflow-hidden">
      <span className="inline w-full text-start font-[sans-serif] text-[13px] leading-[130%] break-words whitespace-normal md:inline-flex md:w-auto md:items-center md:leading-[120%] md:whitespace-nowrap">
        {greeting && <span className="mr-1 text-[rgba(100,94,88,0.32)]">{PREFIX}</span>}
        <span style={{ color: ink }}>{text}</span>
        {caret && <span aria-hidden className={`ml-px inline-block h-[13px] w-[1.5px] align-middle ${styles.caret}`} style={{ backgroundColor: ink }} />}
      </span>
    </div>
  );
}
