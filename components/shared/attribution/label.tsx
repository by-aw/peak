import { Reveal } from "@/components/ui/reveal";
import { CONTAINER, WRAPPER, line } from "./grid";

export type LabelItem = { title: string; description: string };

/** Three-up benefit strip (Framer "Label Section"); stacks on phone. */
export function LabelSection({ items }: { items: LabelItem[] }) {
  return (
    <section className="flex w-full flex-col items-center">
      <div className={WRAPPER}>
        <div className={`${CONTAINER} ${line("after:border-x")} overflow-hidden py-12 md:py-16`}>
          <div className={`${line("after:border-y")} flex w-full flex-col bg-white md:flex-row md:gap-8`}>
            {items.map((item, i) => (
              <Reveal
                key={item.title}
                y={64 + i * 16}
                delay={0.2}
                className={`flex flex-col items-center p-8 md:flex-1 md:basis-0 ${i < items.length - 1 ? "relative after:pointer-events-none after:absolute after:inset-0 after:border-b after:border-r after:border-[#ddd] md:after:border-b-0" : ""}`}
              >
                <div className="flex w-full flex-col items-center gap-2">
                  <p className="text-center text-[15px] font-semibold leading-[21.75px] tracking-[-0.15px] whitespace-pre-wrap text-ink-3 md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px]">{item.title}</p>
                  <p className="text-center text-[14px] font-normal leading-[18.2px] whitespace-pre-wrap text-gray-750 md:leading-[16.8px]">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
