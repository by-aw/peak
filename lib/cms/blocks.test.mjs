// Run with `node --test lib/cms/blocks.test.mjs`. Round-trips every scraped post and legal page through the editor
// conversion (stored -> editor HTML -> stored) and requires semantic equality (attribute order / whitespace between
// tags normalised). Tiptap itself is not in the loop (it needs a DOM): this covers our conversion and sanitiser.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";

import { blocksToEditorHtml, editorHtmlToBlocks, editorHtmlToLegal, legalToEditorHtml, normalizeHtml, parseDay, sanitizeHtml } from "./blocks.ts";

const root = path.join(import.meta.dirname, "..", "..", "content");
const readAll = (dir) =>
  fs
    .readdirSync(path.join(root, dir))
    .filter((f) => f.endsWith(".json") && f !== "index.json")
    .map((f) => JSON.parse(fs.readFileSync(path.join(root, dir, f), "utf8")));

/** Whitespace between tags and the `<li><p>x</p></li>` vs `<li>x</li>` spelling are not content. */
const semantic = (html) =>
  normalizeHtml(html)
    .replace(/>\s+</g, "><")
    .replace(/<li><p>((?:(?!<\/?p>).)*)<\/p><\/li>/g, "<li>$1</li>")
    .replace(/<p><\/p>/g, "");

const loose = (b) => ({ ...b, ...(b.type === "html" ? { html: semantic(b.html) } : {}) });

test("every update's blocks survive stored -> editor -> stored", () => {
  const posts = readAll("updates");
  assert.ok(posts.length >= 50);
  const diffs = [];
  let html = 0, cta = 0, audio = 0;
  for (const post of posts) {
    const editor = blocksToEditorHtml(post.blocks);
    const back = editorHtmlToBlocks(editor);
    assert.deepEqual(back.problems, [], post.slug);
    const want = post.blocks.map((b) => {
      if (b.type === "html") return { ...loose(b), name: b.name };
      return b;
    });
    const got = back.blocks.map(loose);
    for (const b of post.blocks) if (b.type === "html") html++;
      else if (b.type === "cta") cta++;
      else audio++;
    if (want.length !== got.length) {
      diffs.push(`${post.slug}: ${want.length} blocks became ${got.length}`);
      continue;
    }
    want.forEach((w, i) => {
      const g = got[i];
      try {
        assert.deepEqual(g, w);
      } catch {
        const a = JSON.stringify(w), b = JSON.stringify(g);
        let k = 0;
        while (a[k] === b[k]) k++;
        diffs.push(`${post.slug} block ${i} (${w.type}) differs near: ${a.slice(Math.max(0, k - 60), k + 100)}  =>  ${b.slice(Math.max(0, k - 60), k + 100)}`);
      }
    });
  }
  console.log(`checked ${posts.length} posts: ${html} html, ${cta} cta, ${audio} audio blocks; ${diffs.length} differences`);
  for (const d of diffs) console.log("  " + d);
  assert.equal(diffs.length, 0);
});

test("editing round-trip is stable (a second pass changes nothing)", () => {
  for (const post of readAll("updates")) {
    const once = editorHtmlToBlocks(blocksToEditorHtml(post.blocks));
    const twice = editorHtmlToBlocks(blocksToEditorHtml(once.blocks));
    assert.deepEqual(twice.blocks, once.blocks, post.slug);
    assert.equal(twice.body, once.body, post.slug);
  }
});

test("legal intro and body survive", () => {
  const diffs = [];
  for (const doc of readAll("legal")) {
    for (const field of ["intro", "body"]) {
      const back = editorHtmlToLegal(legalToEditorHtml(doc[field]));
      if (semantic(back) !== semantic(doc[field])) {
        const a = semantic(doc[field]), b = semantic(back);
        let k = 0;
        while (a[k] === b[k]) k++;
        diffs.push(`${doc.slug}.${field}: ${a.slice(Math.max(0, k - 50), k + 80)}  =>  ${b.slice(Math.max(0, k - 50), k + 80)}`);
      }
    }
  }
  for (const d of diffs) console.log("  " + d);
  assert.equal(diffs.length, 0);
});

test("sanitiser removes anything the renderer cannot style", () => {
  const dirty = '<p onclick="x()">hi <script>alert(1)</script><span style="color:red">there</span> <a href="javascript:alert(1)">bad</a> <a href="https://a.test/?q=1&amp;r=2" target="_blank" class="x">ok</a></p><iframe src="https://evil.test"></iframe><div class="embed"><iframe src="https://evil.test/embed/x"></iframe></div><img src="data:image/png;base64,AAA"><p></p>';
  assert.equal(sanitizeHtml(dirty), '<p>hi there bad <a href="https://a.test/?q=1&amp;r=2" target="_blank" rel="noopener">ok</a></p>');
  assert.equal(sanitizeHtml("<table><tr><td>a</td></tr></table><blockquote><p>q</p></blockquote><h2>x</h2>", "legal"), "<p>a</p><p>q</p><h2>x</h2>");
});

test("editor markers become blocks, bad ones are reported", () => {
  const html =
    '<p>one</p><div data-cms="cta" data-text="Try it" data-href="/download" data-target="_blank"></div><div data-cms="cta" data-text="" data-href="/x"></div><div data-cms="audio" data-src="https://x.public.blob.vercel-storage.com/a.mp3" data-duration="0:19" data-bars="[1,2,3]"></div><p>two</p><div data-cms="break"></div><p>three</p>';
  const { blocks, body, problems } = editorHtmlToBlocks(html);
  assert.deepEqual(blocks.map((b) => b.type), ["html", "cta", "audio", "html", "html"]);
  assert.equal(blocks[3].name, "Content 2");
  assert.equal(body, "<p>one</p>\n<p>two</p>\n<p>three</p>");
  assert.equal(problems.length, 1);
});

test("dates", () => {
  assert.deepEqual(parseDay("2026-01-16"), { iso: "2026-01-16T00:00:00.000Z", short: "Jan 16, 2026", long: "January 16, 2026" });
  assert.equal(parseDay("2026-02-31"), null);
});
