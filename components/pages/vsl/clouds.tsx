import Image from "next/image";
import { CLOUDS_SRC } from "@/components/pages/vsl/styles";

/**
 * Framer "Linear - Top" / "Linear - Bottom" cloud strip: the 2398x624 cloud image covering a full-width band that
 * fades in through a 181deg mask (transparent at the band's inner edge). The top band is the bottom one rotated 180deg.
 * 312px tall around the Benefits / FAQ sections, 254px inside the ROI card. Absolutely positioned: the parent must be
 * `relative` and its content must paint above it (`relative z-[1]` or later in the DOM).
 */
export function Clouds({ position, className = "h-[312px]" }: { position: "top" | "bottom"; className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 z-0 overflow-hidden [mask-image:linear-gradient(181deg,rgba(0,0,0,0)_0%,#000_100%)] ${position === "top" ? "top-0 rotate-180" : "bottom-0"} ${className}`}
    >
      <Image src={CLOUDS_SRC} alt="" width={2398} height={624} sizes="100vw" className="absolute inset-0 h-full w-full object-cover" />
    </div>
  );
}
