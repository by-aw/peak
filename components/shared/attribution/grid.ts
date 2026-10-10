/**
 * Framer draws the thin layout grid of the attribution pages with `::after` pseudo elements
 * (1px #e7e7e7 lines inset 0). These helpers reproduce that without affecting layout.
 * Usage: `className={line("after:border-x")}` (element becomes `relative`).
 */
const base = "relative after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border-gray-150";

export function line(sides: string) {
  return `${base} ${sides}`;
}

/** Page container: 1100px column with 100px gutters on desktop, 48px on tablet, 20px on phone. */
export const WRAPPER = "flex w-full flex-col items-center px-5 md:px-12 lg:px-[100px]";
export const CONTAINER = "w-full max-w-[1100px]";

/** Section heading styles (Framer "Heading" h3 + description) shared by the attribution templates. */
export const H3 =
  "text-center font-display font-semibold text-black text-[24px] leading-[28.8px] md:text-[32px] md:leading-[38.4px] lg:text-[40px] lg:leading-[48px]";
export const LEAD =
  "text-center font-normal text-ink-3 text-[15px] leading-[22.5px] tracking-[-0.3px] md:text-[16px] md:leading-[24px] md:tracking-[-0.32px] lg:text-[18px] lg:leading-[27px] lg:tracking-[-0.36px]";
