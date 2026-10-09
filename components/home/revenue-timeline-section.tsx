import { Button } from "@/components/ui/button";
import { DesktopStep, MobileStep, STEPS } from "./revenue-step-cards";
import { RevenueStepsMobile } from "./revenue-steps-mobile";
import { RevenueStepsTrack } from "./revenue-steps-track";

function Heading() {
  return (
    <h3 className="font-display text-[32px] leading-[35.2px] font-semibold tracking-[1px] whitespace-pre-wrap text-ink md:text-[40px] md:leading-[44px] md:tracking-[1.6px] lg:text-[48px] lg:leading-[52.8px]">
      Turn DMs into revenue
    </h3>
  );
}

function Copy() {
  return (
    <p className="text-[16px] leading-[22.4px] font-normal tracking-[-0.24px] whitespace-pre-wrap text-gray-800 md:text-right md:text-[18px] md:leading-[25.2px] lg:text-left lg:text-[20px] lg:leading-[28px]">
      Everything your team needs to organize conversations, improve replies &amp; know exactly what’s driving booked
      calls and revenue.
    </p>
  );
}

/**
 * "Turn DMs into revenue" (Framer "Section"): the lead-to-won timeline mockup.
 * Tablet/desktop: a sticky block whose step row slides left as the page scrolls through a 400px spacer.
 * Phone: a looping vertical list inside a gray card, followed by a full-width "Start Free Trial" button.
 */
export function RevenueTimelineSection() {
  return (
    <section className="relative flex w-full flex-col items-center overflow-clip">
      <div className="z-[1] flex w-full flex-col items-center px-5 pb-12 md:px-8 md:pb-0 lg:px-[100px]">
        <div className="z-[1] flex w-full max-w-[1200px] flex-col items-center gap-8 md:gap-6 lg:gap-0">
          {/* phone */}
          <div className="flex w-full flex-col items-center gap-10 pt-14 md:hidden">
            <div className="flex w-full flex-col gap-5">
              <Heading />
              <Copy />
            </div>
            <RevenueStepsMobile>
              {STEPS.map((s) => (
                <MobileStep key={s.name} step={s} />
              ))}
            </RevenueStepsMobile>
            <Button
              variant="primaryBig"
              href="https://use.themochi.app/"
              className="w-full text-[15px]! leading-[21.75px]! tracking-[-0.3px]!"
            >
              Start Free Trial
            </Button>
          </div>
          {/* tablet / desktop */}
          <div className="hidden w-full flex-col items-center md:flex md:gap-6 lg:gap-0">
            <RevenueStepsTrack
              content={
                <div className="flex w-full items-center justify-between">
                  <div className="w-[330px] shrink-0">
                    <Heading />
                  </div>
                  <div className="w-[440px] shrink-0">
                    <Copy />
                  </div>
                </div>
              }
            >
              {STEPS.map((s) => (
                <DesktopStep key={s.name} step={s} />
              ))}
            </RevenueStepsTrack>
          </div>
        </div>
      </div>
    </section>
  );
}
