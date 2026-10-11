"use server";

import { eq, max, min } from "drizzle-orm";
import { updateTag } from "next/cache";
import { requireEditor } from "@/lib/auth";
import { getEntryById, isSlugTaken } from "./admin-queries";
import { blocksToBody, editorHtmlToBlocks, editorHtmlToLegal, parseDay, sanitizeHtml, type StoredBlock } from "./blocks";
import { db, hasDatabase } from "./db";
import { entries, type EntryRow } from "./schema";
import { cmsTags, type CollectionData, type CollectionId } from "./types";

/**
 * Server actions behind the editor. Every one: requireEditor() first, validates everything again on the server
 * (the form is only a convenience), sanitises HTML against the same allowlist the public renderer styles, stamps
 * updatedBy / updatedAt, then invalidates the cache tags the public read layer uses.
 *
 * Invalidation uses `updateTag` (not `revalidateTag`): these are Server Actions, and an editor who clicks Publish and
 * then "View live" must see the new content right away, not a stale-while-revalidate copy. `revalidateTag(tag, "max")`
 * is the choice for Route Handlers / webhooks, where `updateTag` is not allowed.
 */

export type EntryInput = {
  collection: CollectionId;
  title: string;
  slug: string;
  /** Editor HTML (see ./blocks.ts). */
  content: string;
  // updates
  label?: string;
  version?: string;
  /** yyyy-mm-dd */
  date?: string;
  excerpt?: string;
  metaTitle?: string;
  description?: string;
  coverSrc?: string;
  coverWidth?: number | null;
  coverHeight?: number | null;
  coverAlt?: string;
  ogImage?: string;
  // legal
  effectiveDate?: string;
  lastUpdated?: string;
  /** Editor HTML */
  intro?: string;
  /** `updatedAt` (ISO) of the row when the editor loaded it; a mismatch means someone else saved in between. */
  expectedUpdatedAt?: string | null;
};

export type SavedEntry = {
  id: string;
  slug: string;
  status: "draft" | "published";
  publishAt: string | null;
  updatedAt: string;
  updatedBy: string | null;
  /** Friendly notes about content that had to be dropped (e.g. a button without a link). */
  notes: string[];
};

export type ActionResult<T = SavedEntry> = { ok: true; value: T } | { ok: false; error: string; fieldErrors?: Record<string, string> };

const LABELS = ["Blog", "Product Updates", "Company"];
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const RESERVED_SLUGS = new Set(["new"]);

const fail = (error: string, fieldErrors?: Record<string, string>): ActionResult<never> => ({ ok: false, error, fieldErrors });

type Transition = { kind: "keep" } | { kind: "publish" } | { kind: "schedule"; at: Date };

/** A file we uploaded to Blob, or a path on this site. Anything else is refused. */
function cleanAsset(url: string | undefined): string | null {
  const v = (url ?? "").trim();
  if (!v) return null;
  if (v.startsWith("/") && !v.startsWith("//")) return v;
  try {
    const u = new URL(v);
    if (u.protocol === "https:" && u.hostname.endsWith(".public.blob.vercel-storage.com")) return u.toString();
  } catch {
    /* fall through */
  }
  return null;
}

function dim(n: number | null | undefined): number | null {
  return typeof n === "number" && Number.isInteger(n) && n > 0 && n < 20000 ? n : null;
}

type Validated = {
  title: string;
  slug: string;
  data: CollectionData[CollectionId];
  notes: string[];
};

