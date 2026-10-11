import { FeatureFaq } from "@/components/shared/feature-faq";
import { Clouds } from "@/components/pages/vsl/clouds";
import { VSL_FAQ } from "@/components/pages/vsl/data";

/**
 * Framer "FAQ Section" of /vsl and /vsl-2: the feature-page FAQ (same Framer FAQ item component, `FeatureFaq`, with its
 * bottom cloud band) plus the extra cloud band ("Linear - Top", the strip rotated 180deg) these pages add at the top.
 */
export function VslFaq() {
  return (
    <div className="relative w-full">
      <Clouds position="top" />
      <FeatureFaq items={VSL_FAQ} />
    </div>
  );
}
