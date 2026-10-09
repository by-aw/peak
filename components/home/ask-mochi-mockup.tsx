"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDownIcon,
  ClockIcon,
  CursorPointerIcon,
  DividerIcon,
  MicrophoneIcon,
  PlusIcon20,
  SidebarMenuIcon,
  SparklesIcon16,
  SparklesIcon20,
  SunIcon,
} from "@/components/icons/middle-icons";

/**
 * "Ask Mochi" product mockup from the Framer "Revenue Section".
 * The live site loops two states every ~5s:
 *  - grid: "Ask Mochi about your leads" + recipes grid; elements stagger in, then a cursor
 *    springs onto the first recipe card which gets a dark outline (hover state).
 *  - chat: the "Content Ideas From DMs" conversation; title / bubble / response / input stagger in.
 * There is no exit animation on the live site; the state just swaps.
 */

const GRID_MS = 2450;
const CHAT_MS = 2550;
const CURSOR_DELAY = 1.15;

const spring = { type: "spring", stiffness: 300, damping: 35, mass: 1 } as const;

const recipes: { title: string; cadence: "One-time" | "Monthly" }[] = [
  { title: "Content Idea List Based On DMs", cadence: "One-time" },
  { title: "Reels Plan For Handling Objections", cadence: "One-time" },
  { title: "Story Ideas For Nurture Stage", cadence: "One-time" },
  { title: "Hook Ideas From Lead Pain", cadence: "One-time" },
  { title: "Carousel Ideas For Desired Outcomes", cadence: "One-time" },
  { title: "Monthly Objection Ranking And Gaps", cadence: "Monthly" },
];

const ideas: { title: string; body: string }[] = [
  {
    title: 'The "Anti-Bot" Manifesto',
    body: ': A reel or carousel explaining why "raw" chatbots are killing their brand and how to use automation that actually feels human.',
  },
  {
    title: 'The "Cooked" Lead Audit',
    body: ': A screen recording showing exactly what happens when you miss a DM for 24 hours-the "I know I\'m losing money" reality check.',
  },
  {
    title: 'The "ManyChat" Break-Up',
    body: ": A post calling out the specific headaches of over-automating (e.g., getting buried by 100+ DMs/hour) and how to fix that workflow.",
  },
  {
    title: '"Is this an Al?" Test',
    body: ": A video showing a real conversation where the lead can't tell if it's Al or human—addressing that big trust barrier head-on.",
  },
  {
    title: "Stop Burning Your Setters",
    body: ": A breakdown of how to actually measure setter performance so you stop paying for output that doesn't convert.",
  },
  {
    title: 'The "No-Monetization" Myth',
    body: ': A post targeting those who say "I haven\'t started monetizing yet." Explain why getting the DMs dialed in is the monetization strategy.',
  },
  {
    title: "The High-Ticket/Low-Ticket Debate",
    body: ': Address the objection that "you guys only care about high-ticket" by showing how Mochi helps businesses regardless of their price point.',
  },
  {
    title: "Behind the Scenes of a 24/7 Setter",
    body: ': A demo of what it looks like to have an "Al teammate" that never sleeps, never complains, and actually sends voice notes.',
  },
  {
    title: "Behind the Scenes of a 24/7 Setter",
    body: ': A demo of what it looks like to have an "Al teammate" that never sleeps, never complains, and actually sends voice notes.',
  },
  {
    title: 'The "I\'m Bad at Sales" Fix',
    body: ": Content designed for the creator who is great at content but terrible at closing—show how the tech does the heavy lifting for them.",
  },
  {
    title: "Proof of Life",
    body: ': A simple, high-trust post sharing a "Let\'s get this set up" message from a new client to show momentum and social proof.',
  },
];

function Sidebar() {
  return (
    <div className="flex h-[684px] w-[64px] shrink-0 flex-col">
      <div className="flex flex-1 flex-col gap-4 overflow-clip p-4">
        <div className="relative h-8 w-8 overflow-clip rounded-full">
          <Image src="/framer/3cR8Ro7621oeDkUbqNBFSm9FMo.png" alt="" width={32} height={32} className="h-8 w-8 rounded-full" />
        </div>
        <SidebarMenuIcon className="h-[296px] w-8" />
      </div>
      <div className="flex h-[100px] flex-col items-center gap-3 overflow-clip p-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-[6px] p-2">
          <span className="relative block h-4 w-4">
            <SunIcon className="absolute inset-[1px] h-[14px] w-[14px]" />
          </span>
        </div>
        <div className="flex w-[50px] items-center gap-[10px]">
          <Image src="/framer/SDoTktN6wQb1FnV3BNxqrGrsaJA.png" alt="" width={32} height={32} className="h-8 w-8 rounded-full" />
          <span className="h-2 w-2 rounded-full bg-[#10b981] shadow-[inset_0_0_0_3px_#f6f6f6]" />
        </div>
      </div>
    </div>
  );
}

