/**
 * Field definitions of the two Framer "Multi-Step Form" funnels (/demo and /demo-jia), shared by the
 * client form (components/pages/demo/demo-form.tsx) and the route handler (app/api/demo/route.ts) that
 * replaces Framer's form backend. Field `name`s and option `value`s are the live Framer ones verbatim
 * (including spaces and the invisible U+2060 word joiners some live option values start with), so the
 * payload keeps the shape whatever consumed Framer's form webhook expects.
 */

export type SelectField = {
  kind: "select";
  name: string;
  label: string;
  placeholder: string;
  options: { label: string; value: string }[];
  /** Framer gives a few long labels a wrapping text box instead of a single `white-space: pre` line. */
  wrapLabel?: boolean;
};

export type TextField = {
  kind: "text" | "email" | "tel" | "textarea";
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
};

export type Field = SelectField | TextField;

export type FormId = "demo" | "demo-jia";

export type DemoFormConfig = {
  id: FormId;
  step1: { heading: string; description?: string; fields: Field[] };
  step2: {
    heading: string;
    description?: string;
    /** Inputs after Email/Phone (demo-jia asks for the Instagram account here). */
    extraFields: TextField[];
    phoneLabel: string;
    /** Framer "Form Wrapper" first/last name row gap (12px on /demo, 24px on /demo-jia). */
    nameGap: "12" | "24";
    /** Text input height: auto (44px) on /demo, fixed 40px on /demo-jia. */
    compactInputs: boolean;
  };
  /** Leads whose `revenue` equals this value land on the "you're a bit early" page; everyone else gets Calendly. */
  disqualifyRevenue: string;
  /** Calendly event (react-calendly InlineWidget inside Framer Forms' "Super Calendly" component). */
  calendlyUrl: string;
  ineligible: {
    paragraph: string;
    /** /demo: Wistia video card; /demo-jia: 170px mascot image. */
    media: "video" | "image";
    button: { label: string; href: string; size: "large" | "small" };
  };
};

/** Hidden inputs filled from the landing URL (Framer "Pre-fill Form Inputs": input name -> URL parameter). */
export const URL_PREFILL: { name: string; param: string }[] = [
  { name: "affiliate_ref", param: "ref" },
  { name: "utm_source", param: "utm_source" },
  { name: "utm_medium", param: "utm_medium" },
  { name: "utm_campaign", param: "utm_campaign" },
  { name: "utm_content", param: "utm_content" },
  { name: "utm_term", param: "utm_term" },
  { name: "dub_link_id", param: "dub_link_id" },
  { name: "fbclid", param: "fbclid" },
  { name: "vsl_watched", param: "vsl_watched" },
  // Live names this hidden input `setter`, which collides with the "How many appointment setters" select.
  { name: "setter_ref", param: "s" },
];

/** Every hidden tracking field the form posts (URL prefill plus the cookie / user-agent ones). */
export const TRACKING_FIELDS = [...URL_PREFILL.map((p) => p.name), "fbp", "client_user_agent", "page_url"] as const;

const step2Shared = {
  First: { kind: "text", name: "First", label: "First Name", placeholder: "John", required: true },
  Last: { kind: "text", name: "Last", label: "Last Name", placeholder: "Doe", required: true },
  Email: { kind: "email", name: "Email", label: "Email", placeholder: "your@email.com", required: true },
  Comment: { kind: "textarea", name: "Comment", label: "Comment", placeholder: "Questions or anything to share?", required: false },
} as const satisfies Record<string, TextField>;

export const STEP2_FIELDS = step2Shared;

const opts = (pairs: [string, string][]) => pairs.map(([label, value]) => ({ label, value }));

