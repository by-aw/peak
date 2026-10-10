import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { BackfillMockup, ConnectMockup, PixelPickerMockup, PlaybookStackMockup, TogglesMockup } from "./setup-mockups";

const STEPS: { mockup: ReactNode; title: string; description: string }[] = [
  { mockup: <ConnectMockup />, title: "Connect Meta", description: "OAuth login from inside Mochi's Integrations settings." },
  { mockup: <PixelPickerMockup />, title: "Pick your pixel and ad account", description: "Two dropdowns. Your existing pixel stays, we just feed it more data." },
  { mockup: <TogglesMockup />, title: "Toggle which events fire", description: "Lead, Qualified Lead, Schedule, Purchase. All on by default." },
  { mockup: <BackfillMockup />, title: "Hit backfill", description: "Replay the last 90 days of historical conversions to your pixel. Runs in the background." },
  { mockup: <PlaybookStackMockup />, title: "Brief your media buyer", description: "Send them the campaign shift playbook above. They take it from there." },
];

/**
 * Framer "Set-up section" of /meta-ads: sticky "Five minutes. One time." heading on the left and five
 * step cards (grey 232px mockup block + blue eyebrow + copy) on the right. 1440x2045 / 1024x1880 / 390x1855.
 */
export function MetaAdsSetup() {
  return (
    <section className="relative flex w-full justify-center px-5 py-12 md:px-12 md:py-16 lg:px-[100px] lg:py-20">
      <div className="flex w-full max-w-[1100px] flex-col items-start gap-8 md:gap-12 lg:flex-row lg:justify-between lg:gap-0">
        <div className="flex w-full flex-col lg:w-[455px] lg:self-stretch">
          <div className="sticky top-[120px] z-[1] flex w-full flex-col">
            <Reveal y={48} delay={0.2} className="w-full">
              <h3 className="font-display text-[24px] leading-[28.8px] font-semibold whitespace-pre-wrap text-black md:text-[32px] md:leading-[38.4px] lg:text-[40px] lg:leading-[48px]">
                Five minutes. <span className="text-black/50">One time.</span>
              </h3>
            </Reveal>
          </div>
        </div>
        <div className="flex w-full flex-col gap-6 md:gap-8 lg:w-[462px] lg:gap-14">
          {STEPS.map((step) => (
            <div key={step.title} className="flex w-full flex-col gap-4 md:gap-6">
              <div className="flex min-h-[232px] w-full items-center justify-center overflow-hidden rounded-[20px] bg-gray-25">{step.mockup}</div>
              <div className="flex w-full flex-col gap-2">
                <p className="text-[15px] leading-[19.5px] font-semibold tracking-[-0.2px] whitespace-pre-wrap text-[#0082fb]">{step.title}</p>
                <p className="text-[15px] leading-[22.5px] font-normal tracking-[-0.3px] whitespace-pre-wrap text-[#383838] md:text-[16px] md:leading-[24px] md:tracking-[-0.32px] lg:text-[18px] lg:leading-[27px] lg:tracking-[-0.36px]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
