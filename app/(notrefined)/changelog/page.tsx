import type { Metadata } from "next";
import { ChangelogBackground } from "@/components/pages/changelog/background";
import { ChangelogCard } from "@/components/pages/changelog/card";
import { changelogUrl, parseChangelogResponse, type ChangelogPage } from "@/components/pages/changelog/api";

const TITLE = "The Mochi App";
const DESCRIPTION =
  "Mochi gives your team one workspace to manage conversations, prioritize buyers, follow up faster, and see what is actually happening in your inbox.";
const PATH = "/changelog";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: "website", url: PATH, title: TITLE, description: DESCRIPTION, images: [{ url: "/og-image.png", width: 3600, height: 1890 }] },
};

/**
 * First page of the changelog (All / All), fetched on the server and refreshed every 5 minutes. If the API is
 * unreachable the client feed fetches it itself, behind the loading skeleton (what live always does).
 */
async function getFirstPage(): Promise<ChangelogPage | null> {
  try {
    const res = await fetch(changelogUrl("all", "all", 0), { next: { revalidate: 300 } });
    if (!res.ok) return null;
    return parseChangelogResponse(await res.json());
  } catch {
    return null;
  }
}

export default async function ChangelogPageRoute() {
  const initial = await getFirstPage();
  return (
    <>
      <ChangelogBackground />
      <div aria-hidden className="h-[68px] w-full md:h-[82px]" />
      <ChangelogCard initial={initial} />
    </>
  );
}
