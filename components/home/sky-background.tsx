import Image from "next/image";

const fade = "bg-[linear-gradient(rgba(255,255,255,0)_0%,#fff_83.1731%)]";

/**
 * Decorative cloud layers behind the hero (Framer "Sky Background" + "New sky background").
 * Absolutely positioned at the top of the page: the parent (page main wrapper) must be `relative`,
 * and the page content must sit above `z-[1]` (Framer wraps the sections in a `z-[2]` container).
 */
export function SkyBackground() {
  return (
    <>
      {/* Layer 1: wide cloud strip, white fade at the bottom */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[475px] overflow-clip bg-white">
        <div className="absolute -inset-x-[120px] top-0 -bottom-[69px] overflow-clip">
          <Image
            src="/framer/5N4dKUrdCCXlt9MR24ZRV8LHQ.png"
            alt=""
            width={2200}
            height={477}
            preload
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className={`absolute inset-x-0 top-[361px] bottom-0 ${fade}`} />
      </div>
      {/* Layer 2: second sky at 50% opacity with a larger cloud image bleeding off the right edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] aspect-[2.55773/1] opacity-50 md:aspect-auto md:h-[563px] md:overflow-clip"
      >
        <Image
          src="/framer/aaB1Q6YwhAmpNwBFlqSpoYyrEo.png"
          alt=""
          width={2880}
          height={1126}
          sizes="100vw"
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute top-0 left-0 aspect-[2/1] w-[calc(100%+120px)]">
          <Image
            src="/framer/7PQ7OQVSA5ymolSKHxCMTc6moc.png"
            alt=""
            width={2880}
            height={1440}
            sizes="100vw"
            className="h-full w-full"
          />
        </div>
        <div className={`absolute inset-x-0 top-[449px] bottom-0 hidden md:block ${fade}`} />
      </div>
    </>
  );
}
