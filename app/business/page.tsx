import type { Metadata } from "next";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { CtaSection } from "@/components/layout/cta-section";
import { SkyBackground } from "@/components/home/sky-background";
import { FeatureSprite } from "@/components/home/features/sprite";
import { PricingSection } from "@/components/home/pricing-section";
import { FaqSection } from "@/components/home/faq-section";
import { BusinessHero } from "@/components/pages/business/hero";
import { BusinessFeatures } from "@/components/pages/business/features";
import { BusinessRevenue } from "@/components/pages/business/revenue";
import { BusinessComparison } from "@/components/pages/business/comparison";
import { BusinessTestimonials } from "@/components/pages/business/testimonials";

// Live reuses the home page's title, description and og:image.
const TITLE = "Mochi | One Workspace for Instagram DM Sales";
const DESCRIPTION =
  "Mochi gives your team one workspace to manage Instagram conversations, prioritize buyers, follow up faster and see what is actually happening in your inbox.";
const PATH = "/business";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: "website", url: PATH, title: TITLE, description: DESCRIPTION, images: [{ url: "/og-image.png", width: 3600, height: 1890 }] },
};

/**
 * /business: the home page aimed at local service businesses. Same shell (sky, nav, CTA block, footer) and the same
 * Framer sections as `/`; the hero, the features intro, the phone revenue copy, the comparison lists and the
 * testimonial heading carry business copy, pricing and FAQ are the home ones.
 */
export default function BusinessPage() {
  return (
    <div className="relative flex min-h-[900px] w-full flex-col items-center overflow-clip bg-white">
      <Nav />
      <SkyBackground />
      <main className="relative z-[6] flex w-full flex-col items-center">
        <div aria-hidden className="h-[76px] w-full" />
        <BusinessHero />
        <FeatureSprite />
        <BusinessFeatures />
        <BusinessRevenue />
        <BusinessComparison />
        <BusinessTestimonials />
        <PricingSection />
        <FaqSection />
      </main>
      <CtaSection />
      <Footer />
    </div>
  );
}
