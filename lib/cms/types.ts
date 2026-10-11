import type { AcademyFile } from "@/lib/academy";
import type { AuditFile } from "@/lib/audit";
import type { LegalFile } from "@/lib/legal";
import type { Update } from "@/lib/updates";
import type { WatchFile } from "@/lib/watch";

/** Collections the CMS manages. */
export const COLLECTION_IDS = ["updates", "legal", "watch", "academy", "audit"] as const;
export type CollectionId = (typeof COLLECTION_IDS)[number];

export function isCollectionId(v: unknown): v is CollectionId {
  return typeof v === "string" && (COLLECTION_IDS as readonly string[]).includes(v);
}

export type EntryStatus = "draft" | "published";

/** Shape of `cms_entries.data` per collection: the scraped JSON minus the fields stored as columns. */
export type CollectionData = {
  updates: Omit<Update, "slug" | "title">;
  legal: Omit<LegalFile, "slug" | "title">;
  watch: Omit<WatchFile, "slug" | "title">;
  academy: Omit<AcademyFile, "slug" | "title">;
  audit: Omit<AuditFile, "slug" | "title">;
};

/** Cache tags, so a save can refresh exactly the pages that read an entry. */
export const cmsTags = {
  collection: (c: CollectionId) => `cms:${c}`,
  entry: (c: CollectionId, slug: string) => `cms:${c}:${slug}`,
};
