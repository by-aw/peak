import type { EntryRow } from "@/lib/cms/schema";

const fmt = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" });

export function StatusBadge({ entry, state }: { entry: Pick<EntryRow, "publishAt">; state: "draft" | "published" | "scheduled" }) {
  const styles = { draft: "bg-gray-100 text-gray-700", published: "bg-green-100 text-green-800", scheduled: "bg-blue-100 text-blue-800" }[state];
  const label = state === "scheduled" && entry.publishAt ? `Scheduled for ${fmt.format(entry.publishAt)} UTC` : state[0].toUpperCase() + state.slice(1);
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${styles}`}>{label}</span>;
}
