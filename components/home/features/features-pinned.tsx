"use client";

import Image from "next/image";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { FEATURES } from "./data";
import { FeatureCta, FeatureText } from "./feature-copy";
import { PhoneFrame } from "./frame";
import { InboxMockup } from "./inbox-mockup";
import { ChatMockup } from "./chat-mockup";
import { CrmMockup } from "./crm-mockup";

/**
 * Tablet/desktop variant of the Features Section (Framer "Features Section").
 * The section is 450vh tall; a 100vh container is sticky at the top while five 70vh "trigger"
 * zones scroll underneath. Feature N+1 becomes active once trigger N's top passes the middle of
 * the viewport, i.e. at 50vh + (N-1)*70vh of scrolled distance; nothing fades, the copy, mascot
 * and mockup swap instantly and the active dot slides over (measured on the live site).
 */
function featureIndex(progress: number) {
  const rel = progress * 350; // vh scrolled inside the section (450vh - 100vh)
  if (rel < 50) return 0;
  return Math.min(4, 1 + Math.floor((rel - 50) / 70));
}

export function FeaturesPinned() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [idx, setIdx] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setIdx(featureIndex(v)));
  useEffect(() => {
    // pick the right feature when the page loads already scrolled into the section
    const id = requestAnimationFrame(() => setIdx(featureIndex(scrollYProgress.get())));
    return () => cancelAnimationFrame(id);
  }, [scrollYProgress]);

  const feature = FEATURES[idx];

  return (
    <section ref={ref} className="relative hidden h-[450vh] w-full flex-col items-center md:flex">
      <div className="sticky top-0 z-[1] flex h-screen w-full items-center justify-center px-8 pb-16 lg:px-[100px] lg:pb-20">
        <div className="relative flex h-full w-full max-w-[1100px] items-center justify-start gap-8 lg:justify-between lg:gap-0">
          {/* copy */}
          <div className="flex min-w-0 max-w-[396px] flex-1 flex-col items-start gap-12 lg:max-w-[528px]">
            <div className="w-full overflow-clip">
              <FeatureText feature={feature} />
            </div>
            <FeatureCta />
          </div>
          {/* mascot */}
          <div className="absolute bottom-0 left-0 z-[1]">
            <Image
              key={feature.mascot.src}
              src={feature.mascot.src}
              alt=""
              width={feature.mascot.width}
              height={feature.mascot.height}
              style={{ width: feature.mascot.width, height: feature.mascot.height }}
              className="object-cover"
            />
          </div>
          {/* mockup */}
          <div className="shrink-0">
            <PhoneFrame fade={idx === 4}>
              {idx === 0 ? <InboxMockup key="inbox" /> : null}
              {idx === 1 ? <ChatMockup key="chat2" feature={2} play /> : null}
              {idx === 2 ? <ChatMockup key="chat3" feature={3} play /> : null}
              {idx === 3 ? <ChatMockup key="chat4" feature={4} play /> : null}
              {idx === 4 ? <CrmMockup key="crm" /> : null}
            </PhoneFrame>
          </div>
          {/* dots */}
          <div className="absolute top-[calc(100%+40px)] left-1/2 z-[1] flex -translate-x-1/2 items-center gap-2">
            {FEATURES.map((f, i) => (
              <span key={f.label} className={`size-2 rounded-full bg-black ${i === idx ? "opacity-0" : "opacity-25"}`} />
            ))}
            <motion.span
              className="absolute top-0 left-0 size-2 rounded-full bg-purple-500"
              animate={{ x: idx * 16 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
