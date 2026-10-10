"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import {
  ChatBubbleMicro,
  CheckmarkIcon,
  ChevronRightIcon,
  FilterRow0,
  FilterRow1,
  FilterRow2,
  FilterRow3,
  FilterRow4,
  FilterRow5,
  FilterRow6,
  FilterRow7,
  FilterRow8,
  FilterRowLead,
  FireIcon,
  MoneyBagIcon,
  NotificationBellIcon,
  PeopleAddIcon,
  PinIcon,
  TeamIcon,
  ThinkingBubbleIcon,
  UserPlusMicroSmall,
  XCircleMicro,
} from "@/components/icons/inbox-mockup-icons";
import { MockupComposer } from "@/components/shared/mockup-composer";

const BAR = "bg-[linear-gradient(90deg,rgba(227,227,227,0.12)_0%,#e1e1e1_100%)]";
const PILL = "bg-[linear-gradient(90deg,rgba(227,227,227,0.12)_0%,rgba(199,199,199,0.48)_100%)]";
const HAIRLINE = "shadow-[0_0_0_0.5px_#e0e0e0,0_1px_2px_0_rgba(0,0,0,0.05)]";
const LOOP = 7;

/* ------------------------------------------------------------------ Lead Filters */

const FILTER_ROWS = [FilterRow0, FilterRow1, FilterRow2, FilterRow3, FilterRow4, FilterRow5, FilterRow6, FilterRow7, FilterRow8];

function OverlayRow({ avatar, tags, delay }: { avatar: string; tags: ReactNode; delay: number }) {
  const times = [0, 0.56, 0.66, 0.86, 0.96, 1];
  const t = { duration: LOOP, repeat: Infinity, times, delay, ease: "easeOut" as const };
  return (
    <div className="flex w-full gap-5 px-4 py-3">
      <motion.div className="relative size-8 shrink-0 overflow-hidden rounded-full" animate={{ x: [-31, -31, 0, 0, -31, -31], opacity: [0, 0, 1, 1, 0, 0] }} transition={t}>
        <Image src={avatar} alt="" width={128} height={128} className="size-8 rounded-full object-cover" />
      </motion.div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <motion.div className="flex flex-col gap-2.5 py-1.5" animate={{ x: [-85, -85, 0, 0, -85, -85], opacity: [0, 0, 1, 1, 0, 0] }} transition={{ ...t, delay: delay + 0.12 }}>
          <div className={`h-[7px] w-[330px] max-w-full rounded-2xl ${BAR}`} />
          <div className="flex w-[154px] max-w-full flex-col gap-1.5 rounded bg-[rgba(243,232,255,0.52)] p-1">
            <div className={`h-1.5 w-[146px] max-w-full rounded-2xl ${PILL}`} />
            <div className={`h-1.5 w-[100px] max-w-full rounded-2xl ${PILL}`} />
          </div>
        </motion.div>
        <motion.div className="flex gap-2" animate={{ x: [-88, -88, 0, 0, -88, -88], opacity: [0, 0, 1, 1, 0, 0] }} transition={{ ...t, delay: delay + 0.24 }}>
          {tags}
        </motion.div>
      </div>
    </div>
  );
}

function GreyTag({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="flex items-center gap-1 rounded-full py-1 pr-2 pl-1.5">
      {icon}
      <span className="text-[13px] leading-[15.6px] font-medium whitespace-pre text-[rgba(105,105,105,0.8)]">{label}</span>
    </span>
  );
}

/**
 * Framer "Desktop/6": the "Filters" box (rendered at 80% scale) with the selected lead filter on top,
 * and the white inbox preview that fades in over it while its rows slide in from the left.
 */
