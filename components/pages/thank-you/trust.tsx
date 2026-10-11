import Image from "next/image";
import { CreatorRing, CREATOR_TICKER_LABEL_THANK_YOU } from "@/components/funnel/creator-ticker";
import { Reveal } from "@/components/ui/reveal";
import { sectionHeading } from "./styles";

/**
 * /thank-you "Trust Section 2": the "Already installed for 120+ industry leaders" heading (at most 580px wide, so it breaks after
 * "120+"), then a stack (16px gap, 16px top padding on phone only) holding the creator ring (189px / 327px / 520px tall; the stack clips it to the 1360px content width) and the
 * testimonial collage (one 2:1 image, 1160px wide on desktop, 832px on tablet, full width on phone), with the cloud strip fading in
 * along the bottom of the section. Section padding 80/0/184 (64/48 on tablet, 48/20/24 on phone), content at most 1360px wide.
 */
export function ThankYouTrust() {
  return (
    <section className="relative flex w-full items-center justify-center">
      <div className="relative flex w-px flex-1 items-center justify-center px-5 pt-12 pb-6 md:px-12 md:py-16 lg:px-0 lg:pt-20 lg:pb-[184px]">
        <div className="relative z-[2] flex w-px max-w-[1360px] flex-1 flex-col items-center justify-center">
          <Reveal delay={0} viewport={{ once: true }} className="flex w-full flex-col items-center gap-4">
            <div className="flex w-full flex-col items-center gap-2">
              <div className="w-full max-w-[580px]">
                <h3 className={sectionHeading}>{CREATOR_TICKER_LABEL_THANK_YOU}</h3>
              </div>
            </div>
          </Reveal>
          <div className="flex w-full flex-col items-center gap-4 overflow-clip pt-4 md:pt-0">
            <CreatorRing className="h-[189px] md:h-[327px] lg:h-[520px]" />
            <div className="flex w-full flex-col items-center justify-center overflow-clip md:px-12 lg:px-[100px]">
              <Image
                src="/framer/yBJY4OIZOQnuLZjnG0wtoIjDbI.png"
                alt=""
                width={2048}
                height={1031}
                sizes="(min-width: 1200px) 1160px, (min-width: 810px) 832px, 350px"
                className="relative w-full"
              />
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[312px] overflow-hidden [mask-image:linear-gradient(181deg,#0000_0%,#000_100%)]">
        <Image src="/framer/3fb6w8IKfGgJQqarb2yoBkkYhw.png" alt="" width={2398} height={624} sizes="100vw" className="absolute inset-0 h-full! w-full object-cover" />
      </div>
    </section>
  );
}
