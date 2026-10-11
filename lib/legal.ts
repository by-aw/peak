import fs from "node:fs";
import path from "node:path";

/**
 * Loader for the Framer "Legal" CMS collection (Terms of Service, Data Privacy Policy), scraped into
 * `content/legal/<slug>.json` (one file per entry). `intro` and `body` are the collection's two rich-text fields,
 * sanitised to p / h1-h4 / ul / ol / li / strong / em / a / br with no classes or inline styles; `body` is the
 * field the Framer page's table of contents reads (`#blog-content`).
 */

export type LegalHeading = {
  /** Anchor injected into the heading in `LegalEntry.body`, `toc-<text-slug>-<index>` like Framer's TOC component. */
  id: string;
  /** Heading text as shown (also the table-of-contents label). */
  text: string;
  level: 1 | 2 | 3 | 4;
};

type LegalFile = {
  slug: string;
  title: string;
  /** `<title>` / og:title of the live page, e.g. "Terms of Service - The Mochi App" */
  metaTitle: string;
  description: string;
  /** ISO dates (the CMS stores midnight UTC) */
  effectiveDate: string;
  lastUpdated: string;
  /** Dates as Framer renders them (en-US "long", UTC), e.g. "September 8, 2025" */
  effectiveDateText: string;
  lastUpdatedText: string;
  /** Rich text shown under the title, above the rule */
  intro: string;
  /** Rich text of the document itself; headings are not yet anchored (see `LegalEntry.body`) */
  body: string;
};

export type LegalEntry = Omit<LegalFile, "body"> & {
  /** `LegalFile.body` with an `id` on every heading, so the table of contents can link and observe them */
  body: string;
  headings: LegalHeading[];
};

const DIR = path.join(process.cwd(), "content", "legal");

/** Slug of every entry in the collection. */
export function getAllLegalSlugs(): string[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.slice(0, -".json".length))
    .sort();
}

/** innerText of a heading's markup (the sanitised rich text only has plain text and the odd `strong` / `em` / `a` inside). */
function plainText(html: string) {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&");
}

/** Same id scheme as the Framer "Table of contents" component: `toc-<slug of the text>-<heading index>`. */
function anchorHeadings(html: string): { body: string; headings: LegalHeading[] } {
  const headings: LegalHeading[] = [];
  const body = html.replace(/<h([1-4])>([\s\S]*?)<\/h\1>/g, (_, level: string, inner: string) => {
    const text = plainText(inner);
    const id = `toc-${text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-${headings.length}`;
    headings.push({ id, text, level: Number(level) as LegalHeading["level"] });
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });
  return { body, headings };
}

export function getLegalEntry(slug: string): LegalEntry | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const file = path.join(DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  const entry = JSON.parse(fs.readFileSync(file, "utf8")) as LegalFile;
  return { ...entry, ...anchorHeadings(entry.body) };
}
