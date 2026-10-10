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
import { PIXEL_FEATURE_CARDS, domainsCard } from "@/components/shared/attribution/pixel-feature-cards";
import { FAQ, LABELS, SUMMARY } from "@/components/pages/attribution-tracking-pixel/data";

const title = "Website Tracking Pixel for DM Attribution | Mochi";
const description = "Paste one script on your site and connect website visits to the Instagram conversations they turn into.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: [{ url: "/og-image.png", width: 3600, height: 1890 }] },
};

const CARDS = [
  ...PIXEL_FEATURE_CARDS,
  domainsCard(
    "One snippet, every page",
    "Install the same snippet across every domain and funnel you own — VSL page, application form, checkout confirmation. Each domain reports separately in the dashboard, with no per-page configuration.",
  ),
];

export default function TrackingPixelPage() {
  return (
    <>
      <AttributionHero
        title="Paste one script. Track everything."
        description="The Mochi pixel tracks page views, form submissions, and scroll depth on any page you own. No integrations with Typeform, Calendly, or Stripe needed. It just works."
        descriptionWidth={468}
        primary={{ label: "Start Free Trial", href: "https://use.themochi.app/login?landing_page=tracking-pixel" }}
        secondary={{ label: "Book a Call", href: "/demo" }}
      />
      <DashboardSection>
        <DashboardPreview src="/framer/HekIPd3HyQBhwj1MX5VXch4w.png" width={2682} height={1695} preload />
      </DashboardSection>
      <LabelSection items={LABELS} />
      <FeaturesSection
        heading="One line of code replaces your entire tracking stack."
        description="No Zapier. No webhook configurations. No per-tool integrations. The pixel watches the page and captures what happens."
        headingWidth={586}
        descriptionWidth={552}
        cards={CARDS}
        rowBorders={[true, false, true]}
      />
      <SummarySection text={SUMMARY} />
      <FaqSection heading="Frequently asked questions" items={FAQ} />
      <AttributionCtaSection
        heading="Paste one script. See the full picture."
        headingClassName="max-w-[240px] md:max-w-[312px] lg:max-w-[509px]"
        description="Track every page view, form submission, and conversion without integrating anything."
        descriptionWidth={344}
        button={{ label: "Book a Demo", href: "/demo" }}
        note="No commitment. We'll pull your data live on the call."
      />
    </>
  );
}