export function LeadFiltersMockup() {
  return (
    <>
      <div
        className={`absolute top-12 right-3 -bottom-[90px] left-3 origin-center scale-80 overflow-hidden rounded-[16px] bg-white md:right-auto md:left-1/2 md:w-[320px] md:-translate-x-1/2 ${HAIRLINE}`}
      >
        <div className="absolute top-0 right-8 left-0 flex items-center gap-4 p-4">
          <p className="text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] text-black">Filters</p>
        </div>
        <div className="absolute inset-x-0 top-[47px] -bottom-[29px] p-2">
          <div aria-hidden className="absolute inset-2 z-[1] flex flex-col overflow-clip">
            <div className="h-[52px] w-full rounded-full bg-[rgba(17,0,0,0.05)]" />
          </div>
          <div className="relative flex flex-col">
            <div className="flex h-[52px] items-center gap-6 rounded-full py-2.5 pr-[18px] pl-3">
              <FilterRowLead width={230} height={32} />
              <CheckmarkIcon width={20} height={20} />
            </div>
            {FILTER_ROWS.map((RowIcon, i) => (
              <div key={i} className="h-[52px] w-full">
                <RowIcon width="100%" height={52} preserveAspectRatio="xMidYMid meet" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <motion.div
        className="absolute top-16 right-4 -bottom-[210px] left-4 z-[2] overflow-hidden rounded-[16px] bg-white md:right-auto md:left-1/2 md:w-[426px] md:-translate-x-1/2"
        animate={{ opacity: [0, 0, 0.87, 0.87, 0, 0] }}
        transition={{ duration: LOOP, repeat: Infinity, times: [0, 0.54, 0.64, 0.88, 0.97, 1], ease: "easeOut" }}
      >
        <OverlayRow
          avatar="/framer/pdhs4zeRa4LdxXCRsTzE7NB9Wo.png"
          delay={0}
          tags={
            <>
              <GreyTag icon={<ThinkingBubbleIcon width={15} height={15} />} label="In Contact" />
              <GreyTag icon={<FireIcon width={14} height={14} />} label="Hot lead" />
            </>
          }
        />
        <OverlayRow avatar="/framer/DpHMVg6UTxAKZB1nJh4Z4bfrJA.jpg" delay={0.35} tags={<GreyTag icon={<ThinkingBubbleIcon width={15} height={15} />} label="In Contact" />} />
      </motion.div>
    </>
  );
}

/* ------------------------------------------------------------------ AI Tags */

function AiTag({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className={`flex w-fit items-center gap-1 rounded-full py-1 pr-2 pl-1.5 ${HAIRLINE}`}>
        <span className="flex size-3.5 items-center justify-center">{icon}</span>
        <span className="text-[12px] leading-[14.4px] font-normal whitespace-pre text-[rgba(0,0,0,0.8)]">{label}</span>
      </span>
      <p className="text-[10px] leading-[10.5px] font-medium tracking-[-0.2px] whitespace-pre text-[#8d8d8d]">applied by AI</p>
    </div>
  );
}

/** Framer "Desktop/4" of the AI Tags card: a chat with a skeleton message, the AI-applied tags and the composer. */
export function AiTagsMockup() {
  return (
    <div className={`absolute top-12 right-4 -bottom-[236px] left-4 flex flex-col overflow-hidden rounded-[16px] bg-white md:right-auto md:left-1/2 md:w-[428px] md:-translate-x-1/2 ${HAIRLINE}`}>
      <div className="relative z-[3] flex items-center gap-4 overflow-hidden bg-white px-5 py-4">
        <div className="relative size-8 shrink-0">
          <Image src="/framer/54ld3a5oqlabzerddR3jMw1pU.png" alt="" width={128} height={128} className="size-8 rounded-full" />
          <span className="absolute top-6 left-[22px] z-[1] size-2 rounded-full bg-[#10b981]" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2.5">
          <p className="text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] text-black">alimamedgasanov</p>
          <p className="text-[14px] leading-[14px] font-normal tracking-[-0.2px] text-gray-500">Active now</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-6 px-5 py-6">
        <div className="flex flex-col gap-4">
          <div className={`relative flex flex-col overflow-hidden rounded-[6px_12px_12px_12px] p-3 ${HAIRLINE}`}>
            <motion.div
              aria-hidden
              className="absolute inset-x-5 -bottom-[5.7px] z-[1] h-[3px] rounded-[5px] bg-[radial-gradient(50%_50%,#a855f7_0%,#f3e8ff_100%)]"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="flex flex-col gap-2">
              <div className="h-1.5 w-[52px] rounded-2xl bg-[#f0f0f0]" />
              <div className={`h-1.5 w-[225px] max-w-full rounded-2xl ${BAR}`} />
            </div>
          </div>
          <AiTag icon={<MoneyBagIcon width={12} height={13} />} label="Price shopper" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <div className={`flex flex-col rounded-[6px_12px_12px_12px] px-3 py-3.5 ${HAIRLINE}`}>
              <p className="text-[14px] leading-6 font-normal tracking-[-0.2px] text-black">I&apos;m ready to book, where is the link?</p>
            </div>
            <p className="text-[14px] leading-[14px] font-normal tracking-[-0.2px] text-gray-500">10:24 AM</p>
            <AiTag icon={<FireIcon width={14} height={14} />} label="Hot lead" />
          </div>
          <motion.div className="flex items-center gap-2" animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.7, 1] }}>
            <span className="flex items-center gap-1">
              {[0.6, 0.94, 0.98].map((o, i) => (
                <motion.span key={i} className="size-1 rounded-full bg-[#7d7d7d]" animate={{ opacity: [o, 0.3, o] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} />
              ))}
            </span>
            <span className="text-[13px] leading-[15.6px] font-normal whitespace-nowrap text-[#7d7d7d]">Analysing intent...</span>
          </motion.div>
        </div>
      </div>
      <MockupComposer />
    </div>
  );
}

/* ------------------------------------------------------------------ Follow up */

function Pills({ title, width, pills, solid = false }: { title: number; width: number; pills: number[]; solid?: boolean }) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className={`h-[7px] max-w-full rounded-2xl ${BAR}`} style={{ width: title }} />
      <div className={`flex max-w-full flex-col gap-1.5 rounded p-1 ${solid ? "bg-purple-100" : "bg-[rgba(243,232,255,0.52)]"}`} style={{ width }}>
        {pills.map((w, i) => (
          <div key={i} className={`h-1.5 rounded-2xl ${PILL}`} style={{ width: w }} />
        ))}
      </div>
    </div>
  );
}

