import { Button } from "@/components/ui/button";
import { descriptionText } from "@/components/ui/text";
import { CTA_HREF, type FeatureCopy } from "./data";

/**
 * Label + heading of one feature. Sizes: phone 16/36, tablet 18/40, desktop 20/48.
 * `card`: the heading sits inside a phone feature card, so it drops to 32 on phone.
 */
export function FeatureHeader({
  feature,
  card = false,
  className = "",
}: {
  feature: FeatureCopy;
  card?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-5 ${className}`}>
      {feature.label ? (
        <p className="font-sans text-[16px] leading-[22.4px] font-medium tracking-[-0.24px] text-gray-800 md:text-[18px] md:leading-[25.2px] lg:text-[20px] lg:leading-[28px]">
          {feature.label}
        </p>
      ) : null}
      <h3
        className={`text-balance font-display font-semibold text-ink lg:text-[48px] lg:leading-[52.8px] ${
          card
            ? "text-[32px] leading-[35.2px] tracking-[1px] md:text-[40px] md:leading-[44px] md:tracking-[1.6px]"
            : "text-[36px] leading-[39.6px] tracking-[1.4px] md:text-[40px] md:leading-[44px] md:tracking-[1.6px]"
        }`}
      >
        {feature.heading}
      </h3>
    </div>
  );
}

/**
 * Label + heading + body of one feature ("Content N" in Framer).
 * Sizes: phone 16/36/20, tablet 18/40/20, desktop 20/48/20.
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
 * "Start Free Trial" CTA ("Desktop/Big" button), sized to its label.
 */
export function FeatureCta() {
  return (
    <Button variant="primaryBig" href={CTA_HREF} target="_blank" rel="noopener" className="font-sans">
      Start Free Trial
    </Button>
  );
}
