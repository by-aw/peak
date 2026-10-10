import type { UpdateBlock } from "@/lib/updates";
import { AudioPlayer } from "./audio-player";
import { StackButton } from "./stack-button";
import { interFeatures } from "./inter-features";

/** Turns the live site's absolute links to itself into site-relative paths. */
function localHref(href: string) {
  return href.replace(/^https?:\/\/themochi\.app(\/|$)/, "/").replace(/^\/$/, "/");
}

/**
 * Framer rich-text "modules" embedded in the prose: a full-width 16:9 YouTube iframe and the odd `<video>` block
 * (full width, intrinsic height). Phone-only spacing comes from the `phone-mt-8` class in globals.css.
 */
const embedStyles =
  "[&_.embed]:relative [&_.embed]:aspect-video [&_.embed]:w-full [&_.embed]:overflow-hidden [&_.embed_iframe]:absolute [&_.embed_iframe]:inset-0 [&_.embed_iframe]:h-full [&_.embed_iframe]:w-full [&_.embed_iframe]:border-0 [&_.embed-video_video]:block [&_.embed-video_video]:w-full";

/**
 * Framer "Blog Content": the rich-text containers ("Content 1".."Content N", styled by the
 * `.prose-update` block in globals.css), inline audio players and the closing "black small" CTA,
 * stacked 48px apart (40px on phone).
 */
export function PostBody({ blocks }: { blocks: UpdateBlock[] }) {
  return (
    <div className="flex w-full flex-col items-start gap-10 md:gap-12">
      {blocks.map((block, i) => {
        if (block.type === "html") return <div key={i} className={`prose-update w-full ${interFeatures} ${embedStyles}`} dangerouslySetInnerHTML={{ __html: block.html }} />;
        if (block.type === "audio") return <AudioPlayer key={i} src={block.src} duration={block.duration} bars={block.bars} />;
        return (
          <StackButton key={i} href={localHref(block.href)} target={block.target === "_blank" ? "_blank" : undefined} rel={block.target === "_blank" ? "noopener" : undefined}>
            {block.text}
          </StackButton>
        );
      })}
    </div>
  );
}
