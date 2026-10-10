import { Reveal } from "@/components/ui/reveal";
import { CONTAINER, H3, WRAPPER, line } from "./grid";
import { AttributionFaqItem } from "./faq-item";

export type FaqEntry = { question: string; answer: string };

/** Attribution template "FAQ Section": centred heading band + 700px accordion list. */
export function FaqSection({ heading, items, headingWidth = 582 }: { heading: string; items: FaqEntry[]; headingWidth?: number }) {
  return (
    <section className="flex w-full flex-col items-center">
      <div className={WRAPPER}>
        <div className={`${CONTAINER} ${line("after:border-x")} flex flex-col items-center`}>
          <Reveal y={48} delay={0.2} className={`${line("after:border-b")} flex w-full flex-col items-center gap-4 px-4 py-12 md:px-0 md:py-16`}>
            <div className="flex w-full flex-col items-center gap-2">
              <h3 className={`${H3} w-full whitespace-pre-wrap`} style={{ maxWidth: headingWidth }}>
                {heading}
              </h3>
            </div>
          </Reveal>
          <div className="flex w-full flex-col items-center overflow-clip px-4 py-10 md:px-0 md:py-12 lg:py-16">
            <Reveal y={48} delay={0.2} className="flex w-full max-w-[700px] flex-col items-center gap-2 overflow-clip">
              {items.map((item) => (
                <AttributionFaqItem key={item.question} question={item.question} answer={item.answer} />
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
