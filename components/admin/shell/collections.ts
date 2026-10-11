import type { CollectionId } from "@/lib/cms/types";

export const COLLECTIONS: { id: CollectionId; label: string; singular: string; blurb: string; livePath: (slug: string) => string }[] = [
  { id: "updates", label: "Updates", singular: "update", blurb: "Blog posts and product updates.", livePath: (s) => `/updates/${s}` },
  { id: "legal", label: "Legal", singular: "legal page", blurb: "Terms, privacy and other legal pages.", livePath: (s) => `/legal/${s}` },
];

export function getCollection(id: string) {
  return COLLECTIONS.find((c) => c.id === id);
}
