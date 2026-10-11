import Link from "next/link";
import { notFound } from "next/navigation";
import { requireEditor } from "@/lib/auth";
import { DatabaseNotConnectedError, entryState, listEntries, type StatusFilter } from "@/lib/cms/admin-queries";
import { getCollection } from "@/components/admin/shell/collections";
import { DbNotice } from "@/components/admin/shell/db-notice";
import { StatusBadge } from "@/components/admin/shell/status-badge";

export const dynamic = "force-dynamic";

const STATUSES: StatusFilter[] = ["draft", "published", "scheduled"];
const fmt = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" });

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ collection: string }>;
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { collection: id } = await params;
  const collection = getCollection(id);
  if (!collection) notFound();
  await requireEditor();
  const sp = await searchParams;
  const q = sp.q?.trim() ?? "";
  const status = STATUSES.find((s) => s === sp.status);

  let rows;
  try {
    rows = await listEntries(collection.id, { q, status });
  } catch (e) {
    if (e instanceof DatabaseNotConnectedError) return <DbNotice />;
    throw e;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">{collection.label}</h1>
        <Link href={`/admin/${collection.id}/new`} className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700">
          New entry
        </Link>
      </div>

      <form className="mt-6 flex flex-wrap gap-2" role="search">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search title or slug"
          className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
        />
        <select name="status" defaultValue={status ?? ""} className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm" aria-label="Status">
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
        <button type="submit" className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100">Filter</button>
      </form>

      {rows.length === 0 ? (
        <p className="mt-8 text-sm text-gray-600">No entries found.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-200 bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-gray-200 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Last updated</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const state = entryState(r);
                return (
                  <tr key={r.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-25">
                    <td className="px-4 py-3">
                      <Link href={`/admin/${collection.id}/${r.id}`} className="font-medium text-ink hover:text-purple-700">{r.title}</Link>
                      <div className="text-xs text-gray-500">/{r.slug}</div>
                    </td>
                    <td className="px-4 py-3"><StatusBadge entry={r} state={state} /></td>
                    <td className="px-4 py-3 text-gray-600">
                      {fmt.format(r.updatedAt)} UTC
                      {r.updatedBy && <div className="text-xs text-gray-500">by {r.updatedBy}</div>}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {state === "published" && (
                        <a href={collection.livePath(r.slug)} target="_blank" rel="noreferrer" className="text-purple-700 hover:underline">View live</a>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