function GridState({ cycle }: { cycle: number }) {
  const item = (delay: number, y = 64) => ({
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { ...spring, delay },
  });
  return (
    <div className="flex h-[684px] w-full flex-col items-start">
      <div
        key={cycle}
        className="relative flex h-[542px] w-full flex-col items-center justify-center gap-6 overflow-hidden bg-[linear-gradient(rgba(255,255,255,0)_0%,#fff_100%)] p-6"
      >
        <div className="flex w-[576px] flex-col items-center gap-6">
          <motion.div {...item(0)} className="flex flex-col items-center gap-3">
            <Image src="/framer/jUd3vU27TYqvJwy6uyARfhzhtE.png" alt="" width={56} height={56} className="h-14 w-14 rounded-full" />
            <p className="text-[18px] font-medium leading-[28px] text-black">Ask Mochi about your leads</p>
          </motion.div>
          <div className="flex w-full flex-col gap-4">
            <motion.div
              {...item(0.1)}
              className="overflow-clip rounded-[16px] bg-gray-25 shadow-[0_0_0_0.5px_#e0e0e0,0_8px_24px_0_rgba(0,0,0,0.05)]"
            >
              <div className="flex items-center gap-2 overflow-clip rounded-[16px] bg-white p-2">
                <div className="flex flex-1 items-center px-2">
                  <p className="text-[14px] font-normal leading-[14px] tracking-[-0.2px] text-gray-400">Ask Mochi</p>
                </div>
                <div className="flex h-7 w-7 items-center rounded-[8px] bg-white p-[6px]">
                  <span className="relative block h-4 w-4">
                    <MicrophoneIcon className="absolute inset-y-[1px] left-[3px] h-[14px] w-[10px]" />
                  </span>
                </div>
              </div>
            </motion.div>
            <div className="flex w-full flex-col items-center gap-2">
              <motion.div {...item(0.1)} className="flex w-full gap-2">
                <div className="flex items-center gap-1 rounded-full bg-gray-50 p-2">
                  <SparklesIcon20 className="h-5 w-5" />
                  <p className="px-1 text-[14px] font-medium leading-[14.7px] tracking-[-0.2px] text-black">Recipes</p>
                </div>
                <div className="flex items-center gap-1 rounded-full p-2">
                  <PlusIcon20 className="h-5 w-5" />
                  <p className="px-1 text-[14px] font-medium leading-[14.7px] tracking-[-0.2px] text-black">New</p>
                </div>
              </motion.div>
              <motion.div {...item(0.2)} className="grid w-full grid-cols-3 gap-2 py-2">
                {recipes.map((r, i) => (
                  <motion.div
                    key={r.title}
                    initial={{ boxShadow: "0 0 0 0.5px #e0e0e0" }}
                    animate={{ boxShadow: i === 0 ? "0 0 0 0.5px #111111" : "0 0 0 0.5px #e0e0e0" }}
                    transition={{ duration: 0.6, delay: CURSOR_DELAY + 0.1, ease: "easeOut" }}
                    className="flex h-20 flex-col justify-between overflow-clip rounded-[12px] bg-white p-2"
                  >
                    <p className="text-[14px] font-medium leading-5 tracking-[-0.2px] text-[#454545]">{r.title}</p>
                    <div className="flex items-center gap-1">
                      {r.cadence === "Monthly" && <ClockIcon className="h-[14px] w-[14px]" />}
                      <p className="text-[12px] font-medium leading-3 text-gray-500">{r.cadence}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div {...item(0.25, 32)} className="flex items-center gap-2">
                <p className="text-[14px] font-medium leading-[14.7px] tracking-[-0.2px] text-gray-500">See all</p>
                <ChevronDownIcon className="h-[14px] w-[14px]" />
              </motion.div>
            </div>
          </div>
        </div>
        <motion.div
          initial={{ y: 222 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 32, delay: CURSOR_DELAY }}
          className="absolute left-[234px] top-[328px] z-[4] h-6 w-6"
        >
          <CursorPointerIcon className="h-6 w-6" />
        </motion.div>
      </div>
    </div>
  );
}

function ChatState({ cycle }: { cycle: number }) {
  const item = (delay: number, y = 64) => ({
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { ...spring, delay },
  });
  return (
    <div key={cycle} className="flex h-[684px] w-full flex-col items-center">
      <motion.div {...item(0)} className="flex w-full items-center gap-2 bg-white px-6 py-5">
        <div className="flex flex-1 items-center gap-4">
          <div className="flex h-8 w-8 items-center justify-center overflow-clip rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]">
            <Image src="/framer/0FqAkiv4jzhc2M7IgfRsuBeiuQ.png" alt="" width={32} height={32} className="h-8 w-8 rounded-full" />
          </div>
          <p className="text-[14px] font-medium leading-[14.7px] tracking-[-0.2px] text-black">Content Ideas From DMs</p>
        </div>
      </motion.div>
      <div className="relative flex h-[612px] w-[768px] flex-col gap-6 p-8">
        <div className="flex w-full flex-col gap-6">
          <motion.div {...item(0.05, 80)} className="flex w-full flex-col items-end gap-3">
            <div className="w-[480px] rounded-[12px_6px_12px_12px] bg-blue-500 px-3 py-[14px]">
              <p className="text-[14px] font-normal leading-6 tracking-[-0.2px] text-white">
                Based on what leads are asking and saying in our DMs, give me a list of 10 content ideas that would attract more of
                the same audience.
              </p>
            </div>
          </motion.div>
          <motion.div {...item(0.1)} className="flex w-full flex-col gap-4 text-[14px] font-normal leading-6 tracking-[-0.2px] text-black">
            <div>
              <p>Hey Nik, I&apos;ve been digging into what people are saying in the DMs.</p>
              <p>
                <br />
              </p>
              <p>
                There&apos;s a lot of frustration out there with clunky automation tools, fear of &quot;leaving money on the table,&quot;
                and general burnout from trying to handle high lead volume manually.
              </p>
              <p>
                <br />
              </p>
              <p className="font-medium">Here are 10 content ideas that hit these pain points directly:</p>
              <p>
                <br />
              </p>
              {ideas.map((idea, i) => (
                <p key={i}>
                  <span className="font-bold">{idea.title}</span>
                  <span>{idea.body}</span>
                </p>
              ))}
            </div>
          </motion.div>
        </div>
        <motion.div
          {...item(0.2)}
          className="absolute inset-x-0 top-[472px] z-[1] flex h-[92px] flex-col p-6 bg-[linear-gradient(rgba(255,255,255,0)_0%,#fff_100%)]"
        >
          <div className="overflow-clip rounded-[16px] bg-gray-25 shadow-[0_0_0_0.5px_#e0e0e0,0_24px_48px_0_rgba(0,0,0,0.1)]">
            <div className="flex items-center justify-between overflow-clip rounded-[16px] bg-white p-2 shadow-[0_0_0_0.5px_#e0e0e0]">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center">
                  <SparklesIcon16 className="h-4 w-4" />
                </div>
                <DividerIcon className="h-4 w-[10px]" />
                <p className="text-[14px] font-normal leading-[14px] tracking-[-0.2px] text-gray-400">Ask Mochi</p>
              </div>
              <div className="flex h-7 w-7 items-center rounded-[8px] bg-white p-[6px]">
                <span className="relative block h-4 w-4">
                  <MicrophoneIcon className="absolute inset-y-[1px] left-[3px] h-[14px] w-[10px]" />
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function AskMochiMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [state, setState] = useState<"grid" | "chat">("grid");
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let timer: ReturnType<typeof setTimeout>;
    let current: "grid" | "chat" = "grid";
    const tick = () => {
      timer = setTimeout(
        () => {
          current = current === "grid" ? "chat" : "grid";
          setState(current);
          if (current === "grid") setCycle((c) => c + 1);
          tick();
        },
        current === "grid" ? GRID_MS : CHAT_MS,
      );
    };
    tick();
    return () => clearTimeout(timer);
  }, [inView]);

  return (
    <div ref={ref} className="relative flex w-full flex-col items-start gap-[10px]">
      <div className="relative flex w-full overflow-clip rounded-[12px] bg-gray-50 p-1 shadow-[inset_0_0_0_1px_#e7e7e7]">
        <Sidebar />
        <div className="flex min-w-0 flex-1">
          <div className="flex min-w-0 flex-1 overflow-clip rounded-[8px] bg-white shadow-[0_0_4px_4px_#f6f6f6,inset_0_0_0_1px_#e0e0e0]">
            {state === "grid" ? <GridState cycle={cycle} /> : <ChatState cycle={cycle} />}
          </div>
        </div>
        {/* Framer "Layer Blur": white blurred slab fading the mockup out towards the bottom */}
        <div className="pointer-events-none absolute inset-x-[-48px] bottom-[-405px] top-[455px] z-[3] rounded-b-[300px] bg-white blur-[40px]" />
      </div>
    </div>
  );
}
