import { Reveal } from "@/components/ui/reveal";
import { COACH_REELS } from "@/components/pages/vsl/data";
import { reelHeadingText } from "@/components/pages/vsl/styles";
import { ReelPoster, reelFrameClassName } from "@/components/pages/vsl/users-section";

/**
 * Framer "Embed" HTML of each reel, rendered like Framer does (an iframe `srcdoc` whose body centres the content):
 * Instagram's blockquote embed in a 10px-radius black wrapper, with the iframe Instagram injects pulled up 140px under
 * the wrapper's bottom edge to crop the caption/footer bar.
 */
const reelDoc = (permalink: string) => `<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><style>
html, body { margin: 0; padding: 0; }
body { display: flex; justify-content: center; align-items: center; }
:root { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
* { box-sizing: border-box; -webkit-font-smoothing: inherit; }
body { font-size: 12px; font-family: sans-serif; }
.ig-reel-video-cropped { width: 100% !important; max-width: 676px; margin: 0 auto; border-radius: 10px; overflow: hidden !important; box-shadow: 0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15); background: #000; }
.ig-reel-video-cropped iframe { border-radius: 10px !important; border: 1px solid #dbdbdb !important; margin: 0 0 -140px 0 !important; vertical-align: bottom !important; }
</style></head><body>
<div class="ig-reel-video-cropped">
  <blockquote class="instagram-media" data-instgrm-permalink="${permalink}" data-instgrm-version="14" style="background:#FFF; border:0; margin:0; padding:0; width:100%;"></blockquote>
</div>
<script async src="https://www.instagram.com/embed.js"></script>
</body></html>`;

/** Phone order of the four reels (live swaps the last two on phone). */
const PHONE_ORDER = ["", "", "order-3 md:order-none", "order-2 md:order-none"];

/**
 * Framer "Reel Section" of /thank-you-pdf: "See how coaches use Mochi" (rose #e11d48, black on phone) over four
 * Instagram reel embeds, 16px apart, each in a `reelFrameClassName` frame with an 802px (488px on phone) embed.
 * Padding 48/100 (48/20/0 on phone), 600px column, title-to-reels gap 64/48/32. The title fades/slides in (y 48) and
 * the reels (y 72) when scrolled into view.
 */
export function CoachReels() {
  return (
    <section className="relative flex w-full flex-col items-start overflow-hidden">
      <div className="flex w-full flex-col items-center overflow-hidden px-5 pt-12 md:px-[100px] md:pb-12">
        <div className="flex w-full max-w-[600px] flex-col items-center gap-8 md:gap-12 lg:gap-16">
          <Reveal y={48} delay={0} className="flex w-full flex-col items-center">
            <h3 className={`w-full text-black md:text-[#e11d48] ${reelHeadingText}`}>See how coaches use Mochi</h3>
          </Reveal>
          <Reveal y={72} delay={0} className="flex w-full flex-col items-start gap-4">
            {COACH_REELS.map((permalink, i) => (
              <div key={permalink} className={`${reelFrameClassName} ${PHONE_ORDER[i]}`}>
                <ReelPoster sizes="(max-width: 809px) calc(100vw - 40px), 600px" />
                <div className="relative h-[488px] w-full md:h-[802px]">
                  <iframe title="Instagram reel" srcDoc={reelDoc(permalink)} loading="lazy" className="block h-full w-full border-none" />
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
