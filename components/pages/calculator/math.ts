/**
 * Maths, formatting and field rules of the /calculator code component (Framer module `XtzTYt…D9Xh9myD.mjs`,
 * components "Ke" (wide) and "et" (stacked)). Everything here is a straight port: same funnel, same rounding,
 * same parsing quirks (e.g. `parseInt` stops at the first non-digit, only the first "%" is stripped).
 */

export type CalculatorField = "dms" | "aov" | "conversionRate" | "showUpRate" | "bookingRate";
export type CalculatorValues = Record<CalculatorField, number>;

export const INITIAL_VALUES: CalculatorValues = { dms: 0, aov: 0, conversionRate: 0, showUpRate: 0, bookingRate: 0 };

/** Fields that are percentages: typed values above 100 are ignored, stepper buttons clamp to 0..100. */
export const PERCENT_FIELDS: readonly CalculatorField[] = ["conversionRate", "showUpRate", "bookingRate"];

export type CalculatorResults = { bookedCalls: number; callsTaken: number; sales: number; cash: number };

/** DMs -> booked calls (booking rate) -> calls taken (show-up rate) -> sales (conversion rate) -> cash (price). Each step rounds. */
export function computeResults({ dms, aov, conversionRate, showUpRate, bookingRate }: CalculatorValues): CalculatorResults {
  const bookedCalls = Math.round(dms * (bookingRate / 100));
  const callsTaken = Math.round(bookedCalls * (showUpRate / 100));
  const sales = Math.round(callsTaken * (conversionRate / 100));
  return { bookedCalls, callsTaken, sales, cash: Math.round(sales * aov) };
}

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 });
const grouped = new Intl.NumberFormat("en-US");

/** The live page patches `Intl.NumberFormat` so negative zero prints as "$0" / "0" (stock Chrome prints "-$0" / "-0"). */
const noNegativeZero = (n: number) => (n === 0 ? 0 : n);

/** "$1,234" */
export const formatCurrency = (n: number) => currency.format(noNegativeZero(n));
/** "1,234" */
export const formatNumber = (n: number) => grouped.format(noNegativeZero(n));
/** "15%" */
export const formatPercent = (n: number) => `${n}%`;

/** `parseInt(...) || 0` on the raw text of an input after removing the characters the field formats in. */
const toInt = (raw: string) => parseInt(raw) || 0;

/** DMs field of the wide variant: shown with thousands separators, so commas are stripped before parsing. */
export const parseGroupedNumber = (raw: string) => toInt(raw.replace(/,/g, ""));
/** DMs field of the stacked variant: plain `parseInt`. */
export const parsePlainNumber = toInt;
/** Price / AOV field: "$" and every "," are stripped. */
export const parseDollars = (raw: string) => toInt(raw.replace(/[$,]/g, ""));
/** Percent fields: the first "%" is stripped; the caller ignores results above 100. */
export const parsePercent = (raw: string) => toInt(raw.replace("%", ""));

export type StepperDirection = 1 | -1;

/**
 * Value after a +/- button press. Percentages clamp to 0..100, DMs and price only floor at 0. Matches the
 * component's `Math.min(v + step, 100)` / `Math.max(v - step, 0)` / `v + step` switch statements.
 */
export function stepValue(field: CalculatorField, current: number, step: number, direction: StepperDirection): number {
  if (direction === 1) return PERCENT_FIELDS.includes(field) ? Math.min(current + step, 100) : current + step;
  return Math.max(current - step, 0);
}
