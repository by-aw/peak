import { Button } from "@/components/ui/button";
import { interFeatures } from "@/components/shared/inter-features";
import { Appear } from "./appear";
import { PARTNER_APPLY_URL } from "./hero";
import { leadText, sectionHeading } from "./styles";

/**
 * Framer "Form Section" (id "form", despite having no form): "Become a Mochi partner." heading, one line of copy and a dark
 * 12px-radius button to the Partner tab of the app, in a new tab. The button reads "Become a Partner" on desktop and "Start
 * Free Trial" on tablet; the live phone layout has no button at all (Framer hides both variants there), which is kept.
 * Padding 80/100 (64/48 tablet, 48/20 phone), 52px between the heading block and the button; heights 372 / 322 / 178.
 */
export function PartnerBecome() {
  return (
    <section id="form" className="relative flex w-full scroll-mt-10 flex-col items-center" aria-label="Become a partner">
      <div className="flex w-full flex-col items-center gap-[52px] px-5 py-12 md:px-12 md:py-16 lg:px-[100px] lg:py-20">
        <div className="flex w-full max-w-[1150px] flex-col items-center">
          <Appear y={48} className="flex w-full flex-col items-center gap-4">
            <div className="flex w-full flex-col items-center gap-2">
              <h3 className={`w-full text-center ${sectionHeading}`}>Become a Mochi partner.</h3>
              <p className={`w-full max-w-[354px] text-center ${leadText}`}>Already part of an active Mochi account? Share Mochi and start earning.</p>
            </div>
          </Appear>
        </div>
        <div className="hidden md:block">
          <Button
            variant="primaryBig"
            href={PARTNER_APPLY_URL}
            target="_blank"
            className={`rounded-[12px]! ${interFeatures} text-[16px]! leading-[23.2px]! tracking-[-0.32px]! lg:text-[18px]! lg:leading-[26.1px]! lg:tracking-[-0.36px]!`}
          >
            <span className="lg:hidden">Start Free Trial</span>
            <span className="hidden lg:inline">Become a Partner</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
