import type { EntryRow } from "@/lib/cms/schema";
import { Badge } from "@/components/admin/ui/badge";

const fmt = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" });

const STYLES = {
  draft: "border-transparent bg-secondary text-secondary-foreground",
  published: "border-transparent bg-green-100 text-green-800",
  scheduled: "border-transparent bg-blue-100 text-blue-800",
} as const;

export function StatusBadge({ entry, state }: { entry: Pick<EntryRow, "publishAt">; state: "draft" | "published" | "scheduled" }) {
  const label = state === "scheduled" && entry.publishAt ? `Scheduled for ${fmt.format(entry.publishAt)} UTC` : state[0].toUpperCase() + state.slice(1);
  return <Badge className={STYLES[state]}>{label}</Badge>;
}
