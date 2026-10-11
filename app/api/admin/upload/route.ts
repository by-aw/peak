import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { requireEditor } from "@/lib/auth";

/**
 * Client uploads straight to Vercel Blob (files never pass through a function, so the 50 MB audio limit is fine).
 * This route only hands out short-lived tokens, and only to a signed-in editor, for the file types and sizes below.
 * The "upload completed" callback from Vercel carries no editor session; `handleUpload` verifies its signature itself.
 */

const MB = 1024 * 1024;
const KINDS = {
  image: { types: ["image/png", "image/jpeg", "image/webp", "image/gif"], max: 10 * MB }, // no SVG: it can carry scripts
  audio: { types: ["audio/mpeg", "audio/mp4", "audio/x-m4a", "audio/m4a", "audio/wav", "audio/x-wav", "audio/wave"], max: 50 * MB },
} as const;

export async function POST(request: Request): Promise<Response> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return Response.json({ error: "File storage isn't connected yet. Add Vercel Blob to the project, then try again." }, { status: 503 });
  }
  let body: HandleUploadBody;
  try {
    body = (await request.json()) as HandleUploadBody;
  } catch {
    return Response.json({ error: "Bad request." }, { status: 400 });
  }
  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        await requireEditor();
        const kind = clientPayload === "audio" ? "audio" : clientPayload === "image" ? "image" : null;
        if (!kind) throw new Error("Unknown upload type.");
        if (!/^cms\/(image|audio)\/[A-Za-z0-9._-]{1,120}$/.test(pathname) || !pathname.startsWith(`cms/${kind}/`)) throw new Error("Invalid file name.");
        return {
          allowedContentTypes: [...KINDS[kind].types],
          maximumSizeInBytes: KINDS[kind].max,
          addRandomSuffix: true,
        };
      },
    });
    return Response.json(json);
  } catch (e) {
    // requireEditor() redirects when signed out; surface that as a 401 rather than an HTML redirect.
    const digest = (e as { digest?: string })?.digest;
    if (typeof digest === "string" && digest.startsWith("NEXT_REDIRECT")) return Response.json({ error: "Please sign in again." }, { status: 401 });
    return Response.json({ error: e instanceof Error ? e.message : "Upload failed." }, { status: 400 });
  }
}
