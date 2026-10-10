import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { CONTAINER, H3, LEAD, WRAPPER, line } from "./grid";

export type FeatureCard = {
  title: string;
  description: string;
  /** Phone-only description (Framer phone variants of some cards carry a shortened copy). */
  mobileDescription?: string;
  /** The mockup rendered in the "Image Frame" (centred, 397px min height, 24px padding / 16px on phone). */
  mockup: ReactNode;
  /** Extra classes for the Image Frame (e.g. a different padding on the OG card). */
  frameClassName?: string;
  /** Wrap the mockup in a Reveal (y 64) like Framer does for some mockups. */
  reveal?: boolean;
  /** Phone-only replacement for the mockup (Framer swaps some mockups for static images on phone). */
  mobileMockup?: ReactNode;
  /** Set to false when the Framer phone variant has no 397px min height on the Image Frame. */
  phoneMinHeight?: boolean;
  /** Extra classes for the description paragraph (e.g. a fixed-width text box on the full-width card). */
  descriptionClassName?: string;
};

type Props = {
  heading: ReactNode;
  description: string;
  cards: FeatureCard[];
  /** Max width of the heading / description boxes on desktop (Framer fixed-width text layers). */
  headingWidth?: number;
  descriptionWidth?: number;
  /** Per-row bottom hairline (Framer leaves it out on some rows, e.g. the second row of the tracking-pixel template). Defaults to true for every row. */
  rowBorders?: boolean[];
};

/**
 * Attribution template "Features Section": centred header, then cards in rows of two separated by
 * the 1px grid (stacked on tablet and phone).
 */
export function FeaturesSection({ heading, description, cards, headingWidth = 490, descriptionWidth = 504, rowBorders }: Props) {
  const rows: FeatureCard[][] = [];
  for (let i = 0; i < cards.length; i += 2) rows.push(cards.slice(i, i + 2));
  return (
    <section className="flex w-full flex-col items-center">
      <div className={WRAPPER}>
        <div className={`${CONTAINER} ${line("after:border-x after:border-t")} flex flex-col items-center overflow-hidden py-12 md:py-16 lg:py-20`}>
          <Reveal y={48} delay={0.2} className={`${line("after:border-b")} flex w-full flex-col items-center gap-4 px-4 pb-12 md:px-0 md:pb-16`}>
            <div className="flex w-full flex-col items-center gap-2">
              <h3 className={`${H3} w-full whitespace-pre-wrap`} style={{ maxWidth: headingWidth }}>
                {heading}
              </h3>
              <p className={`${LEAD} w-full opacity-80`} style={{ maxWidth: descriptionWidth }}>
                {description}
              </p>
            </div>
          </Reveal>
          <div className="flex w-full flex-col items-center">
            {rows.map((row, r) => (
              <div key={r} className={`${line(rowBorders?.[r] === false ? "" : "after:border-b")} flex w-full flex-col items-start lg:flex-row`}>
                {row.map((card, c) => (
                  <div
                    key={card.title}
                    className={`${line(c === 0 && row.length > 1 ? "after:border-b after:border-r lg:after:border-b-0" : "after:border-b after:border-r lg:after:border-0")} flex w-full flex-col items-start overflow-hidden lg:flex-1 lg:basis-0`}
                  >
                    <div
                      className={`flex w-full flex-col items-center justify-center overflow-hidden p-4 md:p-6 ${card.phoneMinHeight === false ? "md:min-h-[397px]" : "min-h-[397px]"} ${card.frameClassName ?? ""}`}
                    >
                      {card.mobileMockup ? <div className="flex w-full flex-col items-center md:hidden">{card.mobileMockup}</div> : null}
                      <div className={`${card.mobileMockup ? "hidden md:flex" : "flex"} w-full flex-col items-center`}>
                        {card.reveal ? (
                          <Reveal y={64} delay={0.2} className="flex w-full flex-col items-center">
                            {card.mockup}
                          </Reveal>
                        ) : (
                          card.mockup
                        )}
                      </div>
                    </div>
                    <div className="flex w-full flex-col items-start p-4 md:p-6">
                      <div className="flex w-full flex-col items-start gap-1.5">
                        <p className="text-[16px] font-semibold leading-[20.8px] tracking-[-0.2px] whitespace-pre-wrap text-black md:text-[18px] md:leading-[23.4px]">{card.title}</p>
                        {card.mobileDescription ? (
                          <p className="text-[15px] font-normal leading-[22.5px] tracking-[-0.2px] whitespace-pre-wrap text-gray-550 md:hidden">{card.mobileDescription}</p>
                        ) : null}
                        <p className={`text-[15px] font-normal leading-[22.5px] tracking-[-0.2px] whitespace-pre-wrap text-gray-550 ${card.mobileDescription ? "hidden md:block" : ""} ${card.descriptionClassName ?? ""}`}>{card.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
