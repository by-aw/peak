import type { Metadata } from "next";
import { OfferHero } from "@/components/pages/offer/hero";
import { OfferCards } from "@/components/pages/offer/cards";

// Live keeps the title of the page it was cloned from ("Mochi vs ManyChat"), which does not match the content.
const TITLE = "Mochi vs ManyChat - Infrastructure for Info Businesses";
const DESCRIPTION =
  "Mochi gives your team one workspace to manage conversations, prioritize buyers, follow up faster, and see what is actually happening in your inbox.";
const PATH = "/features/offer";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: "website", url: PATH, title: TITLE, description: DESCRIPTION, images: [{ url: "/og-image.png", width: 3600, height: 1890 }] },
};

export default function OfferPage() {
  return (
    <div className="flex w-full flex-col items-center overflow-clip pt-[58px]">
      <OfferHero />
      <OfferCards />
    </div>
  );
}
