import Image from "next/image";

/**
 * Sky behind the hero (Figma mochi-web-v2 "background", node 304:2249): a blue-to-white gradient with
 * the cloud image on top, all at 50% opacity, fading to white at the bottom.
 * Absolutely positioned at the top of the page: the parent (page main wrapper) must be `relative`,
 * and the page content must sit above `z-[1]` (Framer wraps the sections in a `z-[2]` container).
 */
export function SkyBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-[1] aspect-[2/1] overflow-clip bg-linear-to-b from-[#3fb5f4] to-white opacity-50 md:aspect-auto md:h-[563px]"
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
      {/* Bottom fade: 449px of 563px in Figma, kept proportional on phone */}
      <div className="absolute inset-x-0 top-[79.75%] bottom-0 bg-[linear-gradient(rgba(255,255,255,0)_0%,#fff_83.1731%)]" />
    </div>
  );
}
