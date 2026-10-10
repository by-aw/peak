import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { CONTAINER, WRAPPER, line } from "./grid";
import { RollingButton } from "./rolling-button";

export type HeroLink = { label: string; href: string };

type Props = {
  /** Optional pill rendered above the headline (Framer "Badge"). */
  badge?: ReactNode;
  title: string;
  description: string;
  primary: HeroLink;
  secondary?: HeroLink;
  /** Width of the "Hero Content" column on desktop (758 on the sub pages, 688 on /attribution); 688 on tablet. */
  contentWidth?: number;
  /** Max width of the h1 box inside the column (610 on /attribution/lead-profiles; full column otherwise). */
  titleWidth?: number;
  /** Width of the description box on desktop (Framer fixed-width text layer). */
  descriptionWidth?: number;
  /** Description width on tablet. */
  descriptionWidthTablet?: number;
};

/**
 * Attribution template "Hero Section": headline (left aligned inside a centred column), centred
 * description and the black/white button pair. Starts at y=0 under the fixed nav (padding-top 160/160/128).
 */
export function AttributionHero({ badge, title, description, primary, secondary, contentWidth = 758, titleWidth, descriptionWidth = 420, descriptionWidthTablet = 376 }: Props) {
  return (
    <section className="flex w-full flex-col items-center">
      <div className={WRAPPER}>
        <div className={`${CONTAINER} ${line("after:border-x")} flex flex-col items-center px-3 pb-12 pt-32 md:px-0 md:pb-16 md:pt-40 lg:pb-20`}>
          <div className="flex w-full flex-col items-center gap-12 md:max-w-[688px] lg:max-w-(--cw)" style={{ "--cw": `${contentWidth}px` } as React.CSSProperties}>
            <div className="flex w-full flex-col items-center gap-6">
              {badge ? <Reveal y={48} delay={0.2}>{badge}</Reveal> : null}
              <Reveal y={48} delay={0.2} className="w-full" style={titleWidth ? { maxWidth: titleWidth } : undefined}>
                <h1 className="font-display text-[32px] font-bold leading-[36.8px] tracking-[0.64px] whitespace-pre-wrap text-ink-3 md:text-[40px] md:leading-[46px] md:tracking-[0.8px] lg:text-[48px] lg:leading-[55.2px] lg:tracking-[0.96px]">
                  {title}
                </h1>
              </Reveal>
              <Reveal y={48} delay={0.2} className="w-full md:w-(--w-md) lg:w-(--w-lg)" style={{ "--w-md": `${descriptionWidthTablet}px`, "--w-lg": `${descriptionWidth}px` } as React.CSSProperties}>
                <p className="text-center text-[15px] font-normal leading-[22.5px] tracking-[-0.3px] text-ink-3 md:text-[16px] md:leading-[24px] md:tracking-[-0.32px] lg:text-[18px] lg:leading-[27px] lg:tracking-[-0.36px]">
                  {description}
                </p>
              </Reveal>
            </div>
            <Reveal y={32} delay={0.3} className="flex w-full flex-col items-center gap-2.5 md:w-[379px] md:flex-row">
              <RollingButton href={primary.href} className="w-full md:flex-1" variant="black">
                {primary.label}
              </RollingButton>
              {secondary ? (
                <RollingButton href={secondary.href} className="w-full md:flex-1" variant="white">
                  {secondary.label}
                </RollingButton>
              ) : null}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
