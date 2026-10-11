"use client";

import { useInView } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { FEATURES, TIMELINE, cardBackground, type FeatureCopy } from "./data";
import { descriptionText } from "@/components/ui/text";
import { FeatureCta, FeatureHeader } from "./feature-copy";
import { PhoneFrame } from "./frame";
import { InboxMockup } from "./inbox-mockup";
import { ChatMockup } from "./chat-mockup";
import { CrmMockup } from "./crm-mockup";
import { TimelineStack } from "./timeline-stack";

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

/** "Turn DMs into revenue" (Figma 544:19958): the timeline's card stack, then the centred heading and copy. */
function TimelineIntro() {
  return (
    <section className="flex w-full flex-col items-center gap-10 px-5 py-24 md:hidden">
      <TimelineStack />
      <div className="flex flex-col items-center gap-5 text-center">
        <FeatureHeader feature={TIMELINE} className="items-center" />
        <p className={descriptionText}>{TIMELINE.body}</p>
      </div>
    </section>
  );
}

/**
 * Phone variant (Framer "Features Section (Mobile)"): the timeline intro, then the five feature cards stacked, with
 * one CTA that sticks to the bottom of the screen while the cards scroll past and comes to rest under the last card.
 */
export function FeaturesMobile() {
  return (
    <>
      <TimelineIntro />
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
