import Image from "next/image";

/**
 * Framer "Background" layer shared by the feature / product pages: a 271px-tall strip of clouds
 * (image bleeding 500px past both edges, 85% opacity) fading to white, the whole layer at 75% opacity.
 * Absolutely positioned at the top of `<main>` (which is `relative` in the route-group layout);
 * the page sections that follow are `relative` so they paint on top of it.
 */
export function FeatureBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[271px] overflow-hidden bg-white opacity-75">
      <div className="absolute -inset-x-[500px] top-[-41px] aspect-[4.61218/1] opacity-85">
        <Image src="/framer/8BCgglJzrPJNVPD6S2c7cgm1RDg.png" alt="" fill preload sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-x-0 top-[157px] bottom-0 bg-[linear-gradient(rgba(255,255,255,0)_0%,#fff_83.1731%)]" />
    </div>
  );
}
