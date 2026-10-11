import type { Metadata } from "next";
import { DemoFormPage } from "@/components/pages/demo/form-page";

const TITLE = "Demo";
const DESCRIPTION =
  "Mochi gives your team one workspace to manage conversations, prioritize buyers, follow up faster, and see what is actually happening in your inbox.";
const PATH = "/demo-jia";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: "website", url: PATH, title: TITLE, description: DESCRIPTION, images: [{ url: "/og/demo.png", width: 1200, height: 630 }] },
};

export default function DemoJiaPage() {
  return <DemoFormPage formId="demo-jia" />;
}
