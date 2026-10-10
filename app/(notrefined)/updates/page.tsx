import type { Metadata } from "next";
import { UpdatesHero } from "@/components/pages/updates/hero";
import { PostList } from "@/components/pages/updates/post-list";
import { ScaleCta } from "@/components/pages/updates/scale-cta";
import { getUpdatesByDate } from "@/lib/updates";

const TITLE = "Blog - Mochi";
const DESCRIPTION = "Product updates, how-to guides and company news from Mochi.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, images: [{ url: "/og-image.png", width: 3600, height: 1890 }] },
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
