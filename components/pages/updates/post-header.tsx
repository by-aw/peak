import Link from "next/link";
import { ArrowLeftMini } from "@/components/icons/updates-icons";
import type { Update } from "@/lib/updates";

/** Back link, title and the date / version / category row of a post. */
export function PostHeader({ post }: { post: Update }) {
  return (
    <header className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-8">
        <Link href="/updates" className="flex w-fit items-center gap-2 text-[14px] leading-[16.8px] font-medium whitespace-pre text-gray-500">
          <ArrowLeftMini />
          Back
        </Link>
        <h1 className="font-display text-left text-[36px] leading-[43.2px] font-semibold tracking-[0.72px] whitespace-pre-wrap text-ink-3 md:text-[48px] md:leading-12 md:tracking-[0.96px]">
          {post.title}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <time dateTime={post.date} className="text-[16px] leading-6 font-semibold whitespace-pre text-ink-3">
          {post.dateText}
        </time>
        {post.version && post.label === "Product Updates" && (
          // the version label carries 4px vertical padding on the live site, which makes the row 32px tall
          <span className="py-1 font-mono text-[16px] leading-6 font-medium whitespace-pre text-ink-3">{post.version}</span>
        )}
        <p className="text-[16px] leading-6 font-semibold whitespace-pre text-blue-500">{post.label}</p>
      </div>
    </header>
  );
}
