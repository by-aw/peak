import { Reveal } from "@/components/ui/reveal";
import { RollingButton } from "@/components/shared/rolling-button";
import { HeroImage } from "./hero-image";

/** Framer's Inter stylistic sets, applied by every text style of this page. */
export const INTER_FEATURES = "[font-feature-settings:'blwf','cv03','cv04','cv09','cv11']";

/** Shared "Text" preset of the page: Inter 16/24 (15/22.5 phone, 18/27 desktop), -0.02em, dark ink. */
const bodyText = `w-full text-[15px] leading-[22.5px] font-normal tracking-[-0.3px] whitespace-pre-wrap text-ink-3 md:text-[16px] md:leading-[24px] md:tracking-[-0.32px] lg:text-[18px] lg:leading-[27px] lg:tracking-[-0.36px] ${INTER_FEATURES}`;

/**
 * Framer "Hero" section of /prompt-library: left column with the headline (wavy purple "10,000"), two intro
 * paragraphs, the black "Get Mochi Now" rolling button (links home, as on live) and a rose-dot hint, next to a
 * parallax chef-mascot illustration on a purple gradient card. Section heights: 668 (desktop) / 953 (tablet) /
 * 906 (phone). Tablet and phone stack the artwork under the copy (386px / 200px tall image frame).
 */
export function PromptLibraryHero() {
  return (
    <section className="relative flex w-full flex-none items-center justify-center overflow-clip after:pointer-events-none after:absolute after:inset-0 after:border-b after:border-gray-150">
      <div className="flex w-px flex-[1_0_0] items-center justify-center overflow-clip px-5 py-12 md:px-12 md:py-16 lg:py-20">
        <div className="flex w-px max-w-[1200px] flex-[1_0_0] flex-col items-start gap-8 md:items-center md:gap-0 lg:flex-row">
          <Reveal x={-64} delay={0} viewport={{ once: true, amount: "some" }} className="flex w-full flex-none flex-col items-start gap-8 md:pr-12 lg:w-px lg:flex-[1_0_0]">
            <div className="flex w-full flex-none flex-col items-start gap-4 md:gap-5 lg:gap-6">
              <h2
                className={`w-full font-display text-[32px] leading-[36.8px] font-bold tracking-[0.64px] whitespace-pre-wrap text-ink-3 md:text-[40px] md:leading-[46px] md:tracking-[0.8px] lg:text-[48px] lg:leading-[55.2px] lg:tracking-[0.96px] ${INTER_FEATURES}`}
              >
                Get more out of your DMs without reading <span className="text-purple-500 underline decoration-wavy">10,000</span> messages.
              </h2>
              <p className={bodyText}>
                When you connect Mochi to Claude, Claude can pull live data from your Instagram sales pipeline: every conversation insight, objection, funnel stage, link click, and team stat. These
                prompts show you what to ask.
              </p>
              <p className={bodyText}>
                Copy any prompt, paste it into Claude, and tweak the words in <span className="text-purple-600">[brackets]</span>.
              </p>
            </div>
            <div className="flex w-full max-w-none flex-none flex-col items-start gap-4 md:max-w-[332px]">
              <div className="flex w-full flex-none flex-col items-center gap-[10px] md:flex-row">
                <div className="h-12 w-full flex-none md:w-px md:flex-[1_0_0]">
                  <RollingButton href="/" size="sm48" className="w-full">
                    Get Mochi Now
                  </RollingButton>
                </div>
              </div>
              <div className="flex flex-none items-center justify-center gap-1">
                <span aria-hidden className="size-[6px] flex-none rounded-full bg-rose-500" />
                <p className={`text-[14px] leading-[18.2px] font-normal whitespace-pre text-gray-550 md:leading-[16.8px] ${INTER_FEATURES}`}>Don&apos;t have Mochi yet? Get it now</p>
              </div>
            </div>
          </Reveal>
          <Reveal
            scale={1.2}
            delay={0}
            viewport={{ once: true, amount: "some" }}
            className="relative flex aspect-[0.96063] w-full flex-none flex-col items-center justify-center overflow-hidden rounded-[40px] bg-[linear-gradient(180deg,#9333ea_7%,#f3e8ff_69%)] p-2 md:aspect-auto md:h-[508px] md:w-[488px]"
          >
            <div className="h-[200px] w-full flex-none md:h-[386px] lg:h-px lg:flex-[1_0_0]">
              <HeroImage src="/framer/Y8UjhQMp62ikxX9QfYtOQfwoj0.png" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
