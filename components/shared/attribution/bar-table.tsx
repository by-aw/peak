import type { ReactNode } from "react";

export type BarRow = {
  icon: ReactNode;
  label: string;
  value: string;
  /** Grey / green bar widths as a fraction of the row width (Framer "Cell (Colour)"). */
  gray: number;
  green?: number;
};

/** One 36px row: coloured bars behind, avatar/icon + label left, value right. */
export function BarTableRow({ row }: { row: BarRow }) {
  const hasGreen = (row.green ?? 0) > 0;
  return (
    <div className="relative flex h-9 w-full flex-col justify-center py-2">
      <div aria-hidden className="absolute inset-0 flex items-center gap-1">
        <div className={`h-9 bg-[#f2f2f2] ${hasGreen ? "rounded-l-[8px]" : "rounded-[8px]"}`} style={{ width: `${row.gray * 100}%` }} />
        {hasGreen ? <div className="h-9 rounded-r-[8px] bg-[#d6f1dd]" style={{ width: `${(row.green ?? 0) * 100}%` }} /> : null}
      </div>
      <div className="relative z-[2] flex w-full items-center justify-between px-2.5">
        <div className="flex items-center gap-2">
          <div className="relative size-5 shrink-0 overflow-hidden">{row.icon}</div>
          <p className="text-[14px] font-normal leading-[14.7px] tracking-[-0.2px] whitespace-pre text-black">{row.label}</p>
        </div>
        <p className="text-right text-[14px] font-normal leading-[14px] tracking-[-0.2px] whitespace-pre text-gray-500">{row.value}</p>
      </div>
    </div>
  );
}

type Props = { title: string; meta: string; rows: BarRow[]; className?: string; children?: ReactNode; contentClassName?: string };

/**
 * White 16px-radius table card used by the dashboard mockups (Framer "Desktop/1" / "D1-1"):
 * header row (title left, meta right) and a list of bar rows. `children` is rendered inside the
 * content area for overlays (e.g. the devices list that fades in over the countries list).
 */
export function BarTable({ title, meta, rows, className = "", children, contentClassName = "" }: Props) {
  return (
    <div className={`relative flex w-full flex-col overflow-hidden rounded-[16px] bg-white after:pointer-events-none after:absolute after:inset-0 after:rounded-[16px] after:border after:border-gray-150 ${className}`}>
      <div className="relative flex w-full items-center justify-between p-4 after:pointer-events-none after:absolute after:inset-0 after:border-b after:border-gray-150">
        <p className="text-[14px] font-medium leading-[14.7px] tracking-[-0.2px] whitespace-pre text-black">{title}</p>
        <p className="text-[12px] font-normal leading-[12.6px] tracking-[-0.2px] whitespace-pre text-[#494949]">{meta}</p>
      </div>
      <div className={`relative flex w-full flex-col gap-2 p-2.5 ${contentClassName}`}>
        <div className="flex w-full flex-col gap-1">
          {rows.map((row) => (
            <BarTableRow key={row.label} row={row} />
          ))}
        </div>
        {children}
      </div>
    </div>
  );
}
