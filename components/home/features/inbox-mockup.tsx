"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { FeatIcon, type FeatIconId } from "./sprite";

type Tag = { icon: FeatIconId; text: string };
type Row = {
  avatar: string;
  name: string;
  badge?: string; // blue counter
  dot?: boolean; // small unread dot
  text: string;
  unread?: boolean; // black 500 text instead of 75% 400
  time: string;
  tags: Tag[];
};

const QUALIFIED: Row[] = [
  {
    avatar: "/framer/QDaWUd04oE8XBVKOB1X4QSaeo.png",
    name: "harrywatts",
    badge: "1",
    text: "i have 2 setters but tbh looking for a better way to manage them",
    unread: true,
    time: "2m",
    tags: [
      { icon: "feat-IconPlayCircle", text: "Story Reply" },
      { icon: "feat-IconPlay", text: "Creator" },
    ],
  },
  {
    avatar: "/framer/nVMtVTycA507b4mJfklrmJGxvY.png",
    name: "sennaverheij",
    text: "We’d start with six client accounts. If my team can share the inbox, I’m ready to try it.",
    time: "1h",
    tags: [
      { icon: "feat-IconBubble3", text: "Inbound" },
      { icon: "feat-IconGraduateCap", text: "Course Creator" },
      { icon: "feat-IconEmojiSad", text: "Slow Follow-up" },
    ],
  },
  {
    avatar: "/framer/iEhgbTFZFSCpTbtNGmBq4Z8.png",
    name: "sofiabuilds",
    text: "i’m launching again next month, so ideally I’d have everything set up before then",
    time: "2h",
    tags: [
      { icon: "feat-IconPlayCircle", text: "Story Reply" },
      { icon: "feat-IconPlay", text: "Creator" },
      { icon: "feat-IconEmojiSad", text: "High DM Volume" },
    ],
  },
];

const NO_SHOWS: Row[] = [
  {
    avatar: "/framer/kaWgC6Ly71LQwCRT78Apsj9jYRc.png",
    name: "may4che.n",
    text: "yeah, exactly. I need something that can keep up during launches without sounding robotic",
    time: "34m",
    tags: [
      { icon: "feat-IconBubble3", text: "Inbound" },
      { icon: "feat-IconTeam", text: "Agency" },
      { icon: "feat-IconEmojiSad", text: "Slow Follow-up" },
    ],
  },
  {
    avatar: "/framer/slAzFkvEZcqZlxklrZS98BbXU.png",
    name: "leomartinez",
    dot: true,
    text: "You: Yes, it can qualify leads automatically and hand the conversation over when they’re ready.",
    unread: true,
    time: "8m",
    tags: [
      { icon: "feat-IconPlayCircle", text: "Story Reply" },
      { icon: "feat-IconPlay", text: "Creator" },
      { icon: "feat-IconEmojiSad", text: "Lead Qualification" },
    ],
  },
  {
    avatar: "/framer/MAVdh9KSnU6gX52VftOfglswgzM.png",
    name: "hannahb.co",
    dot: true,
    text: "You: You can connect multiple Instagram accounts on the Agency plan.",
    unread: true,
    time: "21m",
    tags: [
      { icon: "feat-IconBubble3", text: "Inbound" },
      { icon: "feat-IconTeam", text: "Agency" },
      { icon: "feat-IconEmojiSad", text: "Inbox Management" },
    ],
  },
  {
    avatar: "/framer/KyDO88P2B9hTEylARbcw42hT00.png",
    name: "marcuscole.fit",
    text: "You: You’re booked for Tuesday at 2. I’ve added your team size and current DM volume to the notes.",
    time: "1d",
    tags: [
      { icon: "feat-IconCall", text: "Call Booked" },
      { icon: "feat-IconPlay", text: "Creator" },
      { icon: "feat-IconEmojiSad", text: "Consistency" },
    ],
  },
  {
    avatar: "/framer/m2xNSc5mn2jwX20oskoEDCpb44.png",
    name: "oliviagrantrealty",
    text: "You: That’s exactly where automated follow-ups can help. How many new inquiries does your team get each week?",
    time: "1d",
    tags: [
      { icon: "feat-IconPlayCircle", text: "Story Reply" },
      { icon: "feat-IconPlay", text: "Creator" },
      { icon: "feat-IconEmojiSad", text: "Missed Follow-Ups" },
    ],
  },
];

const spring = { type: "spring", stiffness: 150, damping: 30, mass: 1 } as const;

function Appear({ children, delay, y = 56, className = "" }: { children: React.ReactNode; delay: number; y?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay }} className={className}>
      {children}
    </motion.div>
  );
}

