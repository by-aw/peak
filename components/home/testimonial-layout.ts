import type { Box, CollisionRules } from "@/lib/collision";

/**
 * Geometry for the "What our clients are saying" collage.
 *
 * Everything is in design-frame units: a 1440x900 frame on desktop and a
 * 960x840 one on tablet. The frame scales as one piece with the viewport, so
 * the heading, every card's size, position and the gaps between them keep their
 * proportions. A layout with no collisions in frame units has none at any width.
 *
 * Card heights are derived from the image's own aspect ratio rather than
 * stored, so a card can't be stretched by a typo or a resize.
 *
 * The positions started from the Framer pins and were relaxed apart until
 * `findCollisions` came back empty; `testimonial-layout.test.mjs` keeps it
 * that way. Run `pnpm test` after moving a card.
 *
 * Only type imports here: `node --test` loads this file directly.
 */

export const IMG = {
  t1: { src: "/framer/DtANT6bFQlpZuXzuhVNYxXklxQk.png", iw: 1456, ih: 504 },
  t2: { src: "/framer/2AOLgWiwzCRsAtTK7n7YqPq1G0.png", iw: 1470, ih: 364 },
  t3: { src: "/framer/cc8KiiYWBuc8jYeqNEzCUiUxrQ.png", iw: 1528, ih: 414 },
  t4: { src: "/framer/JlRznfwc550EAUJPGTdtlK2WQ.png", iw: 2040, ih: 436 },
  t5: { src: "/framer/SwBsJYgdsawOf0TgYsXnJNbHHE.png", iw: 1134, ih: 482 },
  t6: { src: "/framer/efGDh1G9h8DD1jlzYWfuReoYZoY.png", iw: 594, ih: 412 },
  t7: { src: "/framer/QkDidtuG2a1AIqQ9HVQqdu0TPfA.png", iw: 920, ih: 198 },
  t8: { src: "/framer/xKgw3XD4zMLF0IofIAf2qZUXZc.png", iw: 948, ih: 170 },
  t9: { src: "/framer/MDc4MjN9hcLugSCWaAE6dameivE.png", iw: 2204, ih: 464 },
  t10: { src: "/framer/rUEiPBcpe79tsvf4zAd9nLUQBe0.png", iw: 980, ih: 204 },
  t11: { src: "/framer/CzrcuMb5LXvoHKYFk0MDpq1ldHo.png", iw: 2204, ih: 412 },
  t12: { src: "/framer/AVhWX7na6TeayMR8JXtaTY5Rw.png", iw: 1152, ih: 190 },
  t13: { src: "/framer/royuDWS0OFOKk1oxEoEEqPu0g.png", iw: 1128, ih: 684 },
  t14: { src: "/framer/l6oM9elrD2mQ2Av9mV0Lwk8hvb0.png", iw: 1536, ih: 653 },
  t15: { src: "/framer/RP5BKVGq6xcFKtL7ShukoVbs.png", iw: 1536, ih: 512 },
  t16: { src: "/framer/FZWQ9CS5KRiLcDwgf6RNbMVsZY4.png", iw: 1024, ih: 924 },
  t17: { src: "/framer/2ihdTVmEcn7YmLbOlwMdPtkLkIk.png", iw: 1422, ih: 1024 },
};

export type CollageImage = keyof typeof IMG;

export type CollageCard = {
  img: CollageImage;
  /** Centre, in frame units. */
  cx: number;
  cy: number;
  w: number;
  rotate: number;
  radius: number;
  /** Testimonial 5 sits on a white card with this much white showing under the screenshot. */
  strip?: number;
};

export type CollageLayout = {
  width: number;
  height: number;
  /**
   * The heading's two lines and the CTA as measured in the browser at scale 1:
   * [width, height, centre offset below the frame centre]. The heading scales
   * with the frame, so these hold at every size.
   */
  header: readonly (readonly [number, number, number])[];
  cards: readonly CollageCard[];
};

/** How far the heading rises on reveal; its start position is kept clear too. */
export const HEADER_TRAVEL = 24;
/** Clearance kept around the heading lines and the CTA. */
const HEADER_PAD = 20;
/** Matches DraggableCard's whileHover scale. */
export const HOVER_SCALE = 1.05;

export const DESKTOP: CollageLayout = {
  width: 1440,
  height: 900,
  header: [
    [413.1, 54.5, -56.45],
    [262.4, 54.5, -3.65],
    [161.4, 45.8, 59.8],
  ],
  cards: [
    { img: "t1", cx: 168.7, cy: 224.4, w: 274.9, rotate: 0, radius: 16 },
    { img: "t2", cx: 720, cy: 103.2, w: 338.4, rotate: 0, radius: 13 },
    { img: "t3", cx: 224, cy: 508.9, w: 334.1, rotate: 0, radius: 16 },
    { img: "t4", cx: 728.4, cy: 241.5, w: 409.8, rotate: 0, radius: 15 },
    { img: "t5", cx: 1279.7, cy: 698, w: 266.2, rotate: -3, radius: 12, strip: 21.4 },
    { img: "t6", cx: 1301, cy: 108.8, w: 215.8, rotate: 7, radius: 13 },
    { img: "t7", cx: 231, cy: 652.5, w: 335.8, rotate: 5, radius: 14 },
    { img: "t8", cx: 251, cy: 828.5, w: 395, rotate: -2, radius: 16 },
    { img: "t9", cx: 1123.4, cy: 569.9, w: 403.7, rotate: 1, radius: 13 },
    { img: "t10", cx: 1208.1, cy: 312.3, w: 401.9, rotate: 7, radius: 16 },
    { img: "t11", cx: 1073.1, cy: 827.2, w: 479.4, rotate: 2, radius: 16 },
    { img: "t12", cx: 691.2, cy: 700.7, w: 352.4, rotate: -4, radius: 14 },
    { img: "t13", cx: 230.5, cy: 92.4, w: 218.4, rotate: -3, radius: 15 },
    { img: "t14", cx: 1278.5, cy: 453, w: 271.4, rotate: -2, radius: 14 },
    { img: "t15", cx: 132, cy: 745.3, w: 181, rotate: -2, radius: 12 },
    { img: "t16", cx: 1082.9, cy: 154.7, w: 174, rotate: 0, radius: 12 },
    { img: "t17", cx: 314.3, cy: 360.4, w: 210.5, rotate: -8, radius: 12 },
  ],
};

