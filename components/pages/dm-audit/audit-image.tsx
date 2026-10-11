import Image from "next/image";
import { FloatingImage } from "./appear";

/**
 * Tilted mascot panel (Framer "image 43"): 16px radius, 0.694:1, faded out at its edge by a radial mask, and revealed by
 * `FloatingImage` (rotates from twice its `rest` angle, scales from 0.9, fades in while half of it is on screen).
 */
export function AuditImage({
  rest,
  src,
  width,
  height,
  mask,
  className,
  imageClassName,
  sizes,
}: {
  rest: number;
  src: string;
  width: number;
  height: number;
  mask: string;
  className: string;
  imageClassName: string;
  sizes: string;
}) {
  return (
    <FloatingImage rest={rest} className={`relative aspect-[0.694141] h-auto rounded-2xl ${mask} ${className}`}>
      <Image src={src} alt="" width={width} height={height} sizes={sizes} className={`absolute inset-0 h-full! w-full rounded-[inherit] ${imageClassName}`} />
    </FloatingImage>
  );
}
