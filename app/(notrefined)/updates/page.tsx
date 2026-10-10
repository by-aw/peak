import type { Metadata } from "next";
import { UpdatesHero } from "@/components/pages/updates/hero";
import { PostList } from "@/components/pages/updates/post-list";
import { ScaleCta } from "@/components/pages/updates/scale-cta";
import { getUpdatesByDate } from "@/lib/updates";

const TITLE = "Product Updates & Customer Wins | Mochi";
const DESCRIPTION =
  "Latest Mochi features, real results from 7-figure coaching businesses, and infrastructure insights you won't find anywhere else. No fluff, just wins.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, images: [{ url: "/og/updates.png", width: 1200, height: 630 }] },
};

export default function UpdatesPage() {
  const posts = getUpdatesByDate();
  return (
    <>
      <div aria-hidden className="h-[58px] w-full md:hidden" />
      <UpdatesHero />
      <PostList posts={posts} />
      <ScaleCta />
    </>
  );
}
