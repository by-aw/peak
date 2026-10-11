"use client";

import { EditorContent, useEditor, useEditorState, type Editor } from "@tiptap/react";
import { useRef, useState, type ReactNode } from "react";
import "./editor.css";
import { buildExtensions, type Variant } from "./extensions";
import { uploadAudio, uploadImage } from "./upload";

type Props = {
  variant: Variant;
  /** Loaded once; the editor owns the content after that. */
  initialHtml: string;
  /** Called with the editor's HTML on every change. */
  onChange: (html: string) => void;
  /** Called once with the editor's own normalised version of `initialHtml`, so "unsaved changes" starts clean. */
  onReady?: (html: string) => void;
  placeholder?: string;
  label: string;
};

function Btn({ active, disabled, onClick, children, title }: { active?: boolean; disabled?: boolean; onClick: () => void; children: ReactNode; title?: string }) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      aria-pressed={active}
      // mousedown would steal the selection from the editor
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`rounded-md px-2.5 py-1.5 text-sm font-medium disabled:opacity-40 ${active ? "bg-purple-100 text-purple-800" : "text-gray-700 hover:bg-gray-100"}`}
    >
      {children}
    </button>
  );
}

const Sep = () => <span aria-hidden className="mx-1 h-5 w-px bg-gray-200" />;

