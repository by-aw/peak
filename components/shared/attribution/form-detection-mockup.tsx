"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { JotformIcon, MochiBlobIcon, TypeformIcon } from "@/components/icons/pixel-mockup-icons";

const FORMS: { label: string; icon?: ReactNode }[] = [
  { label: "Typeform", icon: <TypeformIcon className="h-[18px] w-7" /> },
  { label: "Jotform", icon: <JotformIcon className="size-[18px]" /> },
  { label: "Google Forms", icon: <Image src="/framer/RNfBP8ANbkojJfcaSNMQmYGXPJY.png" width={73} height={100} alt="" className="h-[18px] w-[13px] object-cover" /> },
  { label: "Tally", icon: <Image src="/framer/IkSza0TxXjrGn5sdj0pVCczjJE.jpeg" width={72} height={72} alt="" className="size-[18px]" /> },
  { label: "Native HTML", icon: <Image src="/framer/JOkGDq7VOz8zojeeOQhhMMGv86c.png" width={960} height={960} alt="" className="size-[18px] object-cover" /> },
  { label: "Embedded iframes" },
];

/** Height of one column of six pills (6 x 37 + 5 x 14) plus the 14px list gap. */
const PERIOD = 292 + 14;

/**
 * "Automatic form detection" mockup (Framer "Form Detection", 254x342): a vertical ticker of form-builder
 * pills (fades at both ends, ~25px/s upwards, looping) under a fixed "Email captured" tag and Mochi pill.
 */
export function FormDetectionMockup() {
  return (
    <div className="relative h-[342px] w-[254px] shrink-0">
      <div
        className="absolute inset-x-[55.5px] bottom-0 top-[50px] overflow-hidden [mask-image:linear-gradient(rgba(0,0,0,0)_0%,#000_20%,#000_80%,rgba(0,0,0,0)_100%)]"
        aria-hidden
      >
        <motion.ul
          className="flex w-full flex-col items-center gap-[14px] will-change-transform"
          animate={{ y: [0, -PERIOD] }}
          transition={{ duration: PERIOD / 25, ease: "linear", repeat: Infinity }}
        >
          {[0, 1, 2, 3].map((copy) => (
            <li key={copy} className="flex w-full shrink-0 flex-col items-center gap-[14px]">
              {FORMS.map((form) => (
                <div
                  key={form.label}
                  className="relative flex items-center gap-2 rounded-[8px] bg-white px-2.5 py-2 after:pointer-events-none after:absolute after:inset-0 after:rounded-[8px] after:border after:border-[#e7e7e7]"
                >
                  {form.icon ? <span className="flex shrink-0 items-center">{form.icon}</span> : null}
                  <p className="text-[14px] leading-[21px] font-normal tracking-[-0.2px] whitespace-pre text-black">{form.label}</p>
                </div>
              ))}
            </li>
          ))}
        </motion.ul>
      </div>
      <div className="absolute inset-x-0 top-0 flex flex-col items-center">
        <div className="relative flex items-center rounded-t-[8px] bg-[rgba(0,215,67,0.1)] px-2.5 py-1 after:pointer-events-none after:absolute after:inset-0 after:rounded-t-[8px] after:border after:border-b-0 after:border-[#00d743]">
          <p className="text-[13px] leading-[19.5px] font-normal tracking-[-0.2px] whitespace-pre text-[#00d743]">Email captured</p>
        </div>
        <div className="relative flex w-full items-center gap-2 rounded-[12px] bg-gray-25 px-5 py-2.5 shadow-[0_1px_14px_0_rgba(0,0,0,0.08),0_-3px_20px_0_rgba(0,0,0,0.04)] after:pointer-events-none after:absolute after:inset-0 after:rounded-[12px] after:border after:border-[#e0e0e0]">
          <MochiBlobIcon className="h-6 w-7 shrink-0" />
          <p className="text-[15px] leading-[22.5px] font-medium tracking-[-0.2px] whitespace-pre text-[#404040]">Automatic form detection</p>
        </div>
      </div>
    </div>
  );
}
