import fs from "node:fs";
import path from "node:path";
import { hasDatabase } from "@/lib/cms/db";
import { getEntry, listEntries } from "@/lib/cms/read";

/**
 * Loader for the Framer "Audit" CMS collection (the "Mochi Intelligence Report" DM audits sent to founders), scraped
 * into `content/audit/<slug>.json` (one file per entry). Field names follow the Framer field titles.
 *
 * Rich-text fields (`summary`, `content1`, `content2Title`, `content2Body`, `content3Title`, `content3Body`,
 * `content4`-`content7`, `finalNote`) are sanitised to p / h2 / ul / ol / li / strong / em / a / br / blockquote with no
 * classes or inline styles; Framer's `trailing-break` `<br>` is kept as a plain `<br>` (it is what makes the empty line
 * after "...3,912 messages." and the second line of "Recommended Next Steps"). Text is verbatim, including the
 * non-breaking spaces and U+2028 line separators Framer stored.
 *
 * Everything else on the page (KPI labels and units, the pros / cons chips, the archetype names and emojis) is part of
 * the Framer template, not the collection, so it lives in `components/pages/audit/`.
 */

export type AuditImage = { src: string; width: number | null; height: number | null; alt: string };

export type AuditFile = {
  slug: string;
  title: string;
  /** Meta / og description (live uses the site default for both entries) */
  description: string;
  /** ISO dates (the CMS stores midnight UTC) */
  sentDate: string;
  periodFrom: string;
  periodTo: string;
  founderName: string;
  founderImage: AuditImage | null;
  /** Rich text under the hero (Framer field "Summary") */
  summary: string;
  /** KPI grid values (numbers; the units "/ 500" and "min" are part of the template) */
  totalConversations: number;
  totalMessages: number;
  avgResponseTime: number;
  messagesSent: number;
  messagesReceived: number;
  periodAnalyzed: number;
  keywordUsage: number;
  leadSharedEmail: number;
  /** Table-of-contents labels; they link to the sections content1 ... content7 in order */
  sidenav1: string;
  sidenav2: string;
  sidenav3: string;
  sidenav4: string;
  sidenav5: string;
  sidenav6: string;
  sidenav7: string;
  /** Rich text: heading of the KPI section */
  content1: string;
  /** Rich text: Overview heading + body (the pros / cons chips sit between them) */
  content2Title: string;
  content2Body: string;
  /** Rich text: Archetypes heading + body (the archetype chips sit beside / above the body) */
  content3Title: string;
  content3Body: string;
  /** Archetype chip percentages (The Curious Explorer, The Low-Capital Dreamer, The Pragmatic Professional, The Operator) */
  archetype1: number;
  archetype2: number;
  archetype3: number;
  archetype4: number;
  /** Rich text sections, each opening with its own h2 */
  content4: string;
  content5: string;
  content6: string;
  content7: string;
  finalNote: string;
};

const DIR = path.join(process.cwd(), "content", "audit");

/** Slug of every entry in the collection. */
export async function getAllAuditSlugs(): Promise<string[]> {
  if (hasDatabase) return (await listEntries("audit")).map((r) => r.slug).sort();
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.slice(0, -".json".length))
    .sort();
}

export async function getAuditEntry(slug: string): Promise<AuditFile | null> {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  if (hasDatabase) {
    const row = await getEntry("audit", slug);
    if (!row) return null;
    return { ...(row.data as unknown as Omit<AuditFile, "slug" | "title">), slug: row.slug, title: row.title };
  }
  const file = path.join(DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8")) as AuditFile;
}
