"use client";

import { EditorContent, useEditor, useEditorState, type Editor } from "@tiptap/react";
import { Bold, ChevronDown, Image as ImageIcon, Italic, Link2, List, ListOrdered, Loader2, Minus, Music, MousePointerClick, Plus, Quote, Redo2, Table2, Trash2, Undo2 } from "lucide-react";
import { useRef, useState, type ComponentProps, type ReactNode } from "react";
import { Alert, AlertDescription } from "@/components/admin/ui/alert";
import { Button } from "@/components/admin/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/admin/ui/dropdown-menu";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/admin/ui/popover";
import { Progress } from "@/components/admin/ui/progress";
import { Separator } from "@/components/admin/ui/separator";
import { Skeleton } from "@/components/admin/ui/skeleton";
import { Switch } from "@/components/admin/ui/switch";
import { Toggle } from "@/components/admin/ui/toggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/admin/ui/tooltip";
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

/** One icon button on the toolbar, with a tooltip. `mousedown` is cancelled so the editor keeps its selection. */
function Tool({ label, active, disabled, onClick, children, ...rest }: { label: string; active?: boolean; disabled?: boolean; onClick?: () => void; children: ReactNode } & Omit<ComponentProps<typeof Toggle>, "onClick" | "children">) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Toggle
          type="button"
          size="sm"
          aria-label={label}
          pressed={Boolean(active)}
          disabled={disabled}
          onMouseDown={(e) => e.preventDefault()}
          onPressedChange={() => onClick?.()}
          className="data-[state=on]:bg-primary/10 data-[state=on]:text-primary"
          {...rest}
        >
          {children}
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

