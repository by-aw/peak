import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getEditor } from "@/lib/auth";

// First line of defence for the CMS. Pages, server actions and route handlers still call requireEditor().
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) return NextResponse.next();

  if (await getEditor()) return NextResponse.next();

  if (pathname.startsWith("/api/")) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.redirect(new URL("/admin/login", request.url));
}

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };
