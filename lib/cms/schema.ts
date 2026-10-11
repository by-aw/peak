import { index, integer, jsonb, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import type { CollectionData, CollectionId, EntryStatus } from "./types";

/**
 * One table for every CMS collection (updates, legal, and later watch / academy / audit). Fields every collection
 * shares are columns; the collection-specific shape lives in `data` (see `CollectionData` in ./types).
 *
 * An entry is live when `status = 'published'` and `publish_at <= now()`; a future `publish_at` schedules it.
 */
export const entries = pgTable(
  "cms_entries",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    collection: text("collection").$type<CollectionId>().notNull(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    status: text("status").$type<EntryStatus>().notNull().default("draft"),
    /** When the entry goes live. Null while it has never been published. */
    publishAt: timestamp("publish_at", { withTimezone: true }),
    /** Manual order within the collection (Framer's collection order); lower first. */
    sortOrder: integer("sort_order").notNull().default(0),
    data: jsonb("data").$type<CollectionData[CollectionId]>().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    /** Email of the editor who last saved the entry. */
    updatedBy: text("updated_by"),
  },
  (t) => [uniqueIndex("cms_entries_collection_slug").on(t.collection, t.slug), index("cms_entries_live").on(t.collection, t.status, t.publishAt)],
);

export type EntryRow = typeof entries.$inferSelect;
export type NewEntryRow = typeof entries.$inferInsert;
