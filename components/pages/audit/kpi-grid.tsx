"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { interVariable450 } from "./text";

export type AuditKpi = { label: string; value: number; unit?: string };

/**
 * The Framer "KPI Summary" component (variants Desktop / Tablet / Mobile x Collapse / Expand): a grey 4px-padded tray
 * of white 118px cards (label on top, value 48px below with its unit), three columns on desktop, two on tablet, one on
 * phone. Collapsed, the tray is 204px tall with the grid fading out (mask 45-66% / 59-75% / 80-90% from the bottom)
 * under a centred "View All" button; expanded, it grows to fit and the button ("Collapse", chevron flipped) follows the
 * grid. Live's desktop grid uses fixed 284px columns, which overflow the 748px tray and cut the third column; the
 * columns share the tray here.
 */
export function KpiGrid({ kpis }: { kpis: AuditKpi[] }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={false}
      animate={{ height: open ? "auto" : 204 }}
      transition={{ type: "spring", stiffness: 400, damping: 40 }}
      className="relative flex w-full flex-col items-start gap-1 overflow-hidden rounded-[14px] bg-gray-100 p-1 shadow-[inset_0_0_0_0.5px_#e7e7e7] md:max-w-[554px] lg:max-w-none"
    >
      <div
        className={`grid w-full shrink-0 grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3 ${
          open
            ? ""
            : "[mask-image:linear-gradient(0deg,transparent_80%,#000_90%)] md:[mask-image:linear-gradient(0deg,transparent_59%,#000_75%)] lg:[mask-image:linear-gradient(0deg,transparent_45%,#000_66%)]"
        }`}
      >
        {kpis.map(({ label, value, unit }) => (
          <div key={label} className="flex h-[118px] min-w-0 flex-col items-start gap-12 overflow-hidden rounded-[10px] border-[0.5px] border-gray-150 bg-white p-4">
            <p className={`text-[14px] leading-[14px] whitespace-nowrap text-[rgba(82,82,82,0.8)] tracking-[-0.3px] ${interVariable450}`}>{label}</p>
            <p className="flex items-end gap-1">
              <span className={`text-[24px] leading-[24px] tracking-[-0.3px] text-gray-750 ${interVariable450}`}>{value}</span>
              {unit && <span className={`py-px text-[14px] leading-[14px] tracking-[-0.3px] text-[rgba(82,82,82,0.8)] ${interVariable450}`}>{unit}</span>}
            </p>
          </div>
        ))}
      </div>
      <div className={`flex h-20 w-full shrink-0 flex-col items-center justify-center p-6 ${open ? "" : "absolute inset-x-0 top-[124px]"}`}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex h-8 cursor-pointer items-center justify-center gap-0.5 overflow-hidden rounded-[8px] bg-white p-2 shadow-[0_0_0_0.5px_#e0e0e0,0_1px_2px_rgba(0,0,0,0.05)]"
        >
          <span className="px-0.5 font-sans text-[14px] leading-[14px] font-medium tracking-[-0.2px] whitespace-nowrap text-black">{open ? "Collapse" : "View All"}</span>
          <span aria-hidden className={`flex size-4 items-center justify-center ${open ? "rotate-180" : ""}`}>
            <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
              <path
                d="M6.71973 0.219727C7.01262 -0.0731658 7.48738 -0.0731658 7.78027 0.219727C8.07317 0.51262 8.07317 0.98738 7.78027 1.28027L4.53027 4.53027C4.23738 4.82317 3.76262 4.82317 3.46973 4.53027L0.219727 1.28027C-0.0731666 0.98738 -0.0731666 0.51262 0.219727 0.219727C0.51262 -0.0731666 0.98738 -0.0731666 1.28027 0.219727L4 2.93945L6.71973 0.219727Z"
                fill="#6D6D6D"
              />
            </svg>
          </span>
        </button>
      </div>
    </motion.div>
  );
}
