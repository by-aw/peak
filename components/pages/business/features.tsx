"use client";

import Image from "next/image";
import { useInView } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { descriptionText } from "@/components/ui/text";
import { FEATURES, cardBackground, type FeatureCopy } from "@/components/home/features/data";
import { FeatureCta, FeatureHeader, FeatureText } from "@/components/home/features/feature-copy";
import { PhoneFrame } from "@/components/home/features/frame";
import { InboxMockup } from "@/components/home/features/inbox-mockup";
import { ChatMockup } from "@/components/home/features/chat-mockup";
import { CrmMockup } from "@/components/home/features/crm-mockup";
import { STEPS } from "./steps";
import { Timeline, TimelineStack } from "./timeline";

/*
 * /business "Features Section". On live it is the home page's Framer Features Section with only the intro swapped
 * (heading, paragraph and the timeline's copy); the five features are identical. It follows the redesigned local
 * home section (components/home/features/features-cards.tsx and features-mobile.tsx, copied here because those
 * hard-code the home intro): one card per feature over a fixed phone on tablet/desktop, stacked cards on phone.
 */

/** Intro copy, verbatim from the live page. Tint as the home intro card. */
const INTRO: FeatureCopy = {
  heading: "From a question to the right next step",
  body: "Someone asks about a service. Mochi answers, learns what they need, and shares the right link when they are ready.",
  tint: "rgba(224,170,72,0.24)",
};

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

/**
 * Tablet/desktop card: 32px from the screen edges, at least 128px shorter than the screen at each end, copy centred
 * in the left half with the mascot underneath. Its phone is `position: fixed` in the centre of the right half and
 * clipped by the card's clip-path, so scrolling reveals each feature's phone like a mask. `children` is the phone's
 * screen, or with `phone={false}` the whole visual, unframed.
 */
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
      <div
        className={`pointer-events-none fixed top-1/2 left-[calc(75%-16px)] -translate-x-1/2 -translate-y-1/2 ${fade || !phone ? "" : "lg:[mask-image:linear-gradient(0deg,rgba(0,0,0,0)_0%,#000_20%)]"}`}
      >
        {phone ? <PhoneFrame fade={fade}>{visual}</PhoneFrame> : visual}
      </div>
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

function FeaturesCards() {
  return (
    <section className="hidden w-full flex-col gap-8 px-8 pt-16 md:flex lg:pt-[180px]">
      <FeatureCard feature={INTRO} phone={false}>
        {() => <Timeline steps={STEPS} className="h-[max(560px,calc(100svh-256px))] w-[350px] lg:w-[440px]" />}
      </FeatureCard>
      {FEATURES.map((f, i) => (
        <FeatureCard key={f.label} feature={f} fade={i === 4}>
          {(play) => <Mockup index={i} play={play} />}
        </FeatureCard>
      ))}
    </section>
  );
}

const PHONE_WIDTH = 350;

/** Shrinks the 350px phone frame to the card's width on narrow phones (zoom, unlike scale, also shrinks its layout box). */
function FitPhone({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setZoom(Math.min(1, entry.contentRect.width / PHONE_WIDTH)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className="flex w-full justify-center">
      <div style={{ zoom }}>{children}</div>
    </div>
  );
}

/** Phone feature card: centred label + heading, then the mockup, which starts playing once it scrolls into view. */
function Block({
  feature,
  fade = false,
  children,
}: {
  feature: FeatureCopy;
  fade?: boolean;
  children: (play: boolean) => ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <div
      ref={ref}
      className="flex w-full flex-col items-center gap-7 overflow-clip rounded-[32px] px-5 pt-10 pb-5"
      style={{ background: cardBackground(feature.tint, "50%") }}
    >
      <FeatureHeader feature={feature} card className="items-center text-center" />
      <FitPhone>
        <PhoneFrame fade={fade}>{inView ? children(true) : null}</PhoneFrame>
      </FitPhone>
    </div>
  );
}

/**
 * Phone: the intro (timeline card stack over the centred heading and copy), then the five feature cards stacked,
 * with one CTA that sticks to the bottom of the screen and comes to rest under the last card.
 */
function FeaturesMobile() {
  return (
    <>
      <section className="flex w-full flex-col items-center gap-10 px-5 py-24 md:hidden">
        <TimelineStack steps={STEPS} />
        <div className="flex flex-col items-center gap-5 text-center">
          <FeatureHeader feature={INTRO} className="items-center" />
          <p className={descriptionText}>{INTRO.body}</p>
        </div>
      </section>
      <section className="flex w-full flex-col items-center px-5 py-12 md:hidden">
        <div className="flex w-full flex-col gap-5">
          <Block feature={FEATURES[0]}>{() => <InboxMockup />}</Block>
          <Block feature={FEATURES[1]}>{(play) => <ChatMockup feature={2} play={play} />}</Block>
          <Block feature={FEATURES[2]}>{(play) => <ChatMockup feature={3} play={play} />}</Block>
          <Block feature={FEATURES[3]}>{(play) => <ChatMockup feature={4} play={play} />}</Block>
          <Block feature={FEATURES[4]} fade>
            {() => <CrmMockup />}
          </Block>
        </div>
        <div className="sticky bottom-[calc(20px+env(safe-area-inset-bottom))] z-10 mt-5 flex w-full justify-center">
          <FeatureCta />
        </div>
      </section>
    </>
  );
}

export function BusinessFeatures() {
  return (
    <>
      <FeaturesCards />
      <FeaturesMobile />
    </>
  );
}
