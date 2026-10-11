import type { Metadata } from "next";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { SkyBackground } from "@/components/home/sky-background";
import { HeroSection } from "@/components/pages/track-to-ig/hero";
import { PathSection } from "@/components/pages/track-to-ig/path-section";
import { ComparisonSection } from "@/components/pages/track-to-ig/comparison";
import { LiveSection } from "@/components/pages/track-to-ig/live-section";
import { ViewsSection } from "@/components/pages/track-to-ig/views-section";
import { ClaritySection } from "@/components/pages/track-to-ig/clarity-section";
import { CtaSection } from "@/components/pages/track-to-ig/cta-section";

// The live page has no title or description of its own: it shows the site defaults.
const TITLE = "The Mochi App";
const DESCRIPTION =
  "Mochi gives your team one workspace to manage conversations, prioritize buyers, follow up faster, and see what is actually happening in your inbox.";
const PATH = "/track-to-ig";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: "website", url: PATH, title: TITLE, description: DESCRIPTION, images: [{ url: "/og-image.png", width: 3600, height: 1890 }] },
};

/**
 * Framer /track-to-ig: Instagram-reel attribution landing page. Hero (headline + attributed-journey mockup), "viewer
 * path" interaction, "what you think / the real story" comparison, 5-minute setup timeline, funnel, "Real attribution"
 * table and a closing CTA. On phone the sections are re-ordered (hero, viewer path, comparison, setup, funnel, table).
 * The page closes with its own CTA ("Stop guessing what to post next." / phone: "Get up and running in 5 minutes")
 * instead of the site-wide block, so it sits outside the (notrefined) group and composes nav + footer itself.
 */
export default function TrackToIgPage() {
  return (
    <div className="relative flex min-h-[900px] w-full flex-col items-center overflow-clip bg-white">
      <Nav />
      <main className="relative z-[6] flex w-full flex-col items-center">
        <SkyBackground />
        <div className="relative z-[2] flex w-full flex-col items-center">
          <div aria-hidden className="h-[76px] w-full" />
          <HeroSection />
          <ComparisonSection />
          <LiveSection />
          <PathSection />
          <ViewsSection />
          <ClaritySection />
          <CtaSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
