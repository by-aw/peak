"use server";

import { signIn, signOut } from "@/lib/auth";

export async function signInAction() {
  await signIn("google", { redirectTo: "/admin" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/admin/login" });
}
