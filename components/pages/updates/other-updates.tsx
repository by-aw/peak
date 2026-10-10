import Image from "next/image";
import Link from "next/link";
import { ArrowRightMini } from "@/components/icons/updates-icons";
import type { UpdateSummary } from "@/lib/updates";

/**
 * One "Other Updates" card: cover at its own aspect ratio, title (20/24px black; the tablet variant uses 20/28px #1d1d20),
 * 2-line excerpt, date + version, "Read more".
 */
function OtherCard({ post }: { post: UpdateSummary }) {
  // A post without a cover keeps an empty frame: square on phone, 16:9 on tablet/desktop (as on the live site).
  const ratio = post.cover?.width && post.cover.height ? `${post.cover.width} / ${post.cover.height}` : undefined;
  return (
    <Link href={`/updates/${post.slug}`} className="flex w-full flex-col gap-6 md:w-[320px]">
      <div className={`relative w-full overflow-hidden rounded-[12px] ${post.cover ? "" : "aspect-square md:aspect-[16/9]"}`} style={ratio ? { aspectRatio: ratio } : undefined}>
        {post.cover && <Image src={post.cover.src} alt={post.cover.alt} fill sizes="(min-width: 810px) 320px, calc(100vw - 32px)" className="rounded-[12px] object-cover" />}
      </div>
      <div className="flex flex-col gap-4 overflow-clip">
        <p className="text-[20px] leading-6 font-semibold tracking-[-0.8px] whitespace-pre-wrap text-black md:leading-7 md:text-ink-3 lg:leading-6 lg:text-black">{post.title}</p>
        <p className="line-clamp-2 text-[16px] leading-6 font-normal whitespace-pre-line text-gray-750">{post.excerpt}</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center gap-4">
          <time dateTime={post.date} className="text-[14px] leading-[16.8px] font-semibold tracking-[-0.56px] whitespace-pre text-black">
            {post.dateText}
          </time>
          {post.version && <span className="font-mono text-[14px] leading-[16.8px] font-medium whitespace-pre text-black">{post.version}</span>}
        </div>
        <span className="flex items-center gap-2 text-[14px] leading-5 font-medium whitespace-pre text-purple-500">
          Read more
          <ArrowRightMini />
        </span>
      </div>
    </Link>
  );
}

/** "Other Updates": every other post of the collection, in collection order, two 320px columns (one on phone). */
export function OtherUpdates({ posts }: { posts: UpdateSummary[] }) {
  return (
    <section className="flex w-full max-w-[720px] flex-col gap-12">
      <p className="font-display text-left text-[28px] leading-[33.6px] font-semibold tracking-[0.56px] whitespace-pre-wrap text-ink-3 md:text-[32px] md:leading-[38.4px] md:tracking-[0.64px]">
        Other Updates
      </p>
      <div className="flex w-full flex-wrap items-start gap-12">
        {posts.map((post) => (
          <OtherCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
