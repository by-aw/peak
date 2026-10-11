"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ReplayCounter } from "@/components/pages/vsl/counters";
import { TopVector } from "@/components/pages/vsl/icons";
import { INTER_ALT } from "@/components/pages/vsl/styles";

/** Text appear of the card (Framer `__framer__targets` on the flip container): 0.6s tween, ease [0.25, 1, 0.5, 1]. */
const TEXT_EASE = [0.25, 1, 0.5, 1] as const;
const textTransition = { duration: 0.6, ease: TEXT_EASE };
const SHOWN = { opacity: 1, scale: 1, y: 0 };

/** Dark translucent pill (1px #49494933 hairline, 6px backdrop blur). */
const pill = "flex w-max items-center justify-center gap-2 rounded-[32px] bg-[#4949491a] shadow-[inset_0_0_0_1px_#49494933] backdrop-blur-[6px]";
const pillTopText = "text-[13px] leading-[16.9px] font-medium tracking-[2.08px] whitespace-pre text-white uppercase opacity-80";
const cardLabel = "text-center text-[14px] leading-[18.2px] font-normal tracking-[1.12px] whitespace-pre text-white opacity-72";
const cardValue = "text-[48px] leading-[62.4px] font-bold whitespace-pre";
const operator = "absolute hidden text-[48px] leading-[43.2px] font-medium whitespace-pre text-[#ee2b2b] md:block";

/**
 * Framer "Cost Calculator" (front face of the /vsl flip card, `the cost of doing nothing`): a 100vh dark red card
 * (113deg #410e0e -> #0a0a0a) whose layers are all absolutely positioned like in Framer:
 *
 * - a 1861px "Black Gradient" image (top -238px) and the 1091px "Money Drop" image at 24% opacity (top -157px), both
 *   centred (full bleed on phone, the money 24px in from the sides); the money loops between rest and
 *   (50% opacity, scale 0.8, y -40) every 16s (mirrored) and drifts down 4% of the page scroll (Framer parallax 96).
 * - the translucent red wedge across the top, the "the cost of doing nothing" badge (top 104px, 88px on phone),
 *   four upside-down pills (REPLY LAG / CASH BURN / PIPELINE BURN / DEAL LEADS) in a 993px row at top 139px.
 * - the text stack at top 201px: "And you're losing money.", the $/mo counter (Clash Display 700 104px, 46px on phone,
 *   red glow; counts 23,620 -> 200,000 over 1.5s whenever 40% in view) and the subline. They scale/slide in (0.6s)
 *   once the flip container's top passes the middle of the screen (`shown`), and hide again above it.
 * - the paragraph and the three pills 181px from the bottom, and the tilted AOV x LOST LEADS = LOST PER WEEK cards
 *   (only LOST PER WEEK on phone, centred 74px from the bottom of its 315px box) 64px below the card's bottom edge.
 */
