import Link from "next/link";
import { InstagramIcon, YoutubeIcon } from "@/components/icons/nav-icons";

type FooterLink = { label: string; href: string; external?: boolean };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Features",
    links: [
      { label: "Reply Agent", href: "/reply-agent" },
      { label: "Priority Inbox", href: "/features/priority-inbox" },
      { label: "Personalization", href: "/features/personalization" },
      { label: "Sales Performance", href: "/features/sales-performance" },
      { label: "Team Collaboration", href: "/features/team-collaboration" },
    ],
  },
  {
    title: "Data Hub",
    links: [
      { label: "Attribution Tracking", href: "/attribution" },
      { label: "DM Links", href: "/attribution/dm-links" },
      { label: "YouTube Tracking", href: "/attribution/youtube-tracking" },
      { label: "Pixel Tracking", href: "/attribution/tracking-pixel" },
      { label: "Lead Profiles", href: "/attribution/lead-profiles" },
    ],
  },
  {
    title: "Integrations",
    links: [
      { label: "Claude MCP", href: "/mcp" },
      { label: "Zapier", href: "/zapier" },
      { label: "Meta Ads", href: "/meta-ads" },
      { label: "Payments", href: "/payments" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Partner", href: "/partner" },
      { label: "Calculator", href: "/calculator" },
      { label: "Blog", href: "/updates" },
      { label: "Docs", href: "https://themochi-app.gitbook.io/documentation", external: true },
    ],
  },
];

const headingClass = "text-[15px] font-medium leading-[22.5px] tracking-[-0.3px] text-black md:text-[16px] md:leading-6 md:tracking-[-0.32px]";
const linkClass =
  "text-[15px] font-normal leading-[21px] tracking-[-0.3px] text-black/65 transition-colors duration-200 hover:text-black md:text-[16px] md:leading-[22.4px] md:tracking-[-0.32px]";
const legalClass =
  "whitespace-pre text-[15px] font-normal leading-[21px] tracking-[-0.3px] text-black/35 transition-colors duration-200 hover:text-black md:text-[16px] md:leading-[22.4px] md:tracking-[-0.32px]";

/**
 * Framer "Footer": five link columns (Features / Data Hub / Integrations / Resources / Contact),
 * then the legal line, Privacy / Terms links and the Instagram + YouTube icons.
 * Desktop 1440x398, tablet 1024x442; the phone variant is a 2x149px grid.
 */
export function Footer() {
  return (
    <footer className="flex w-full flex-col items-center">
      <div className="flex w-full flex-col items-center px-8 pb-6 pt-8 md:px-[100px] md:py-16">
        <div className="flex w-full max-w-[1000px] flex-col items-center gap-12 md:gap-16">
          <div className="grid w-full grid-cols-[149px_149px] justify-center gap-7 md:flex md:flex-wrap md:items-start md:gap-6">
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col items-start gap-4 overflow-clip md:flex-1 md:basis-0">
                <p className={headingClass}>{col.title}</p>
                <div className="flex w-full flex-col items-start gap-2 overflow-clip">
                  {col.links.map((l) => (
                    <Link
                      key={l.label}
                      href={l.href}
                      className="flex w-full items-center"
                      {...(l.external ? { target: "_blank", rel: "noopener" } : {})}
                    >
                      <p className={`w-full ${linkClass}`}>{l.label}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex flex-col items-start gap-4 overflow-clip md:flex-1 md:basis-0">
              <p className={headingClass}>Contact</p>
              <div className="flex w-full flex-col items-start gap-2 overflow-clip">
                <p className="w-full">
                  <a
                    href="mailto:hey@themochi.app"
                    target="_blank"
                    rel="noopener"
                    className="text-[15px] font-normal leading-[21px] tracking-[-0.3px] text-[#636363] md:text-[16px] md:leading-[22.4px] md:tracking-[-0.32px]"
                  >
                    hey@themochi.app
                  </a>
                </p>
                <p className="w-full text-[15px] font-normal leading-[21px] tracking-[-0.3px] text-black/65 md:text-[16px] md:leading-[22.4px] md:tracking-[-0.32px]">
                  Meydan Grandstand, 6th Floor, Meydan Road, Nad Al Sheba, Dubai, United Arab Emirates.
                </p>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col-reverse items-start gap-5 md:flex-row md:items-center md:justify-between md:gap-0">
            <p className="text-[14px] font-normal leading-[19.6px] tracking-[-0.2px] text-black/35 md:flex-1 md:basis-0">
              © 2026 Mochi L.L.C-FZ. License No: 2531534.01
            </p>
            <div className="flex w-full flex-col-reverse items-center gap-5 md:w-auto md:flex-row">
              <div className="flex items-center gap-3">
                <Link href="/legal/data-privacy-policy" className={legalClass}>
                  Privacy
                </Link>
                <Link href="/legal/terms-of-service" className={legalClass}>
                  Terms &amp; conditions
                </Link>
              </div>
              <div className="flex items-center justify-end gap-4">
                <a href="https://www.instagram.com/themochi.app?igsh=YXVnN2s2aXd4dHht" target="_blank" rel="noopener" aria-label="Instagram" className="flex h-5 w-5 items-center">
                  <InstagramIcon className="h-5 w-5" />
                </a>
                <a href="https://youtube.com/@themochi-app?si=eLgDq4pMu93iEJHO&themeRefresh=1" target="_blank" rel="noopener" aria-label="YouTube" className="flex h-5 w-6 items-center">
                  <YoutubeIcon className="h-5 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
