"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Reveal } from "@/components/ui/reveal";
import { CONTAINER, WRAPPER, line } from "@/components/shared/attribution/grid";
import { MetricsLineIcon } from "@/components/icons/attribution-icons";

/* Alternating dark / 50% segments of the Framer rich text. */
const SEGMENTS: { text: string; muted: boolean }[] = [
  { text: "Track links", muted: false },
  { text: "inside DMs.", muted: true },
  { text: "Track behavior", muted: false },
  { text: "on your website.", muted: true },
  { text: "Track which automations convert.", muted: false },
  { text: "One platform, full lifecycle.", muted: true },
];

const METRICS: { value: number | string; label: string }[] = [
  { value: 34409407, label: "DMs tracked" },
  { value: 5454291, label: "Leads managed" },
  { value: "100+", label: "Coaching businesses" },
  { value: "74.8%", label: "Avg. link click rate" },
];

/** Counts from 0 to `value` (~0.85s, ease-out) the first time the number scrolls into view. */
function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 850;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return <span ref={ref}>{n.toLocaleString("en-US")}</span>;
}

/**
 * Framer "Metrics Section": grey (#fafafa) panel inside the grid with the word-by-word blurred-in statement,
 * the four counters, the outlined "See it in action" pill and the short vertical line.
 */
export function MetricsSection() {
  return (
    <section className="flex w-full flex-col items-center">
      <div className={WRAPPER}>
        <div className={`${CONTAINER} ${line("after:border-x")} flex flex-col items-center py-12 md:py-16 lg:py-20`}>
          <div className={`${line("after:border")} flex w-full flex-col items-center gap-8 overflow-hidden bg-gray-25 pt-8 md:gap-10 md:pt-14 lg:gap-14`}>
            <motion.p
              className="w-full max-w-[754px] px-1 text-center font-display text-[20px] leading-[24px] font-medium tracking-[0.4px] text-ink-3 md:px-0 md:text-[24px] md:leading-[28.8px] md:tracking-[0.48px] lg:text-[32px] lg:leading-[38.4px] lg:tracking-[0.64px]"
              initial={{ opacity: 0, y: 48, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 60, damping: 16, mass: 1 }}
            >
              {SEGMENTS.map((s, i) => (
                <span key={s.text} className={s.muted ? "text-ink-3/50" : "text-ink-3"}>
                  {s.text}
                  {i < SEGMENTS.length - 1 ? " " : ""}
                </span>
              ))}
            </motion.p>
            <Reveal y={64} delay={0.2} className={`${line("after:border-y")} grid w-full grid-cols-2 bg-white md:flex md:flex-row md:items-center`}>
              {METRICS.map((m, i) => (
                <div
                  key={m.label}
                  className={`flex flex-col items-center justify-center py-8 md:flex-1 md:basis-0 ${
                    i === 3 ? "" : i === 1 ? "md:relative md:after:pointer-events-none md:after:absolute md:after:inset-0 md:after:border-r md:after:border-[#ddd]" : "relative after:pointer-events-none after:absolute after:inset-0 after:border-r after:border-[#ddd]"
                  }`}
                >
                  <div className="flex w-full flex-col items-center gap-2">
                    <h3 className="text-center font-display text-[24px] leading-[28.8px] font-semibold text-black md:text-[32px] md:leading-[38.4px] lg:text-[40px] lg:leading-[48px]">
                      {typeof m.value === "number" ? <Counter value={m.value} /> : m.value}
                    </h3>
                    <p className="text-center text-[14px] leading-[18.2px] font-normal whitespace-pre-wrap text-gray-550 md:leading-[16.8px]">{m.label}</p>
                  </div>
                </div>
              ))}
            </Reveal>
            <Reveal y={64} delay={0.2} className="relative flex items-center justify-center rounded-[64px] px-6 py-4 after:pointer-events-none after:absolute after:inset-0 after:rounded-[64px] after:border after:border-[#797979]">
              <p className="text-[15px] leading-[21.75px] font-medium tracking-[-0.15px] whitespace-pre text-[rgba(82,82,82,0.8)] md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px]">See it in action</p>
            </Reveal>
            <div className="h-[74px] w-[3px] shrink-0">
              <MetricsLineIcon />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
