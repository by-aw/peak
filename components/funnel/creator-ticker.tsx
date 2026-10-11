"use client";

import { CreatorRing } from "@/components/shared/creator-carousel";
import { Reveal } from "@/components/ui/reveal";

/** The bare ring lives with the feature pages' carousel; re-exported for the funnel pages that nest it. */
export { CreatorRing };

/**
 * Label on /vsl, /vsl-2 and /thank-you-pdf. The live copy ends in a space, which (with `white-space: pre-wrap`) shifts the
 * centred last line 3px to the left, so it is kept.
 */
export const CREATOR_TICKER_LABEL = "Already installed for 120+ industry leaders ";
/** Label on /thank-you (same text without the trailing space). */
export const CREATOR_TICKER_LABEL_THANK_YOU = "Already installed for 120+ industry leaders";
/** Label on /learn (no trailing space). */
export const CREATOR_TICKER_LABEL_LEARN = "Already running inside 120+ six and seven-figure info businesses";

/** Ring box heights (phone / tablet / desktop) and the header-to-ring gap used by the two layouts. */
const SIZES = {
  /** /vsl, /vsl-2: 200 / 256 / 356px ring, 8 / 48 / 64px gap. */
  short: { ring: "h-[200px] md:h-[256px] lg:h-[356px]", gap: "gap-2 md:gap-12 lg:gap-16", desktopPb: 120 },
  /** /thank-you-pdf, /learn, /thank-you: 200 / 327 / 520px ring, 8 / 48 / 0px gap. */
  tall: { ring: "h-[200px] md:h-[327px] lg:h-[520px]", gap: "gap-2 md:gap-12 lg:gap-0", desktopPb: 0 },
} as const;

/**
 * Framer "Trust Section 2" used by the funnel pages: a centred Clash Display heading (appears with the Framer
 * fade/slide-up) over the 3D creator ring (`CreatorRing` from `components/shared/creator-carousel`).
 *
 * Section padding 48/20/16 on phone, 64/48 on tablet and 80/0/`desktopPaddingBottom` on desktop, content at most
 * 1360px wide. Heading: Clash Display 600 at 24/28.8, 32/38.4 and 40/48px, black, centred, at most 448px wide.
 *
 * | page          | props                                                         |
 * | ------------- | ------------------------------------------------------------- |
 * | /vsl          | (defaults)                                                    |
 * | /vsl-2        | `desktopPaddingBottom={80}`                                   |
 * | /thank-you-pdf| `size="tall"`                                                 |
 * | /learn        | `size="tall" label={CREATOR_TICKER_LABEL_LEARN}`              |
 *
 * /thank-you nests the ring in its own stack under a 580px-wide heading (`CREATOR_TICKER_LABEL_THANK_YOU`) and a
 * 189px phone ring: render its own heading and `<CreatorRing className="h-[189px] md:h-[327px] lg:h-[520px]" />` there.
 */
export function CreatorTicker({
  label = CREATOR_TICKER_LABEL,
  size = "short",
  desktopPaddingBottom,
  labelMaxWidth = 448,
}: {
  /** Heading text (default: the /vsl text). */
  label?: string;
  /** "short": 200/256/356 ring, 8/48/64 gap, 120px desktop bottom padding (/vsl, /vsl-2). "tall": 200/327/520 ring, 8/48/0 gap, no desktop bottom padding (/thank-you-pdf, /learn). */
  size?: keyof typeof SIZES;
  /** Desktop (>=1200px) bottom padding in px; defaults to 120 for "short" and 0 for "tall". */
  desktopPaddingBottom?: number;
  /** Max width of the heading in px (448 on every page but /thank-you). */
  labelMaxWidth?: number;
}) {
  const s = SIZES[size];
  return (
    <section
      className="relative flex w-full items-center justify-center"
      style={{ "--ct-pb": `${desktopPaddingBottom ?? s.desktopPb}px`, "--ct-label-w": `${labelMaxWidth}px` } as React.CSSProperties}
    >
      <div className="flex w-full flex-1 items-center justify-center px-5 pt-12 pb-4 md:px-12 md:py-16 lg:px-0 lg:pt-20 lg:pb-(--ct-pb)">
        <div className={`flex w-full max-w-[1360px] flex-1 flex-col items-center ${s.gap}`}>
          <Reveal className="flex w-full flex-col items-center">
            <h3 className="w-full max-w-(--ct-label-w) text-center font-display text-[24px] leading-[28.8px] font-semibold whitespace-pre-wrap text-black md:text-[32px] md:leading-[38.4px] lg:text-[40px] lg:leading-[48px]">
              {label}
            </h3>
          </Reveal>
          <CreatorRing className={s.ring} />
        </div>
      </div>
    </section>
  );
}
