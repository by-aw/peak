import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "peak~design",
  description: "peak~design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <Head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#f0f0f0" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#101010" media="(prefers-color-scheme: dark)" />
      </Head>
      <body className="min-h-full flex flex-col items-center justify-center p-4 font-sans">{children}</body>
    </html>
  );
}
