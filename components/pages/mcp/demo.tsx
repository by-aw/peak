/**
 * Framer "Demo Section" of /mcp: a 150px-tall wide demo video in a purple-bordered card (native controls,
 * not autoplaying) and a 320x695 "iPhone 16 & 17 Pro Max" frame playing a muted looping screen recording.
 * 1440x1057 / 1024x1025 / 390x945.
 */
export function McpDemo() {
  return (
    <section className="relative flex w-full flex-col items-center overflow-clip" aria-label="Demo">
      <div className="flex w-full flex-col items-center gap-8 overflow-clip px-5 py-8 md:gap-12 md:px-12 md:pt-10 md:pb-[88px] lg:gap-16 lg:px-[100px] lg:pb-[104px]">
        <div className="flex w-full max-w-[1200px] flex-col items-center overflow-clip rounded-[16px] bg-[linear-gradient(119deg,#f3e8ff_0%,#f3e8ff_100%)] p-0.5 shadow-[0_3px_24px_0_rgba(0,0,0,0.16)] md:rounded-[24px]">
          <video
            src="/framer/tnwpfdscdhYfZHIwa2g4ie9Xgk.mp4"
            controls
            preload="metadata"
            playsInline
            className="h-[150px] w-full overflow-clip rounded-[14px] object-cover md:rounded-[22px]"
          />
        </div>
        <div className="relative h-[695px] w-[320px] shrink-0 rounded-[32px] shadow-[0_1px_14px_0_rgba(0,0,0,0.1)] after:pointer-events-none after:absolute after:inset-0 after:rounded-[32px] after:border-[5px] after:border-[#f5f0ea]">
          <video
            src="/framer/bPyQKs8MWe7s626pASHS5k5QM.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full overflow-clip rounded-[32px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
