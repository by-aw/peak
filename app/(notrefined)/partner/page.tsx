import type { Metadata } from "next";
import { FeatureBackground } from "@/components/shared/feature-background";
import { PartnerHero } from "@/components/pages/partner/hero";
import { PartnerHowItWorks } from "@/components/pages/partner/how-it-works";
import { PartnerTiers } from "@/components/pages/partner/tiers";
import { PartnerRecommend } from "@/components/pages/partner/recommend";
import { PartnerBecome } from "@/components/pages/partner/become";
import { PartnerFaq } from "@/components/pages/partner/faq";

const TITLE = "Mochi Partner Program | Earn Up to 25% Recurring Commission";
const DESCRIPTION =
  "Refer coaches, creators and teams to Mochi and earn up to 25% recurring commission on qualifying payments. Rates and duration depend on your partner agreement.";
const PATH = "/partner";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: "website", url: PATH, title: TITLE, description: DESCRIPTION, images: [{ url: "/og-image.png", width: 3600, height: 1890 }] },
};

/** /partner (`/affiliate` redirects here). The nav spacer is 82px on desktop, 68px on tablet and phone. */
export default function PartnerPage() {
  return (
    <>
      <FeatureBackground />
      <div aria-hidden className="h-[68px] w-full lg:h-[82px]" />
      <PartnerHero />
      <PartnerHowItWorks />
      <PartnerTiers />
      <PartnerRecommend />
      <PartnerBecome />
      <PartnerFaq />
    </>
  );
}
