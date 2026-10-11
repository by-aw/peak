import type { CollectionId } from "@/lib/cms/types";

export const COLLECTIONS: { id: CollectionId; label: string; singular: string; blurb: string; livePath: (slug: string) => string }[] = [
  { id: "updates", label: "Updates", singular: "update", blurb: "Blog posts and product updates.", livePath: (s) => `/updates/${s}` },
  { id: "legal", label: "Legal", singular: "legal page", blurb: "Terms, privacy and other legal pages.", livePath: (s) => `/legal/${s}` },
  { id: "watch", label: "Watch", singular: "video", blurb: "Video pages linked from the email sequences.", livePath: (s) => `/watch/${s}` },
  { id: "academy", label: "Academy", singular: "lesson", blurb: "Academy lessons, grouped by module.", livePath: (s) => `/academy-work-in-progress/${s}` },
  { id: "audit", label: "Audits", singular: "audit report", blurb: "Mochi Intelligence Reports sent to founders.", livePath: (s) => `/audit/${s}` },
];

export function getCollection(id: string) {
  return COLLECTIONS.find((c) => c.id === id);
}
