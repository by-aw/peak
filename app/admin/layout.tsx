import type { Metadata } from "next";
import Link from "next/link";
import { getEditor } from "@/lib/auth";
import { signOutAction } from "./actions";
import { AdminNav } from "@/components/admin/shell/admin-nav";
import { AccountMenu } from "@/components/admin/shell/account-menu";
import { TooltipProvider } from "@/components/admin/ui/tooltip";
import { Toaster } from "@/components/admin/ui/sonner";

export const metadata: Metadata = {
  title: { default: "Mochi CMS", template: "%s · Mochi CMS" },
  robots: { index: false, follow: false, nocache: true },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const editor = await getEditor();
  return (
    <div data-admin-root className="min-h-screen bg-muted/40 font-sans text-foreground">
      <TooltipProvider delayDuration={200}>
        <header className="border-b bg-background">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
            <Link href="/admin" className="text-base font-semibold">Mochi CMS</Link>
            {editor && <AdminNav />}
            {editor && (
              <div className="ml-auto">
                <AccountMenu email={editor.email} signOut={signOutAction} />
              </div>
            )}
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <Toaster position="bottom-right" richColors closeButton />
      </TooltipProvider>
    </div>
  );
}
