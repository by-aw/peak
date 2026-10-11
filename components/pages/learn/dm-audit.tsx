import Image from "next/image";
import { WistiaVideo } from "@/components/funnel/wistia-video";
import { BookLink } from "./book-link";
import { DmAuditRing } from "./dm-audit-ring";
import { poppins } from "./fonts";
import { DM_AUDIT_MEDIA_ID } from "./hero";

/** LeadConnector "Mochi Book A Call" calendar the button links to. */
const BOOKING_URL = "https://api.leadconnectorhq.com/widget/booking/5947iPBXED9I5cpEKjdr";

/**
 * /book-dm-audit: Framer shows one HTML Embed (the page's own markup and CSS, Poppins) on a bare white page. Ported 1:1.
 * A 480px-wide column (680px from 768px): the 42px Mochi blob (centred, left-aligned with 48px padding from 768px),
 * "Install Mochi for only $297/mo" (Poppins 800 23px), a full-width purple guarantee bar (800 18px, 20px from 768px),
 * the sub-copy (15px #555) and "Watch the video below to see how" (700 16px), the Wistia DM-audit video in an 18px-radius
 * frame with a purple 2px ring + 28px glow, a purple "Book 20% More Calls for $297/mo" button (800 17px, 14px radius),
 * then the testimonials heading (800 24px / 28px) over `DmAuditRing`.
 *
 * On tablet and desktop Framer gives the embed a fixed 1080px height, so the page scrolls inside it (`md:h-[1080px]`
 * `md:overflow-y-auto`); on phone it grows with its content (plus the 3px inline-iframe baseline gap Framer's embed leaves under it).
 */
export function DmAuditPage() {
  return (
    <div className="w-full max-md:pb-[3px] md:h-[1080px] md:overflow-y-auto">
      <div className={`${poppins.className} w-full overflow-x-hidden bg-white pb-10 text-[12px] leading-[normal] font-normal tracking-normal text-[#111]`}>
        <div className="mx-auto max-w-[480px] min-[768px]:max-w-[680px]">
          <div className="flex justify-center pt-5 pb-2 min-[768px]:justify-start min-[768px]:px-12 min-[768px]:pt-6">
            <Image src="/framer/book-dm-audit-logo.avif" alt="Mochi" width={164} height={140} className="h-[42px] w-auto" priority />
          </div>
          <p className="mb-3.5 px-5 text-center text-[23px] font-extrabold text-[#111]">Install Mochi for only $297/mo</p>
        </div>

        <div className="w-full bg-[#9333ea] px-4 py-3.5 text-center text-[18px] leading-[1.3] font-extrabold tracking-[0.2px] text-white min-[768px]:px-6 min-[768px]:py-[18px] min-[768px]:text-[20px]">
          <span className="text-[#111]">Install Mochi.</span>{" "}
          Book 20% More Qualified Calls… or you don&apos;t pay
        </div>

        <div className="mx-auto max-w-[480px] min-[768px]:max-w-[680px]">
          <div className="px-6 pt-7 text-center">
            <p className="mb-[18px] text-[15px] leading-normal text-[#555]">
              The leads are already there.
              <br />
              Mochi is the system that turns them into booked calls.
            </p>
            <p className="mb-1 text-[16px] font-bold text-[#111]">Watch the video below to see how</p>
          </div>

          <div className="px-4 pt-1.5">
            <WistiaVideo
              mediaId={DM_AUDIT_MEDIA_ID}
              swatch
              className="block w-full overflow-hidden rounded-[18px] shadow-[0_0_0_2px_rgba(147,51,234,0.55),0_0_28px_4px_rgba(147,51,234,0.35)]"
            />
          </div>

          <div className="px-5 pt-[18px]">
            <BookLink
              href={BOOKING_URL}
              className="block w-full cursor-pointer rounded-[14px] bg-[#9333ea] px-5 py-4 text-center text-[17px] font-extrabold text-white shadow-[0_10px_24px_rgba(147,51,234,0.35)] active:bg-[#7e22ce]"
            >
              Book 20% More Calls for $297/mo
            </BookLink>
          </div>

          <div className="pt-16 pb-2 text-center">
            <h3 className="mb-8 px-6 text-[24px] leading-[1.3] font-extrabold text-[#111] min-[768px]:text-[28px]">
              Already running inside 120+ six and seven-figure info businesses
            </h3>
            <DmAuditRing />
          </div>
        </div>
      </div>
    </div>
  );
}