function Tag({ icon, label, runde = false }: { icon: ReactNode; label: string; runde?: boolean }) {
  return (
    <span className="flex items-center gap-1 rounded-full py-1 pr-2 pl-1.5">
      {icon}
      <span className={runde ? "font-runde text-[14.5px] leading-[17.4px] font-semibold whitespace-pre text-[rgba(0,0,0,0.8)]" : "text-[12px] leading-[14.4px] font-medium whitespace-pre text-[rgba(0,0,0,0.8)]"}>
        {label}
      </span>
    </span>
  );
}

function Avatar({ src, size }: { src: string; size: 48 | 60 }) {
  return (
    <div className={`relative shrink-0 ${size === 60 ? "size-[60px]" : "size-12"}`}>
      <Image src={src} alt="" width={size * 2} height={size * 2} className="size-full rounded-full object-cover" />
    </div>
  );
}

function ChatRow({ avatar, name, text, time, status, nameWeight = "font-medium" }: { avatar: string; name: string; text: string; time: string; status: ReactNode; nameWeight?: string }) {
  return (
    <div className="flex gap-4 px-5 py-3">
      <Avatar src={avatar} size={60} />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex flex-col gap-2 py-1.5">
          <p className={`font-runde text-[18px] leading-[21.6px] tracking-[-0.42px] text-black ${nameWeight}`}>{name}</p>
          <div className="flex items-center gap-4">
            <p className="min-w-0 flex-1 font-runde text-[16px] leading-[19.2px] font-normal tracking-[0.42px] text-[rgba(0,0,0,0.75)]">{text}</p>
            <p className="font-runde text-[13.5px] leading-[16.2px] font-medium whitespace-pre text-[rgba(0,0,0,0.5)]">{time}</p>
          </div>
        </div>
        {status}
      </div>
    </div>
  );
}

function Status({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="flex items-center gap-0.5">
      <span className="flex size-4 items-center justify-center overflow-hidden rounded-full">{icon}</span>
      <span className="px-1 font-runde text-[14.5px] leading-[17.4px] font-semibold whitespace-pre text-[rgba(0,0,0,0.8)]">{label}</span>
    </span>
  );
}

