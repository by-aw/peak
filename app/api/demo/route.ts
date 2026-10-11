import { DEMO_FORMS, TRACKING_FIELDS, formFieldList, type FormId } from "@/components/pages/demo/config";

/**
 * Receives the /demo and /demo-jia multi-step form (components/pages/demo/demo-form.tsx), replacing Framer's
 * form store (live posts to https://api.framer.com/forms/v1/forms/a976c191-a5fe-404e-8b65-7f02dc12086e/submit,
 * which only Framer's dashboard can forward on). The payload is validated against the form's fields and options,
 * enriched with the lead's IP (for Meta CAPI-style matching, like live's broken `client_ip_address` input) and
 * POSTed as flat JSON to `DEMO_FORM_WEBHOOK_URL`. Without that env var (or when the webhook fails) the whole
 * lead is logged so it can be recovered from the server logs. `affiliate_ref` arrives as public/js/attribution.js
 * sets it on submit ("direct" when the visitor never landed with a ?ref=).
 */

const MAX_BODY_BYTES = 32 * 1024;
const MAX_TEXT = 2000;
const MAX_LINE = 300;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Lead = Record<string, string>;

function validate(body: unknown): { lead: Lead } | { error: string } {
  if (!body || typeof body !== "object" || Array.isArray(body)) return { error: "Expected a JSON object" };
  const input = body as Record<string, unknown>;
  const formId = input.form;
  if (formId !== "demo" && formId !== "demo-jia") return { error: "Unknown form" };
  const config = DEMO_FORMS[formId as FormId];

  const lead: Lead = { form: formId };
  for (const field of formFieldList(config)) {
    const raw = input[field.name];
    const value = typeof raw === "string" ? raw.trim() : "";
    const required = field.kind === "select" || field.required;
    if (!value) {
      if (required) return { error: `Missing ${field.name}` };
      lead[field.name] = "";
      continue;
    }
    if (field.kind === "select" && !field.options.some((o) => o.value === value)) return { error: `Invalid ${field.name}` };
    if (value.length > (field.kind === "textarea" ? MAX_TEXT : MAX_LINE)) return { error: `${field.name} is too long` };
    if (field.kind === "email" && !EMAIL.test(value)) return { error: "Invalid Email" };
    lead[field.name] = value;
  }
  for (const name of TRACKING_FIELDS) {
    const raw = input[name];
    lead[name] = typeof raw === "string" ? raw.trim().slice(0, name === "client_user_agent" || name === "page_url" ? MAX_TEXT : MAX_LINE) : "";
  }
  return { lead };
}

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) return Response.json({ ok: false, error: "Payload too large" }, { status: 413 });

  let body: unknown;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return Response.json({ ok: false, error: "Payload too large" }, { status: 413 });
    body = JSON.parse(text);
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const result = validate(body);
  if ("error" in result) return Response.json({ ok: false, error: result.error }, { status: 422 });

  const { lead } = result;
  const config = DEMO_FORMS[lead.form as FormId];
  const payload = {
    ...lead,
    qualified: lead.revenue === config.disqualifyRevenue ? "no" : "yes",
    client_ip_address: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "",
    client_user_agent: lead.client_user_agent || request.headers.get("user-agent") || "",
    submitted_at: new Date().toISOString(),
  };

  const webhook = process.env.DEMO_FORM_WEBHOOK_URL;
  if (!webhook) {
    console.info("[api/demo] DEMO_FORM_WEBHOOK_URL is not set; lead not forwarded", payload);
    return Response.json({ ok: true, forwarded: false });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (error) {
    console.error("[api/demo] forwarding the lead failed", String(error), payload);
    return Response.json({ ok: false, error: "Could not forward the submission" }, { status: 502 });
  }
  return Response.json({ ok: true, forwarded: true });
}