export function RichEditor({ variant, initialHtml, onChange, onReady, placeholder, label }: Props) {
  const rich = variant === "post";
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkHref, setLinkHref] = useState("");
  const [linkNewTab, setLinkNewTab] = useState(false);
  const imageInput = useRef<HTMLInputElement>(null);
  const audioInput = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: buildExtensions(variant, placeholder ?? "Start writing…"),
    content: initialHtml,
    editorProps: { attributes: { class: `cms-prose ${variant === "intro" ? "cms-prose-small" : ""}`, "aria-label": label } },
    onCreate: ({ editor }) => onReady?.(editor.getHTML()),
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  const s = useEditorState({
    editor,
    selector: ({ editor }) => ({
      h1: editor?.isActive("heading", { level: 1 }) ?? false,
      h2: editor?.isActive("heading", { level: 2 }) ?? false,
      h3: editor?.isActive("heading", { level: 3 }) ?? false,
      bold: editor?.isActive("bold") ?? false,
      italic: editor?.isActive("italic") ?? false,
      link: editor?.isActive("link") ?? false,
      bullet: editor?.isActive("bulletList") ?? false,
      ordered: editor?.isActive("orderedList") ?? false,
      quote: editor?.isActive("blockquote") ?? false,
      table: editor?.isActive("table") ?? false,
      image: editor?.isActive("image") ?? false,
      imageAlt: (editor?.getAttributes("image").alt as string | undefined) ?? "",
      canUndo: editor?.can().undo() ?? false,
      canRedo: editor?.can().redo() ?? false,
    }),
  });

  if (!editor || !s) return <div className="min-h-[320px] rounded-xl border border-gray-300 bg-white" aria-busy />;

  const run = async (name: string, fn: () => Promise<void>) => {
    setError(null);
    setBusy(name);
    try {
      await fn();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(null);
    }
  };

  const openLink = () => {
    const attrs = editor.getAttributes("link") as { href?: string; target?: string | null };
    setLinkHref(attrs.href ?? "");
    setLinkNewTab(attrs.target === "_blank");
    setLinkOpen(true);
  };
  const applyLink = () => {
    const href = linkHref.trim();
    const chain = editor.chain().focus().extendMarkRange("link");
    if (!href) chain.unsetLink().run();
    else chain.setLink({ href, target: linkNewTab ? "_blank" : null }).run();
    setLinkOpen(false);
  };

  const h = (level: 1 | 2 | 3) => editor.chain().focus().toggleHeading({ level }).run();

  return (
    <div className="rounded-xl border border-gray-300 bg-white">
      <div role="toolbar" aria-label={`${label} formatting`} className="sticky top-0 z-10 flex flex-wrap items-center gap-0.5 rounded-t-xl border-b border-gray-200 bg-white/95 p-1.5 backdrop-blur">
        {variant === "legal" && <Btn active={s.h1} onClick={() => h(1)} title="Page title">Title</Btn>}
        {variant !== "intro" && (
          <>
            <Btn active={s.h2} onClick={() => h(2)} title="Large heading">Heading</Btn>
            <Btn active={s.h3} onClick={() => h(3)} title="Smaller heading">Subheading</Btn>
            <Sep />
          </>
        )}
        <Btn active={s.bold} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold (Ctrl/Cmd+B)"><strong>B</strong></Btn>
        <Btn active={s.italic} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic (Ctrl/Cmd+I)"><em>I</em></Btn>
        <Btn active={s.link} onClick={openLink} title="Add or edit a link">Link</Btn>
        <Sep />
        <Btn active={s.bullet} onClick={() => editor.chain().focus().toggleBulletList().run()}>Bullets</Btn>
        <Btn active={s.ordered} onClick={() => editor.chain().focus().toggleOrderedList().run()}>Numbers</Btn>
        {rich && <Btn active={s.quote} onClick={() => editor.chain().focus().toggleBlockquote().run()}>Quote</Btn>}
        {rich && (
          <>
            <Sep />
            <Btn disabled={busy === "image"} onClick={() => imageInput.current?.click()} title="Upload a picture">{busy === "image" ? "Uploading…" : "Image"}</Btn>
            <Btn onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} title="Insert a table">Table</Btn>
            <Btn onClick={() => editor.chain().focus().insertContent({ type: "ctaButton", attrs: { text: "", href: "", target: "" } }).run()} title="Add a button that links somewhere">Button</Btn>
            <Btn disabled={busy === "audio"} onClick={() => audioInput.current?.click()} title="Upload an audio clip">{busy === "audio" ? "Uploading…" : "Audio"}</Btn>
            <Btn onClick={() => editor.chain().focus().insertContent({ type: "sectionBreak" }).run()} title="Adds the wider gap used between sections">Section break</Btn>
          </>
        )}
        <span className="ml-auto flex">
          <Btn disabled={!s.canUndo} onClick={() => editor.chain().focus().undo().run()}>Undo</Btn>
          <Btn disabled={!s.canRedo} onClick={() => editor.chain().focus().redo().run()}>Redo</Btn>
        </span>
      </div>

      {linkOpen && (
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 bg-gray-50 p-2">
          <input
            autoFocus
            value={linkHref}
            onChange={(e) => setLinkHref(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                applyLink();
              }
              if (e.key === "Escape") setLinkOpen(false);
            }}
            placeholder="https://example.com or /download"
            aria-label="Link address"
            className="min-w-[14rem] flex-1 rounded-lg border border-gray-300 px-2 py-1.5 text-sm"
          />
          <label className="flex items-center gap-1.5 text-sm text-gray-700">
            <input type="checkbox" checked={linkNewTab} onChange={(e) => setLinkNewTab(e.target.checked)} /> New tab
          </label>
          <button type="button" onClick={applyLink} className="rounded-lg bg-purple-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-purple-700">{linkHref.trim() ? "Apply" : "Remove link"}</button>
          <button type="button" onClick={() => setLinkOpen(false)} className="rounded-lg px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100">Cancel</button>
        </div>
      )}

      {s.image && (
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 bg-gray-50 p-2 text-sm">
          <label className="flex flex-1 items-center gap-2 text-gray-700">
            Describe this picture
            <input value={s.imageAlt} onChange={(e) => editor.chain().updateAttributes("image", { alt: e.target.value }).run()} placeholder="For people who can't see it, and for search engines" className="min-w-[12rem] flex-1 rounded-lg border border-gray-300 px-2 py-1.5" />
          </label>
          <button type="button" onClick={() => editor.chain().focus().deleteSelection().run()} className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 font-medium hover:bg-gray-100">Remove picture</button>
        </div>
      )}

      {s.table && <TableTools editor={editor} />}

      <div className="px-4 py-3">
        <EditorContent editor={editor} />
      </div>

      {error && (
        <p role="alert" className="border-t border-red-200 bg-red-50 px-4 py-2 text-sm text-red-800">{error}</p>
      )}

      <input
        ref={imageInput}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (!file) return;
          void run("image", async () => {
            const img = await uploadImage(file);
            editor.chain().focus().setImage({ src: img.url, alt: "", ...(img.width && img.height ? { width: img.width, height: img.height } : {}) }).run();
          });
        }}
      />
      <input
        ref={audioInput}
        type="file"
        accept="audio/mpeg,audio/mp4,audio/x-m4a,audio/wav,audio/x-wav,.mp3,.m4a,.wav"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (!file) return;
          void run("audio", async () => {
            const a = await uploadAudio(file);
            editor.chain().focus().insertContent({ type: "audioClip", attrs: { src: a.url, duration: a.duration ?? "", bars: JSON.stringify(a.bars), srcUrl: "" } }).run();
          });
        }}
      />
    </div>
  );
}

function TableTools({ editor }: { editor: Editor }) {
  const items: [string, () => void][] = [
    ["Add row below", () => editor.chain().focus().addRowAfter().run()],
    ["Add column right", () => editor.chain().focus().addColumnAfter().run()],
    ["Delete row", () => editor.chain().focus().deleteRow().run()],
    ["Delete column", () => editor.chain().focus().deleteColumn().run()],
    ["Header row on/off", () => editor.chain().focus().toggleHeaderRow().run()],
    ["Delete table", () => editor.chain().focus().deleteTable().run()],
  ];
  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 p-2 text-sm">
      <span className="mr-1 text-gray-600">Table:</span>
      {items.map(([label, fn]) => (
        <button key={label} type="button" onMouseDown={(e) => e.preventDefault()} onClick={fn} className="rounded-lg border border-gray-300 bg-white px-2.5 py-1 font-medium hover:bg-gray-100">
          {label}
        </button>
      ))}
    </div>
  );
}
