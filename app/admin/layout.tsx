import type { Metadata } from "next";
import Link from "next/link";
import { getEditor } from "@/lib/auth";
import { signOutAction } from "./actions";
import { AdminNav } from "@/components/admin/shell/admin-nav";

export const metadata: Metadata = {
  title: { default: "Mochi CMS", template: "%s · Mochi CMS" },
  robots: { index: false, follow: false, nocache: true },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const editor = await getEditor();
  return (
    <div className="min-h-screen bg-gray-25 font-sans text-ink">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
          <Link href="/admin" className="text-base font-semibold">Mochi CMS</Link>
          {editor && <AdminNav />}
          {editor && (
            <div className="ml-auto flex items-center gap-3 text-sm text-gray-600">
              <span className="max-w-[14rem] truncate">{editor.email}</span>
              <form action={signOutAction}>
                <button type="submit" className="rounded-lg border border-gray-200 px-3 py-1.5 font-medium text-gray-800 hover:bg-gray-100">Sign out</button>
              </form>
            </div>
          )}
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}
