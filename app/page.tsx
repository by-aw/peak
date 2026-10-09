import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { CtaSection } from "@/components/layout/cta-section";
import { SkyBackground } from "@/components/home/sky-background";
import { HeroSection } from "@/components/home/hero-section";
import { RevenueTimelineSection } from "@/components/home/revenue-timeline-section";
import { FeaturesSection } from "@/components/home/features-section";
import { RevenueSection } from "@/components/home/revenue-section";
import { ComparisonSection } from "@/components/home/comparison-section";
import { TestimonialSection } from "@/components/home/testimonial-section";
import { PricingSection } from "@/components/home/pricing-section";
import { FaqSection } from "@/components/home/faq-section";

export default function HomePage() {
  return (
    <div className="relative flex min-h-[900px] w-full flex-col items-center overflow-clip bg-white">
      <Nav />
      <SkyBackground />
      <main className="relative z-[6] flex w-full flex-col items-center">
        <div aria-hidden className="h-[76px] w-full" />
        <HeroSection />
        <RevenueTimelineSection />
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
