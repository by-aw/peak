import { interFeatures } from "@/components/shared/inter-features";

/**
 * Type styles shared by the /partner sections (Framer text presets of the page, 24/32/40 headings and 16/18/20 titles
 * on phone / tablet / desktop). Colours: ink-3 `#1d1d20`, gray-550 `#686a75`. The Inter text presets carry the Open Type
 * features `interFeatures` (single-storey "a" etc.; the live page sets them on every preset-styled text, not on the
 * inline-styled tier labels/ranges/captions, the eligibility note or the rolling button letters).
 */

/** Framer preset 4rn2g7: Clash Display 600, 120% line height, 24px (phone) / 32px (tablet) / 40px (desktop), black. */
export const sectionHeading =
  "font-display text-[24px] leading-[28.8px] font-semibold text-black md:text-[32px] md:leading-[38.4px] lg:text-[40px] lg:leading-[48px]";

/** Framer preset nx3gew: card title, Inter 600, 16/19.2 (phone), 18/21.6 (tablet), 20/24 (desktop), tracking -3%. */
export const cardTitle =
  `${interFeatures} text-[16px] leading-[19.2px] font-semibold tracking-[-0.48px] text-ink-3 md:text-[18px] md:leading-[21.6px] md:tracking-[-0.54px] lg:text-[20px] lg:leading-[24px] lg:tracking-[-0.6px]`;

/** Framer preset 1csphh0: card copy, Inter 400, 14/20.3 (phone), 16/23.2 (tablet + desktop), tracking -1%. */
export const cardBody =
  `${interFeatures} text-[14px] leading-[20.3px] font-normal tracking-[-0.14px] md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px]`;

/** Framer preset 1i5rwii: section lead, Inter 400 at 80% opacity, 15/22.5 (phone), 16/24 (tablet), 18/27 (desktop). */
export const leadText =
  `${interFeatures} text-[15px] leading-[22.5px] font-normal tracking-[-0.3px] text-ink-3 opacity-80 md:text-[16px] md:leading-6 md:tracking-[-0.32px] lg:text-[18px] lg:leading-[27px] lg:tracking-[-0.36px]`;
