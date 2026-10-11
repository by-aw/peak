import { Reveal } from "@/components/ui/reveal";

/**
 * Framer "Demo Section" of /agent: the same wide demo video as /mcp (native controls, not autoplaying) in a
 * purple-bordered card, but at its natural 16:9 ratio and with no phone frame below it. The card appears on scroll
 * (fade + 64px slide). 1440x821 / 1024x652 / 390x263.
 */
export function AgentDemo() {
  return (
    <section className="relative flex w-full flex-col items-center overflow-clip" aria-label="Demo">
      <div className="flex w-full flex-col items-center overflow-clip px-5 py-8 md:px-12 md:pt-10 md:pb-[88px] lg:px-[100px] lg:pb-[104px]">
        <Reveal
          y={64}
          delay={0}
          className="flex w-full max-w-[1200px] flex-col items-center overflow-clip rounded-[16px] bg-[linear-gradient(119deg,#f3e8ff_0%,#f3e8ff_100%)] p-0.5 shadow-[0_3px_24px_0_rgba(0,0,0,0.16)] md:rounded-[24px]"
        >
          <video
            src="/framer/tnwpfdscdhYfZHIwa2g4ie9Xgk.mp4"
            controls
            preload="metadata"
            playsInline
            className="block aspect-video w-full overflow-clip rounded-[14px] object-cover md:rounded-[22px]"
          />
        </Reveal>
      </div>
    </section>
  );
}
