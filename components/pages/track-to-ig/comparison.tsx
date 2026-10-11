import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { CheckBadgeIcon, QuestionBadgeIcon } from "@/components/icons/middle-icons";
import { APP_URL } from "@/lib/site";
import { SectionHeading, SectionText } from "./section-intro";

const THINK = ["300 videos created", "3 new clients", "It worked. Make more."];
const REAL = ["They found you months ago", "They watched multiple videos", "They booked through your profile link", "They converted from a video you stopped making"];

const rowText = "text-[15px] leading-[21.75px] font-normal tracking-[-0.3px] whitespace-pre-wrap text-black md:text-[16px] md:leading-[23.2px] md:tracking-[-0.32px] lg:text-[18px] lg:leading-[26.1px] lg:tracking-[-0.36px]";
const cardTitle = "font-display text-[18px] leading-[21.6px] font-semibold tracking-[0.18px] whitespace-pre-wrap md:text-[20px] md:leading-6 md:tracking-[0.2px] lg:text-[24px] lg:leading-[28.8px] lg:tracking-[0.24px]";

/**
 * Framer "Comparison Section" of /track-to-ig: the heading + CTA (CTA on phone only), then the grey
 * "What you think" card next to the white "The real story" card (the Framer "Without - With" component with
 * its metrics removed). Desktop 1440x837, tablet 1024x674, phone 390x1063.
 */
export function ComparisonSection() {
  return (
    <section className="order-3 flex w-full flex-col items-center md:order-none">
      <Reveal y={80} className="flex w-full items-center justify-center overflow-clip px-5 pt-20 md:px-8 md:pt-16 lg:px-[100px] lg:pt-[100px]">
        <div className="flex w-full flex-1 flex-col items-center gap-6 md:gap-4">
          <SectionHeading className="w-full max-w-[712px] text-center">You try solving your content problem by posting more, which realistically dilutes your strategy.</SectionHeading>
          <SectionText className="w-full text-center md:max-w-[440px]">Because you keep guessing, not knowing which 1 out of 10 videos actually makes you money.</SectionText>
          <Button variant="primaryBig" href={APP_URL} className="w-full md:hidden">
            Start Free Trial
          </Button>
        </div>
      </Reveal>

      <div className="flex w-full flex-col items-center px-5 py-12 md:px-8 md:pt-12 md:pb-16 lg:px-[100px] lg:pt-16 lg:pb-[100px]">
        <Reveal y={80} className="flex w-full max-w-[1000px] flex-col items-start gap-6 md:flex-row md:items-stretch">
          <div className="flex w-full flex-col items-start gap-6 overflow-clip rounded-[32px] bg-black/5 px-4 py-8 md:flex-1 md:basis-0 md:gap-8 md:pt-12 md:pb-4">
            <div className="flex w-full flex-col items-start px-4">
              <h3 className={`${cardTitle} text-black opacity-50`}>What you think</h3>
            </div>
            <div className="flex w-full flex-col gap-5 px-4">
              {THINK.map((t) => (
                <div key={t} className="flex w-full items-start gap-3">
                  <QuestionBadgeIcon className="size-6 shrink-0" />
                  <p className={`min-w-0 flex-1 ${rowText}`}>{t}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-6 overflow-clip rounded-[32px] bg-white px-4 py-8 shadow-[0_13px_13px_0_rgba(36,7,65,0.04),0_29px_18px_0_rgba(36,7,65,0.02),0_52px_21px_0_rgba(36,7,65,0.01),inset_0_0_0_1px_rgba(0,0,0,0.1)] md:flex-1 md:basis-0 md:gap-8 md:py-12">
            <div className="flex w-full flex-col items-start px-4">
              <h3 className={`${cardTitle} text-purple-500`}>The real story</h3>
            </div>
            <div className="flex w-full flex-col gap-5 px-4">
              {REAL.map((t, i) => (
                <div key={t} className="flex w-full items-start gap-3">
                  <CheckBadgeIcon className="size-6 shrink-0" />
                  <p className={`min-w-0 flex-1 ${rowText} ${i === REAL.length - 1 ? "md:max-w-[261px]" : ""}`}>{t}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
