import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Collage, TestimonialTicker, type TickerItem } from "@/components/home/testimonial-cards";
import { DESKTOP, HEADER_TRAVEL, TABLET } from "@/components/home/testimonial-layout";

/** Phone (<=809): three tickers ("Top", "Middle", "Bottom") */
const ROW_TOP: TickerItem[] = [
  { src: "/framer/RM9vUE10u8958D4DwrfbqBYXgU.png", w: 389, h: 96, iw: 1024, ih: 254, radius: 15 },
  { src: "/framer/dwQNDRloncL5iMpCgXkG9Nkuc7U.png", w: 471, h: 101, iw: 1024, ih: 219, radius: 15 },
  { src: "/framer/9mLvA1RPnjmcp5d19QfPqUa8.png", w: 248, h: 172, iw: 512, ih: 355, radius: 13 },
];
const ROW_MIDDLE: TickerItem[] = [
  { src: "/framer/fMhuBQ07c5jAnLDSFedWtVTs8Qw.png", w: 251, h: 152, iw: 512, ih: 310, radius: 15 },
  { src: "/framer/yyAtXI8HMelVx154r7FEaY4os.png", w: 384, h: 104, iw: 1024, ih: 277, radius: 16 },
  { src: "/framer/7WOh85dL6IaRDgJDZkVPIBIr10c.png", w: 386, h: 83, iw: 920, ih: 198, radius: 14 },
];
const ROW_BOTTOM: TickerItem[] = [
  { src: "/framer/sFdyEEGLR7PCJe1K12eOCiTsS6I.png", w: 316, h: 109, iw: 1024, ih: 354, radius: 16 },
  { src: "/framer/UW6923bLuU2dlOx8AIMNBBifIM.png", w: 464, h: 98, iw: 1024, ih: 216, radius: 13 },
  { src: "/framer/7VWwuZlFn9PN5Mqc87ZbWopQ.png", w: 462, h: 96, iw: 980, ih: 204, radius: 16 },
];

function Header() {
  return (
    <div className="flex flex-col items-center gap-[14px]">
      <h3 className="w-[394px] text-center text-balance font-display text-[40px] leading-[44px] font-semibold tracking-[1.6px] text-black lg:w-[480px] lg:text-[48px] lg:leading-[52.8px]">
        What our clients are saying
      </h3>
      <Button variant="primaryBig" href="https://use.themochi.app">
        Start Free Trial
      </Button>
    </div>
  );
}

/**
 * Framer "Testimonial Section": scattered, draggable screenshot cards around a centered heading
 * (desktop/tablet, laid out in testimonial-layout.ts), three auto-scrolling ticker rows under the
 * heading on phones.
 */
export function TestimonialSection() {
  return (
    <section className="relative flex w-full flex-col items-center overflow-clip bg-gray-25" aria-label="Testimonials">
      {/* grid background (Framer "BG", 10% opacity) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] hidden opacity-10 md:block"
        style={{ backgroundImage: "url(/framer/JURDFryDzelAGoQEdQlgWj8J8.svg)", backgroundSize: "100px 100px" }}
      />

      {/* tablet collage: 960x840 design frame, scaled to fit inside the 32px side padding */}
      <div className="relative z-[4] my-[72px] hidden w-[calc(100%-64px)] max-w-[960px] md:block lg:hidden">
        <Collage layout={TABLET}>
          <Reveal y={HEADER_TRAVEL}>
            <Header />
          </Reveal>
        </Collage>
      </div>

      {/* desktop collage: 1440x900 design frame, scaled down below 1440 and centred above it */}
      <div className="relative z-[4] hidden w-full max-w-[1440px] lg:block">
        <Collage layout={DESKTOP}>
          <Reveal y={HEADER_TRAVEL}>
            <Header />
          </Reveal>
        </Collage>
      </div>

      {/* phone */}
      <div className="flex w-full flex-col items-center gap-[48px] py-[48px] md:hidden">
        <div className="flex w-full flex-col items-center gap-[20px] overflow-clip px-[20px]">
          <h3 className="w-full max-w-[335px] text-center text-balance font-display text-[36px] leading-[39.6px] font-semibold tracking-[1.4px] text-ink">
            What our clients are saying
          </h3>
          <Button variant="primaryBig" href="https://use.themochi.app">
            Start Free Trial
          </Button>
        </div>
        <div className="flex w-full flex-col items-center gap-[24px] px-[20px]">
          <TestimonialTicker items={ROW_TOP} offset={-16} />
          <TestimonialTicker items={ROW_MIDDLE} offset={-96} />
          <TestimonialTicker items={ROW_BOTTOM} offset={-176} />
        </div>
      </div>
    </section>
  );
}
