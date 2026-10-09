"use client";

import Image from "next/image";
import { animate, motion, useInView, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { CheckBadgeIcon, CircleInfoIcon, PlusSmallIcon, QuestionBadgeIcon } from "@/components/icons/middle-icons";
import { APP_URL } from "@/lib/site";

const withoutRows = [
  "Your team only focuses on new messages",
  "You're forgetting to do follow ups",
  "Setters are wasting their time finding old leads",
  "You can't see what your setters are doing",
  "You don't know what created sales",
];

const withRows = [
  "You focus on the qualified leads first",
  "Every follow up happens on time",
  "Conversations stay organized automatically",
  "Holds your setters accountable",
  "See exactly what to do to increase revenue",
];

const withoutMetrics = [
  { label: "Booking Rate", value: "4%" },
  { label: "Booked Calls", value: "40" },
  { label: "Show-Up Rate", value: "55%" },
  { label: "Calls Taken", value: "22" },
];

const withMetrics = [
  { label: "Booking Rate", value: "9%", delta: "5%" },
  { label: "Booked Calls", value: "90", delta: "50" },
  { label: "Show-Up Rate", value: "65%", delta: "10%" },
  { label: "Calls Taken", value: "59", delta: "37" },
];

const rowText = "text-[15px] font-normal leading-[21.75px] tracking-[-0.3px] text-black whitespace-pre-wrap md:text-[16px] md:leading-[23.2px] md:tracking-[-0.32px] lg:text-[18px] lg:leading-[26.1px] lg:tracking-[-0.36px]";
const labelText = "text-[15px] font-medium leading-[22.5px] tracking-[-0.3px] whitespace-pre-wrap md:text-[16px] md:leading-6 md:tracking-[-0.32px]";
const valueText = "text-[24px] font-medium leading-6 tracking-[-0.24px] text-black whitespace-pre-wrap";
const counterText = "font-display text-[32px] font-semibold leading-[38.4px] text-black md:text-[48px] md:leading-[57.6px] lg:text-[40px] lg:leading-[40px]";

/** Framer "Animated Number Counter": counts the numeric part up from 0 once in view. */
function Counter({ prefix, to, suffix }: { prefix: string; to: number; suffix: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, { duration: 1, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, to]);
  return (
    <div className="relative">
      <p className={`${counterText} pointer-events-none opacity-0`} aria-hidden>
        {prefix}
        {to}
        {suffix}
      </p>
      <p ref={ref} className={`${counterText} absolute inset-0 text-left`}>
        {prefix}
        {n}
        {suffix}
      </p>
    </div>
  );
}

function WithoutCard({ className = "", style }: { className?: string; style?: React.ComponentProps<typeof motion.div>["style"] }) {
  return (
    <motion.div
      style={style}
      className={`flex w-full flex-col items-center gap-8 overflow-clip rounded-[32px] bg-black/5 px-4 pb-4 pt-12 md:flex-1 ${className}`}
    >
      <div className="flex w-full flex-col gap-2 px-4 md:items-center">
        <div className="opacity-50">
          <h5 className="font-display text-[20px] font-semibold leading-6 tracking-[0.64px] text-black whitespace-pre-wrap md:text-center md:text-[24px] md:leading-[28.8px] lg:text-[32px] lg:leading-[38.4px]">
            Without Mochi
          </h5>
        </div>
        <p className={`${labelText} text-black md:text-center`}>Your team works for the inbox</p>
      </div>
      <div className="flex w-full flex-col gap-5 px-4">
        {withoutRows.map((t) => (
          <div key={t} className="flex w-full items-start gap-3">
            <QuestionBadgeIcon className="h-6 w-6 shrink-0" />
            <p className={`flex-1 ${rowText}`}>{t}</p>
          </div>
        ))}
      </div>
      <div className="grid w-full grid-cols-2 gap-2">
        {withoutMetrics.map((m) => (
          <div key={m.label} className="flex flex-col gap-3 rounded-[16px] bg-white p-4">
            <p className={`${labelText} text-black`}>{m.label}</p>
            <div className="flex overflow-clip">
              <p className={`flex-1 ${valueText}`}>{m.value}</p>
            </div>
          </div>
        ))}
        <div className="col-span-2 flex flex-col gap-3 rounded-[16px] bg-white p-4">
          <div className="flex items-center justify-between">
            <p className={`flex-1 ${labelText} text-black`}>Cash Collected</p>
            <div className="flex h-6 w-6 items-center justify-center">
              <CircleInfoIcon className="h-4 w-4" />
            </div>
          </div>
          <Counter prefix="$" to={44} suffix="K" />
        </div>
      </div>
    </motion.div>
  );
}

function WithCard({ className = "", style }: { className?: string; style?: React.ComponentProps<typeof motion.div>["style"] }) {
  return (
    <motion.div
      style={style}
      className={`flex w-full flex-col gap-8 overflow-clip rounded-[32px] bg-white px-4 pb-4 pt-12 shadow-[0_3px_7px_0_rgba(36,7,65,0.05),0_13px_13px_0_rgba(36,7,65,0.04),0_29px_18px_0_rgba(36,7,65,0.02),0_52px_21px_0_rgba(36,7,65,0.01),0_81px_23px_0_rgba(36,7,65,0),inset_0_0_0_1px_rgba(0,0,0,0.1)] md:flex-1 ${className}`}
    >
      <div className="flex w-full flex-col gap-2 px-4 md:items-center">
        <h5 className="font-display text-[20px] font-semibold leading-6 tracking-[0.64px] text-purple-500 whitespace-pre-wrap md:text-center md:text-[24px] md:leading-[28.8px] lg:text-[32px] lg:leading-[38.4px]">
          With Mochi
        </h5>
        <p className={`${labelText} text-black md:text-center`}>Now the inbox works for your team</p>
      </div>
      <div className="flex w-full flex-col gap-5 px-4">
        {withRows.map((t) => (
          <div key={t} className="flex w-full items-start gap-3">
            <CheckBadgeIcon className="h-6 w-6 shrink-0" />
            <p className={`flex-1 ${rowText}`}>{t}</p>
          </div>
        ))}
      </div>
      <div className="grid w-full grid-cols-2 gap-2">
        {withMetrics.map((m) => (
          <div key={m.label} className="flex flex-col gap-3 rounded-[16px] bg-white p-4 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]">
            <p className={`${labelText} text-purple-500`}>{m.label}</p>
            <div className="flex items-end justify-between">
              <p className={`flex-1 ${valueText}`}>{m.value}</p>
              <div className="flex items-center rounded-full bg-[rgba(0,188,125,0.15)] p-1">
                <PlusSmallIcon className="h-4 w-4" />
                <p className="pr-1 text-[16px] font-normal leading-4 text-[#009966] whitespace-pre">{m.delta}</p>
              </div>
            </div>
          </div>
        ))}
        <div className="relative col-span-2 flex items-center overflow-hidden rounded-[16px] bg-white p-4 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]">
          <div className="flex flex-1 flex-col gap-3 overflow-clip">
            <p className={`${labelText} text-purple-500`}>Cash Collected</p>
            <Counter prefix="$" to={118} suffix=",0000" />
          </div>
          <div className="pointer-events-none absolute bottom-[-18px] right-1 z-[1] h-[84px] w-[114px]">
            <Image
              src="/framer/9IvVd7hYrirXFxGgTC9U7clLEf0.png"
              alt=""
              width={1254}
              height={1254}
              sizes="114px"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * "Without - With Section" of the Framer "Comparison Section".
 * Desktop (>= 1200px): the cards are sticky (top 160px) and a 819px "scroll target" below drives a
 * scroll-linked animation measured on the live site: Without shrinks to 0.8, fades to 0.6 and slides
 * 279px right while With slides 272px left on top of it. Tablet / phone are static.
 */
export function ComparisonCards() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1200px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start end", "end end"] });
  const withoutScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const withoutOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
  const withoutX = useTransform(scrollYProgress, [0, 1], [0, 279]);
  const withX = useTransform(scrollYProgress, [0, 1], [0, -272]);

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full flex-col items-center gap-[160px] px-5 py-12 md:px-8 md:pb-16 md:pt-12 lg:px-[100px] lg:pb-20 lg:pt-16">
        <div className="z-[1] flex w-full max-w-[1000px] flex-col items-center gap-8 md:gap-12 lg:sticky lg:top-[160px]">
          <Reveal y={80} className="flex w-full flex-col items-start gap-6 md:flex-row">
            <WithoutCard
              style={desktop ? { scale: withoutScale, opacity: withoutOpacity, x: withoutX } : undefined}
            />
            <WithCard style={desktop ? { x: withX } : undefined} />
          </Reveal>
          <div className="hidden md:block">
            <Button
              variant="primaryBig"
              href={APP_URL}
              className="text-[16px] leading-[23.2px] tracking-[-0.32px] lg:text-[18px] lg:leading-[26.1px] lg:tracking-[-0.36px]"
            >
              Start Free Trial
            </Button>
          </div>
        </div>
        <div ref={targetRef} className="pointer-events-none z-[1] hidden h-[819px] w-full overflow-clip lg:block" />
      </div>
    </div>
  );
}
