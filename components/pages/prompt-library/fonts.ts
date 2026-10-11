import localFont from "next/font/local";

/**
 * IBM Plex Mono 700 (Google Fonts, latin subset): the Framer "code" text style that highlights the `[bracketed]`
 * placeholders inside the prompts. Only this page uses it, so it is loaded here instead of in `app/fonts.ts`.
 */
export const plexMono = localFont({
  src: "../../../public/fonts/IBMPlexMono-700-normal.woff2",
  weight: "700",
  style: "normal",
  display: "swap",
  fallback: ["monospace"],
  adjustFontFallback: false,
});
