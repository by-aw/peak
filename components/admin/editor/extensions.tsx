"use client";

import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { Table, TableCell, TableHeader, TableRow } from "@tiptap/extension-table";
import { Extension, Node, NodeViewWrapper, ReactNodeViewRenderer, mergeAttributes, type NodeViewProps } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";

/**
 * The editor only knows the HTML the public page can style (see lib/cms/blocks.ts for the allowlist). Custom blocks
 * serialise to `<div data-cms="...">` markers that blocks.ts turns into the CTA / audio / html blocks of an update.
 */

export type Variant = "post" | "legal" | "intro";

/** `class="phone-mt-8"` on lists and images is a phone-spacing hook set by the Framer import; keep it when it is there. */
const KeepClass = Extension.create({
  name: "keepClass",
  addGlobalAttributes() {
    return [
      {
        types: ["bulletList", "orderedList", "image"],
        attributes: {
          class: {
            default: null,
            parseHTML: (el: HTMLElement) => el.getAttribute("class"),
            renderHTML: (attrs: Record<string, unknown>) => (attrs.class ? { class: attrs.class as string } : {}),
          },
        },
      },
    ];
  },
});

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100">
      Remove
    </button>
  );
}

function CtaView({ node, updateAttributes, deleteNode, selected }: NodeViewProps) {
  const a = node.attrs as { text: string; href: string; target: string };
  return (
    <NodeViewWrapper data-drag-handle className={`my-4 rounded-xl border bg-white p-3 ${selected ? "border-purple-500" : "border-gray-200"}`} contentEditable={false}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Button</span>
        <RemoveButton onClick={deleteNode} />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="text-xs text-gray-600">
          Button text
          <input value={a.text} onChange={(e) => updateAttributes({ text: e.target.value })} placeholder="Try Mochi free" className="mt-1 w-full rounded-lg border border-gray-300 px-2 py-1.5 text-sm text-gray-900" />
        </label>
        <label className="text-xs text-gray-600">
          Where it goes
          <input value={a.href} onChange={(e) => updateAttributes({ href: e.target.value })} placeholder="https://… or /download" className="mt-1 w-full rounded-lg border border-gray-300 px-2 py-1.5 text-sm text-gray-900" />
        </label>
      </div>
      <label className="mt-2 flex items-center gap-2 text-xs text-gray-600">
        <input type="checkbox" checked={a.target === "_blank"} onChange={(e) => updateAttributes({ target: e.target.checked ? "_blank" : "" })} />
        Open in a new tab
      </label>
      <div className="mt-3">
        <span className="inline-flex rounded-lg bg-black px-4 py-2 text-sm font-medium text-white">{a.text || "Button"}</span>
      </div>
    </NodeViewWrapper>
  );
}

function AudioView({ node, updateAttributes, deleteNode, selected }: NodeViewProps) {
  const a = node.attrs as { src: string; duration: string };
  return (
    <NodeViewWrapper data-drag-handle className={`my-4 rounded-xl border bg-white p-3 ${selected ? "border-purple-500" : "border-gray-200"}`} contentEditable={false}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Audio clip</span>
        <RemoveButton onClick={deleteNode} />
      </div>
      <audio controls src={a.src} className="w-full" />
      <label className="mt-2 block text-xs text-gray-600">
        Length shown on the player
        <input value={a.duration} onChange={(e) => updateAttributes({ duration: e.target.value })} placeholder="0:19" className="mt-1 w-24 rounded-lg border border-gray-300 px-2 py-1.5 text-sm text-gray-900" />
      </label>
    </NodeViewWrapper>
  );
}

function EmbedView({ node, deleteNode, selected }: NodeViewProps) {
  const html = String(node.attrs.html ?? "");
  const kind = html.includes("<iframe") ? "YouTube video" : "Video";
  return (
    <NodeViewWrapper data-drag-handle className={`my-4 flex items-center justify-between rounded-xl border bg-gray-50 p-3 ${selected ? "border-purple-500" : "border-gray-200"}`} contentEditable={false}>
      <span className="text-sm text-gray-700">{kind} (shown on the page, kept exactly as it is)</span>
      <RemoveButton onClick={deleteNode} />
    </NodeViewWrapper>
  );
}

