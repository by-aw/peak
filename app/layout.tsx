import type { Metadata } from "next";
import { fontVariables } from "./fonts";
import { Analytics } from "@/components/layout/analytics";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "The Mochi App",
  description:
    "Mochi gives your team one workspace to manage Instagram conversations, prioritize leads, and turn more DMs into booked calls.",
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
