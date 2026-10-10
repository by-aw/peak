import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { RollingButton } from "@/components/shared/rolling-button";
import { IncludedLabel } from "./hero";

/**
 * Framer "Before CTA Section" of /payments: the money-cannon mascot, "You already have the leads and the
 * payments. Now connect them." + "Book a Demo", and the top of a dashboard screenshot clipped by the
 * section bottom. 1440x911 / 1024x718 / 390x560.
 */
export function PaymentsBeforeCta() {
  return (
    <section className="relative flex w-full flex-col items-center px-5 pt-12 md:px-12 md:pt-16 lg:px-[100px] lg:pt-20">
      <div className="flex h-[512px] w-full max-w-[1200px] flex-col items-center gap-12 overflow-hidden px-6 md:h-[654px] md:gap-16 lg:h-[831px]">
        <div className="flex w-full flex-col items-center overflow-clip">
          <div className="relative z-[1] w-[302px] md:w-[400px] lg:w-[440px]">
            <Image src="/framer/DoN61yJTWOyt9du404XKHLvbR0.png" alt="" width={1536} height={1024} sizes="440px" className="h-auto w-full" />
          </div>
          <Reveal y={48} delay={0.2} className="flex w-full flex-col items-center gap-8">
            <div className="flex w-full flex-col items-center gap-4">
              <h3 className="max-w-[682px] text-center font-display text-[24px] leading-[28.8px] font-semibold whitespace-pre-wrap text-black md:max-w-[472px] md:text-[32px] md:leading-[38.4px] lg:max-w-[682px] lg:text-[40px] lg:leading-[48px]">
                You already have the leads and the payments. Now connect them.
              </h3>
              <p className="max-w-[508px] text-center text-[15px] leading-[22.5px] font-normal tracking-[-0.3px] whitespace-pre-wrap text-black/50 md:text-[16px] md:leading-[24px] md:tracking-[-0.32px] lg:text-[18px] lg:leading-[27px] lg:tracking-[-0.36px]">
                Every payment auto-matched to the lead who made it. Every commission calculated. Every fee visible. Your entire revenue picture in one place, ready to tell you where to focus next.
              </p>
            </div>
            <div className="flex w-full flex-col items-center gap-4 md:w-auto">
              <RollingButton href="/demo" size="lg" className="w-full md:w-auto">
                Book a Demo
              </RollingButton>
              <IncludedLabel />
            </div>
          </Reveal>
        </div>
        <div className="w-full shrink-0 overflow-hidden rounded-[8px] shadow-[0_2px_20px_0_rgba(0,0,0,0.14),0_-2px_4px_0_rgba(0,0,0,0.02)]">
          <Image src="/framer/qCpFwQ3BFAcZyyVSDczxcK32wtg.png" alt="" width={2856} height={1461} sizes="(min-width: 1200px) 1152px, 100vw" className="h-auto w-full" />
        </div>
      </div>
    </section>
  );
}
