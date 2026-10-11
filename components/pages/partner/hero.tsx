import Image from "next/image";
import { RollingButton } from "@/components/shared/rolling-button";
import { interFeatures } from "@/components/shared/inter-features";
import { Appear } from "./appear";

/** Where "Apply Now" / "Become a Partner" lead on the live page (the Partner tab of the Mochi web app). */
export const PARTNER_APPLY_URL = "https://use.themochi.app/partners";

/** The live embed, query string included: autoplay + muted + inline, no related videos. */
const VIDEO_URL = "https://www.youtube.com/embed/K1Wflb4E-yI?autoplay=1&mute=1&playsinline=1&rel=0";

/**
 * Framer "Hero Section" of /partner: centered "Share Mochi. Earn up to 25%" headline + description, the per-letter
 * "Apply Now" button (230px wide; 48px tall on phone, content height 38.2px on tablet/desktop) with the red-dot note, and
 * the autoplaying muted YouTube embed (16:9, 16px radius). The cloud mascot sits on the video's top-left corner on
 * tablet/desktop only. Padding-top 56 / 80 / 112 below the nav spacer; heights 637 / 1022 / 1219.
 * On load the content slides in (from the left on tablet/desktop, from below on phone) and the headline and description
 * follow 0.2s later.
 */
export function PartnerHero() {
  return (
    <section className="relative flex w-full flex-col items-center" aria-label="Partner program">
      <div id="hero" className="flex w-full items-center justify-center px-5 pt-14 md:px-8 md:pt-20 lg:px-[100px] lg:pt-28">
        <div className="flex w-full max-w-[1200px] flex-col items-center gap-16">
          <Appear x={-64} y={0} phone={{ x: 0, y: 64 }} className="flex w-full flex-col items-center gap-8 md:gap-10">
            <div className="flex w-full flex-col items-center gap-4 md:gap-5 lg:gap-6">
              <Appear y={48} delay={0.2} className="w-full">
                <h1 className="w-full text-center font-display text-[42px] leading-[46.2px] font-semibold tracking-[1.68px] text-ink md:text-[56px] md:leading-[61.6px] lg:text-[64px] lg:leading-[70.4px]">
                  Share Mochi.
                  <br />
                  Earn up to 25%
                </h1>
              </Appear>
              <Appear y={48} delay={0.2} className="w-full max-w-[526px]">
                <p className={`w-full text-center ${interFeatures} text-[16px] leading-[22.4px] font-normal tracking-[-0.24px] text-gray-800 md:text-[18px] md:leading-[25.2px] lg:text-[20px] lg:leading-[28px]`}>
                  Introduce Mochi to coaches, creators and teams who could use it. Earn recurring commission on qualifying subscription
                  payments, including renewals.*
                </p>
              </Appear>
            </div>
            <div className="flex w-full flex-col items-center gap-6 md:max-w-[476px]">
              <div className="flex w-[230px] items-center justify-center">
                <RollingButton href={PARTNER_APPLY_URL} variant="black" size="sm" className="h-12! w-full md:h-auto!">
                  {"Apply Now"}
                </RollingButton>
              </div>
              <div className="flex w-max items-center justify-center gap-1">
                <span aria-hidden className="block size-[6px] shrink-0 rounded-full bg-rose-500" />
                <p className={`${interFeatures} text-[14px] leading-[18.2px] font-normal whitespace-pre text-gray-550 md:leading-[16.8px]`}>
                  For people who are part of an active Mochi account.
                </p>
              </div>
            </div>
          </Appear>
          <div id="video-wrapper" className="relative flex w-full flex-col gap-2">
            <div className="relative w-full overflow-hidden rounded-[16px] pt-[56.25%]">
              <iframe
                src={VIDEO_URL}
                title="Mochi Partner Program"
                className="absolute inset-0 size-full border-0"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <div aria-hidden className="pointer-events-none absolute top-[-85px] left-0 hidden aspect-[1.5/1] w-[128px] md:block lg:top-[-228px] lg:w-[232px]">
              <Image
                src="/framer/NpvagSRT9dgJkG9s0nbOzKeywg.png"
                alt=""
                width={1248}
                height={832}
                sizes="(min-width: 1200px) 232px, 128px"
                className="size-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
