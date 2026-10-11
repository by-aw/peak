import Link from "next/link";
import { countByState, DatabaseNotConnectedError } from "@/lib/cms/admin-queries";
import { requireEditor } from "@/lib/auth";
import { COLLECTIONS } from "@/components/admin/shell/collections";
import { DbNotice } from "@/components/admin/shell/db-notice";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  await requireEditor();
  let counts;
  try {
    counts = await Promise.all(COLLECTIONS.map((c) => countByState(c.id)));
  } catch (e) {
    if (e instanceof DatabaseNotConnectedError) return <DbNotice />;
    throw e;
  }
  return (
    <div>
      <h1 className="text-2xl font-semibold">What would you like to edit?</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {COLLECTIONS.map((c, i) => (
          <Link key={c.id} href={`/admin/${c.id}`} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:border-purple-300">
            <h2 className="text-lg font-semibold">{c.label}</h2>
            <p className="mt-1 text-sm text-gray-600">{c.blurb}</p>
            <p className="mt-4 text-sm text-gray-800">
              {counts[i].published} published · {counts[i].draft} drafts · {counts[i].scheduled} scheduled
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
