import type { Metadata } from "next";
import Script from "next/script";

const TITLE = "The Mochi App";
const DESCRIPTION =
  "Mochi gives your team one workspace to manage conversations, prioritize buyers, follow up faster, and see what is actually happening in your inbox.";
const PATH = "/schedule-your-call";

// Live renders this page client-side only and emits no canonical; we add one like every other page.
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: "website", url: PATH, title: TITLE, description: DESCRIPTION, images: [{ url: "/og-image.png", width: 3600, height: 1890 }] },
};

/**
 * Framer "Schedule your call" page: one HTML Embed (80% wide on tablet/desktop, full width on phone) holding the
 * LeadConnector (GoHighLevel) "Mochi Book A Call" booking widget, 900px minimum height. LeadConnector's
 * form_embed.js resizes the iframe to the widget's content, as it does inside Framer's embed.
 */
export default function ScheduleYourCallPage() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-full md:w-[80%]">
        <iframe
          src="https://api.leadconnectorhq.com/widget/booking/5947iPBXED9I5cpEKjdr"
          id="5947iPBXED9I5cpEKjdr_1782183860233"
          title="Mochi Book A Call"
          scrolling="no"
          className="block min-h-[900px] w-full overflow-hidden border-0"
        />
      </div>
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
    </div>
  );
}
