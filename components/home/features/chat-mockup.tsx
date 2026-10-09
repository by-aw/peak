"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, animate } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { FeatIcon } from "./sprite";

/**
 * Features 2-4 share one Instagram DM mockup that tells a continuous story:
 *   2 "Automations"      – story reply "START" -> automated card + follow-up question
 *   3 "AI Agent"         – lead answers, Mochi suggests a reply, setter sends it
 *   4 "AI Voice Cloning" – booking chat, typed reply converted into a voice note
 * Each feature plays a timed sequence (timings measured on the live site) when it becomes active.
 * Older messages are scrolled out of view by anchoring the column to a block ("anchor"), like Framer does.
 */

export type ChatFeature = 2 | 3 | 4;

type BlockId = "story" | "auto" | "u1" | "m1" | "u2" | "m2" | "u3" | "m3";

type View = {
  anchor: BlockId;
  blocks: BlockId[];
  /** state of the automation block (feature 2) */
  auto: { card: boolean; typing: boolean; question: boolean; sentBy: boolean };
  u2Typing: boolean;
  m3Player: boolean;
  composer: null | { kind: "suggest" | "voice"; text: boolean };
  tap: boolean;
};

type Step = { at: number; patch: (v: View) => View };

const FULL_AUTO = { card: true, typing: false, question: true, sentBy: true };

const INITIAL: Record<ChatFeature, View> = {
  2: { anchor: "story", blocks: ["story"], auto: { card: false, typing: true, question: false, sentBy: false }, u2Typing: false, m3Player: false, composer: null, tap: false },
  3: { anchor: "story", blocks: ["story", "auto"], auto: FULL_AUTO, u2Typing: false, m3Player: false, composer: null, tap: false },
  4: { anchor: "u1", blocks: ["story", "auto", "u1", "m1", "u2"], auto: FULL_AUTO, u2Typing: true, m3Player: false, composer: null, tap: false },
};

const STEPS: Record<ChatFeature, Step[]> = {
  // "Desktop 2 - 1..6": story -> typing -> card -> typing -> question -> "Sent by Mochi"
  2: [
    { at: 900, patch: (v) => ({ ...v, blocks: ["story", "auto"] }) },
    { at: 1750, patch: (v) => ({ ...v, auto: { card: true, typing: false, question: false, sentBy: false } }) },
    { at: 3050, patch: (v) => ({ ...v, auto: { ...v.auto, typing: true } }) },
    { at: 4300, patch: (v) => ({ ...v, auto: { ...v.auto, typing: false, question: true } }) },
    { at: 5350, patch: (v) => ({ ...v, auto: { ...v.auto, sentBy: true } }) },
  ],
  // "Desktop 3 - 1..8": scroll up -> lead replies -> suggestion box -> tap "Direct Answer" -> scroll -> reply sent -> box collapses
  3: [
    { at: 700, patch: (v) => ({ ...v, anchor: "auto" }) },
    { at: 2000, patch: (v) => ({ ...v, blocks: [...v.blocks, "u1"] }) },
    { at: 3300, patch: (v) => ({ ...v, composer: { kind: "suggest", text: true } }) },
    { at: 4600, patch: (v) => ({ ...v, tap: true }) },
    { at: 5450, patch: (v) => ({ ...v, anchor: "u1", tap: false }) },
    { at: 6250, patch: (v) => ({ ...v, blocks: [...v.blocks, "m1"] }) },
    { at: 7100, patch: (v) => ({ ...v, composer: { kind: "suggest", text: false } }) },
  ],
  // "Desktop 4 - 0..8": typing -> reply -> booking question -> scroll + lead replies -> reply + "Generating voice" -> scroll + voice composer -> box collapses -> voice note
  4: [
    { at: 950, patch: (v) => ({ ...v, u2Typing: false }) },
    { at: 1800, patch: (v) => ({ ...v, blocks: [...v.blocks, "m2"] }) },
    { at: 3100, patch: (v) => ({ ...v, anchor: "m1", blocks: [...v.blocks, "u3"] }) },
    { at: 4450, patch: (v) => ({ ...v, blocks: [...v.blocks, "m3"] }) },
    { at: 7100, patch: (v) => ({ ...v, anchor: "u2", composer: { kind: "voice", text: true } }) },
    { at: 9750, patch: (v) => ({ ...v, composer: { kind: "voice", text: false } }) },
    { at: 11000, patch: (v) => ({ ...v, m3Player: true }) },
  ],
};

