import Image from "next/image";
import { StackButton } from "./stack-button";

/**
 * "You already built something great / Now let's scale it" card shown under the Updates list and
 * under every post: 1000px, 24px radius, sky background with two product screenshots pinned to the
 * sides (tablet/desktop) or above/below the copy (phone), and a white "Book a Demo" button.
 */
export function ScaleCta() {
  return (
    <section className="flex w-full flex-col items-center gap-2.5 overflow-clip px-4 pb-[120px] md:px-8">
      <div className="relative flex w-full max-w-[1000px] items-center justify-center gap-2.5 overflow-hidden rounded-[24px] pt-[236px] pb-[248px] md:py-24">
        <Image src="/framer/K6TBkavRnT2DizJY7Nt9nWutp4.png" alt="" fill sizes="(min-width: 810px) 1000px, 100vw" className="rounded-[24px] object-cover" />
        <div aria-hidden className="absolute top-[48px] left-[-5px] z-[1] hidden h-[476px] w-[258px] overflow-hidden md:block lg:left-0">
          <Image src="/framer/52W31FOaLs6W7NKOHmSlZ2X0.png" alt="" width={645} height={1055} sizes="258px" className="h-full w-full object-contain" />
        </div>
        <div aria-hidden className="absolute top-[67px] right-[-4.5px] z-[1] hidden h-[436px] w-[247px] overflow-hidden md:block lg:right-[0.5px]">
          <Image src="/framer/I87Ug128fa8K6fx750snBFZvJI.png" alt="" width={544} height={961} sizes="247px" className="h-full w-full object-contain" />
        </div>
        <div aria-hidden className="absolute top-[28.5px] left-[-5px] z-[1] h-[260px] w-[369px] overflow-hidden md:hidden">
          <Image src="/framer/4lN08c9Hmc4l418JFXVf2ErSSg.png" alt="" width={880} height={577} sizes="369px" className="h-full w-full object-contain" />
        </div>
        <div aria-hidden className="absolute top-[588.5px] left-0 z-[1] h-[283px] w-[365px] overflow-hidden md:hidden">
          <Image src="/framer/QDE6eoHOk9aJcH7dIXVqIG29m4Y.png" alt="" width={880} height={641} sizes="365px" className="h-full w-full object-contain" />
        </div>
        <div className="relative z-[2] flex w-full flex-col items-center gap-[61px] px-4 md:px-8">
          <div className="flex flex-col items-center gap-8">
            <p className="font-display w-[326px] text-center text-[36px] leading-[43.2px] font-bold tracking-[0.72px] whitespace-pre-wrap text-black md:w-[400px] md:text-[42px] md:leading-[50.4px] md:tracking-[0.84px]">
              <strong>
                You already built
                <br />
                something great
                <br />
                Now let’s scale it
              </strong>
            </p>
            <p className="w-[326px] text-center text-[20px] leading-8 font-normal whitespace-pre-wrap text-gray-750 md:w-[353px]">
              You get the team to install it.
              <br />
              You get the tool to run it.
              <br />
              You get the AI to make it bulletproof.
            </p>
          </div>
          <StackButton variant="white" href="/" className="gap-2">
            Book a Demo
          </StackButton>
        </div>
      </div>
    </section>
  );
}
