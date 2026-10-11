import type { ReactNode } from "react";
import { Counter } from "./counter";
import {
  ChatBubblesGlyphIcon,
  DollarGlyphIcon,
  FunnelStep1,
  FunnelStep2,
  FunnelStep3,
  FunnelStep4,
  FunnelStep5,
  LinkBlueIcon,
  PhoneBlueIcon,
  PlayGlyphIcon,
} from "./icons";
import { SectionHeading, SectionText } from "./section-intro";

const STEPS: { label: string; rate: string; count: number; start?: number; icon: ReactNode; chart: ReactNode }[] = [
  { label: "Reel views", rate: "2.6%", count: 12521, start: 12521, icon: <PlayGlyphIcon className="absolute top-0.5 left-0.5 h-3 w-[11px]" />, chart: <FunnelStep1 /> },
  { label: "DM replies", rate: "37.3%", count: 324, icon: <ChatBubblesGlyphIcon className="absolute top-0.5 left-px h-3 w-3.5" />, chart: <FunnelStep2 /> },
  { label: "Link clicks", rate: "23.1%", count: 144, icon: <LinkBlueIcon className="absolute top-0.5 left-0.5 size-3" />, chart: <FunnelStep3 /> },
  { label: "Booked calls", rate: "42.9%", count: 71, icon: <PhoneBlueIcon className="absolute top-0.5 left-0.5 size-3" />, chart: <FunnelStep4 /> },
  { label: "Customers", rate: "$120K", count: 40, icon: <DollarGlyphIcon className="absolute top-px left-px size-3.5" />, chart: <FunnelStep5 /> },
];

const hairline = "after:pointer-events-none after:absolute after:inset-0";

/**
 * Framer "Views Section": grey band (100vh tall on desktop) with the heading and the five-column funnel card
 * ("Reel views -> Customers": icon + label + rate, a counting number and a blue area chart). Desktop columns put the
 * label over the number; tablet puts the number first; phone stacks the columns as rows without the chart.
 * The number counters count up once when they scroll into view.
 */
export function ViewsSection() {
  return (
    <section className="order-5 flex w-full items-center justify-center bg-[#fafafa] md:order-none lg:h-screen">
      <div className="flex w-full flex-1 items-center justify-center px-5 py-12 md:px-8 md:py-16 lg:px-[100px] lg:py-20">
        <div className="flex w-full max-w-[1000px] flex-1 flex-col items-center justify-center gap-8 md:gap-12 lg:gap-16">
          <div className="flex w-full max-w-[492px] flex-col items-center gap-5 md:gap-4">
            <SectionHeading className="w-full text-center">Views aren’t the answer. The path is.</SectionHeading>
            <SectionText className="w-full text-center">
              A clean, top-to-bottom funnel attaches the math to every step, so reach stops being a vanity metric and becomes a revenue decision.
            </SectionText>
          </div>

          <div className={`${hairline} relative flex w-full flex-col items-start overflow-clip rounded-[16px] after:z-[3] after:rounded-[16px] after:border-[0.5px] after:border-gray-150`}>
            <div className="w-full bg-white">
              <div className="flex w-full flex-col items-center md:h-[321px] md:flex-row lg:h-[256px]">
                {STEPS.map((step) => (
                  <div key={step.label} className={`${hairline} relative flex w-full flex-col items-start overflow-clip after:border-r-[0.5px] after:border-gray-150 md:h-full md:min-w-0 md:flex-1 md:basis-0`}>
                    <div className={`${hairline} relative flex w-full flex-col items-start justify-center gap-2.5 p-4 after:border-b-[0.8px] after:border-gray-50 md:after:hidden`}>
                      <div className="flex w-full items-center justify-center gap-1.5 md:order-1 md:flex-col md:items-start md:justify-start md:gap-2.5 lg:order-none lg:flex-row lg:items-center lg:justify-center lg:gap-1.5">
                        <div className="flex min-w-0 flex-1 items-center justify-start gap-1.5 overflow-clip md:w-full md:flex-none md:overflow-visible lg:flex-1 lg:justify-center lg:overflow-clip">
                          <div className="relative size-4 shrink-0 overflow-clip">{step.icon}</div>
                          <p className="min-w-0 flex-1 text-[14px] leading-[14px] font-normal tracking-[-0.2px] whitespace-pre-wrap text-gray-500">{step.label}</p>
                        </div>
                        <p className="shrink-0 text-[14px] leading-[14px] font-normal tracking-[-0.2px] whitespace-pre text-gray-500">{step.rate}</p>
                      </div>
                      <div className="flex w-full items-center gap-2.5 md:order-0">
                        <Counter
                          end={step.count}
                          start={step.start}
                          className="font-display text-[32px] leading-[38.4px] font-semibold text-black md:text-[36px] md:leading-[43.2px] lg:text-[28px] lg:leading-[28px]"
                        />
                      </div>
                    </div>
                    <div className="hidden h-[182px] w-[200px] shrink-0 md:block [&>svg]:h-full [&>svg]:w-full">{step.chart}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${hairline} relative flex w-full items-center justify-center gap-4 p-4 after:border-b-[0.5px] after:border-gray-150`}>
              <p className="text-center text-[14px] leading-[19.6px] font-normal tracking-[-0.2px] whitespace-pre-wrap text-gray-800">
                Within under 5 minutes, you see exactly what you have been missing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
