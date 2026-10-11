import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EntryForm } from "@/components/admin/editor/entry-form";
import { emptyValues } from "@/components/admin/editor/form-values";
import { getCollection } from "@/components/admin/shell/collections";
import { DbNotice } from "@/components/admin/shell/db-notice";
import { requireEditor } from "@/lib/auth";
import { hasDatabase } from "@/lib/cms/db";
import { selectOptions } from "@/lib/cms/field-options";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "New" };

export default async function NewEntryPage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection: collectionId } = await params;
  const collection = getCollection(collectionId);
  if (!collection) notFound();
  await requireEditor();
  if (!hasDatabase) return <DbNotice />;
  return (
    <EntryForm
      collection={collection.id}
      collectionLabel={collection.label}
      livePath={collection.livePath("").replace(/\/$/, "")}
      initial={emptyValues(collection.id)}
      options={selectOptions()}
      meta={null}
    />
  );
}
