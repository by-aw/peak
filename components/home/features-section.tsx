import { FeatureSprite } from "./features/sprite";
import { FeaturesCards } from "./features/features-cards";
import { FeaturesMobile } from "./features/features-mobile";

/**
 * Home page "Features Section": the "Turn DMs into revenue" lead timeline, then five product features, each with a
 * phone mockup.
 * - tablet/desktop (>= 810px): one card each over a fixed phone that each card reveals (see features/features-cards.tsx)
 * - phone: the timeline as a stack of step cards over the intro copy, then the feature cards stacked (see
 *   features/features-mobile.tsx)
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
