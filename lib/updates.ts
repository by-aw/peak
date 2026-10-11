import fs from "node:fs";
import path from "node:path";
import { hasDatabase } from "@/lib/cms/db";
import { getEntry, listEntries } from "@/lib/cms/read";

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

const SUMMARY_KEYS = ["slug", "title", "excerpt", "date", "dateText", "label", "version", "cover"] as const;

/** DB rows hold the full post; list views only need the summary fields. */
function toSummary(row: { slug: string; title: string; data: Omit<Update, "slug" | "title"> }): UpdateSummary {
  const full = { ...row.data, slug: row.slug, title: row.title } as Update;
  return Object.fromEntries(SUMMARY_KEYS.map((k) => [k, full[k]])) as UpdateSummary;
}

/** Every live post in the collection's own order (DB: `sort_order`; files: index.json, re-read on every call in development). Draft mode adds drafts/scheduled posts. */
export async function getAllUpdates(): Promise<UpdateSummary[]> {
  if (hasDatabase) return (await listEntries("updates")).map(toSummary);
  if (!indexCache || process.env.NODE_ENV === "development") indexCache = JSON.parse(fs.readFileSync(path.join(DIR, "index.json"), "utf8")) as UpdateSummary[];
  return indexCache;
}

/** Posts as listed on /updates: newest first, ties keep the collection order. */
export async function getUpdatesByDate(): Promise<UpdateSummary[]> {
  return [...(await getAllUpdates())].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export async function getUpdate(slug: string): Promise<Update | null> {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  if (hasDatabase) {
    const row = await getEntry("updates", slug);
    return row ? ({ ...row.data, slug: row.slug, title: row.title } as Update) : null;
  }
  const file = path.join(DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8")) as Update;
}
