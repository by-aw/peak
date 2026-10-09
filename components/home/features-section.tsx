import { FeatureSprite } from "./features/sprite";
import { FeaturesCards } from "./features/features-cards";
import { FeaturesMobile } from "./features/features-mobile";

/**
 * Home page "Features Section": five product features with a phone mockup.
 * - tablet/desktop (>= 810px): one card per feature over a fixed phone that each card reveals (see features/features-cards.tsx)
 * - phone: the five features stacked (see features/features-mobile.tsx)
 */
export function FeaturesSection() {
  return (
    <>
      <FeatureSprite />
      <FeaturesCards />
      <FeaturesMobile />
    </>
  );
}
