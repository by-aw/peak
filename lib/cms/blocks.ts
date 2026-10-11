/**
 * Editor <-> storage conversion for rich text. Pure string functions (no DOM), so they run in server actions, in the
 * browser and in `node --test`.
 *
 * Storage (what the public renderer reads):
 *   updates: `blocks` = html | cta | audio, `body` = every html block joined with "\n"
 *   legal:   `intro` / `body` = one sanitised HTML string each
 *   watch / academy / audit: each rich-text field is one sanitised HTML string (profile per field, see lib/cms/fields.ts)
 *
 * Editor: one HTML string that Tiptap loads/serialises. The html blocks are concatenated in order and the non-html
 * blocks become marker elements the custom Tiptap nodes understand:
 *   <div data-cms="cta" data-text data-href data-target>      CTA button
 *   <div data-cms="audio" data-src data-duration data-bars>    audio clip
 *   <div data-cms="embed" data-html>                           video / YouTube embed kept as-is
 *   <div data-cms="break">                                     boundary between two html blocks (Framer "Content N")
 *
 * Everything that goes through `sanitizeHtml` is parsed and rewritten from an allowlist, so the server never stores
 * markup the public renderer does not style.
 */

/**
 * Allowlist per kind of field:
 *   post    updates bodies (COMMON + images, tables, blockquotes, embeds)
 *   legal   legal intro/body and academy lesson descriptions (COMMON: p, h1-h4, lists, strong, em, a, br)
 *   audit   audit report sections (p, h2, lists, blockquote, strong, em, a, br)
 *   inline  short descriptions (p, strong, em, a, br)
 */
export type Profile = "post" | "legal" | "audit" | "inline";

export type StoredBlock =
  | { type: "html"; name: string; html: string }
  | { type: "cta"; text: string; href: string; target: string | null }
  | { type: "audio"; src: string; duration: string | null; bars?: number[]; srcUrl?: string };

/* ------------------------------------------------------------------ html tree */

export type El = { tag: string; attrs: Record<string, string>; children: Node[] };
export type Node = El | string;

const VOID = new Set(["br", "img", "hr", "col", "input", "meta", "link", "source"]);
const DROP_WITH_CONTENT = new Set(["script", "style", "iframe", "object", "embed", "noscript", "template", "svg", "math", "head", "title", "textarea", "select", "button", "form", "audio", "video"]);

const NAMED: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

export function decodeEntities(s: string): string {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === "#") {
      const code = e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return code > 0 && code < 0x110000 ? String.fromCodePoint(code) : m;
    }
    return NAMED[e.toLowerCase()] ?? m;
  });
}