function validate(input: EntryInput, existing: EntryRow | null, transition: Transition["kind"] | "draft"): Validated | ActionResult<never> {
  const errors: Record<string, string> = {};
  const title = (input.title ?? "").trim();
  const slug = (input.slug ?? "").trim();
  if (!title) errors.title = "Give this a title.";
  else if (title.length > 200) errors.title = "That title is too long (200 characters at most).";
  if (!slug) errors.slug = "The web address can't be empty.";
  else if (!SLUG.test(slug) || RESERVED_SLUGS.has(slug) || slug.length > 120) errors.slug = "Use only lowercase letters, numbers and dashes (for example my-new-post).";
  const content = input.content ?? "";
  if (content.length > 1_500_000) errors.content = "This page is too large. Try removing some content.";

  const publishing = transition === "publish" || transition === "schedule";
  const description = (input.description ?? "").trim().slice(0, 500);
  const metaTitle = (input.metaTitle ?? "").trim().slice(0, 200);
  const notes: string[] = [];

  if (input.collection === "updates") {
    const label = LABELS.includes(input.label ?? "") ? (input.label as string) : null;
    if (!label) errors.label = "Pick a category.";
    const day = parseDay(input.date ?? "");
    if (!day) errors.date = "Pick a date.";
    const excerpt = (input.excerpt ?? "").trim().slice(0, 500);
    const coverSrc = cleanAsset(input.coverSrc);
    if ((input.coverSrc ?? "").trim() && !coverSrc) errors.cover = "That image can't be used. Upload it again.";
    const ogImage = cleanAsset(input.ogImage);
    if ((input.ogImage ?? "").trim() && !ogImage) errors.ogImage = "That image can't be used. Upload it again.";
    const converted = editorHtmlToBlocks(content);
    notes.push(...converted.problems);
    if (publishing) {
      if (!converted.blocks.length) errors.content = "Add some content before publishing.";
      if (!excerpt) errors.excerpt = "Add a short summary; it shows on the updates page.";
    }
    if (Object.keys(errors).length || !day || !label) return fail("Please fix the highlighted fields.", errors);

    const old = existing?.collection === "updates" ? (existing.data as CollectionData["updates"]) : null;
    const next: Record<string, unknown> = {
      ...(old ?? {}),
      metaTitle: metaTitle || `${title} - Mochi`,
      description,
      excerpt,
      date: day.iso,
      dateText: day.short,
      label,
      version: (input.version ?? "").trim().slice(0, 30) || null,
      ogImage: ogImage ?? coverSrc,
      cover: coverSrc ? { ...(old?.cover ?? {}), src: coverSrc, width: dim(input.coverWidth), height: dim(input.coverHeight), alt: (input.coverAlt ?? "").trim().slice(0, 300) } : null,
      blocks: converted.blocks as StoredBlock[],
      body: blocksToBody(converted.blocks),
    };
    // The scraped `ogImageUrl` is the original Framer URL of the old image; it is stale once the image changes.
    if (old && next.ogImage !== old.ogImage) delete next.ogImageUrl;
    return { title, slug, data: next as unknown as CollectionData["updates"], notes };
  }

  const effective = parseDay(input.effectiveDate ?? "");
  const updated = parseDay(input.lastUpdated ?? "");
  if (!effective) errors.effectiveDate = "Pick the date this takes effect.";
  if (!updated) errors.lastUpdated = "Pick the date it was last updated.";
  const body = editorHtmlToLegal(content);
  if (publishing && !body) errors.content = "Add some content before publishing.";
  if (Object.keys(errors).length || !effective || !updated) return fail("Please fix the highlighted fields.", errors);
  const old = existing?.collection === "legal" ? (existing.data as CollectionData["legal"]) : null;
  const next: CollectionData["legal"] = {
    ...(old ?? {}),
    metaTitle: metaTitle || `${title} - The Mochi App`,
    description,
    effectiveDate: effective.iso.slice(0, 10),
    lastUpdated: updated.iso.slice(0, 10),
    effectiveDateText: effective.long,
    lastUpdatedText: updated.long,
    intro: sanitizeHtml(input.intro ?? "", "legal"),
    body,
  };
  return { title, slug, data: next, notes };
}

function isFailure(v: Validated | ActionResult<never>): v is ActionResult<never> {
  return "ok" in v;
}

function invalidate(collection: CollectionId, slugs: string[]) {
  updateTag(cmsTags.collection(collection));
  for (const slug of new Set(slugs)) updateTag(cmsTags.entry(collection, slug));
}

function saved(row: EntryRow, notes: string[] = []): SavedEntry {
  return {
    id: row.id,
    slug: row.slug,
    status: row.status,
    publishAt: row.publishAt ? row.publishAt.toISOString() : null,
    updatedAt: row.updatedAt.toISOString(),
    updatedBy: row.updatedBy,
    notes,
  };
}

const NOT_CONNECTED = "The database isn't connected yet, so nothing can be saved.";

function isUniqueViolation(e: unknown): boolean {
  const err = e as { code?: string; cause?: { code?: string }; message?: string };
  return err?.code === "23505" || err?.cause?.code === "23505" || /duplicate key|unique constraint/i.test(err?.message ?? "");
}

