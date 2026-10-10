import type { Metadata } from "next";
import { AttributionHero } from "@/components/shared/attribution/hero";
import { DashboardPreview, DashboardSection } from "@/components/shared/attribution/dashboard";
import { LabelSection } from "@/components/shared/attribution/label";
import { FeaturesSection, type FeatureCard } from "@/components/shared/attribution/features";
import { SummarySection } from "@/components/shared/attribution/summary";
import { FaqSection } from "@/components/shared/attribution/faq";
import { AttributionCtaSection } from "@/components/shared/attribution/cta-section";
import { LeaderboardMockup } from "@/components/shared/attribution/leaderboard-mockup";
import { ClickToCallMockup } from "@/components/pages/attribution-dm-links/click-to-call-mockup";
import { OgPreviewMockup } from "@/components/pages/attribution-dm-links/og-preview-mockup";
import { GeoDevicesMockup } from "@/components/pages/attribution-dm-links/geo-devices-mockup";
import { FAQ, LABELS, SUMMARY } from "@/components/pages/attribution-dm-links/data";

const TITLE = "Trackable DM Links for Instagram | Mochi";
const DESCRIPTION =
  "Track the links your team sends in Instagram DMs. See who clicked, who booked and who bought, instead of only knowing the link was sent.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, images: [{ url: "/og-image.png", width: 3600, height: 1890 }] },
};

const CARDS: FeatureCard[] = [
  {
    title: "Setter leaderboard",
    description:
      "See which setters have the highest click rates, the fastest response times, and the most revenue attributed to their links. Coach your team with real data, not gut feeling.",
    mockup: <LeaderboardMockup />,
    frameClassName: "min-h-[360px]! md:min-h-[397px]!",
  },
  {
    title: "Click-to-call tracking",
    description:
      "When a setter sends a Calendly link, you see exactly when the lead clicked it, whether they booked a call, and if that call converted. The entire journey from DM to cash collected, in one timeline.",
    mockup: <ClickToCallMockup />,
    reveal: true,
  },
  {
    title: "Custom OG previews",
    description:
      "When setters share Calendly links in Instagram DMs, the link preview is blank or broken. Mochi links have custom titles, descriptions, and images — so they look professional and get more clicks.",
    mockup: <OgPreviewMockup />,
    frameClassName: "h-[397px] pt-6 pb-40 px-4 md:px-6",
    reveal: true,
  },
  {
    title: "Geography & devices",
    description:
      "See where your leads are clicking from and on what device. A lead clicking from Mobile in the US at 3pm is different from Desktop in India at 2am. Target your content and setters accordingly.",
    mockup: <GeoDevicesMockup />,
  },
];

export default function DmLinksPage() {
  return (
    <>
      <AttributionHero
        title="Your team sends hundreds of links. Do you know which ones close?"
        description="Track every link sent in Instagram DMs. See who clicked, how fast they clicked, and whether they booked a call or paid."
        primary={{ label: "Start Free Trial", href: "https://use.themochi.app/login?landing_page=dm-links" }}
        secondary={{ label: "Book a Call", href: "/demo" }}
      />
      <DashboardSection>
        <DashboardPreview src="/framer/kaaKFvcNYj8KMVGKu4BxaVLneI.png" width={2682} height={1695} preload />
      </DashboardSection>
      <LabelSection items={LABELS} />
      <FeaturesSection
        heading="See what happens after the link is sent."
        description="Most CRMs track conversations. Mochi tracks what happens after the conversation — the moment that actually determines whether you get paid."
        cards={CARDS}
      />
      <SummarySection text={SUMMARY} />
      <FaqSection heading="Frequently asked questions" items={FAQ} />
      <AttributionCtaSection
        heading="Know which links turn into calls."
        description="Track every DM link your team sends. Know which ones close."
        button={{ label: "Book a Demo", href: "https://themochi.app/demo" }}
        note="No commitment. We'll pull your data live on the call."
      />
    </>
  );
}
