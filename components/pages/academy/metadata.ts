import type { Metadata } from "next";

const TITLE = "The Mochi App";
const DESCRIPTION =
  "Mochi gives your team one workspace to manage conversations, prioritize buyers, follow up faster, and see what is actually happening in your inbox.";

/**
 * Live academy pages carry the site defaults (title, description, og image); only canonical and og:url change per page.
 * `openGraph` is shallow-merged with the root layout's, so it is spelled out in full here.
 */
export function academyMetadata(path: string): Metadata {
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: path },
    openGraph: { type: "website", url: path, title: TITLE, description: DESCRIPTION, images: [{ url: "/og-image.png", width: 3600, height: 1890 }] },
  };
}
