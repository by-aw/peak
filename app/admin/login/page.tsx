import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getEditor } from "@/lib/auth";
import { signInAction } from "../actions";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (await getEditor()) redirect("/admin");
  const { error } = await searchParams;
  return (
    <div className="mx-auto max-w-sm rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
      <h1 className="text-xl font-semibold">Sign in to Mochi CMS</h1>
      <p className="mt-2 text-sm text-gray-600">Use your company Google account.</p>
      {error && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">
          {error === "AccessDenied"
            ? "That Google account isn't allowed. Please sign in with your company email address."
            : "Something went wrong signing in. Please try again."}
        </p>
      )}
      <form action={signInAction} className="mt-6">
        <button type="submit" className="w-full rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-900">
          Sign in with Google
        </button>
      </form>
    </div>
  );
}
