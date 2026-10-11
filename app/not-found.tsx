import type { Metadata } from "next";
import HomePage from "./page";

// Drops the root layout's `robots` so the 404 only carries the `noindex` Next adds itself, like live.
export const metadata: Metadata = {
  robots: null,
};

/** The Framer site serves the home page as its 404 page (status 404). */
export default function NotFound() {
  return <HomePage />;
}
