import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getAllUpdates } from "@/lib/updates";

// Only routes that exist locally (live also lists the unconverted /watch, /academy-work-in-progress and /audit
// CMS pages, which would 404). /thank-you is noindex on live and left out, as there. Order follows the live sitemap.
const ROUTES = [
  "/reply-agent",
  "/thank-you-pdf",
  "/vsl",
  "/vsl-2",
  "/calculator",
  "/features/offer",
  "/dm-audit",
  "/learn",
  "/download",
  "/spot-confirmed",
  "/demo",
  "/demo-jia",
  "/updates",
  "/features/priority-inbox",
  "/features/personalization",
  "/features/sales-performance",
  "/features/team-collaboration",
  "/changelog",
  "/partner",
  "/mcp",
  "/agent",
  "/zapier",
  "/attribution",
  "/attribution/dm-links",
  "/attribution/youtube-tracking",
  "/attribution/tracking-pixel",
  "/attribution/lead-profiles",
  "/payments",
  "/meta-ads",
  "/prompt-library",
  "/book-dm-audit",
  "/unconfirmed",
  "/schedule-your-call",
  "/business",
  "/track-to-ig",
  "/legal/data-privacy-policy",
  "/legal/terms-of-service",
];

// Live emits bare <loc> entries (no lastmod/changefreq/priority), blog posts last in collection order.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    { url: `${SITE_URL}/` },
    ...ROUTES.map((route) => ({ url: `${SITE_URL}${route}` })),
    ...(await getAllUpdates()).map(({ slug }) => ({ url: `${SITE_URL}/updates/${slug}` })),
  ];
}
