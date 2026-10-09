"use client";

import { useEffect } from "react";

/**
 * The html background is sky blue on pages with the hero sky (app/globals.css), so overscrolling past the top looks
 * like the sky continues. In the bottom half of the page switch it to white, so overscrolling past the footer stays white.
 */
export function SkyOverscroll() {
  useEffect(() => {
    const root = document.documentElement;
    const update = () => {
      const bottomHalf = window.scrollY >= (root.scrollHeight - window.innerHeight) / 2;
      root.style.backgroundColor = bottomHalf ? "#fff" : "";
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      root.style.backgroundColor = "";
    };
  }, []);

  return null;
}
