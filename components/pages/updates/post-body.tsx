import type { UpdateBlock } from "@/lib/updates";
import { AudioPlayer } from "./audio-player";
import { StackButton } from "./stack-button";

/** Turns the live site's absolute links to itself into site-relative paths. */
function localHref(href: string) {
  return href.replace(/^https?:\/\/themochi\.app(\/|$)/, "/").replace(/^\/$/, "/");
}

/**
 * Framer "Blog Content": the rich-text containers ("Content 1".."Content N", styled by the
 * `.prose-update` block in globals.css), inline audio players and the closing "black small" CTA,
 * stacked 48px apart (40px on phone).
 */
export function PostBody({ blocks }: { blocks: UpdateBlock[] }) {
  return (
    <div className="flex w-full flex-col items-start gap-10 md:gap-12">
      {blocks.map((block, i) => {
        if (block.type === "html") return <div key={i} className="prose-update w-full" dangerouslySetInnerHTML={{ __html: block.html }} />;
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
