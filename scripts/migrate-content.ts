/**
 * One-off (re-runnable) import of `content/updates`, `content/legal`, `content/watch`, `content/academy` and
 * `content/audit` into Neon, with every local `/framer/...` asset referenced by those entries (post images, the audit
 * founder photos) uploaded to Vercel Blob and the paths rewritten to the Blob URLs.
 *
 * sort_order: updates, watch and academy follow their index.json; legal and audit follow file name order.
 * publish_at: updates = post date, legal = effective date, audit = sent date; watch / academy have no date of their own
 * and get the start time of the run (so they are live immediately).
 *
 *   pnpm cms:migrate                 create missing rows; leave rows that already exist untouched (keeps CMS edits)
 *   pnpm cms:migrate --overwrite     also overwrite existing rows with the content/ version
 *   pnpm cms:migrate --dry-run       touch neither the DB nor Blob; print a summary
 *   pnpm cms:migrate --local-images  skip Blob and keep the `/framer/...` paths (served from public/); for local testing
 *
 * Needs DATABASE_URL and BLOB_READ_WRITE_TOKEN (read from .env.local) unless --dry-run.
 * Idempotent: rows upsert on (collection, slug); Blob pathnames are deterministic (`cms/framer/<file>`) and an image
 * that already exists there (head()) is not uploaded again.
 */
import fs from "node:fs";
import path from "node:path";
import { neon } from "@neondatabase/serverless";
import { BlobNotFoundError, head, put } from "@vercel/blob";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../lib/cms/schema";
import type { CollectionId } from "../lib/cms/types";

for (const f of [".env.local", ".env"]) {
  try {
    process.loadEnvFile(path.join(process.cwd(), f));
  } catch {}
}

const args = new Set(process.argv.slice(2));
const DRY = args.has("--dry-run");
const OVERWRITE = args.has("--overwrite");
const LOCAL_IMAGES = args.has("--local-images");
const ROOT = process.cwd();
const ASSET_RE = /\/framer\/[A-Za-z0-9._-]+/g;
const RUN_STARTED = new Date();

type Row = { collection: CollectionId; slug: string; title: string; publishAt: Date; sortOrder: number; data: Record<string, unknown> };

const readJson = <T>(file: string) => JSON.parse(fs.readFileSync(file, "utf8")) as T;

function collectRows(): Row[] {
  const rows: Row[] = [];
  const updatesDir = path.join(ROOT, "content", "updates");
  const order = readJson<{ slug: string }[]>(path.join(updatesDir, "index.json")).map((p) => p.slug);
  for (const f of fs.readdirSync(updatesDir).filter((f) => f.endsWith(".json") && f !== "index.json")) {
    const { slug, title, ...data } = readJson<{ slug: string; title: string; date: string } & Record<string, unknown>>(path.join(updatesDir, f));
    const idx = order.indexOf(slug);
    if (idx === -1) console.warn(`  ! ${slug} is not in index.json; sorted last`);
    rows.push({ collection: "updates", slug, title, publishAt: new Date(data.date), sortOrder: idx === -1 ? order.length : idx, data });
  }
  const legalDir = path.join(ROOT, "content", "legal");
  for (const f of fs.readdirSync(legalDir).filter((f) => f.endsWith(".json")).sort()) {
    const { slug, title, ...data } = readJson<{ slug: string; title: string; effectiveDate: string } & Record<string, unknown>>(path.join(legalDir, f));
    rows.push({ collection: "legal", slug, title, publishAt: new Date(data.effectiveDate), sortOrder: rows.filter((r) => r.collection === "legal").length, data });
  }
  // watch / academy: one file per entry plus index.json (the slugs in the collection's order).
  for (const collection of ["watch", "academy"] as const) {
    const dir = path.join(ROOT, "content", collection);
    const order = readJson<string[]>(path.join(dir, "index.json"));
    for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".json") && f !== "index.json").sort()) {
      const { slug, title, ...data } = readJson<{ slug: string; title: string } & Record<string, unknown>>(path.join(dir, f));
      const idx = order.indexOf(slug);
      if (idx === -1) console.warn(`  ! ${collection}/${slug} is not in index.json; sorted last`);
      rows.push({ collection, slug, title, publishAt: RUN_STARTED, sortOrder: idx === -1 ? order.length : idx, data });
    }
  }
  const auditDir = path.join(ROOT, "content", "audit");
  for (const f of fs.readdirSync(auditDir).filter((f) => f.endsWith(".json")).sort()) {
    const { slug, title, ...data } = readJson<{ slug: string; title: string; sentDate: string } & Record<string, unknown>>(path.join(auditDir, f));
    rows.push({ collection: "audit", slug, title, publishAt: new Date(data.sentDate), sortOrder: rows.filter((r) => r.collection === "audit").length, data });
  }
  return rows;
}

