import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FeatureBackground } from "@/components/shared/feature-background";
import { LegalDocument } from "@/components/pages/legal/document";
import { getAllLegalSlugs, getLegalEntry } from "@/lib/legal";
import { PreviewBanner } from "@/components/admin/preview-banner";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getAllLegalSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getLegalEntry(slug);
  if (!entry) return {};
  const path = `/legal/${slug}`;
  return {
    title: entry.metaTitle,
    description: entry.description,
    alternates: { canonical: path },
    openGraph: { type: "website", url: path, title: entry.metaTitle, description: entry.description, images: [{ url: "/og-image.png", width: 3600, height: 1890 }] },
  };
}

/**
 * /legal/<slug>: the Framer "Legal" CMS template (Terms of Service, Data Privacy Policy). Same cloud strip behind the
 * top as the feature pages; the spacer stands in for Framer's in-flow nav placeholder (68px phone, 82px tablet/desktop).
 */
export default async function LegalPage({ params }: Props) {
  const { slug } = await params;
  const entry = await getLegalEntry(slug);
  if (!entry) notFound();
  return (
    <>
      <PreviewBanner path={`/legal/${slug}`} />
      <FeatureBackground />
      <div aria-hidden className="h-[68px] w-full md:h-[82px]" />
      <LegalDocument entry={entry} />
    </>
  );
}
