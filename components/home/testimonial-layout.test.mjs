// Run with `pnpm test`. Plain .mjs so it needs no test runner: Node strips the
// types from the two .ts files it imports.
import assert from "node:assert/strict";
import { test } from "node:test";

import { collisionsFor, findCollisions } from "../../lib/collision.ts";
import { DESKTOP, IMG, TABLET, cardHeight, cardStyle, collageBoxes, collageRules } from "./testimonial-layout.ts";

const name = (layout, c) => {
  const id = (i) => layout.cards[i].img;
  if (c.kind === "card") return `${id(c.a)} is ${c.gap.toFixed(1)} from ${id(c.b)}`;
  if (c.kind === "zone") return `${id(c.a)} is inside heading zone ${c.zone}`;
  return `${id(c.a)} leaves the frame`;
};

for (const [label, layout] of [
  ["desktop", DESKTOP],
  ["tablet", TABLET],
]) {
  const rules = collageRules(layout);
  const boxes = collageBoxes(layout);

  test(`${label}: no card touches another card, the heading, the CTA or the frame edge, hovered or not`, () => {
    assert.deepEqual(findCollisions(boxes, rules).map((c) => name(layout, c)), []);
  });

  test(`${label}: every card is drawn at its screenshot's own aspect ratio`, () => {
    for (const card of layout.cards) {
      const style = cardStyle(layout, card);
      const w = (parseFloat(style.width) / 100) * layout.width;
      const h = (parseFloat(style.height) / 100) * layout.height - (card.strip ?? 0);
      const { iw, ih } = IMG[card.img];
      assert.ok(Math.abs(w / h / (iw / ih) - 1) < 1e-3, `${card.img}: ${w.toFixed(1)}x${h.toFixed(1)} vs ${iw}x${ih}`);
      assert.ok(Math.abs(cardHeight(card) - (card.w * ih) / iw - (card.strip ?? 0)) < 1e-9);
    }
  });

  test(`${label}: every screenshot appears exactly once`, () => {
    assert.deepEqual(layout.cards.map((c) => c.img).toSorted(), Object.keys(IMG).toSorted());
  });

  test(`${label}: dropping a card on its neighbour is caught, and its home spot is clear`, () => {
    const [a, b] = [0, 1];
    const onTop = collageBoxes(
      layout,
      layout.cards.map((_, i) => (i === a ? [layout.cards[b].cx - layout.cards[a].cx, layout.cards[b].cy - layout.cards[a].cy] : [0, 0])),
    );
    assert.ok(collisionsFor(a, onTop, rules).some((c) => c.kind === "card" && c.b === b));
    assert.deepEqual(collisionsFor(a, boxes, rules), []);
  });

  test(`${label}: dragging a card onto the heading or off the frame is caught`, () => {
    const centre = layout.cards.map((c, i) => (i === 0 ? [layout.width / 2 - c.cx, layout.height / 2 - c.cy] : [0, 0]));
    assert.ok(collisionsFor(0, collageBoxes(layout, centre), rules).some((c) => c.kind === "zone"));
    const off = layout.cards.map((_, i) => (i === 0 ? [-layout.width, 0] : [0, 0]));
    assert.ok(collisionsFor(0, collageBoxes(layout, off), rules).some((c) => c.kind === "frame"));
  });
}
