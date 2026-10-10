import type { Metadata } from "next";
import { FeatureBackground } from "@/components/shared/feature-background";
import { PaymentsHero } from "@/components/pages/payments/hero";
import { PaymentsProblem } from "@/components/pages/payments/problem";
import { PaymentsFeatures } from "@/components/pages/payments/features";
import { PaymentsSetup } from "@/components/pages/payments/setup";
import { PaymentsAi } from "@/components/pages/payments/ai";
import { PaymentsBeforeCta } from "@/components/pages/payments/before-cta";

const TITLE = "Payment Tracking for DM Sales | Mochi";
const DESCRIPTION = "Match every payment back to the lead who made it and the person who closed it, across your payment providers.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, images: [{ url: "/og-image.png", width: 3600, height: 1890 }] },
};

export default function PaymentsPage() {
  return (
    <>
      <FeatureBackground />
      <div aria-hidden className="h-[68px] w-full lg:h-[82px]" />
      <PaymentsHero />
      <PaymentsProblem />
      <PaymentsFeatures />
      <PaymentsSetup />
      <PaymentsAi />
      <PaymentsBeforeCta />
    </>
  );
}
