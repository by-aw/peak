"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { WistiaCard } from "@/components/funnel/wistia-card";
import { LineReveal } from "@/components/shared/line-reveal";
import { StackButton } from "@/components/shared/stack-button";
import { Reveal } from "@/components/ui/reveal";
import { CalendlyEmbed } from "./calendly-embed";
import { DEMO_FORMS, INTER_FEATURES, STEP2_FIELDS, TRACKING_FIELDS, URL_PREFILL, type FormId, type TextField } from "./config";
import { CommentControl, FieldControl, FieldLabel, RESIZER_CSS, TextControl } from "./fields";

type Step = "details" | "contact" | "calendly" | "ineligible";

/** Framer appear effect on the form headings: opacity 0 / y 25 to rest, spring bounce 0.2 over 0.6s, once in view. */
const HEADING_APPEAR = { y: 25, transition: { type: "spring", bounce: 0.2, duration: 0.6 }, viewport: { once: true, amount: 0 } } as const;

/** Framer text style "6a7cbe": Clash Display 600, 30/36 +0.6px (24/32 +0.48px on phone), #1d1d20, centred here. */
const HEADING = "text-center font-display text-[24px] leading-8 font-semibold tracking-[0.48px] text-ink-3 md:text-[30px] md:leading-9 md:tracking-[0.6px]";
/**
 * Framer text style "15jfnoy" (Inter Variable at weight 450, 14/20), recoloured #686a75. Approximated with Inter 400
 * plus 0.095px tracking, which makes lines as wide as the 450 weight so they wrap at the same words.
 */
const DESCRIPTION = `w-full text-center font-sans text-[14px] leading-5 font-normal tracking-[0.095px] text-gray-550 ${INTER_FEATURES}`;
const DIVIDER = "h-px shrink-0 rounded-full bg-gray-150";

