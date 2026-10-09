"use client";

import { useInView } from "motion/react";
import { useRef, type ReactNode } from "react";
import { FEATURES } from "./data";
import { FeatureCta, FeatureText } from "./feature-copy";
import { PhoneFrame } from "./frame";
import { InboxMockup } from "./inbox-mockup";
import { ChatMockup } from "./chat-mockup";
import { CrmMockup } from "./crm-mockup";

/** One stacked block: copy, mockup, CTA. The mockup starts playing once it scrolls into view. */
function Block({ index, children }: { index: number; children: (play: boolean) => ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const feature = FEATURES[index];
  return (
    <div ref={ref} className="flex w-full flex-col items-center gap-7 overflow-clip">
      <div className="w-full">
        <FeatureText feature={feature} />
      </div>
      <PhoneFrame fade={index === 4}>{inView ? children(true) : null}</PhoneFrame>
      <div className="w-full">
        <FeatureCta />
      </div>
    </div>
  );
}

/** Phone variant (Framer "Features Section (Mobile)"): the five features stacked, nothing pinned. */
export function FeaturesMobile() {
  return (
    <section className="flex w-full flex-col items-center px-5 py-12 md:hidden">
      <div className="flex w-full flex-col gap-16">
        <Block index={0}>{() => <InboxMockup />}</Block>
        <Block index={1}>{(play) => <ChatMockup feature={2} play={play} />}</Block>
        <Block index={2}>{(play) => <ChatMockup feature={3} play={play} />}</Block>
        <Block index={3}>{(play) => <ChatMockup feature={4} play={play} />}</Block>
        <Block index={4}>{() => <CrmMockup />}</Block>
      </div>
    </section>
  );
}
