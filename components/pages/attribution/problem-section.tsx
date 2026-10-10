import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { CONTAINER, WRAPPER, line } from "@/components/shared/attribution/grid";
import { SectionHeader } from "./section-header";
import { CallBookedMockup, LeadTicker, SetterStack } from "./problem-mockups";
import { WithoutWithMochi } from "./without-with";

type Problem = { title: string; description: string; mockup: ReactNode; cardClassName?: string };

const PROBLEMS: Problem[] = [
  {
    title: "Did they even click it?",
    description: "A setter sends your Calendly link to 50 leads. 12 never click. Nobody follows up because nobody knows they didn't click. Those leads are gone forever.",
    mockup: <LeadTicker />,
    cardClassName: "[mask-image:linear-gradient(rgba(0,0,0,0)_-3%,rgb(0,0,0)_18%)]",
  },
  {
    title: "Which setter actually drives results?",
    description: "10 setters, 300 links a day. Whose links get clicked? Whose don't? Without per-setter tracking you can't coach what you can't measure.",
    mockup: <SetterStack />,
  },
  {
    title: "What content actually converts?",
    description: "A lead books a call. Was it the PDF from the reel? The story link? The cold DM? Without attribution from click to purchase, you're scaling guesswork.",
    mockup: <CallBookedMockup />,
  },
];

/**
 * Framer "Problem Section": "You're making decisions based on the 10% you can see." with the three
 * problem cards, then "25% of your links never get clicked" with the Without / With Mochi switcher and
 * the closing note. Cards sit side by side on desktop and stack on tablet/phone.
 */
export function ProblemSection() {
  return (
    <section className="flex w-full flex-col items-center">
      <div className={WRAPPER}>
        <div className={`${CONTAINER} ${line("after:border-x after:border-t")} flex flex-col items-center overflow-hidden py-12 md:py-16 lg:py-20`}>
          <SectionHeader
            heading="You're making decisions based on the 10% you can see."
            description="Your team sends links all day. You know if a call gets booked. But everything in between — did they click? Did they watch? Did they visit your checkout page and leave? — that’s invisible. Until now."
            headingWidth={582}
            descriptionWidth={590}
            descriptionAlign="left"
            className="px-4 pb-12 md:px-0 md:pb-16"
          />
          <div className="flex w-full flex-col items-center">
            <div className={`${line("after:border-b")} flex w-full flex-col items-start lg:flex-row`}>
              {PROBLEMS.map((p, i) => (
                <Reveal
                  key={p.title}
                  y={64}
                  delay={0.2}
                  className={`${i < 2 ? line("after:border-r after:border-b lg:after:border-b-0") : ""} flex w-full flex-col items-start overflow-hidden lg:flex-1 lg:basis-0 ${p.cardClassName ?? ""}`}
                >
                  {p.mockup}
                  <div className="flex w-full flex-col items-start p-4 md:p-6">
                    <div className="flex w-full flex-col items-start gap-2 md:gap-1.5">
                      <p className="text-[16px] leading-[19.2px] font-semibold tracking-[-0.48px] whitespace-pre-wrap text-ink-3 md:text-[18px] md:leading-[21.6px] md:tracking-[-0.54px]">{p.title}</p>
                      <p className="text-[15px] leading-[21px] font-normal tracking-[-0.15px] whitespace-pre-wrap text-gray-550">{p.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="flex w-full flex-col items-start">
              <SectionHeader
                heading="25% of your links never get clicked. Those leads are gone."
                description="Every day your team sends booking links, training videos and application forms. A quarter of those leads never click. Without knowing who didn’t click, there’s no follow-up."
                headingWidth={604}
                descriptionWidth={544}
                className="px-4 py-12 md:px-0 md:py-16"
              />
              <Reveal y={64} delay={0.2} className="w-full">
                <WithoutWithMochi />
              </Reveal>
            </div>
            <div className={`${line("after:border-b")} flex w-full items-center gap-2 px-4 py-6 md:px-[21px] md:py-8`}>
              <p className="flex-1 text-[14px] leading-[20.3px] font-normal tracking-[-0.14px] whitespace-pre-wrap text-[#383840] opacity-80 md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px]">
                Mochi changes this. It detects non-clicks in real time and triggers an automated follow-up — before the lead forgets. The leads who would have ghosted stay in the funnel. At scale, that&rsquo;s the difference between a leaky pipeline and a machine.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
