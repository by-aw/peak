import type { ReactNode } from "react";

/**
 * Framer "Closer Section" / "Efficiency Section" template of the feature pages:
 * centered 48px Clash Display heading (468px wide) above a 2-column grid of 540px bento cards
 * (1 column of 928px on tablet, 350px on phone). Section padding 80/100 -> 64/48 -> 48/20.
 */
export function FeatureSection({
  heading,
  headingClassName = "text-center text-ink-3",
  description,
  children,
  after,
  layout = "grid",
  tone = "white",
  label,
  cardsAlign = "stretch",
}: {
  heading: ReactNode;
  /** The Framer headings are centered except on pages where the text block is left-aligned (`text-left`); includes the colour. */
  headingClassName?: string;
  /** Framer "Section introduction" paragraph under the heading (8px gap). */
  description?: ReactNode;
  children: ReactNode;
  /** Extra content rendered 20px under the card grid (e.g. the Framer "Card Grid" of small icon cards). */
  after?: ReactNode;
  /** `grid`: 2x540px CSS grid (rows stretch). `row`: Framer "Bento Cards" flex row, cards vertically centered. */
  layout?: "grid" | "row";
  /** Section background: white (default) or #fafafa (the Framer Efficiency Section variant with white cards). */
  tone?: "white" | "gray";
  label?: string;
  /** Vertical alignment of the cards in a grid row: stretched (default) or top-aligned (the Priority Inbox / Personalization grids, whose shorter cards keep their own height). */
  cardsAlign?: "stretch" | "start";
}) {
  return (
    <section
      className={`relative flex w-full flex-col items-center overflow-clip px-5 py-12 md:px-12 md:py-16 lg:px-[100px] lg:py-20 ${tone === "gray" ? "bg-gray-25" : ""}`.trim()}
      aria-label={label}
    >
      <div className="flex w-full max-w-[1100px] flex-col items-center gap-10 overflow-clip md:gap-12 lg:gap-16">
        <div className="flex w-full max-w-[468px] flex-col items-center gap-4">
          <div className="flex w-full flex-col items-center gap-2">
            <h2
              className={`w-full font-display text-[32px] leading-[32px] font-semibold whitespace-pre-wrap md:text-[40px] md:leading-[40px] lg:text-[48px] lg:leading-[48px] ${headingClassName}`}
            >
              {heading}
            </h2>
            {description}
          </div>
        </div>
        <div className="flex w-full flex-col gap-5">
          {layout === "row" ? (
            <div className="flex w-full flex-col gap-5 lg:flex-row lg:items-center">{children}</div>
          ) : (
            <div className={`grid w-full grid-cols-1 gap-5 lg:grid-cols-[540px_540px] ${cardsAlign === "start" ? "items-start" : ""}`.trim()}>{children}</div>
          )}
          {after}
        </div>
      </div>
    </section>
  );
}

/** Framer "Section introduction": 16px/23.2px #42424a paragraph under a section heading (14px/20.3px on phones). */
export function SectionIntro({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`w-full text-[14px] leading-[20.3px] font-normal tracking-[-0.14px] whitespace-pre-wrap text-gray-750 md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px] ${className}`.trim()}
    >
      {children}
    </p>
  );
}

/**
 * One bento card: #fafafa (or white), 24px radius, 1px #f2f2f2 hairline (Framer `::after`), clipped, content
 * vertically centered like the Framer "Container"; the mockup area goes first, the copy block last.
 */
export function BentoCard({ children, className = "", tone = "gray" }: { children: ReactNode; className?: string; tone?: "gray" | "white" }) {
  return (
    <div
      className={`relative flex w-full flex-col justify-center overflow-hidden rounded-[24px] shadow-[inset_0_0_0_1px_#f2f2f2] ${tone === "gray" ? "bg-gray-25" : "bg-white"} ${className}`.trim()}
    >
      {children}
    </div>
  );
}

/**
 * Mockup area of a bento card: a fixed-height box, clipped, with the Framer mask
 * (`maskImage` fading the bottom of the mockup into the card background).
 */
export function BentoAsset({ children, className = "", mask = "bottom" }: { children: ReactNode; className?: string; mask?: "bottom" | "bottom-17" | "bottom-14" }) {
  const masks = {
    bottom: "[mask-image:linear-gradient(#000_83%,rgba(0,0,0,0)_100%)]",
    "bottom-17": "[mask-image:linear-gradient(0deg,rgba(0,0,0,0)_0%,#000_17%)]",
    "bottom-14": "[mask-image:linear-gradient(0deg,rgba(0,0,0,0)_0%,#000_14%)]",
  } as const;
  return <div className={`relative w-full overflow-hidden ${masks[mask]} ${className}`.trim()}>{children}</div>;
}

/**
 * Copy block of a bento card. With an `eyebrow` it is the Framer "Copy" variant (24px padding,
 * 16px gap, eyebrow + title/description group); without it the "Text" variant (24px padding, 12px gap).
 */
export function BentoCopy({
  eyebrow,
  eyebrowMuted = false,
  title,
  description,
  bodyClassName = "",
}: {
  eyebrow?: string;
  /** Muted eyebrow (14px, #686a75) as on the Personalization page; default is 16px black (Priority Inbox). */
  eyebrowMuted?: boolean;
  title: string;
  description: string;
  /** Width constraints of the body: on the title/description group (eyebrow variant) or the description (text variant), e.g. the 472px / 454px tablet widths of the Priority Inbox cards. */
  bodyClassName?: string;
}) {
  const titleEl = (
    <p className="text-[16px] leading-[19.2px] font-semibold tracking-[-0.48px] whitespace-pre-wrap text-ink-3 md:text-[18px] md:leading-[21.6px] md:tracking-[-0.54px] lg:text-[20px] lg:leading-[24px] lg:tracking-[-0.6px]">
      {title}
    </p>
  );
  const descEl = (
    <p className={`text-[14px] leading-[20.3px] font-normal tracking-[-0.14px] whitespace-pre-wrap text-[#383840] md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px] ${eyebrow ? "" : bodyClassName}`.trim()}>
      {description}
    </p>
  );
  if (!eyebrow) {
    return (
      <div className="flex w-full flex-col items-start gap-3 p-6">
        {titleEl}
        {descEl}
      </div>
    );
  }
  return (
    <div className="flex w-full flex-col items-start gap-4 p-6">
      <p
        className={
          eyebrowMuted
            ? "text-[14px] leading-[18.2px] font-normal whitespace-pre-wrap text-gray-550 md:leading-[16.8px]"
            : "text-[16px] leading-[19.2px] font-normal whitespace-pre-wrap text-black"
        }
      >
        {eyebrow}
      </p>
      <div className={`flex w-full flex-col items-start gap-1.5 ${bodyClassName}`.trim()}>
        {titleEl}
        {descEl}
      </div>
    </div>
  );
}
