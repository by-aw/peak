import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { redirect } from "next/navigation";

export type Editor = { email: string; name: string | null };

/**
 * Dev-only sign-in bypass, so the CMS can be worked on without Google credentials.
 * All three must hold: a development server (`next dev` sets NODE_ENV=development; `next build` / production
 * always sets "production", so this is statically false in deployed builds), Google OAuth is NOT configured
 * (AUTH_GOOGLE_ID unset), and ADMIN_DEV_EMAIL is explicitly set. Setting ADMIN_DEV_EMAIL on Vercel does nothing.
 */
function devEditor(): Editor | null {
  if (process.env.NODE_ENV !== "development") return null;
  if (process.env.AUTH_GOOGLE_ID) return null;
  const email = process.env.ADMIN_DEV_EMAIL;
  return email ? { email, name: "Dev editor" } : null;
}

/** Only verified Google accounts on the configured domain. Unset domain => nobody (fail closed). */
function isAllowedEmail(email: string | null | undefined, verified: unknown): boolean {
  const domain = process.env.ADMIN_EMAIL_DOMAIN?.trim().toLowerCase().replace(/^@/, "");
  if (!domain || !email || verified !== true) return false;
  return email.toLowerCase().endsWith(`@${domain}`);
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  session: { strategy: "jwt", maxAge: 60 * 60 * 12 },
  pages: { signIn: "/admin/login", error: "/admin/login" },
  trustHost: true,
  callbacks: {
    signIn({ profile }) {
      return isAllowedEmail(profile?.email, profile?.email_verified);
    },
  },
});

/** The current editor, or null. Never redirects. */
export async function getEditor(): Promise<Editor | null> {
  const dev = devEditor();
  if (dev) return dev;
  const session = await auth();
  const email = session?.user?.email;
  // Re-check the domain on every request so changing ADMIN_EMAIL_DOMAIN revokes old sessions.
  if (!email || !isAllowedEmail(email, true)) return null;
  return { email, name: session.user?.name ?? null };
}

/** Returns the signed-in editor, or redirects to /admin/login. Use in every admin page, server action and route. */
export async function requireEditor(): Promise<Editor> {
  const editor = await getEditor();
  if (!editor) redirect("/admin/login");
  return editor;
}
