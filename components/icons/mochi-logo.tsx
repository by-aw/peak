/* Mochi blob + "mochi" wordmark (Figma "mochi-web-v2" logo, node 537:7125). */
import Image from "next/image";

export function MochiLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-1 ${className}`} aria-hidden="true">
      <Image src="/mochi-blob.svg" alt="" width={28} height={28} priority className="size-7 shrink-0" />
      <span className="whitespace-nowrap font-display text-[24px] font-semibold leading-6 tracking-[-0.4px] text-black">mochi</span>
    </span>
  );
}
