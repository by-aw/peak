import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EntryForm } from "@/components/admin/editor/entry-form";
import { metaFromRow, valuesFromRow } from "@/components/admin/editor/form-values";
import { getCollection } from "@/components/admin/shell/collections";
import { DbNotice } from "@/components/admin/shell/db-notice";
import { requireEditor } from "@/lib/auth";
import { getEntryById } from "@/lib/cms/admin-queries";
import { hasDatabase } from "@/lib/cms/db";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Edit" };

export default async function EditEntryPage({ params }: { params: Promise<{ collection: string; id: string }> }) {
  const { collection: collectionId, id } = await params;
  const collection = getCollection(collectionId);
  if (!collection) notFound();
  await requireEditor();
  if (!hasDatabase) return <DbNotice />;
  const row = await getEntryById(id);
  if (!row || row.collection !== collection.id) notFound();
  return (
    <EntryForm
      key={row.id}
      collection={collection.id}
      collectionLabel={collection.label}
      livePath={collection.livePath("").replace(/\/$/, "")}
      initial={valuesFromRow(row)}
      meta={metaFromRow(row)}
    />
  );
}
