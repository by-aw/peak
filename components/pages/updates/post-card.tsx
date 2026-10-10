import Image from "next/image";
import Link from "next/link";
import { ArrowRightMini } from "@/components/icons/updates-icons";
import type { UpdateSummary } from "@/lib/updates";

/**
 * /updates list card. Tablet/desktop ("Desktop" variant): 180px info column (date, category) +
 * the linked content (16:9 cover, title, 2-line excerpt, "Read more"). Phone variant: cover, title,
 * excerpt and an "Info Mobile" row (date, version, category) with no "Read more".
 */
export function PostCard({ post, preload = false }: { post: UpdateSummary; preload?: boolean }) {
  return (
    <article className="flex w-full flex-col md:flex-row md:items-start md:gap-4">
      <div className="hidden w-[180px] shrink-0 flex-col gap-2 py-1 md:flex">
        <time dateTime={post.date} className="text-[16px] leading-6 font-semibold whitespace-pre-wrap text-ink-3">
          {post.dateText}
        </time>
        <p className="text-[16px] leading-6 font-semibold whitespace-pre-wrap text-blue-500">{post.label}</p>
      </div>
      <Link href={`/updates/${post.slug}`} className="flex w-full min-w-0 flex-col gap-6 md:flex-1">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[12px]">
          {post.cover && (
            <Image
              src={post.cover.src}
              alt={post.cover.alt}
              fill
              preload={preload}
              sizes="(min-width: 1200px) 804px, (min-width: 810px) calc(100vw - 260px), calc(100vw - 48px)"
              className="rounded-[12px] object-cover"
            />
          )}
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="font-display text-[24px] leading-8 font-semibold tracking-[0.48px] whitespace-pre-wrap text-ink-3 md:text-[30px] md:leading-9 md:tracking-[0.6px]">
            {post.title}
          </h2>
          <p className="line-clamp-2 text-[16px] leading-6 font-normal whitespace-pre-line text-gray-750">{post.excerpt}</p>
        </div>
        <span className="hidden items-center gap-2 text-[14px] leading-5 font-medium whitespace-pre text-purple-500 md:flex">
          Read more
          <ArrowRightMini />
        </span>
        <div className="flex items-start gap-4 py-1 md:hidden">
          <time dateTime={post.date} className="text-[16px] leading-6 font-semibold whitespace-pre text-gray-750">
            {post.dateText}
          </time>
          {post.version && <span className="font-mono text-[16px] leading-6 font-medium whitespace-pre text-ink-3">{post.version}</span>}
          <span className="flex-1 text-[16px] leading-6 font-semibold whitespace-pre-wrap text-blue-500">{post.label}</span>
        </div>
      </Link>
    </article>
  );
}
