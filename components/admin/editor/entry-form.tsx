"use client";

import { ArrowLeft, CalendarClock, CircleAlert, Eye, Info, Save, Send, Trash2, TriangleAlert, Undo2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { createEntry, deleteEntry, isSlugAvailable, publish, saveDraft, schedule, unpublish, type ActionResult, type EntryInput, type SavedEntry } from "@/lib/cms/admin-mutations";
import type { CollectionId } from "@/lib/cms/types";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/admin/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/admin/ui/alert";
import { Badge } from "@/components/admin/ui/badge";
import { Button } from "@/components/admin/ui/button";
import { Calendar } from "@/components/admin/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/admin/ui/dialog";
import { Input } from "@/components/admin/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select";
import { Textarea } from "@/components/admin/ui/textarea";
import { Count, DatePicker, Field, formatDay, ImageField, parseDay, Section } from "./fields";
import { slugify, type EntryMeta, type FormValues } from "./form-values";
import { RichEditor } from "./rich-editor";

type Props = {
  collection: CollectionId;
  collectionLabel: string;
  livePath: string; // e.g. "/updates"
  initial: FormValues;
  meta: EntryMeta | null;
};

const LABELS = ["Blog", "Product Updates", "Company"];
const SLUG_OK = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const fmt = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" });

export function EntryForm({ collection, collectionLabel, livePath, initial, meta: initialMeta }: Props) {
  const router = useRouter();
  const isUpdates = collection === "updates";
  const [values, setValues] = useState<FormValues>(initial);
  const [baseline, setBaseline] = useState<FormValues>(initial);
  const [meta, setMeta] = useState<EntryMeta | null>(initialMeta);
  const [savedSlug, setSavedSlug] = useState(initial.slug);
  const [slugTouched, setSlugTouched] = useState(Boolean(initialMeta));
  const [slugTaken, setSlugTaken] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<{ text: string } | null>(null);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [scheduleDay, setScheduleDay] = useState("");
  const [scheduleTime, setScheduleTime] = useState("09:00");
  const [offlineOpen, setOfflineOpen] = useState(false);
  const [leaveTo, setLeaveTo] = useState<string | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [typedTitle, setTypedTitle] = useState("");
  const [mountedAt] = useState(() => Date.now());
  const valuesRef = useRef(values);
  useEffect(() => {
    valuesRef.current = values;
  }, [values]);

  /** "YYYY-MM-DDTHH:mm" in the editor's local time, like a datetime-local input; "" until both parts are chosen. */
  const scheduleAt = scheduleDay && scheduleTime ? `${scheduleDay}T${scheduleTime}` : "";

  const set = <K extends keyof FormValues>(key: K, value: FormValues[K]) => setValues((v) => ({ ...v, [key]: value }));
  const dirty = useMemo(() => JSON.stringify(values) !== JSON.stringify(baseline), [values, baseline]);

  const state: "new" | "draft" | "live" | "scheduled" = !meta ? "new" : meta.status !== "published" ? "draft" : meta.publishAt && Date.parse(meta.publishAt) > Date.parse(meta.updatedAt) && Date.parse(meta.publishAt) > mountedAt ? "scheduled" : "live";
  const slugChangedWhileLive = state === "live" && values.slug !== savedSlug && values.slug !== "";

  // Warn before leaving with unsaved work.
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  // Is the web address free? (the server checks again on save)
  useEffect(() => {
    const slug = values.slug;
    if (!SLUG_OK.test(slug) || slug === savedSlug) return;
    let cancelled = false;
    const t = setTimeout(async () => {
      try {
        const free = await isSlugAvailable(collection, slug, meta?.id);
        if (!cancelled) setSlugTaken(!free);
      } catch {
        /* the save will check */
      }
    }, 400);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [values.slug, savedSlug, collection, meta?.id]);

  const slugError = errors.slug ?? (values.slug && !SLUG_OK.test(values.slug) ? "Use only lowercase letters, numbers and dashes (for example my-new-post)." : slugTaken && values.slug !== savedSlug ? "Another page already uses this web address." : undefined);

  const toInput = (): EntryInput => ({ collection, ...values, expectedUpdatedAt: meta?.updatedAt ?? null });

  function applySaved(s: SavedEntry, snapshot: FormValues) {
    setMeta({ id: s.id, status: s.status, publishAt: s.publishAt, updatedAt: s.updatedAt, updatedBy: s.updatedBy });
    setSavedSlug(s.slug);
    setSlugTaken(false);
    setBaseline(snapshot);
    setErrors({});
  }

  function fail(text: string) {
    setMessage({ text });
    toast.error(text);
  }

  /** Runs one server action with the current form, shows the outcome, and returns the saved entry on success. */
  async function run(name: string, doneText: string, call: (input: EntryInput) => Promise<ActionResult>): Promise<SavedEntry | null> {
    setBusy(name);
    setMessage(null);
    const snapshot = valuesRef.current;
    try {
      const res = await call({ ...toInput(), ...snapshot, collection });
      if (!res.ok) {
        setErrors(res.fieldErrors ?? {});
        fail(res.error);
        return null;
      }
      applySaved(res.value, snapshot);
      const notes = res.value.notes.length ? ` ${res.value.notes.join(" ")}` : "";
      toast.success(doneText + notes);
      if (!meta) router.replace(`/admin/${collection}/${res.value.id}`);
      return res.value;
    } catch (e) {
      fail(e instanceof Error && /redirect/i.test(e.message) ? "Please sign in again." : "Couldn't save. Check your connection and try again.");
      return null;
    } finally {
      setBusy(null);
    }
  }

  const save = () =>
    run("save", state === "live" ? "Saved. The live page is updated." : "Draft saved.", (input) => (meta ? saveDraft(meta.id, input) : createEntry(input)));
  const publishNow = () => run("publish", "Published. It's live now.", (input) => publish(meta?.id ?? null, input));
  const scheduleIt = async () => {
    const when = new Date(scheduleAt);
    if (!scheduleAt || Number.isNaN(when.getTime())) return setErrors((e) => ({ ...e, schedule: "Pick a date and time." }));
    const s = await run("schedule", `Scheduled for ${fmt.format(when)}.`, (input) => schedule(meta?.id ?? null, input, when.toISOString()));
    if (s) setScheduleOpen(false);
  };
  const takeOffline = async () => {
    if (!meta) return;
    setBusy("unpublish");
    setMessage(null);
    const res = await unpublish(meta.id);
    setBusy(null);
    if (!res.ok) return fail(res.error);
    setOfflineOpen(false);
    setMeta({ id: res.value.id, status: res.value.status, publishAt: res.value.publishAt, updatedAt: res.value.updatedAt, updatedBy: res.value.updatedBy });
    toast.success("Taken offline. It's a draft again.");
  };

  async function preview() {
    // Open the tab now (browsers block pop-ups opened after an await), then point it at the preview.
    const tab = window.open("", "_blank");
    const saved = await run("preview", state === "live" ? "Saved. Opening the page…" : "Draft saved. Opening the preview…", (input) => (meta ? saveDraft(meta.id, input) : createEntry(input)));
    if (!saved) return void tab?.close();
    const url = `/api/admin/preview?collection=${collection}&slug=${encodeURIComponent(saved.slug)}`;
    if (tab) tab.location.href = url;
    else window.location.href = url;
  }

  async function remove() {
    if (!meta) return;
    setBusy("delete");
    const res = await deleteEntry(meta.id, typedTitle);
    setBusy(null);
    if (!res.ok) {
      setDeleteOpen(false);
      return fail(res.error);
    }
    setBaseline(valuesRef.current); // nothing left to lose
    router.push(`/admin/${collection}`);
    router.refresh();
  }


  const statusChip =
    state === "live" ? (
      <Badge className="border-transparent bg-green-100 text-green-800">Live</Badge>
    ) : state === "scheduled" ? (
      <Badge className="border-transparent bg-blue-100 text-blue-800">Scheduled for {fmt.format(new Date(meta!.publishAt!))}</Badge>
    ) : (
      <Badge variant="secondary">{state === "new" ? "New" : "Draft"}</Badge>
    );

  // The editors' toolbars stick just under the action bar, whose height changes when its buttons wrap.
  const formRef = useRef<HTMLFormElement>(null);
  const actionBarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const form = formRef.current;
    const bar = actionBarRef.current;
    if (!form || !bar) return;
    const observer = new ResizeObserver(() => form.style.setProperty("--cms-action-bar-h", `${bar.offsetHeight}px`));
    observer.observe(bar);
    return () => observer.disconnect();
  }, []);

  const ogFallback = values.coverSrc;
  const noun = isUpdates ? "post" : "page";

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        void save();
      }}
      className="space-y-6"
    >
      <div ref={actionBarRef} className="sticky top-0 z-20 -mx-4 border-b bg-background/95 px-4 py-3 backdrop-blur">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <Button asChild variant="ghost" size="sm" className="-ml-2 text-muted-foreground">
            <Link
              href={`/admin/${collection}`}
              onClick={(e) => {
                if (dirty) {
                  e.preventDefault();
                  setLeaveTo(`/admin/${collection}`);
                }
              }}
            >
              <ArrowLeft /> {collectionLabel}
            </Link>
          </Button>
          {statusChip}
          <span aria-live="polite" className="text-sm text-muted-foreground">
            {dirty ? "Unsaved changes" : meta ? `Saved${meta.updatedBy ? ` by ${meta.updatedBy}` : ""}` : ""}
          </span>
          <div className="flex flex-wrap items-center gap-2 md:ml-auto">
            <Button type="button" variant="outline" onClick={preview} disabled={busy !== null || !values.title.trim() || !SLUG_OK.test(values.slug)}>
              <Eye /> {busy === "preview" ? "Saving…" : state === "live" ? "Save & view" : "Save & preview"}
            </Button>
            <Button type="submit" variant="outline" disabled={busy !== null || (!dirty && state !== "new")}>
              <Save /> {busy === "save" ? "Saving…" : state === "live" ? "Save changes" : "Save draft"}
            </Button>
            {state !== "live" && (
              <Button type="button" onClick={publishNow} disabled={busy !== null}>
                <Send /> {busy === "publish" ? "Publishing…" : "Publish now"}
              </Button>
            )}
            {state !== "live" && (
              <Button type="button" variant="outline" onClick={() => { setErrors((e) => ({ ...e, schedule: "" })); setMessage(null); setScheduleOpen(true); }}>
                <CalendarClock /> Schedule…
              </Button>
            )}
            {(state === "live" || state === "scheduled") && (
              <Button type="button" variant="outline" onClick={() => setOfflineOpen(true)} disabled={busy !== null}>
                <Undo2 /> {busy === "unpublish" ? "Working…" : "Take offline"}
              </Button>
            )}
          </div>
        </div>
        {state === "live" && (
          <Alert className="mt-3 border-green-200 bg-green-50 text-green-900">
            <Info />
            <AlertDescription className="text-green-900/90">This page is live. Changes you save go out to the website straight away.</AlertDescription>
          </Alert>
        )}
        {message && !scheduleOpen && (
          <Alert variant="destructive" className="mt-3 border-destructive/30 bg-destructive/5">
            <CircleAlert />
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}
      </div>

      <Section title="Basics">
        <Field label="Title" error={errors.title} htmlFor="title">
          <Input
            id="title"
            value={values.title}
            aria-invalid={Boolean(errors.title) || undefined}
            onChange={(e) => {
              const title = e.target.value;
              setValues((v) => ({ ...v, title, slug: slugTouched ? v.slug : slugify(title) }));
            }}
            placeholder={isUpdates ? "What is this post about?" : "For example: Terms of Service"}
            autoFocus={!meta}
          />
        </Field>
        <Field
          label="Web address"
          htmlFor="slug"
          error={slugError}
          hint={<>themochi.app{livePath}/<strong>{values.slug || "…"}</strong></>}
        >
          <Input
            id="slug"
            value={values.slug}
            aria-invalid={Boolean(slugError) || undefined}
            onChange={(e) => {
              setSlugTouched(true);
              set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"));
            }}
            spellCheck={false}
          />
        </Field>
        {slugChangedWhileLive && (
          <Alert className="border-amber-300 bg-amber-50 text-amber-900">
            <TriangleAlert />
            <AlertTitle>You&apos;re changing the address of a live {noun}</AlertTitle>
            <AlertDescription className="text-amber-900/90">
              This page is live at <strong>{livePath}/{savedSlug}</strong>. If you change the address, links to the old one (from Google, social posts, emails) will stop working. Only change it if you have to.
            </AlertDescription>
          </Alert>
        )}

        {isUpdates ? (
          <div className="grid gap-4 md:grid-cols-3">
            <Field label="Category" error={errors.label} htmlFor="label">
              <Select value={values.label} onValueChange={(v) => set("label", v)}>
                <SelectTrigger id="label" className="w-full" aria-invalid={Boolean(errors.label) || undefined}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LABELS.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Date shown on the post" error={errors.date} htmlFor="date">
              <DatePicker id="date" value={values.date} onChange={(v) => set("date", v)} invalid={Boolean(errors.date)} />
            </Field>
            <Field label="Version (optional)" hint="For product updates, e.g. v 1.0.5" htmlFor="version">
              <Input id="version" value={values.version} onChange={(e) => set("version", e.target.value)} placeholder="v 1.0.5" />
            </Field>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Takes effect on" error={errors.effectiveDate} htmlFor="effective">
              <DatePicker id="effective" value={values.effectiveDate} onChange={(v) => set("effectiveDate", v)} invalid={Boolean(errors.effectiveDate)} />
            </Field>
            <Field label="Last updated on" error={errors.lastUpdated} htmlFor="updated">
              <DatePicker id="updated" value={values.lastUpdated} onChange={(v) => set("lastUpdated", v)} invalid={Boolean(errors.lastUpdated)} />
            </Field>
          </div>
        )}

        {isUpdates && (
          <Field label="Short summary" hint="Shown on the updates page and in other posts' suggestions." error={errors.excerpt} htmlFor="excerpt">
            <Textarea id="excerpt" value={values.excerpt} onChange={(e) => set("excerpt", e.target.value)} rows={3} />
          </Field>
        )}
      </Section>

      {isUpdates && (
        <Section title="Cover picture" description="Shown at the top of the post and on the updates page. Wide pictures (16:9) look best.">
          <ImageField
            label="cover"
            src={values.coverSrc}
            onChange={(img) =>
              setValues((v) => ({ ...v, coverSrc: img?.src ?? "", coverWidth: img?.width ?? null, coverHeight: img?.height ?? null, ...(img ? {} : { coverAlt: "" }) }))
            }
          />
          {errors.cover && <p role="alert" className="text-xs font-medium text-destructive">{errors.cover}</p>}
          {values.coverSrc && (
            <Field label="Describe the cover picture" hint="For people who can't see it, and for search engines." htmlFor="cover-alt">
              <Input id="cover-alt" value={values.coverAlt} onChange={(e) => set("coverAlt", e.target.value)} />
            </Field>
          )}
        </Section>
      )}

      {!isUpdates && (
        <Section title="Introduction" description="The short paragraph under the title.">
          <RichEditor
            variant="intro"
            label="Introduction"
            initialHtml={initial.intro}
            onReady={(html) => {
              setValues((v) => ({ ...v, intro: html }));
              setBaseline((b) => ({ ...b, intro: html }));
            }}
            onChange={(html) => set("intro", html)}
          />
        </Section>
      )}

      <Section title={isUpdates ? "Post" : "Document"}>
        <RichEditor
          variant={isUpdates ? "post" : "legal"}
          label={isUpdates ? "Post content" : "Document content"}
          initialHtml={initial.content}
          placeholder={isUpdates ? "Start writing your post…" : "Write the document…"}
          onReady={(html) => {
            setValues((v) => ({ ...v, content: html }));
            setBaseline((b) => ({ ...b, content: html }));
          }}
          onChange={(html) => set("content", html)}
        />
        {errors.content && <p role="alert" className="text-xs font-medium text-destructive">{errors.content}</p>}
      </Section>

      <Section title="Search & sharing" description="How this page looks in Google and when someone shares the link. Leave blank to use the defaults.">
        <Field label="Search title" htmlFor="meta-title" hint={<Count value={values.metaTitle || values.title} limit={60} />}>
          <Input id="meta-title" value={values.metaTitle} onChange={(e) => set("metaTitle", e.target.value)} placeholder={values.title ? `${values.title} - ${isUpdates ? "Mochi" : "The Mochi App"}` : ""} />
        </Field>
        <Field label="Search description" htmlFor="description" hint={<Count value={values.description} limit={160} />}>
          <Textarea id="description" value={values.description} onChange={(e) => set("description", e.target.value)} rows={3} />
        </Field>
        {isUpdates && (
          <Field label="Sharing picture" hint={ogFallback ? "Uses the cover picture unless you choose another." : "Shown when the link is shared (for example on social media)."} error={errors.ogImage}>
            <ImageField
              label="sharing picture"
              src={values.ogImage || ogFallback}
              onChange={(img) => set("ogImage", img && img.src !== values.coverSrc ? img.src : "")}
            />
          </Field>
        )}
      </Section>

      {meta && (
        <Section title="Delete" description="Deleting removes this page for good. Take it offline instead if you might want it back.">
          <Button type="button" variant="outline" className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => { setTypedTitle(""); setDeleteOpen(true); }}>
            <Trash2 /> Delete this {noun}…
          </Button>
        </Section>
      )}

      {/* Schedule */}
      <Dialog open={scheduleOpen} onOpenChange={setScheduleOpen}>
        <DialogContent className="max-w-fit">
          <DialogHeader>
            <DialogTitle>Schedule publishing</DialogTitle>
            <DialogDescription>Pick the day and time it should go live, in your local time.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4">
            <Calendar
              mode="single"
              className="rounded-md border"
              selected={parseDay(scheduleDay)}
              defaultMonth={parseDay(scheduleDay)}
              disabled={{ before: new Date(mountedAt) }}
              onSelect={(d) => setScheduleDay(d ? formatDay(d) : "")}
            />
            <div className="w-full">
              <Field label="Time" htmlFor="schedule-time" error={errors.schedule}>
                <Input id="schedule-time" type="time" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} className="appearance-none" />
              </Field>
            </div>
          </div>
          {message && (
            <Alert variant="destructive" className="border-destructive/30 bg-destructive/5">
              <CircleAlert />
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => setScheduleOpen(false)}>Cancel</Button>
            <Button type="button" onClick={scheduleIt} disabled={busy !== null}>
              <CalendarClock /> {busy === "schedule" ? "Scheduling…" : "Schedule"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Take offline */}
      <AlertDialog open={offlineOpen} onOpenChange={setOfflineOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Take this {noun} offline?</AlertDialogTitle>
            <AlertDialogDescription>
              {state === "scheduled" ? "It won't go live at the scheduled time and goes back to being a draft." : "It disappears from the website straight away and goes back to being a draft."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => void takeOffline()}>Take offline</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Unsaved changes */}
      <AlertDialog open={leaveTo !== null} onOpenChange={(o) => !o && setLeaveTo(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave without saving?</AlertDialogTitle>
            <AlertDialogDescription>You have unsaved changes. If you leave now they will be lost.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep editing</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                const to = leaveTo;
                setBaseline(valuesRef.current); // stops the browser's own unload warning too
                if (to) router.push(to);
              }}
            >
              Leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete (typed title) */}
      {meta && (
        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete “{initial.title}”?</AlertDialogTitle>
              <AlertDialogDescription>
                This can&apos;t be undone. {state === "live" && "The page will disappear from the website straight away. "}To confirm, type the title below.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <Input autoFocus value={typedTitle} onChange={(e) => setTypedTitle(e.target.value)} aria-label="Type the title to confirm" placeholder={initial.title} />
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                disabled={busy === "delete" || typedTitle.trim() !== initial.title.trim()}
                onClick={(e) => {
                  e.preventDefault();
                  void remove();
                }}
              >
                {busy === "delete" ? "Deleting…" : "Delete for good"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </form>
  );
}
