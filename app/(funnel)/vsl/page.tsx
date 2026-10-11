import type { Metadata } from "next";
import { CreatorTicker } from "@/components/funnel/creator-ticker";
import { FeatureBackground } from "@/components/shared/feature-background";
import { BenefitsSection } from "@/components/pages/vsl/benefits";
import { VSL_HEADLINE, VSL_PHONE_LINES } from "@/components/pages/vsl/data";
import { VslFaq } from "@/components/pages/vsl/faq";
import { FlipSection } from "@/components/pages/vsl/flip-section";
import { VslHero } from "@/components/pages/vsl/hero";

const TITLE = "VSL - The Mochi App";
const DESCRIPTION =
  "Mochi gives your team one workspace to manage conversations, prioritize buyers, follow up faster, and see what is actually happening in your inbox.";
const PATH = "/vsl";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: "website", url: PATH, title: TITLE, description: DESCRIPTION, images: [{ url: "/og-image.png", width: 3600, height: 1890 }] },
};

export default function VslPage() {
  return (
    <>
      <FeatureBackground />
      <VslHero headline={VSL_HEADLINE} phoneLines={VSL_PHONE_LINES} mediaId="swpdifenxb" />
      <CreatorTicker />
      <FlipSection />
      <BenefitsSection />
      <VslFaq />
    </>
  );
}
