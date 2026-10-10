"use client";

import { useEffect, useState } from "react";

const MCP_URL = "https://mcp.themochi.app/mcp/";

/**
 * Framer "Box" of step 3: the MCP server URL in DM Mono on a #faf5ff pill with a purple "Copy" button that
 * swaps to "Copied!" for two seconds after copying. Stacked (full-width button) on phones.
 */
export function CopyUrlBox() {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);
  const copy = () => {
    navigator.clipboard?.writeText(MCP_URL).catch(() => {});
    setCopied(true);
  };
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-[14px] bg-[#faf5ff] p-3">
      <div className="flex w-full flex-col items-start gap-4 md:flex-row md:items-center md:justify-between md:gap-0">
        <p className="font-dm-mono text-[14px] leading-5 font-normal whitespace-pre text-purple-500">{MCP_URL}</p>
        <button
          type="button"
          onClick={copy}
          aria-live="polite"
          aria-label="Copy"
          className="inline-flex w-full cursor-pointer items-center justify-center rounded-[10px] bg-purple-500 px-3 py-2.5 text-white md:w-auto md:py-1.5"
        >
          <span className="grid font-dm text-[14px] leading-4 font-medium whitespace-nowrap md:text-[12px]">
            <span aria-hidden={copied} className={`col-start-1 row-start-1 text-center ${copied ? "opacity-0" : ""}`}>
              Copy
            </span>
            <span aria-hidden={!copied} className={`col-start-1 row-start-1 text-center ${copied ? "" : "opacity-0"}`}>
              Copied!
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
