"use client";

import Image from "next/image";
import { useInView } from "motion/react";
import { useRef } from "react";
import { FEATURES } from "./data";
import { FeatureCta, FeatureText } from "./feature-copy";
import { PhoneFrame } from "./frame";
import { InboxMockup } from "./inbox-mockup";
import { ChatMockup } from "./chat-mockup";
import { CrmMockup } from "./crm-mockup";

/**
 * Tablet/desktop variant of the Features Section: one card per feature, stacked 32px apart, inset 32px from the
 * screen edges and 128px shorter than the screen at each end. Every card holds its own phone, `position: fixed`
 * in the centre of the right half and vertically centred on screen, so all five phones sit in the same spot and
 * each one is centred in its card when the card is centred. The card's clip-path clips its phone (clip-path,
 * unlike overflow, also clips fixed descendants), so the phone stays put while the card edges scroll across it,
 * revealing the next feature's phone like a mask.
 */

/** The chat mockups show their first frame until `play`; the inbox animates in on mount, so it waits for `play`. */
function Mockup({ index, play }: { index: number; play: boolean }) {
  switch (index) {
    case 0:
      return play ? <InboxMockup /> : null;
    case 1:
      return <ChatMockup feature={2} play={play} />;
    case 2:
      return <ChatMockup feature={3} play={play} />;
    case 3:
      return <ChatMockup feature={4} play={play} />;
    default:
      return <CrmMockup />;
  }
}

function FeatureCard({ index }: { index: number }) {
  const ref = useRef<HTMLElement>(null);
  // mount a screen early so the phone already has content when the card's edge starts revealing it
  const near = useInView(ref, { once: true, margin: "100% 0px" });
  const play = useInView(ref, { once: true, amount: 0.4 });
  const feature = FEATURES[index];
  const fade = index === 4;

  return (
    <article
      ref={ref}
      className="relative flex h-[max(560px,calc(100svh-256px))] w-full [clip-path:inset(0_round_32px)]"
      style={{
        background: `radial-gradient(90% 100% at 80% 100%, ${feature.tint} 0%, rgba(255,255,255,0) 70%), linear-gradient(225deg, #f4f5f9 0%, #eceef5 100%)`,
      }}
    >
      {/* phone. The 800px frame is taller than most cards, so its flat bottom edge would show inside the next card
          while it scrolls in; on desktop it gets the same bottom fade the tablet and CRM frames already have. */}
      <div
        className={`pointer-events-none fixed top-1/2 left-[calc(75%-16px)] -translate-x-1/2 -translate-y-1/2 ${fade ? "" : "lg:[mask-image:linear-gradient(0deg,rgba(0,0,0,0)_0%,#000_20%)]"}`}
      >
        <PhoneFrame fade={fade}>{near ? <Mockup index={index} play={play} /> : null}</PhoneFrame>
      </div>
      {/* copy, centred in the left half; the mascot sits beside the CTA, outside the flow so the copy stays centred */}
      <div className="flex h-full w-1/2 items-center justify-center px-8 lg:px-16">
        <div className="flex w-full max-w-[396px] flex-col items-start gap-12 lg:max-w-[528px]">
          <FeatureText feature={feature} />
          <div className="relative inline-flex">
            <FeatureCta />
            <Image
              src={feature.mascot.src}
              alt=""
              width={feature.mascot.width}
              height={feature.mascot.height}
              style={{ width: feature.mascot.width, height: feature.mascot.height }}
              className="absolute top-1/2 left-[calc(100%+24px)] max-w-none -translate-y-1/2 object-cover"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export function FeaturesCards() {
  return (
    <section className="hidden w-full flex-col gap-8 px-8 pt-16 md:flex lg:pt-20">
      {FEATURES.map((f, i) => (
        <FeatureCard key={f.label} index={i} />
      ))}
    </section>
  );
}
