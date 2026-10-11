import { blocksToEditorHtml, legalToEditorHtml, sanitizeHtml, toDay, type StoredBlock } from "@/lib/cms/blocks";
import { fieldsOf, isSpecCollection, type FieldSpec, type FieldValue, type ImageValue } from "@/lib/cms/fields";
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
  /** watch / academy / audit: one value per `FIELD_GROUPS` field, keyed like `cms_entries.data` */
  fields: Record<string, FieldValue>;
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
    fields: Object.fromEntries(fieldsOf(collection).map((f) => [f.key, emptyField(f)])),
  };
}

function emptyField(f: FieldSpec): FieldValue {
  if (f.kind === "image") return null;
  if (f.kind === "date") return today();
  return "";
}

/** Stored value -> form value (numbers and dates become strings, rich text is sanitised like the server will). */
function fieldFromData(f: FieldSpec, v: unknown): FieldValue {
  switch (f.kind) {
    case "rich":
      return sanitizeHtml(typeof v === "string" ? v : "", f.profile);
    case "number":
      return typeof v === "number" && Number.isFinite(v) ? String(v) : "";
    case "date":
      return toDay(typeof v === "string" ? v : "");
    case "image": {
      const img = v as Partial<ImageValue> | null | undefined;
      return img?.src ? { src: img.src, width: img.width ?? null, height: img.height ?? null, alt: img.alt ?? "" } : null;
    }
    default:
      return typeof v === "string" ? v : "";
  }
}

export function valuesFromRow(row: EntryRow): FormValues {
  const base = { ...emptyValues(row.collection), title: row.title, slug: row.slug };
  if (isSpecCollection(row.collection)) {
    const d = (row.data ?? {}) as Record<string, unknown>;
    return { ...base, fields: Object.fromEntries(fieldsOf(row.collection).map((f) => [f.key, fieldFromData(f, d[f.key])])) };
  }
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
