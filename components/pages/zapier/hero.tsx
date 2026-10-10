import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { RollingButton } from "@/components/shared/rolling-button";
import { APP_URL, DOCS_URL } from "@/lib/site";
import { MochiHeroIcon } from "./icons";
import { IntegrationPaths, PulsingDot } from "./hero-motion";

/**
 * Framer "Hero Section" of /zapier: Clash Display h1, Inter paragraph, the black / white rolling-text
 * button pair, a 17px "Label" spacer and (tablet + desktop only) the "Integration SVG Animation": eight
 * purple curves with a travelling dash between the Mochi icon, the Zapier tile and the integrations cluster.
 * 1440x755 / 1024x688 / 390x483 (the animation block is hidden on phones).
 */
export function ZapierHero() {
  return (
    <section className="relative flex w-full flex-col items-center" aria-label="Every Mochi event, wired into the rest of your stack.">
      <div className="flex w-full flex-col items-center px-5 py-12 md:px-12 md:py-16 lg:px-[100px] lg:py-20">
        <div className="flex w-full max-w-[1200px] flex-col items-center gap-6">
          <div className="flex w-full max-w-[688px] flex-col items-center gap-8 md:gap-10 lg:gap-12">
            <div className="flex w-full flex-col items-center gap-4 md:gap-6">
              <Reveal y={48} delay={0.2} className="flex w-full flex-col">
                <h1 className="w-full text-center font-display text-[32px] leading-[36.8px] font-bold tracking-[0.64px] whitespace-pre-wrap text-ink-3 md:text-[40px] md:leading-[46px] md:tracking-[0.8px] lg:text-[48px] lg:leading-[55.2px] lg:tracking-[0.96px]">
                  Every Mochi event, wired into the rest of your stack.
                </h1>
              </Reveal>
              <Reveal y={48} delay={0.3} className="flex w-full max-w-[576px] flex-col">
                <p className="text-center text-[15px] leading-[22.5px] font-normal tracking-[-0.3px] whitespace-pre-wrap text-ink-3 md:text-[16px] md:leading-6 md:tracking-[-0.32px] lg:text-[18px] lg:leading-[27px] lg:tracking-[-0.36px]">
                  Connect Mochi to 6,000+ apps. Sync leads to Google Sheets, get Slack alerts when deals close, and build workflows that scale your
                  sales—without manual data entry.
                </p>
              </Reveal>
            </div>
            <Reveal y={48} delay={0.4} className="flex w-full flex-col items-center gap-4">
              <div className="flex w-full flex-col items-center justify-center gap-2.5 md:w-[379px] md:flex-row">
                <RollingButton href={`${APP_URL}/login?landing_page=zapier`} variant="black" size="sm48" className="w-full md:w-auto md:flex-1">
                  Start Free Trial
                </RollingButton>
                <RollingButton href={DOCS_URL} target="_blank" rel="noopener" variant="white" size="sm48" className="w-full md:w-auto md:flex-1">
                  View Documentation
                </RollingButton>
              </div>
              <div aria-hidden className="h-[17px] w-[306px] max-w-full" />
            </Reveal>
          </div>
          <Reveal y={48} delay={0.5} className="relative hidden h-[227px] w-full flex-col items-center justify-center md:flex">
            <div className="pointer-events-none absolute inset-x-0 top-2 bottom-[13px] z-[1] flex items-center justify-center overflow-hidden px-5 [mask-image:linear-gradient(270deg,rgba(0,0,0,0)_0%,#000_41%)]">
              <div className="relative h-full w-full flex-1 overflow-hidden [mask-image:linear-gradient(90deg,rgba(0,0,0,0)_0%,#000_38%)]">
                <IntegrationPaths />
              </div>
            </div>
            <div className="relative z-[1] flex h-full w-full items-center justify-between overflow-clip">
              <MochiHeroIcon className="size-[72px] shrink-0" />
              <div className="absolute top-1/2 left-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[13px] bg-white shadow-[0_1.61px_4.83px_0_rgba(133,0,122,0.08),0_8.05px_8.05px_0_rgba(133,0,122,0.07),0_17.72px_9.66px_0_rgba(133,0,122,0.04),0_28.99px_12.88px_0_rgba(133,0,122,0.01),0_45.09px_19.33px_0_rgba(133,0,122,0.02)]">
                <Image src="/framer/hwcuMjRL0k5deDkFsoHTVS5eVM.jpeg" alt="" width={80} height={80} className="size-20 rounded-[13px] object-contain" />
              </div>
              <Image src="/framer/IQzeAj05LI3vDNpkBG8wR4aVw.png" alt="" width={244} height={227} className="h-[227px] w-[244px] shrink-0 object-contain" />
            </div>
            <div className="absolute -bottom-4 left-1/2 z-[1] flex -translate-x-1/2 items-center justify-center gap-1 lg:bottom-6">
              <PulsingDot />
              <p className="text-[14px] leading-[16.8px] font-normal whitespace-pre text-[#686a75]">Real-time webhook triggers — zero delay</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
