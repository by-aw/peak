import type { Metadata } from "next";
import { AttributionHero } from "@/components/shared/attribution/hero";
import { DashboardSection } from "@/components/shared/attribution/dashboard";
import { FaqSection } from "@/components/shared/attribution/faq";
import { AttributionCtaSection } from "@/components/shared/attribution/cta-section";
import { DashboardTabs } from "@/components/pages/attribution/dashboard-tabs";
import { MetricsSection } from "@/components/pages/attribution/metrics-section";
import { ProblemSection } from "@/components/pages/attribution/problem-section";
import { FeaturesCardSection } from "@/components/pages/attribution/features-card-section";
import { TrackingSection } from "@/components/pages/attribution/tracking-section";
import { FeaturesSection } from "@/components/pages/attribution/features-section";
import { ComparisonSection } from "@/components/pages/attribution/comparison-section";
import { FAQ } from "@/components/pages/attribution/data";

const TITLE = "Instagram DM Attribution Tracking | Mochi";
const DESCRIPTION = "See which posts, ads and links actually start Instagram conversations, and what happens after your team hits send.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, images: [{ url: "/og-image.png", width: 3600, height: 1890 }] },
};

/** Framer hero "Badge": purple-tinted pill with the gradient NEW tag. */
function HeroBadge() {
  return (
    <div className="relative flex items-center gap-2 rounded-[99px] bg-[#faf5ff] py-1.5 pr-2.5 pl-2 shadow-[0_1px_3px_0_rgba(133,0,122,0.08),0_5px_5px_0_rgba(133,0,122,0.07),0_11px_6px_0_rgba(133,0,122,0.04),0_19px_8px_0_rgba(133,0,122,0.01)] after:pointer-events-none after:absolute after:inset-0 after:rounded-[99px] after:border after:border-[#e9d5ff]">
      <span className="flex items-center rounded-[88px] bg-[linear-gradient(105deg,#db89ff_0%,#d471ff_100%)] px-2 py-1">
        <span className="text-center text-[12px] leading-[14.4px] font-medium tracking-[-0.12px] whitespace-pre text-white">NEW</span>
      </span>
      <span className="text-center text-[14px] leading-[16.8px] font-medium whitespace-pre text-[#a855f7]">Full-lifecycle attribution</span>
    </div>
  );
}

export default function AttributionPage() {
  return (
    <>
      <AttributionHero
        badge={<HeroBadge />}
        title="Your team hits send. Then what?"
        description="Did the lead click the link? Did they watch the training? Did they actually buy? Right now you don't know. With Mochi, you see every step from first DM to final purchase."
        primary={{ label: "Start Free Trial", href: "https://use.themochi.app/login?landing_page=attribution" }}
        secondary={{ label: "Book a Call", href: "/demo" }}
        contentWidth={688}
        titleWidth={678}
        descriptionWidth={576}
        descriptionWidthTablet={576}
      />
      <DashboardSection paddingClassName="px-5 py-12 md:px-12 lg:px-[100px]">
        <DashboardTabs />
      </DashboardSection>
      <MetricsSection />
      <ProblemSection />
      <FeaturesCardSection />
      <TrackingSection />
      <FeaturesSection />
      <ComparisonSection />
      <FaqSection heading="You're probably wondering." headingWidth={402} headingAlign="center" items={FAQ} />
      <AttributionCtaSection
        heading={
          <>
            From first DM
            <br />
            to final purchase.
          </>
        }
        description="Book a 15-minute demo. We'll show you exactly what happens after your setters hit send — and what you're leaving on the table."
        descriptionWidth={432}
        button={{ label: "Book a Demo", href: "https://themochi.app/demo" }}
        note="No commitment. We'll pull your data live on the call."
      />
    </>
  );
}
