import type { Metadata } from "next";
import { FeatureBackground } from "@/components/shared/feature-background";
import { DownloadHero } from "@/components/pages/download/hero";
import { DownloadSection } from "@/components/pages/download/download-section";

const TITLE = "Download Mochi | Mochi";
const DESCRIPTION = "Get Mochi on web, iOS and any mobile browser so your team can work the Instagram inbox from anywhere.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, images: [{ url: "/og-image.png", width: 3600, height: 1890 }] },
};

export default function DownloadPage() {
  return (
    <>
      <FeatureBackground />
      <div aria-hidden className="h-[68px] w-full md:h-[82px]" />
      <DownloadHero />
      <DownloadSection />
    </>
  );
}
