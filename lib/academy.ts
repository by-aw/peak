import fs from "node:fs";
import path from "node:path";
import { hasDatabase } from "@/lib/cms/db";
import { getEntry, listEntries } from "@/lib/cms/read";

/**
 * Loader for the Framer "Lessons" CMS collection, published on live under /academy-work-in-progress/<slug>
 * (the site's "Academy"). Scraped into `content/academy/<slug>.json` (one file per lesson) plus
 * `content/academy/index.json` (every slug in the collection's own order, which is the order of the side nav).
 *
 * Framer keeps the lesson's module in a second collection ("Modules": name, image, slug, total minutes, order,
 * number of lessons) that nothing on the site edits or lists; it is mirrored as `ACADEMY_MODULES` below and lessons
 * reference it by slug.
 */

export type AcademyModule = {
  slug: string;
  name: string;
  /** Square icon (88x88), mirrored in public/framer */
  image: string;
  /** Free text, e.g. "6 min" */
  totalMinutes: string;
  order: number;
  /** "Number of lessons": the total in the lesson page's "Lesson 3 / 6" counter */
  lessonCount: number;
};

/** Framer's "Modules" collection, in its own order. */
export const ACADEMY_MODULES: AcademyModule[] = [
  { slug: "dashboard", name: "Module 1", image: "/framer/oBx7lZzBl2xPcM7miEJHMPszPY.png", totalMinutes: "6 min", order: 1, lessonCount: 3 },
  { slug: "inbox", name: "Module 2", image: "/framer/oBx7lZzBl2xPcM7miEJHMPszPY.png", totalMinutes: "12 min", order: 2, lessonCount: 6 },
  { slug: "lead-management", name: "Module 3", image: "/framer/oBx7lZzBl2xPcM7miEJHMPszPY.png", totalMinutes: "8 min", order: 3, lessonCount: 4 },
  { slug: "settings", name: "Settings", image: "/framer/oBx7lZzBl2xPcM7miEJHMPszPY.png", totalMinutes: "5 min", order: 4, lessonCount: 3 },
];

export function getAcademyModule(slug: string): AcademyModule | null {
  return ACADEMY_MODULES.find((m) => m.slug === slug) ?? null;
}

export type AcademyFile = {
  slug: string;
  /** Lesson title, verbatim: some contain U+2028 line separators from Framer, which browsers render as a space. */
  title: string;
  /** Rich text ("Description"); empty for every lesson on live. Sanitised like the legal/updates bodies (p / h2-h4 / ul / ol / li / strong / em / a / br). */
  description: string;
  /** "Video URL" (YouTube links on live). Stored but not played: the live template shows a static thumbnail. */
  videoUrl: string | null;
  /** Free text shown as-is, e.g. "3:26" */
  duration: string;
  /** Slug of an `ACADEMY_MODULES` entry */
  module: string;
  /** Framer's "Order" number, shown as the "Lesson <order> / <module.lessonCount>" counter */
  order: number;
};

const DIR = path.join(process.cwd(), "content", "academy");

let indexCache: string[] | null = null;

function fileSlugs(): string[] {
  if (!indexCache || process.env.NODE_ENV === "development") indexCache = JSON.parse(fs.readFileSync(path.join(DIR, "index.json"), "utf8")) as string[];
  return indexCache;
}

function readFile(slug: string): AcademyFile | null {
  const file = path.join(DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8")) as AcademyFile;
}

type AcademyRow = { slug: string; title: string; data: unknown };

function fromRow(row: AcademyRow): AcademyFile {
  return { ...(row.data as Omit<AcademyFile, "slug" | "title">), slug: row.slug, title: row.title };
}

/** Every live lesson in the collection's own order (DB: `sort_order`; files: index.json). Draft mode adds drafts/scheduled lessons. */
export async function getAllAcademyLessons(): Promise<AcademyFile[]> {
  if (hasDatabase) {
    const rows: AcademyRow[] = await listEntries("academy");
    return rows.map(fromRow);
  }
  return fileSlugs()
    .map(readFile)
    .filter((l): l is AcademyFile => l !== null);
}

/** Slug of every lesson. */
export async function getAllAcademySlugs(): Promise<string[]> {
  return (await getAllAcademyLessons()).map((l) => l.slug);
}

export async function getAcademyLesson(slug: string): Promise<AcademyFile | null> {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  if (hasDatabase) {
    const row: AcademyRow | null = await getEntry("academy", slug);
    return row ? fromRow(row) : null;
  }
  return readFile(slug);
}
