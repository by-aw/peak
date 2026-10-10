import type { Metadata } from "next";
import { FeatureBackground } from "@/components/shared/feature-background";
import { CreatorCarousel } from "@/components/shared/creator-carousel";
import { ZapierHero } from "@/components/pages/zapier/hero";
import { ZapierDemo } from "@/components/pages/zapier/demo";
import { ZapierWhy } from "@/components/pages/zapier/why";
import { ZapierHow } from "@/components/pages/zapier/how";
import { ZapierTriggers } from "@/components/pages/zapier/triggers";
import { ZapierUseCase } from "@/components/pages/zapier/use-case";
import { ZapierSync } from "@/components/pages/zapier/sync";
import { ZapierApps } from "@/components/pages/zapier/apps";

const TITLE = "Zapier Integration | Mochi";
const DESCRIPTION = "Connect Mochi to thousands of tools with Zapier and send Instagram DM events into the systems your business already runs on.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, images: [{ url: "/og/zapier.png", width: 2400, height: 1260 }] },
};

export default function ZapierPage() {
  return (
    <>
      <FeatureBackground />
      <div aria-hidden className="h-[68px] w-full lg:h-[82px]" />
      <ZapierHero />
      <ZapierDemo />
      <ZapierWhy />
      <ZapierHow />
      <ZapierTriggers />
      <ZapierUseCase />
      <ZapierSync />
      <CreatorCarousel ringClassName="h-[200px] md:h-[256px] lg:h-[356px]" gapClassName="gap-2 md:gap-12 lg:gap-16" />
      <ZapierApps />
    </>
  );
}