/** Framer "Mobile Mockup": the faded (25%) iOS inbox list behind the notification bars. */
function MobileMockup() {
  return (
    <div className="pointer-events-none absolute -top-[157px] right-3 left-3 flex flex-col opacity-25 md:right-auto md:left-1/2 md:w-[440px] md:-translate-x-1/2">
      <div className="flex gap-4 px-5 py-3">
        <Avatar src="/framer/LEQICsPlLp8B8KuSsCGIOgpbOBE.png" size={60} />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex flex-col gap-2 py-1.5">
            <div className="flex items-center gap-2">
              <p className="min-w-0 flex-1 font-runde text-[18px] leading-[21.6px] font-semibold tracking-[-0.42px] text-black">Mochi AI</p>
              <PinIcon width={14} height={14} />
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="font-runde text-[16px] leading-[19.2px] font-medium text-black">Nik, reminder - call in 5 mins</p>
              <p className="font-runde text-[13.5px] leading-[16.2px] font-medium whitespace-pre text-[rgba(0,0,0,0.5)]">Now</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-[24px] bg-[rgba(255,56,60,0.1)] p-3">
            <div className="flex size-11 shrink-0 flex-col items-center overflow-hidden rounded-[10px] bg-white">
              <p className="w-full bg-[#ff2d55] py-1 text-center font-runde text-[8px] leading-[9.6px] font-bold text-white">JAN</p>
              <p className="font-runde text-[14.67px] leading-[17.6px] font-bold text-black">22</p>
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="font-runde text-[16px] leading-[19.2px] font-semibold whitespace-pre text-black">Join Call</p>
                <ChevronRightIcon width={20} height={20} />
              </div>
              <p className="font-runde text-[14px] leading-4 font-medium whitespace-pre text-black opacity-50">w/ @Gavriel - Fitness Coach</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 px-5 py-3">
        <Avatar src="/framer/zY7nSlSkqcpPHQHeEv53WnFNW0.png" size={48} />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Pills title={330} width={84} pills={[76, 100]} />
          <div className="flex gap-2">
            <Tag icon={<ChatBubbleMicro width={16} height={16} />} label="Client" />
          </div>
        </div>
      </div>
      <div className="flex gap-4 px-5 py-3">
        <Avatar src="/framer/nJlWKSYMo5wo6zjXFCsVYih2Pg.png" size={48} />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Pills title={218} width={120} pills={[112, 100]} solid />
          <div className="flex gap-2">
            <Tag icon={<ThinkingBubbleIcon width={15} height={15} />} label="In Contact" />
            <Tag icon={<FireIcon width={14} height={14} />} label="Hot lead" />
          </div>
        </div>
      </div>
      <div className="flex gap-4 px-5 py-3">
        <Avatar src="/framer/LEQICsPlLp8B8KuSsCGIOgpbOBE.png" size={48} />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Pills title={330} width={162} pills={[154, 100]} />
          <div className="flex gap-2">
            <Tag icon={<TeamIcon width={17} height={17} />} label="Team" />
          </div>
        </div>
      </div>
      <div className="flex gap-4 px-5 py-3">
        <Avatar src="/framer/PX5O4FL0uQwrxh654mQB40wOOCc.jpg" size={48} />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Pills title={218} width={120} pills={[112, 100]} />
          <div className="flex gap-2">
            <Tag icon={<ChatBubbleMicro width={16} height={16} />} label="Client" runde />
          </div>
        </div>
      </div>
      <ChatRow
        avatar="/framer/FS4yflMMkfQsLt7C5id2NpBes.jpg"
        name="jameson"
        text="stuck at 20k man, need your help .. a month ish and"
        time="5m"
        status={<Tag icon={<PeopleAddIcon width={14} height={14} />} label="New Lead" runde />}
      />
      <ChatRow avatar="/framer/KjwiTbx5jCIS8wOMIXG4wTG9bU.jpg" name="emilyj" text="PDF" time="1w" status={<Tag icon={<PeopleAddIcon width={14} height={14} />} label="New Lead" runde />} />
      <ChatRow
        avatar="/framer/C5KyK9iWwT6Cha13Ur6IgCcav8U.jpg"
        name="markjohnson"
        text="I appreciate the follow-up! We're in the middle of a budget review, but I'm intrigued by your product's analytics features. Can you send me more information?"
        time="2w"
        status={<Status icon={<XCircleMicro width={14} height={14} />} label="Unqualified" />}
      />
      <ChatRow
        avatar="/framer/4TNHAKs9UCPNPRZBHTrzlKfAmSg.jpg"
        name="lucyadams"
        text="Thanks for the email! We're committed to our current vendor for now, but I’d be interested in a quick chat for future possibilities. Could you send me some case studies?"
        time="3w"
        status={<Status icon={<UserPlusMicroSmall width={14} height={11} />} label="New Lead" />}
      />
    </div>
  );
}

