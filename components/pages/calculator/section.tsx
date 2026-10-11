import { Calculator } from "./calculator";

/**
 * /calculator body (Framer "calculator"): 69px above and below, 32px side padding (16px on phone), content
 * capped at 1000px. The wide calculator shows from 1220px, the stacked one below that.
 */
export function CalculatorSection() {
  return (
    <section className="flex w-full flex-col items-center overflow-hidden px-4 py-[69px] md:px-8">
      <div className="w-full max-w-[1000px]">
        <Calculator />
      </div>
    </section>
  );
}
