import Image from "next/image";
import { BookedBadge } from "@/components/funnel/booked-badge";
import { StackButton } from "@/components/shared/stack-button";
import { Reveal } from "@/components/ui/reveal";
import { LetterReveal } from "./letter-reveal";

const INTER_FEATURES = "[font-feature-settings:'blwf','cv03','cv04','cv09','cv11']";

/**
 * /features/offer hero (Framer "hero", clipped): the 2880x542 cloud strip behind everything (full width, aspect
 * 1.97 on phone / 5.545 from tablet up, anchored top), then 72px below the page's 58px top padding the
 * "Exclusive Offer" pill, the 48/48 Clash Display headline (36/36 on phone), the per-letter description, the 286x38
 * "Book a Demo" button and the "27 founders booked a call this week" label, 24px apart. 100px of padding below on
 * tablet/desktop (72px on phone), then the cards.
 *
 * Appear effects (all once, on view): headline y 25 (spring bounce 0.2 / 0.6s), button scale 0.8 (bounce 0.2 / 1s,
 * 0.4s delay), description letters per line (see LetterReveal). The description differs on phone: Framer ships two
 * copies and hides one per breakpoint (the page's own desktop breakpoint is 1220px, but tablet and desktop render
 * identically here).
 */
export function OfferHero() {
  return (
    <section className="relative flex w-full flex-col items-center overflow-clip px-4 py-[72px] md:px-8 md:pt-[72px] md:pb-[100px]">
      <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 z-0 aspect-[1.9697] w-full -translate-x-1/2 md:aspect-[5.54545]">
        <Image src="/framer/oSwt9seLcU3Z5YLgcuCu44uCZA.png" alt="" fill preload sizes="100vw" className="object-cover object-top" />
      </div>
      <div className="relative flex w-full flex-col items-center gap-6">
        <div className="flex w-min items-center gap-1 rounded-full bg-purple-50 p-1.5 shadow-[inset_0_0_0_1px_#e9d5ff,0_1px_3px_#85007a14,0_5px_5px_#85007a12,0_11px_6px_#85007a0a,0_19px_8px_#85007a03,0_29px_8px_#85007a00] md:px-3">
          <p className="font-sans text-[14px] leading-[1.2] font-medium whitespace-pre text-purple-500">Exclusive Offer</p>
        </div>
        <div className="flex w-full max-w-[850px] flex-col items-center gap-10">
          <div className="flex w-full flex-col items-center gap-8">
            <Reveal y={25} viewport={{ once: true, amount: 0 }} transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} className="w-full">
              <h1 className="font-display text-center text-[36px] leading-9 font-semibold tracking-[0.72px] break-words whitespace-pre-wrap text-ink-3 md:text-[48px] md:leading-12 md:tracking-[0.96px]">
                Sales Infrastructure Installation &amp; Custom Build Out
              </h1>
            </Reveal>
            <LetterReveal
              lines={["We build out the complete back-end sales infrastructure so that you can scale to $1m/mo without friction or anything breaking."]}
              className={`hidden w-full max-w-[640px] text-center text-[16px] leading-6 font-normal break-words whitespace-pre-wrap text-gray-750 md:block ${INTER_FEATURES}`}
            />
            <LetterReveal
              lines={["You're not broken. Your system is.", "And it's costing you $8K-$15K every week."]}
              className={`w-full max-w-[640px] text-center text-[16px] leading-6 font-normal break-words whitespace-pre-wrap text-gray-750 md:hidden ${INTER_FEATURES}`}
            />
          </div>
          <Reveal
            y={0}
            scale={0.8}
            viewport={{ once: true, amount: 0 }}
            transition={{ type: "spring", bounce: 0.2, duration: 1, delay: 0.4 }}
            className="w-full max-w-[286px]"
          >
            <StackButton href="/" className="w-full">
              Book a Demo
            </StackButton>
          </Reveal>
        </div>
        <BookedBadge variant="offer" />
      </div>
    </section>
  );
}