const NOTIFICATIONS = [
  { avatar: "/framer/nJlWKSYMo5wo6zjXFCsVYih2Pg.png", bars: [167, 41], time: "3h 42m" },
  { avatar: "/framer/kIWHnPY3n7PHIoXqgPW3DRyuCQ.png", bars: [133, 52], time: "5h 20m" },
  { avatar: "/framer/CdHCf31dizCDWTzsWHizqkTlwY.png", bars: [75, 31], time: "6h 30m" },
];

const BAR_SHADOW =
  "shadow-[0_0_0_0.5px_#e0e0e0,0_1px_2px_0_rgba(0,0,0,0.05),0_0_31.9px_15px_#fafafa,0_12px_20px_0_rgba(168,85,247,0.05),0_-3px_20px_0_rgba(139,92,246,0.12)]";

/** The three "Notification Bar"s stacked over the mobile mockup; they cycle like an iOS notification stack. */
function NotificationStack() {
  const STEP = 2.6;
  const total = STEP * 3;
  // Each bar goes: enters from below (small, transparent) -> front -> behind (smaller, higher) -> gone.
  const keyframes = (i: number) => {
    const times = [0, 0.02, 0.33, 0.35, 0.66, 0.68, 1];
    return {
      y: [120, 120, 0, 0, -52, -52, -100],
      scale: [0.6, 0.6, 1, 1, 0.8, 0.8, 0.6],
      opacity: [0, 0, 1, 1, 1, 1, 0],
      transition: { duration: total, repeat: Infinity, times, delay: i * STEP - total, ease: "easeInOut" as const },
    };
  };
  return (
    <div className="absolute top-[128px] right-5 left-5 md:right-auto md:left-1/2 md:w-[412px] md:-translate-x-1/2">
      {NOTIFICATIONS.map((n, i) => (
        <motion.div
          key={n.time}
          className={`absolute inset-x-0 top-0 flex gap-3.5 rounded-[16px] bg-white px-5 py-3 ${BAR_SHADOW}`}
          style={{ zIndex: 3 - i, originX: 0.5, originY: 0 }}
          initial={{ opacity: 0 }}
          animate={keyframes(i)}
        >
          <Image src={n.avatar} alt="" width={64} height={64} className="size-8 shrink-0 rounded-full object-cover" />
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="flex flex-col gap-2">
              <div className={`h-1.5 max-w-full rounded-2xl ${BAR}`} style={{ width: n.bars[0] }} />
              <div className="h-1.5 rounded-2xl bg-[#f0f0f0]" style={{ width: n.bars[1] }} />
            </div>
            <div className="flex items-center gap-3">
              <p className="text-[12px] leading-[14.4px] font-normal tracking-[-0.2px] whitespace-pre text-[rgba(84,84,84,0.88)]">No reply</p>
              <span className="size-1 rounded-full bg-[#d1d1d1]" />
              <p className="text-[12px] leading-[14.4px] font-normal tracking-[-0.2px] whitespace-pre text-[rgba(84,84,84,0.88)]">{n.time}</p>
            </div>
          </div>
          <div className="relative z-[1] flex size-[34px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#ff383c]">
            <NotificationBellIcon width={17} height={19} className="rotate-2" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/** Framer "Desktop/4" of the full-width "Follow up" card: faded mobile inbox, top fade and the notification stack. */
export function FollowUpMockup() {
  return (
    <>
      <MobileMockup />
      <div aria-hidden className="pointer-events-none absolute top-0 -right-1.5 left-0 h-[43px] bg-[linear-gradient(#fafafa_0%,rgba(250,250,250,0)_100%)]" />
      <NotificationStack />
    </>
  );
}
