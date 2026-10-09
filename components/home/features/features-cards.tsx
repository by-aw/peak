"use client";

import Image from "next/image";
import { useInView } from "motion/react";
import { useRef, type ReactNode } from "react";
import { FEATURES, TIMELINE, cardBackground, type FeatureCopy } from "./data";
import { FeatureCta, FeatureText } from "./feature-copy";
import { PhoneFrame } from "./frame";
import { InboxMockup } from "./inbox-mockup";
import { ChatMockup } from "./chat-mockup";
import { CrmMockup } from "./crm-mockup";
import { Timeline } from "./timeline";

/**
 * Tablet/desktop variant of the Features Section: the "Turn DMs into revenue" card, then one card per feature, stacked
 * 32px apart, inset 32px from the screen edges and 128px shorter than the screen at each end (taller when the copy and
 * mascot need it). Every card holds its own phone (the first card its bare timeline, as tall as the card), `position: fixed`
 * in the centre of the right half and vertically centred on screen, so all six sit in the same spot and
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

/** `children` is the phone's screen, or with `phone={false}` the whole visual, unframed. */
function FeatureCard({
  feature,
  fade = false,
  phone = true,
  children,
}: {
  feature: FeatureCopy;
  fade?: boolean;
  phone?: boolean;
  children: (play: boolean) => ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  // mount a screen early so the phone already has content when the card's edge starts revealing it
  const near = useInView(ref, { once: true, margin: "100% 0px" });
  const play = useInView(ref, { once: true, amount: 0.4 });
  const visual = near ? children(play) : null;

  return (
    <article
      ref={ref}
      className="relative flex min-h-[max(560px,calc(100svh-256px))] w-full [clip-path:inset(0_round_32px)]"
      style={{ background: cardBackground(feature.tint, "80%") }}
    >
      {/* phone. The 800px frame is taller than most cards, so its flat bottom edge would show inside the next card
          while it scrolls in; on desktop it gets the same bottom fade the tablet and CRM frames already have. */}
      <div
        className={`pointer-events-none fixed top-1/2 left-[calc(75%-16px)] -translate-x-1/2 -translate-y-1/2 ${fade || !phone ? "" : "lg:[mask-image:linear-gradient(0deg,rgba(0,0,0,0)_0%,#000_20%)]"}`}
      >
        {phone ? <PhoneFrame fade={fade}>{visual}</PhoneFrame> : visual}
      </div>
      {/* copy, vertically centred in the left half, with the mascot underneath in the bottom-left corner. On desktop
          its left edge sits on the page grid (max(100px, (100% - 1200px) / 2) from the screen edge, as in the other
          sections); the card starts 32px in and is 64px narrower than the screen, so that is max(68px, 50% - 600px). */}
      <div className="flex w-1/2 px-8 lg:pr-16 lg:pl-[max(68px,calc(50%-600px))]">
        <div className="flex w-full max-w-[396px] flex-col lg:max-w-[528px]">
          <div className="min-h-8 flex-1" />
          <div className="flex flex-col items-start gap-12">
            <FeatureText feature={feature} />
            <FeatureCta />
          </div>
          <div className="flex min-h-[196px] flex-1 items-end pt-6 pb-8">
            {feature.mascot ? (
              <Image
                src={feature.mascot.src}
                alt=""
                width={feature.mascot.width}
                height={feature.mascot.height}
                style={{ width: feature.mascot.width, height: feature.mascot.height }}
                className="object-cover"
              />
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

export function FeaturesCards() {
  return (
    <section className="hidden w-full flex-col gap-8 px-8 pt-16 md:flex lg:pt-20">
      <FeatureCard feature={TIMELINE} phone={false}>
        {() => <Timeline className="h-[max(560px,calc(100svh-256px))] w-[350px] lg:w-[440px]" />}
      </FeatureCard>
      {FEATURES.map((f, i) => (
        <FeatureCard key={f.label} feature={f} fade={i === 4}>
          {(play) => <Mockup index={i} play={play} />}
        </FeatureCard>
      ))}
    </section>
  );
}
