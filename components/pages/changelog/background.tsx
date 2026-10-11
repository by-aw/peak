/**
 * Framer "BG" layer: a vertical gradient, sky blue to lavender to white. Framer paints it over the whole page
 * (nav to footer, lavender at 50% and white at 85% of the document); the route-group layout keeps the CTA and
 * footer on plain white, so here it fills `<main>` only and reaches white at its bottom edge (lavender stop
 * moved to 71%, where it sits on live at 1440).
 */
export function ChangelogBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,#adddff_0%,rgb(244,233,255)_71.3%,#fff_100%)]"
    />
  );
}
