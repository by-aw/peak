import { FeatureSprite } from "./features/sprite";
import { FeaturesPinned } from "./features/features-pinned";
import { FeaturesMobile } from "./features/features-mobile";

/**
 * Home page "Features Section": five product features with a phone mockup.
 * - tablet/desktop (>= 810px): scroll-pinned showcase, 450vh tall (see features/features-pinned.tsx)
 * - phone: the five features stacked (see features/features-mobile.tsx)
 */
export function FeaturesSection() {
  return (
    <>
      <FeatureSprite />
      <FeaturesPinned />
      <FeaturesMobile />
    </>
  );
}
