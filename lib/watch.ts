import fs from "node:fs";
import path from "node:path";
import { hasDatabase } from "@/lib/cms/db";
import { getEntry, listEntries } from "@/lib/cms/read";

/**
 * Loader for the Framer "WistiaLessons" CMS collection (route `/watch/<slug>`, 31 entries), scraped into
 * `content/watch/<slug>.json` (one file per entry) plus `content/watch/index.json` (the slugs in the collection's own
 * order). The live template only renders `title` and the video; `description`, `duration` and `emailSegment` are
 * kept because the collection has them (they label the lessons for the email sequences that link here).
 *
 * /watch/welcome-to-mochi is a separate static Framer page (YouTube embed), not an entry of this collection.
 */

export type WatchFile = {
  slug: string;
  /** Kept verbatim, including trailing spaces some entries have ("The Problem  "). */
  title: string;
  /** Rich text ("Description" field), sanitised to p / strong / em / a / br. Not shown on the live page. */
  description: string;
  /** Embed URL as stored in Framer ("Video URL"), e.g. `https://fast.wistia.net/embed/iframe/<id>?autoPlay=true`. */
  videoUrl: string;
  /** Free text from Framer ("Duration"), e.g. "73". */
  duration: string | null;
  /** Free text from Framer ("Email Segment"), e.g. "Sequence 1 - Email 1". */
  emailSegment: string | null;
};

const DIR = path.join(process.cwd(), "content", "watch");

/** Wistia media id of a `fast.wistia.net/embed/iframe/<id>` / `fast.wistia.com/embed/medias/<id>` / `wistia.com/medias/<id>` URL. */
export function wistiaMediaId(url: string): string | null {
  const m = url.match(/wistia\.(?:net|com)\/(?:embed\/(?:iframe|medias)|medias)\/([a-z0-9]+)/i);
  return m ? m[1] : null;
}

/** `<title>` / og:title of an entry, as the Framer template builds it. */
export function watchMetaTitle(entry: Pick<WatchFile, "title">): string {
  return `${entry.title} — Watch`;
}

/** Slug of every live entry, in the collection's order (DB: `sort_order`; files: index.json). */
export async function getAllWatchSlugs(): Promise<string[]> {
  if (hasDatabase) return (await listEntries("watch")).map((r) => r.slug);
  return JSON.parse(fs.readFileSync(path.join(DIR, "index.json"), "utf8")) as string[];
}

export async function getWatchEntry(slug: string): Promise<WatchFile | null> {
  if (!/^[a-z0-9-]+$/.test(slug) || slug === "index") return null;
  if (hasDatabase) {
    const row = await getEntry("watch", slug);
    return row ? ({ ...(row.data as object), slug: row.slug, title: row.title } as WatchFile) : null;
  }
  const file = path.join(DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8")) as WatchFile;
}
