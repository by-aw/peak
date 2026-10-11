import type { Metadata } from "next";
import { ThankYouHero } from "@/components/pages/thank-you/hero";
import { ThankYouPath } from "@/components/pages/thank-you/path";
import { VideoSection } from "@/components/pages/thank-you/video-section";
import { ThankYouTrust } from "@/components/pages/thank-you/trust";
import { FAQ_VIDEOS, WALKTHROUGH_VIDEOS } from "@/components/pages/thank-you/videos";

const TITLE = "Mochi Installation Call Booked";
const DESCRIPTION = "mochi: talk soon xoxo";
const PATH = "/thank-you";

/** Live is `noindex` (and not in the sitemap). */
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: false },
  alternates: { canonical: PATH },
  openGraph: { type: "website", url: PATH, title: TITLE, description: DESCRIPTION, images: [{ url: "/og-image.png", width: 3600, height: 1890 }] },
};

export default function ThankYouPage() {
  return (
    <>
      <div aria-hidden className="h-[68px] w-full lg:h-[82px]" />
      <ThankYouHero />
      <ThankYouPath />
      <VideoSection heading="Frequently Asked Questions" headingMaxWidth={762} videos={FAQ_VIDEOS} kind="faq" />
      <VideoSection heading="Watch the videos below to see how we use Mochi" headingMaxWidth={538} videos={WALKTHROUGH_VIDEOS} kind="walkthrough" />
      <ThankYouTrust />
    </>
  );
}
