import Link from "next/link";
import { ExternalLink, FileText, Plus } from "lucide-react";
import { notFound } from "next/navigation";
import { requireEditor } from "@/lib/auth";
import { DatabaseNotConnectedError, entryState, listEntries, type StatusFilter } from "@/lib/cms/admin-queries";
import { getCollection } from "@/components/admin/shell/collections";
import { DbNotice } from "@/components/admin/shell/db-notice";
import { StatusBadge } from "@/components/admin/shell/status-badge";
import { ListFilters } from "@/components/admin/shell/list-filters";
import { Button } from "@/components/admin/ui/button";
import { Card } from "@/components/admin/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/table";

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
        <Button asChild>
          <Link href={`/admin/${collection.id}/new`}><Plus /> New entry</Link>
        </Button>
      </div>

      <div className="mt-6">
        <ListFilters q={q} status={status} />
      </div>

      {rows.length === 0 ? (
        <Card className="mt-6 items-center gap-2 py-12 text-center">
          <FileText aria-hidden className="size-8 text-muted-foreground" />
          <p className="font-medium">No entries found.</p>
          <p className="text-sm text-muted-foreground">{q || status ? "Try a different search or filter." : "Create the first one with New entry."}</p>
        </Card>
      ) : (
        <Card className="mt-6 overflow-hidden py-0">
          <Table className="min-w-[640px]">
            <TableHeader>
              <TableRow>
                <TableHead className="px-4">Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last updated</TableHead>
                <TableHead className="pr-4" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => {
                const state = entryState(r);
                return (
                  <TableRow key={r.id}>
                    <TableCell className="px-4 whitespace-normal">
                      <Link href={`/admin/${collection.id}/${r.id}`} className="font-medium hover:text-primary">{r.title}</Link>
                      <div className="text-xs text-muted-foreground">/{r.slug}</div>
                    </TableCell>
                    <TableCell><StatusBadge entry={r} state={state} /></TableCell>
                    <TableCell className="text-muted-foreground">
                      {fmt.format(r.updatedAt)} UTC
                      {r.updatedBy && <div className="text-xs">by {r.updatedBy}</div>}
                    </TableCell>
                    <TableCell className="pr-4 text-right">
                      {state === "published" && (
                        <Button asChild variant="link" size="sm">
                          <a href={collection.livePath(r.slug)} target="_blank" rel="noreferrer">View live <ExternalLink /></a>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
