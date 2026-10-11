import type { Update } from "@/lib/updates";
import type { LegalFile } from "@/lib/legal";

/** Collections the CMS manages. Watch / academy / audit are added here once they are scraped. */
export type CollectionId = "updates" | "legal";

export type EntryStatus = "draft" | "published";

/** Shape of `cms_entries.data` per collection: the scraped JSON minus the fields stored as columns. */
export type CollectionData = {
  updates: Omit<Update, "slug" | "title">;
  legal: Omit<LegalFile, "slug" | "title">;
};

/** Cache tags, so a save can refresh exactly the pages that read an entry. */
export const cmsTags = {
  collection: (c: CollectionId) => `cms:${c}`,
  entry: (c: CollectionId, slug: string) => `cms:${c}:${slug}`,
};
