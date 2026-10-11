import { Reveal } from "@/components/ui/reveal";
import { WistiaVideo } from "@/components/funnel/wistia-video";
import { INTER_CV } from "./styles";

/** Wistia media of the pre-call video. */
const MEDIA_ID = "yrp2wb8giq";

/**
 * /thank-you "Hero Section": the "Your Mochi DM audit call is confirmed" headline (Clash Display 700, 38/39.9, 46/48.3 and
 * 56/58.8px with 0.02em tracking, breaking after "call"), a 480px-wide Inter line (15/22.5, 16/24, 18/27px, -0.02em), and the
 * Wistia video in a frame (12px padding and 20px radius from tablet up, 8px and 14px on phone; 1.77305 aspect, 1.77612 on
 * tablet) with a blurred (8px) purple gradient glow behind it (55% opacity on phone) and a 23px empty "Button + Label" row.
 * Section padding 56/20/16 on phone, 64/48 on tablet and 80/100/32 on desktop; the copy fades up like the other sections.
 */
export function ThankYouHero() {
  return (
    <section className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center px-5 pt-14 pb-4 md:px-12 md:py-16 lg:px-[100px] lg:pt-20 lg:pb-8">
        <div className="flex w-full max-w-[1200px] flex-col items-center justify-center gap-8 md:gap-12">
          <Reveal delay={0} viewport={{ once: true }} className="flex w-full max-w-[780px] flex-col items-center justify-center gap-6">
            <div className="flex w-full flex-col items-center gap-4 md:gap-5 lg:gap-6">
              <h1 className={`w-full text-center font-display text-[38px] leading-[39.9px] font-bold tracking-[0.76px] text-ink-3 md:text-[46px] md:leading-[48.3px] md:tracking-[0.92px] lg:text-[56px] lg:leading-[58.8px] lg:tracking-[1.12px]`}>
                Your Mochi DM audit call
                <br />
                is confirmed
              </h1>
              <p className={`w-full max-w-[480px] text-center text-[15px] leading-[22.5px] font-normal tracking-[-0.3px] break-words whitespace-pre-wrap text-gray-750 md:text-[16px] md:leading-6 md:tracking-[-0.32px] lg:text-[18px] lg:leading-[27px] lg:tracking-[-0.36px] ${INTER_CV}`}>
                You&apos;re one step closer to seeing what Mochi could install inside your DM backend.
              </p>
            </div>
          </Reveal>
          <div className="flex w-full flex-col items-center justify-center gap-8">
            <div className="relative z-[2] flex w-full flex-col items-center justify-center rounded-[14px] p-2 md:rounded-[20px] md:p-3">
              <WistiaVideo
                mediaId={MEDIA_ID}
                swatch
                className="relative z-[2] flex aspect-[1.77305] w-full items-center md:aspect-[1.77612] lg:aspect-[1.77305]"
              />
              <div
                aria-hidden
                className="absolute inset-0 z-[1] rounded-[20px] bg-[linear-gradient(120deg,#ac56db8c_0%,#eebaff59_44%,#b160de66_65%,#eb85ff0d_100%)] opacity-55 blur-[8px] md:opacity-100"
              />
            </div>
            <div aria-hidden className="min-h-[23px] w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
