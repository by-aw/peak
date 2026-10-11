"use client";

import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { Table, TableCell, TableHeader, TableRow } from "@tiptap/extension-table";
import { Extension, Node, NodeViewWrapper, ReactNodeViewRenderer, mergeAttributes, type NodeViewProps } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import { Pencil, Trash2 } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/components/admin/lib/utils";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/admin/ui/popover";
import { Switch } from "@/components/admin/ui/switch";

/**
 * The editor only knows the HTML the public page can style (see lib/cms/blocks.ts for the allowlist). Custom blocks
 * serialise to `<div data-cms="...">` markers that blocks.ts turns into the CTA / audio / html blocks of an update.
 */

export type Variant = "post" | "legal" | "intro" | "lesson" | "audit" | "inline";

/**
 * What each variant offers (the server sanitiser decides what is kept; see `Profile` in lib/cms/blocks.ts):
 *   post    updates body: headings, lists, quotes, Insert menu (images, tables, buttons, audio, section breaks)
 *   legal   legal body: title/heading/subheading, lists
 *   intro   legal intro: lists, no heading menu
 *   lesson  academy description: heading/subheading, lists
 *   audit   audit report sections: heading (h2 only), lists, quotes
 *   inline  short descriptions: bold, italic, links only
 */
export const VARIANTS: Record<Variant, { headings: (1 | 2 | 3)[]; lists: boolean; quote: boolean; insert: boolean }> = {
  post: { headings: [2, 3], lists: true, quote: true, insert: true },
  legal: { headings: [1, 2, 3], lists: true, quote: false, insert: false },
  intro: { headings: [], lists: true, quote: false, insert: false },
  lesson: { headings: [2, 3], lists: true, quote: false, insert: false },
  audit: { headings: [2], lists: true, quote: true, insert: false },
  inline: { headings: [], lists: false, quote: false, insert: false },
};

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

/** Chrome around the CMS blocks inside the writing surface (the blocks' own preview stays in the page's style). */
function BlockFrame({ title, selected, actions, children, muted }: { title: string; selected: boolean; actions: ReactNode; children?: ReactNode; muted?: boolean }) {
  return (
    <NodeViewWrapper data-drag-handle contentEditable={false} className="my-4">
      <div data-admin-root className={cn("rounded-xl border bg-card p-3 text-card-foreground", muted && "bg-muted/50", selected && "border-primary ring-2 ring-primary/20")}>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{title}</span>
          <div className="flex items-center gap-1">{actions}</div>
        </div>
        {children && <div className="mt-3">{children}</div>}
      </div>
    </NodeViewWrapper>
  );
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <Button type="button" variant="ghost" size="xs" onClick={onClick} className="text-muted-foreground hover:text-destructive">
      <Trash2 /> Remove
    </Button>
  );
}

function EditPopover({ label, children, defaultOpen }: { label: string; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(Boolean(defaultOpen));
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button type="button" variant="outline" size="xs"><Pencil /> {label}</Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 space-y-3">
        {children}
        <div className="flex justify-end">
          <Button type="button" size="sm" onClick={() => setOpen(false)}>Done</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function CtaView({ node, updateAttributes, deleteNode, selected, editor }: NodeViewProps) {
  const a = node.attrs as { text: string; href: string; target: string };
  return (
    <BlockFrame
      title="Button"
      selected={selected}
      actions={
        <>
          <EditPopover label="Edit" defaultOpen={!a.text && !a.href && editor.isFocused}>
            <div className="grid gap-1.5">
              <Label htmlFor="cta-text">Button text</Label>
              <Input id="cta-text" value={a.text} onChange={(e) => updateAttributes({ text: e.target.value })} placeholder="Try Mochi free" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="cta-href">Where it goes</Label>
              <Input id="cta-href" value={a.href} onChange={(e) => updateAttributes({ href: e.target.value })} placeholder="https://… or /download" />
            </div>
            <div className="flex items-center gap-2">
              <Switch id="cta-new-tab" checked={a.target === "_blank"} onCheckedChange={(on) => updateAttributes({ target: on ? "_blank" : "" })} />
              <Label htmlFor="cta-new-tab">Open in a new tab</Label>
            </div>
          </EditPopover>
          <RemoveButton onClick={deleteNode} />
        </>
      }
    >
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex rounded-lg bg-black px-4 py-2 text-sm font-medium text-white">{a.text || "Button"}</span>
        <span className="min-w-0 truncate text-xs text-muted-foreground">
          {a.href ? <>{a.href}{a.target === "_blank" && " (new tab)"}</> : "No link yet"}
        </span>
      </div>
    </BlockFrame>
  );
}

function AudioView({ node, updateAttributes, deleteNode, selected }: NodeViewProps) {
  const a = node.attrs as { src: string; duration: string };
  return (
    <BlockFrame
      title="Audio clip"
      selected={selected}
      actions={
        <>
          <EditPopover label="Edit">
            <div className="grid gap-1.5">
              <Label htmlFor="audio-duration">Length shown on the player</Label>
              <Input id="audio-duration" value={a.duration} onChange={(e) => updateAttributes({ duration: e.target.value })} placeholder="0:19" className="w-28" />
            </div>
          </EditPopover>
          <RemoveButton onClick={deleteNode} />
        </>
      }
    >
      <audio controls src={a.src} className="w-full" />
      <p className="mt-2 text-xs text-muted-foreground">Length shown on the player: {a.duration || "not set"}</p>
    </BlockFrame>
  );
}

function EmbedView({ node, deleteNode, selected }: NodeViewProps) {
  const html = String(node.attrs.html ?? "");
  const kind = html.includes("<iframe") ? "YouTube video" : "Video";
  return (
    <BlockFrame title={kind} selected={selected} muted actions={<RemoveButton onClick={deleteNode} />}>
      <p className="text-sm text-muted-foreground">Shown on the page, kept exactly as it is.</p>
    </BlockFrame>
  );
}

function BreakView({ deleteNode, selected }: NodeViewProps) {
  return (
    <NodeViewWrapper data-drag-handle data-admin-root className={cn("my-4 flex items-center gap-3", selected ? "text-primary" : "text-muted-foreground")} contentEditable={false}>
      <span className="h-px flex-1 border-t border-dashed border-current" />
      <span className="text-xs">Section break (extra space between sections)</span>
      <RemoveButton onClick={deleteNode} />
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
  const v = VARIANTS[variant];
  return [
    StarterKit.configure({
      // The audit profile keeps h2 only and inline fields no headings at all; others keep pasted h1-h4.
      heading: variant === "inline" ? false : { levels: variant === "audit" ? [2] : [1, 2, 3, 4] },
      blockquote: v.quote ? {} : false,
      ...(v.lists ? {} : { bulletList: false, orderedList: false, listItem: false, listKeymap: false }),
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
