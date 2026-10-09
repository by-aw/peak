import { buttonShadow } from "@/components/ui/button";
import { descriptionText } from "@/components/ui/text";
import { CTA_HREF, type FeatureCopy } from "./data";

/** Label + heading of one feature. Sizes: phone 16/32, tablet 18/40, desktop 20/48. */
export function FeatureHeader({ feature, className = "" }: { feature: FeatureCopy; className?: string }) {
  return (
    <div className={`flex flex-col gap-5 ${className}`}>
      {feature.label ? (
        <p className="font-sans text-[16px] leading-[22.4px] font-medium tracking-[-0.24px] text-gray-800 md:text-[18px] md:leading-[25.2px] lg:text-[20px] lg:leading-[28px]">
          {feature.label}
        </p>
      ) : null}
      <h3 className="font-display text-[32px] leading-[35.2px] font-semibold tracking-[1px] text-ink md:text-[40px] md:leading-[44px] md:tracking-[1.6px] lg:text-[48px] lg:leading-[52.8px]">
        {feature.heading}
      </h3>
    </div>
  );
}

/**
 * Label + heading + body of one feature ("Content N" in Framer).
 * Sizes: phone 16/32/18, tablet 18/40/18, desktop 20/48/20.
 */
export function FeatureText({ feature }: { feature: FeatureCopy }) {
  return (
    <div className="flex flex-col gap-5">
      <FeatureHeader feature={feature} />
      <p className={`font-sans ${descriptionText}`}>
        {feature.body}
        {feature.accent ? <span className="text-purple-500">{feature.accent}</span> : null}
      </p>
    </div>
  );
}

/**
 * "Start Free Trial" CTA ("Desktop/Big" button, 20px text). Phone: full width.
 */
export function FeatureCta() {
  return (
    <a
      href={CTA_HREF}
      target="_blank"
      rel="noopener"
      className={`inline-flex w-full items-center justify-center rounded-[12px] bg-[linear-gradient(#14151a_0%,#14151a_100%)] px-5 py-3 font-sans text-[20px] leading-[21.75px] font-medium tracking-[-0.3px] text-white transition-[background] duration-200 hover:bg-[linear-gradient(#000_0%,#14151a_100%)] md:w-auto ${buttonShadow}`}
    >
      Start Free Trial
    </a>
  );
}
