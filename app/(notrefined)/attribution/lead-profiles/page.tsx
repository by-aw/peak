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
import { FAQ, LABELS, SUMMARY } from "@/components/pages/attribution-lead-profiles/data";

const title = "Instagram Lead Profiles | Mochi";
const description = "Every lead in one profile: what they asked, where they came from, what your team sent and where the conversation stands.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: [{ url: "/og-image.png", width: 3600, height: 1890 }] },
};

const CARDS = [
  ...PIXEL_FEATURE_CARDS,
  domainsCard(
    "One profile, every source",
    "A YouTube click, a page visit and a DM all land on the same profile, whether the lead arrived from your main channel, a podcast or a cold outreach message. Anonymous activity attaches retroactively the moment they identify themselves.",
  ),
];

export default function LeadProfilesPage() {
  return (
    <>
      <AttributionHero
        title="See every lead as a complete story."
        titleWidth={610}
        description="Go beyond conversations. Every lead gets a living profile that combines their YouTube views, website visits, DM history, call outcomes, and AI-scored buying intent into one intelligence view."
        descriptionWidth={460}
        primary={{ label: "Start Free Trial", href: "https://use.themochi.app/login?landing_page=lead-profiles" }}
        secondary={{ label: "Book a Call", href: "/demo" }}
      />
      <DashboardSection>
        <DashboardPreview src="/framer/iiP8mS4quODwh6KSd1E1Djj2c.png" width={2682} height={1695} preload />
      </DashboardSection>
      <LabelSection items={LABELS} />
      <FeaturesSection
        heading="Every lead is a person, not a row in a spreadsheet."
        description="Most CRMs show you a name and a status. Mochi shows you the entire story of how someone discovered you, engaged with your content, talked to your team, and decided to buy."
        headingWidth={586}
        descriptionWidth={552}
        cards={CARDS}
        rowBorders={[true, false, true]}
      />
      <SummarySection text={SUMMARY} />
      <FaqSection heading="Frequently asked questions" items={FAQ} />
      <AttributionCtaSection
        heading="See your leads as complete stories."
        headingClassName="max-w-[240px] md:max-w-[312px] lg:max-w-[509px]"
        description="Full journey tracking, AI scoring, and pre-call briefs for every lead in your pipeline."
        descriptionWidth={344}
        button={{ label: "Book a Demo", href: "/demo" }}
      />
    </>
  );
}
