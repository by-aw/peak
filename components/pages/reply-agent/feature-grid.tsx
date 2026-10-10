import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { FeatureHeading } from "@/components/shared/feature-heading";

export type FeatureCard = {
  /** Mockup rendered in the top (masked) part of the card. */
  asset: ReactNode;
  /** Height of the masked asset area per breakpoint (phone / tablet / desktop), in px. */
  assetHeight: [number, number, number];
  label: string;
  title: string;
  description: string;
};

const HEIGHTS: Record<number, string> = {
  280: "h-[280px]",
  288: "h-[288px]",
  302: "h-[302px]",
  304: "h-[304px]",
  314: "h-[314px]",
  320: "h-[320px]",
  338: "h-[338px]",
};
const MD_HEIGHTS: Record<number, string> = {
  302: "md:h-[302px]",
  314: "md:h-[314px]",
  338: "md:h-[338px]",
};
const LG_HEIGHTS: Record<number, string> = {
  302: "lg:h-[302px]",
  314: "lg:h-[314px]",
  338: "lg:h-[338px]",
};

/**
 * Framer "Features / Operations / Management Section" template of the Reply Agent page: centered heading and a
 * 2x2 grid (1 column under 1200px) of grey 24px-radius cards, each with a masked mockup on top and copy below.
 * Section heights: 1246 (desktop) / ~2082 (tablet) / ~2158 (phone).
 */
export function FeatureGrid({ heading, cards, label }: { heading: ReactNode; cards: FeatureCard[]; label: string }) {
  return (
    <section className="flex w-full flex-col items-center overflow-clip px-5 py-12 md:px-12 md:py-16 lg:px-[100px] lg:py-20" aria-label={label}>
      <div className="flex w-full max-w-[1200px] flex-col items-center">
        <div className="flex w-full max-w-[928px] flex-col items-center gap-10 md:gap-12 lg:max-w-[1100px] lg:gap-16">
          <Reveal y={48} delay={0.2} className="flex w-full flex-col items-center">
            <FeatureHeading className="max-w-[700px]">{heading}</FeatureHeading>
          </Reveal>
          <Reveal y={48} delay={0.2} className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
            {cards.map((card) => (
              <div key={card.title} className="flex w-full flex-col items-center justify-center overflow-hidden rounded-[24px] bg-gray-25 inset-ring-1 inset-ring-[#f2f2f2]">
                <div
                  className={`relative w-full overflow-hidden [mask-image:linear-gradient(#000_83%,rgba(0,0,0,0)_100%)] ${HEIGHTS[card.assetHeight[0]]} ${MD_HEIGHTS[card.assetHeight[1]]} ${LG_HEIGHTS[card.assetHeight[2]]}`}
                >
                  {card.asset}
                </div>
                <div className="flex w-full flex-col items-start gap-4 p-6">
                  <p className="w-full text-[14px] leading-[18.2px] font-normal whitespace-pre-wrap text-gray-550 md:leading-[16.8px]">{card.label}</p>
                  <div className="flex w-full flex-col items-start gap-[6px]">
                    <p className="w-full text-[16px] leading-[19.2px] font-semibold tracking-[-0.48px] whitespace-pre-wrap text-ink-3 md:text-[18px] md:leading-[21.6px] md:tracking-[-0.54px] lg:text-[20px] lg:leading-[24px] lg:tracking-[-0.6px]">
                      {card.title}
                    </p>
                    <p className="w-full text-[14px] leading-[20.3px] font-normal tracking-[-0.14px] whitespace-pre-wrap text-[#383840] md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px]">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
