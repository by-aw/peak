"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button, buttonShadow } from "@/components/ui/button";
import { MochiLogo } from "@/components/icons/mochi-logo";
import { LOGIN_URL, SIGNUP_URL, menuSections, navLinks, type MenuItem, type MenuSection } from "./nav-data";

const spring = { type: "spring", stiffness: 300, damping: 30 } as const;

/** Figma nav "Container" (536:7022): 1px hairline ring + big soft drop shadow. */
const pillShadow =
  "shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_347px_97px_0_rgba(0,0,0,0),0_222px_89px_0_rgba(0,0,0,0.01),0_125px_75px_0_rgba(0,0,0,0.03),0_55px_55px_0_rgba(0,0,0,0.04),0_14px_30px_0_rgba(0,0,0,0.05)]";

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={24} height={24} aria-hidden="true" className={className}>
      <path d="M 5.75 9.5 L 12 15.75 L 18.25 9.5" fill="transparent" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon({ icon }: { icon: NonNullable<MenuItem["icon"]> }) {
  if ("src" in icon) return <Image src={icon.src} alt="" width={icon.size} height={icon.size} />;
  const { Svg, className } = icon;
  return <Svg className={className} />;
}

/** Menu card used both in the desktop mega menu ("Desktop/Inactive") and the phone menu ("Mobile"). */
function MenuCard({ item }: { item: MenuItem }) {
  return (
    <Link
      href={item.href}
      className="flex w-full items-center gap-1 overflow-clip rounded-[12px] p-2 transition-colors duration-150 hover:bg-[#f8f8f8]"
    >
      <div className="flex flex-1 items-center gap-2.5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-clip rounded-[8px] bg-white shadow-[inset_0_0_0_1px_#e4e4e4,0_1px_2px_0_rgba(224,224,224,0.06)]">
          {item.icon ? <MenuIcon icon={item.icon} /> : null}
        </div>
        <div className="flex flex-1 flex-col items-start gap-0.5">
          <p className="text-[15px] font-medium leading-[22.5px] tracking-[-0.3px] text-gray-700 md:text-[16px] md:leading-6 md:tracking-[-0.32px]">{item.title}</p>
          <p className="whitespace-pre-line text-[14px] font-normal leading-[19.6px] tracking-[-0.2px] text-gray-550 lg:whitespace-nowrap">{item.description}</p>
        </div>
      </div>
    </Link>
  );
}

