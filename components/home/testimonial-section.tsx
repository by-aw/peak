import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { DraggableCard, TestimonialTicker, type TickerItem } from "@/components/home/testimonial-cards";

/* ---------- collage data (Framer "Testimonial 1..17", pins relative to the container) ---------- */

type Card = {
  src: string;
  iw: number;
  ih: number;
  radius: number;
  /** top right bottom left (px) */
  inset: [number, number, number, number];
  rotate?: number;
  x?: number;
  y?: number;
  cover?: boolean;
  zIndex?: number;
  /** Testimonial 5: white card with the screenshot sitting on top and a white strip underneath */
  whiteCard?: { bottom: number };
};

const IMG = {
  t1: { src: "/framer/DtANT6bFQlpZuXzuhVNYxXklxQk.png", iw: 1456, ih: 504 },
  t2: { src: "/framer/2AOLgWiwzCRsAtTK7n7YqPq1G0.png", iw: 1470, ih: 364 },
  t3: { src: "/framer/cc8KiiYWBuc8jYeqNEzCUiUxrQ.png", iw: 1528, ih: 414 },
  t4: { src: "/framer/JlRznfwc550EAUJPGTdtlK2WQ.png", iw: 2040, ih: 436 },
  t5: { src: "/framer/SwBsJYgdsawOf0TgYsXnJNbHHE.png", iw: 1134, ih: 482 },
  t6: { src: "/framer/efGDh1G9h8DD1jlzYWfuReoYZoY.png", iw: 594, ih: 412 },
  t7: { src: "/framer/QkDidtuG2a1AIqQ9HVQqdu0TPfA.png", iw: 920, ih: 198 },
  t8: { src: "/framer/xKgw3XD4zMLF0IofIAf2qZUXZc.png", iw: 948, ih: 170 },
  t9: { src: "/framer/MDc4MjN9hcLugSCWaAE6dameivE.png", iw: 2204, ih: 464 },
  t10: { src: "/framer/rUEiPBcpe79tsvf4zAd9nLUQBe0.png", iw: 980, ih: 204 },
  t11: { src: "/framer/CzrcuMb5LXvoHKYFk0MDpq1ldHo.png", iw: 2204, ih: 412 },
  t12: { src: "/framer/AVhWX7na6TeayMR8JXtaTY5Rw.png", iw: 1152, ih: 190 },
  t13: { src: "/framer/royuDWS0OFOKk1oxEoEEqPu0g.png", iw: 1128, ih: 684 },
  t14: { src: "/framer/l6oM9elrD2mQ2Av9mV0Lwk8hvb0.png", iw: 1536, ih: 653 },
  t15: { src: "/framer/RP5BKVGq6xcFKtL7ShukoVbs.png", iw: 1536, ih: 512 },
  t16: { src: "/framer/FZWQ9CS5KRiLcDwgf6RNbMVsZY4.png", iw: 1024, ih: 924 },
  t17: { src: "/framer/2ihdTVmEcn7YmLbOlwMdPtkLkIk.png", iw: 1422, ih: 1024 },
};

/** Desktop (>=1200): container 1440x900 */
const DESKTOP: Card[] = [
  { ...IMG.t1, radius: 16, inset: [211, 1102, 579.625, 22] },
  { ...IMG.t2, radius: 13, inset: [55, 331, 748.594, 720], x: -194.5, cover: true },
  { ...IMG.t3, radius: 16, inset: [468, 1024, 328.016, 32], y: -51.992, cover: true },
  { ...IMG.t4, radius: 15, inset: [191, 476.109, 608, 492.891] },
  { ...IMG.t5, radius: 12, inset: [648, 56, 97, 1078], y: -77.5, rotate: -3, cover: true, whiteCard: { bottom: 24.594 } },
  { ...IMG.t6, radius: 13, inset: [-11, -12, 739, 1204], rotate: 7, cover: true },
  { ...IMG.t7, radius: 14, inset: [610.938, 1016, 206, 38], rotate: 5, cover: true },
  { ...IMG.t8, radius: 16, inset: [788.016, 962, 31, 24], rotate: -2, cover: true },
  { ...IMG.t9, radius: 13, inset: [475, -26, 327, 1002], rotate: 1 },
  { ...IMG.t10, radius: 16, inset: [240, -143, 564, 1121], rotate: 7, cover: true },
  { ...IMG.t11, radius: 16, inset: [770, 91, 27, 798], rotate: 2 },
  { ...IMG.t12, radius: 14, inset: [667.391, 343.812, 166, 691.188], x: -202.5, rotate: -4, cover: true },
  { ...IMG.t13, radius: 15, inset: [28, 1084, 719.812, 105], rotate: -3 },
  { ...IMG.t14, radius: 14, inset: [342, -88, 425.391, 1216], rotate: -2, cover: true },
  { ...IMG.t15, radius: 12, inset: [710.672, 1204, 120, 28], rotate: -2, cover: true },
  { ...IMG.t16, radius: 12, inset: [134, 212, 585.438, 1028], cover: true, zIndex: 5 },
  { ...IMG.t17, radius: 12, inset: [234, 1016, 492.359, 182], rotate: -8, cover: true, zIndex: 5 },
];

