import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { RollingButton } from "@/components/shared/rolling-button";
import { HeroTiltImage } from "./hero-tilt-image";

const FORBES_URL =
  "https://www.forbes.com/sites/kolawolesamueladebayo/2026/02/13/how-ai-is-helping-creators-scale-sales-without-losing-the-personal-touch/";

export const REPLY_AGENT_CTA = "https://use.themochi.app/login?landing_page=reply-agent";

/**
 * Reply Agent "Hero Section": Forbes pill, left-aligned headline + support copy, CTA with a red dot label and
 * the tilted dashboard screenshot (tablet/desktop) or the iPhone screenshot with a bottom fade (phone).
 * Heights: 1222 (desktop) / 1019 (tablet) / 1142 (phone).
 */
export function ReplyAgentHero() {
  return (
    <section className="relative flex w-full justify-center overflow-clip">
      <div className="flex w-full flex-1 flex-col items-center overflow-clip px-5 pt-16 md:px-12 md:pt-20 md:pb-16 lg:px-[100px] lg:pt-[120px] lg:pb-0">
        <div className="relative z-[2] flex w-full max-w-[1200px] flex-col items-center gap-12 lg:gap-16">
          <div className="flex w-full flex-col items-center gap-5 md:w-[746px] md:gap-6">
            <Reveal y={48} delay={0.2}>
              <a
                href={FORBES_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 rounded-[99px] bg-purple-50 px-3 py-2 shadow-[0_1px_3px_0_rgba(133,0,122,0.08),0_5px_5px_0_rgba(133,0,122,0.07),0_11px_6px_0_rgba(133,0,122,0.04),0_19px_8px_0_rgba(133,0,122,0.01),0_29px_8px_0_rgba(133,0,122,0)] transition-shadow duration-300 hover:shadow-[0_1px_3px_0_rgba(133,0,122,0.08),0_19px_8px_0_rgba(133,0,122,0.01),0_29px_8px_0_rgba(133,0,122,0)]"
              >
                <p className="text-[14px] leading-[15.4px] font-medium whitespace-pre text-purple-500">As Seen on Forbes — The future of AI replies</p>
              </a>
            </Reveal>
            <div className="flex w-full flex-col items-center gap-7 md:gap-8 lg:gap-10">
              <Reveal y={48} delay={0.2} className="w-full">
                <h1 className="w-full font-display text-[38px] leading-[39.9px] font-bold tracking-[0.76px] whitespace-pre-wrap text-ink-3 md:text-[46px] md:leading-[48.3px] md:tracking-[0.92px] lg:text-[56px] lg:leading-[58.8px] lg:tracking-[1.12px]">
                  Your Instagram DMs can now answer with AI.
                </h1>
              </Reveal>
              <p className="w-full text-[15px] leading-[22.5px] font-normal tracking-[-0.3px] whitespace-pre-wrap text-ink-3 md:w-[640px] md:text-[16px] md:leading-[24px] md:tracking-[-0.32px] lg:text-[18px] lg:leading-[27px] lg:tracking-[-0.36px]">
                Every lead gets a reply while they are still paying attention — nights, weekends, mid-launch. Reply Agent
                qualifies, handles objections and sends the booking link on its own, then hands the conversation back the
                moment it is unsure.
              </p>
              <Reveal y={48} delay={0.3} className="flex flex-col items-center gap-4">
                <RollingButton href={REPLY_AGENT_CTA} size="lg">
                  Start Free Trial
                </RollingButton>
                <span aria-hidden className="block size-[6px] rounded-full bg-rose-500" />
              </Reveal>
            </div>
          </div>
          <div className="hidden w-full md:block">
            <HeroTiltImage />
          </div>
          <Reveal y={48} delay={0.3} className="md:hidden">
            <div className="relative w-[309px] overflow-hidden aspect-[0.498302/1] [mask-image:linear-gradient(#000_45%,rgba(0,0,0,0)_88%)]">
              <Image
                src="/framer/04dRUFAHTD0tNtCBDUWYKc8Jak.png"
                alt=""
                width={587}
                height={1178}
                preload
                sizes="309px"
                className="absolute inset-0 h-full! w-full object-cover"
              />
            </div>
          </Reveal>
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-[139px] bottom-0 z-[1] hidden h-[227px] bg-[linear-gradient(rgba(255,255,255,0)_0%,#fff_100%)] md:block"
          />
        </div>
      </div>
    </section>
  );
}
