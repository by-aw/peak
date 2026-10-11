import type { Metadata } from "next";
import { CreatorTicker, CREATOR_TICKER_LABEL_LEARN } from "@/components/funnel/creator-ticker";
import { LearnHero } from "@/components/pages/learn/hero";
import { LearnStickyCta } from "@/components/pages/learn/sticky-cta";
import { Installation } from "@/components/pages/learn/installation";
import { Audience } from "@/components/pages/learn/audience";
import { Path } from "@/components/pages/learn/path";

const TITLE = "Free Instagram DM Audit | Mochi";
const DESCRIPTION = "Book a free audit of your Instagram DM process and see where conversations are stalling before they become booked calls.";
const PATH = "/learn";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: "website", url: PATH, title: TITLE, description: DESCRIPTION, images: [{ url: "/og-image.png", width: 3600, height: 1890 }] },
};

/**
 * /learn: the DM-audit funnel page. Site nav, "Get up and running" block and footer come from the group layout; the
 * purple "Book Your DM Audit" button is fixed to the bottom of the screen (Framer "Primary Button + Label").
 * The live SSR also holds a "27 founders booked a call this week" label that is not part of the hydrated page, so it is not rendered.
 */
export default function LearnPage() {
  return (
    <>
      <div aria-hidden className="h-[68px] w-full lg:h-[82px]" />
      <LearnStickyCta />
      <LearnHero />
      <CreatorTicker size="tall" label={CREATOR_TICKER_LABEL_LEARN} />
      <Installation />
      <Audience />
      <Path />
    </>
  );
}
