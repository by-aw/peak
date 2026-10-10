import { RollingButton } from "@/components/shared/rolling-button";
import { REPLY_AGENT_CTA } from "./hero";

/** Framer "Mid CTA": a full-width "Start Free Trial" block button between the Features and Operations sections (144px tall). */
export function MidCta() {
  return (
    <div className="flex w-full max-w-[1200px] flex-col items-center gap-3 px-5 pt-6 pb-[72px]">
      <RollingButton href={REPLY_AGENT_CTA} size="lg" className="w-full">
        Start Free Trial
      </RollingButton>
    </div>
  );
}
