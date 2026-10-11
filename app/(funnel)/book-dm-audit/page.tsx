import type { Metadata } from "next";
import { DmAuditPage } from "@/components/pages/learn/dm-audit";

const TITLE = "The Mochi App";
const DESCRIPTION =
  "Mochi gives your team one workspace to manage conversations, prioritize buyers, follow up faster, and see what is actually happening in your inbox.";
const PATH = "/book-dm-audit";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: "website", url: PATH, title: TITLE, description: DESCRIPTION, images: [{ url: "/og-image.png", width: 3600, height: 1890 }] },
};

/** /book-dm-audit: the DM-audit booking page with no site chrome (Framer HTML embed of a self-contained page); see `DmAuditPage`. */
export default function BookDmAuditPage() {
  return <DmAuditPage />;
}
