"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { BookedCallsIcon, CallsTakenIcon, MinusIcon, PlusIcon, SalesMadeIcon, TotalCashIcon } from "./icons";
import {
  INITIAL_VALUES,
  computeResults,
  formatCurrency,
  formatNumber,
  formatPercent,
  parseDollars,
  parseGroupedNumber,
  parsePercent,
  parsePlainNumber,
  stepValue,
  type CalculatorField,
  type CalculatorResults,
  type CalculatorValues,
  type StepperDirection,
} from "./math";

/** Framer's two-layer hairline ring (sRGB #E0E0E0 + its display-p3 twin) used on every card of the component. */
const ringShadow = "0 0 0 0.5px #E0E0E0, 0 0 0 0.5px color(display-p3 0.88 0.88 0.88)";

/** Press-and-hold repeat of Framer's stepper buttons: fires at once, then every 100ms after holding for 500ms. */
const HOLD_DELAY_MS = 500;
const HOLD_INTERVAL_MS = 100;

type FieldConfig = {
  field: CalculatorField;
  label: string;
  format: (n: number) => string;
  /** Parses typed text; returns `null` to ignore the keystroke (percentages above 100). */
  parse: (raw: string) => number | null;
  step: number;
  /** Booking Rate's input text is purple. */
  accent?: boolean;
};

const percentParser = (raw: string) => {
  const n = parsePercent(raw);
  return n <= 100 ? n : null;
};

/**
 * Field setup of the two code components Framer ships for this page. Wide ("Ke", >=1220px) groups DMs with
 * commas, calls the price "Price" and steps DMs/price by 500 and booking rate by 1. Stacked ("et", tablet and
 * phone) shows DMs bare, calls the price "AOV" and steps DMs by 1, price by 100 and booking rate by 5.
 */
const WIDE_FIELDS: FieldConfig[] = [
  { field: "dms", label: "DMs Received", format: formatNumber, parse: parseGroupedNumber, step: 500 },
  { field: "aov", label: "Price", format: formatCurrency, parse: parseDollars, step: 500 },
  { field: "conversionRate", label: "Conversion Rate", format: formatPercent, parse: percentParser, step: 5 },
  { field: "showUpRate", label: "Show-Up Rate", format: formatPercent, parse: percentParser, step: 5 },
  { field: "bookingRate", label: "Booking Rate", format: formatPercent, parse: percentParser, step: 1, accent: true },
];
const STACKED_FIELDS: FieldConfig[] = [
  { field: "dms", label: "DMs Received", format: String, parse: parsePlainNumber, step: 1 },
  { field: "aov", label: "AOV", format: formatCurrency, parse: parseDollars, step: 100 },
  { field: "conversionRate", label: "Conversion Rate", format: formatPercent, parse: percentParser, step: 5 },
  { field: "showUpRate", label: "Show-Up Rate", format: formatPercent, parse: percentParser, step: 5 },
  { field: "bookingRate", label: "Booking Rate", format: formatPercent, parse: percentParser, step: 5, accent: true },
];

/**
 * Port of the Framer "Calculator" code components on /calculator. Both variants are rendered (the page hides
 * one per breakpoint, like Framer's `hidden-*` classes: wide from 1220px, stacked below) and share one state,
 * so resizing across the breakpoint keeps the numbers (Framer kept two independent states).
 */
export function Calculator() {
  const [values, setValues] = useState<CalculatorValues>(INITIAL_VALUES);
  const results = useMemo(() => computeResults(values), [values]);

  const setField = useCallback((field: CalculatorField, value: number) => setValues((v) => ({ ...v, [field]: value })), []);
  const stepField = useCallback(
    (field: CalculatorField, step: number, direction: StepperDirection) =>
      setValues((v) => ({ ...v, [field]: stepValue(field, v[field], step, direction) })),
    [],
  );

  return (
    <>
      <div className="hidden min-[1220px]:block">
        <section className="flex max-w-[1000px] gap-20 font-sans text-black font-normal leading-[normal]">
          <div className="flex w-[460px] flex-col">
            <FieldGrid fields={WIDE_FIELDS} values={values} setField={setField} stepField={stepField} />
          </div>
          <div className="flex gap-10">
            <ResultsPanel results={results} className="h-max w-[460px]" />
          </div>
        </section>
      </div>
      <div className="min-[1220px]:hidden">
        <section className="flex flex-col gap-20 font-sans text-black font-normal leading-[normal]">
          <FieldGrid fields={STACKED_FIELDS} values={values} setField={setField} stepField={stepField} />
          <ResultsPanel results={results} className="w-full" />
        </section>
      </div>
    </>
  );
}

/**
 * Framer "Input" grid: 2 columns, 16px gaps, Booking Rate spanning both. Cards are 89px tall (106px when a
 * phone-width label wraps to two lines).
 */
function FieldGrid({
  fields,
  values,
  setField,
  stepField,
}: {
  fields: FieldConfig[];
  values: CalculatorValues;
  setField: (field: CalculatorField, value: number) => void;
  stepField: (field: CalculatorField, step: number, direction: StepperDirection) => void;
}) {
  return (
    <div className="grid w-full grid-cols-2 gap-4">
      {fields.map(({ field, label, format, parse, step, accent }) => {
        const card = (
          <FieldCard
            key={field}
            label={label}
            value={format(values[field])}
            accent={accent}
            onType={(raw) => {
              const next = parse(raw);
              if (next !== null) setField(field, next);
            }}
            onStep={(direction) => stepField(field, step, direction)}
          />
        );
        return field === "bookingRate" ? (
          <div key={field} className="col-span-2">
            {card}
          </div>
        ) : (
          card
        );
      })}
    </div>
  );
}

