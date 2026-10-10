import Image from "next/image";
import Link from "next/link";
import { ArrowRightMini } from "@/components/icons/updates-icons";
import { UpdatesClouds } from "./clouds";

const badgeShadow =
  "shadow-[0_1px_3px_0_rgba(133,0,122,0.08),0_5px_5px_0_rgba(133,0,122,0.07),0_11px_6px_0_rgba(133,0,122,0.04),0_19px_8px_0_rgba(133,0,122,0.01),0_29px_8px_0_rgba(133,0,122,0)]";

/**
 * /updates hero: clouds, the "We just launched Mochi!" badge (with the chef mascot peeking over it
 * on tablet/desktop) and the "Latest at Mochi" heading. 375px tall on tablet/desktop, 236px on phone.
 */
export function UpdatesHero() {
  return (
    <section className="relative flex w-full flex-col items-center overflow-clip px-4 py-[72px] md:px-8 md:pt-[191px] md:pb-20">
      <UpdatesClouds />
      <div className="relative z-[1] flex w-full flex-col items-center gap-6">
        <div className="relative">
          {/* wrapper div: the unlayered `img { display: block }` in globals.css would beat `hidden` on the image itself */}
          <div aria-hidden className="absolute top-[-74px] left-1/2 z-[1] hidden h-[86px] w-[70px] -translate-x-1/2 md:block">
            <Image src="/framer/eaXKUQtDvTme5sDm01ylMYQGrFA.png" alt="" width={832} height={1019} sizes="70px" className="h-[86px] w-[70px]" />
          </div>
          <Link
            href="/updates/voice-messages-convert-3x-better-mochi-scenes"
            className={`relative flex items-center gap-4 rounded-[99px] bg-purple-50 px-3 py-1.5 text-[14px] leading-5 font-medium whitespace-pre text-purple-500 ${badgeShadow}`}
          >
            <span>We just launched Mochi!</span>
            <span className="flex items-center gap-2">
              Read more
              <ArrowRightMini />
            </span>
          </Link>
        </div>
        <h1 className="font-display text-center text-[36px] leading-9 font-semibold tracking-[0.72px] whitespace-pre-wrap text-ink-3 md:text-[48px] md:leading-12 md:tracking-[0.96px]">
          Latest at Mochi
        </h1>
      </div>
    </section>
  );
}
