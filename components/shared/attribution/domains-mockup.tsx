import Image from "next/image";

/** Classes for the Image Frame that holds this mockup: fixed 397px height (fades out at the bottom), natural height on phone. */
export const DOMAINS_FRAME = "h-auto px-4 py-6 md:h-[397px] md:p-6 [mask-image:linear-gradient(#000_80%,rgba(0,0,0,0)_100%)]";

/**
 * "One snippet, every page" / "One profile, every source" mockup (Framer "Mask group 11"): the wide grid
 * of platform tiles. 1052x438 on desktop (taller than the frame, so it is centred and clipped), 468px
 * wide on phone (wider than the frame).
 */
export function DomainsMockup() {
  return (
    <div className="flex w-[468px] shrink-0 md:w-full">
      <Image src="/framer/Si702KJHhvtSLPGFTdG4gFRq30.png" width={2860} height={1191} alt="" sizes="(min-width: 1200px) 1052px, (min-width: 810px) calc(100vw - 96px), 468px" className="h-auto w-full" />
    </div>
  );
}
