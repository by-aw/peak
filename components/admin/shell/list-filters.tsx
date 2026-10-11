"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select";

const STATUSES = ["draft", "published", "scheduled"] as const;

/** Search + status filter for an entry list. A plain GET form: the server reads `q` and `status` from the URL ("all" = no filter). */
export function ListFilters({ q, status }: { q: string; status?: string }) {
  return (
    <form className="flex flex-wrap gap-2" role="search">
      <div className="relative min-w-0 flex-1 basis-56">
        <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input name="q" defaultValue={q} placeholder="Search title or slug" aria-label="Search title or slug" className="bg-background pl-9" />
      </div>
      <Select name="status" defaultValue={status ?? "all"}>
        <SelectTrigger aria-label="Status" className="w-40 bg-background">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          {STATUSES.map((s) => (
            <SelectItem key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit" variant="outline" className="bg-background">Filter</Button>
    </form>
  );
}
