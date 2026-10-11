"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { createEntry, deleteEntry, isSlugAvailable, publish, saveDraft, schedule, unpublish, type ActionResult, type EntryInput, type SavedEntry } from "@/lib/cms/admin-mutations";
import type { CollectionId } from "@/lib/cms/types";
import { Card, Count, Field, ImageField, inputClass } from "./fields";
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
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [scheduleAt, setScheduleAt] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [typedTitle, setTypedTitle] = useState("");
  const [mountedAt] = useState(() => Date.now());
  const valuesRef = useRef(values);
  useEffect(() => {
    valuesRef.current = values;
  }, [values]);

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

  /** Runs one server action with the current form, shows the outcome, and returns the saved entry on success. */
  async function run(name: string, doneText: string, call: (input: EntryInput) => Promise<ActionResult>): Promise<SavedEntry | null> {
    setBusy(name);
    setMessage(null);
    const snapshot = valuesRef.current;
    try {
      const res = await call({ ...toInput(), ...snapshot, collection });
      if (!res.ok) {
        setErrors(res.fieldErrors ?? {});
        setMessage({ kind: "error", text: res.error });
        return null;
      }
      applySaved(res.value, snapshot);
      const notes = res.value.notes.length ? ` ${res.value.notes.join(" ")}` : "";
      setMessage({ kind: "ok", text: doneText + notes });
      if (!meta) router.replace(`/admin/${collection}/${res.value.id}`);
      return res.value;
    } catch (e) {
      setMessage({ kind: "error", text: e instanceof Error && /redirect/i.test(e.message) ? "Please sign in again." : "Couldn't save. Check your connection and try again." });
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
    if (!scheduleAt || Number.isNaN(when.getTime())) return setErrors({ schedule: "Pick a date and time." });
    const s = await run("schedule", `Scheduled for ${fmt.format(when)}.`, (input) => schedule(meta?.id ?? null, input, when.toISOString()));
    if (s) setScheduleOpen(false);
  };
  const takeOffline = async () => {
    if (!meta) return;
    setBusy("unpublish");
    setMessage(null);
    const res = await unpublish(meta.id);
    setBusy(null);
    if (!res.ok) return setMessage({ kind: "error", text: res.error });
    setMeta({ id: res.value.id, status: res.value.status, publishAt: res.value.publishAt, updatedAt: res.value.updatedAt, updatedBy: res.value.updatedBy });
    setMessage({ kind: "ok", text: "Taken offline. It's a draft again." });
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
    if (!res.ok) return setMessage({ kind: "error", text: res.error });
    setBaseline(valuesRef.current); // nothing left to lose
    router.push(`/admin/${collection}`);
    router.refresh();
  }

  const statusChip =
    state === "live" ? (
      <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">Live</span>
    ) : state === "scheduled" ? (
      <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">Scheduled for {fmt.format(new Date(meta!.publishAt!))}</span>
    ) : (
      <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">{state === "new" ? "New" : "Draft"}</span>
    );

  const ogFallback = values.coverSrc;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void save();
      }}
      className="space-y-6"
    >
      <div className="sticky top-0 z-20 -mx-4 border-b border-gray-200 bg-white/95 px-4 py-3 backdrop-blur">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <Link
            href={`/admin/${collection}`}
            onClick={(e) => {
              if (dirty && !window.confirm("You have unsaved changes. Leave without saving?")) e.preventDefault();
            }}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← {collectionLabel}
          </Link>
          {statusChip}
          <span aria-live="polite" className="text-sm text-gray-600">
            {dirty ? "Unsaved changes" : meta ? `Saved${meta.updatedBy ? ` by ${meta.updatedBy}` : ""}` : ""}
          </span>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <button type="button" onClick={preview} disabled={busy !== null || !values.title.trim() || !SLUG_OK.test(values.slug)} className="rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium hover:bg-gray-100 disabled:opacity-50">
              {busy === "preview" ? "Saving…" : state === "live" ? "Save & view" : "Save & preview"}
            </button>
            <button type="submit" disabled={busy !== null || !dirty && state !== "new"} className="rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium hover:bg-gray-100 disabled:opacity-50">
              {busy === "save" ? "Saving…" : state === "live" ? "Save changes" : "Save draft"}
            </button>
            {state !== "live" && (
              <button type="button" onClick={publishNow} disabled={busy !== null} className="rounded-lg bg-purple-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-50">
                {busy === "publish" ? "Publishing…" : "Publish now"}
              </button>
            )}
            {state !== "live" && (
              <button type="button" onClick={() => setScheduleOpen((o) => !o)} aria-expanded={scheduleOpen} className="rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium hover:bg-gray-100">
                Schedule…
              </button>
            )}
            {(state === "live" || state === "scheduled") && (
              <button type="button" onClick={takeOffline} disabled={busy !== null} className="rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium hover:bg-gray-100 disabled:opacity-50">
                {busy === "unpublish" ? "Working…" : "Take offline"}
              </button>
            )}
          </div>
        </div>
        {state === "live" && <p className="mt-2 text-xs text-gray-600">This page is live. Changes you save go out to the website straight away.</p>}
        {scheduleOpen && (
          <div className="mt-3 flex flex-wrap items-end gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3">
            <Field label="Go live on" hint="In your local time." error={errors.schedule} htmlFor="schedule-at">
              <input id="schedule-at" type="datetime-local" value={scheduleAt} onChange={(e) => setScheduleAt(e.target.value)} className={inputClass} />
            </Field>
            <button type="button" onClick={scheduleIt} disabled={busy !== null} className="rounded-lg bg-purple-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-50">
              {busy === "schedule" ? "Scheduling…" : "Schedule"}
            </button>
          </div>
        )}
        {message && (
          <p role={message.kind === "error" ? "alert" : "status"} className={`mt-3 rounded-lg px-3 py-2 text-sm ${message.kind === "error" ? "bg-red-50 text-red-800" : "bg-green-50 text-green-800"}`}>
            {message.text}
          </p>
        )}
      </div>

      <Card title="Basics">
        <Field label="Title" error={errors.title} htmlFor="title">
          <input
            id="title"
            value={values.title}
            onChange={(e) => {
              const title = e.target.value;
              setValues((v) => ({ ...v, title, slug: slugTouched ? v.slug : slugify(title) }));
            }}
            className={inputClass}
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
          <input
            id="slug"
            value={values.slug}
            onChange={(e) => {
              setSlugTouched(true);
              set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"));
            }}
            className={inputClass}
            spellCheck={false}
          />
        </Field>
        {slugChangedWhileLive && (
          <p role="alert" className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">
            This page is live at <strong>{livePath}/{savedSlug}</strong>. If you change the address, links to the old one (from Google, social posts, emails) will stop working. Only change it if you have to.
          </p>
        )}

        {isUpdates ? (
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Category" error={errors.label} htmlFor="label">
              <select id="label" value={values.label} onChange={(e) => set("label", e.target.value)} className={inputClass}>
                {LABELS.map((l) => <option key={l}>{l}</option>)}
              </select>
            </Field>
            <Field label="Date shown on the post" error={errors.date} htmlFor="date">
              <input id="date" type="date" value={values.date} onChange={(e) => set("date", e.target.value)} className={inputClass} />
            </Field>
            <Field label="Version (optional)" hint="For product updates, e.g. v 1.0.5" htmlFor="version">
              <input id="version" value={values.version} onChange={(e) => set("version", e.target.value)} className={inputClass} placeholder="v 1.0.5" />
            </Field>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Takes effect on" error={errors.effectiveDate} htmlFor="effective">
              <input id="effective" type="date" value={values.effectiveDate} onChange={(e) => set("effectiveDate", e.target.value)} className={inputClass} />
            </Field>
            <Field label="Last updated on" error={errors.lastUpdated} htmlFor="updated">
              <input id="updated" type="date" value={values.lastUpdated} onChange={(e) => set("lastUpdated", e.target.value)} className={inputClass} />
            </Field>
          </div>
        )}

        {isUpdates && (
          <Field label="Short summary" hint="Shown on the updates page and in other posts' suggestions." error={errors.excerpt} htmlFor="excerpt">
            <textarea id="excerpt" value={values.excerpt} onChange={(e) => set("excerpt", e.target.value)} rows={3} className={inputClass} />
          </Field>
        )}
      </Card>

      {isUpdates && (
        <Card title="Cover picture" description="Shown at the top of the post and on the updates page. Wide pictures (16:9) look best.">
          <ImageField
            label="cover"
            src={values.coverSrc}
            onChange={(img) =>
              setValues((v) => ({ ...v, coverSrc: img?.src ?? "", coverWidth: img?.width ?? null, coverHeight: img?.height ?? null, ...(img ? {} : { coverAlt: "" }) }))
            }
          />
          {errors.cover && <p role="alert" className="text-xs font-medium text-red-700">{errors.cover}</p>}
          {values.coverSrc && (
            <Field label="Describe the cover picture" hint="For people who can't see it, and for search engines." htmlFor="cover-alt">
              <input id="cover-alt" value={values.coverAlt} onChange={(e) => set("coverAlt", e.target.value)} className={inputClass} />
            </Field>
          )}
        </Card>
      )}

      {!isUpdates && (
        <Card title="Introduction" description="The short paragraph under the title.">
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
        </Card>
      )}

      <Card title={isUpdates ? "Post" : "Document"}>
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
        {errors.content && <p role="alert" className="text-xs font-medium text-red-700">{errors.content}</p>}
      </Card>

      <Card title="Search & sharing" description="How this page looks in Google and when someone shares the link. Leave blank to use the defaults.">
        <Field label="Search title" htmlFor="meta-title" hint={<Count value={values.metaTitle || values.title} limit={60} />}>
          <input id="meta-title" value={values.metaTitle} onChange={(e) => set("metaTitle", e.target.value)} placeholder={values.title ? `${values.title} - ${isUpdates ? "Mochi" : "The Mochi App"}` : ""} className={inputClass} />
        </Field>
        <Field label="Search description" htmlFor="description" hint={<Count value={values.description} limit={160} />}>
          <textarea id="description" value={values.description} onChange={(e) => set("description", e.target.value)} rows={3} className={inputClass} />
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
      </Card>

      {meta && (
        <Card title="Delete" description="Deleting removes this page for good. Take it offline instead if you might want it back.">
          <button type="button" onClick={() => { setTypedTitle(""); setDeleteOpen(true); }} className="rounded-lg border border-red-300 bg-white px-3.5 py-2 text-sm font-medium text-red-700 hover:bg-red-50">
            Delete this {isUpdates ? "post" : "page"}…
          </button>
        </Card>
      )}

      {deleteOpen && meta && (
        <div role="dialog" aria-modal="true" aria-labelledby="delete-title" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 id="delete-title" className="text-lg font-semibold">Delete “{initial.title}”?</h2>
            <p className="mt-2 text-sm text-gray-600">This can&apos;t be undone. {state === "live" && "The page will disappear from the website straight away. "}To confirm, type the title below.</p>
            <input autoFocus value={typedTitle} onChange={(e) => setTypedTitle(e.target.value)} aria-label="Type the title to confirm" className={`${inputClass} mt-4`} placeholder={initial.title} />
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setDeleteOpen(false)} className="rounded-lg px-3.5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Cancel</button>
              <button type="button" onClick={remove} disabled={busy === "delete" || typedTitle.trim() !== initial.title.trim()} className="rounded-lg bg-red-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-40">
                {busy === "delete" ? "Deleting…" : "Delete for good"}
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