export const DEMO_FORM: DemoFormConfig = {
  id: "demo",
  step1: {
    heading: "Ready to see if Mochi fits your backend?",
    description: "Answer a few quick questions so we can understand your DM setup and see if Mochi makes sense for your business.",
    fields: [
      {
        kind: "select",
        name: "revenue",
        label: "What is your current monthly revenue?",
        placeholder: "Choose Amount",
        options: opts([
          ["Under $10K/month", "<$10K"],
          ["$10K - $30K/month", "$10K-30K"],
          ["$30K - $50K/month", "$30K-$50K"],
          ["$50K - $100K/month", "$50K-$100K"],
          ["$100K - $200K/month", "$100K-$200K"],
          ["$250k+/month", "$250k+"],
        ]),
      },
      {
        kind: "select",
        name: "dm",
        label: "Monthly Instagram DM Volume",
        placeholder: "Select Volume",
        options: opts([
          ["Under 100 DMs/month", "Under 100 DMs/month"],
          ["100–300 DMs/month", "100–300 DMs/month"],
          ["⁠300–1,000 DMs/month", "⁠300–1,000 DMs/month"],
          ["1,000+ DMs/month", "1,000+ DMs/month"],
          ["⁠Not sure yet", "⁠Not sure yet"],
        ]),
      },
      {
        kind: "select",
        name: "setter",
        label: "How many appointment setters do you currently have?",
        placeholder: "Select Amount of Setters",
        options: opts([
          ["⁠I handle DMs myself", "⁠I handle DMs myself"],
          ["1 setter", "1 setter"],
          ["2–3 setters", "2–3 setters"],
          ["4–5 setters", "4–5 setters"],
          ["⁠6+ setters", "⁠6+ setters"],
          ["Nobody properly handles DMs right now", "Nobody properly handles DMs right now"],
        ]),
      },
      { kind: "text", name: "Instagram", label: "What is the Instagram account where you want Mochi installed?", placeholder: "Your Instagram @", required: true },
      {
        kind: "textarea",
        name: "mochi one thing",
        label: "If Mochi could fix one thing inside your DM backend, what would make it a no-brainer for you?",
        placeholder:
          "Example: more qualified booked calls, better setter follow-up, clearer reporting, knowing which content converts, or less manual work.",
        required: true,
      },
    ],
  },
  step2: { heading: "Contact Details", extraFields: [], phoneLabel: "WhatsApp / phone number", nameGap: "12", compactInputs: false },
  disqualifyRevenue: "<$10K",
  calendlyUrl: "https://calendly.com/d/cwph-bbc-m6h/mochi-intro-call?utm_source=site",
  ineligible: {
    paragraph:
      "Mochi is built for coaches that are ready to scale. You're not quite there yet. Once you have more DM volume, a larger team size or more revenue, please reach out again.",
    media: "video",
    button: { label: "Contact us on WhatsApp", href: "http://wa.me/+447474144211", size: "large" },
  },
};

export const DEMO_JIA_FORM: DemoFormConfig = {
  id: "demo-jia",
  step1: {
    heading: "Ready to book your demo call?",
    fields: [
      {
        kind: "select",
        name: "revenue",
        label: "Monthly Revenue",
        placeholder: "Choose Amount",
        options: opts([
          ["< $15K", "<$15K"],
          ["$15K - $50K", "$15K-50K"],
          ["$50K - $100K", "$50K-$100K"],
          ["$100K+", "$100K+"],
        ]),
      },
      {
        kind: "select",
        name: "dm",
        label: "Monthly DM Volume",
        placeholder: "Select Volume",
        options: opts([
          ["< 300 DMs (10/day)", "<300"],
          ["300-750 DMs (10-25/day)", "300-750"],
          ["750-1500 DMs (25-50/day)", "750-1500"],
          ["1500+ DMs", "1500+"],
        ]),
      },
      {
        kind: "select",
        name: "funnel",
        label: "How do you currently generate sales calls?",
        placeholder: "Select Funnel",
        options: opts(
          ["Low Ticket Funnel", "DM Funnel", "DM to Setter Funnel", "VSL Funnel", "Webinar Funnel", "Challenge Funnel", "Event Funnel"].map((v) => [v, v]),
        ),
      },
      {
        kind: "select",
        name: "Role",
        label: "What's your role in the business?",
        placeholder: "Select Role",
        options: opts(["Founder", "Manager", "Growth Operator", "Agency"].map((v) => [v, v])),
      },
      {
        kind: "select",
        name: "dfy invest",
        label:
          "If it turns out that Mochi is a solution that can substantially increase your revenue, will you be able to invest in this premium done-for-you DM management solution with a dedicated team?",
        placeholder: "Select one",
        options: opts(["Yes", "Maybe", "No"].map((v) => [v, v])),
        wrapLabel: true,
      },
    ],
  },
  step2: {
    heading: "Tell us more about yourself",
    description: "A Few More Details Before We Start",
    extraFields: [{ kind: "text", name: "Instagram", label: "Instagram Account", placeholder: "@ themochiapp", required: true }],
    phoneLabel: "Phone Number",
    nameGap: "24",
    compactInputs: true,
  },
  disqualifyRevenue: "<$15K",
  // Live points at this event; Calendly answers "This Calendly URL is not valid." for it (Oct 2026).
  calendlyUrl: "https://calendly.com/mochi-jia/intro",
  ineligible: {
    paragraph:
      "Mochi is built for coaches that are ready to scale. You're not quite there yet.\nOnce you have more DM volume, a larger team size or more revenue, please reach out again.",
    media: "image",
    button: { label: "Follow us on instagram", href: "https://instagram.com/themochi.app", size: "small" },
  },
};

export const DEMO_FORMS: Record<FormId, DemoFormConfig> = { demo: DEMO_FORM, "demo-jia": DEMO_JIA_FORM };

/** All named inputs a form posts besides the tracking ones: step 1, then step 2 in page order. */
export function formFieldList(config: DemoFormConfig): Field[] {
  const s = STEP2_FIELDS;
  const phone: TextField = { kind: "tel", name: "Phone", label: config.step2.phoneLabel, placeholder: "+971 123 456 789", required: true };
  return [...config.step1.fields, s.First, s.Last, s.Email, phone, ...config.step2.extraFields, s.Comment];
}

/** Label typography shared by every field label (Framer text style "h69mr": Inter 500 14/20, #42424a, Inter cv features). */
export const INTER_FEATURES = "[font-feature-settings:'blwf','cv03','cv04','cv09','cv11']";
