"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { CheckBadgeIcon, QuestionBadgeIcon } from "@/components/icons/middle-icons";
import { APP_URL } from "@/lib/site";

/*
 * /business "Comparison Section": the home section (components/home/comparison-section.tsx + comparison-cards.tsx)
 * with the service-business copy and without the metric tiles under the lists. Spacing and the desktop
 * scroll-linked overlap follow the local home section.
 */

const without = {
  subtitle: "Every enquiry depends on your team being online",
  rows: [
    "Customers wait while your team is busy",
    "The same questions get answered over and over",
    "Customer details get buried in chat history",
    "Your team searches chats to find the next step",
    "Customers leave before getting the right link",
  ],
};

const withMochi = {
  subtitle: "Every enquiry has a clear next step",
  rows: [
    "Mochi answers using your business instructions",
    "Common questions get consistent replies",
    "Mochi asks the details your business needs",
    "Your team can monitor and take over the chat",
    "Qualified customer can book in minutes",
  ],
};

const rowText =
  "text-[15px] font-normal leading-[21.75px] tracking-[-0.3px] text-black whitespace-pre-wrap md:text-[16px] md:leading-[23.2px] md:tracking-[-0.32px] lg:text-[18px] lg:leading-[26.1px] lg:tracking-[-0.36px]";
const labelText =
  "text-[15px] font-medium leading-[22.5px] tracking-[-0.3px] whitespace-pre-wrap md:text-[16px] md:leading-6 md:tracking-[-0.32px]";
const cardHeading =
  "text-balance font-display text-[20px] font-semibold leading-6 tracking-[0.64px] whitespace-pre-wrap md:text-center md:text-[24px] md:leading-[28.8px] lg:text-[32px] lg:leading-[38.4px]";

type MotionStyle = ComponentProps<typeof motion.div>["style"];

function WithoutCard({ style }: { style?: MotionStyle }) {
  return (
    <motion.div
      style={style}
      className="flex w-full flex-col items-center gap-8 overflow-clip rounded-[32px] bg-black/5 px-4 pt-12 pb-4 md:flex-1"
    >
      <div className="flex w-full flex-col gap-2 px-4 md:items-center">
        <div className="opacity-50">
          <h5 className={`${cardHeading} text-black`}>Without Mochi</h5>
        </div>
        <p className={`${labelText} text-black md:text-center`}>{without.subtitle}</p>
      </div>
      <div className="flex w-full flex-col gap-5 px-4">
        {without.rows.map((t) => (
          <div key={t} className="flex w-full items-start gap-3">
            <QuestionBadgeIcon className="h-6 w-6 shrink-0" />
            <p className={`flex-1 ${rowText}`}>{t}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function WithCard({ style }: { style?: MotionStyle }) {
  return (
    <motion.div
      style={style}
      className="flex w-full flex-col gap-8 overflow-clip rounded-[32px] bg-white px-4 pt-12 pb-4 shadow-[0_3px_7px_0_rgba(36,7,65,0.05),0_13px_13px_0_rgba(36,7,65,0.04),0_29px_18px_0_rgba(36,7,65,0.02),0_52px_21px_0_rgba(36,7,65,0.01),0_81px_23px_0_rgba(36,7,65,0),inset_0_0_0_1px_rgba(0,0,0,0.1)] md:flex-1"
    >
      <div className="flex w-full flex-col gap-2 px-4 md:items-center">
        <h5 className={`${cardHeading} text-purple-500`}>With Mochi</h5>
        <p className={`${labelText} text-black md:text-center`}>{withMochi.subtitle}</p>
      </div>
      <div className="flex w-full flex-col gap-5 px-4">
        {withMochi.rows.map((t) => (
          <div key={t} className="flex w-full items-start gap-3">
            <CheckBadgeIcon className="h-6 w-6 shrink-0" />
            <p className={`flex-1 ${rowText}`}>{t}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/**
 * Centred title (CTA under it on phone), then the "Without Mochi" / "With Mochi" cards. Desktop (>= 1200px): the
 * cards are sticky (top 160px) over an 819px scroll target that drives the live overlap: Without shrinks to 0.8,
 * fades to 0.6 and slides 279px right while With slides 272px left on top of it. Tablet / phone are static.
 */
export function BusinessComparison() {
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
    <section className="flex w-full flex-col items-center">
      <Reveal
        y={80}
        className="flex w-full items-center justify-center overflow-clip px-5 pt-12 md:px-8 md:pt-16 lg:px-[100px] lg:pt-[180px]"
      >
        <div className="flex w-full max-w-[1000px] flex-1 flex-col items-center gap-6">
          <h3 className="max-w-[516px] text-center font-display text-[36px] leading-[39.6px] font-semibold tracking-[1.4px] text-balance whitespace-pre-wrap text-ink md:text-[40px] md:leading-[44px] md:tracking-[1.6px] lg:text-[48px] lg:leading-[52.8px]">
            What changes with Mochi
          </h3>
          <Button variant="primaryBig" href={APP_URL} className="md:hidden">
            Start Free Trial
          </Button>
        </div>
      </Reveal>
      <div className="flex w-full flex-col items-center gap-[160px] px-5 py-12 md:px-8 md:pt-12 md:pb-16 lg:px-[100px] lg:pt-16 lg:pb-[180px]">
        <div className="z-[1] flex w-full max-w-[1000px] flex-col items-center gap-8 md:gap-12 lg:sticky lg:top-[160px]">
          <Reveal y={80} className="flex w-full flex-col items-start gap-6 md:flex-row">
            <WithoutCard style={desktop ? { scale: withoutScale, opacity: withoutOpacity, x: withoutX } : undefined} />
            <WithCard style={desktop ? { x: withX } : undefined} />
          </Reveal>
          <div className="hidden md:block">
            <Button variant="primaryBig" href={APP_URL}>
              Start Free Trial
            </Button>
          </div>
        </div>
        <div ref={targetRef} className="pointer-events-none z-[1] hidden h-[819px] w-full overflow-clip lg:block" />
      </div>
    </section>
  );
}
