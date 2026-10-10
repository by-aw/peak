import type { FaqEntry, LabelItem } from "@/components/shared/attribution";

export const LABELS: LabelItem[] = [
  { title: "Works everywhere.", description: "ClickFunnels, Kajabi, Webflow, WordPress, Squarespace, Shopify, custom sites." },
  { title: "Auto-captures emails.", description: "When a visitor submits any form on a page with the pixel, we grab the email." },
  { title: "Stitches the journey.", description: "Click → page visit → form → call booked. One continuous thread per lead." },
];

export const SUMMARY =
  "You are told to connect every tool individually. Typeform to Zapier to their CRM to Stripe. They end up with a Frankenstein stack that breaks every week, costs $200/month in middleware, and still can’t tell them which landing page converts best. The Mochi pixel replaces all of that with one line of code. It doesn’t need to know what form builder you use, what payment processor you have, or how your funnel is structured. It watches the page and captures what happens. That’s it.";

export const FAQ: FaqEntry[] = [
  {
    question: "Is it the same pixel for every page?",
    answer:
      "Yes. One snippet per organization. Paste the same code on your VSL page, your application form, your Stripe thank-you page — everywhere you want to track. The pixel identifies which page it's on automatically via the URL.",
  },
  {
    question: "Will it slow down my site?",
    answer: "No. The script is under 1KB, loads asynchronously, and fires after the page renders. It has zero impact on page speed or Core Web Vitals.",
  },
  {
    question: "Does it capture data from embedded Typeforms?",
    answer:
      "Yes, if the form is embedded on your page. For hosted forms on Typeform's own domain, the pixel can't see the submission directly. In that case, use the redirect method: set Typeform's thank-you redirect to a page with the pixel installed.",
  },
  {
    question: "What about Calendly?",
    answer:
      "If you embed Calendly on your own page with the pixel, we'll track the booking confirmation. If you send leads directly to calendly.com, put the pixel on your confirmation/thank-you page that Calendly redirects to after booking.",
  },
  {
    question: "Do I need to update the pixel when you add features?",
    answer:
      "No. The snippet loads a hosted JavaScript file from our servers. When we add new tracking capabilities (like scroll depth or time on page), every pixel gets the update automatically on next page load. No reinstall needed.",
  },
  {
    question: "How does email capture work?",
    answer:
      "When a visitor submits any form on a page with the pixel, we scan the form fields for anything that looks like an email input (by field name, type, or pattern). We capture the email and associate it with the visitor's session. No form-specific configuration needed.",
  },
];
