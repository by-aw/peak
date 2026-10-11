import type { Profile } from "./blocks";
import type { CollectionId } from "./types";

/**
 * Field specs for the collections whose editor form is data-driven (watch, academy, audit). Shared by the editor
 * (components/admin/editor/spec-fields.tsx renders them) and the server actions (lib/cms/admin-mutations.ts validates
 * and sanitises against them), so both sides agree on every field. Updates and legal keep their hand-built forms.
 *
 * Each `key` is the property name in `cms_entries.data` (the `XFile` types in lib/watch.ts, lib/academy.ts,
 * lib/audit.ts). Pure data: no server or DOM imports, safe in client components.
 */

type Base = { key: string; label: string; hint?: string };

export type FieldSpec =
  /** Tiptap editor; stored as HTML sanitised with `profile`. `size` only changes the writing surface's height. */
  | (Base & { kind: "rich"; profile: Exclude<Profile, "post">; size?: "line" | "small" | "default"; required?: boolean })
  /** One line (or `multiline`) of plain text. `nullable`: empty is stored as null. */
  | (Base & { kind: "text"; max: number; nullable?: boolean; required?: boolean; multiline?: boolean; placeholder?: string })
  /** https link checked against `accept` (see VIDEO_RULES). */
  | (Base & { kind: "url"; accept: keyof typeof VIDEO_RULES; nullable?: boolean; required?: boolean; placeholder?: string })
  /** Always required (the page renders the number as-is). */
  | (Base & { kind: "number"; integer?: boolean; min?: number; max?: number; suffix?: string })
  /** "YYYY-MM-DD" (stored as such; the public pages format it). Always required. */
  | (Base & { kind: "date" })
  /** One of a fixed list; the options come from the server (`selectOptions`), so the list has one source of truth. */
  | (Base & { kind: "select"; options: "academyModules" })
  /** Uploaded picture `{ src, width, height, alt }` or null. */
  | (Base & { kind: "image" });

export type FieldGroup = { title: string; description?: string; columns?: 1 | 2 | 3 | 4; fields: FieldSpec[] };

/** Which links a `url` field takes. */
export const VIDEO_RULES = {
  /** What the watch template plays: a Wistia embed (rendered with the Wistia player) or a YouTube embed (iframe). */
  watchVideo: {
    test: (u: URL) => /(^|\.)wistia\.(net|com)$/.test(u.hostname) || (/(^|\.)(youtube\.com|youtube-nocookie\.com)$/.test(u.hostname) && u.pathname.startsWith("/embed/")),
    error: "Use a Wistia embed link (https://fast.wistia.net/embed/iframe/…) or a YouTube embed link (https://www.youtube.com/embed/…).",
  },
  /** Academy lessons store a YouTube link (not played on the page yet). */
  youtube: {
    test: (u: URL) => /(^|\.)(youtube\.com|youtu\.be|youtube-nocookie\.com)$/.test(u.hostname),
    error: "Use a YouTube link (https://youtu.be/… or https://www.youtube.com/watch?v=…).",
  },
} satisfies Record<string, { test: (u: URL) => boolean; error: string }>;

const sectionHint = "Starts with its own heading.";