export function escapeAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const ATTR_RE = /([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;

/** Lenient HTML parser: balanced tags, unknown closers ignored, unclosed elements closed at their parent's end. */
export function parseHtml(html: string): Node[] {
  const root: El = { tag: "#root", attrs: {}, children: [] };
  const stack: El[] = [root];
  const re = /<!--[\s\S]*?-->|<!\[CDATA\[[\s\S]*?\]\]>|<!doctype[^>]*>|<\/([a-zA-Z][^\s>/]*)\s*>|<([a-zA-Z][^\s>/]*)((?:"[^"]*"|'[^']*'|[^>"'])*)>/gi;
  let last = 0;
  const pushText = (t: string) => {
    if (!t) return;
    // A stray "<" or ">" is text, kept as an entity so it can never open a tag later.
    stack[stack.length - 1].children.push(t.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
  };
  for (let m = re.exec(html); m; m = re.exec(html)) {
    pushText(html.slice(last, m.index));
    last = m.index + m[0].length;
    if (m[1]) {
      const tag = m[1].toLowerCase();
      for (let i = stack.length - 1; i > 0; i--) {
        if (stack[i].tag === tag) {
          stack.length = i;
          break;
        }
      }
    } else if (m[2]) {
      const tag = m[2].toLowerCase();
      const attrs: Record<string, string> = {};
      const raw = m[3].replace(/\/\s*$/, "");
      for (let a = ATTR_RE.exec(raw); a; a = ATTR_RE.exec(raw)) {
        const name = a[1].toLowerCase();
        if (!(name in attrs)) attrs[name] = decodeEntities(a[2] ?? a[3] ?? a[4] ?? "");
      }
      ATTR_RE.lastIndex = 0;
      const el: El = { tag, attrs, children: [] };
      stack[stack.length - 1].children.push(el);
      if (!VOID.has(tag) && !/\/\s*>$/.test(m[0])) {
        // Raw-text elements: swallow everything up to the closing tag.
        if (tag === "script" || tag === "style" || tag === "textarea") {
          const close = new RegExp(`</${tag}\\s*>`, "i");
          close.lastIndex = 0;
          const rest = html.slice(last);
          const c = close.exec(rest);
          last += c ? c.index + c[0].length : rest.length;
          re.lastIndex = last;
        } else stack.push(el);
      }
    }
  }
  pushText(html.slice(last));
  return root.children;
}

function serializeAttrs(attrs: Record<string, string | true>, order?: string[]): string {
  const names = order ? order.filter((n) => n in attrs) : Object.keys(attrs);
  return names.map((n) => (attrs[n] === true ? ` ${n}` : ` ${n}="${escapeAttr(String(attrs[n]))}"`)).join("");
}

/** Faithful serialisation (nothing dropped), attributes sorted: used to compare documents. */
export function normalizeHtml(html: string): string {
  const walk = (nodes: Node[]): string =>
    nodes
      .map((n) => {
        if (typeof n === "string") return n;
        const names = Object.keys(n.attrs).sort();
        const attrs = names.map((k) => (n.attrs[k] === "" ? ` ${k}` : ` ${k}="${escapeAttr(n.attrs[k])}"`)).join("");
        return VOID.has(n.tag) ? `<${n.tag}${attrs}>` : `<${n.tag}${attrs}>${walk(n.children)}</${n.tag}>`;
      })
      .join("");
  return walk(parseHtml(html));
}

/* ------------------------------------------------------------------ sanitiser */

const BLOCK_CONTAINERS = new Set(["#root", "ul", "ol", "table", "thead", "tbody", "tr", "blockquote"]);

const COMMON: Record<string, string[]> = {
  p: [],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  strong: [],
  em: [],
  br: [],
  ul: [],
  ol: [],
  li: [],
  a: ["href", "target"],
};
const POST_ONLY: Record<string, string[]> = {
  blockquote: [],
  img: ["src", "alt", "width", "height", "class"],
  table: [],
  thead: [],
  tbody: [],
  tr: [],
  th: ["colspan", "rowspan"],
  td: ["colspan", "rowspan"],
};
const POST_CLASS_TAGS = new Set(["ul", "ol", "img"]);
const ALIAS: Record<string, string> = { b: "strong", i: "em", h5: "h4", h6: "h4", dir: "ul", menu: "ul" };

const AUDIT: Record<string, string[]> = { p: [], h2: [], strong: [], em: [], br: [], ul: [], ol: [], li: [], a: ["href", "target"], blockquote: [] };
const INLINE: Record<string, string[]> = { p: [], strong: [], em: [], br: [], a: ["href", "target"] };

function allowedTags(profile: Profile): Record<string, string[]> {
  if (profile === "legal") return COMMON;
  if (profile === "audit") return AUDIT;
  if (profile === "inline") return INLINE;
  return { ...COMMON, ...POST_ONLY, ul: ["class"], ol: ["class"] };
}

function safeUrl(url: string | undefined, kinds: "link" | "media"): string | null {
  const v = (url ?? "").trim();
  if (!v || /[\u0000-\u001f\u007f]/.test(v)) return null;
  if (/^(https?:)?\/\//i.test(v) || v.startsWith("/") || v.startsWith("#")) return v;
  if (kinds === "link" && /^(mailto:|tel:)/i.test(v)) return v;
  if (!/^[a-z][a-z0-9+.-]*:/i.test(v)) return v; // relative
  return null;
}

function cleanClass(v: string | undefined): string | null {
  return v && v.split(/\s+/).includes("phone-mt-8") ? "phone-mt-8" : null;
}

const YOUTUBE = /^https:\/\/(www\.)?(youtube\.com|youtube-nocookie\.com)\/embed\/[\w-]+(\?[\w=&%.-]*)?$/;

/** Canonical HTML for a video embed ("div.embed > iframe" for YouTube, "div.embed-video > video" for a file), or "". */
function sanitizeEmbed(el: El): string {
  const find = (nodes: Node[], tag: string): El | null => {
    for (const n of nodes) {
      if (typeof n === "string") continue;
      if (n.tag === tag) return n;
      const r = find(n.children, tag);
      if (r) return r;
    }
    return null;
  };
  const wrapper = el.tag === "div" ? el : null;
  const ratio = wrapper?.attrs["data-ratio"];
  const wrapAttrs: Record<string, string> = {};
  const cls = new Set((wrapper?.attrs.class ?? "").split(/\s+/));
  const iframe = el.tag === "iframe" ? el : find(el.children, "iframe");
  if (iframe) {
    const src = iframe.attrs.src?.trim() ?? "";
    if (!YOUTUBE.test(src)) return "";
    wrapAttrs.class = ["embed", cls.has("phone-mt-8") ? "phone-mt-8" : ""].filter(Boolean).join(" ");
    if (ratio && /^\d+(\.\d+)?$/.test(ratio)) wrapAttrs["data-ratio"] = ratio;
    const a: Record<string, string | true> = { src, title: iframe.attrs.title || "Video" };
    if (iframe.attrs.allow && /^[\w\s;-]+$/.test(iframe.attrs.allow)) a.allow = iframe.attrs.allow;
    if ("allowfullscreen" in iframe.attrs) a.allowfullscreen = true;
    a.loading = "lazy";
    return `<div${serializeAttrs(wrapAttrs, ["class", "data-ratio"])}><iframe${serializeAttrs(a, ["src", "title", "allow", "allowfullscreen", "loading"])}></iframe></div>`;
  }
  const video = el.tag === "video" ? el : find(el.children, "video");
  if (video) {
    const src = safeUrl(video.attrs.src, "media");
    if (!src) return "";
    const a: Record<string, string | true> = {};
    for (const f of ["autoplay", "loop", "muted", "playsinline", "controls"]) if (f in video.attrs) a[f] = true;
    a.src = src;
    wrapAttrs.class = ["embed-video", cls.has("phone-mt-8") ? "phone-mt-8" : ""].filter(Boolean).join(" ");
    return `<div${serializeAttrs(wrapAttrs, ["class"])}><video${serializeAttrs(a, ["autoplay", "loop", "muted", "playsinline", "controls", "src"])}></video></div>`;
  }
  return "";
}

function isEmbed(el: El): boolean {
  if (el.tag === "iframe" || el.tag === "video") return true;
  if (el.tag !== "div") return false;
  return /(^|\s)embed(-video)?(\s|$)/.test(el.attrs.class ?? "");
}

type Ctx = { profile: Profile; embeds: "html" | "marker" };

function isBlank(n: Node): boolean {
  return typeof n === "string" && n.trim() === "";
}

function renderChildren(parent: string, nodes: Node[], ctx: Ctx): string {
  const dropBlank = BLOCK_CONTAINERS.has(parent);
  let out = "";
  let loose = ""; // inline run directly in a block container: wrap in <p>
  const flushLoose = () => {
    if (loose.trim()) out += `<p>${loose}</p>`;
    loose = "";
  };
  for (const n of nodes) {
    if (typeof n === "string") {
      if (dropBlank && isBlank(n)) continue;
      if (dropBlank && (parent === "#root" || parent === "blockquote")) loose += n;
      else out += n;
      continue;
    }
    const html = renderEl(n, parent, ctx);
    if (!html) continue;
    const inline = /^<(strong|em|a|br)[\s>]/.test(html);
    if (dropBlank && (parent === "#root" || parent === "blockquote") && inline) loose += html;
    else {
      flushLoose();
      out += html;
    }
  }
  flushLoose();
  return out;
}

function renderEl(el: El, parent: string, ctx: Ctx): string {
  if (ctx.profile === "post" && isEmbed(el) && (parent === "#root" || parent === "blockquote" || el.tag === "div")) {
    const html = sanitizeEmbed(el);
    if (!html) return "";
    return ctx.embeds === "marker" ? `<div data-cms="embed" data-html="${escapeAttr(html)}"></div>` : html;
  }
  const tag = ALIAS[el.tag] ?? el.tag;
  const rules = allowedTags(ctx.profile);
  if (!(tag in rules)) {
    if (DROP_WITH_CONTENT.has(el.tag)) return "";
    // Unknown wrapper (div, span, font, section...): keep the text, lose the tag.
    return renderChildren(parent, el.children, ctx);
  }
  if (tag === "br") return "<br>";
  const attrs: Record<string, string | true> = {};
  if (tag === "a") {
    const href = safeUrl(el.attrs.href, "link");
    if (!href) return renderChildren(parent, el.children, ctx);
    attrs.href = href;
    if (el.attrs.target === "_blank") {
      attrs.target = "_blank";
      attrs.rel = "noopener";
    }
  } else if (tag === "img") {
    const src = safeUrl(el.attrs.src, "media");
    if (!src) return "";
    attrs.src = src;
    for (const k of ["width", "height"]) if (/^\d{1,5}$/.test(el.attrs[k] ?? "")) attrs[k] = el.attrs[k];
    attrs.alt = el.attrs.alt ?? "";
  } else if (tag === "td" || tag === "th") {
    for (const k of ["colspan", "rowspan"]) if (/^[2-9]$|^[1-9]\d+$/.test(el.attrs[k] ?? "")) attrs[k] = el.attrs[k];
  }
  if (POST_CLASS_TAGS.has(tag) && ctx.profile === "post") {
    const c = cleanClass(el.attrs.class);
    if (c) attrs.class = c;
  }
  const order = ["class", "href", "target", "rel", "src", "alt", "width", "height", "colspan", "rowspan"];
  const open = `<${tag}${serializeAttrs(attrs, order)}>`;
  if (tag === "img") return open;

  let children = el.children;
  // `<li><p>x</p></li>` (what Tiptap writes) is stored as `<li>x</li>`, the form the scraped posts use.
  if (tag === "li") {
    const ps = children.filter((c): c is El => typeof c !== "string" && c.tag === "p");
    if (ps.length === 1 && children.indexOf(ps[0]) === children.findIndex((c) => !isBlank(c))) {
      const i = children.indexOf(ps[0]);
      children = [...children.slice(0, i), ...ps[0].children, ...children.slice(i + 1)];
    }
  }
  const inner = renderChildren(tag, children, ctx);
  if (tag === "p" && !inner) return "";
  if (tag === "li" && ctx.profile !== "post" && !inner) return "";
  return `${open}${inner}</${tag}>`;
}

/** Parse, drop everything outside the allowlist for `profile`, and rewrite as compact canonical HTML (no whitespace between tags). */
export function sanitizeHtml(html: string, profile: Profile = "post"): string {
  return renderChildren("#root", parseHtml(html ?? ""), { profile, embeds: "html" });
}

/* ------------------------------------------------------------------ updates blocks */

function marker(attrs: Record<string, string | undefined>): string {
  const a = Object.fromEntries(Object.entries(attrs).filter(([, v]) => v !== undefined)) as Record<string, string>;
  return `<div${serializeAttrs(a)}></div>`;
}

/** Stored `blocks` -> the single HTML string the editor loads. */
export function blocksToEditorHtml(blocks: readonly (StoredBlock | { type: string })[]): string {
  let out = "";
  let prevHtml = false;
  for (const raw of blocks) {
    const b = raw as StoredBlock;
    if (b.type === "html") {
      if (prevHtml) out += marker({ "data-cms": "break" });
      out += renderChildren("#root", parseHtml(b.html ?? ""), { profile: "post", embeds: "marker" });
      prevHtml = true;
      continue;
    }
    prevHtml = false;
    if (b.type === "cta") {
      out += marker({ "data-cms": "cta", "data-text": b.text, "data-href": b.href, "data-target": b.target === "_blank" ? "_blank" : "" });
    } else if (b.type === "audio") {
      out += marker({
        "data-cms": "audio",
        "data-src": b.src,
        "data-duration": b.duration ?? "",
        "data-bars": b.bars ? JSON.stringify(b.bars) : undefined,
        "data-src-url": b.srcUrl,
      });
    }
  }
  return out;
}

export type ConvertResult = { blocks: StoredBlock[]; body: string; problems: string[] };

const DURATION = /^\d{1,3}:[0-5]\d$/;

/** The editor's HTML -> stored `blocks` (+ `body`). `problems` are friendly messages for things that had to be dropped. */
export function editorHtmlToBlocks(html: string): ConvertResult {
  const blocks: StoredBlock[] = [];
  const problems: string[] = [];
  let segment: Node[] = [];
  let n = 0;
  const flush = () => {
    const out = renderChildren("#root", segment, { profile: "post", embeds: "html" });
    segment = [];
    if (!out) return;
    n += 1;
    blocks.push({ type: "html", name: `Content ${n}`, html: out });
  };
  for (const node of parseHtml(html ?? "")) {
    const kind = typeof node === "string" ? null : node.attrs["data-cms"];
    if (!kind || typeof node === "string") {
      segment.push(node);
      continue;
    }
    const a = node.attrs;
    if (kind === "break") {
      flush();
    } else if (kind === "embed") {
      segment.push(...parseHtml(a["data-html"] ?? ""));
    } else if (kind === "cta") {
      flush();
      const text = (a["data-text"] ?? "").trim();
      const href = safeUrl(a["data-href"], "link");
      if (!text || !href) problems.push("A button was left out because it needs both a label and a link.");
      else blocks.push({ type: "cta", text, href, target: a["data-target"] === "_blank" ? "_blank" : null });
    } else if (kind === "audio") {
      flush();
      const src = safeUrl(a["data-src"], "media");
      if (!src) {
        problems.push("An audio clip was left out because its file is missing.");
        continue;
      }
      const block: StoredBlock = { type: "audio", src, duration: DURATION.test(a["data-duration"] ?? "") ? a["data-duration"] : null };
      try {
        const bars = JSON.parse(a["data-bars"] || "null");
        if (Array.isArray(bars) && bars.length > 0 && bars.length <= 64 && bars.every((x) => typeof x === "number" && Number.isFinite(x))) block.bars = bars;
      } catch {
        /* no waveform: the player falls back to its default bars */
      }
      const srcUrl = safeUrl(a["data-src-url"], "media");
      if (srcUrl) block.srcUrl = srcUrl;
      blocks.push(block);
    }
  }
  flush();
  return { blocks, body: blocksToBody(blocks), problems };
}

/** `body` = every html block joined with a newline (the scraped posts' convention). */
export function blocksToBody(blocks: readonly StoredBlock[]): string {
  return blocks.filter((b): b is Extract<StoredBlock, { type: "html" }> => b.type === "html").map((b) => b.html).join("\n");
}

/* ------------------------------------------------------------------ legal */

export function legalToEditorHtml(html: string): string {
  return sanitizeHtml(html, "legal");
}
export function editorHtmlToLegal(html: string): string {
  return sanitizeHtml(html, "legal");
}

/* ------------------------------------------------------------------ dates */

const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "2026-01-16" -> { iso: "2026-01-16T00:00:00.000Z", short: "Jan 16, 2026", long: "January 16, 2026" }, or null if not a real date. */
export function parseDay(day: string): { iso: string; short: string; long: string } | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(day);
  if (!m) return null;
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  if (d.getUTCFullYear() !== +m[1] || d.getUTCMonth() !== +m[2] - 1 || d.getUTCDate() !== +m[3]) return null;
  return {
    iso: d.toISOString(),
    short: `${MONTHS_SHORT[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`,
    long: `${MONTHS_LONG[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`,
  };
}

/** Stored ISO date ("2026-01-16T00:00:00.000Z" or "2025-09-08") -> "2026-01-16" for <input type="date">. */
export function toDay(iso: string | null | undefined): string {
  return /^\d{4}-\d{2}-\d{2}/.test(iso ?? "") ? (iso as string).slice(0, 10) : "";
}
