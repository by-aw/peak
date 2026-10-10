import type { ReactNode } from "react";
import { MainButton } from "./main-button";

type FeatureHeroProps = {
  /** Page headline (h1). */
  title: ReactNode;
  /**
   * `display`: 48px Clash Display bold headline (most feature pages).
   * `eyebrow`: the 16px Inter h1 used by the Priority Inbox page.
   */
  titleVariant?: "display" | "eyebrow";
  /** Heading element. Framer uses an h2 on some pages (e.g. Team Collaboration). */
  as?: "h1" | "h2";
  /** Optional block between the headline and the paragraph (e.g. the purple "The Problem" callout of Sales Performance). */
  highlight?: ReactNode;
  description: ReactNode;
  descriptionClassName?: string;
  ctaHref: string;
  ctaLabel?: string;
  /** Right-hand (desktop) / bottom (tablet, phone) mockup card. It must size itself (`w-full lg:flex-1 ...`). */
  card: ReactNode;
  /** Extra classes for the copy column, e.g. the desktop width (`lg:w-[632px]`). */
  contentClassName?: string;
};

/**
 * Framer "Hero Section" template of the feature pages: copy column (headline, paragraph, CTA)
 * next to a mockup card on desktop; stacked (copy, then card) on tablet and phone.
 * Desktop: 80px/100px padding, 1200px container. Tablet: 80px 48px 64px, 48px gap. Phone: 64px 20px 48px, 40px gap.
 */
export function FeatureHero({
  title,
  titleVariant = "display",
  as: Heading = "h1",
  highlight,
  description,
  descriptionClassName = "text-[#383840]",
  ctaHref,
  ctaLabel = "Start Free Trial",
  card,
  contentClassName = "",
}: FeatureHeroProps) {
  return (
    <section className="relative flex w-full flex-col items-center overflow-clip">
      <div className="flex w-full flex-col items-center px-5 pt-16 pb-12 md:px-12 md:pt-20 md:pb-16 lg:px-[100px] lg:py-20">
        <div className="flex w-full max-w-[1200px] flex-col items-start gap-10 md:gap-12 lg:flex-row lg:items-center lg:gap-0">
          <div className={`flex w-full flex-col items-start gap-6 md:pr-16 ${contentClassName}`.trim()}>
            <div className="flex w-full flex-col items-start gap-8 md:w-[594px] lg:w-[468px]">
              <div className="flex w-full flex-col items-start gap-4 md:gap-5 lg:gap-6">
                {titleVariant === "eyebrow" ? (
                  <Heading className="text-[16px] leading-[19.2px] font-normal whitespace-pre-wrap text-black">{title}</Heading>
                ) : (
                  <Heading className="font-display text-[32px] leading-[36.8px] font-bold tracking-[0.64px] whitespace-pre-wrap text-ink-3 md:text-[40px] md:leading-[46px] md:tracking-[0.8px] lg:text-[48px] lg:leading-[55.2px] lg:tracking-[0.96px]">
                    {title}
                  </Heading>
                )}
                {highlight}
                <p
                  className={`text-[14px] leading-[20.3px] font-normal tracking-[-0.14px] whitespace-pre-wrap md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px] ${descriptionClassName}`}
                >
                  {description}
                </p>
              </div>
              <div className="flex w-full flex-wrap items-center gap-4">
                <MainButton href={ctaHref} className="w-full md:w-auto">
                  {ctaLabel}
                </MainButton>
              </div>
            </div>
          </div>
          {card}
        </div>
      </div>
    </section>
  );
}
