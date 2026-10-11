"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { COLLECTIONS } from "./collections";

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-1" aria-label="Collections">
      {COLLECTIONS.map((c) => {
        const active = pathname.startsWith(`/admin/${c.id}`);
        return (
          <Link
            key={c.id}
            href={`/admin/${c.id}`}
            aria-current={active ? "page" : undefined}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium ${active ? "bg-purple-100 text-purple-800" : "text-gray-700 hover:bg-gray-100"}`}
          >
            {c.label}
          </Link>
        );
      })}
    </nav>
  );
}
