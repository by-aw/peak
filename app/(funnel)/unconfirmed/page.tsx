import type { Metadata } from "next";
import Image from "next/image";

const TITLE = "The Mochi App";
const DESCRIPTION =
  "Mochi gives your team one workspace to manage conversations, prioritize buyers, follow up faster, and see what is actually happening in your inbox.";
const PATH = "/unconfirmed";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: "website", url: PATH, title: TITLE, description: DESCRIPTION, images: [{ url: "/og-image.png", width: 3600, height: 1890 }] },
};

/**
 * Framer "Unconfirmed" page: a 1080px-tall white page whose only layer is an HTML Embed ("mochi-status" markup in
 * the system font stack), centred: the 48px mochi logo, a 56px #f3e8ff circle with a purple "!", "We're Sorry"
 * (24px/800), the message (16px/1.6, #444, 360px max) and a 48x4 #9333ea accent bar.
 */
export default function UnconfirmedPage() {
  return (
    <div className="flex h-[1080px] w-full flex-col items-center">
      <div className="flex w-full flex-1 flex-col items-center justify-center">
        <div className="w-auto max-w-full overflow-x-hidden bg-white font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,Helvetica,Arial,sans-serif] text-[12px] leading-[normal] font-normal text-[#111]">
          <div className="mx-auto flex max-w-[480px] flex-col items-center justify-center px-7 py-[60px] text-center">
            {/* Inline in a 12px line box, as in the embed, so the logo row keeps its descender gap. */}
            <div>
              <Image src="/framer/unconfirmed-mochi-logo.avif" alt="Mochi" width={164} height={140} unoptimized className="mb-9 inline h-12 w-auto align-baseline" />
            </div>
            <div className="mb-6 flex size-14 items-center justify-center rounded-full bg-purple-100 text-[28px] font-extrabold text-purple-600">!</div>
            <h1 className="mb-3.5 text-[24px] leading-[normal] font-extrabold text-[#111]">We&apos;re Sorry</h1>
            <p className="max-w-[360px] text-[16px] leading-[1.6] font-normal text-[#444]">
              Your business doesn&apos;t quite qualify to work with us just yet. Please feel free to reach back out and try again in the future.
            </p>
            <div className="my-6 h-1 w-12 rounded-[4px] bg-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
