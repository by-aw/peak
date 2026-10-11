import { WistiaCard } from "@/components/funnel/wistia-card";
import { Reveal } from "@/components/ui/reveal";
import { sectionHeading } from "./styles";
import type { VideoEntry } from "./videos";

/**
 * Bento grid of Wistia video cards used by both video sections of /thank-you ("Frequently Asked Questions" and "Watch the videos
 * below to see how we use Mochi"): rows of two cards on tablet/desktop (20px apart, 16px on tablet), stacked on phone (16px between
 * the two cards of a row, 20px between rows). Each card sits in a #fafafa 24px-radius frame with a 1px #f2f2f2 hairline drawn above it.
 *
 * - "faq": 16:9 clips shown in a fixed-height card (368px, 262px on tablet, 263px on phone), 20px radius (16px on phone).
 * - "walkthrough": 4:3 clips; live sizes the card from the video's aspect (width / 1.3333, rounded: 443px at 590px wide).
 *
 * Section padding 80/100 (64/48 on tablet, 48/20 on phone), content at most 1200px wide with a 64px gap (48 / 32); the heading fades
 * up (y 48) like the other sections, in a text box at most `headingMaxWidth` wide.
 */
export function VideoSection({ heading, headingMaxWidth, videos, kind }: { heading: string; headingMaxWidth: number; videos: VideoEntry[]; kind: "faq" | "walkthrough" }) {
  const rows: VideoEntry[][] = [];
  for (let i = 0; i < videos.length; i += 2) rows.push(videos.slice(i, i + 2));
  const card =
    kind === "faq"
      ? "h-[263px] rounded-2xl bg-[rgba(13,13,13,0)] md:h-[262px] md:rounded-[20px] lg:h-[368px]"
      : "aspect-[1.33183] rounded-2xl bg-[rgba(13,13,13,0)] md:rounded-[20px]";
  const sizes = "(min-width: 1200px) 590px, (min-width: 810px) 456px, 350px";
  return (
    <section className="flex w-full items-center justify-start gap-2">
      <div className="flex w-px flex-1 items-center justify-center px-5 py-12 md:px-12 md:py-16 lg:px-[100px] lg:py-20">
        <div className="flex w-px max-w-[1200px] flex-1 flex-col items-center justify-start gap-8 md:gap-12 lg:gap-16">
          <Reveal delay={0} viewport={{ once: true }} className="flex w-full flex-col items-center gap-4">
            <div className="flex w-full flex-col items-center gap-2">
              <div className="w-full" style={{ maxWidth: headingMaxWidth }}>
                <h3 className={sectionHeading}>{heading}</h3>
              </div>
            </div>
          </Reveal>
          <div className="flex w-full flex-col items-start justify-center gap-5 md:gap-4 lg:gap-5">
            {rows.map((row) => (
              <div key={row[0].mediaId} className="flex w-full flex-col items-start justify-center gap-4 md:flex-row lg:gap-5">
                {row.map((video) => (
                  <div
                    key={video.mediaId}
                    className="relative flex w-full flex-none flex-col items-center justify-start overflow-hidden rounded-3xl bg-[#fafafa] after:pointer-events-none after:absolute after:inset-0 after:z-[3] after:rounded-[inherit] after:border after:border-[#f2f2f2] after:content-[''] md:w-px md:flex-[1_0_0]"
                  >
                    <WistiaCard mediaId={video.mediaId} thumb={video.thumb} title={video.title} sizes={sizes} className={card} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