async function persist(id: string | null, input: EntryInput, transition: Transition): Promise<ActionResult> {
  const editor = await requireEditor();
  if (!hasDatabase) return fail(NOT_CONNECTED);
  if (input?.collection !== "updates" && input?.collection !== "legal") return fail("Unknown collection.");

  const existing = id ? await getEntryById(id) : null;
  if (id && !existing) return fail("This entry no longer exists. It may have been deleted.");
  if (existing && existing.collection !== input.collection) return fail("This entry belongs to a different collection.");
  if (existing && input.expectedUpdatedAt && new Date(input.expectedUpdatedAt).getTime() !== existing.updatedAt.getTime()) {
    return fail(`${existing.updatedBy ?? "Someone else"} saved this page while you were editing. Copy anything you need, reload, and try again.`);
  }

  let publishAt: Date | null | undefined; // undefined = leave as is
  let status: EntryRow["status"] | undefined;
  if (transition.kind === "publish") {
    status = "published";
    // Re-publishing an already-live page keeps its original publish time.
    publishAt = existing?.status === "published" && existing.publishAt && existing.publishAt.getTime() <= Date.now() ? existing.publishAt : new Date();
  } else if (transition.kind === "schedule") {
    if (!(transition.at.getTime() > Date.now())) return fail("Pick a time in the future to schedule.", { schedule: "Pick a time in the future." });
    status = "published";
    publishAt = transition.at;
  }

  const v = validate(input, existing, transition.kind === "keep" ? "draft" : transition.kind);
  if (isFailure(v)) return v;

  if (await isSlugTaken(input.collection, v.slug, existing?.id)) {
    return fail("Another page already uses that web address.", { slug: "Another page already uses this web address. Pick a different one." });
  }

  const d = db();
  try {
    let row: EntryRow;
    if (existing) {
      [row] = await d
        .update(entries)
        .set({
          slug: v.slug,
          title: v.title,
          data: v.data,
          ...(status ? { status } : {}),
          ...(publishAt !== undefined ? { publishAt } : {}),
          updatedAt: new Date(),
          updatedBy: editor.email,
        })
        .where(eq(entries.id, existing.id))
        .returning();
      invalidate(input.collection, [existing.slug, v.slug]);
    } else {
      // New updates go to the front of the collection order, new legal pages to the back.
      const [agg] = await d.select({ lo: min(entries.sortOrder), hi: max(entries.sortOrder) }).from(entries).where(eq(entries.collection, input.collection));
      const sortOrder = input.collection === "updates" ? (agg?.lo ?? 0) - 1 : (agg?.hi ?? 0) + 1;
      [row] = await d
        .insert(entries)
        .values({
          collection: input.collection,
          slug: v.slug,
          title: v.title,
          status: status ?? "draft",
          publishAt: publishAt ?? null,
          sortOrder,
          data: v.data,
          updatedBy: editor.email,
        })
        .returning();
      invalidate(input.collection, [v.slug]);
    }
    return { ok: true, value: saved(row, v.notes) };
  } catch (e) {
    if (isUniqueViolation(e)) return fail("Another page already uses that web address.", { slug: "Another page already uses this web address. Pick a different one." });
    console.error("cms save failed", e);
    return fail("Couldn't save. Check your connection and try again.");
  }
}

/** Create a new entry as a draft. */
export async function createEntry(input: EntryInput): Promise<ActionResult> {
  return persist(null, input, { kind: "keep" });
}

/** Save the fields without changing whether the entry is live. (On a live entry the changes go live with the save.) */
export async function saveDraft(id: string, input: EntryInput): Promise<ActionResult> {
  return persist(id, input, { kind: "keep" });
}

/** Save and make live now. */
export async function publish(id: string | null, input: EntryInput): Promise<ActionResult> {
  return persist(id, input, { kind: "publish" });
}

/** Save and go live at `at` (ISO string). */
export async function schedule(id: string | null, input: EntryInput, at: string): Promise<ActionResult> {
  const when = new Date(at);
  if (Number.isNaN(when.getTime())) return fail("That date and time isn't valid.", { schedule: "Pick a date and time." });
  return persist(id, input, { kind: "schedule", at: when });
}

/** Take a live or scheduled entry offline; its content is kept as a draft. */
export async function unpublish(id: string): Promise<ActionResult> {
  const editor = await requireEditor();
  if (!hasDatabase) return fail(NOT_CONNECTED);
  const existing = await getEntryById(id);
  if (!existing) return fail("This entry no longer exists.");
  const [row] = await db().update(entries).set({ status: "draft", publishAt: null, updatedAt: new Date(), updatedBy: editor.email }).where(eq(entries.id, id)).returning();
  invalidate(existing.collection, [existing.slug]);
  return { ok: true, value: saved(row) };
}

/** Permanently delete. The editor must type the exact title (checked here, not just in the dialog). */
export async function deleteEntry(id: string, typedTitle: string): Promise<ActionResult<{ collection: CollectionId }>> {
  await requireEditor();
  if (!hasDatabase) return fail(NOT_CONNECTED);
  const existing = await getEntryById(id);
  if (!existing) return fail("This entry no longer exists.");
  if ((typedTitle ?? "").trim() !== existing.title.trim()) return fail("The title you typed doesn't match, so nothing was deleted.");
  await db().delete(entries).where(eq(entries.id, id));
  invalidate(existing.collection, [existing.slug]);
  return { ok: true, value: { collection: existing.collection } };
}

/** Live "is this web address free?" check for the slug field. */
export async function isSlugAvailable(collection: CollectionId, slug: string, exceptId?: string): Promise<boolean> {
  await requireEditor();
  if (!hasDatabase || (collection !== "updates" && collection !== "legal") || !SLUG.test(slug ?? "")) return true;
  return !(await isSlugTaken(collection, slug, exceptId));
}
