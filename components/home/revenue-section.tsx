import { RevenueDesktop } from "./revenue-desktop";
import { RevenueMobile } from "./revenue-mobile";

/**
 * Framer "Revenue Section" of the home page.
 * - phone: the same tabs, with phone crops of the screens and no CTA (see RevenueMobile)
 * - tablet / desktop: tabbed product mockup with header and CTA (see RevenueDesktop)
 */
export function RevenueSection() {
  return (
    <section className="flex w-full items-center justify-center overflow-clip">
      <div className="flex w-full flex-1 items-center justify-center px-5 py-12 md:px-8 md:py-16 lg:px-[100px] lg:py-20">
        <div className="flex w-full max-w-[1000px] flex-1 flex-col items-center gap-8 md:gap-12">
          {/* phone */}
          <div className="w-full md:hidden">
            <RevenueMobile />
          </div>
          {/* tablet / desktop */}
          <div className="hidden w-full md:block">
            <RevenueDesktop />
          </div>
        </div>
      </div>
    </section>
  );
}
