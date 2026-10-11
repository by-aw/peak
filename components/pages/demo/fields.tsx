import type { ReactNode } from "react";
import { INTER_FEATURES, type Field, type SelectField, type TextField } from "./config";
import { SelectChevron } from "./icons";

/**
 * Framer form controls of the demo funnels. Framer draws input borders as an `::after` overlay (1px
 * rgba(0,0,0,0.1), #a855f7 while focused) so they never shift the content; these do the same.
 */
const BORDER =
  "relative after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border after:border-black/10 after:content-[''] focus-within:after:border-purple-500";

const LABEL = `font-sans text-[14px] leading-5 font-medium text-gray-750 ${INTER_FEATURES}`;

/** Framer label block: the label text above its control, 10px apart. */
export function FieldLabel({ label, optional, children }: { label: string; optional?: boolean; children: ReactNode }) {
  return (
    <label className="flex w-full flex-col items-start gap-2.5">
      <span className={`block w-full ${LABEL}`}>
        {label}
        {optional && <span className="text-[#525252cc]"> (optional)</span>}
      </span>
      {children}
    </label>
  );
}

/** Framer FormSelect: 44px, 8px radius, 8px 12px padding, Inter 400 14/20, grey until a value is picked. */
export function SelectControl({ field }: { field: SelectField }) {
  return (
    <div className={`${BORDER} h-11 w-full overflow-hidden rounded-[8px] pr-3`}>
      <select
        name={field.name}
        required
        defaultValue=""
        className="h-full w-full cursor-pointer appearance-none truncate bg-transparent px-3 py-2 font-sans text-[14px] leading-5 font-normal text-ink-3 outline-none invalid:text-[#525252cc] [&_option]:text-black [&_option:disabled]:text-black/40"
      >
        <option value="" disabled>
          {field.placeholder}
        </option>
        {field.options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <SelectChevron className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2" />
    </div>
  );
}

type TextVariant = "step1" | "step2" | "step2Compact";

const wrapper: Record<TextVariant, string> = {
  /** Step 1 inputs: 44px, 6px radius, 12px padding, 14/20. */
  step1: "h-11 rounded-[6px]",
  /** Step 2 (/demo): 8px radius, 12px padding, 16/20 text, so 44px tall. */
  step2: "rounded-[8px]",
  /** Step 2 (/demo-jia): the same at a fixed 40px. */
  step2Compact: "h-10 rounded-[8px]",
};

/** Framer FormPlainTextInput (text / email / tel). */
export function TextControl({ field, variant }: { field: TextField; variant: TextVariant }) {
  return (
    <div className={`${BORDER} flex w-full items-center overflow-hidden p-3 ${wrapper[variant]}`}>
      <input
        type={field.kind === "textarea" ? "text" : field.kind}
        name={field.name}
        required={field.required}
        placeholder={field.placeholder}
        autoComplete={autoComplete[field.name]}
        className={`h-full w-auto min-w-0 flex-1 truncate bg-transparent p-0 font-sans font-normal text-ink-3 outline-none placeholder:text-[#525252cc] ${
          variant === "step1" ? "text-[14px] leading-5" : "text-[16px] leading-5"
        }`}
      />
    </div>
  );
}

const autoComplete: Record<string, string | undefined> = { First: "given-name", Last: "family-name", Email: "email", Phone: "tel" };

/** Step 1 Framer textarea: 100px minimum, 6px radius, 12px padding, 14/20, vertical resize with Framer's grip. */
export function TextAreaControl({ field }: { field: TextField }) {
  return (
    <div className={`${BORDER} min-h-[100px] w-full overflow-hidden rounded-[6px]`}>
      <textarea
        name={field.name}
        required={field.required}
        placeholder={field.placeholder}
        className="demo-resizer block min-h-[inherit] w-full resize-y overflow-y-auto bg-transparent p-3 font-sans text-[14px] leading-5 font-normal whitespace-break-spaces text-ink-3 outline-none placeholder:text-[#525252cc]"
      />
    </div>
  );
}

/**
 * Framer Forms "Text Input" in text-area mode (the optional Comment): 8px radius, 12px padding, 16/20, grows
 * with its content from 3 to 8 lines (5 lines tall where `field-sizing` is unsupported), no resize, no scrollbar.
 */
export function CommentControl({ field }: { field: TextField }) {
  return (
    <div className={`${BORDER} w-full rounded-[8px]`}>
      <textarea
        name={field.name}
        rows={1}
        placeholder={field.placeholder}
        className="block max-h-[calc(8lh+24px)] min-h-[calc(5lh+24px)] w-full resize-none bg-transparent p-3 font-sans text-[16px] leading-5 font-normal text-ink-3 [scrollbar-width:none] outline-none placeholder:text-[#525252cc] supports-[field-sizing:content]:min-h-[calc(3lh+24px)] supports-[field-sizing:content]:[field-sizing:content] [&::-webkit-scrollbar]:hidden"
      />
    </div>
  );
}

export function FieldControl({ field }: { field: Field }) {
  if (field.kind === "select") return <SelectControl field={field} />;
  if (field.kind === "textarea") return <TextAreaControl field={field} />;
  return <TextControl field={field} variant="step1" />;
}

/** Framer's textarea grip (`textarea::-webkit-resizer`), rendered once per form. */
export const RESIZER_CSS = `.demo-resizer::-webkit-resizer{background:url("data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2214%22 height=%2214%22><path d=%22m1.5 8 7-7M9 5.5l-3 3%22 stroke=%22%23999%22 stroke-width=%221.5%22 stroke-linecap=%22round%22></path></svg>") no-repeat}`;