/** Grey sub list ("Sub-menu" / "Desktop/Sub Menu") under Attribution Tracking. */
function SubMenu({ items }: { items: MenuItem[] }) {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-start gap-1 rounded-[8px] bg-gray-50 p-2 md:gap-0 md:rounded-[10px] md:p-1">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex w-full items-center gap-1 overflow-clip rounded-[6px] p-2 transition-colors duration-150 hover:bg-white"
        >
          <div className="flex flex-1 flex-col items-start gap-0.5">
            <p className="text-[14px] font-medium leading-[15.4px] text-gray-750">{item.title}</p>
            <p className="whitespace-pre-line text-[14px] font-normal leading-[19.6px] tracking-[-0.2px] text-gray-550">{item.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

/** Mega menu column (mochi-web-v2 Figma, node 546:2110): white card with a hairline ring drawn inside its padding. */
function MegaMenuSection({ section }: { section: MenuSection }) {
  return (
    <div className="flex flex-1 basis-0 flex-col items-start gap-2 rounded-[18px] bg-white p-2 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]">
      <div className="flex h-8 w-full px-2 py-1.5">
        <p className="flex-1 text-[14px] font-medium leading-[19.6px] tracking-[-0.2px] text-[rgba(82,82,82,0.8)]">{section.heading}</p>
      </div>
      <div className={`flex w-full flex-col items-center overflow-clip ${section.subItems ? "flex-1 gap-1" : ""}`}>
        {section.items.map((item) => (
          <MenuCard key={item.href} item={item} />
        ))}
        {section.subItems ? <SubMenu items={section.subItems} /> : null}
      </div>
    </div>
  );
}

/** Phone accordion ("Nav Menu (Mobile)" + "Mobile Menu"). */
function MobileAccordion({ section }: { section: MenuSection }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex w-full flex-col items-start">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center gap-0.5 px-2 py-1 text-[15px] font-normal leading-[21px] tracking-[-0.3px] text-ink-3"
      >
        <span className="whitespace-pre">{section.mobileLabel}</span>
        <Chevron className={`shrink-0 text-ink-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={spring}
            className="w-full overflow-hidden"
          >
            <div className="flex w-full flex-col items-center gap-1">
              {section.items.map((item) => (
                <MenuCard key={item.href} item={item} />
              ))}
              {section.subItems ? <SubMenu items={section.subItems} /> : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/**
 * Site navigation ported from the Framer "Desktop/Default" / "Tablet" / "Phone" nav variants.
 * - fixed frosted pill (80% white + 8px backdrop blur, as in the mochi-web-v2 Figma)
 * - "Features" opens the mega menu on hover (desktop/tablet): the pill grows to hold it (mochi-web-v2 Figma, node 546:2067)
 * - on phones the hamburger grows the pill the same way to reveal the full menu (Framer "Phone/Open" contents)
 */
export function Nav({ compact = false }: { compact?: boolean }) {
  // `compact` forces the scrolled/solid state from the start (Framer "Desktop/Expand" / "Phone/Scroll"
  // variants used on the attribution pages). Tablet keeps its default translucent variant on those pages.
  const [scrolled, setScrolled] = useState(compact);
  const [menuOpen, setMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tabletMq = window.matchMedia("(min-width: 810px) and (max-width: 1199px)");
    const onScroll = () => setScrolled(window.scrollY > 64 || (compact && !tabletMq.matches));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const mq = window.matchMedia("(min-width: 810px)");
    const onMq = () => {
      setIsDesktop(mq.matches);
      if (mq.matches) setMenuOpen(false);
    };
    onMq();
    mq.addEventListener("change", onMq);
    tabletMq.addEventListener("change", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", onMq);
      tabletMq.removeEventListener("change", onScroll);
    };
  }, [compact]);

  const openMega = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setFeaturesOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setFeaturesOpen(false), 250);
  };

  const megaOpen = featuresOpen && isDesktop;

  // While the phone menu is open this layer covers the screen. Tapping outside the pill closes the menu, and so does
  // following one of its links (the nav stays mounted across pages, so it would otherwise stay open on the next one).
  const closeMenuOnTap = (e: React.MouseEvent) => {
    const target = e.target as Element;
    if (!pillRef.current?.contains(target) || target.closest("a")) setMenuOpen(false);
  };

  return (
    <div className={`fixed inset-x-0 top-0 z-10 select-none ${menuOpen ? "bottom-0 overflow-y-auto" : ""}`} onClick={menuOpen ? closeMenuOnTap : undefined}>
      <nav className={`flex flex-col items-center px-5 md:px-8 md:pt-6 lg:px-0 ${scrolled ? "pt-4" : "pt-5"}`} aria-label="Main">
        {/* Wrapper. The closed pill is 54px tall, so 27px reads as fully round while letting the radius ease to the open
            menu's 26px (from 9999px it would bulge the growing pill into an ellipse). */}
        <div
          ref={pillRef}
          className={`relative w-full max-w-[896px] transition-[border-radius] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            menuOpen || megaOpen ? "rounded-[26px]" : "rounded-[27px]"
          }`}
        >
          {/* Container */}
          <div
            className={`relative flex w-full flex-wrap items-center justify-center overflow-clip rounded-[inherit] border border-white bg-white/80 px-2 py-2.5 backdrop-blur-[8px] md:p-2 ${pillShadow}`}
          >
            {/* Left: logo (+ hamburger on phone) */}
            <div className="flex w-full items-center justify-between pr-0.5 md:w-auto md:flex-1 md:basis-0 md:pr-0">
              <Link href="/" aria-label="Mochi" className="flex h-8 items-center px-2">
                <MochiLogo />
              </Link>
              <button
                type="button"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((o) => !o)}
                className="relative h-8 w-8 overflow-clip md:hidden"
              >
                <motion.span
                  className="absolute left-2 block h-0.5 w-4 bg-black"
                  initial={false}
                  animate={menuOpen ? { top: 15, rotate: 45 } : { top: 12, rotate: 0 }}
                  transition={spring}
                  style={{ transformOrigin: "8px 1px" }}
                />
                <motion.span
                  className="absolute left-2 block h-0.5 w-4 bg-black"
                  initial={false}
                  animate={menuOpen ? { top: 15, rotate: -45 } : { top: 18, rotate: 0 }}
                  transition={spring}
                  style={{ transformOrigin: "8px 1px" }}
                />
              </button>
            </div>

            {/* Desktop / tablet menu */}
            <div className="hidden items-start md:flex">
              <div className="relative" onMouseEnter={openMega} onMouseLeave={scheduleClose}>
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={megaOpen}
                  onClick={() => (featuresOpen ? scheduleClose() : openMega())}
                  className={`flex items-center rounded-full p-1.5 transition-colors duration-200 ${megaOpen ? "bg-black/5" : ""}`}
                >
                  <span className="whitespace-pre px-1 text-[16px] font-normal leading-[22.4px] tracking-[-0.32px] text-black">Features</span>
                  <Image
                    src="/icon-chevron-top-small.svg"
                    alt=""
                    width={20}
                    height={20}
                    className={`shrink-0 transition-transform duration-300 ${megaOpen ? "" : "rotate-180"}`}
                  />
                </button>
              </div>
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} className="group flex items-center rounded-full px-2.5 py-1.5">
                  <span className="whitespace-pre text-[16px] font-normal leading-[22.4px] tracking-[-0.32px] text-black transition-opacity duration-200 group-hover:opacity-[0.88]">
                    {l.label}
                  </span>
                </Link>
              ))}
            </div>

            {/* Desktop / tablet buttons */}
            <div className="hidden items-center justify-end gap-2 md:flex md:flex-1 md:basis-0">
              <Button variant="white" href={LOGIN_URL}>
                Log In
              </Button>
              <Button variant="primary" href={SIGNUP_URL}>
                Start Free Trial
              </Button>
            </div>

            {/* Mega menu (mochi-web-v2 Figma, node 546:2109): wraps onto its own row inside the pill, 8px below the bar */}
            <AnimatePresence initial={false}>
              {megaOpen ? (
                <motion.div
                  key="mega"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={spring}
                  onMouseEnter={openMega}
                  onMouseLeave={scheduleClose}
                  className="hidden w-full basis-full overflow-hidden md:block"
                >
                  <div className="flex items-stretch gap-1.5 pt-2">
                    {menuSections.map((section) => (
                      <MegaMenuSection key={section.heading} section={section} />
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {/* Phone menu (Framer "Phone/Open" contents): wraps onto its own row inside the pill like the mega menu, with the
                24px above and below it inside the animated row (the pill's 10px padding + 14px) so they grow with it.
                Open, the pill fills the screen down to the same 20px gutter as its sides: the row is 100dvh minus the
                top offset (20px, 16px once scrolled), the 43px bar (border + 10px padding + 32px), the 11px (padding +
                border) under the row and that 20px. The accordions scroll; the buttons stay at the bottom. */}
            <AnimatePresence initial={false}>
              {menuOpen ? (
                <motion.div
                  key="mobile-menu"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={spring}
                  className="w-full basis-full overflow-hidden md:hidden"
                >
                  <div className={`flex w-full flex-col gap-6 pb-3.5 pt-6 ${scrolled ? "h-[calc(100dvh-90px)]" : "h-[calc(100dvh-94px)]"}`}>
                    <div className="flex min-h-0 w-full flex-1 flex-col items-start gap-3.5 overflow-y-auto overscroll-contain">
                      {menuSections.map((section) => (
                        <MobileAccordion key={section.heading} section={section} />
                      ))}
                      {navLinks.map((l) => (
                        <Link key={l.href} href={l.href} className="flex items-center justify-center rounded-full px-2.5 py-1.5">
                          <span className="whitespace-pre text-[15px] font-normal leading-[21px] tracking-[-0.3px] text-black">{l.label}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="flex w-full shrink-0 flex-col items-center gap-3.5 px-4">
                      <Link
                        href={LOGIN_URL}
                        target="_blank"
                        rel="noopener"
                        className={`flex w-full items-center justify-center rounded-full bg-white px-3 py-1.5 text-[15px] font-medium leading-[22.5px] tracking-[-0.3px] text-black transition-colors duration-200 hover:text-gray-800 ${buttonShadow}`}
                      >
                        Log In
                      </Link>
                      <Link
                        href={SIGNUP_URL}
                        target="_blank"
                        rel="noopener"
                        className={`flex w-full items-center justify-center rounded-full bg-[linear-gradient(#14151a_0%,#14151a_100%)] px-3 py-1.5 text-[15px] font-medium leading-[22.5px] tracking-[-0.3px] text-white transition-[background] duration-200 hover:bg-[linear-gradient(#000_0%,#14151a_100%)] ${buttonShadow}`}
                      >
                        Start Free Trial
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </nav>
    </div>
  );
}
