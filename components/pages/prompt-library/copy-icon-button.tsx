"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ClipboardIcon } from "./icons";
import { copyText } from "./copy";

/**
 * Framer "Copy to Clipboard" code component on every prompt card: a 20px white chip with a hairline border and a
 * grey clipboard glyph (circle on the first card of each category, 4px radius on the others). Hover scales it to
 * 1.05 (120ms). Clicking copies `text` and shows a purple "Prompt Copied!" toast fixed 40px above the bottom of
 * the screen for two seconds (fades/slides in over the first 12% and out over the last 12%).
 */
export function CopyIconButton({ text, round = false }: { text: string; round?: boolean }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = async () => {
    if (!(await copyText(text))) return;
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative inline-flex flex-none overflow-visible">
      <button
        type="button"
        aria-label="Copy to Clipboard"
        title="Copy to Clipboard"
        onClick={copy}
        className={`box-border inline-flex size-5 cursor-pointer items-center justify-center border border-gray-150 bg-white p-0 transition-[transform,background-color] duration-[120ms] ease-in-out hover:scale-105 ${round ? "rounded-[100px]" : "rounded-[4px]"}`}
      >
        <ClipboardIcon />
      </button>
      {copied
        ? createPortal(
            <div
              role="status"
              className="pointer-events-none fixed bottom-10 left-1/2 z-[2147483647] rounded-[14px] bg-purple-600 px-[19.2px] py-3 text-[14px] leading-none font-normal whitespace-nowrap text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
              style={{ animation: "plCopyToast 2000ms ease forwards" }}
            >
              Prompt Copied!
              <style>{`@keyframes plCopyToast{0%{opacity:0;transform:translate(-50%,16px)}12%{opacity:1;transform:translate(-50%,0)}88%{opacity:1;transform:translate(-50%,0)}100%{opacity:0;transform:translate(-50%,16px)}}`}</style>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
