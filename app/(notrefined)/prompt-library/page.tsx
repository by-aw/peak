import type { Metadata } from "next";
import { PromptLibraryHero } from "@/components/pages/prompt-library/hero";
import { PromptLibraryKitchen } from "@/components/pages/prompt-library/kitchen";
import { PromptLibraryList } from "@/components/pages/prompt-library/library";

// Live keeps the site-wide title and description on this page.
const TITLE = "The Mochi App";
const DESCRIPTION =
  "Mochi gives your team one workspace to manage conversations, prioritize buyers, follow up faster, and see what is actually happening in your inbox.";
const PATH = "/prompt-library";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: "website", url: PATH, title: TITLE, description: DESCRIPTION, images: [{ url: "/og-image.png", width: 3600, height: 1890 }] },
};

/** /prompt-library: Claude MCP prompt cookbook (hero, "Pick your kitchen" connect steps, filterable prompt library). */
export default function PromptLibraryPage() {
  return (
    <>
      <div aria-hidden className="h-[68px] w-full lg:h-[82px]" />
      <PromptLibraryHero />
      <PromptLibraryKitchen />
      <PromptLibraryList />
    </>
  );
}
