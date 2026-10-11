import type { Metadata } from "next";
import { CreatorTicker } from "@/components/funnel/creator-ticker";
import { FeatureBackground } from "@/components/shared/feature-background";
import { BenefitsSection } from "@/components/pages/vsl/benefits";
import { VSL2_HEADLINE, VSL_PHONE_LINES } from "@/components/pages/vsl/data";
import { VslFaq } from "@/components/pages/vsl/faq";
import { FlipSection } from "@/components/pages/vsl/flip-section";
import { VslHero } from "@/components/pages/vsl/hero";

const TITLE = "VSL - The Mochi App";
const DESCRIPTION =
  "Mochi gives your team one workspace to manage conversations, prioritize buyers, follow up faster, and see what is actually happening in your inbox.";
const PATH = "/vsl-2";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: "website", url: PATH, title: TITLE, description: DESCRIPTION, images: [{ url: "/og/vsl-2.png", width: 2400, height: 1260 }] },
};

/** Same page as /vsl with another headline and video. Live kept the /vsl headline on phone, so it is kept here too. */
export default function Vsl2Page() {
  return (
    <>
      <FeatureBackground />
      <VslHero headline={VSL2_HEADLINE} phoneLines={VSL_PHONE_LINES} mediaId="s32w2px6f3" />
      <CreatorTicker desktopPaddingBottom={80} />
      <FlipSection />
      <BenefitsSection />
      <VslFaq />
    </>
  );
}
