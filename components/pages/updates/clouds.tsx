import Image from "next/image";

/**
 * Cloud strip behind the top of the Updates pages (Framer absolute image 2880x542, object-cover):
 * 260px tall on tablet/desktop, 198px on phone, pinned to the top of its `relative` parent.
 */
export function UpdatesClouds() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[198px] overflow-clip md:h-[260px]">
      <Image src="/framer/oSwt9seLcU3Z5YLgcuCu44uCZA.png" alt="" fill preload sizes="100vw" className="object-cover" />
    </div>
  );
}
