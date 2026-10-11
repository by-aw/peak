import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AuditReport } from "@/components/pages/audit/report";
import { getAllAuditSlugs, getAuditEntry } from "@/lib/audit";
import { PreviewBanner } from "@/components/admin/preview-banner";

type Props = { params: Promise<{ slug: string }> };

// Entries published after the build render on first request; unknown slugs 404 via notFound(). There is no /audit index (404 on live too).
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getAllAuditSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getAuditEntry(slug);
  if (!entry) return {};
  const title = `${entry.title} - The Mochi App`;
  const path = `/audit/${slug}`;
  return {
    title,
    description: entry.description,
    alternates: { canonical: path },
    openGraph: { type: "website", url: path, title, description: entry.description, images: [{ url: "/og-image.png", width: 3600, height: 1890 }] },
  };
}

/** /audit/<slug>: the Framer "Audit" CMS template (Mochi Intelligence Report), inside the site chrome like live. */
export default async function AuditPage({ params }: Props) {
  const { slug } = await params;
  const entry = await getAuditEntry(slug);
  if (!entry) notFound();
  return (
    <>
      <PreviewBanner path={`/audit/${slug}`} />
      <AuditReport entry={entry} />
    </>
  );
}
