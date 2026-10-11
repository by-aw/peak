import Image from "next/image";
import { WistiaVideo } from "@/components/funnel/wistia-video";
import { FunnelLogo } from "@/components/pages/demo/icons";
import { Reveal } from "@/components/ui/reveal";
import { wistiaMediaId } from "@/lib/watch";

/**
 * Framer "WistiaLessons" template (/watch/<slug>), also used by the static /watch/welcome-to-mochi page:
 * cloud strip pinned to the top (150 / 190 / 220px, object-position top), then the hero column appearing with the
 * usual 48px spring: 88x20 mochi logo (links home), Clash Display 700 title (32 / 40 / 48, line height 1, balanced),
 * and the video frame.
 *
 * Video frame ("Wistia Embed Area"): fixed 214 / 405 / 480px tall, up to 860px wide, #0d0d0d, 18 / 20px radius,
 * clipped, with Framer's translucent ring (8 / 12.04px #e7e7e754) painted over the edge. On live the embed is an
 * iframe with aspect ratio 1.625 centred in it; Wistia letterboxes its 16:9 video inside that iframe, so a centred
 * 16:9 player is the same picture. Other URLs (the welcome page's YouTube embed) keep the 1.625 iframe.
 */
export function WatchHero({ title, videoUrl }: { title: string; videoUrl: string }) {
  const mediaId = wistiaMediaId(videoUrl);
  return (
    <>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[150px] overflow-clip md:h-[190px] lg:h-[220px]">
        <Image src="/framer/oSwt9seLcU3Z5YLgcuCu44uCZA.png" alt="" fill preload sizes="100vw" className="object-cover object-top" />
      </div>
      <Reveal className="relative z-[1] flex w-full max-w-[342px] flex-col items-center gap-[22px] pt-[72px] pb-20 md:max-w-[720px] md:gap-7 md:py-24 lg:max-w-[780px] lg:gap-8 lg:pt-[120px] lg:pb-[112px]">
        <div className="flex w-full flex-col items-center gap-[18px] md:gap-5">
          <FunnelLogo href="/" className="z-[1]" />
          <h1 className="w-full text-center font-display text-[32px] leading-none font-bold text-balance whitespace-pre-wrap text-ink-3 md:text-[40px] lg:text-[48px]">
            {title}
          </h1>
        </div>
        <div className="relative flex h-[214px] w-full max-w-[860px] flex-col items-center justify-center overflow-clip rounded-[18px] bg-[#0d0d0d] after:pointer-events-none after:absolute after:inset-0 after:z-[2] after:rounded-[inherit] after:border-8 after:border-[#e7e7e754] md:h-[405px] md:rounded-[20px] md:after:border-[12.04px] lg:h-[480px]">
          {mediaId ? (
            <WistiaVideo mediaId={mediaId} swatch className="w-full shrink-0" playerAttributes={{ autoplay: "true" }} />
          ) : (
            <div className="relative aspect-[1.625] w-full shrink-0">
              <iframe
                src={videoUrl}
                title={title.trim()}
                className="absolute inset-0 h-full w-full rounded-[12px] border-0"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </Reveal>
    </>
  );
}
