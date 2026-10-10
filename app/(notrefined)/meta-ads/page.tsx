import type { Metadata } from "next";
import { Reveal } from "@/components/ui/reveal";
import { FeatureFaq, type FaqEntry } from "@/components/shared/feature-faq";
import { MetaAdsHero } from "@/components/pages/meta-ads/hero";
import { MetaAdsFigures } from "@/components/pages/meta-ads/figures";
import { MetaAdsProblem } from "@/components/pages/meta-ads/problem";
import { MetaAdsTriggers } from "@/components/pages/meta-ads/triggers";
import { MetaAdsChange } from "@/components/pages/meta-ads/change";
import { MetaAdsAdvantage, MetaAdsIconsStrip } from "@/components/pages/meta-ads/advantage";
import { MetaAdsSetup } from "@/components/pages/meta-ads/setup";

const TITLE = "Meta Ads Attribution for Instagram DMs | Mochi";
const DESCRIPTION = "Connect click-to-message ads to the Instagram conversations they create and filter ad-driven leads inside your inbox.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, images: [{ url: "/og-image.png", width: 3600, height: 1890 }] },
};

const FAQ: FaqEntry[] = [
  {
    question: "Most of my DMs don't give us their email or phone. Does this still work?",
    answer:
      "Yes. Mochi uses the Instagram-Scoped User ID (IGSID) — Meta's own internal identifier for every IG user. It's available the moment a DM lands in your inbox. Email and phone are nice-to-haves that lift match quality further when the lead progresses, but they're not required to start. Ad-originated leads also carry Meta's fbc click ID for near-perfect attribution to specific campaigns.",
  },
  {
    question: "What about DMs that come from organic posts, not ads?",
    answer:
      "They still get sent to your pixel as Lead and Qualified Lead events. They won't get ad attribution (there's no campaign to attribute to), but they enrich your custom audiences and lookalike seed lists. Meta's algorithm becomes smarter about who to find with your ad budget.",
  },
  {
    question: "Will this mess with my existing pixel data?",
    answer:
      "No. CAPI events run alongside your browser pixel with event_id deduplication, so Meta counts each conversion exactly once. You're not replacing your pixel — you're filling in the 50%+ of conversions it can't see today.",
  },
  {
    question: "How long until my CPL actually drops?",
    answer:
      "With the 90-day backfill, optimization signal lands immediately. Meta's learning phase on a new campaign is typically 7–14 days. Most coaches see meaningful CPL movement inside the first 2–3 weeks once the campaign shift is made. The biggest gains come 4–8 weeks in as the algorithm refines.",
  },
  {
    question: "Is this GDPR and privacy compliant?",
    answer:
      "Yes. All personally identifiable data is SHA-256 hashed before transmission, per Meta's CAPI spec. Mochi never sends raw email, phone, or DM content. For EU traffic, your existing consent management on landing pages continues to govern what data is processed.",
  },
  {
    question: "What's the catch?",
    answer:
      "The 90-day historical backfill is excellent for pixel training and audience building, but Meta only attributes events to ad clicks within a 7-day window. Older backfilled conversions won't retroactively show up in past campaign reports — they make your pixel smarter going forward, not historically. Going forward, every conversion attributes normally.",
  },
];

export default function MetaAdsPage() {
  return (
    <>
      <MetaAdsHero />
      <MetaAdsFigures />
      <MetaAdsProblem />
      <MetaAdsTriggers />
      <MetaAdsChange />
      <MetaAdsAdvantage />
      <MetaAdsIconsStrip />
      <MetaAdsSetup />
      <Reveal y={48} delay={0.2} className="w-full">
        <FeatureFaq items={FAQ} clouds={false} className="pt-0 md:pt-16 lg:pt-20" />
      </Reveal>
    </>
  );
}
