import fs from "node:fs";
import path from "node:path";

/**
 * Loader for the Framer "Updates" CMS collection, scraped into `content/updates/*.json`
 * (one file per post) plus `content/updates/index.json` (summary of every post in the
 * collection's own order, which is the order the "Other Updates" grid uses).
 */

export type UpdateCover = { src: string; width: number | null; height: number | null; alt: string };

export type UpdateBlock =
  | { type: "html"; name?: string | null; html: string }
  | { type: "cta"; text: string; href: string; target: string | null }
  | { type: "audio"; src: string; duration: string | null; bars?: number[] };

export type UpdateSummary = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date (midnight UTC) */
  date: string;
  /** Date as rendered by Framer, e.g. "Oct 1, 2026" */
  dateText: string;
  /** Category label: "Blog" | "Product Updates" | "Company" */
  label: string;
  /** Version label shown on cards ("v 1.0.5", "1.0") or null */
  version: string | null;
  cover: UpdateCover | null;
};

export type Update = UpdateSummary & {
  metaTitle: string;
  description: string;
  ogImage: string | null;
  blocks: UpdateBlock[];
  /** All rich-text blocks concatenated (h2/h3/p/strong/em/a/ul/ol/li/img/blockquote/br, local image paths) */
  body: string;
};

const DIR = path.join(process.cwd(), "content", "updates");

let indexCache: UpdateSummary[] | null = null;

/** Every post in the collection's own order. */
export function getAllUpdates(): UpdateSummary[] {
  if (!indexCache) indexCache = JSON.parse(fs.readFileSync(path.join(DIR, "index.json"), "utf8")) as UpdateSummary[];
  return indexCache;
}

/** Posts as listed on /updates: newest first, ties keep the collection order. */
export function getUpdatesByDate(): UpdateSummary[] {
  return [...getAllUpdates()].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export function getUpdate(slug: string): Update | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const file = path.join(DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8")) as Update;
}
