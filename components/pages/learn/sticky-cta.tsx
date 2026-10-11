import { RollingButton } from "@/components/shared/rolling-button";

/**
 * Framer "Primary Button + Label" fixed to the bottom of /learn ("Book Your DM Audit", links to /demo).
 *
 * Desktop (>= 1200px, "Desktop/Hero"): 20px above the bottom edge, a 296x66px #9333ea button (Inter 500 24/26.4px, 20/32px
 * padding, 10px radius) over the line "20% more booked calls, or you don't pay" (Inter 16/23.2px, #383840, at most 402px,
 * 16px below the button). At >= 1752px ("Desktop XL") the line is not shown.
 * Tablet and phone ("Phone/Sticky"): a full-width bar on the bottom edge (12px/20px padding, 2% white with a 4px blur)
 * holding a 67px-tall full-width button with 20/22px text.
 *
 * The bar itself does not take pointer events (Framer's invisible strip swallowed clicks on the content below it).
 */
export function LearnStickyCta() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-5 lg:bottom-5">
      <div className="flex w-full flex-col items-center justify-end lg:h-[132px]">
        <div className="flex w-full flex-col items-center gap-4 bg-white/[0.02] px-5 py-3 backdrop-blur-[4px] lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
          <div className="flex h-[67px] w-full items-center justify-center gap-2.5 lg:h-auto">
            <RollingButton
              href="/demo"
              size="lg"
              className="pointer-events-auto h-full! w-full bg-none! bg-[#9333ea]! px-8! py-5! lg:h-auto! lg:w-auto"
              textClassName="h-[22px]! text-[20px]! leading-[22px]! lg:h-[26.4px]! lg:text-[24px]! lg:leading-[26.4px]!"
            >
              Book Your DM Audit
            </RollingButton>
          </div>
          <div className="hidden w-full items-center justify-center lg:flex min-[1752px]:hidden">
            <p className="w-full max-w-[402px] text-center text-[16px] leading-[23.2px] tracking-[-0.16px] whitespace-pre-wrap text-[#383840]">20% more booked calls, or you don&apos;t pay</p>
          </div>
        </div>
      </div>
    </div>
  );
}
