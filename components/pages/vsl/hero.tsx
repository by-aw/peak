import { BookedBadge } from "@/components/funnel/booked-badge";
import { WistiaVideo } from "@/components/funnel/wistia-video";
import { RollingButton } from "@/components/shared/rolling-button";
import { Reveal } from "@/components/ui/reveal";
import { DEMO_HREF } from "@/components/pages/vsl/data";
import { heroHeadingText } from "@/components/pages/vsl/styles";

/**
 * Framer "Hero Section" of /vsl and /vsl-2: headline, the Wistia VSL and the "Book a Demo" button over the
 * "27 founders booked a call this week" badge. Everything appears on load (fade + 48px slide, spring 150/30;
 * headline delay 0.2s, video 0.1s, button 0.4s).
 *
 * Padding 64/20/0 on phone, 80/48/64 on tablet, 64/100/0 on desktop; content at most 1200px, 48px (64px desktop)
 * between the headline and the video, 32px (24px from tablet up) between the video and the button.
 * The headline is the h1 preset from tablet up (746px column; 140% of it, centred, on desktop) and a smaller
 * two-line Clash Display 600 20/24 h4 on phone. The button stretches to the badge's width (249.4px).
 */
export function VslHero({
  headline,
  phoneLines,
  mediaId,
}: {
  /** Tablet/desktop headline. */
  headline: string;
  /** Phone headline, rendered on two lines. */
  phoneLines: readonly [string, string];
  /** Wistia media id of the video. */
  mediaId: string;
}) {
  return (
    <section className="relative flex w-full items-center justify-center overflow-clip">
      <div className="flex w-full flex-1 flex-col items-center px-5 pt-16 md:px-12 md:pt-20 md:pb-16 lg:px-[100px] lg:pt-16 lg:pb-0">
        <div className="relative z-[2] flex w-full max-w-[1200px] flex-col items-center gap-12 lg:gap-16">
          <div className="flex w-full max-w-[746px] flex-col items-center">
            <Reveal delay={0.2} className="w-full shrink-0 lg:w-[140%]">
              <h1 className={`hidden md:block ${heroHeadingText}`}>{headline}</h1>
              <h1 className="text-center font-display text-[20px] leading-[24px] font-semibold tracking-[-0.4px] whitespace-pre-wrap text-black md:hidden">
                {phoneLines[0]}
                <br />
                {phoneLines[1]}
              </h1>
            </Reveal>
          </div>
          <div className="flex w-full flex-col items-center gap-8 md:gap-6">
            <Reveal delay={0.1} className="w-full">
              <WistiaVideo mediaId={mediaId} autoplay />
            </Reveal>
            <Reveal delay={0.4} className="flex w-min flex-col items-center gap-4">
              <RollingButton href={DEMO_HREF} size="lg" className="w-full">
                Book a Demo
              </RollingButton>
              <BookedBadge />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
