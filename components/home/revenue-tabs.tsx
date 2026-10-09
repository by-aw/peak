"use client";

import { motion } from "motion/react";

type Tab = {
  label: string;
  heading: string;
  body: string;
};

/** Tab copy taken verbatim from the live Framer page (desktop variant). */
export const revenueTabs: Tab[] = [
  {
    label: "Ask Mochi",
    heading: "See exactly where revenue is leaking",
    body: "Connect Mochi AI to Claude via MCP to chat with conversations, automations, and sales data. Uncover bottlenecks and discover opportunities.",
  },
  {
    label: "Funnel Dashboard",
    heading: "See exactly where revenue is leaking",
    body: "Mochi connects every conversation, setter action, funnel stage and lead source in one live view. See what needs fixing before another opportunity goes cold.",
  },
  {
    label: "Performance Reports",
    heading: "Know if the work is actually getting done",
    body: "See replies, follow-ups, conversations started and calls booked across your entire team without chasing setters for updates.",
  },
];

/**
 * The three Revenue Section tabs with a sliding active pill. On phones the labels are smaller and wrap onto two lines.
 * `layoutId` must differ between the phone and tablet/desktop bars, which are both mounted.
 */
export function RevenueTabBar({
  active,
  onChange,
  layoutId,
}: {
  active: number;
  onChange: (index: number) => void;
  layoutId: string;
}) {
  return (
    <div className="relative flex w-full rounded-[12px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]">
      {revenueTabs.map((t, i) => (
        <button
          key={t.label}
          type="button"
          onClick={() => onChange(i)}
          className="relative z-[3] flex min-h-12 flex-1 cursor-pointer flex-col items-center justify-center rounded-[12px] px-2 py-[14px] md:p-[14px]"
        >
          {active === i && (
            <motion.span
              layoutId={layoutId}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-0 z-0 rounded-[12px] bg-black/5"
            />
          )}
          <span className="relative z-[1] text-center text-[15px] font-medium leading-5 tracking-[-0.24px] text-black/80 md:text-[18px] md:whitespace-pre">
            {t.label}
          </span>
        </button>
      ))}
    </div>
  );
}
