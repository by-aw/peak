import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { TriangleAlert } from "lucide-react";
import { getEditor } from "@/lib/auth";
import { signInAction } from "../actions";
import { Alert, AlertDescription } from "@/components/admin/ui/alert";
import { Button } from "@/components/admin/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/card";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (await getEditor()) redirect("/admin");
  const { error } = await searchParams;
  return (
    <Card className="mx-auto mt-8 max-w-sm text-center">
      <CardHeader>
        <CardTitle className="text-xl">Sign in to Mochi CMS</CardTitle>
        <CardDescription>Use your company Google account.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive" className="text-left">
            <TriangleAlert />
            <AlertDescription>
              {error === "AccessDenied"
                ? "That Google account isn't allowed. Please sign in with your company email address."
                : "Something went wrong signing in. Please try again."}
            </AlertDescription>
          </Alert>
        )}
        <form action={signInAction}>
          <Button type="submit" className="w-full">
            <GoogleMark /> Sign in with Google
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4">
      <path fill="#fff" d="M21.35 11.1H12v2.98h5.35c-.5 2.4-2.5 3.6-5.35 3.6a6 6 0 1 1 0-12c1.5 0 2.85.55 3.9 1.45l2.1-2.1A9 9 0 1 0 12 21c5.2 0 8.7-3.65 8.7-8.8 0-.4-.05-.75-.15-1.1z" />
    </svg>
  );
}
