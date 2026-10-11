import type { Metadata } from "next";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { CtaSection } from "@/components/layout/cta-section";
import { SkyBackground } from "@/components/home/sky-background";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
import { RevenueSection } from "@/components/home/revenue-section";
import { ComparisonSection } from "@/components/home/comparison-section";
import { TestimonialSection } from "@/components/home/testimonial-section";
import { PricingSection } from "@/components/home/pricing-section";
import { FaqSection } from "@/components/home/faq-section";

const TITLE = "Mochi | One Workspace for Instagram DM Sales";
const DESCRIPTION =
  "Mochi gives your team one workspace to manage Instagram conversations, prioritize buyers, follow up faster and see what is actually happening in your inbox.";
const PATH = "/";

// Only applies to `/`: not-found.tsx renders <HomePage /> but keeps the root layout's metadata.
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: "website", url: PATH, title: TITLE, description: DESCRIPTION, images: [{ url: "/og-image.png", width: 3600, height: 1890 }] },
};

export default function HomePage() {
  return (
    <div className="relative flex min-h-[900px] w-full flex-col items-center overflow-clip bg-white">
      <Nav />
      <SkyBackground />
      <main className="relative z-[6] flex w-full flex-col items-center">
        <div aria-hidden className="h-[76px] w-full" />
        <HeroSection />
        <FeaturesSection />
        <RevenueSection />
        <ComparisonSection />
        <TestimonialSection />
        <PricingSection />
        <FaqSection />
      </main>
      <CtaSection />
      <Footer />
    </div>
  );
}