const PURPLE = "#cb30e0";
const spring = { type: "spring", stiffness: 260, damping: 28 } as const;
const enter = { initial: { opacity: 0, y: 24, scale: 0.94 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, scale: 0.9, transition: { duration: 0.15 } }, transition: spring };

/* ---------- small pieces ---------- */

function TypingDots({ color, size = 6, gap = 4 }: { color: string; size?: number; gap?: number }) {
  return (
    <span className="flex items-center" style={{ gap }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block rounded-full"
          style={{ width: size, height: size, background: color }}
          animate={{ y: [0, -3, 0], opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
        />
      ))}
    </span>
  );
}

/** Grey tail (bottom-left) of an incoming bubble */
function GreyTail() {
  return <FeatIcon id="feat-Bubble" className="absolute bottom-0 -left-1.5 z-10 h-[13px] w-[17px]" />;
}
/** Purple dots tail (bottom-right) of an outgoing bubble */
function PurpleTail() {
  return (
    <span className="absolute -right-1.5 bottom-0 z-10 h-[13px] w-[17px]">
      <span className="absolute top-0 left-0 size-3 rounded-full" style={{ background: PURPLE }} />
      <span className="absolute top-[9px] left-[13px] size-1 rounded-full" style={{ background: PURPLE }} />
    </span>
  );
}

function GreyBubble({ children, tail }: { children: ReactNode; tail?: boolean }) {
  return (
    <div className="relative flex w-full">
      <div className="flex-1 rounded-[20px] bg-[#f2f2f7] px-3.5 py-2.5">
        <p className="text-[14.5px] leading-5 font-normal tracking-[-0.23px] text-black">{children}</p>
      </div>
      {tail ? <GreyTail /> : null}
    </div>
  );
}

function PurpleBubble({ children, tail, full }: { children: ReactNode; tail?: boolean; full?: boolean }) {
  return (
    <div className={`relative flex ${full ? "w-full" : "justify-end"}`}>
      <div className={`${full ? "flex-1" : ""} rounded-[20px] px-3.5 py-2.5`} style={{ background: PURPLE }}>
        <p className="text-[14.5px] leading-5 font-normal tracking-[-0.23px] text-white">{children}</p>
      </div>
      {tail ? <PurpleTail /> : null}
    </div>
  );
}

