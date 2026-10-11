import { interFeatures } from "@/components/shared/inter-features";
import { interVariable } from "./fonts";

/** Framer rich-text containers keep whitespace (`white-space: pre-wrap`) and break long words (`word-break: break-word`). */
const richText = `w-full whitespace-pre-wrap [word-break:break-word] ${interFeatures}`;

/**
 * Framer "Intro" rich-text field under the title: paragraphs of Inter Variable 14/20 (opsz 14, wght 450) in
 * #42424a, 20px apart. A `strong` here is not bold (the preset's bold weight is 400). Links are #09f, underlined.
 */
export function LegalIntro({ html }: { html: string }) {
  return (
    <div
      className={`${interVariable.variable} ${richText} [font-family:var(--font-inter-variable),var(--font-sans)] text-[14px] leading-[20px] font-normal tracking-normal text-gray-750 [font-variation-settings:'opsz'_14,'wght'_450] [&_a]:text-[#09f] [&_a]:underline [&_p:not(:first-child)]:mt-5 [&_strong]:font-normal`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/**
 * Framer rich-text field `#blog-content`, styled by its text presets. Phone / tablet / desktop:
 * - `h1`: Clash Display 700 44/56/64px, line-height 105%, +0.02em, centred, #1d1d20 (no top margin: it opens the body)
 * - `h2`: Clash Display 700 32/40/48px, line-height 115%, +0.02em, centred, #1d1d20, 40px above
 * - `h3`: Clash Display 600 24/32/40px, line-height 120%, black, 40px above
 * - `h4`: Clash Display 600 20/24/32px, line-height 120%, -0.02em, black, 40px above
 * - `p` / `li`: Inter 400 14/16/16px, line-height 145%, -0.01em, #383840; paragraphs, lists and list items sit 20px apart
 *   (a list's own items touch); `strong` is 700
 * - `a`: #a855f7, underlined 4px off the text (hover #bd83f4)
 * - `ul > li`: 2ch of start padding with a "•" pinned at the start edge (Framer draws its bullets the same way)
 * Only the tags the two entries use are styled (no `ol`, `blockquote`, images or tables).
 */
export function LegalBody({ html }: { html: string }) {
  return (
    <div
      id="blog-content"
      className={[
        richText,
        // paragraph preset (inherited by li)
        "font-sans text-[14px] leading-[145%] font-normal tracking-[-0.01em] text-[#383840] md:text-[16px]",
        // block spacing: Framer's `:not(:first-child)` paragraph spacing
        "[&_h2]:mt-10 [&_h3]:mt-10 [&_h4]:mt-10 [&_p]:mt-5 [&_ul]:mt-5 [&_*:first-child]:mt-0",
        // headings
        "[&_:is(h1,h2,h3,h4)]:font-display",
        "[&_h1]:text-center [&_h1]:text-[44px] [&_h1]:leading-[105%] [&_h1]:font-bold [&_h1]:tracking-[0.02em] [&_h1]:text-ink-3 md:[&_h1]:text-[56px] lg:[&_h1]:text-[64px]",
        "[&_h2]:text-center [&_h2]:text-[32px] [&_h2]:leading-[115%] [&_h2]:font-bold [&_h2]:tracking-[0.02em] [&_h2]:text-ink-3 md:[&_h2]:text-[40px] lg:[&_h2]:text-[48px]",
        "[&_h3]:text-[24px] [&_h3]:leading-[120%] [&_h3]:font-semibold [&_h3]:tracking-normal [&_h3]:text-black md:[&_h3]:text-[32px] lg:[&_h3]:text-[40px]",
        "[&_h4]:text-[20px] [&_h4]:leading-[120%] [&_h4]:font-semibold [&_h4]:tracking-[-0.02em] [&_h4]:text-black md:[&_h4]:text-[24px] lg:[&_h4]:text-[32px]",
        // inline
        "[&_strong]:font-bold",
        "[&_a]:text-purple-500 [&_a]:underline [&_a]:underline-offset-4 [&_a]:[text-decoration-skip-ink:none] [&_a:hover]:text-brand",
        // lists
        "[&_ul]:relative [&_li]:list-none [&_li]:pl-[2ch] [&_ul>li]:before:absolute [&_ul>li]:before:start-0 [&_ul>li]:before:content-['•']",
      ].join(" ")}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
