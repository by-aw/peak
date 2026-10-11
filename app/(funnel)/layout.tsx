/**
 * Route group for the Framer funnel pages that have no site chrome (no nav, CTA block or footer):
 * /demo, /demo-jia, /schedule-your-call, /spot-confirmed, /unconfirmed, /vsl, /vsl-2, /book-dm-audit,
 * /thank-you-pdf. Each page paints its own background and layout inside this bare white column.
 */
export default function FunnelLayout({ children }: { children: React.ReactNode }) {
  return <main className="relative flex min-h-dvh w-full flex-col items-center overflow-clip bg-white">{children}</main>;
}
