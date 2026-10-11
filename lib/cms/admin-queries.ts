import "server-only";
import { and, asc, eq, gt, ilike, lte, ne, or, sql } from "drizzle-orm";
import { requireEditor } from "@/lib/auth";
import { db, hasDatabase } from "./db";
import { entries, type EntryRow } from "./schema";
import type { CollectionId } from "./types";

export type { EntryRow };
export type StatusFilter = "draft" | "published" | "scheduled";

export class DatabaseNotConnectedError extends Error {
  constructor() {
    super("Database not connected yet. Add Neon in Vercel → Storage.");
    this.name = "DatabaseNotConnectedError";
  }
}

async function ready() {
  await requireEditor();
  if (!hasDatabase) throw new DatabaseNotConnectedError();
  return db();
}

/** Published entries whose publish time is in the future are "scheduled". */
export function entryState(e: Pick<EntryRow, "status" | "publishAt">): StatusFilter {
  if (e.status !== "published") return "draft";
  return e.publishAt && e.publishAt.getTime() > Date.now() ? "scheduled" : "published";
}

export async function listEntries(collection: CollectionId, opts: { status?: StatusFilter; q?: string } = {}): Promise<EntryRow[]> {
  const d = await ready();
  const conds = [eq(entries.collection, collection)];
  if (opts.status === "draft") conds.push(eq(entries.status, "draft"));
  if (opts.status === "published") conds.push(eq(entries.status, "published"), or(sql`${entries.publishAt} is null`, lte(entries.publishAt, sql`now()`))!);
  if (opts.status === "scheduled") conds.push(eq(entries.status, "published"), gt(entries.publishAt, sql`now()`));
  const q = opts.q?.trim();
  if (q) {
    const like = `%${q.replace(/[\\%_]/g, "\\$&")}%`;
    conds.push(or(ilike(entries.title, like), ilike(entries.slug, like))!);
  }
  // Updates: newest first. Watch / academy: the collection's own order (sort_order, what the site uses). Legal / audit: by title.
  const order =
    collection === "updates"
      ? [sql`${entries.publishAt} desc nulls first`, asc(entries.sortOrder)]
      : collection === "watch" || collection === "academy"
        ? [asc(entries.sortOrder), asc(entries.slug)]
        : [asc(entries.title)];
  return d.select().from(entries).where(and(...conds)).orderBy(...order);
}

export async function countByState(collection: CollectionId): Promise<{ draft: number; published: number; scheduled: number }> {
  const d = await ready();
  const rows = await d
    .select({ status: entries.status, publishAt: entries.publishAt })
    .from(entries)
    .where(eq(entries.collection, collection));
  const out = { draft: 0, published: 0, scheduled: 0 };
  for (const r of rows) out[entryState(r)]++;
  return out;
}

export async function getEntryById(id: string): Promise<EntryRow | null> {
  const d = await ready();
  // Not a uuid => no such entry (avoids a Postgres cast error).
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) return null;
  const [row] = await d.select().from(entries).where(eq(entries.id, id)).limit(1);
  return row ?? null;
}

export async function getEntryBySlug(collection: CollectionId, slug: string): Promise<EntryRow | null> {
  const d = await ready();
  const [row] = await d.select().from(entries).where(and(eq(entries.collection, collection), eq(entries.slug, slug))).limit(1);
  return row ?? null;
}

export async function isSlugTaken(collection: CollectionId, slug: string, exceptId?: string): Promise<boolean> {
  const d = await ready();
  const conds = [eq(entries.collection, collection), eq(entries.slug, slug)];
  if (exceptId) conds.push(ne(entries.id, exceptId));
  const [row] = await d.select({ id: entries.id }).from(entries).where(and(...conds)).limit(1);
  return Boolean(row);
}