/**
 * Framer "Input" card: white 20px-radius card with a hairline ring, a 24px "-" / "+" button pair pinned to
 * the bottom corners and the label over a centred 20px/500 text input between them. 20px padding.
 */
function FieldCard({
  label,
  value,
  accent,
  onType,
  onStep,
}: {
  label: string;
  value: string;
  accent?: boolean;
  onType: (raw: string) => void;
  onStep: (direction: StepperDirection) => void;
}) {
  return (
    <div className="flex overflow-hidden rounded-[20px] bg-white p-5" style={{ boxShadow: ringShadow }}>
      <StepButton label={`Decrease ${label}`} direction={-1} onStep={onStep}>
        <MinusIcon />
      </StepButton>
      <label className="flex w-full flex-col items-center justify-between gap-2 text-[14px]">
        <span className="text-center text-[#525252]">{label}</span>
        <input
          value={value}
          onChange={(e) => onType(e.target.value)}
          inputMode="numeric"
          autoComplete="off"
          // Framer's reset gives inputs `font-family: sans-serif` (they do not inherit Inter); kept as on the live site.
          className={`h-6 w-full min-w-0 [font-family:sans-serif] border-none bg-transparent text-center text-[20px] font-medium outline-none ${accent ? "text-purple-500" : "text-inherit"}`}
        />
      </label>
      <StepButton label={`Increase ${label}`} direction={1} onStep={onStep}>
        <PlusIcon />
      </StepButton>
    </div>
  );
}

/**
 * 24px round "-" / "+" button. Pressing steps once; holding repeats (500ms delay, then every 100ms) until the
 * pointer is released or leaves. Framer listened to mouse AND touch events, so a tap on a phone stepped twice;
 * pointer events step once. Keyboard activation (click without a pointer) steps once too.
 */
function StepButton({
  label,
  direction,
  onStep,
  children,
}: {
  label: string;
  direction: StepperDirection;
  onStep: (direction: StepperDirection) => void;
  children: ReactNode;
}) {
  const delay = useRef<ReturnType<typeof setTimeout> | null>(null);
  const repeat = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (delay.current) clearTimeout(delay.current);
    if (repeat.current) clearInterval(repeat.current);
    delay.current = null;
    repeat.current = null;
  }, []);
  useEffect(() => stop, [stop]);

  const start = () => {
    stop();
    onStep(direction);
    delay.current = setTimeout(() => {
      repeat.current = setInterval(() => onStep(direction), HOLD_INTERVAL_MS);
    }, HOLD_DELAY_MS);
  };

  return (
    <button
      type="button"
      aria-label={label}
      onPointerDown={(e) => {
        if (e.button === 0) start();
      }}
      onPointerUp={stop}
      onPointerLeave={stop}
      onPointerCancel={stop}
      onClick={(e) => {
        if (e.detail === 0) onStep(direction);
      }}
      className="mt-auto flex size-6 shrink-0 cursor-pointer touch-manipulation items-center justify-center rounded-full border-0 bg-[#F0F0F0] p-0 select-none"
    >
      {children}
    </button>
  );
}

const rows: { label: string; icon: ReactNode; value: (r: CalculatorResults) => string }[] = [
  { label: "Booked Calls", icon: <BookedCallsIcon />, value: (r) => formatNumber(r.bookedCalls) },
  { label: "Calls Taken", icon: <CallsTakenIcon />, value: (r) => formatNumber(r.callsTaken) },
  { label: "Sales Made", icon: <SalesMadeIcon />, value: (r) => formatNumber(r.sales) },
  { label: "Total Cash", icon: <TotalCashIcon />, value: (r) => formatCurrency(r.cash) },
];

/**
 * Framer results panel: white 28px-radius card (padding 12 12 12 24) with a label column (blue icon chips,
 * 56px rows, top margin 40px to clear the header) and a "With Mochi" column (40px gradient header, then four
 * 56px rows of 24px/32px numbers). 288px tall.
 */
function ResultsPanel({ results, className }: { results: CalculatorResults; className: string }) {
  return (
    <section className={`flex gap-4 rounded-[28px] bg-white py-3 pr-3 pl-6 ${className}`} style={{ boxShadow: ringShadow }}>
      <div className="mt-10 mr-4 flex min-w-0 flex-1 flex-col">
        {rows.map(({ label, icon }) => (
          <div key={label} className="flex h-14 min-w-0 items-center gap-2">
            <div className="flex size-6 shrink-0 items-center justify-center rounded-md bg-[#0086FF]">{icon}</div>
            <p className="m-0 min-w-0 overflow-hidden text-[16px] text-ellipsis whitespace-nowrap text-[#595959]">{label}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-[1_0_0%] gap-4">
        <div className="flex flex-1 flex-col overflow-hidden rounded-2xl" style={{ boxShadow: ringShadow }}>
          <div className="flex h-10 items-center justify-center bg-gradient-to-b from-[#C9E9FF] to-[#F7D1FF] text-[16px] font-medium text-black">
            <span>With Mochi</span>
          </div>
          {rows.map(({ label, value }) => (
            <div key={label} className="flex h-14 items-center justify-center">
              <span className="overflow-hidden px-2 text-center text-[24px] leading-8 font-medium text-ellipsis">{value(results)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
