import Image from "next/image";

/**
 * Framer "bg image" of the funnel pages: the 2880x542 sky strip pinned to the top of the page at full width
 * (aspect 5.545, so 260px tall at 1440), `object-fit: cover` anchored to the top centre. On phone the demo forms
 * fix it at 146px tall, while /spot-confirmed keeps an aspect ratio of 1.9697 (198px at 390).
 */
export function FunnelSky({ phone = "fixed" }: { phone?: "fixed" | "aspect" }) {
  const phoneSize = phone === "fixed" ? "h-[146px]" : "aspect-[1.9697]";
  return (
    <div aria-hidden className={`pointer-events-none absolute top-0 left-0 z-0 w-full overflow-clip ${phoneSize} md:aspect-[5.54545] md:h-auto`}>
      <Image src="/framer/oSwt9seLcU3Z5YLgcuCu44uCZA.png" alt="" fill preload sizes="100vw" className="object-cover object-top" />
    </div>
  );
}
