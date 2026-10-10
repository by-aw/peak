import { Reveal } from "@/components/ui/reveal";
import { CONTAINER, LEAD, WRAPPER, line } from "./grid";

/** Centred closing paragraph(s) between the two horizontal grid lines (Framer "Summary Section"); several paragraphs stack with a 20px gap. The 872px paragraph box is left-anchored inside the padded area (text centred within it), as in Framer. */
export function SummarySection({ text }: { text: string | string[] }) {
  const paragraphs = Array.isArray(text) ? text : [text];
  return (
    <section className="flex w-full flex-col items-center overflow-hidden">
      <Reveal y={64} delay={0.2} className={`${WRAPPER} ${line("after:border-y")} overflow-hidden`}>
        <div className={`${CONTAINER} ${line("after:border-x")} flex overflow-hidden`}>
          <div className={`${line("after:border-y")} flex w-full items-start gap-2 overflow-hidden p-8 md:p-16`}>
            <div className="flex w-full flex-col items-start gap-5">
              {paragraphs.map((paragraph) => (
                <p key={paragraph} className={`${LEAD} w-full max-w-[872px] whitespace-pre-wrap`}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
