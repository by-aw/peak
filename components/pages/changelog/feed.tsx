"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { changelogUrl, parseChangelogResponse, type ChangelogEntry, type ChangelogPage } from "./api";
import { FilterRow, platformOptions, typeOptions } from "./filter-row";
import { ChangelogRow } from "./entry";
import { ChangelogSkeleton } from "./skeleton";

/** "2026-06-14" -> "June 14, 2026" (built from the parts, so it never shifts with the viewer's timezone). */
function formatDate(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  if (!y || !m || !d) return date;
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

/** Groups entries by `published_at`, newest day first, keeping the API order inside a day. */
function groupByDate(entries: ChangelogEntry[]): { date: string; entries: ChangelogEntry[] }[] {
  const groups = new Map<string, ChangelogEntry[]>();
  for (const entry of entries) {
    const list = groups.get(entry.published_at);
    if (list) list.push(entry);
    else groups.set(entry.published_at, [entry]);
  }
  return [...groups.entries()].sort((a, b) => b[0].localeCompare(a[0])).map(([date, list]) => ({ date, entries: list }));
}

/**
 * Framer "Changelog" code component (`B`): intro (What's New pill, "Changelog", subtitle), the two filter rows
 * (type and platform, combined in one query), the entries grouped by day and a "Load more" button (20 per page).
 * The first page (All / All) comes from the server; filter changes and "Load more" fetch from the API in the
 * browser, as on live. If the server could not get the first page it is fetched here, behind the skeleton.
 */
export function ChangelogFeed({ initial }: { initial: ChangelogPage | null }) {
  const [entries, setEntries] = useState<ChangelogEntry[]>(initial?.entries ?? []);
  const [loading, setLoading] = useState(!initial);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(initial?.hasMore ?? false);
  const [nextOffset, setNextOffset] = useState(initial?.entries.length ?? 0);
  const [type, setType] = useState<(typeof typeOptions)[number]["slug"]>("all");
  const [platform, setPlatform] = useState<(typeof platformOptions)[number]["slug"]>("all");

  /** Id of the latest request, so a slow response for an old filter never overwrites a newer one. */
  const requestId = useRef(0);
  /** Filter combination whose first page is already on screen (the server-rendered one at start). */
  const loadedKey = useRef<string | null>(initial ? "all|all" : null);

  const load = useCallback(async (t: string, p: string, offset: number, append: boolean) => {
    const id = ++requestId.current;
    try {
      if (append) setLoadingMore(true);
      else setLoading(true);
      setError(null);
      const res = await fetch(changelogUrl(t, p, offset));
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const page = parseChangelogResponse(await res.json());
      if (id !== requestId.current) return;
      setEntries((prev) => (append ? [...prev, ...page.entries] : page.entries));
      setHasMore(page.hasMore);
      setNextOffset(offset + page.entries.length);
    } catch (e) {
      if (id !== requestId.current) return;
      setError(e instanceof Error ? e.message : "Failed to load changelog");
    } finally {
      if (id === requestId.current) {
        setLoading(false);
        setLoadingMore(false);
      }
    }
  }, []);

  useEffect(() => {
    const key = `${type}|${platform}`;
    if (loadedKey.current === key) return;
    loadedKey.current = key;
    setNextOffset(0);
    void load(type, platform, 0, false);
  }, [type, platform, load]);

  const groups = groupByDate(entries);

  return (
    <div className="w-full font-sans">
      <div className="mb-6 flex flex-col gap-8 border-b border-[rgba(23,23,24,0.10)] py-7 md:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center rounded-md bg-[rgba(23,23,24,0.10)] px-2 py-1 font-sans text-[11px] leading-[16.5px] font-medium text-[#171718]">
            What&apos;s New
          </span>
          <h1 className="m-0 font-sans text-[22.7px] leading-8 font-medium tracking-[-0.6px] text-[#171718]">Changelog</h1>
          <p className="m-0 font-sans text-[13px] leading-[22px] font-normal text-[rgba(23,23,24,0.65)]">
            New features and improvements to Mochi.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 md:gap-3">
          <FilterRow label="Filter by type:" options={typeOptions} active={type} onChange={setType} />
          <FilterRow label="Filter by platform:" options={platformOptions} active={platform} onChange={setPlatform} />
        </div>
      </div>

      {loading && <ChangelogSkeleton />}

      {!loading && error && <div className="rounded-lg px-4 py-[14px] font-sans text-[13px] leading-[normal]">Could not load changelog: {error}</div>}

      {!loading && !error && entries.length === 0 && (
        <p className="m-0 px-0 py-12 text-center font-sans text-[13px] leading-[normal] text-[rgba(23,23,24,0.4)]">No entries found for these filters.</p>
      )}

      {!loading &&
        !error &&
        groups.map(({ date, entries: dayEntries }) => (
          <div key={date} className="mb-8 border-b border-[rgba(23,23,24,0.10)] pb-8">
            <p className="m-0 mb-0 font-sans text-[12px] leading-[normal] font-normal tracking-[0.01em] text-[rgba(23,23,24,0.4)] md:mb-4">
              {formatDate(date)}
            </p>
            <div>
              {dayEntries.map((entry, i) => (
                <ChangelogRow key={entry.id} entry={entry} isLast={i === dayEntries.length - 1} />
              ))}
            </div>
          </div>
        ))}

      {!loading && !error && hasMore && (
        <div className="mt-2 pb-8 text-center">
          <button
            type="button"
            onClick={() => void load(type, platform, nextOffset, true)}
            disabled={loadingMore}
            className={`rounded-lg border-none bg-[#171718] px-7 py-[9px] font-sans text-[13px] leading-[normal] font-medium text-white outline-none transition-opacity duration-150 ease-[ease] ${
              loadingMore ? "cursor-default opacity-50" : "cursor-pointer opacity-100"
            }`}
          >
            {loadingMore ? "Loading…" : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
}
