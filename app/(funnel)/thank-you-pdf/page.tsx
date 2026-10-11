import type { Metadata } from "next";
import { CreatorTicker } from "@/components/funnel/creator-ticker";
import { FeatureBackground } from "@/components/shared/feature-background";
import { BenefitsSection } from "@/components/pages/vsl/benefits";
import { CoachReels } from "@/components/pages/vsl/coach-reels";
import { FlipSection } from "@/components/pages/vsl/flip-section";
import { ThankYouHero } from "@/components/pages/vsl/thank-you-hero";
import { UsersSection } from "@/components/pages/vsl/users-section";

const TITLE = "Thank You - The Mochi App";
const DESCRIPTION =
  "Mochi gives your team one workspace to manage conversations, prioritize buyers, follow up faster, and see what is actually happening in your inbox.";
const PATH = "/thank-you-pdf";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: "website", url: PATH, title: TITLE, description: DESCRIPTION, images: [{ url: "/og-image.png", width: 3600, height: 1890 }] },
};

export default function ThankYouPdfPage() {
  return (
    <>
      <FeatureBackground />
      <ThankYouHero />
      <UsersSection />
      <CreatorTicker size="tall" />
      <FlipSection />
      <CoachReels />
      <BenefitsSection clouds />
    </>
  );
}
