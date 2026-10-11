import { and, asc, eq, lte } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { draftMode } from "next/headers";
import { db } from "./db";
import { entries } from "./schema";
import { cmsTags, type CollectionData, type CollectionId } from "./types";

/**
 * Public read layer over `cms_entries` (only used when `hasDatabase`; lib/updates.ts and lib/legal.ts fall back to
 * `content/` otherwise).
 *
 * Caching: `next.config.ts` does not enable Cache Components, so reads use `unstable_cache` (the docs'
 * "previous model" for non-fetch data) with these tags. Mutations invalidate with `updateTag` / `revalidateTag(tag, "max")`:
 *   - listEntries(c)      -> `cmsTags.collection(c)`                     (`cms:<c>`)
 *   - getEntry(c, slug)   -> `cmsTags.entry(c, slug)` + `cmsTags.collection(c)`  (`cms:<c>:<slug>`, `cms:<c>`)
 * So invalidating the collection tag refreshes every read of that collection; the entry tag refreshes only that entry's
 * page (note: a save should still invalidate the collection tag because list pages show titles/excerpts).
 * A 1 hour `revalidate` is a safety net behind the tags (and covers scheduled entries if the cron ever misses).
 *
 * Draft mode: when `draftMode().isEnabled` the cache is bypassed and every entry is returned regardless of status /
 * publish_at, so editors preview drafts and scheduled entries on the real public URL.
 */

export type LiveRow<C extends CollectionId> = { slug: string; title: string; data: CollectionData[C] };

const REVALIDATE_SECONDS = 3600;

/** True when the request carries the draft-mode bypass cookie. False outside a request (build, generateStaticParams). */
export async function isDraftMode(): Promise<boolean> {
  try {
    return (await draftMode()).isEnabled;
  } catch {
    return false;
  }
}

async function queryList<C extends CollectionId>(collection: C, includeAll: boolean): Promise<LiveRow<C>[]> {
  const where = includeAll
    ? eq(entries.collection, collection)
    : and(eq(entries.collection, collection), eq(entries.status, "published"), lte(entries.publishAt, new Date()));
  const rows = await db().select({ slug: entries.slug, title: entries.title, data: entries.data }).from(entries).where(where).orderBy(asc(entries.sortOrder), asc(entries.slug));
  return rows as LiveRow<C>[];
}

async function queryOne<C extends CollectionId>(collection: C, slug: string, includeAll: boolean): Promise<LiveRow<C> | null> {
  const where = includeAll
    ? and(eq(entries.collection, collection), eq(entries.slug, slug))
    : and(eq(entries.collection, collection), eq(entries.slug, slug), eq(entries.status, "published"), lte(entries.publishAt, new Date()));
  const rows = await db().select({ slug: entries.slug, title: entries.title, data: entries.data }).from(entries).where(where).limit(1);
  return (rows[0] as LiveRow<C> | undefined) ?? null;
}

/** All live entries of a collection in `sort_order` (drafts and scheduled entries too in draft mode). Tag: `cms:<c>`. */
export async function listEntries<C extends CollectionId>(collection: C, opts: { draft?: boolean } = {}): Promise<LiveRow<C>[]> {
  const draft = opts.draft ?? (await isDraftMode());
  if (draft) return queryList(collection, true);
  return unstable_cache(() => queryList(collection, false), ["cms-list", collection], { tags: [cmsTags.collection(collection)], revalidate: REVALIDATE_SECONDS })();
}

/** One live entry by slug. Tags: `cms:<c>:<slug>` and `cms:<c>`. */
export async function getEntry<C extends CollectionId>(collection: C, slug: string, opts: { draft?: boolean } = {}): Promise<LiveRow<C> | null> {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const draft = opts.draft ?? (await isDraftMode());
  if (draft) return queryOne(collection, slug, true);
  return unstable_cache(() => queryOne(collection, slug, false), ["cms-entry", collection, slug], {
    tags: [cmsTags.entry(collection, slug), cmsTags.collection(collection)],
    revalidate: REVALIDATE_SECONDS,
  })();
}
