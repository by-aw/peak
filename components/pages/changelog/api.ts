/**
 * Mochi changelog API, the same endpoint the live Framer page's "Changelog" code component calls from the
 * browser (CORS is open). `/changelog` renders the first page on the server and the client feed fetches the rest.
 */
export const CHANGELOG_API = "https://mochi-customer-support-production.up.railway.app/api/changelog";
export const PAGE_SIZE = 20;

export type ChangelogEntry = {
  id: number;
  headline: string;
  /** `YYYY-MM-DD` */
  published_at: string;
  platform: string;
  category?: { slug: string; name: string } | null;
  affects_roles?: string[] | null;
  what_it_is?: string | null;
  how_it_helps?: string | null;
  how_to_access?: string | null;
};

export type ChangelogPage = { entries: ChangelogEntry[]; hasMore: boolean; total: number };

export type TypeFilter = "all" | "new-feature" | "improvement" | "fix" | "intelligence";
export type PlatformFilter = "all" | "web" | "ios" | "backend";

/**
 * Same query as the live component: `category` for the type row and `tags` for the platform row (the live
 * site really does send the platform as a tag, so "Web" matches nothing and shows the empty state).
 */
export function changelogUrl(type: string, platform: string, offset: number): string {
  const params = new URLSearchParams({ limit: String(PAGE_SIZE), offset: String(offset) });
  if (type !== "all") params.set("category", type);
  if (platform !== "all") params.set("tags", platform);
  return `${CHANGELOG_API}?${params.toString()}`;
}

/** Validates the API envelope (`{ success, data: { entries, pagination } }`) and flattens it. */
export function parseChangelogResponse(json: unknown): ChangelogPage {
  const body = json as {
    success?: boolean;
    data?: { entries?: ChangelogEntry[]; pagination?: { has_more?: boolean; total?: number } };
  };
  if (!body?.success || !body.data?.entries) throw new Error("API returned success: false");
  return {
    entries: body.data.entries,
    hasMore: Boolean(body.data.pagination?.has_more),
    total: body.data.pagination?.total ?? 0,
  };
}
