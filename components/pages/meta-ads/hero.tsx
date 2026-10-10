import Image from "next/image";
import { RollingButton } from "@/components/shared/rolling-button";
import { APP_URL } from "@/lib/site";
import { EventStreamCard } from "./event-stream-card";

const LOGIN = `${APP_URL}/login?landing_page=meta-ads`;

/**
 * Framer "Hero Section" of /meta-ads: Meta-blue (#0079fb) full-bleed hero starting at y=0 under the nav,
 * copy + button pair on the left, the tilted "Event Stream" cards on the right and a big pipe graphic
 * hanging from the top edge (desktop only). 1440x810 / 1024x984 / 390x1085. No appear animations.
 */
export function MetaAdsHero() {
  return (
    <section className="relative flex w-full items-center justify-center overflow-clip bg-[#0079fb]">
      <div className="flex w-full flex-1 flex-col items-center justify-center px-5 pt-[120px] pb-12 md:px-12 md:pb-16 lg:px-[100px] lg:pt-[116px] lg:pb-[120px]">
        <div className="relative flex w-full max-w-[1200px] flex-col items-start gap-8 md:gap-16 lg:flex-row lg:items-center lg:gap-20">
          <div className="flex w-full flex-col items-start gap-12 lg:w-[632px] lg:shrink-0">
            <div className="flex w-full flex-col items-start gap-6">
              <h1 className="font-display text-[32px] leading-[36.8px] font-bold tracking-[0.64px] text-white md:text-[40px] md:leading-[46px] md:tracking-[0.8px] lg:text-[48px] lg:leading-[55.2px] lg:tracking-[0.96px]">
                Cut your Meta ad spend 30-50%. Same ads. Better targeting.
              </h1>
              <div className="flex w-full flex-col items-start gap-2.5 overflow-clip md:gap-3">
                <p className="text-[14px] leading-[20.3px] font-normal tracking-[-0.14px] text-white/88 md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px]">
                  Meta only sees who clicks your ads. Mochi feeds it who qualifies, who books calls, and who pays - so its algorithm hunts for
                  people who actually make you money, not random clickers.
                </p>
                <p className="text-[14px] leading-[20.3px] font-normal tracking-[-0.14px] text-white/88 md:max-w-[485px] md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px]">
                  Coaches running $20K+/mo in Meta ads typically save $6K-15K per month within their first three weeks.
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col items-center gap-2.5 md:w-[379px] md:flex-row">
              {/* Framer swaps "Mobile/Black" for "Desktop/White" at the tablet breakpoint */}
              <RollingButton href={LOGIN} variant="black" className="w-full md:hidden">
                Start Free Trial
              </RollingButton>
              <RollingButton href={LOGIN} variant="white" className="hidden w-full md:flex md:flex-1 md:basis-0">
                Start Free Trial
              </RollingButton>
              <RollingButton href="/demo" variant="white" className="w-full md:flex-1 md:basis-0">
                Book a Call
              </RollingButton>
            </div>
          </div>
          <div className="flex w-full flex-col items-center pt-4 md:pt-6 lg:relative lg:h-[574px] lg:w-[435px] lg:shrink-0 lg:pt-0">
            <EventStreamCard className="scale-90 md:scale-100 lg:absolute lg:top-[414px] lg:left-0" />
          </div>
          <div aria-hidden className="pointer-events-none absolute top-[-78px] left-[907.375px] z-[1] hidden w-[357px] lg:block">
            <Image src="/framer/1oCxmpf0yREPq6TKO2ofaCB994.png" alt="" width={1391} height={2664} preload className="h-auto w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