export const FIELD_GROUPS: Partial<Record<CollectionId, FieldGroup[]>> = {
  watch: [
    {
      title: "Video",
      fields: [
        { kind: "url", key: "videoUrl", label: "Video link", accept: "watchVideo", required: true, hint: "The Wistia embed link (Wistia → Share → Embed → Inline, the iframe's src).", placeholder: "https://fast.wistia.net/embed/iframe/abc123?autoPlay=true" },
      ],
    },
    {
      title: "Details",
      description: "Not shown on the page. They label the video for the email sequences that link to it.",
      columns: 2,
      fields: [
        { kind: "text", key: "duration", label: "Duration (optional)", max: 30, nullable: true, placeholder: "73" },
        { kind: "text", key: "emailSegment", label: "Email segment (optional)", max: 120, nullable: true, placeholder: "Sequence 1 - Email 1" },
      ],
    },
    {
      title: "Description",
      description: "Not shown on the page.",
      fields: [{ kind: "rich", key: "description", label: "Description", profile: "inline", size: "small" }],
    },
  ],
  academy: [
    {
      title: "Lesson",
      columns: 3,
      fields: [
        { kind: "select", key: "module", label: "Module", options: "academyModules" },
        { kind: "number", key: "order", label: "Lesson number", integer: true, min: 0, max: 99, hint: "Shown in “Lesson 2 / 6”." },
        { kind: "text", key: "duration", label: "Duration", max: 20, required: true, placeholder: "3:26" },
      ],
    },
    {
      title: "Video",
      fields: [{ kind: "url", key: "videoUrl", label: "YouTube link (optional)", accept: "youtube", nullable: true, hint: "Stored for later: the page shows a still picture for now.", placeholder: "https://youtu.be/…" }],
    },
    {
      title: "Description",
      description: "Shown under the video.",
      fields: [{ kind: "rich", key: "description", label: "Description", profile: "legal", size: "small" }],
    },
  ],
  audit: [
    {
      title: "Report",
      columns: 3,
      fields: [
        { kind: "date", key: "sentDate", label: "Sent on" },
        { kind: "date", key: "periodFrom", label: "Period from" },
        { kind: "date", key: "periodTo", label: "Period to" },
      ],
    },
    {
      title: "Founder",
      fields: [
        { kind: "text", key: "founderName", label: "Founder name", max: 120, required: true },
        { kind: "image", key: "founderImage", label: "Founder photo", hint: "Shown small and round next to the name. Square pictures work best." },
      ],
    },
    {
      title: "Summary",
      description: "The text under the title. Lists show as plain paragraphs here.",
      fields: [{ kind: "rich", key: "summary", label: "Summary", profile: "audit", size: "small" }],
    },
    {
      title: "Key numbers",
      description: "The units (“/ 500”, “min”) are part of the page.",
      columns: 4,
      fields: [
        { kind: "number", key: "totalConversations", label: "Total conversations", integer: true, min: 0 },
        { kind: "number", key: "totalMessages", label: "Total messages", integer: true, min: 0 },
        { kind: "number", key: "avgResponseTime", label: "Avg. response time", min: 0, suffix: "min" },
        { kind: "number", key: "messagesSent", label: "Messages sent", integer: true, min: 0 },
        { kind: "number", key: "messagesReceived", label: "Messages received", integer: true, min: 0 },
        { kind: "number", key: "periodAnalyzed", label: "Period analysed", min: 0 },
        { kind: "number", key: "keywordUsage", label: "Keyword usage", min: 0 },
        { kind: "number", key: "leadSharedEmail", label: "Leads who shared an email", min: 0 },
      ],
    },
    {
      title: "Side menu",
      description: "Labels of the table of contents; each links to the matching section below, in order.",
      columns: 2,
      fields: [1, 2, 3, 4, 5, 6, 7].map((n) => ({ kind: "text" as const, key: `sidenav${n}`, label: `Section ${n}`, max: 80, required: true })),
    },
    {
      title: "Section 1: key numbers",
      fields: [{ kind: "rich", key: "content1", label: "Section 1 heading", profile: "audit", size: "line", hint: "The heading above the key numbers." }],
    },
    {
      title: "Section 2: overview",
      description: "The pros / cons chips sit between the heading and the text.",
      fields: [
        { kind: "rich", key: "content2Title", label: "Overview heading", profile: "audit", size: "line" },
        { kind: "rich", key: "content2Body", label: "Overview text", profile: "audit" },
      ],
    },
    {
      title: "Section 3: archetypes",
      fields: [
        { kind: "rich", key: "content3Title", label: "Archetypes heading", profile: "audit", size: "line" },
        { kind: "rich", key: "content3Body", label: "Archetypes text", profile: "audit" },
      ],
    },
    {
      title: "Archetype percentages",
      columns: 4,
      fields: [
        { kind: "number", key: "archetype1", label: "The Curious Explorer", min: 0, max: 100, suffix: "%" },
        { kind: "number", key: "archetype2", label: "The Low-Capital Dreamer", min: 0, max: 100, suffix: "%" },
        { kind: "number", key: "archetype3", label: "The Pragmatic Professional", min: 0, max: 100, suffix: "%" },
        { kind: "number", key: "archetype4", label: "The Operator", min: 0, max: 100, suffix: "%" },
      ],
    },
    { title: "Section 4", fields: [{ kind: "rich", key: "content4", label: "Section 4", profile: "audit", hint: sectionHint }] },
    { title: "Section 5", fields: [{ kind: "rich", key: "content5", label: "Section 5", profile: "audit", hint: sectionHint }] },
    { title: "Section 6", fields: [{ kind: "rich", key: "content6", label: "Section 6", profile: "audit", hint: sectionHint }] },
    { title: "Section 7", fields: [{ kind: "rich", key: "content7", label: "Section 7", profile: "audit", hint: sectionHint }] },
    { title: "Final note", fields: [{ kind: "rich", key: "finalNote", label: "Final note", profile: "audit", hint: sectionHint }] },
    {
      title: "Search & sharing",
      fields: [{ kind: "text", key: "description", label: "Search description", max: 500, multiline: true, hint: "Shown in Google and when the link is shared." }],
    },
  ],
};

export function fieldsOf(collection: CollectionId): FieldSpec[] {
  return (FIELD_GROUPS[collection] ?? []).flatMap((g) => g.fields);
}

/** Collections edited through FIELD_GROUPS (as opposed to the hand-built updates / legal forms). */
export function isSpecCollection(collection: CollectionId): boolean {
  return Boolean(FIELD_GROUPS[collection]);
}

export type ImageValue = { src: string; width: number | null; height: number | null; alt: string };

/** A field's value inside the form: text, HTML, numbers and dates as strings; pictures as objects. */
export type FieldValue = string | ImageValue | null;

export type SelectOption = { value: string; label: string };
