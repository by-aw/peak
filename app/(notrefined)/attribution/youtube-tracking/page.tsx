import type { Metadata } from "next";
import {
  AttributionCtaSection,
  AttributionHero,
  DashboardPreview,
  DashboardSection,
  FaqSection,
  FeaturesSection,
  LabelSection,
  SummarySection,
} from "@/components/shared/attribution";
import { faq, features, labels, summary } from "@/components/pages/attribution-youtube-tracking/data";

const title = "YouTube to Instagram DM Tracking | Mochi";
const description = "Connect YouTube viewers to the Instagram conversations they start, so you can see which videos create real pipeline.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: [{ url: "/og-image.png", width: 3600, height: 1890 }] },
};

export default function YoutubeTrackingPage() {
  return (
    <>
      <AttributionHero
        title="Stop guessing which videos make you money."
        description="Connect your YouTube channel. We replace every link in your descriptions with tracked links and show you clicks, leads, and revenue per video. Set it and forget it."
        descriptionWidth={468}
        primary={{ label: "Start Free Trial", href: "https://use.themochi.app/login?landing_page=youtube-tracking" }}
        secondary={{ label: "Book a Call", href: "/demo" }}
      />
      <DashboardSection>
        <DashboardPreview src="/framer/NB6vyU6NOc1atPDOpxg7gftMfgQ.png" width={2682} height={1695} preload />
      </DashboardSection>
      <LabelSection items={labels} />
      <FeaturesSection
        heading="The number YouTube doesn't show you."
        description="YouTube shows views. We show revenue. That changes everything about how you make content."
        headingWidth={490}
        descriptionWidth={504}
        cards={features}
      />
      <SummarySection text={summary} />
      <FaqSection heading="Frequently asked questions" items={faq} />
      <AttributionCtaSection
        heading="See which videos actually make you money."
        headingClassName="md:max-w-[452px] lg:max-w-[509px]"
        description="Connect your YouTube channel in 3 minutes. Revenue attribution from day one."
        descriptionWidth={320}
        button={{ label: "Book a Demo", href: "/demo" }}
        note="No commitment. We'll pull your data live on the call."
      />
    </>
  );
}
