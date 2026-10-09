"use client";

import { useInView } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { FEATURES, cardBackground } from "./data";
import { FeatureCta, FeatureHeader } from "./feature-copy";
import { PhoneFrame } from "./frame";
import { InboxMockup } from "./inbox-mockup";
import { ChatMockup } from "./chat-mockup";
import { CrmMockup } from "./crm-mockup";

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

/** One feature card, as on tablet/desktop: centred label + heading, then the mockup, which starts playing once it scrolls into view. */
function Block({ index, children }: { index: number; children: (play: boolean) => ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const feature = FEATURES[index];
  return (
    <div
      ref={ref}
      className="flex w-full flex-col items-center gap-7 overflow-clip rounded-[32px] px-5 pt-10 pb-5"
      style={{ background: cardBackground(feature.tint, "50%") }}
    >
      <FeatureHeader feature={feature} className="items-center text-center" />
      <FitPhone>
        <PhoneFrame fade={index === 4}>{inView ? children(true) : null}</PhoneFrame>
      </FitPhone>
    </div>
  );
}

/**
 * Phone variant (Framer "Features Section (Mobile)"): the five feature cards stacked, with one CTA that sticks to the
 * bottom of the screen while the cards scroll past and comes to rest under the last card.
 */
export function FeaturesMobile() {
  return (
    <section className="flex w-full flex-col items-center px-5 py-12 md:hidden">
      <div className="flex w-full flex-col gap-5">
        <Block index={0}>{() => <InboxMockup />}</Block>
        <Block index={1}>{(play) => <ChatMockup feature={2} play={play} />}</Block>
        <Block index={2}>{(play) => <ChatMockup feature={3} play={play} />}</Block>
        <Block index={3}>{(play) => <ChatMockup feature={4} play={play} />}</Block>
        <Block index={4}>{() => <CrmMockup />}</Block>
      </div>
      <div className="sticky bottom-[calc(20px+env(safe-area-inset-bottom))] z-10 mt-5 w-full">
        <FeatureCta />
      </div>
    </section>
  );
}
