"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { motion, useAnimate } from "motion/react";
import {
  ChatBubbleMicro,
  CurrencyDollarMicro,
  PhoneMicro,
  RadarGlow,
  StarMicro,
  UserPlusMicro,
  XCircleMicro,
} from "@/components/icons/inbox-mockup-icons";

const BAR = "bg-[linear-gradient(90deg,rgba(227,227,227,0.12)_0%,#e1e1e1_100%)]";
const PILL = "bg-[linear-gradient(90deg,rgba(227,227,227,0.12)_0%,rgba(199,199,199,0.48)_100%)]";

type Row = {
  avatar: string;
  /** Avatar box (32x32 round, or the 34x38 png with the blue counter badge baked in). */
  size: [number, number];
  round?: boolean;
  title: number;
  pills: number[];
  pillsWidth: number;
  badge: string;
  icon: ReactNode;
  /** The badges with a 16px heroicon have 5px left padding, the ones with a 14px "Union" icon 4px. */
  wide?: boolean;
};

const ROWS: Row[] = [
  { avatar: "/framer/54ld3a5oqlabzerddR3jMw1pU.png", size: [32, 32], round: true, title: 330, pills: [200], pillsWidth: 208, badge: "Won", icon: <CurrencyDollarMicro width={14} height={14} /> },
  { avatar: "/framer/N6oM8D4kUHv8b7iShkBzUFrWGis.png", size: [34, 38], title: 330, pills: [104, 272], pillsWidth: 280, badge: "Qualified", icon: <StarMicro width={16} height={16} />, wide: true },
  { avatar: "/framer/jrulYf9WeND55lzqmSF6LBmTGps.png", size: [34, 38], title: 330, pills: [146, 100], pillsWidth: 154, badge: "New lead", icon: <UserPlusMicro width={16} height={16} />, wide: true },
  { avatar: "/framer/IQDHCMhRgEMHjRpZjnzflzpcR8.png", size: [34, 38], title: 330, pills: [146, 100], pillsWidth: 154, badge: "In contact", icon: <ChatBubbleMicro width={16} height={16} />, wide: true },
  { avatar: "/framer/A2CaBstMLgXzDcJ9EXvDbGKvJBI.png", size: [34, 38], title: 330, pills: [146, 100], pillsWidth: 154, badge: "Call booked", icon: <PhoneMicro width={12} height={12} />, wide: true },
  { avatar: "/framer/ICgigxvbi3Tlr2muOMgBV9GyHys.png", size: [32, 36], title: 242, pills: [162, 84], pillsWidth: 314, badge: "Unqualified", icon: <XCircleMicro width={14} height={14} /> },
  { avatar: "/framer/IQDHCMhRgEMHjRpZjnzflzpcR8.png", size: [34, 38], title: 210, pills: [122, 72], pillsWidth: 130, badge: "No show", icon: <XCircleMicro width={14} height={14} /> },
];

function InboxRow({ row, selected }: { row: Row; selected: boolean }) {
  return (
    <div className={`flex w-full gap-4 px-4 py-3 ${selected ? "bg-gray-25" : ""}`}>
      <div className="flex h-9 shrink-0 items-center">
        <Image
          src={row.avatar}
          alt=""
          width={row.size[0] * 2}
          height={row.size[1] * 2}
          className={`${row.round ? "rounded-full" : ""} object-cover`}
          style={{ width: row.size[0], height: row.size[1] }}
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div className="flex flex-col gap-2.5">
          <div className={`h-[7px] max-w-full rounded-2xl ${BAR}`} style={{ width: row.title }} />
          <div className="flex max-w-full flex-col gap-1.5 rounded bg-[rgba(243,232,255,0.52)] p-1" style={{ width: row.pillsWidth }}>
            {row.pills.map((w, i) => (
              <div key={i} className={`h-1.5 max-w-full rounded-2xl ${PILL}`} style={{ width: w }} />
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <div className={`flex items-center gap-0.5 rounded-full bg-white py-1 pr-2 ${row.wide ? "pl-[5px]" : "pl-1"}`}>
            <span className="flex size-4 shrink-0 items-center justify-center">{row.icon}</span>
            <span className="px-px text-[12px] leading-[12px] font-medium tracking-[-0.2px] whitespace-pre text-gray-500">{row.badge}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const TABS = ["All", "Todo", "Unread"];

/**
 * Framer "Smart Inbox" list of the Priority Inbox hero: header, tab bar and the conversation rows,
 * which keep scrolling up one row at a time (spring; the list remounts with the rotated rows after each
 * step) while a dark "Radar" glow pulses over the list.
 */
export function SmartInboxCard() {
  const [order, setOrder] = useState(0);
  const [scope, animate] = useAnimate<HTMLDivElement>();

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      while (!cancelled) {
        await new Promise((r) => setTimeout(r, 2200));
        if (cancelled || !scope.current) return;
        const first = scope.current.children[0] as HTMLElement | undefined;
        if (!first) return;
        await animate(scope.current, { y: [0, -first.offsetHeight] }, { type: "spring", stiffness: 150, damping: 30 });
        if (cancelled) return;
        setOrder((o) => o + 1);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [animate, scope]);

  const rows = ROWS.map((_, i) => ROWS[(i + order) % ROWS.length]);

  return (
    <div className="relative h-[409px] w-full overflow-hidden rounded-[24px] md:h-[589px] lg:h-auto lg:flex-1 lg:self-stretch">
      <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
        <Image src="/framer/5BG1u65jusqf5LWrbgYuy8iLDm4.png" alt="" fill preload sizes="(min-width: 1200px) 568px, (min-width: 810px) 928px, 100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 flex items-start overflow-hidden rounded-[16px] pt-10 pr-10">
        <div className="relative flex min-w-0 flex-1 flex-col items-center overflow-clip rounded-tr-[16px] bg-[#e7e7e7] pt-1.5 pr-1.5 pb-1.5">
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-[64%] z-[1] aspect-[528/425]"
            animate={{ opacity: [0, 0.7, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <RadarGlow width="100%" height="100%" />
          </motion.div>
          <div className="flex w-full flex-col overflow-hidden rounded-tr-[12px] bg-white">
            <div className="relative z-[3] flex flex-col gap-2.5 bg-white px-4 py-3">
              <p className="text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] text-black">Inbox</p>
              <p className="text-[14px] leading-[14px] font-normal tracking-[-0.2px] text-gray-500">Your unified chat workspace</p>
            </div>
            <div className="relative z-[3] flex w-full bg-white">
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-[#efefef]" />
              {TABS.map((tab, i) => (
                <div key={tab} className="relative flex flex-1 items-center justify-center gap-1.5 px-4 py-3">
                  <p className={`text-center text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre ${i === 0 ? "text-black" : "text-gray-500"}`}>{tab}</p>
                  {i === 0 && <p className="text-center text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre text-gray-500">[256]</p>}
                  {i === 0 && <div aria-hidden className="absolute inset-x-8 bottom-0 z-[1] h-px rounded-full bg-black" />}
                </div>
              ))}
            </div>
            <div key={order} ref={scope} className="flex w-full flex-col">
              {rows.map((row, i) => (
                <InboxRow key={`${order}-${i}`} row={row} selected={i === 0} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden className="pointer-events-none absolute right-10 bottom-0 left-0 z-[1] h-[92px] bg-[linear-gradient(rgba(255,255,255,0)_0%,#fff_100%)]" />
    </div>
  );
}