export function RichEditor({ variant, initialHtml, onChange, onReady, placeholder, label }: Props) {
  const rich = variant === "post";
  const [busy, setBusy] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
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

  if (!editor || !s) return <Skeleton className="min-h-[320px] rounded-xl" aria-busy />;

  const run = async (name: string, fn: () => Promise<void>) => {
    setError(null);
    setProgress(0);
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

  const headingLabel = s.h1 ? "Title" : s.h2 ? "Heading" : s.h3 ? "Subheading" : "Paragraph";
  const uploading = busy === "image" || busy === "audio";

  return (
    <div className="rounded-xl border bg-background">
      <div role="toolbar" aria-label={`${label} formatting`} className="sticky top-0 z-10 flex flex-wrap items-center gap-0.5 rounded-t-xl border-b bg-background/95 p-1.5 backdrop-blur">
        {variant !== "intro" && (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button type="button" variant="ghost" size="sm" onMouseDown={(e) => e.preventDefault()} aria-label="Text style" className="w-32 justify-between font-normal">
                  {headingLabel} <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" onCloseAutoFocus={(e) => e.preventDefault()}>
                <DropdownMenuItem onSelect={() => editor.chain().focus().setParagraph().run()}>Paragraph</DropdownMenuItem>
                {variant === "legal" && <DropdownMenuItem onSelect={() => h(1)}>Title</DropdownMenuItem>}
                <DropdownMenuItem onSelect={() => h(2)}>Heading</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => h(3)}>Subheading</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Separator orientation="vertical" className="mx-1 data-[orientation=vertical]:h-5" />
          </>
        )}
        <Tool label="Bold (Ctrl/Cmd+B)" active={s.bold} onClick={() => editor.chain().focus().toggleBold().run()}><Bold /></Tool>
        <Tool label="Italic (Ctrl/Cmd+I)" active={s.italic} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic /></Tool>
        <Popover open={linkOpen} onOpenChange={(o) => (o ? openLink() : setLinkOpen(false))}>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Toggle type="button" size="sm" aria-label="Add or edit a link" pressed={s.link} onMouseDown={(e) => e.preventDefault()} className="data-[state=on]:bg-primary/10 data-[state=on]:text-primary">
                  <Link2 />
                </Toggle>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>Add or edit a link</TooltipContent>
          </Tooltip>
          <PopoverContent align="start" className="w-80 space-y-3" onCloseAutoFocus={(e) => { e.preventDefault(); editor.commands.focus(); }}>
            <div className="grid gap-1.5">
              <Label htmlFor="link-href">Link address</Label>
              <Input
                id="link-href"
                autoFocus
                value={linkHref}
                onChange={(e) => setLinkHref(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    applyLink();
                  }
                }}
                placeholder="https://example.com or /download"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch id="link-new-tab" checked={linkNewTab} onCheckedChange={setLinkNewTab} />
              <Label htmlFor="link-new-tab">Open in a new tab</Label>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setLinkOpen(false)}>Cancel</Button>
              <Button type="button" size="sm" variant={linkHref.trim() ? "default" : "outline"} onClick={applyLink}>{linkHref.trim() ? "Apply" : "Remove link"}</Button>
            </div>
          </PopoverContent>
        </Popover>
        <Separator orientation="vertical" className="mx-1 data-[orientation=vertical]:h-5" />
        <Tool label="Bulleted list" active={s.bullet} onClick={() => editor.chain().focus().toggleBulletList().run()}><List /></Tool>
        <Tool label="Numbered list" active={s.ordered} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered /></Tool>
        {rich && <Tool label="Quote" active={s.quote} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote /></Tool>}
        {rich && (
          <>
            <Separator orientation="vertical" className="mx-1 data-[orientation=vertical]:h-5" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button type="button" variant="ghost" size="sm" onMouseDown={(e) => e.preventDefault()}>
                  {uploading ? <Loader2 className="animate-spin" /> : <Plus />} {uploading ? "Uploading…" : "Insert"} <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" onCloseAutoFocus={(e) => e.preventDefault()}>
                <DropdownMenuLabel className="text-xs text-muted-foreground">Add to the page</DropdownMenuLabel>
                <DropdownMenuItem disabled={busy === "image"} onSelect={() => imageInput.current?.click()}><ImageIcon /> Image (upload a picture)</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}><Table2 /> Table</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => editor.chain().focus().insertContent({ type: "ctaButton", attrs: { text: "", href: "", target: "" } }).run()}><MousePointerClick /> Button that links somewhere</DropdownMenuItem>
                <DropdownMenuItem disabled={busy === "audio"} onSelect={() => audioInput.current?.click()}><Music /> Audio clip (upload)</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => editor.chain().focus().insertContent({ type: "sectionBreak" }).run()}><Minus /> Section break (wider gap)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
        <span className="ml-auto flex">
          <Tool label="Undo" disabled={!s.canUndo} onClick={() => editor.chain().focus().undo().run()}><Undo2 /></Tool>
          <Tool label="Redo" disabled={!s.canRedo} onClick={() => editor.chain().focus().redo().run()}><Redo2 /></Tool>
        </span>
      </div>

      {uploading && <Progress value={progress} aria-label="Uploading" className="h-1 rounded-none" />}

      {s.image && (
        <div className="flex flex-wrap items-center gap-2 border-b bg-muted/50 p-2 text-sm">
          <div className="flex min-w-[12rem] flex-1 items-center gap-2">
            <Label htmlFor="image-alt" className="shrink-0">Describe this picture</Label>
            <Input id="image-alt" value={s.imageAlt} onChange={(e) => editor.chain().updateAttributes("image", { alt: e.target.value }).run()} placeholder="For people who can't see it, and for search engines" className="bg-background" />
          </div>
          <Button type="button" variant="outline" size="sm" onClick={() => editor.chain().focus().deleteSelection().run()}><Trash2 /> Remove picture</Button>
        </div>
      )}

      {s.table && <TableTools editor={editor} />}

      <div className="px-4 py-3">
        <EditorContent editor={editor} />
      </div>

      {error && (
        <Alert variant="destructive" className="rounded-t-none border-x-0 border-b-0 bg-destructive/5">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
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
            const img = await uploadImage(file, setProgress);
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
            const a = await uploadAudio(file, setProgress);
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
  ];
  return (
    <div className="flex flex-wrap items-center gap-1 border-b bg-muted/50 p-2 text-sm">
      <span className="mr-1 text-muted-foreground">Table:</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="outline" size="sm" onMouseDown={(e) => e.preventDefault()}>Rows &amp; columns <ChevronDown /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" onCloseAutoFocus={(e) => e.preventDefault()}>
          {items.map(([label, fn]) => (
            <DropdownMenuItem key={label} onSelect={fn}>{label}</DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Button type="button" variant="outline" size="sm" onMouseDown={(e) => e.preventDefault()} onClick={() => editor.chain().focus().deleteTable().run()} className="text-destructive hover:text-destructive">
        <Trash2 /> Delete table
      </Button>
    </div>
  );
}
