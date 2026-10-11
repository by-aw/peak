import "server-only";
import { ACADEMY_MODULES } from "@/lib/academy";
import type { FieldSpec, SelectOption } from "./fields";

type Source = Extract<FieldSpec, { kind: "select" }>["options"];

/** Options of every `select` field, by source. Server-only (lib/academy reads files); the editor gets them as a prop. */
export function selectOptions(): Record<Source, SelectOption[]> {
  return {
    academyModules: [...ACADEMY_MODULES].sort((a, b) => a.order - b.order).map((m) => {
      const nice = m.slug.replace(/-/g, " ").replace(/^./, (c) => c.toUpperCase());
      return { value: m.slug, label: m.name.toLowerCase() === nice.toLowerCase() ? m.name : `${m.name} · ${nice}` };
    }),
  };
}