export function CostCalculator({ shown }: { shown: boolean }) {
  const { scrollY } = useScroll();
  // Framer parallax with speed 96: the layer moves 4% of the scroll distance down.
  const parallaxY = useTransform(scrollY, (v) => v * 0.04);
  return (
    <div className="relative z-[2] flex h-full w-full flex-1 flex-col items-center justify-center overflow-clip">
      <div className="relative flex h-full w-full flex-1 flex-col items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-0 md:inset-auto md:top-[-238px] md:left-1/2 md:aspect-[1.45846] md:w-[1861px] md:-translate-x-1/2">
          <Image src="/framer/VjkQoOFz13oQmzzp5y0b6LgjXg.png" alt="" fill sizes="(max-width: 809px) 100vw, 1861px" className="object-cover" />
        </div>
        <MoneyDrop y={parallaxY} />
        <TopVector className="absolute top-[-48px] right-[-24px] left-[-24px] z-[1] h-[124px] md:top-[-6px] md:right-[-86px] md:left-[38px]" />

        <div className="absolute top-[88px] left-1/2 z-[1] flex w-max -translate-x-1/2 items-center justify-center overflow-clip rounded-[32px] bg-[#e625251a] px-5 py-2.5 shadow-[0_18px_41px_#8700091a,0_14px_88px_#8700091f,inset_0_0_0_1px_#e6252533] md:top-[104px]">
          <p className="text-[13px] leading-[16.9px] font-medium tracking-[1.3px] whitespace-pre text-[#e62525] uppercase">the cost of doing nothing</p>
        </div>

        <div className="absolute top-[139px] right-5 left-5 z-[1] h-[60px] opacity-80 md:right-auto md:left-[calc(50%-496.5px)] md:w-[993px]">
          <div className={`absolute top-[47%] -right-[45px] -translate-y-1/2 rotate-[172deg] px-4 py-2 md:right-auto md:left-[218px] ${pill}`}>
            <p className={pillTopText}>REPLY LAG</p>
          </div>
          <div className={`absolute -bottom-px -left-[82px] rotate-[-176deg] px-4 py-2 md:left-[654px] ${pill}`}>
            <p className={pillTopText}>CASH BURN</p>
          </div>
          <div className={`absolute top-[5px] left-px rotate-[-175deg] px-4 py-2 ${pill}`}>
            <p className={pillTopText}>PIPELINE BURN</p>
          </div>
          <div className={`absolute top-[43%] right-[73px] -translate-y-1/2 rotate-[169deg] px-4 py-2 md:top-[47%] md:-right-[15px] ${pill}`}>
            <p className={pillTopText}>DEAL LEADS</p>
          </div>
        </div>

        <div className="absolute top-[201px] right-5 left-5 z-[1] flex flex-col items-center gap-1.5 md:right-auto md:left-1/2 md:w-min md:-translate-x-1/2 md:gap-1">
          <motion.p
            initial={false}
            animate={shown ? SHOWN : { opacity: 0, scale: 0.8, y: 48 }}
            transition={textTransition}
            className="w-full text-center text-[32px] leading-[41.6px] font-semibold tracking-[-1.6px] whitespace-pre-wrap text-[#e62525] md:w-auto md:text-[48px] md:leading-[62.4px] md:tracking-[-2.4px] md:whitespace-pre"
          >
            And you’re losing money.
          </motion.p>
          <motion.div initial={false} animate={shown ? SHOWN : { opacity: 0, scale: 0.4, y: 72 }} transition={textTransition} className="w-full md:w-auto">
            <ReplayCounter
              start={23620}
              end={200000}
              duration={1.5}
              prefix="$"
              suffix="/mo"
              className="font-display text-[46px] leading-[1.3] font-bold text-[#ee2b2b] md:text-[104px]"
              style={{ textShadow: "0px 4px 50px rgb(135, 1, 10), 0px 0px 25px rgb(135, 1, 10)" }}
            />
          </motion.div>
          <motion.p
            initial={false}
            animate={shown ? SHOWN : { opacity: 0, scale: 0.4, y: 72 }}
            transition={textTransition}
            className={`w-full text-center text-[14px] leading-[18.2px] font-normal whitespace-pre-wrap text-white md:w-auto md:text-left md:leading-[16.8px] md:whitespace-pre ${INTER_ALT}`}
          >
            in revenue you&apos;re leaving on the table — and you don&apos;t even know it.
          </motion.p>
        </div>

        <div className="absolute right-5 bottom-[181px] left-5 z-[1] flex flex-col items-center gap-8 overflow-clip md:right-auto md:left-1/2 md:w-min md:-translate-x-1/2">
          <div className="flex w-full flex-col items-center overflow-clip md:w-auto md:self-stretch">
            <p className="w-full max-w-[608px] text-center text-[19px] leading-[28.5px] font-normal whitespace-pre-wrap text-white opacity-60 [font-feature-settings:'blwf','cv09','cv03','cv04','cv11']">
              If your average deal is $5,000 and just 10 leads slip through the cracks every week — slow replies, missed follow-ups, leads going cold overnight
              — here&apos;s what that looks like.
            </p>
          </div>
          <div className="flex w-min items-center gap-3">
            {["SAME TRAFFIC. SAME OFFER.", "LEADS STILL HIT THE INBOX", "THEY JUST DIE IN THE DELAY"].map((t) => (
              <div key={t} className={`relative px-6 py-3 ${pill}`}>
                <p className="text-[14px] leading-[18.2px] font-medium tracking-[2.24px] whitespace-pre text-white uppercase">{t}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute right-4 bottom-[-64px] left-4 z-[1] h-[315px] md:right-auto md:left-[calc(50%-578px)] md:w-[1156px]">
          <div className="absolute bottom-[74px] left-1/2 flex w-min -translate-x-1/2 rotate-[-19deg] flex-col items-center gap-[15px] rounded-[32px] bg-[#ee2b2b14] px-12 py-8 shadow-[0_18px_41px_#8700091a,0_14px_88px_#8700091f,inset_0_0_0_0.8px_#ee2b2b99] backdrop-blur-[4px] md:top-[49px] md:bottom-auto md:left-[836px] md:translate-x-0">
            <p className={cardLabel}>LOST PER WEEK</p>
            <p className={`${cardValue} text-[#ee2b2b]`}>$50,000</p>
          </div>
          <p className={`${operator} top-[146px] left-[362px]`}>x</p>
          <p className={`${operator} top-[147px] left-[779px]`}>=</p>
          <div className="absolute top-[68px] left-[15px] hidden w-[303px] rotate-[-10deg] flex-col items-center gap-[15px] rounded-[32px] bg-[#49494914] px-12 py-8 shadow-[0_4px_16px_#8700090a,0_7px_32px_#8700090f,inset_0_0_0_0.8px_#49494999] backdrop-blur-[4px] md:flex">
            <p className={cardLabel}>YOUR AOV</p>
            <p className={`${cardValue} text-white`}>$5,000</p>
          </div>
          <div className="absolute top-[124px] left-1/2 hidden w-[303px] -translate-x-1/2 rotate-[13deg] flex-col items-center gap-[15px] rounded-[32px] bg-[#49494914] px-12 py-8 shadow-[0_4px_16px_#8700090a,0_7px_32px_#8700090f,inset_0_0_0_0.8px_#49494999] md:flex">
            <p className={cardLabel}>LOST LEADS/WEEK</p>
            <p className={`${cardValue} text-white`}>10</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Framer "Money Drop": 24% opacity, a 16s mirrored loop to (opacity x0.5, scale 0.8, y -40), plus the scroll parallax. */
function MoneyDrop({ y }: { y: MotionValue<number> }) {
  return (
    <motion.div
      style={{ y }}
      className="pointer-events-none absolute inset-y-0 right-6 left-6 z-[1] opacity-24 md:inset-auto md:top-[-157px] md:left-1/2 md:aspect-[0.978475] md:w-[1091px] md:-translate-x-1/2"
    >
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [1, 0.5], scale: [1, 0.8], y: [0, -40] }}
        transition={{ duration: 16, ease: [0.27, 0, 0.51, 1], repeat: Infinity, repeatType: "mirror" }}
      >
        <Image src="/framer/K8Q0WnxbnxQkBdQReoUOfpBEXog.png" alt="" fill sizes="(max-width: 809px) calc(100vw - 48px), 1091px" className="object-cover" />
      </motion.div>
    </motion.div>
  );
}
