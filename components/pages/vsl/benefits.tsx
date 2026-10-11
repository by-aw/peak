import { Reveal } from "@/components/ui/reveal";
import { Clouds } from "@/components/pages/vsl/clouds";
import { FEATURE_CARDS } from "@/components/pages/vsl/data";
import { FeatureCard } from "@/components/pages/vsl/feature-card";
import { AppleIcon, BubbleChatIcon, InfoIcon, MochiSetterTile, SlackIcon } from "@/components/pages/vsl/icons";
import { sectionHeadingText } from "@/components/pages/vsl/styles";

const tagText = "text-[16px] leading-[19.2px] tracking-[-0.64px] whitespace-pre";
const tileBox = "relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-[9px] p-[11px]";

/**
 * Framer "Benefits Section": "Everything you need to turn your DMs into a revenue machine" (578px max), the 2-column
 * grid of `FeatureCard`s (1 column on phone, 24px gaps, cards keep their own height) and the "Box" strip: a white bar
 * with Unlimited DMs / Unlimited Setters / iOS + Mac App / 24/7 VIP Slack Support (48px apart, stacked 40px apart on
 * phone) on a lavender tray carrying "All of this for less than what one setter costs you per month." in purple.
 *
 * Padding 80/100, 64/48, 48/20; 1000px column; heading-to-grid gap 64/48/40, grid-to-strip 32px. The heading, the grid
 * and the strip each fade/slide in (y 48, spring 150/30) when scrolled into view. `clouds` adds the cloud bands at the
 * top and bottom of the section (/thank-you-pdf, where it ends the page).
 */
export function BenefitsSection({ clouds = false }: { clouds?: boolean }) {
  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-clip">
      <div className="relative z-[2] flex w-full items-center justify-center overflow-clip px-5 py-12 md:px-12 md:py-16 lg:px-[100px] lg:py-20">
        <div className="flex w-px max-w-[1000px] flex-1 flex-col items-center gap-10 md:gap-12 lg:gap-16">
          <Reveal y={48} delay={0} className="flex w-full max-w-[578px] flex-col items-center">
            <h2 className={`w-full text-black ${sectionHeadingText}`}>Everything you need to turn your DMs into a revenue machine</h2>
          </Reveal>
          <div className="flex w-full flex-col items-center gap-8">
            <Reveal y={48} delay={0} className="grid w-full grid-cols-1 items-start justify-center gap-6 md:grid-cols-2">
              {FEATURE_CARDS.map((c) => (
                <FeatureCard key={c.title} {...c} />
              ))}
            </Reveal>
            <Reveal y={48} delay={0} className="flex w-full flex-col items-center gap-6 rounded-[24px] bg-[#faf5ff] pb-6">
              <div className="flex w-full flex-col items-center justify-center gap-10 overflow-hidden rounded-[24px] bg-white px-8 py-6 shadow-[0_0_0_0.5px_#e0e0e0,0_1px_2px_0_rgba(0,0,0,0.05)] md:flex-row md:gap-12">
                <div className="flex items-center gap-2">
                  <div className={`${tileBox} bg-[#3b82f6]`}>
                    <div className="relative size-4">
                      <BubbleChatIcon />
                    </div>
                  </div>
                  <p className={`${tagText} font-semibold text-black`}>
                    Unlimited&nbsp;<span className="font-normal text-[#535353]">DMs</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <MochiSetterTile />
                  <p className={`${tagText} font-semibold text-black`}>
                    Unlimited&nbsp;<span className="font-normal text-[#535353]">Setters</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`${tileBox} bg-[#111]`}>
                    <div className="relative size-4">
                      <AppleIcon />
                    </div>
                  </div>
                  <p className={`${tagText} font-semibold text-black`}>
                    iOS + Mac&nbsp;<span className="font-normal text-[#535353]">App</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <SlackIcon />
                  <p className={`${tagText} font-normal text-[#535353]`}>
                    <span className="font-semibold text-black">24/7&nbsp;</span>VIP Slack Support
                  </p>
                </div>
              </div>
              <div className="flex w-full flex-col items-center gap-1 px-6 md:w-auto md:flex-row md:px-0">
                <InfoIcon />
                <p className="text-center text-[14px] leading-[21px] font-medium whitespace-pre-wrap text-[#a855f7] md:text-left md:whitespace-pre">
                  All of this for less than what one setter costs you per month.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
      {clouds && (
        <>
          <Clouds position="bottom" />
          <Clouds position="top" />
        </>
      )}
    </section>
  );
}
