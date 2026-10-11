import localFont from "next/font/local";

/**
 * Framer's "Inter Variable" (latin subset; opsz + wght axes), the face of the Legal pages' intro paragraphs:
 * 14px at `opsz 14 / wght 450`, a touch heavier and wider than the static Inter used everywhere else.
 */
export const interVariable = localFont({
  variable: "--font-inter-variable",
  display: "swap",
  src: [{ path: "../../../public/fonts/InterVariable-latin-normal.woff2", weight: "100 900", style: "normal" }],
});
