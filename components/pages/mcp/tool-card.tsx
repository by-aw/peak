"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ToolPlusIcon } from "./icons";
import type { McpTool } from "./tools-data";

const EASE = [0.2, 0, 0, 1] as const;

/** Framer applies these Inter alternates to the tool cards; they change glyph widths enough to affect wrapping. */
const INTER_FEATURES = "[font-feature-settings:'blwf','cv03','cv04','cv09','cv11']";

/** Renders the `<em>` / `<code>` mini markup kept in the tool descriptions. */
function renderDescription(text: string): ReactNode[] {
  return text.split(/(<em>.*?<\/em>|<code>.*?<\/code>)/g).map((part, i) => {
    if (part.startsWith("<em>")) return <em key={i}>{part.slice(4, -5)}</em>;
    if (part.startsWith("<code>")) return <code key={i}>{part.slice(6, -7)}</code>;
    return part;
  });
}

/**
 * Framer "Desktop/Hide" <-> "Desktop/Show" tool card of the "Tools Section (old)": white 24px-radius card with a
 * 1px #e8e8e8 hairline, name + one-line summary + a plus badge; clicking the top reveals the full description
 * under a 0.5px rule (20px padding, 14px/21px #4c4c4f).
 */
export function ToolCard({ tool }: { tool: McpTool }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex w-full flex-col items-start overflow-clip rounded-[24px] bg-white after:pointer-events-none after:absolute after:inset-0 after:rounded-[24px] after:border after:border-[#e8e8e8]">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex w-full cursor-pointer items-start gap-1 overflow-clip p-5 text-left">
        <div className="flex min-w-0 flex-1 flex-col items-start gap-1 overflow-clip">
          <p className={`w-full text-[16px] leading-[19.2px] font-medium tracking-[-0.48px] whitespace-pre-wrap text-ink-3 [overflow-wrap:anywhere] ${INTER_FEATURES}`}>{tool.name}</p>
          <p className={`w-full text-[14px] leading-[20.3px] font-normal tracking-[-0.14px] whitespace-pre-wrap text-[#383840] ${INTER_FEATURES}`}>{tool.summary}</p>
        </div>
        <span className="flex size-6 shrink-0 items-center justify-center overflow-clip rounded-[6px] bg-[#f2f2f2]">
          <ToolPlusIcon className="size-[14px]" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="description"
            className="w-full overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <div className="w-full border-t-[0.5px] border-[#e8e8e8] p-5">
              <p className={`text-[14px] leading-[21px] font-normal tracking-[-0.28px] whitespace-pre-wrap text-[#4c4c4f] ${INTER_FEATURES}`}>{renderDescription(tool.description)}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
