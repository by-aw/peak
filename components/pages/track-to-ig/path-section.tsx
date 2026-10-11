import { SectionHeading, SectionText } from "./section-intro";
import { ViewerPath } from "./viewer-path";

/**
 * Framer "Section" > "Path Section": heading + copy (centred; right-aligned copy on tablet, as on the live site)
 * and the 310px-tall (539px on phone, 312px wide) interactive viewer-path embed. The wrapper has a fixed
 * height (748px, 909px on phone) with its content centred; on phone the section comes second, right after the hero.
 */
export function PathSection() {
  return (
    <section className="order-2 flex h-[909px] w-full flex-col items-center justify-center overflow-clip md:order-none md:h-[748px]">
      <div className="flex w-full flex-col items-center justify-center px-5 pt-12 pb-6 md:px-8 md:py-16 lg:px-[100px] lg:py-20">
        <div className="flex w-full max-w-[1000px] flex-col items-center gap-8 md:gap-20">
          <div className="flex w-full flex-col items-start gap-5 md:w-[482px] md:items-center md:gap-4">
            <SectionHeading className="w-full text-balance text-left md:text-wrap md:text-center">Understand the path of the viewer, to build the path to customer.</SectionHeading>
            <SectionText className="w-full text-left md:text-right lg:text-center">
              Mochi keeps every signal connected, from the moment someone watches to the moment they become revenue.
            </SectionText>
          </div>
        </div>
      </div>
      <div className="h-[539px] w-[312px] overflow-visible bg-white md:h-[310px] md:w-full">
        <ViewerPath />
      </div>
    </section>
  );
}
