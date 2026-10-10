"use client";

import { useMemo, useState } from "react";
import { MagnifyingGlassMicro } from "@/components/icons/updates-icons";
import type { UpdateSummary } from "@/lib/updates";
import { PostCard } from "./post-card";

/** Category chips of the Framer collection list (in this order; "Blog" posts have no chip). */
const CATEGORIES = ["Product Updates", "How-to Guides", "Testimonials", "Company"] as const;
const PAGE = 3;

// `button { font: inherit }` in globals.css beats utilities on the <button> itself, so the type is set on an inner <span>.
const chipBase = "flex items-center gap-1 overflow-hidden rounded-[10px] bg-white px-3 py-2.5 transition-[color,box-shadow] duration-200";
const chipText = "text-[14px] leading-5 font-normal whitespace-pre";
const chipIdle = "text-gray-550 shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_0_rgba(18,43,105,0.08),0_2px_6px_0_rgba(18,43,105,0.04)]";
const chipActive = "text-ink-3 shadow-[0_2px_6px_0_rgba(18,43,105,0.04),0_1px_2px_0_rgba(18,43,105,0.08),0_0_0_1px_rgb(59,130,245)]";

/**
 * /updates list: category chips + search on top, then the post cards (3 at a time, "Load More"
 * reveals 3 more), 80px apart, inside the 1000px column. Posts arrive newest first.
 */
export function PostList({ posts }: { posts: UpdateSummary[] }) {
  const [category, setCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => (!category || p.label === category) && (!q || `${p.title} ${p.excerpt}`.toLowerCase().includes(q)));
  }, [posts, category, query]);
  const visible = filtered.slice(0, shown);

  const pick = (name: string) => {
    setCategory((c) => (c === name ? null : name));
    setShown(PAGE);
  };

  return (
    <section className="flex w-full flex-col items-center px-6 md:px-8">
      <div className="flex w-full max-w-[1000px] flex-col items-center gap-20 pb-[180px]">
        <div className="flex w-full flex-col gap-4 md:flex-row md:items-start">
          <div className="flex flex-wrap gap-4 md:flex-1">
            {CATEGORIES.map((name) => (
              <button
                key={name}
                type="button"
                aria-pressed={category === name}
                onClick={() => pick(name)}
                className={`${chipBase} ${category === name ? chipActive : chipIdle}`}
              >
                <span className={chipText}>{name}</span>
              </button>
            ))}
          </div>
          <label className="flex h-[38px] w-[200px] shrink-0 cursor-text items-center gap-1 overflow-hidden rounded-full bg-gray-50 p-2.5 shadow-[0_0_0_0.5px_#e0e0e0,0_1px_2px_0_rgba(0,0,0,0.05)]">
            <MagnifyingGlassMicro className="shrink-0 text-gray-500" />
            <input
              type="search"
              aria-label="Search updates"
              placeholder="Search..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShown(PAGE);
              }}
              className="h-[18px] min-w-0 flex-1 bg-transparent text-[14px] leading-[18px] font-medium text-ink-3 outline-none placeholder:text-gray-500"
            />
          </label>
        </div>
        <div className="flex w-full flex-col items-center gap-20">
          {visible.map((post, i) => (
            <PostCard key={post.slug} post={post} preload={i === 0} />
          ))}
          {visible.length === 0 && <p className="text-[16px] leading-6 font-normal text-gray-750">No updates found.</p>}
          {shown < filtered.length && (
            <button
              type="button"
              onClick={() => setShown((n) => n + PAGE)}
              className="flex h-10 w-[100px] items-center justify-center rounded-[10px] bg-[#444] text-white"
            >
              <span className="text-[14px] leading-[16.8px] font-semibold whitespace-pre">Load More</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
