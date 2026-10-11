import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/** Turns Draft Mode off for this browser (no sign-in needed: it only removes a cookie). `?to=/path` returns to a site path. */
export async function GET(request: Request) {
  (await draftMode()).disable();
  const to = new URL(request.url).searchParams.get("to") ?? "";
  redirect(to.startsWith("/") && !to.startsWith("//") && !to.includes("\\") ? to : "/admin");
}
