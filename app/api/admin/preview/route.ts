import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { requireEditor } from "@/lib/auth";

const PATHS = { updates: "/updates", legal: "/legal" } as const;

/** /api/admin/preview?collection=updates&slug=my-post: turn on Draft Mode for this browser, then open the public page. */
export async function GET(request: Request) {
  await requireEditor();
  const { searchParams } = new URL(request.url);
  const collection = searchParams.get("collection");
  const slug = searchParams.get("slug") ?? "";
  if ((collection !== "updates" && collection !== "legal") || !/^[a-z0-9-]+$/.test(slug)) {
    return new Response("Bad request", { status: 400 });
  }
  (await draftMode()).enable();
  redirect(`${PATHS[collection]}/${slug}`);
}