const readCookie = (name: string) =>
  document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${name}=`))
    ?.slice(name.length + 1) ?? "";

/**
 * Framer "Multi-Step Form" of /demo and /demo-jia (Framer Forms by Samyadeep, posting to Framer's form store),
 * rebuilt on a native form so the site-wide scripts that watch submit events (attribution.js, Hyros, PostHog)
 * keep working. Pages, in Framer's order:
 *   1. "details": qualification selects/inputs (Continue validates them, Enter in a field does the same);
 *   2. "contact": name, email, phone (+ Instagram on /demo-jia), optional comment, Submit;
 *   3. "calendly": the Calendly event prefilled with name and email;
 *   4. "ineligible": "Hey {First} you're a bit early" with a video (/demo) or mascot (/demo-jia).
 * Submit posts every field plus the hidden attribution inputs to /api/demo and, 300ms later (as live, where an
 * override clicks a hidden "Next" button), shows page 4 when `revenue` is the lowest bracket, otherwise page 3.
 * The pages sit in a 20px-padded form inside an 840px column; steps 1-2 and the jia outcome are 392px wide.
 */
export function DemoForm({ formId }: { formId: FormId }) {
  const config = DEMO_FORMS[formId];
  const formRef = useRef<HTMLFormElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<Step>("details");
  const [submitting, setSubmitting] = useState(false);
  const [lead, setLead] = useState({ first: "", name: "", email: "" });

  // Framer "Pre-fill Form Inputs": hidden attribution fields from the landing URL.
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const params = new URLSearchParams(window.location.search);
    for (const { name, param } of URL_PREFILL) {
      const value = params.get(param);
      const input = form.elements.namedItem(name);
      if (value && input instanceof HTMLInputElement) input.value = value;
    }
  }, []);

  const goToContact = () => {
    const page = detailsRef.current;
    if (!page) return;
    const invalid = Array.from(page.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea")).find(
      (el) => !el.checkValidity(),
    );
    if (invalid) {
      invalid.reportValidity();
      return;
    }
    setStep("contact");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key !== "Enter" || step !== "details" || e.target instanceof HTMLTextAreaElement) return;
    e.preventDefault();
    goToContact();
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    const form = e.currentTarget;
    // Framer's form overrides fill these from the Meta pixel and Dub cookies and the browser.
    const setIfEmpty = (name: string, value: string) => {
      const input = form.elements.namedItem(name);
      if (input instanceof HTMLInputElement && !input.value && value) input.value = value;
    };
    setIfEmpty("fbp", readCookie("_fbp"));
    setIfEmpty("dub_link_id", decodeURIComponent(readCookie("dub_id")));
    setIfEmpty("client_user_agent", navigator.userAgent);
    setIfEmpty("page_url", window.location.href);

    const payload: Record<string, string> = { form: config.id };
    for (const [key, value] of new FormData(form)) if (typeof value === "string") payload[key] = value;

    setSubmitting(true);
    fetch("/api/demo", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), keepalive: true }).catch(
      () => {},
    );
    setLead({ first: payload.First ?? "", name: `${payload.First ?? ""} ${payload.Last ?? ""}`.trim(), email: payload.Email ?? "" });
    window.setTimeout(() => {
      setStep(payload.revenue === config.disqualifyRevenue ? "ineligible" : "calendly");
      setSubmitting(false);
    }, 300);
  };

  const s2 = config.step2;
  const inputVariant = s2.compactInputs ? "step2Compact" : "step2";
  const phone: TextField = { kind: "tel", name: "Phone", label: s2.phoneLabel, placeholder: "+971 123 456 789", required: true };
  const show = (s: Step) => (step === s ? "flex" : "hidden");

  return (
    <form ref={formRef} onSubmit={onSubmit} onKeyDown={onKeyDown} className="relative flex w-full flex-col items-start gap-5 p-5">
      <style>{RESIZER_CSS}</style>
      {/* No value props: for hidden inputs `.value` is the value attribute, which React would reset on every render. */}
      {TRACKING_FIELDS.map((name) => (
        <input key={name} type="hidden" name={name} />
      ))}

      <div className="flex w-full flex-col items-center">
        {/* Page 1: qualification */}
        <div ref={detailsRef} className={`${show("details")} w-full max-w-[392px] flex-col items-center gap-8`}>
          <div className="flex w-full max-w-[344px] flex-col items-center gap-4">
            <Reveal {...HEADING_APPEAR} className="w-full max-w-[278px] md:max-w-none">
              <h2 className={HEADING}>{config.step1.heading}</h2>
            </Reveal>
            {config.step1.description && <LineReveal text={config.step1.description} className={DESCRIPTION} />}
          </div>
          <div className={`${DIVIDER} w-full`} />
          <div className="flex w-full flex-col items-center gap-6">
            {config.step1.fields.map((field) => (
              <FieldLabel key={field.name} label={field.label}>
                <FieldControl field={field} />
              </FieldLabel>
            ))}
          </div>
          <button
            type="button"
            onClick={goToContact}
            className="relative flex w-full cursor-pointer flex-col items-center gap-2.5 overflow-hidden rounded-[10px] bg-black px-2.5 py-3.5 text-center font-sans text-[14px] leading-[18px] font-normal text-white outline-none after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border after:border-[rgba(136,136,136,0.1)] after:content-['']"
          >
            <span className="min-h-[1lh] w-full">Continue</span>
          </button>
        </div>

        {/* Page 2: contact details */}
        <div className={`${show("contact")} w-full max-w-[392px] flex-col items-center gap-12`}>
          <div className="flex w-full max-w-[344px] flex-col items-center gap-4">
            <Reveal {...HEADING_APPEAR} className="w-full">
              <h2 className={HEADING}>{s2.heading}</h2>
            </Reveal>
            {s2.description && <LineReveal text={s2.description} className={DESCRIPTION} />}
          </div>
          <div className={`${DIVIDER} w-[344px] max-w-full`} />
          <div className="flex w-full flex-col items-center gap-8">
            <div className="flex w-full flex-col items-center gap-6">
              <div className={`flex w-full ${s2.nameGap === "24" ? "gap-6" : "gap-3"}`}>
                {[STEP2_FIELDS.First, STEP2_FIELDS.Last].map((field) => (
                  <div key={field.name} className="min-w-0 flex-1">
                    <FieldLabel label={field.label}>
                      <TextControl field={field} variant={inputVariant} />
                    </FieldLabel>
                  </div>
                ))}
              </div>
              {[STEP2_FIELDS.Email, phone, ...s2.extraFields].map((field) => (
                <FieldLabel key={field.name} label={field.label}>
                  <TextControl field={field} variant={inputVariant} />
                </FieldLabel>
              ))}
              <FieldLabel label={STEP2_FIELDS.Comment.label} optional>
                <CommentControl field={STEP2_FIELDS.Comment} />
              </FieldLabel>
            </div>
            <SubmitButton loading={submitting} />
          </div>
        </div>

        {/* Page 3: Calendly */}
        {step === "calendly" && (
          <div className="flex w-full flex-col items-center gap-12">
            <CalendlyEmbed url={config.calendlyUrl} name={lead.name} email={lead.email} />
          </div>
        )}

        {/* Page 4: not qualified yet */}
        {step === "ineligible" && <Ineligible formId={formId} first={lead.first} />}
      </div>
    </form>
  );
}

/**
 * Framer "Submit Button" component: #333, 10px radius, 46px, Inter 600 14px white; hover fades the fill to 85%
 * (0.2s). While the lead is being sent it shows Framer's 20px spinning ring instead of the label.
 */
function SubmitButton({ loading }: { loading: boolean }) {
  return (
    <button
      type="submit"
      aria-busy={loading}
      className="relative z-[1] flex h-[46px] w-full cursor-pointer items-center justify-center rounded-[10px] bg-[#333] transition-colors duration-200 hover:bg-[rgba(51,51,51,0.85)]"
    >
      {loading ? (
        <span
          aria-label="Sending"
          className="size-5 animate-spin rounded-full bg-[conic-gradient(from_0deg,rgba(255,255,255,0)_7.2deg,#fff_342deg)] [mask:radial-gradient(farthest-side,transparent_calc(100%-2px),#000_calc(100%-2px))]"
        />
      ) : (
        <span className="font-sans text-[14px] leading-[1.2] font-semibold text-white select-none">Submit</span>
      )}
    </button>
  );
}

/**
 * "You're A Bit Too Early" (Wistia), the video of the /demo "you're a bit early" screen: a card 432px tall (450 on
 * tablet, 219 on phone), 20px radius (16px on phone).
 */
const EARLY_VIDEO = {
  mediaId: "65mhljex5p",
  thumb: "fde599cb4cfb8c6c3d2528ca7637c1a3",
  title: "You're A Bit Too Early",
  sizes: "(min-width: 810px) 800px, 100vw",
  className: "h-[219px] rounded-[16px] md:h-[450px] md:rounded-[20px] lg:h-[432px]",
};

/**
 * "You're a bit early" page. /demo: the Wistia card in a #fafafa, #f2f2f2-bordered 24px-radius frame, heading and
 * copy (Inter 14px, 1.2em / 1.3em on phone) under it, then "Contact us on WhatsApp" (264px max). /demo-jia: the
 * 170px sad-mochi image, heading, copy (14/20) and "Follow us on instagram" (210px max), in a 392px column.
 * The heading greets the lead by first name ("guest" when empty) like Framer Forms' "Input Value" text.
 */
function Ineligible({ formId, first }: { formId: FormId; first: string }) {
  const { ineligible } = DEMO_FORMS[formId];
  const heading = (
    <Reveal {...HEADING_APPEAR} className="w-full">
      <h1 className="text-center font-display text-[30px] leading-9 font-semibold tracking-[0.6px] whitespace-pre-wrap text-[#333]">
        {`Hey ${first.trim() || "guest"} you're a bit early`}
      </h1>
    </Reveal>
  );
  const button = (
    <div className={`w-full ${ineligible.button.size === "large" ? "max-w-[264px]" : "max-w-[210px]"}`}>
      <StackButton hover="roll" size={ineligible.button.size} href={ineligible.button.href} target="_blank" rel="noopener" block>
        {ineligible.button.label}
      </StackButton>
    </div>
  );

  if (ineligible.media === "video") {
    return (
      <div className="flex w-full flex-col items-center gap-12">
        <div className="flex w-full flex-col items-center gap-6">
          <div className="relative w-full overflow-hidden rounded-[24px] bg-gray-25 after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border after:border-[#f2f2f2] after:content-['']">
            <WistiaCard {...EARLY_VIDEO} />
          </div>
          <div className="flex w-full max-w-[344px] flex-col items-center gap-4">
            {heading}
            <LineReveal
              text={ineligible.paragraph}
              className={`w-full text-center font-sans text-[14px] leading-[1.3em] font-normal text-gray-550 md:leading-[1.2em] ${INTER_FEATURES}`}
            />
          </div>
        </div>
        {button}
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-[392px] flex-col items-center gap-12">
      <Image src="/framer/qseGDkCjfcbpelHcG6VM9Uw9XA0.png" alt="" width={170} height={170} className="size-[170px]" />
      <div className="flex w-full max-w-[344px] flex-col items-center gap-4">
        {heading}
        <LineReveal text={ineligible.paragraph} className={DESCRIPTION} />
      </div>
      {button}
    </div>
  );
}
