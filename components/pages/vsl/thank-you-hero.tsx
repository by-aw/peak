import { Reveal } from "@/components/ui/reveal";
import { PdfAnimation } from "@/components/pages/vsl/pdf-animation";
import { heroHeadingText, leadText } from "@/components/pages/vsl/styles";

/**
 * Framer "Hero Section" of /thank-you-pdf: "Thank you for downloading the PDF" (h1 preset, 768px column) and
 * "It should arrive within 5 minutes in your inbox" (lead preset, #42424a, 610px max), both appearing on load
 * (fade + 48px slide, delay 0.2s), over the 310x420 `PdfAnimation`. Same wrapper padding as the /vsl hero; 16px
 * between the two lines (32px tablet, 28px phone) and 48px above the animation.
 */
export function ThankYouHero() {
  return (
    <section className="relative flex w-full items-center justify-center overflow-clip">
      <div className="flex w-full flex-1 flex-col items-center px-5 pt-16 md:px-12 md:pt-20 md:pb-16 lg:px-[100px] lg:pt-16 lg:pb-0">
        <div className="relative z-[2] flex w-full max-w-[1200px] flex-col items-center gap-12">
          <div className="flex w-full max-w-[768px] flex-col items-center gap-7 md:gap-8 lg:gap-4">
            <Reveal delay={0.2} className="w-full">
              <h1 className={`w-full ${heroHeadingText}`}>Thank you for downloading the PDF</h1>
            </Reveal>
            <Reveal delay={0.2} className="w-full max-w-[610px]">
              <p className={`w-full text-center text-gray-750 ${leadText}`}>It should arrive within 5 minutes in your inbox</p>
            </Reveal>
          </div>
          <PdfAnimation />
        </div>
      </div>
    </section>
  );
}
