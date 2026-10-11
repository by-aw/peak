import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { reelHeadingText } from "@/components/pages/vsl/styles";

/** Framer "Video Reel" frame: 16px radius, 6px padding, 1px #e3e3e3 hairline on top, the purple Mochi poster behind. */
export const reelFrameClassName =
  "relative flex w-full flex-col items-center justify-center overflow-clip rounded-[16px] p-1.5 after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border after:border-[#e3e3e3]";

/** Purple checker poster painted behind the /thank-you-pdf videos and reels. */
export function ReelPoster({ sizes }: { sizes: string }) {
  return <Image src="/framer/GhC1na4Yv4zJeyQac5D1brz4dY.jpg" alt="" fill sizes={sizes} className="rounded-[16px] object-cover" />;
}

/**
 * Framer "Users Section" of /thank-you-pdf: "The #1 people in the info space are using us" over a 702px-tall muted
 * looping video (controls, not autoplaying) in a `reelFrameClassName` frame. The whole section fades/slides in
 * (y 48) 2s after it enters the viewport, as on live.
 *
 * Padding 48/100 (0/20 on phone), 1200px column, title-to-video gap 64/48/40. Title: h3 preset, 28/33.6 on phone.
 */
export function UsersSection() {
  return (
    <Reveal y={48} delay={2} viewport={{ once: true, amount: 0 }} className="relative flex w-full flex-col items-start overflow-hidden">
      <section className="flex w-full flex-col items-center overflow-hidden px-5 md:px-[100px] md:py-12">
        <div className="flex w-full max-w-[1200px] flex-col items-center gap-10 md:gap-12 lg:gap-16">
          <h3 className={`w-full text-black ${reelHeadingText}`}>The #1 people in the info space are using us</h3>
          <div className={reelFrameClassName}>
            <ReelPoster sizes="(max-width: 809px) calc(100vw - 40px), min(100vw - 200px, 1200px)" />
            <div className="relative h-[702px] w-full">
              <video
                src="/framer/8tvfPlOm1NN48gBj1dzZC4LUbRg.mp4"
                loop
                muted
                controls
                playsInline
                preload="metadata"
                className="block h-full w-full rounded-[10px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
