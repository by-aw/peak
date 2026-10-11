"use client";

import { cn } from "@/components/admin/lib/utils";
import { Input } from "@/components/admin/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select";
import { Textarea } from "@/components/admin/ui/textarea";
import type { FieldGroup, FieldSpec, FieldValue, ImageValue, SelectOption } from "@/lib/cms/fields";
import type { Variant } from "./extensions";
import { DatePicker, Field, ImageField, Section } from "./fields";
import { RichEditor } from "./rich-editor";

const VARIANT_OF: Record<Extract<FieldSpec, { kind: "rich" }>["profile"], Variant> = { inline: "inline", legal: "lesson", audit: "audit" };
const COLS = { 1: "", 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" } as const;

type Props = {
  groups: FieldGroup[];
  values: Record<string, FieldValue>;
  /** Values the rich editors load once. */
  initial: Record<string, FieldValue>;
  errors: Record<string, string>;
  options: Record<string, SelectOption[]>;
  onChange: (key: string, value: FieldValue) => void;
  /** A rich editor's normalised starting HTML (so "unsaved changes" starts clean). */
  onReady: (key: string, html: string) => void;
};

/** The form sections of a collection described by `FIELD_GROUPS` (lib/cms/fields.ts). */
export function SpecFields({ groups, values, initial, errors, options, onChange, onReady }: Props) {
  return groups.map((g) => (
    <Section key={g.title} title={g.title} description={g.description}>
      <div className={cn("grid gap-4", COLS[g.columns ?? 1])}>
        {g.fields.map((f) => (
          <SpecField key={f.key} f={f} value={values[f.key] ?? null} initial={initial[f.key] ?? null} error={errors[`fields.${f.key}`]} options={options} onChange={onChange} onReady={onReady} />
        ))}
      </div>
    </Section>
  ));
}

function SpecField({ f, value, initial, error, options, onChange, onReady }: { f: FieldSpec; value: FieldValue; initial: FieldValue; error?: string } & Pick<Props, "options" | "onChange" | "onReady">) {
  const id = `field-${f.key}`;
  const text = typeof value === "string" ? value : "";
  const invalid = Boolean(error) || undefined;
  switch (f.kind) {
    case "rich":
      return (
        <Field label={f.label} hint={f.hint} error={error}>
          <RichEditor
            variant={VARIANT_OF[f.profile]}
            label={f.label}
            size={f.size}
            invalid={Boolean(error)}
            // The audit page renders its rich text pre-wrap, so leading / repeated spaces show there.
            preserveWhitespace={f.profile === "audit"}
            initialHtml={typeof initial === "string" ? initial : ""}
            placeholder={f.size === "line" ? "Heading…" : "Start writing…"}
            onReady={(html) => onReady(f.key, html)}
            onChange={(html) => onChange(f.key, html)}
          />
        </Field>
      );
    case "text":
      return (
        <Field label={f.label} hint={f.hint} error={error} htmlFor={id}>
          {f.multiline ? (
            <Textarea id={id} value={text} onChange={(e) => onChange(f.key, e.target.value)} rows={3} maxLength={f.max} aria-invalid={invalid} placeholder={f.placeholder} />
          ) : (
            <Input id={id} value={text} onChange={(e) => onChange(f.key, e.target.value)} maxLength={f.max} aria-invalid={invalid} placeholder={f.placeholder} />
          )}
        </Field>
      );
    case "url":
      return (
        <Field label={f.label} hint={f.hint} error={error} htmlFor={id}>
          <Input id={id} type="url" inputMode="url" spellCheck={false} value={text} onChange={(e) => onChange(f.key, e.target.value)} aria-invalid={invalid} placeholder={f.placeholder} />
        </Field>
      );
    case "number":
      return (
        <Field label={f.label} hint={f.hint} error={error} htmlFor={id}>
          <div className="relative">
            <Input
              id={id}
              type="number"
              inputMode={f.integer ? "numeric" : "decimal"}
              step={f.integer ? 1 : "any"}
              min={f.min}
              max={f.max}
              value={text}
              onChange={(e) => onChange(f.key, e.target.value)}
              aria-invalid={invalid}
              className={f.suffix ? "pr-12" : undefined}
            />
            {f.suffix && <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">{f.suffix}</span>}
          </div>
        </Field>
      );
    case "date":
      return (
        <Field label={f.label} hint={f.hint} error={error} htmlFor={id}>
          <DatePicker id={id} value={text} onChange={(v) => onChange(f.key, v)} invalid={Boolean(error)} />
        </Field>
      );
    case "select":
      return (
        <Field label={f.label} hint={f.hint} error={error} htmlFor={id}>
          <Select value={text} onValueChange={(v) => onChange(f.key, v)}>
            <SelectTrigger id={id} className="w-full" aria-invalid={invalid}>
              <SelectValue placeholder="Pick one" />
            </SelectTrigger>
            <SelectContent>
              {(options[f.options] ?? []).map((o) => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      );
    case "image": {
      const img = value && typeof value === "object" ? (value as ImageValue) : null;
      return (
        <div className="grid gap-4">
          <Field label={f.label} hint={f.hint} error={error}>
            <ImageField
              label="photo"
              src={img?.src ?? ""}
              onChange={(v) => onChange(f.key, v ? { src: v.src, width: v.width, height: v.height, alt: img?.alt ?? "" } : null)}
            />
          </Field>
          {img && (
            <Field label="Describe the photo" hint="For people who can't see it, and for search engines." htmlFor={`${id}-alt`}>
              <Input id={`${id}-alt`} value={img.alt} onChange={(e) => onChange(f.key, { ...img, alt: e.target.value })} maxLength={300} />
            </Field>
          )}
        </div>
      );
    }
  }
}
