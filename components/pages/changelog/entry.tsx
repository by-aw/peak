"use client";

import { useState } from "react";
import { EntryChevron } from "./icons";
import { Badge, categoryBadges, neutralBadge, platformLabels } from "./badge";
import type { ChangelogEntry } from "./api";

/**
 * One changelog row (Framer code component `ue` + `le`). Desktop/tablet: a single line, badges, headline,
 * role pills, chevron, 32px above and below. Phone: badges and role pills on the first line, headline and
 * chevron on the second (24px above and below, no hover fade). Clicking the row opens the three-part
 * description underneath (0.38s height ease, 0.28s fade).
 */
export function ChangelogRow({ entry, isLast }: { entry: ChangelogEntry; isLast: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const slug = entry.category?.slug ?? "fix";
  const category = categoryBadges[slug] ?? categoryBadges.fix;
  const categoryLabel = categoryBadges[slug] ? category.label : (entry.category?.name ?? "Update");
  const platform = platformLabels[entry.platform] ?? entry.platform;
  const roles = entry.affects_roles ?? [];
  const sections = [
    { label: "What it is", value: entry.what_it_is },
    { label: "How it helps", value: entry.how_it_helps },
    { label: "How to access", value: entry.how_to_access },
  ].filter((s) => s.value);
  const expandable = sections.length > 0;
  const toggle = () => expandable && setExpanded((v) => !v);

  return (
    <div
      className={`py-6 transition-opacity duration-[350ms] ease-[cubic-bezier(0.34,1.2,0.64,1)] md:py-8 md:hover:opacity-70 ${
        isLast ? "" : "border-b border-[rgba(23,23,24,0.05)]"
      }`}
    >
      <div
        role={expandable ? "button" : undefined}
        tabIndex={expandable ? 0 : undefined}
        aria-expanded={expandable ? expanded : undefined}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
        className={`flex flex-wrap items-center gap-y-3 md:flex-nowrap md:gap-x-2 md:gap-y-0 ${expandable ? "cursor-pointer" : "cursor-default"}`}
      >
        <div className="order-1 flex shrink-0 gap-1 md:order-none">
          <Badge label={categoryLabel} className={category.className} />
          <Badge label={platform} className={neutralBadge} />
        </div>
        <span className="order-3 mr-2 min-w-0 flex-[1_1_calc(100%-26px)] font-sans text-[15px] leading-[1.5] font-medium text-[#171718] md:order-none md:mr-0 md:flex-1 md:basis-auto">
          {entry.headline}
        </span>
        {roles.length > 0 && (
          <div className="order-2 ml-auto flex shrink-0 gap-1 md:order-none md:ml-0">
            {roles.map((role) => (
              <Badge key={role} label={role} className={neutralBadge} />
            ))}
          </div>
        )}
        {expandable && (
          <div className="order-4 flex shrink-0 md:order-none">
            <EntryChevron expanded={expanded} />
          </div>
        )}
      </div>
      {expandable && (
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-[380ms,280ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
            expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="flex w-full flex-col gap-5 pt-5 pb-2">
              {sections.map((s) => (
                <div key={s.label} className="w-full">
                  <p className="mb-1.5 font-sans text-[10px] leading-[normal] font-semibold tracking-[0.07em] text-[rgba(23,23,24,0.4)] uppercase">
                    {s.label}
                  </p>
                  <p className="font-sans text-[14px] leading-[1.6] font-normal text-[rgba(23,23,24,0.7)]">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
