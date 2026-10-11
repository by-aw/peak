"use client";

import Image from "next/image";

type Tab = {
  label: string;
  /** Tab icon, sized as it sits in the 32px circle (mochi-web-v2 Figma, node 545:20676). */
  icon: { src: string; size: number };
  heading: string;
  body: string;
};

/** Tab copy taken verbatim from the live Framer page (desktop variant). */
export const revenueTabs: Tab[] = [
  {
    label: "Ask Mochi",
    icon: { src: "/ask-mochi.svg", size: 28 },
    heading: "See exactly where revenue is leaking",
    body: "Connect Mochi AI to Claude via MCP to chat with conversations, automations, and sales data. Uncover bottlenecks and discover opportunities.",
  },
  {
    label: "Funnel Dashboard",
    icon: { src: "/icon-layout-dashboard.svg", size: 20 },
    heading: "See exactly where revenue is leaking",
    body: "Mochi connects every conversation, setter action, funnel stage and lead source in one live view. See what needs fixing before another opportunity goes cold.",
  },
  {
    label: "Performance Reports",
    icon: { src: "/icon-file-chart.svg", size: 20 },
    heading: "Know if the work is actually getting done",
    body: "See replies, follow-ups, conversations started and calls booked across your entire team without chasing setters for updates.",
  },
];

/**
 * The three Revenue Section tabs as icon + label pills (mochi-web-v2 Figma, node 545:20676). The active tab is filled,
 * the others outlined.
 * - `labels="active"` (phone): only the active tab shows its label and fills the row, the others shrink to 44px icon
 *   circles. The width change animates through flex-grow and the label through a 0fr → 1fr grid column, so the text
 *   is clipped rather than squashed while it opens.
 * - `labels="all"` (tablet / desktop): every tab shows its label and they share the row equally.
 */
export function RevenueTabBar({
  active,
  onChange,
  labels,
}: {
  active: number;
  onChange: (index: number) => void;
  labels: "active" | "all";
}) {
  return (
    <div className="flex w-full gap-2">
      {revenueTabs.map((t, i) => {
        const selected = i === active;
        const showLabel = selected || labels === "all";
        return (
          <button
            key={t.label}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(i)}
            className={`flex h-11 min-w-0 basis-11 cursor-pointer items-center justify-center overflow-hidden rounded-full p-1.5 transition-[flex-grow,background-color,box-shadow] duration-300 ease-out ${
              showLabel ? "grow" : "grow-0"
            } ${
              selected
                ? "bg-black/5 shadow-[inset_0_0_0_1px_rgba(0,0,0,0)]"
                : "bg-transparent shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]"
            }`}
          >
            <span
              className={`flex size-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                selected ? "bg-white" : "bg-black/5"
              }`}
            >
              <Image src={t.icon.src} alt="" width={t.icon.size} height={t.icon.size} />
            </span>
            <span
              className={`grid min-w-0 transition-[grid-template-columns,opacity] duration-300 ease-out ${
                showLabel ? "grid-cols-[1fr] opacity-100" : "grid-cols-[0fr] opacity-0"
              }`}
            >
              <span className="min-w-0 overflow-hidden whitespace-nowrap pl-2.5 pr-2 text-[15px] font-medium leading-5 tracking-[-0.24px] text-black/80">
                {t.label}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