function InboxRow({ row, delay }: { row: Row; delay: number }) {
  return (
    <Appear delay={delay} className="flex items-start gap-4 p-4">
      <Image src={row.avatar} alt="" width={48} height={48} className="size-12 shrink-0 rounded-full object-cover" />
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex flex-col gap-1">
          <div className={`flex items-center ${row.badge ? "gap-2" : "gap-4"}`}>
            <p className="flex-1 truncate text-[18px] leading-5 font-medium tracking-[-0.42px] text-black">{row.name}</p>
            {row.badge ? (
              <span className="flex size-5 items-center justify-center rounded-full bg-[#0088ff] text-[14px] leading-[14px] font-medium tracking-[-0.42px] text-white">
                {row.badge}
              </span>
            ) : row.dot ? (
              <span className="relative size-5 shrink-0">
                <span className="absolute inset-[6px] rounded-full bg-[#0088ff]" />
              </span>
            ) : null}
          </div>
          <div className="flex items-center gap-4">
            <p
              className={`min-w-0 flex-1 truncate text-[16px] leading-5 ${row.unread ? "font-medium text-black" : "font-normal text-black/75"}`}
            >
              {row.text}
            </p>
            <p className="shrink-0 text-[13.5px] leading-4 font-medium text-black/50">{row.time}</p>
          </div>
        </div>
        <div className="flex items-start gap-1">
          {row.tags.map((t) => (
            <span
              key={t.text}
              className="flex shrink-0 items-center gap-0.5 rounded-full bg-white py-1.5 pr-2 pl-1.5 shadow-[0_0_0_1px_rgba(0,0,0,0.07)]"
            >
              <FeatIcon id={t.icon} className="size-4" />
              <span className="px-0.5 text-[14.5px] leading-4 font-semibold whitespace-nowrap text-black/80">{t.text}</span>
            </span>
          ))}
        </div>
      </div>
    </Appear>
  );
}

function Group({ title, icon, rows, delay }: { title: string; icon: FeatIconId; rows: Row[]; delay: number }) {
  return (
    <div className="flex flex-col overflow-clip rounded-3xl bg-black/5">
      <Appear delay={delay} className="flex items-center gap-2.5 px-4 py-3.5 lg:p-4">
        <FeatIcon id={icon} className="size-6" />
        <p className="flex-1 text-[18px] leading-[21.6px] font-semibold tracking-[-0.42px] text-black">{title}</p>
      </Appear>
      <div className="flex flex-col overflow-clip rounded-3xl bg-white">
        {rows.map((r, i) => (
          <InboxRow key={r.name} row={r} delay={delay + 0.08 * (i + 1)} />
        ))}
      </div>
    </div>
  );
}

/** Feature 1 — "Organized Inbox Tab": the inbox list with Qualified / No Shows groups and the filter pill. */
export function InboxMockup() {
  return (
    <div className="relative flex h-full w-full flex-col bg-white font-runde">
      <div className="px-6 pt-10 lg:pt-12">
        <motion.p
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
          className="text-[26px] leading-10 font-bold tracking-[-0.42px] text-black lg:text-[32px]"
        >
          Inbox
        </motion.p>
      </div>
      <div className="flex flex-col gap-5 px-4 py-6 lg:gap-4">
        <Group title="Qualified" icon="feat-Icon" rows={QUALIFIED} delay={0.1} />
        <Group title="No Shows" icon="feat-Frame2147237718" rows={NO_SHOWS} delay={0.45} />
      </div>
      {/* Filter pill */}
      <motion.div
        initial={{ y: 82, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...spring, delay: 0.3 }}
        className="absolute inset-x-0 top-[704px] z-10 flex justify-center p-6"
      >
        <div className="flex w-full items-center rounded-[56px] bg-black/10 p-1 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)] backdrop-blur-[6px]">
          <div className="flex items-center justify-center rounded-full px-[10px] py-2.5 lg:w-24">
            <span className="text-[16px] leading-5 font-medium tracking-[-0.42px] text-black">All</span>
          </div>
          <div className="flex items-center justify-center gap-1 rounded-full p-2.5">
            <span className="text-[16px] leading-5 font-medium tracking-[-0.42px] text-black opacity-80">Unread</span>
            <span className="rounded-full bg-[#0088ff] px-1.5 py-[3px] text-[13px] leading-[14px] font-medium tracking-[-0.42px] text-white">136</span>
          </div>
          <div className="flex items-center justify-center gap-1 rounded-full bg-white/[0.48] px-[14px] py-2.5">
            <span className="text-[16px] leading-5 font-medium tracking-[-0.42px] text-black opacity-80">Todo</span>
            <span className="rounded-full bg-[#0088ff] px-1.5 py-[3px] text-[13px] leading-[14px] font-medium tracking-[-0.42px] text-white">2</span>
          </div>
          <div className="flex items-center justify-center rounded-full px-[10px] py-2.5 lg:w-24">
            <span className="text-[16px] leading-5 font-medium tracking-[-0.42px] text-black opacity-80">Archive</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
