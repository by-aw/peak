"use client";

import { useEffect, useState } from "react";

const METRICS_URL = "https://moch-metrics.elufidipebenjamin.workers.dev/";

/** Snapshot of the worker's numbers, rendered on the server until the live figures arrive. */
const FALLBACK = { messages_total: 34574725, leads_total: 5481786 };

type Metrics = typeof FALLBACK;

const fmt = (n: number) => n.toLocaleString("en-US");

/**
 * The three "Figures" cells of the /mcp hero. Like the Framer page it fetches
 * `moch-metrics.elufidipebenjamin.workers.dev` ({messages_total, leads_total}) on the client.
 */
export function MetricsFigures() {
  const [m, setM] = useState<Metrics>(FALLBACK);
  useEffect(() => {
    const ctrl = new AbortController();
    fetch(METRICS_URL, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((d: Partial<Metrics> | null) => {
        if (d && typeof d.messages_total === "number" && typeof d.leads_total === "number") {
          setM({ messages_total: d.messages_total, leads_total: d.leads_total });
        }
      })
      .catch(() => {});
    return () => ctrl.abort();
  }, []);
  const figures = [
    { value: fmt(m.messages_total), label: "Total Messages" },
    { value: fmt(m.leads_total), label: "Total Leads" },
    { value: "100%", label: "Read-only data coverage" },
  ];
  return (
    <>
      {figures.map((f) => (
        <div
          key={f.label}
          className="relative flex flex-1 flex-col bg-[#f4f0ea] p-6 after:pointer-events-none after:absolute after:inset-0 after:border-x after:border-b after:border-[#e7e5e5] first:after:border-t md:after:border-y md:after:border-l-0 md:first:after:border-l lg:p-8"
        >
          <div className="flex w-full flex-col items-center gap-2">
            <p className="text-center font-fraunces text-[32px] leading-[36.8px] font-semibold whitespace-pre-wrap text-[#0d0d12] md:text-[36px] md:leading-[41.4px] lg:text-[40px] lg:leading-[46px]">
              {f.value}
            </p>
            <p className="text-center font-dm text-[15px] leading-[22.5px] font-normal whitespace-pre-wrap text-[#6b5e4f]">{f.label}</p>
          </div>
        </div>
      ))}
    </>
  );
}
