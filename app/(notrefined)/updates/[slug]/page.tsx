import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { UpdatesClouds } from "@/components/pages/updates/clouds";
import { OtherUpdates } from "@/components/pages/updates/other-updates";
import { PostBody } from "@/components/pages/updates/post-body";
import { PostHeader } from "@/components/pages/updates/post-header";
import { ScaleCta } from "@/components/pages/updates/scale-cta";
import { getAllUpdates, getUpdate } from "@/lib/updates";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllUpdates().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getUpdate(slug);
  if (!post) return {};
  const image = post.ogImage ?? post.cover?.src ?? "/og-image.png";
  return {
    title: post.metaTitle,
    description: post.description,
    openGraph: { title: post.metaTitle, description: post.description, images: [{ url: image }] },
  };
}

export default async function UpdatePage({ params }: Props) {
  const { slug } = await params;
  const post = getUpdate(slug);
  if (!post) notFound();
  const others = getAllUpdates().filter((p) => p.slug !== slug);
  return (
    <>
      <div className="relative flex w-full flex-col items-center pt-[58px]">
        <UpdatesClouds />
        <div className="relative z-[1] flex w-full flex-col items-center gap-20 px-4 py-[72px] md:px-8 md:pt-[133px] md:pb-[180px]">
          <article className="flex w-full max-w-[720px] flex-col gap-12">
            <PostHeader post={post} />
            {/* The cover frame takes the image's own aspect ratio (1920x1080 for most posts, 1576x1138 / 1280x713 for some);
                a post without a cover keeps the empty 16:9 frame, as on the live site. */}
            <div
              className="relative w-full overflow-hidden rounded-[12px]"
              style={{ aspectRatio: post.cover?.width && post.cover.height ? `${post.cover.width} / ${post.cover.height}` : "16 / 9" }}
            >
              {post.cover && <Image src={post.cover.src} alt={post.cover.alt} fill preload sizes="(min-width: 810px) 720px, calc(100vw - 32px)" className="rounded-[12px] object-cover" />}
            </div>
            <PostBody blocks={post.blocks} />
          </article>
          <OtherUpdates posts={others} />
        </div>
      </div>
      <ScaleCta />
    </>
  );
}
