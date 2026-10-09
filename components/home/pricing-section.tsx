"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { IconCheckmark, IconCircleCheck, IconInfo } from "@/components/icons/pricing-icons";

type Plan = {
  name: string;
  description: string;
  monthly: string;
  yearly: string;
  features: { text: string; info?: boolean }[];
  /** number of 14px "Filler" rows Framer appends on desktop so the cards line up */
  fillers: number;
  popular?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Starter",
    description: "Perfect for founders managing their own Instagram inbox.",
    monthly: "$149",
    yearly: "$119",
    features: [{ text: "300 Active Conversations" }, { text: "3 Team Members" }, { text: "Standard Support", info: true }],
    fillers: 3,
  },
  {
    name: "Essential",
    description: "Built for teams with setters that need accountability and visibility.",
    monthly: "$297",
    yearly: "$239",
    features: [
      { text: "1000 Active Conversations" },
      { text: "10 Team Members" },
      { text: "Unlimited Automations" },
      { text: "Mochi MCP" },
      { text: "AI Voice Clone" },
      { text: "Priority Email Support" },
    ],
    fillers: 3,
    popular: true,
  },
  {
    name: "Pro",
    description: "Everything in Essential, plus advanced AI, reporting and support for high-volume sales teams.",
    monthly: "$497",
    yearly: "$399",
    features: [
      { text: "5000 Active Conversations" },
      { text: "Unlimited Team Members" },
      { text: "Unlimited Automations" },
      { text: "Mochi MCP" },
      { text: "AI Voice Clone" },
      { text: "AI Setter" },
      { text: "VIP WhatsApp Support" },
      { text: "Monthly Coaching Calls" },
    ],
    fillers: 0,
  },
];

const APP_URL = "https://use.themochi.app";

/** Framer 0.8px border drawn with a box-shadow ring so it does not affect layout. */
const ring = (color: string) => `shadow-[inset_0_0_0_0.8px_${color}]`;

