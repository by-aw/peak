/**
 * Framer "Demo Section" of /zapier: a 150px-tall wide demo video (native controls, not autoplaying) in a
 * purple-bordered card. 1440x234 (1000 wide) / 1024x234 (928) / 390x218 (350, 16px radius).
 */
export function ZapierDemo() {
  return (
    <section className="relative flex w-full flex-col items-center overflow-clip" aria-label="Demo">
      <div className="flex w-full flex-col items-center overflow-clip px-5 py-8 md:px-12 md:py-10 lg:px-0">
        <div className="flex w-full max-w-[1000px] flex-col items-center overflow-clip rounded-[16px] bg-[linear-gradient(119deg,#f3e8ff_0%,#f3e8ff_100%)] p-0.5 shadow-[0_3px_24px_0_rgba(0,0,0,0.16)] md:rounded-[24px]">
          <video src="/framer/KEIfF9qPy942sVW3VFrFTPs.mp4" controls preload="none" playsInline className="h-[150px] w-full overflow-clip rounded-[14px] object-cover md:rounded-[22px]" />
        </div>
      </div>
    </section>
  );
}
