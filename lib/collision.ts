/**
 * Convex-polygon geometry for the testimonial collage. The cards are rotated
 * rectangles, so overlap is decided with the separating-axis theorem instead of
 * bounding boxes, which over-report for anything rotated.
 *
 * No imports on purpose: `node --test` loads this file directly.
 */

export type Point = readonly [number, number];
export type Polygon = readonly Point[];

/** A box by its centre, rotated about that centre the way CSS `rotate` does. */
export type Box = { cx: number; cy: number; w: number; h: number; rotate?: number };

/** Corners of a box. `scale` grows it about its centre, like the hover scale. */
export function boxPolygon({ cx, cy, w, h, rotate = 0 }: Box, scale = 1): Polygon {
  const t = (rotate * Math.PI) / 180;
  const c = Math.cos(t) * scale;
  const s = Math.sin(t) * scale;
  const corners: Point[] = [
    [-w / 2, -h / 2],
    [w / 2, -h / 2],
    [w / 2, h / 2],
    [-w / 2, h / 2],
  ];
  return corners.map(([x, y]) => [cx + c * x - s * y, cy + s * x + c * y] as const);
}

export function rectPolygon(left: number, top: number, right: number, bottom: number): Polygon {
  return [
    [left, top],
    [right, top],
    [right, bottom],
    [left, bottom],
  ];
}

const project = (p: Polygon, [ax, ay]: Point): [number, number] => {
  let min = Infinity;
  let max = -Infinity;
  for (const [x, y] of p) {
    const d = x * ax + y * ay;
    if (d < min) min = d;
    if (d > max) max = d;
  }
  return [min, max];
};

const edgeNormals = (p: Polygon): Point[] =>
  p.map((a, i) => {
    const b = p[(i + 1) % p.length];
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const len = Math.hypot(dx, dy) || 1;
    return [-dy / len, dx / len] as const;
  });

/**
 * The widest gap between the two shapes' projections over every edge normal.
 * Positive: they are at least that far apart. Zero or negative: they touch or
 * overlap, and `axis` (pointing from `a` towards `b`) is the shortest way out.
 *
 * For separated shapes this is a lower bound on the true distance, so checking
 * `gap >= n` never passes a pair that is closer than `n`.
 */
export function separation(a: Polygon, b: Polygon): { gap: number; axis: Point } {
  let gap = -Infinity;
  let axis: Point = [1, 0];
  for (const n of [...edgeNormals(a), ...edgeNormals(b)]) {
    const [minA, maxA] = project(a, n);
    const [minB, maxB] = project(b, n);
    const forward = minB - maxA;
    const backward = minA - maxB;
    const g = Math.max(forward, backward);
    if (g > gap) {
      gap = g;
      axis = forward >= backward ? n : [-n[0], -n[1]];
    }
  }
  return { gap, axis };
}

/** [left, top, right, bottom] */
export type Rect = readonly [number, number, number, number];

export type CollisionRules = {
  frame: { width: number; height: number };
  /** Closest a card may come to the frame edge. */
  margin: number;
  /** Closest two cards may come while either one is hovered. */
  gap: number;
  /** The hover grow, checked so a hovered card can't reach its neighbour. */
  hoverScale: number;
  /** Areas no card may enter (the heading lines and the CTA). */
  zones: readonly Rect[];
};

export type Collision =
  | { kind: "card"; a: number; b: number; gap: number }
  | { kind: "zone"; a: number; zone: number; gap: number }
  | { kind: "frame"; a: number };

const EPS = 1e-6;

const pairGap = (a: Box, b: Box, hover: number) =>
  Math.min(
    separation(boxPolygon(a, hover), boxPolygon(b)).gap,
    separation(boxPolygon(a), boxPolygon(b, hover)).gap,
  );

/** Everything card `index` breaks, against the frame, the zones and every other card. */
export function collisionsFor(index: number, boxes: readonly Box[], rules: CollisionRules): Collision[] {
  const out: Collision[] = [];
  const grown = boxPolygon(boxes[index], rules.hoverScale);
  const b = bounds(grown);
  const { width, height } = rules.frame;
  if (b.left < rules.margin - EPS || b.top < rules.margin - EPS || b.right > width - rules.margin + EPS || b.bottom > height - rules.margin + EPS) {
    out.push({ kind: "frame", a: index });
  }
  rules.zones.forEach((zone, z) => {
    const gap = separation(rectPolygon(...zone), grown).gap;
    if (gap < -EPS) out.push({ kind: "zone", a: index, zone: z, gap });
  });
  boxes.forEach((other, j) => {
    if (j === index) return;
    const gap = pairGap(boxes[index], other, rules.hoverScale);
    if (gap < rules.gap - EPS) out.push({ kind: "card", a: index, b: j, gap });
  });
  return out;
}

/** Every rule broken anywhere in the layout, each card pair reported once. */
export function findCollisions(boxes: readonly Box[], rules: CollisionRules): Collision[] {
  return boxes.flatMap((_, i) => collisionsFor(i, boxes, rules).filter((c) => c.kind !== "card" || c.b > i));
}

export function bounds(p: Polygon): { left: number; top: number; right: number; bottom: number } {
  let left = Infinity;
  let top = Infinity;
  let right = -Infinity;
  let bottom = -Infinity;
  for (const [x, y] of p) {
    if (x < left) left = x;
    if (x > right) right = x;
    if (y < top) top = y;
    if (y > bottom) bottom = y;
  }
  return { left, top, right, bottom };
}
