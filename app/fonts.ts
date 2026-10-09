import localFont from "next/font/local";

/**
 * Self-hosted fonts mirroring the Framer site.
 * Files live in /public/fonts and were taken from the published site
 * (Inter and Open Runde from framerusercontent, Clash Display from Fontshare,
 * Geist Mono from Google Fonts).
 */
export const inter = localFont({
  variable: "--font-inter",
  display: "swap",
  src: [
    { path: "../public/fonts/Inter-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Inter-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../public/fonts/Inter-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Inter-500-italic.woff2", weight: "500", style: "italic" },
    { path: "../public/fonts/Inter-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/Inter-600-italic.woff2", weight: "600", style: "italic" },
    { path: "../public/fonts/Inter-700-normal.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/Inter-700-italic.woff2", weight: "700", style: "italic" },
  ],
});

export const clashDisplay = localFont({
  variable: "--font-clash",
  display: "swap",
  src: [
    { path: "../public/fonts/ClashDisplay-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/ClashDisplay-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/ClashDisplay-700-normal.woff2", weight: "700", style: "normal" },
  ],
});

export const openRunde = localFont({
  variable: "--font-open-runde",
  display: "swap",
  src: [
    { path: "../public/fonts/OpenRunde-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/OpenRunde-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/OpenRunde-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/OpenRunde-700-normal.woff2", weight: "700", style: "normal" },
  ],
});

export const geistMono = localFont({
  variable: "--font-geist-mono",
  display: "swap",
  src: [
    { path: "../public/fonts/GeistMono-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/GeistMono-500-italic.woff2", weight: "500", style: "italic" },
    { path: "../public/fonts/GeistMono-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/GeistMono-700-normal.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/GeistMono-700-italic.woff2", weight: "700", style: "italic" },
  ],
});

export const fontVariables = [inter.variable, clashDisplay.variable, openRunde.variable, geistMono.variable].join(" ");
