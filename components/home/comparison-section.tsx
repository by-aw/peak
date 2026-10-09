import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { APP_URL } from "@/lib/site";
import { ComparisonCards } from "./comparison-cards";

/**
 * Framer "Comparison Section": centered title (with the CTA directly under it on phone),
 * then the "Without Mochi" / "With Mochi" cards (sticky + scroll-linked on desktop).
 */
export function ComparisonSection() {
  return (
    <section className="flex w-full flex-col items-center">
      <Reveal y={80} className="flex w-full items-center justify-center overflow-clip px-5 pt-12 md:px-8 md:pt-16 lg:px-[100px] lg:pt-20">
        <div className="flex w-full max-w-[1000px] flex-1 flex-col items-center gap-6">
          <h3 className="font-display text-center text-[32px] font-semibold leading-[35.2px] tracking-[1px] text-ink whitespace-pre-wrap md:max-w-[516px] md:text-[40px] md:leading-[44px] md:tracking-[1.6px] lg:text-[48px] lg:leading-[52.8px]">
            What changes after installing Mochi
          </h3>
          <Button
            variant="primaryBig"
            href={APP_URL}
            className="w-full text-[15px] leading-[21.75px] tracking-[-0.3px] md:hidden"
          >
            Start Free Trial
          </Button>
        </div>
      </Reveal>
      <ComparisonCards />
    </section>
  );
}
