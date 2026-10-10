"use client";

import { usePathname } from "next/navigation";
import { Nav } from "./nav";

/** Nav wrapper that picks the Framer variant per route: attribution pages load with the compact/solid nav. */
export function SiteNav() {
  const pathname = usePathname();
  return <Nav compact={pathname.startsWith("/attribution")} />;
}
