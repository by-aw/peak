import type { Metadata } from "next";
import { fontVariables } from "./fonts";
import { Analytics } from "@/components/layout/analytics";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// Site-wide fallback (what the live 404 page shows). Each page sets its own
// `alternates.canonical` and `openGraph.url`: `openGraph` is shallow-merged, so
// an og:url here would be dropped by every page, and the 404 should get none.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "The Mochi App",
  description:
    "Mochi gives your team one workspace to manage conversations, prioritize buyers, follow up faster, and see what is actually happening in your inbox.",
  openGraph: {
    type: "website",
    siteName: "Mochi",
    images: [{ url: "/og-image.png", width: 3600, height: 1890 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, "max-image-preview": "large" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
