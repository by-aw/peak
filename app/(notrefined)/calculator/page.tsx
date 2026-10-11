import type { Metadata } from "next";
import { CalculatorHero } from "@/components/pages/calculator/hero";
import { CalculatorSection } from "@/components/pages/calculator/section";

const TITLE = "Revenue Calculator | Mochi";
const DESCRIPTION = "See how much revenue you're leaving in your DMs.";
const PATH = "/calculator";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: "website", url: PATH, title: TITLE, description: DESCRIPTION, images: [{ url: "/og/calculator.png", width: 1200, height: 630 }] },
};

export default function CalculatorPage() {
  return (
    <>
      <CalculatorHero />
      <CalculatorSection />
    </>
  );
}
