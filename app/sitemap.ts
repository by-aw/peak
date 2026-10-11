import type { MetadataRoute } from "next";
import { getAllAcademySlugs } from "@/lib/academy";
import { getAllAuditSlugs } from "@/lib/audit";
import { getAllLegalSlugs } from "@/lib/legal";
import { SITE_URL } from "@/lib/site";
import { getAllUpdates } from "@/lib/updates";
import { getAllWatchSlugs } from "@/lib/watch";

// Static routes. /thank-you is noindex on live and left out, as there. Order follows the live sitemap: static pages
// (with the academy index and the static /watch/welcome-to-mochi among them), then the CMS collections.
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
  "/academy-work-in-progress",
  "/book-dm-audit",
  "/unconfirmed",
  "/schedule-your-call",
  "/watch/welcome-to-mochi",
  "/business",
  "/track-to-ig",
];

// Live emits bare <loc> entries (no lastmod/changefreq/priority). CMS entries follow the static routes in live's
// collection order: academy lessons, audits, legal, watch, then blog posts; each list is whatever is published (read
// through the loaders, so DB or content/). /audit/dummy is a published entry on live and listed there, so it is
// listed here too while it stays published; taking it offline in /admin drops it.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [academy, audit, legal, watch, updates] = await Promise.all([getAllAcademySlugs(), getAllAuditSlugs(), getAllLegalSlugs(), getAllWatchSlugs(), getAllUpdates()]);
  const urls = (prefix: string, slugs: string[]) => slugs.map((slug) => ({ url: `${SITE_URL}${prefix}/${slug}` }));
  return [
    { url: `${SITE_URL}/` },
    ...ROUTES.map((route) => ({ url: `${SITE_URL}${route}` })),
    ...urls("/academy-work-in-progress", academy),
    ...urls("/audit", audit),
    ...urls("/legal", legal),
    ...urls("/watch", watch),
    ...urls("/updates", updates.map((u) => u.slug)),
  ];
}
