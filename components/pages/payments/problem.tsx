"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { Centered, LeadsList } from "./mockups";

const TEAM: { avatar: string; name: string; value: string; deals: string; role: string }[] = [
  { avatar: "/framer/WfGh6ISHdjwbipoqoUimgkxyqI.png", name: "Jane", value: "$1,499.10", deals: "12 deals", role: "Setter" },
  { avatar: "/framer/6ZWI2LIQBS8mW5TIXHBzjCrgE.png", name: "Tom", value: "$988.90", deals: "8 deals", role: "Closer" },
  { avatar: "/framer/pdhs4zeRa4LdxXCRsTzE7NB9Wo.png", name: "John", value: "$82.31", deals: "2 deals", role: "Closer" },
  { avatar: "/framer/jNosLCRrzWQciCmoZbL5Q6jzZ4.png", name: "Bella", value: "$1,499.10", deals: "12 deals", role: "Setter" },
];

/** Card 2 mockup: four white rows (avatar, name/value, deals/role). */
function TeamList() {
  return (
    <div className="flex w-[272px] flex-col gap-1">
      {TEAM.map((m) => (
        <div key={m.name} className="flex items-center gap-3 overflow-hidden rounded-[14px] bg-white px-4 py-3 shadow-[0_0_0_0.44px_rgba(17,17,17,0.05),0_14px_28px_0_rgba(17,17,17,0.05)]">
          <Image src={m.avatar} alt="" width={64} height={64} className="size-8 shrink-0 rounded-full object-cover" />
          <div className="flex flex-1 flex-col gap-[3px]">
            <div className="flex items-center justify-between">
              <p className="text-[12px] leading-[12.6px] font-medium tracking-[-0.2px] whitespace-pre text-black">{m.name}</p>
              <p className="text-[12px] leading-[12.6px] font-medium tracking-[-0.2px] whitespace-pre text-black">{m.value}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[11px] leading-[11px] font-normal tracking-[-0.2px] whitespace-pre text-[#6d6d6d]">{m.deals}</p>
              <p className="text-[11px] leading-[11px] font-normal tracking-[-0.2px] whitespace-pre text-[#6d6d6d]">{m.role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const COSTS: { label: string; icon: string; round?: boolean }[] = [
  { label: "Platform Fees", icon: "/framer/GZGpjeygCJl5dCzEeV0E1de7Tg.png" },
  { label: "Setter Commission", icon: "/framer/8Hj7senEeCj9G3dHeliXqDZAg.png", round: true },
  { label: "Closer Commission", icon: "/framer/8Hj7senEeCj9G3dHeliXqDZAg.png", round: true },
];

/** Card 3 mockup: three white "slots" (label + $ header row, icon + amount row). */
function CostSlots() {
  return (
    <div className="flex w-[272px] flex-col gap-1.5">
      {COSTS.map((c) => (
        <div key={c.label} className="flex flex-col rounded-[16px] bg-white">
          <div className="flex items-center justify-between gap-2.5 overflow-hidden px-4 py-3">
            <p className="text-[12px] leading-[12.6px] font-medium tracking-[-0.2px] whitespace-pre text-[#6d6d6d]">{c.label}</p>
            <p className="text-[12px] leading-[12.6px] font-medium tracking-[-0.2px] whitespace-pre text-[#6d6d6d]">$</p>
          </div>
          <div className="flex items-center justify-between overflow-hidden px-4 py-3">
            <Image src={c.icon} alt="" width={40} height={40} className={`size-5 object-cover ${c.round ? "rounded-full shadow-[0_0_0_2px_#fff]" : "rounded-[5px]"}`} />
            <p className="text-[12px] leading-[12.6px] font-medium tracking-[-0.2px] whitespace-pre text-black">$145.21</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const CARDS = [
  {
    title: "Which leads are worth pursuing?",
    description: "A lead who DMs you isn't the same as a lead who buys. Without connecting payments to leads, you can't tell your setters who to prioritize.",
    mockup: (
      <Centered top="top-[46px] md:top-16" className="h-[240px] w-[272px] overflow-hidden rounded-[11px]">
        <div className="origin-top-left scale-[0.68]">
          <LeadsList variant="problem" />
        </div>
      </Centered>
    ),
    height: "h-[248px] md:h-[266px]",
  },
  {
    title: "What did your team actually generate?",
    description: "Your closer says they closed 8 deals. Your Stripe shows 12 payments. Your Whop shows 6 more. Who actually sold what? Nobody knows for sure.",
    mockup: (
      <Centered top="top-12 md:top-[66px]">
        <TeamList />
      </Centered>
    ),
    height: "h-[248px] md:h-[266px]",
  },
  {
    title: "What it really costs to close a deal?",
    description: "Processing fees, commissions, refunds - scattered across multiple platforms. You see gross revenue but you don't see what you keep.",
    mockup: (
      <>
        <Centered top="top-[61px]">
          <CostSlots />
        </Centered>
        <motion.div
          aria-hidden
          className="absolute top-[19px] right-1 size-[101px]"
          animate={{ rotate: [-108, 252] }}
          transition={{ duration: 8, ease: "linear", repeat: Infinity }}
        >
          <Image src="/framer/91zZeCFr5kJ5b8Pu91hUEVcgy8.png" alt="" width={640} height={640} className="size-full" />
        </motion.div>
      </>
    ),
    height: "h-[266px]",
  },
];

/**
 * Framer "Problem Section" of /payments: left-aligned "You know how much you made..." header and three
 * mockup cards (leads list, team list, cost slots with a spinning coin). 1440x824 / 1024x1511 / 390x1460.
 */
export function PaymentsProblem() {
  return (
    <section className="relative flex w-full flex-col items-center px-5 py-12 md:px-12 md:py-16 lg:px-[100px] lg:py-20">
      <div className="flex w-full max-w-[1100px] flex-col items-start gap-8 md:gap-12 lg:gap-16">
        <Reveal y={48} delay={0.2} className="w-full">
          <SectionHeader
            align="left"
            className="gap-3 md:gap-2"
            title={
              <>
                You know <span className="text-black/50">how much you made. You don&apos;t know why.</span>
              </>
            }
            titleClassName="max-w-[560px]"
            description="Your payment providers tell you money came in. But they don't tell you which setter nurtured them, which closer sealed the deal, or which content brought them in the first place. Without that connection, you're flying blind on where to focus."
            descriptionClassName="max-w-[558px]"
          />
        </Reveal>
        <div className="flex w-full flex-col gap-6 md:gap-8 lg:flex-row lg:gap-5">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} y={64} delay={0.2 + i * 0.1} className="flex w-full flex-col gap-6 lg:flex-1 lg:basis-0">
              <div className={`relative w-full overflow-hidden rounded-[16px] bg-gray-25 ${card.height}`}>{card.mockup}</div>
              <div className="flex w-full flex-col gap-1.5">
                <p className="text-[18px] leading-[27px] font-medium tracking-[-0.36px] whitespace-pre-wrap text-ink-3">{card.title}</p>
                <p className="text-[15px] leading-[21.75px] font-normal tracking-[-0.15px] whitespace-pre-wrap text-[rgba(82,82,82,0.8)]">{card.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
