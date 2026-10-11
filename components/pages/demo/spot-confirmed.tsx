import Image from "next/image";
import { INTER_FEATURES } from "./config";
import { FunnelSky } from "./funnel-sky";
import { FunnelLogo } from "./icons";

const COACHING_CALL = "https://meet.google.com/ius-vhoh-mtz";
/** Framer text style "o223kl": Inter 400 20/32 with the Inter cv features, #1d1d20 here, centred. */
const BODY = `text-center font-sans text-[20px] leading-8 font-normal text-ink-3 ${INTER_FEATURES}`;

/**
 * Framer "Spot Confirmed" page (its desktop breakpoint starts at 1220px, not 1200). Under the sky strip, a column
 * (72px top / 100px bottom padding, 32px sides; 54px / 16px on phone) holds the 88x20 logo, the video-call mochi
 * illustration (358x350 crop, 250x236 on phone, with a white fade over its bottom edge below desktop), then
 * "You're all set!" (Clash 600 36/54, 28/42 on phone), the 240x40 "Join the coaching call" button and the
 * calendar note, 33px apart.
 */
export function SpotConfirmed() {
  return (
    <div className="relative flex w-full flex-col items-center">
      <FunnelSky phone="aspect" />
      <div className="relative flex w-full flex-col items-center px-4 py-[54px] md:px-8 md:pt-[72px] md:pb-[100px]">
        <div className="flex w-full flex-col items-center gap-8 pb-5 md:gap-[39px] min-[1220px]:gap-[31px]">
          <FunnelLogo />
          <div className="relative h-[236px] w-[250px] shrink-0 overflow-clip md:h-[350px] md:w-[358px]">
            <div className="absolute inset-y-0 left-[calc(50%-124.5px)] w-[249px] md:top-[-20px] md:right-[-4px] md:left-[-3px] md:w-auto min-[1220px]:top-0 min-[1220px]:right-auto min-[1220px]:left-[calc(50%-178.5px)] min-[1220px]:w-[357px]">
              <Image
                src="/framer/32fQc63si9ofH8BGKaN1pJUqB0.png"
                alt=""
                fill
                preload
                sizes="(min-width: 1220px) 357px, (min-width: 810px) 365px, 249px"
                className="object-cover"
              />
              {/* White fade over the chair (Framer SVG layers, hidden on desktop). */}
              <div className="absolute top-[167px] left-0 h-[69px] w-[249px] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,#fff_100%)] md:hidden" />
              <div className="absolute top-[269px] left-0 hidden h-[101px] w-[363px] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,#fff_100%)] md:block min-[1220px]:hidden" />
            </div>
          </div>
          <div className="flex w-full max-w-[560px] flex-col items-center gap-[33px]">
            <h1 className="text-center font-display text-[28px] leading-[42px] font-semibold tracking-[0.72px] whitespace-pre text-ink-3 md:text-[36px] md:leading-[54px] md:tracking-[0.96px]">
              You&apos;re all set!
            </h1>
            <a
              href={COACHING_CALL}
              target="_blank"
              className="flex h-10 w-[240px] shrink-0 items-center justify-center rounded-[10px] bg-[#333] font-sans text-[14px] leading-[1.2] font-semibold whitespace-pre text-white select-none"
            >
              Join the coaching call
            </a>
            <div className="w-[70%] md:hidden">
              <p className={BODY}>
                We&apos;ve invited you in google calendar as well
                <br />
                <br />
              </p>
              <p className={BODY}>
                Date: Friday, July 31st
                <br />
                Time: 18:00 Dubai Time
              </p>
            </div>
            <p className={`hidden w-full md:block ${BODY}`}>
              We&apos;ve invited you in google calendar as well
              <br />
              Date: Friday, July 31st
              <br />
              Time: 18:00 Dubai Time
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
