"use client";

import { useEffect, useRef, useState } from "react";
import { copyText } from "./copy";

export const MCP_URL = "https://mcp.themochi.app/mcp/";

/**
 * Framer "Clipboard" button of the connect step 3: purple pill, DM Sans 500 (12px on tablet/desktop, 14px and full
 * width on phone). "Copy" cross-fades (250ms) to "Copied!" and back after two seconds.
 */
export function CopyUrlButton() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    if (!(await copyText(MCP_URL))) return;
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  const label = "col-start-1 row-start-1 whitespace-nowrap transition-opacity duration-[250ms] ease-linear";
  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      aria-label="Copy"
      className="inline-flex w-full cursor-pointer items-center justify-center rounded-[10px] bg-purple-500 px-3 py-2.5 font-dm text-[14px] leading-4 font-medium whitespace-nowrap text-white select-none md:w-auto md:py-1.5 md:text-[12px]"
    >
      <span className="grid place-items-center">
        <span className={`${label} ${copied ? "opacity-0" : "opacity-100"}`}>Copy</span>
        <span aria-hidden={!copied} className={`${label} ${copied ? "opacity-100" : "opacity-0"}`}>
          Copied!
        </span>
      </span>
    </button>
  );
}
