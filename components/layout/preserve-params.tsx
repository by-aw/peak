"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Port of Framer's `data-preserve-internal-params`: the current page's query string (UTMs, `ref`, `fbclid`, ...) is
 * carried onto every internal link, so the tracking scripts on later pages still see it in the URL. As on live:
 * only same-origin links, external ones (use.themochi.app, socials) are left alone, and a parameter the link sets
 * itself wins over the current page's.
 *
 * Two parts, because `<Link>` navigates to its `href` prop, not to the DOM attribute:
 *   - every internal `<a>` gets the merged URL as its `href` (hover, copy link, open in new tab, middle click);
 *   - a capture-phase click listener on window, which runs before React's handlers, cancels the original navigation
 *     of a plain left click and pushes the merged URL instead. `<Link>` sees `defaultPrevented` and stands down;
 *     other onClick handlers (closing the mobile menu, ...) still run.
 */

/** The anchor's URL with the current query string merged in, or null for links that are left alone. */
function mergedHref(anchor: HTMLAnchorElement): { href: string; changed: boolean } | null {
  const search = window.location.search;
  if (search.length <= 1) return null;
  const raw = anchor.getAttribute("href");
  if (!raw || raw.startsWith("#") || anchor.hasAttribute("download") || anchor.hasAttribute("data-no-preserve-params")) return null;

  let url: URL;
  try {
    url = new URL(raw, window.location.href);
  } catch {
    return null;
  }
  if (url.origin !== window.location.origin) return null;
  if (url.pathname.startsWith("/admin") || url.pathname.startsWith("/api")) return null;

  let changed = false;
  for (const [key, value] of new URLSearchParams(search)) {
    if (!url.searchParams.has(key)) {
      url.searchParams.append(key, value);
      changed = true;
    }
  }
  return { href: `${url.pathname}${url.search}${url.hash}`, changed };
}

function decorate(root: ParentNode) {
  root.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((a) => {
    const next = mergedHref(a);
    if (next?.changed) a.setAttribute("href", next.href);
  });
}

export function PreserveParams() {
  const router = useRouter();

  useEffect(() => {
    if (window.location.pathname.startsWith("/admin")) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as Element | null)?.closest?.("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const target = anchor.getAttribute("target");
      if (target && target !== "_self") return;
      // Always take over, even when the DOM href already carries the params: <Link> would push its original prop.
      const next = mergedHref(anchor);
      if (!next) return;
      // Same page apart from the hash: let the browser scroll.
      const url = new URL(next.href, window.location.href);
      if (url.pathname === window.location.pathname && url.search === window.location.search && url.hash) return;
      e.preventDefault();
      router.push(next.href);
    };

    // Re-run on DOM changes (client navigations, menus, lazily rendered sections). An href that already has every
    // param is not rewritten, so this cannot loop.
    let queued = false;
    const observer = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        decorate(document);
      });
    });

    decorate(document);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["href"] });
    window.addEventListener("click", onClick, true);
    return () => {
      observer.disconnect();
      window.removeEventListener("click", onClick, true);
    };
  }, [router]);

  return null;
}
