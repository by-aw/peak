/** Framer's Inter alternates ("blwf", "cv03", "cv04", "cv09", "cv11": single-storey a, open 6/9, flat 3) used by the text presets. */
export const INTER_ALT = "[font-feature-settings:'blwf','cv03','cv04','cv09','cv11']";

/** Framer preset "CoOlNkTix" (hero h1): Clash Display 700, 38/39.9, 46/48.3, 56/58.8, +0.02em, #1d1d20. */
export const heroHeadingText =
  "text-center font-display text-[38px] leading-[39.9px] font-bold tracking-[0.76px] whitespace-pre-wrap text-ink-3 md:text-[46px] md:leading-[48.3px] md:tracking-[0.92px] lg:text-[56px] lg:leading-[58.8px] lg:tracking-[1.12px]";

/** Framer preset "AjTVhkFA_" (section h2): Clash Display 600 at 32, 40 and 48px, line-height 100%. */
export const sectionHeadingText =
  "text-center font-display text-[32px] leading-[32px] font-semibold whitespace-pre-wrap md:text-[40px] md:leading-[40px] lg:text-[48px] lg:leading-[48px]";

/** Framer preset "w4md0Faie" (h3): Clash Display 600 at 24/28.8, 32/38.4 and 40/48px. */
export const subHeadingText =
  "text-center font-display text-[24px] leading-[28.8px] font-semibold whitespace-pre-wrap md:text-[32px] md:leading-[38.4px] lg:text-[40px] lg:leading-[48px]";

/** The same h3 with the 28/33.6 phone override of the /thank-you-pdf "Users" and "Reel" titles. */
export const reelHeadingText =
  "text-center font-display text-[28px] leading-[33.6px] font-semibold whitespace-pre-wrap md:text-[32px] md:leading-[38.4px] lg:text-[40px] lg:leading-[48px]";

/** Framer preset "GOo8Ckiml" (lead paragraph): Inter 400 at 15/22.5, 16/24 and 18/27, -0.02em. */
export const leadText = `text-[15px] leading-[22.5px] font-normal tracking-[-0.3px] whitespace-pre-wrap md:text-[16px] md:leading-[24px] md:tracking-[-0.32px] lg:text-[18px] lg:leading-[27px] lg:tracking-[-0.36px] ${INTER_ALT}`;

/** Framer preset "RV7Fvj0Yp" (small label): Inter 400 14px, 18.2px line on phone and 16.8px from tablet up, #686a75. */
export const smallLabelText = `text-[14px] leading-[18.2px] font-normal text-gray-550 md:leading-[16.8px] ${INTER_ALT}`;

/** Clouds strip used at the top/bottom of the white sections (Framer "Linear - Top/Bottom", 2398x624 image, 181deg mask). */
export const CLOUDS_SRC = "/framer/3fb6w8IKfGgJQqarb2yoBkkYhw.png";