const urlCache = new Map<string, string>();
const stats = { uploaded: 0, reused: 0, missing: [] as string[] };

async function blobUrlFor(assetPath: string): Promise<string | null> {
  const cached = urlCache.get(assetPath);
  if (cached) return cached;
  const file = path.join(ROOT, "public", assetPath);
  if (!fs.existsSync(file)) {
    stats.missing.push(assetPath);
    return null;
  }
  const pathname = `cms${assetPath}`; // cms/framer/<file>
  let url: string;
  try {
    url = (await head(pathname)).url;
    stats.reused++;
  } catch (e) {
    if (!(e instanceof BlobNotFoundError)) throw e;
    url = (await put(pathname, fs.readFileSync(file), { access: "public", addRandomSuffix: false, allowOverwrite: true })).url;
    stats.uploaded++;
  }
  urlCache.set(assetPath, url);
  return url;
}

async function rewrite(data: Record<string, unknown>): Promise<Record<string, unknown>> {
  let json = JSON.stringify(data);
  for (const asset of new Set(json.match(ASSET_RE) ?? [])) {
    const url = await blobUrlFor(asset);
    if (url) json = json.split(asset).join(url);
  }
  return JSON.parse(json);
}

async function main() {
  const rows = collectRows();
  const assets = new Set<string>();
  for (const r of rows) for (const a of JSON.stringify(r.data).match(ASSET_RE) ?? []) assets.add(a);
  const missing = [...assets].filter((a) => !fs.existsSync(path.join(ROOT, "public", a)));

  if (DRY) {
    const by = (c: CollectionId) => rows.filter((r) => r.collection === c).length;
    const bytes = [...assets].reduce((n, a) => n + (fs.existsSync(path.join(ROOT, "public", a)) ? fs.statSync(path.join(ROOT, "public", a)).size : 0), 0);
    console.log("[dry run] nothing written");
    console.log(`  updates rows:  ${by("updates")} (sortOrder from index.json, status published, publishAt = post date)`);
    console.log(`  legal rows:    ${by("legal")}`);
    console.log(`  watch rows:    ${by("watch")} (sortOrder from index.json, publishAt = now)`);
    console.log(`  academy rows:  ${by("academy")} (sortOrder from index.json, publishAt = now)`);
    console.log(`  audit rows:    ${by("audit")} (publishAt = sent date)`);
    console.log(`  images:        ${assets.size} unique /framer/ references (${(bytes / 1048576).toFixed(1)} MB) -> Blob cms/framer/<file>`);
    for (const c of ["updates", "legal", "watch", "academy", "audit"] as const) {
      const n = new Set(rows.filter((r) => r.collection === c).flatMap((r) => JSON.stringify(r.data).match(ASSET_RE) ?? [])).size;
      if (n) console.log(`    of which ${c}: ${n}`);
    }
    console.log(`  missing files: ${missing.length}${missing.length ? ` (${missing.slice(0, 5).join(", ")}${missing.length > 5 ? ", ..." : ""})` : ""}`);
    console.log(`  future-dated:  ${rows.filter((r) => r.publishAt > new Date()).length} (would be scheduled, not live)`);
    return;
  }

  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set (put it in .env.local)");
  if (!LOCAL_IMAGES && !process.env.BLOB_READ_WRITE_TOKEN) throw new Error("BLOB_READ_WRITE_TOKEN is not set (put it in .env.local)");
  const db = drizzle(neon(process.env.DATABASE_URL), { schema });
  const { entries } = schema;

  let created = 0;
  let updated = 0;
  let skipped = 0;
  for (const r of rows) {
    const values = { collection: r.collection, slug: r.slug, title: r.title, status: "published" as const, publishAt: r.publishAt, sortOrder: r.sortOrder, data: (LOCAL_IMAGES ? r.data : await rewrite(r.data)) as never };
    if (OVERWRITE) {
      const res = await db
        .insert(entries)
        .values(values)
        .onConflictDoUpdate({ target: [entries.collection, entries.slug], set: { title: values.title, status: values.status, publishAt: values.publishAt, sortOrder: values.sortOrder, data: values.data, updatedAt: sql`now()` } })
        .returning({ inserted: sql<boolean>`(xmax = 0)` });
      if (res[0]?.inserted) created++;
      else updated++;
    } else {
      const res = await db.insert(entries).values(values).onConflictDoNothing().returning({ id: entries.id });
      if (res.length) created++;
      else skipped++;
    }
  }
  console.log(`rows: ${created} created, ${updated} updated, ${skipped} left untouched (use --overwrite to replace)`);
  console.log(`images: ${stats.uploaded} uploaded, ${stats.reused} already on Blob, ${stats.missing.length} missing locally`);
  if (stats.missing.length) console.log(`  missing: ${[...new Set(stats.missing)].join(", ")}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