function Toggle({ period, onChange }: { period: "monthly" | "yearly"; onChange: (p: "monthly" | "yearly") => void }) {
  return (
    <div className={`relative flex h-[46px] w-full items-center rounded-[12px] bg-[#f5f5f5] md:h-[47px] md:w-[350px] lg:h-[50px] lg:w-auto ${ring("#e7e7e7")}`}>
      {(["monthly", "yearly"] as const).map((p) => {
        const active = period === p;
        return (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className="relative z-[1] flex flex-1 cursor-pointer items-center justify-center rounded-[12px] px-4 py-3 lg:flex-none"
            aria-pressed={active}
          >
            {active && (
              <motion.span
                layoutId="pricing-period-pill"
                className="absolute inset-0 z-[-1] rounded-[12px] bg-white shadow-[0_0_0_0.5px_#e0e0e0,0_1px_2px_0_rgba(0,0,0,0.05)]"
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            )}
            <span
              className={`text-[15px] leading-[21.75px] font-medium tracking-[-0.3px] transition-colors duration-200 md:text-[16px] md:leading-[23.2px] md:tracking-[-0.32px] lg:text-[18px] lg:leading-[26.1px] lg:tracking-[-0.36px] ${
                active ? "text-[#202020] lg:text-black" : "text-[#828282]"
              }`}
            >
              {p === "monthly" ? "Monthly" : "Yearly"}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function PlanCard({ plan, period }: { plan: Plan; period: "monthly" | "yearly" }) {
  const yearly = period === "yearly";
  const body = (
    <div className={`flex w-full flex-col items-start gap-4 rounded-[20px] bg-white p-4 lg:flex-1 ${ring("#e7e7e7")}`}>
      {/* Top */}
      <div className="flex w-full flex-col items-start">
        <div className="flex w-full items-center gap-[10px] p-2">
          <p className="flex-1 text-[16px] leading-[22.4px] font-medium tracking-[-0.24px] text-black md:text-[18px] md:leading-[25.2px] lg:text-[20px] lg:leading-[28px]">
            {plan.name}
          </p>
        </div>
        <div className="flex h-[84px] w-full items-start gap-[10px] p-2 md:h-auto lg:h-[84px]">
          <p className="flex-1 text-[15px] leading-[21px] font-normal tracking-[-0.3px] text-black md:text-[16px] md:leading-[22.4px] md:tracking-[-0.32px]">
            {plan.description}
          </p>
        </div>
      </div>
      {/* Price */}
      <div className="flex w-full flex-col items-start gap-4 overflow-clip p-2">
        <div className="flex items-end gap-1">
          <h5 className="font-display text-[32px] leading-[32px] font-semibold tracking-[0.64px] whitespace-pre text-black md:text-[24px] md:leading-[24px] lg:text-[32px] lg:leading-[32px]">
            {yearly ? plan.yearly : plan.monthly}
          </h5>
          <AnimatePresence initial={false}>
            {yearly && (
              <motion.div
                key="old"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 0.1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <h5 className="font-display text-[32px] leading-[32px] font-medium tracking-[0.64px] whitespace-pre text-black line-through md:text-[24px] md:leading-[24px] lg:text-[32px] lg:leading-[32px]">
                  {plan.monthly}
                </h5>
              </motion.div>
            )}
          </AnimatePresence>
          <p className="font-sans text-[12px] leading-[14px] font-medium whitespace-pre text-gray-400">/ month</p>
        </div>
        <Button
          variant="primaryBig"
          href={APP_URL}
          className={`w-full text-[15px] leading-[21.75px] tracking-[-0.3px] md:text-[16px] md:leading-[23.2px] md:tracking-[-0.32px] lg:text-[18px] lg:leading-[26.1px] lg:tracking-[-0.36px] ${
            plan.popular ? "bg-[linear-gradient(#a855f7_0%,#a855f7_100%)] hover:bg-[linear-gradient(#a855f7_0%,#a855f7_100%)]" : ""
          }`}
        >
          Start Free Trial
        </Button>
      </div>
      {/* Features */}
      <div className="flex w-full flex-col items-start gap-2">
        <div className="flex w-full flex-col gap-4 p-2">
          {plan.features.map((f) => (
            <div key={f.text} className="flex w-full items-start gap-[6px]">
              <IconCircleCheck className="shrink-0 text-black" />
              <p className="flex-1 text-[15px] leading-[21px] font-normal tracking-[-0.3px] text-black md:text-[16px] md:leading-[22.4px] md:tracking-[-0.32px]">{f.text}</p>
              {f.info && <IconInfo className="shrink-0" />}
            </div>
          ))}
          {Array.from({ length: plan.fillers }).map((_, i) => (
            <div key={i} aria-hidden="true" className="hidden min-h-[14px] w-full lg:flex" />
          ))}
        </div>
      </div>
    </div>
  );

  if (plan.popular) {
    return (
      <div className={`flex w-full flex-col items-center rounded-[20px] bg-purple-50 lg:flex-1 ${ring("#f3e8ff")}`}>
        <div className="flex w-full items-center justify-center gap-[10px] px-4 py-3">
          <p className="flex-1 text-center text-[15px] leading-[22.5px] font-medium tracking-[-0.3px] text-purple-600 md:text-[16px] md:leading-[24px] md:tracking-[-0.32px]">Most Popular</p>
        </div>
        {body}
      </div>
    );
  }
  return (
    <div className="flex w-full flex-col items-center rounded-[20px] lg:flex-1">
      {/* desktop: keep the card bottom-aligned with the "Most Popular" card (48px header) */}
      <div aria-hidden="true" className="hidden h-[48px] w-full shrink-0 lg:block" />
      {body}
    </div>
  );
}

/**
 * Framer "Pricing Section": heading + Monthly/Yearly switch, three plan cards on a gradient panel,
 * footer row ("Cancel anytime", "Setup in under 5 minutes", "Need more? Contact us").
 */
export function PricingSection() {
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");
  return (
    <section className="flex w-full flex-col items-center overflow-clip px-[20px] py-[48px] md:px-[32px] md:py-[64px] lg:px-[100px] lg:py-[80px]" aria-label="Pricing">
      <Reveal y={80} className="w-full max-w-[1000px] md:max-w-[960px] lg:max-w-[1000px]">
        <div className="flex w-full flex-col items-center gap-[36px] overflow-clip">
          {/* Header */}
          <div className="flex w-full flex-col items-center gap-[20px] md:gap-[24px] lg:flex-row lg:items-start lg:justify-between lg:gap-0">
            <h3 className="text-center font-display text-[32px] leading-[35.2px] font-semibold tracking-[1px] text-ink md:text-[40px] md:leading-[44px] md:tracking-[1.6px] lg:text-left lg:text-[48px] lg:leading-[52.8px]">
              Try Mochi for
              <br />7 days free
            </h3>
            <div className="flex w-full flex-col items-center gap-[16px] md:w-auto md:gap-[14px] lg:flex-row lg:gap-[16px]">
              <p className="text-[15px] leading-[22.5px] font-medium tracking-[-0.3px] whitespace-pre text-purple-500 md:text-[16px] md:leading-[24px] md:tracking-[-0.32px]">Save 25% with yearly</p>
              <Toggle period={period} onChange={setPeriod} />
            </div>
          </div>

          {/* Pricing Wrapper */}
          <div className="flex w-full flex-col items-center gap-1 rounded-[24px] bg-[linear-gradient(#fff_0%,#f6f6f6_100%)] p-1">
            <div className="flex w-full flex-col items-end gap-3 lg:flex-row lg:items-stretch">
              {PLANS.map((p) => (
                <PlanCard key={p.name} plan={p} period={period} />
              ))}
            </div>
            {/* Bottom */}
            <div className="flex w-full flex-col-reverse items-center gap-4 px-3 py-2 md:flex-row md:justify-between md:gap-0 md:px-3 md:py-1">
              <div className="flex flex-col items-center gap-3 md:flex-row md:gap-4 md:p-[10px]">
                {["Cancel anytime", "Setup in under 5 minutes"].map((t) => (
                  <div key={t} className="flex items-center gap-[6px] opacity-80">
                    <IconCheckmark className="shrink-0 text-black" />
                    <p className="text-[15px] leading-[22.5px] font-medium tracking-[-0.3px] whitespace-pre text-black md:text-[16px] md:leading-[24px] md:tracking-[-0.32px]">{t}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <p className="text-[15px] leading-[22.5px] font-medium tracking-[-0.3px] whitespace-pre text-black md:text-[16px] md:leading-[24px] md:tracking-[-0.32px]">Need more?</p>
                <Link
                  href="/demo?landing_page=home"
                  className="text-[15px] leading-[22.5px] font-medium tracking-[-0.3px] whitespace-pre text-purple-500 md:text-[16px] md:leading-[24px] md:tracking-[-0.32px]"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