function BreakView({ deleteNode, selected }: NodeViewProps) {
  return (
    <NodeViewWrapper data-drag-handle className={`my-4 flex items-center gap-3 ${selected ? "text-purple-600" : "text-gray-400"}`} contentEditable={false}>
      <span className="h-px flex-1 border-t border-dashed border-current" />
      <span className="text-xs">Section break (extra space between sections)</span>
      <button type="button" onClick={deleteNode} className="text-xs underline">Remove</button>
      <span className="h-px flex-1 border-t border-dashed border-current" />
    </NodeViewWrapper>
  );
}

const attr = (name: string, def = "") => ({ default: def, parseHTML: (el: HTMLElement) => el.getAttribute(name) ?? def, renderHTML: (attrs: Record<string, unknown>) => ({ [name]: String(attrs[name.replace(/^data-/, "").replace(/-(\w)/g, (_, c: string) => c.toUpperCase())] ?? def) }) });

const block = { group: "block", atom: true, selectable: true, draggable: true } as const;

export const CtaButton = Node.create({
  name: "ctaButton",
  ...block,
  addAttributes() {
    return { text: attr("data-text"), href: attr("data-href"), target: attr("data-target") };
  },
  parseHTML: () => [{ tag: 'div[data-cms="cta"]' }],
  renderHTML: ({ HTMLAttributes }) => ["div", mergeAttributes({ "data-cms": "cta" }, HTMLAttributes)],
  addNodeView: () => ReactNodeViewRenderer(CtaView),
});

export const AudioClip = Node.create({
  name: "audioClip",
  ...block,
  addAttributes() {
    return { src: attr("data-src"), duration: attr("data-duration"), bars: attr("data-bars"), srcUrl: attr("data-src-url") };
  },
  parseHTML: () => [{ tag: 'div[data-cms="audio"]' }],
  renderHTML: ({ HTMLAttributes }) => {
    // Omit empty optional attributes so the stored block stays clean.
    const out: Record<string, string> = { "data-cms": "audio" };
    for (const [k, v] of Object.entries(HTMLAttributes)) if (v !== "") out[k] = String(v);
    return ["div", out];
  },
  addNodeView: () => ReactNodeViewRenderer(AudioView),
});

export const VideoEmbed = Node.create({
  name: "videoEmbed",
  ...block,
  addAttributes() {
    return { html: attr("data-html") };
  },
  parseHTML: () => [{ tag: 'div[data-cms="embed"]' }],
  renderHTML: ({ HTMLAttributes }) => ["div", mergeAttributes({ "data-cms": "embed" }, HTMLAttributes)],
  addNodeView: () => ReactNodeViewRenderer(EmbedView),
});

export const SectionBreak = Node.create({
  name: "sectionBreak",
  ...block,
  parseHTML: () => [{ tag: 'div[data-cms="break"]' }],
  renderHTML: () => ["div", { "data-cms": "break" }],
  addNodeView: () => ReactNodeViewRenderer(BreakView),
});

export function buildExtensions(variant: Variant, placeholder: string) {
  const rich = variant === "post";
  return [
    StarterKit.configure({
      heading: { levels: [1, 2, 3, 4] },
      blockquote: rich ? {} : false,
      link: { openOnClick: false, autolink: false, linkOnPaste: true, HTMLAttributes: { rel: null, target: null, class: null } },
      underline: false,
      strike: false,
      code: false,
      codeBlock: false,
      horizontalRule: false,
    }),
    KeepClass,
    Placeholder.configure({ placeholder }),
    ...(rich
      ? [
          Image.configure({ inline: false, allowBase64: false }),
          Table.configure({ resizable: false }),
          TableRow,
          TableHeader,
          TableCell,
          CtaButton,
          AudioClip,
          VideoEmbed,
          SectionBreak,
        ]
      : []),
  ];
}
