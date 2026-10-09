import Image from "next/image";
import { SkyOverscroll } from "./sky-overscroll";

/**
 * Base sky: the average colour of each row of Framer's "Sky Background" strip, without its grain, painted clouds
 * and horizon, fading to white like the strip does (361px → 475px). The 50% layer on top only blends with
 * white without it, which leaves the sky washed out.
 */
const baseSky =
  "bg-[linear-gradient(#57baef_0px,#5bbff5_25px,#6bc9fd_50px,#91d6fd_75px,#a4ddfd_100px,#bae7fe_125px,#c9eefe_150px,#d5f2ff_175px,#d7f4ff_250px,#e1f7ff_361px,#fff_456px)]";

/**
 * Sky behind the hero: the base sky above, then the Figma mochi-web-v2 "background" (node 304:2249) on top:
 * a blue-to-white gradient with the cloud image, all at 50% opacity, faded out at the bottom (449px of 563px in
 * Figma, kept proportional on phone). It fades to transparent rather than to white so that on phone, where this
 * layer is shorter than the base sky, it dissolves into the base instead of leaving a pale band with a hard edge.
 * Absolutely positioned at the top of the page: the parent (page main wrapper) must be `relative`,
 * and the page content must sit above `z-[1]` (Framer wraps the sections in a `z-[2]` container).
 */
export function SkyBackground() {
  return (
    <>
      <SkyOverscroll />
      {/* data-sky-background turns the html background sky blue for the overscroll area above the page (app/globals.css) */}
      <div
        aria-hidden
        data-sky-background
        className={`pointer-events-none absolute inset-x-0 top-0 z-0 h-[475px] ${baseSky}`}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] aspect-[2/1] overflow-clip bg-linear-to-b from-[#3fb5f4] to-white opacity-50 [mask-image:linear-gradient(#000_79.75%,transparent_96.6%)] md:aspect-auto md:h-[563px]"
      >
        <div className="absolute -top-[10px] left-0 aspect-[2/1] w-full">
          <Image
            src="/framer/7PQ7OQVSA5ymolSKHxCMTc6moc.png"
            alt=""
            width={2880}
            height={1440}
            preload
            sizes="100vw"
            className="h-full w-full"
          />
        </div>
      </div>
    </>
  );
}
