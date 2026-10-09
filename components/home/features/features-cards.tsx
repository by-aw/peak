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
 * Tablet/desktop variant of the Features Section: one card per feature, stacked 32px apart and inset 32px
 * from the screen edges. Every card holds its own phone, `position: fixed` in the centre of the left half,
 * so all five phones sit in the same spot on screen. The card's clip-path clips its phone (clip-path, unlike
 * overflow, also clips fixed descendants), so the phone stays put while the card edges scroll across it,
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

  return (
    <article
      ref={ref}
      className="relative flex h-[calc(100svh-64px)] min-h-[640px] w-full [clip-path:inset(0_round_32px)]"
      style={{
        background: `radial-gradient(90% 100% at 20% 100%, ${feature.tint} 0%, rgba(255,255,255,0) 70%), linear-gradient(135deg, #f4f5f9 0%, #eceef5 100%)`,
      }}
    >
      {/* phone: at least 64px below the screen top. The tablet frame fades out at the bottom, so it is centred
          vertically; the desktop frame has a flat bottom edge, so it sits low enough for that edge to stay off screen. */}
      <div className="pointer-events-none fixed top-[max(64px,calc(50svh-324px))] left-[calc(25%+16px)] -translate-x-1/2 lg:top-[max(64px,calc(100svh-800px))]">
        <PhoneFrame fade={index === 4}>{near ? <Mockup index={index} play={play} /> : null}</PhoneFrame>
      </div>
      {/* copy, vertically centred in the right half, with the mascot underneath */}
      <div className="ml-auto flex h-full w-1/2 justify-center px-8 lg:px-16">
        <div className="flex h-full w-full max-w-[396px] flex-col lg:max-w-[528px]">
          <div className="flex-1" />
          <div className="flex flex-col items-start gap-12">
            <FeatureText feature={feature} />
            <FeatureCta />
          </div>
          <div className="flex min-h-[172px] flex-1 items-end pb-8">
            <Image
              src={feature.mascot.src}
              alt=""
              width={feature.mascot.width}
              height={feature.mascot.height}
              style={{ width: feature.mascot.width, height: feature.mascot.height }}
              className="object-cover"
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
