"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/admin/ui/button";
import { COLLECTIONS } from "./collections";

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-wrap items-center gap-1" aria-label="Collections">
      {COLLECTIONS.map((c) => {
        const active = pathname.startsWith(`/admin/${c.id}`);
        return (
          <Button key={c.id} asChild variant={active ? "secondary" : "ghost"} size="sm" className={active ? "text-primary" : "text-muted-foreground"}>
            <Link href={`/admin/${c.id}`} aria-current={active ? "page" : undefined}>
              {c.label}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}
