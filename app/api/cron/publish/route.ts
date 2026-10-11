import { and, eq, gt, lte } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { db, hasDatabase } from "@/lib/cms/db";
import { entries } from "@/lib/cms/schema";
import { cmsTags } from "@/lib/cms/types";

/**
 * Scheduled publishing. Vercel Cron calls this hourly (vercel.json) with `Authorization: Bearer $CRON_SECRET`.
 * Cached reads only look at `publish_at <= now()` when they run, so an entry scheduled for the future would stay hidden
 * until its cache entry expires; here we find entries that went live since the previous run (window + margin) and
 * invalidate their entry tag and collection tag so the next visit re-renders them.
 */
const INTERVAL_MS = 60 * 60 * 1000;
const MARGIN_MS = 15 * 60 * 1000;

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) return new Response("Unauthorized", { status: 401 });
  if (!hasDatabase) return Response.json({ ok: true, skipped: "no database" });

  const now = new Date();
  const since = new Date(now.getTime() - INTERVAL_MS - MARGIN_MS);
  const due = await db()
    .select({ collection: entries.collection, slug: entries.slug })
    .from(entries)
    .where(and(eq(entries.status, "published"), gt(entries.publishAt, since), lte(entries.publishAt, now)));

  const collections = new Set(due.map((e) => e.collection));
  for (const { collection, slug } of due) revalidateTag(cmsTags.entry(collection, slug), "max");
  for (const collection of collections) revalidateTag(cmsTags.collection(collection), "max");

  return Response.json({ ok: true, revalidated: due.map((e) => `${e.collection}/${e.slug}`) });
}
