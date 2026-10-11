import type { Metadata } from "next";
import { DemoFormPage } from "@/components/pages/demo/form-page";

const TITLE = "Book a Mochi Demo | Mochi";
const DESCRIPTION = "See Mochi working on a real Instagram inbox and ask whatever you need before you decide.";
const PATH = "/demo";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: "website", url: PATH, title: TITLE, description: DESCRIPTION, images: [{ url: "/og/demo.png", width: 1200, height: 630 }] },
};

export default function DemoPage() {
  return <DemoFormPage formId="demo" />;
}
