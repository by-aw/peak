import Image from "next/image";
import type { FeatureCard } from "./features";
import { FormDetectionMockup } from "./form-detection-mockup";
import { SessionStitchingMockup, SESSION_STITCHING_FRAME } from "./session-stitching-mockup";
import { PixelTableMockup } from "./pixel-table-mockup";
import { DomainsMockup, DOMAINS_FRAME } from "./domains-mockup";

const phoneTable = (src: string) => <Image src={src} width={1356} height={1020} alt="" sizes="318px" className="h-auto w-full" />;

/**
 * The four pixel feature cards shared by /attribution/tracking-pixel and /attribution/lead-profiles
 * (Framer reuses the same Features Section on both pages; only the full-width fifth card differs).
 * On phone the two tables are replaced by static screenshots, as on the live site.
 */
export const PIXEL_FEATURE_CARDS: FeatureCard[] = [
  {
    title: "Automatic form detection",
    description:
      "The pixel listens for form submit events on every page it's installed on. When a visitor fills out any form — Typeform, Jotform, Tally, native HTML, or any embedded form — we capture the email automatically.",
    mockup: <FormDetectionMockup />,
    phoneMinHeight: false,
  },
  {
    title: "Session stitching",
    description:
      "When a lead clicks a Mochi tracking link from YouTube or a DM, we drop a cookie. When they land on your page with the pixel installed, we read that cookie and connect the visit to the original click.",
    mockup: <SessionStitchingMockup />,
    frameClassName: SESSION_STITCHING_FRAME,
    phoneMinHeight: false,
  },
  {
    title: "Domain verification",
    description: "After installing the pixel, Mochi shows you exactly which pages have it installed, when the last event was received, and event counts by type.",
    mockup: <PixelTableMockup columns={["Views", "Forms"]} rows={[["847", "187"], ["612", "112"]]} />,
    mobileMockup: phoneTable("/framer/KmW9MftKmxE9VW5zWixYWraTg.png"),
    frameClassName: "px-4 py-6 md:p-6",
    phoneMinHeight: false,
  },
  {
    title: "Scroll depth & time on page",
    description: "The pixel tracks how far visitors scroll (25%, 50%, 75%, 100%) and how long they spend on each page.",
    mockup: <PixelTableMockup columns={["Avg Scroll", "Time"]} rows={[["72%", "14m"], ["84%", "8s"]]} />,
    mobileMockup: phoneTable("/framer/wMa5HoahuCoZNeUz0trIGfYGdY.png"),
    phoneMinHeight: false,
  },
];

/** The full-width fifth card (platform tile grid) with page-specific copy. */
export function domainsCard(title: string, description: string): FeatureCard {
  return { title, description, mockup: <DomainsMockup />, frameClassName: DOMAINS_FRAME, phoneMinHeight: false, descriptionClassName: "lg:max-w-[884px]" };
}
