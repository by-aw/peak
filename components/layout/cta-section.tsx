import Image from "next/image";
import Link from "next/link";
import { buttonShadow } from "@/components/ui/button";
import { SIGNUP_URL } from "./nav-data";

const steps = [
  { title: "Start Trial", text: "Start your free 7-day trial and create your team’s workspace." },
  { title: "Connect Instagram", text: "Securely connect your account through Meta's official API." },
  { title: "Start converting", text: "Invite your team and turn more conversations into booked calls." },
];

/**
 * Framer "CTA" section ("Get up and running in 5 minutes"): heading + white CTA button,
 * the 3-step row with dots and lines, and the dashboard mockup with the mascots.
 * Desktop 1440x798, tablet 1024x777, phone 390x855 (the image stack is a different mobile variant).
 */
export function CtaSection() {
  return (
    <section className="relative flex w-full justify-center overflow-clip">
      <div className="flex w-full flex-col items-center px-5 pt-12 md:px-[100px] md:pt-20">
        <div className="flex w-full max-w-[1000px] flex-col items-center gap-10 md:gap-16">
          {/* Phone-only image stack (Framer "Image" / "Footer Image Mobile") */}
          <div className="relative z-[3] flex h-[314px] w-full flex-col items-center px-8 md:hidden">
            <Image
              src="/framer/xj7iYweK42GTxKaSOTrokJbLOI.png"
              width={1024}
              height={1803}
              sizes="286px"
              alt=""
              className="pointer-events-none h-auto w-[286px] max-w-none"
            />
            <div className="absolute left-[268px] top-[-34px] z-[1] h-[94px] w-[88px]">
              <Image src="/framer/UMkDevsaFa2BKgVMx84x8jEAs4.png" width={360} height={384} sizes="88px" alt="" className="h-full w-full" />
            </div>
          </div>

          {/* Header */}
          <div className="z-[3] flex w-full flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-0">
            <h3 className="w-full text-center font-display text-[32px] font-semibold leading-[35.2px] tracking-[1px] text-ink md:max-w-[520px] md:flex-1 md:basis-0 md:text-left md:text-[40px] md:leading-[44px] md:tracking-[1.6px] lg:text-[48px] lg:leading-[52.8px]">
              Get up and running in 5 minutes
            </h3>
            <div className="flex w-full items-center gap-3 md:w-auto md:items-start">
              <Link
                href={SIGNUP_URL}
                target="_blank"
                rel="noopener"
                className={`flex flex-1 items-center justify-center rounded-[12px] bg-white px-5 py-3 text-[15px] font-medium leading-[21.75px] tracking-[-0.3px] text-black transition-colors duration-200 hover:text-gray-800 md:flex-none md:text-[16px] md:leading-[23.2px] md:tracking-[-0.32px] lg:text-[18px] lg:leading-[26.1px] lg:tracking-[-0.36px] ${buttonShadow}`}
              >
                Start Free Trial
              </Link>
            </div>
          </div>

          {/* Steps: horizontal row on tablet/desktop */}
          <div className="hidden w-full gap-2 md:flex">
            {steps.map((step, i) => (
              <div key={step.title} className="flex flex-1 basis-0 flex-col justify-center gap-6">
                <div className="flex w-full items-center gap-2">
                  <div className={`relative h-5 w-5 shrink-0 overflow-clip bg-white ${i === 0 ? "" : "opacity-40"}`}>
                    <div className={`absolute left-[5px] top-[5px] h-2.5 w-2.5 rounded-full ${i === 0 ? "bg-[#ad46ff]" : "bg-black"}`} />
                  </div>
                  <div className="h-px flex-1 rounded-full bg-black/10" />
                </div>
                <div className="flex w-full flex-col gap-2 overflow-clip">
                  <p className="text-[16px] font-medium leading-[23.2px] tracking-[-0.32px] text-black lg:text-[18px] lg:leading-[26.1px] lg:tracking-[-0.36px]">
                    {step.title}
                  </p>
                  <p className="text-[16px] font-normal leading-[22.4px] tracking-[-0.32px] text-black opacity-50">{step.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Steps: vertical list on phone */}
          <div className="flex w-full flex-col gap-2 md:hidden">
            {steps.map((step, i) => (
              <div key={step.title} className="flex w-full items-start gap-6">
                <div className="flex w-5 flex-col items-center gap-2 self-stretch">
                  <div className="relative h-5 w-5 shrink-0 overflow-clip">
                    <div className={`absolute inset-[5px] rounded-full ${i === 0 ? "bg-[#ad46ff]" : "bg-black opacity-25"}`} />
                  </div>
                  {i < steps.length - 1 && <div className="w-px flex-1 rounded-full bg-black/10" />}
                </div>
                <div className="flex flex-1 basis-0 flex-col gap-2 overflow-clip pb-4">
                  <p className="text-[15px] font-medium leading-[22.5px] tracking-[-0.3px] text-black">{step.title}</p>
                  <p className="text-[14px] font-normal leading-[19.6px] tracking-[-0.2px] text-gray-800 opacity-50">{step.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Dashboard mockup + mascots (tablet/desktop) */}
          <div className="hidden w-full flex-col md:flex">
            <div className="relative flex h-[360px] w-full items-start">
              <div className="relative flex-1 basis-0">
                <Image
                  src="/framer/JZQgs74iAOjGK2NRf1pxMgImGGQ.png"
                  width={2048}
                  height={1057}
                  sizes="(min-width: 1200px) 1000px, calc(100vw - 200px)"
                  alt=""
                  className="h-auto w-full"
                />
              </div>
              <div className="absolute right-[-81px] top-[-75px] z-[1] h-[197px] w-[184px]">
                <Image src="/framer/kcVVuVeMbh7EFtpsjEdB7TKzuCo.png" width={736} height={784} sizes="184px" alt="" className="h-full w-full" />
              </div>
              <div className="absolute left-[-4px] top-[264px] z-[1] h-[133px] w-[133px]">
                <Image src="/framer/v9gv6IP9LwGJjgEvg2dcxZMNuU.png" width={1254} height={1254} sizes="133px" alt="" className="h-full w-full object-cover" />
              </div>
              <div className="absolute right-0 top-[213.609px] z-[1] h-[160px] w-[285px]">
                <Image src="/framer/lp15KmkigzmT1BUO4xDanHvhfFo.png" width={1672} height={941} sizes="285px" alt="" className="h-full w-full object-cover" />
              </div>
            </div>
            <div className="relative h-px w-full bg-black/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
