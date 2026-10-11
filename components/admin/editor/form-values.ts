import { blocksToEditorHtml, legalToEditorHtml, toDay, type StoredBlock } from "@/lib/cms/blocks";
import type { EntryRow } from "@/lib/cms/schema";
import type { CollectionData, CollectionId } from "@/lib/cms/types";

/** Everything the form edits, as plain strings/numbers so it can cross the server -> client boundary. */
export type FormValues = {
  title: string;
  slug: string;
  /** Editor HTML */
  content: string;
  // updates
  label: string;
  version: string;
  date: string;
  excerpt: string;
  metaTitle: string;
  description: string;
  coverSrc: string;
  coverWidth: number | null;
  coverHeight: number | null;
  coverAlt: string;
  /** Empty = same as the cover image */
  ogImage: string;
  // legal
  effectiveDate: string;
  lastUpdated: string;
  /** Editor HTML */
  intro: string;
};

export type EntryMeta = {
  id: string;
  status: "draft" | "published";
  publishAt: string | null;
  updatedAt: string;
  updatedBy: string | null;
};

const today = () => new Date().toISOString().slice(0, 10);

export function emptyValues(collection: CollectionId): FormValues {
  return {
    title: "",
    slug: "",
    content: "",
    label: "Blog",
    version: "",
    date: collection === "updates" ? today() : "",
    excerpt: "",
    metaTitle: "",
    description: "",
    coverSrc: "",
    coverWidth: null,
    coverHeight: null,
    coverAlt: "",
    ogImage: "",
    effectiveDate: collection === "legal" ? today() : "",
    lastUpdated: collection === "legal" ? today() : "",
    intro: "",
  };
}

export function valuesFromRow(row: EntryRow): FormValues {
  const base = { ...emptyValues(row.collection), title: row.title, slug: row.slug };
  if (row.collection === "updates") {
    const d = row.data as CollectionData["updates"];
    return {
      ...base,
      content: blocksToEditorHtml((d.blocks ?? []) as StoredBlock[]),
      label: d.label ?? "Blog",
      version: d.version ?? "",
      date: toDay(d.date),
      excerpt: d.excerpt ?? "",
      metaTitle: d.metaTitle ?? "",
      description: d.description ?? "",
      coverSrc: d.cover?.src ?? "",
      coverWidth: d.cover?.width ?? null,
      coverHeight: d.cover?.height ?? null,
      coverAlt: d.cover?.alt ?? "",
      ogImage: d.ogImage && d.ogImage !== d.cover?.src ? d.ogImage : "",
    };
  }
  const d = row.data as CollectionData["legal"];
  return {
    ...base,
    content: legalToEditorHtml(d.body ?? ""),
    intro: legalToEditorHtml(d.intro ?? ""),
    metaTitle: d.metaTitle ?? "",
    description: d.description ?? "",
    effectiveDate: toDay(d.effectiveDate),
    lastUpdated: toDay(d.lastUpdated),
  };
}

export function metaFromRow(row: EntryRow): EntryMeta {
  return {
    id: row.id,
    status: row.status,
    publishAt: row.publishAt ? row.publishAt.toISOString() : null,
    updatedAt: row.updatedAt.toISOString(),
    updatedBy: row.updatedBy,
  };
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100)
    .replace(/-+$/g, "");
}