/** Incoming group: padding 16px 48px 16px 16px, bubbles 4px apart, tail on the last one */
function InGroup({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-1 py-4 pr-12 pl-4">{children}</div>;
}
/** Outgoing group: padding 16px 24px 16px 80px */
function OutGroup({ children }: { children: ReactNode }) {
  return <div className="flex flex-col items-end gap-1 py-4 pr-6 pl-20">{children}</div>;
}

/* ---------- blocks ---------- */

function StoryBlock() {
  return (
    <div className="flex flex-col gap-2 py-4 pr-12 pl-4">
      <div className="flex items-center gap-1.5 px-1.5">
        <FeatIcon id="feat-IconArrowShareLeft" className="size-3" />
        <p className="text-[12px] leading-4 font-semibold text-black opacity-50">Replied to story</p>
      </div>
      <div className="flex flex-col">
        <div className="relative h-[280px] w-[157px] overflow-hidden rounded-[20px]">
          <Image src="/framer/EqrcCji6tfFc19t8RSfRHmty2A.png" alt="" width={157} height={280} className="h-full w-full object-cover" />
          <span className="absolute top-3 left-[117px] size-7 overflow-hidden rounded-lg shadow-[0_0_0_2.625px_#fff]">
            <Image src="/framer/f615INM0UmZk9rZ8kGqZIFFeM.png" alt="" width={28} height={28} className="size-7 object-cover" />
          </span>
        </div>
        <div className="relative -mt-2 flex">
          <div className="rounded-[20px] bg-[#f2f2f7] px-3.5 py-2.5">
            <p className="text-[14.5px] leading-5 font-normal tracking-[-0.23px] text-black">START</p>
          </div>
          <GreyTail />
        </div>
      </div>
    </div>
  );
}

function AutoBlock({ state }: { state: View["auto"] }) {
  return (
    <div className="flex flex-col items-end gap-1 px-6 pb-4">
      <div className="flex w-full items-start justify-between">
        <motion.div animate={{ opacity: state.card ? 1 : 0 }} className="h-[75px] w-[30px] shrink-0">
          <FeatIcon id="feat-Line" className="h-[75px] w-[30px]" />
        </motion.div>
        <div className="flex flex-1 justify-end pt-8 pl-[26px]">
          <AnimatePresence mode="wait" initial={false}>
            {state.card ? (
              <motion.div key="card" {...enter} className="flex w-full flex-col gap-2 rounded-[20px] p-1.5" style={{ background: PURPLE }}>
                <p className="px-2 py-1 text-[14.5px] leading-5 font-normal tracking-[-0.23px] text-white">hey harry, here&apos;s the link to get started</p>
                <div className="rounded-[14px] bg-white p-3">
                  <p className="text-center text-[14.5px] leading-5 font-medium tracking-[-0.23px] text-black">Click here to start your free trial</p>
                </div>
              </motion.div>
            ) : (
              <motion.div key="typing" {...enter} className="rounded-[20px] p-1.5" style={{ background: PURPLE }}>
                <div className="px-1 py-2">
                  <TypingDots color="#fff" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {state.typing ? (
          <motion.div key="typing2" {...enter} className="relative flex w-full justify-end pl-14">
            <div className="rounded-[20px] px-3.5 py-2.5" style={{ background: PURPLE }}>
              <div className="px-1 py-2">
                <TypingDots color="#fff" />
              </div>
            </div>
            <PurpleTail />
          </motion.div>
        ) : null}
        {state.question ? (
          <motion.div key="question" {...enter} className="w-full pl-14">
            <PurpleBubble full tail>
              quick question, are you working with appointment setters right now or handling the DMs yourself?
            </PurpleBubble>
          </motion.div>
        ) : null}
        {state.sentBy ? (
          <motion.div key="sentby" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={spring} className="flex items-center gap-1.5 px-1.5 py-1">
            <FeatIcon id="feat-IconZap" className="size-3" />
            <p className="text-[12px] leading-4 font-semibold text-black">Sent by Mochi</p>
            <p className="text-[12px] leading-4 font-semibold text-black opacity-25">•</p>
            <p className="text-[12px] leading-4 font-semibold" style={{ color: PURPLE }}>
              See Automation
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function VoiceNote({ player }: { player: boolean }) {
  const bars = [11, 19, 27, 14, 30, 27, 22, 22, 22, 27, 22, 11, 30, 22, 14, 11, 19, 11, 27, 27, 14, 30, 22, 22, 22, 14, 27, 22, 30, 22];
  return (
    <div className="relative flex justify-end">
      <AnimatePresence mode="wait" initial={false}>
        {player ? (
          <motion.div key="player" initial={{ opacity: 0, scaleX: 0.15 }} animate={{ opacity: 1, scaleX: 1 }} transition={spring} style={{ background: PURPLE, originX: 1 }} className="flex items-center gap-3 rounded-[20px] py-1.5 pr-2.5 pl-2.5">
            <span className="flex size-9 items-center justify-center rounded-full bg-white">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M6 4.5L15.5 10L6 15.5V4.5Z" fill={PURPLE} stroke={PURPLE} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
              </svg>
            </span>
            <span className="flex h-11 items-center gap-[2px]">
              {bars.map((h, i) => (
                <span key={i} className="w-[2px] rounded-full bg-white" style={{ height: h }} />
              ))}
            </span>
            <p className="pr-1 text-[14.5px] leading-5 font-medium tracking-[-0.48px] text-white opacity-80">00:08</p>
          </motion.div>
        ) : (
          <motion.div key="generating" {...enter} className="flex items-center gap-2.5 rounded-[20px] px-4 py-2.5" style={{ background: PURPLE }}>
            <p className="text-[16px] leading-[22px] font-medium tracking-[-0.32px] whitespace-nowrap text-white">Generating voice</p>
            <TypingDots color="rgba(255,255,255,0.5)" size={4} gap={3} />
          </motion.div>
        )}
      </AnimatePresence>
      <PurpleTail />
    </div>
  );
}

function Composer({ kind, text, tap }: { kind: "suggest" | "voice"; text: boolean; tap: boolean }) {
  const body =
    kind === "suggest"
      ? "i know the struggle bro, had the same thing when i was trying to scale to my business, you have to hold them accountable with a better system"
      : "yo harry, by the way before I send out the booking link, just wanna be transparant with you and tell you there is a minimum investment of $200 needed if you want to get started, is that okay for you?";
  return (
    <motion.div
      initial={{ y: 160, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 160, opacity: 0 }}
      transition={spring}
      className="absolute inset-x-0 -bottom-2 z-20 bg-[linear-gradient(rgba(255,255,255,0)_0%,#fff_100%)] px-6 py-4"
    >
      <motion.div layout className="relative flex flex-col gap-1 rounded-3xl bg-black/10 p-1 shadow-[0_14px_31px_rgba(0,0,0,0.04)] backdrop-blur-[2px]">
        <AnimatePresence initial={false}>
          {text ? (
            <motion.div key="text" layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
              <p className="px-3 py-2.5 text-[14.5px] leading-5 font-normal tracking-[-0.25px] text-black">{body}</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
        {kind === "suggest" ? (
          <motion.div layout className="relative flex items-center gap-3 py-0.5 pr-0.5 pl-1.5">
            <AnimatePresence>
              {tap ? (
                <motion.span
                  key="tap"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: [0, 1, 0.6, 0], scale: [0.7, 1, 1.05, 1.1] }}
                  transition={{ duration: 0.9, times: [0, 0.3, 0.7, 1] }}
                  className="absolute top-[3px] left-[46px] z-10 size-[34px] rounded-full bg-black/[0.18]"
                />
              ) : null}
            </AnimatePresence>
            <div className="flex flex-1 items-center gap-2 overflow-clip [mask-image:linear-gradient(270deg,rgba(0,0,0,0)_0%,#000_4%)]">
              <span className="relative flex shrink-0 items-center gap-1 overflow-clip rounded-full bg-black/5 p-1.5">
                <Image src="/framer/2dtkfbkeEPBBkan1RjGOUn17f4c.png" alt="" width={156} height={32} className="absolute inset-y-0 left-1.5 h-8 w-[156px] max-w-none blur-[14px]" />
                <FeatIcon id="feat-IconListSparkle" className="relative z-10 size-5" />
                <span className="relative z-10 px-1 text-[14px] leading-4 font-medium tracking-[-0.43px] whitespace-nowrap text-black opacity-80">Direct Answer</span>
                <FeatIcon id="feat-close" className="relative z-10 h-4 w-[18px]" />
              </span>
              <span className="flex shrink-0 items-center gap-1 rounded-full bg-black/5 p-1.5">
                <FeatIcon id="feat-IconListSparkle2" className="size-5" />
                <span className="px-1 text-[14px] leading-4 font-medium tracking-[-0.43px] whitespace-nowrap text-black opacity-80">Value Pivot</span>
              </span>
              <span className="flex shrink-0 items-center gap-1 rounded-full bg-black/5 p-1.5">
                <FeatIcon id="feat-IconListSparkle3" className="size-5" />
                <span className="px-1 text-[14px] leading-4 font-medium tracking-[-0.43px] whitespace-nowrap text-black opacity-80">Customer Insight</span>
              </span>
            </div>
            <FeatIcon id="feat-Add" className="size-10 shrink-0" />
          </motion.div>
        ) : (
          <motion.div layout className="relative flex items-start justify-between p-0.5">
            <FeatIcon id="feat-Add2" className="size-10" />
            <span className="flex items-center gap-1 p-2">
              <FeatIcon id="feat-IconVoiceHigh" className="size-5" />
              <span className="px-1 text-[14.5px] leading-5 font-medium tracking-[-0.25px] whitespace-nowrap text-purple-500">Convert to voice</span>
            </span>
            <FeatIcon id="feat-Add" className="size-10" />
            <span className="pointer-events-none absolute inset-x-[130px] bottom-0 h-px rounded-full bg-purple-500 blur-[3.1px]" />
            <span className="pointer-events-none absolute inset-x-[141px] bottom-1 h-px rounded-full bg-purple-500 blur-[4.1px]" />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ---------- the mockup ---------- */

/** The parent remounts the mockup (key) whenever the feature changes, so the initial view never needs resetting. */
function useTimeline(feature: ChatFeature, play: boolean) {
  const [view, setView] = useState<View>(INITIAL[feature]);
  useEffect(() => {
    if (!play) return;
    const timers = STEPS[feature].map((s) => setTimeout(() => setView((v) => s.patch(v)), s.at));
    return () => timers.forEach(clearTimeout);
  }, [feature, play]);
  return view;
}

export function ChatMockup({ feature, play }: { feature: ChatFeature; play: boolean }) {
  const view = useTimeline(feature, play);
  const colRef = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);

  // Scroll the column so the anchor block sits at the top (older messages leave through the header).
  useLayoutEffect(() => {
    const col = colRef.current;
    if (!col) return;
    const el = col.querySelector<HTMLElement>(`[data-block="${view.anchor}"]`);
    const top = el ? el.offsetTop : 0;
    const controls = animate(y, -top, { type: "spring", stiffness: 170, damping: 26 });
    return () => controls.stop();
  }, [view.anchor, view.blocks, y]);

  const render = (id: BlockId) => {
    switch (id) {
      case "story":
        return <StoryBlock />;
      case "auto":
        return <AutoBlock state={view.auto} />;
      case "u1":
        return (
          <InGroup>
            <GreyBubble>i have 2 setters but tbh looking for a better way to manage them</GreyBubble>
            <GreyBubble tail>they are leaving qualified leads waiting for hours in the inbox, we&apos;re probably losing tons of money</GreyBubble>
          </InGroup>
        );
      case "m1":
        return (
          <div className="flex flex-col items-end gap-1 p-4 pl-[88px]">
            <PurpleBubble tail>i know the struggle bro, had the same thing when i was trying to scale my business, you have to hold them accountable with a better system</PurpleBubble>
          </div>
        );
      case "u2":
        return (
          <InGroup>
            <AnimatePresence mode="wait" initial={false}>
              {view.u2Typing ? (
                <motion.div key="typing" {...enter} className="relative flex">
                  <div className="rounded-[20px] bg-[#f2f2f7] px-3.5 py-2.5">
                    <div className="px-1 py-2">
                      <TypingDots color="rgba(0,0,0,0.4)" />
                    </div>
                  </div>
                  <GreyTail />
                </motion.div>
              ) : (
                <motion.div key="text" {...enter} className="relative flex">
                  <div className="rounded-[20px] bg-[#f2f2f7] px-3.5 py-2.5">
                    <p className="text-[14.5px] leading-5 font-normal tracking-[-0.23px] text-black">i just need a better system to manage my team</p>
                  </div>
                  <GreyTail />
                </motion.div>
              )}
            </AnimatePresence>
          </InGroup>
        );
      case "m2":
        return (
          <OutGroup>
            <PurpleBubble>honestly that sounds like exactly what we help with</PurpleBubble>
            <PurpleBubble tail>when would you like to get started?</PurpleBubble>
          </OutGroup>
        );
      case "u3":
        return (
          <InGroup>
            <div className="flex">
              <GreyBubble>within the next 2 weeks probably</GreyBubble>
            </div>
            <GreyBubble tail>i’m in lisbon visiting a friend right now but i’m back friday</GreyBubble>
          </InGroup>
        );
      case "m3":
        return (
          <OutGroup>
            <PurpleBubble>not a bad place to be stuck in for a week lol</PurpleBubble>
            <VoiceNote player={view.m3Player} />
          </OutGroup>
        );
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col bg-white font-runde">
      {/* header */}
      <div className="relative z-20 flex flex-col items-center bg-[linear-gradient(#fff_0%,rgba(255,255,255,0)_100%)] px-4 pt-8">
        <div className="relative z-10 h-[53px] w-[60px]">
          <Image src="/framer/ICXsFv5JcKFcD51ZXAnBx6KbF8.png" alt="" width={60} height={60} className="absolute top-0 -left-px size-[60px] rounded-full object-cover" />
        </div>
        <div className="flex items-center gap-0 rounded-full bg-[rgba(242,242,242,0.64)] py-2 pr-1.5 pl-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)] backdrop-blur-[6px]">
          <p className="text-[16px] leading-[19.2px] font-medium text-black">harrywatts</p>
          <FeatIcon id="feat-IconChevronRightMedium" className="size-5" />
        </div>
      </div>
      {/* frosted band the messages slide under */}
      <div className="pointer-events-none absolute inset-x-0 -top-3 z-10 h-[95px] bg-white/80 blur-[8px]" />
      {/* conversation */}
      <div className="absolute inset-x-0 top-[121px] bottom-0 overflow-hidden">
        <motion.div ref={colRef} style={{ y }} className="flex flex-col">
          {view.blocks.map((id) => (
            <motion.div key={id} data-block={id} layout="position" {...(id === "story" || (id === "auto" && feature === 2) || feature !== 2 && INITIAL[feature].blocks.includes(id) ? {} : enter)}>
              {render(id)}
            </motion.div>
          ))}
        </motion.div>
      </div>
      <AnimatePresence>
        {view.composer ? <Composer key={view.composer.kind} kind={view.composer.kind} text={view.composer.text} tap={view.tap} /> : null}
      </AnimatePresence>
    </div>
  );
}
