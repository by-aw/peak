import { SiteNav } from "@/components/layout/site-nav";
import { CtaSection } from "@/components/layout/cta-section";
import { Footer } from "@/components/layout/footer";

/**
 * Route group for the pages converted from Framer that have not yet been
 * through a design refinement pass. Mirrors the Framer page root: relative,
 * white, overflow-clipped column; fixed nav; page sections; shared CTA + footer.
 */
export default function NotRefinedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-[900px] w-full flex-col items-center overflow-clip bg-white">
      <SiteNav />
      <main className="relative z-[6] flex w-full flex-col items-center">{children}</main>
      <CtaSection />
      <Footer />
    </div>
  );
}
