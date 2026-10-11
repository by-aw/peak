"use client";

import { CalendarIcon, ImageIcon, Upload, X } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/components/admin/lib/utils";
import { Button } from "@/components/admin/ui/button";
import { Calendar } from "@/components/admin/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Label } from "@/components/admin/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/admin/ui/popover";
import { Progress } from "@/components/admin/ui/progress";
import { Skeleton } from "@/components/admin/ui/skeleton";
import { uploadImage } from "./upload";

export function Field({ label, hint, error, htmlFor, children }: { label: string; hint?: ReactNode; error?: string; htmlFor?: string; children: ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      {children}
      {error && <p role="alert" className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}

/** "42 / 60" that turns amber past the recommended length (search engines cut longer text off). */
export function Count({ value, limit }: { value: string; limit: number }) {
  const n = value.length;
  return <span className={cn("text-xs", n > limit ? "font-medium text-amber-700" : "text-muted-foreground")}>{n} / {limit}{n > limit ? " (may be cut off in search results)" : ""}</span>;
}

export function Section({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}

const dayFmt = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });

/** "YYYY-MM-DD" <-> local-midnight Date (no time-zone shifting, so the stored day never moves). */
export function parseDay(value: string): Date | undefined {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : undefined;
}
export function formatDay(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** A date field: button that opens a calendar. `value` / `onChange` use the stored "YYYY-MM-DD" format ("" = no date). */
export function DatePicker({ id, value, onChange, invalid }: { id: string; value: string; onChange: (v: string) => void; invalid?: boolean }) {
  const [open, setOpen] = useState(false);
  const date = parseDay(value);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button id={id} type="button" variant="outline" aria-invalid={invalid || undefined} className={cn("w-full justify-start font-normal", !date && "text-muted-foreground")}>
          <CalendarIcon />
          {date ? dayFmt.format(date) : "Pick a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          mode="single"
          captionLayout="dropdown"
          startMonth={new Date(2015, 0)}
          endMonth={new Date(2040, 11)}
          selected={date}
          defaultMonth={date}
          onSelect={(d) => {
            onChange(d ? formatDay(d) : "");
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

/** Upload / replace / remove for one picture. `onChange` receives the Blob URL and the picture's pixel size. */
export function ImageField({ src, onChange, label }: { src: string; onChange: (v: { src: string; width: number | null; height: number | null } | null) => void; label: string }) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="grid gap-2">
      {busy ? (
        <Skeleton className="h-24 w-full max-w-md" />
      ) : src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="max-h-48 w-fit max-w-full rounded-lg border bg-muted object-contain" />
      ) : (
        <div className="flex h-24 items-center justify-center gap-2 rounded-lg border border-dashed bg-muted/50 text-sm text-muted-foreground">
          <ImageIcon className="size-4" /> No picture yet
        </div>
      )}
      {busy && <Progress value={progress} aria-label={`Uploading ${label}`} className="max-w-md" />}
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" size="sm" disabled={busy} onClick={() => input.current?.click()}>
          <Upload /> {busy ? `Uploading… ${progress}%` : src ? `Replace ${label}` : `Upload ${label}`}
        </Button>
        {src && !busy && (
          <Button type="button" variant="ghost" size="sm" onClick={() => onChange(null)}><X /> Remove</Button>
        )}
      </div>
      {error && <p role="alert" className="text-xs font-medium text-destructive">{error}</p>}
      <input
        ref={input}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        hidden
        onChange={async (e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (!file) return;
          setError(null);
          setProgress(0);
          setBusy(true);
          try {
            const img = await uploadImage(file, setProgress);
            onChange({ src: img.url, width: img.width, height: img.height });
          } catch (err) {
            setError(err instanceof Error ? err.message : "Upload failed.");
          } finally {
            setBusy(false);
          }
        }}
      />
    </div>
  );
}