/** Tablet (810-1199): container 960x756 (section padding 72px 32px) */
const TABLET: Card[] = [
  { ...IMG.t1, radius: 15, inset: [198, 634, 453.125, 23] },
  { ...IMG.t2, radius: 11, inset: [22, 136.406, 651.219, 489.594], x: -167, rotate: -8, cover: true },
  { ...IMG.t3, radius: 14, inset: [349, 713, 328.734, -42], rotate: -6, cover: true },
  { ...IMG.t4, radius: 11, inset: [244, 222, 435, 380] },
  { ...IMG.t5, radius: 10, inset: [521.625, 17, 106.234, 690], y: -64.07, rotate: -3, cover: true, whiteCard: { bottom: 20.328 } },
  { ...IMG.t6, radius: 10, inset: [-88, -29, 706, 790], rotate: 7, cover: true },
  { ...IMG.t7, radius: 12, inset: [379.312, 716, 316, -38], rotate: 5, cover: true },
  { ...IMG.t8, radius: 14, inset: [660.719, 582, 25, -16], rotate: -2, cover: true },
  { ...IMG.t9, radius: 11, inset: [200.672, -84, 485, 711], rotate: 4 },
  { ...IMG.t10, radius: 12, inset: [133, -62, 550.703, 674], rotate: 7, cover: true },
  { ...IMG.t11, radius: 11, inset: [567.859, 18, 116, 556], rotate: 2 },
  { ...IMG.t12, radius: 12, inset: [500.922, 601, 198, 12], rotate: -4, cover: true },
  { ...IMG.t13, radius: 12, inset: [29, 782, 604.516, -24], rotate: -3 },
  { ...IMG.t14, radius: 14, inset: [342, -88, 281.391, 736], rotate: -2, cover: true },
  { ...IMG.t15, radius: 12, inset: [566.672, 724, 120, 28], rotate: -2, cover: true },
  { ...IMG.t16, radius: 12, inset: [134, 212, 441.438, 548], cover: true, zIndex: 5 },
  { ...IMG.t17, radius: 12, inset: [234, 536, 348.359, 182], rotate: -8, cover: true, zIndex: 5 },
];

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

function Collage({ cards }: { cards: Card[] }) {
  return (
    <>
      {cards.map((c, i) => {
        const img = (
          <Image
            src={c.src}
            alt=""
            width={c.iw}
            height={c.ih}
            sizes="600px"
            draggable={false}
            className={`pointer-events-none h-full w-full select-none ${c.cover ? "object-cover" : "object-fill"}`}
            style={{ borderRadius: c.radius }}
          />
        );
        return (
          <DraggableCard key={i} inset={c.inset} radius={c.radius} rotate={c.rotate} x={c.x} y={c.y} zIndex={c.zIndex}>
            {c.whiteCard ? (
              <div className="relative h-full w-full bg-white" style={{ borderRadius: c.radius }}>
                <div className="absolute inset-x-0 top-0 overflow-hidden" style={{ bottom: c.whiteCard.bottom, borderRadius: c.radius }}>
                  {img}
                </div>
              </div>
            ) : (
              <div className="h-full w-full overflow-hidden" style={{ borderRadius: c.radius }}>
                {img}
              </div>
            )}
          </DraggableCard>
        );
      })}
    </>
  );
}

function Header() {
  return (
    <div className="flex flex-col items-center gap-[14px]">
      <h3 className="w-[394px] text-center font-display text-[40px] leading-[44px] font-semibold tracking-[1.6px] text-black lg:w-[480px] lg:text-[48px] lg:leading-[52.8px]">
        What our clients are saying
      </h3>
      <Button variant="primaryBig" href="https://use.themochi.app" className="text-[16px] leading-[23.2px] tracking-[-0.32px] lg:text-[18px] lg:leading-[26.1px] lg:tracking-[-0.36px]">
        Start Free Trial
      </Button>
    </div>
  );
}

/**
 * Framer "Testimonial Section": scattered, draggable screenshot cards around a centered heading
 * (desktop/tablet), three auto-scrolling ticker rows under the heading on phones.
 */
export function TestimonialSection() {
  return (
    <section className="relative flex w-full flex-col items-center overflow-clip bg-gray-25 md:h-[900px]" aria-label="Testimonials">
      {/* grid background (Framer "BG", 10% opacity) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] hidden opacity-10 md:block"
        style={{ backgroundImage: "url(/framer/JURDFryDzelAGoQEdQlgWj8J8.svg)", backgroundSize: "100px 100px" }}
      />

      {/* tablet collage */}
      <div className="relative z-[4] hidden h-[756px] w-full md:mx-[32px] md:my-[72px] md:block md:max-w-[960px] lg:hidden">
        <Collage cards={TABLET} />
        <div className="pointer-events-none absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 [&_a]:pointer-events-auto">
          <Reveal y={80}>
            <Header />
          </Reveal>
        </div>
      </div>

      {/* desktop collage */}
      <div className="relative z-[4] hidden h-[900px] w-full lg:block">
        <Collage cards={DESKTOP} />
        <div className="pointer-events-none absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 [&_a]:pointer-events-auto">
          <Reveal y={80}>
            <Header />
          </Reveal>
        </div>
      </div>

      {/* phone */}
      <div className="flex w-full flex-col items-center gap-[48px] py-[48px] md:hidden">
        <div className="flex w-full flex-col items-center gap-[20px] overflow-clip px-[20px]">
          <h3 className="w-full max-w-[335px] text-center font-display text-[32px] leading-[35.2px] font-semibold tracking-[1px] text-ink">
            What our clients are saying
          </h3>
          <Button variant="primaryBig" href="https://use.themochi.app" className="w-full text-[15px] leading-[21.75px] tracking-[-0.3px]">
            Start Free Trial
          </Button>
        </div>
        <div className="flex w-full flex-col items-center gap-[24px] px-[20px]">
          <TestimonialTicker items={ROW_TOP} height={95} offset={-16} />
          <TestimonialTicker items={ROW_MIDDLE} height={152} offset={-96} />
          <TestimonialTicker items={ROW_BOTTOM} height={109} offset={-176} />
        </div>
      </div>
    </section>
  );
}