export const TABLET: CollageLayout = {
  width: 960,
  height: 840,
  header: [
    [348.5, 45.5, -52.15],
    [221.3, 45.5, -8.15],
    [161.4, 45.8, 51],
  ],
  cards: [
    { img: "t1", cx: 168.8, cy: 201.1, w: 231.8, rotate: 0, radius: 15 },
    { img: "t2", cx: 489.5, cy: 69.8, w: 255.5, rotate: -8, radius: 11 },
    { img: "t3", cx: 135.9, cy: 450.4, w: 221.1, rotate: -6, radius: 14 },
    { img: "t4", cx: 512.3, cy: 293.3, w: 273.9, rotate: 0, radius: 11 },
    { img: "t5", cx: 816.6, cy: 578.1, w: 193.5, rotate: -3, radius: 10, strip: 15.55 },
    { img: "t6", cx: 856.9, cy: 81.8, w: 152.2, rotate: 7, radius: 10 },
    { img: "t7", cx: 132.3, cy: 535.1, w: 215.7, rotate: 5, radius: 12 },
    { img: "t8", cx: 181, cy: 773.2, w: 301.4, rotate: -2, radius: 14 },
    { img: "t9", cx: 807.6, cy: 192.8, w: 254.7, rotate: 4, radius: 11 },
    { img: "t10", cx: 800.7, cy: 264.3, w: 266.2, rotate: 7, radius: 12 },
    { img: "t11", cx: 748.9, cy: 672.5, w: 295.3, rotate: 2, radius: 11 },
    { img: "t12", cx: 186.7, cy: 604.3, w: 265.5, rotate: -4, radius: 12 },
    { img: "t13", cx: 100.6, cy: 100.2, w: 154.5, rotate: -3, radius: 12 },
    { img: "t14", cx: 815.9, cy: 453.7, w: 238.7, rotate: -2, radius: 14 },
    { img: "t15", cx: 132.1, cy: 669.6, w: 159.1, rotate: -2, radius: 12 },
    { img: "t16", cx: 575.8, cy: 182.5, w: 153, rotate: 0, radius: 12 },
    { img: "t17", cx: 177.9, cy: 333.1, w: 185.1, rotate: -8, radius: 12 },
  ],
};

/** The screenshot's height at the card's width, plus any white strip under it. */
export const cardHeight = (card: CollageCard) => (card.w * IMG[card.img].ih) / IMG[card.img].iw + (card.strip ?? 0);

/** Cards as boxes in frame units, optionally shifted by drag offsets. */
export const collageBoxes = (layout: CollageLayout, offsets?: readonly (readonly [number, number])[]): Box[] =>
  layout.cards.map((card, i) => ({
    cx: card.cx + (offsets?.[i]?.[0] ?? 0),
    cy: card.cy + (offsets?.[i]?.[1] ?? 0),
    w: card.w,
    h: cardHeight(card),
    rotate: card.rotate,
  }));

export const collageRules = (layout: CollageLayout): CollisionRules => {
  const cx = layout.width / 2;
  const cy = layout.height / 2;
  return {
    frame: { width: layout.width, height: layout.height },
    margin: 16,
    gap: 8,
    hoverScale: HOVER_SCALE,
    // The heading starts HEADER_TRAVEL lower before it rises, so each zone
    // reaches down that far as well.
    zones: layout.header.map(([w, h, dy]) => [
      cx - w / 2 - HEADER_PAD,
      cy + dy - h / 2 - HEADER_PAD,
      cx + w / 2 + HEADER_PAD,
      cy + dy + h / 2 + HEADER_TRAVEL + HEADER_PAD,
    ]),
  };
};

const pct = (n: number, of: number) => `${((n / of) * 100).toFixed(4)}%`;

/** Placement as percentages of the frame, so the card scales with it. */
export const cardStyle = (layout: CollageLayout, card: CollageCard) => {
  const h = cardHeight(card);
  return {
    left: pct(card.cx - card.w / 2, layout.width),
    top: pct(card.cy - h / 2, layout.height),
    width: pct(card.w, layout.width),
    height: pct(h, layout.height),
    // cqw resolves against the frame, so corners scale with the card too.
    borderRadius: `${((card.radius / layout.width) * 100).toFixed(4)}cqw`,
  };
};
