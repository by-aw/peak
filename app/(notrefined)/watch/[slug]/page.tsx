import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WatchHero } from "@/components/pages/watch/watch-hero";
import { getAllWatchSlugs, getWatchEntry, watchMetaTitle } from "@/lib/watch";
import { PreviewBanner } from "@/components/admin/preview-banner";

type Props = { params: Promise<{ slug: string }> };

// Entries published after the build render on first request; unknown slugs 404 via notFound().
export const dynamicParams = true;

/** Every entry shares the template's description and share image on live. */
const DESCRIPTION = "Watch the selected video on our site.";
const OG_IMAGE = "/framer/Jsk23XVU85vp3CsElYuAEpGnsE.png";

export async function generateStaticParams() {
  return (await getAllWatchSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getWatchEntry(slug);
  if (!entry) return {};
  const title = watchMetaTitle(entry);
  const path = `/watch/${slug}`;
  return {
    title,
    description: DESCRIPTION,
    alternates: { canonical: path },
    openGraph: { type: "website", url: path, title, description: DESCRIPTION, images: [{ url: OG_IMAGE }] },
    twitter: { card: "summary_large_image", title, description: DESCRIPTION, images: [OG_IMAGE] },
  };
}

/** /watch/<slug>: one lesson video from the Framer "WistiaLessons" collection (linked from the email sequences; no index page). */
export default async function WatchPage({ params }: Props) {
  const { slug } = await params;
  const entry = await getWatchEntry(slug);
  if (!entry) notFound();
  return (
    <>
      <PreviewBanner path={`/watch/${slug}`} />
      <WatchHero title={entry.title} videoUrl={entry.videoUrl} />
    </>
  );
}
