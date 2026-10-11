import type { Metadata } from "next";
import { UpdatesHero } from "@/components/pages/updates/hero";
import { PostList } from "@/components/pages/updates/post-list";
import { ScaleCta } from "@/components/pages/updates/scale-cta";
import { getUpdatesByDate } from "@/lib/updates";
import { PreviewBanner } from "@/components/admin/preview-banner";

const TITLE = "Product Updates & Customer Wins | Mochi";
const DESCRIPTION =
  "Latest Mochi features, real results from 7-figure coaching businesses, and infrastructure insights you won't find anywhere else. No fluff, just wins.";
const PATH = "/updates";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: "website", url: PATH, title: TITLE, description: DESCRIPTION, images: [{ url: "/og/updates.png", width: 1200, height: 630 }] },
};

export default async function UpdatesPage() {
  const posts = await getUpdatesByDate();
  return (
    <>
      <PreviewBanner path="/updates" />
      <div aria-hidden className="h-[58px] w-full md:hidden" />
      <UpdatesHero />
      <PostList posts={posts} />
      <ScaleCta />
    </>
  );
}
