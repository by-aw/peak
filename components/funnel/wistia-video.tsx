import Script from "next/script";

/** Wistia's web component, defined by https://fast.wistia.com/player.js (no JSX typings, so it goes through ElementType). */
const WistiaPlayer = "wistia-player" as React.ElementType;

/**
 * Default frame of the /vsl and /vsl-2 video (Framer "Video" frame): 14px radius on phone and 20px from tablet up,
 * clipped, aspect ratio 1.77305 (the player is centred vertically in it), and a 12px translucent (#e7e7e754) ring
 * painted over the edge of the video (Framer's `data-border` pseudo-element). No shadow.
 */
export const wistiaFrameClassName =
  "relative flex w-full aspect-[1.77305] items-center overflow-clip rounded-[14px] md:rounded-[20px] after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border-[12px] after:border-[#e7e7e754]";

/**
 * Wistia embed, ported from the Framer "Embed" (HTML) component used by /vsl, /vsl-2, /learn and /thank-you: the
 * `<wistia-player>` web component plus `https://fast.wistia.com/player.js` and `https://fast.wistia.com/embed/<id>.js`
 * (loaded once per page through `next/script`). Live renders it inside an iframe; here it is inline.
 *
 * Media ids: /vsl `swpdifenxb`, /vsl-2 `s32w2px6f3`, /learn and /book-dm-audit `4hed0vkrcp`, /thank-you `yrp2wb8giq`.
 *
 * - `swatch`: until the player has loaded, show Wistia's blurred swatch image of the video (`blur(5px)`, /learn,
 *   /thank-you, /book-dm-audit). /vsl and /vsl-2 show nothing (transparent) while loading. (On live the swatch is
 *   effectively invisible because the unupgraded element is 0px wide inside the embed iframe; here it shows.)
 * - `autoplay`: Wistia's silent autoplay with the player muted, no big play button and no transition (/vsl, /vsl-2).
 *   /learn, /thank-you and /book-dm-audit use the plain player (click to play).
 * - `className` replaces the wrapper classes (default `wistiaFrameClassName`, the /vsl look). Pass the page's own
 *   radius/border/padding/shadow; the wrapper must be a block of the width the video should have, the player
 *   always fills its width and takes its height from `aspect`.
 */
export function WistiaVideo({
  mediaId,
  swatch = false,
  autoplay = false,
  aspect = "1.7777777777777777",
  className = wistiaFrameClassName,
  playerAttributes,
}: {
  mediaId: string;
  swatch?: boolean;
  autoplay?: boolean;
  /** Width / height of the video (default 16:9). */
  aspect?: string;
  className?: string;
  /** Extra `<wistia-player>` attributes (Wistia embed options), e.g. `{ autoplay: "true" }` for /watch. */
  playerAttributes?: Record<string, string>;
}) {
  const playerClassName = [
    // Until the custom element is defined it is an inline unknown element: make it a 16:9 block (as the live embed does).
    "block w-full [&:not(:defined)]:pt-[56.25%]",
    swatch &&
      "[&:not(:defined)]:bg-(image:--wistia-swatch) [&:not(:defined)]:bg-contain [&:not(:defined)]:bg-center [&:not(:defined)]:bg-no-repeat [&:not(:defined)]:blur-[5px]",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={className}>
      <Script id="wistia-player-js" src="https://fast.wistia.com/player.js" strategy="afterInteractive" />
      <Script id={`wistia-embed-${mediaId}`} src={`https://fast.wistia.com/embed/${mediaId}.js`} type="module" crossOrigin="anonymous" strategy="afterInteractive" />
      <WistiaPlayer
        media-id={mediaId}
        aspect={aspect}
        className={playerClassName}
        style={swatch ? ({ "--wistia-swatch": `url('https://fast.wistia.com/embed/medias/${mediaId}/swatch')` } as React.CSSProperties) : undefined}
        {...(autoplay ? { silentautoplay: "true", muted: "true", playbutton: "false", transition: "none" } : {})}
        {...playerAttributes}
      />
    </div>
  );
}
