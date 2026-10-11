import { WistiaVideo } from "@/components/funnel/wistia-video";

/** Wistia media of the DM-audit video (shared by /learn and /book-dm-audit). */
export const DM_AUDIT_MEDIA_ID = "4hed0vkrcp";

/**
 * Framer "Hero Section" of /learn: a centred headline, a two-line sub-copy and the Wistia DM-audit video in a glowing frame.
 *
 * Section padding 56/20/24 on phone, 64/48 on tablet, 64/100/124 on desktop; content at most 1000px wide, 32px (phone) /
 * 40px below the copy. Headline: Clash Display 700, #1d1d20 with the second line purple (#9333ea), 32/32, 40/40 and 48/48px.
 * Sub-copy: Inter 15/22.5, 16/24 and 18/27px, -0.3/-0.32/-0.36px tracking, #42424a, at most 576px.
 * Video frame: 12px padding and 20px radius from tablet up (350px wide, 14px radius, the 368px video overflowing 9px
 * either side on phone); 1.77305 aspect (1.77612 on tablet); behind it a blurred (8px) purple gradient glow (inset 0;
 * on phone a 379x223px box at 55% opacity).
 *
 * At >= 1752px (Framer's "Desktop XL" variant) the headline is the older "Install Mochi. Book 20% More Qualified Calls…
 * or you don't pay" (second part purple); kept as on live.
 */
export function LearnHero() {
  return (
    <section className="relative flex w-full flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center px-5 pt-14 pb-6 md:px-12 md:py-16 lg:px-[100px] lg:pt-16 lg:pb-[124px]">
        <div className="flex w-full max-w-[1000px] flex-col items-center gap-8 md:gap-10">
          <div className="flex w-full max-w-[780px] flex-col items-center gap-4 md:gap-5">
            <h1 className="w-full text-center font-display text-[32px] leading-[32px] font-bold whitespace-pre-wrap text-[#1d1d20] md:text-[40px] md:leading-[40px] lg:text-[48px] lg:leading-[48px]">
              <span className="min-[1752px]:hidden">
                20% More Booked Calls.
                <span className="max-md:hidden lg:hidden"> </span>
                <br />
                <span className="text-purple-600">Or You Don’t Pay.</span>
              </span>
              <span className="hidden min-[1752px]:inline">
                Install Mochi. <span className="text-purple-600">Book 20% More Qualified Calls… or you don’t pay</span>
              </span>
            </h1>
            <p className="w-full max-w-[576px] text-center text-[15px] leading-[22.5px] font-normal tracking-[-0.3px] whitespace-pre-wrap text-[#42424a] md:text-[16px] md:leading-[24px] md:tracking-[-0.32px] lg:text-[18px] lg:leading-[27px] lg:tracking-[-0.36px]">
              The leads are already there.
              <br />
              Mochi is the system that turns them into booked calls.
            </p>
          </div>
          <div className="relative z-[2] flex w-full flex-col items-center justify-center gap-7 rounded-[14px] md:gap-0 md:rounded-[20px] md:p-3">
            <WistiaVideo
              mediaId={DM_AUDIT_MEDIA_ID}
              swatch
              className="relative z-[2] flex aspect-[1.77305] w-[368px] shrink-0 items-center md:w-full md:aspect-[1.77612] lg:aspect-[1.77305]"
            />
            <div
              aria-hidden
              className="absolute top-[calc(50.1205%-111.5px)] left-[calc(50%-189.5px)] z-[1] h-[223px] w-[379px] rounded-[20px] bg-[linear-gradient(120deg,#ac56db8c_0%,#eebaff59_44%,#b160de66_65%,#eb85ff0d_100%)] opacity-55 blur-[8px] md:inset-0 md:h-auto md:w-auto md:opacity-100"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
