import localFont from "next/font/local";

/**
 * Poppins (Google Fonts, latin subset; 400/600/700/800), the face of the /book-dm-audit embed, which Framer shows as raw
 * HTML with its own Poppins stylesheet. Only that page uses it, so it is loaded here instead of in `app/fonts.ts`.
 */
export const poppins = localFont({
  display: "swap",
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
  src: [
    { path: "../../../public/fonts/Poppins-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../../public/fonts/Poppins-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../../../public/fonts/Poppins-700-normal.woff2", weight: "700", style: "normal" },
    { path: "../../../public/fonts/Poppins-800-normal.woff2", weight: "800", style: "normal" },
  ],
});
