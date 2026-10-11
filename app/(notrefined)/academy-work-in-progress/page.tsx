import type { Metadata } from "next";
import { academyMetadata } from "@/components/pages/academy/metadata";

export const metadata: Metadata = academyMetadata("/academy-work-in-progress");

/**
 * /academy-work-in-progress: the live Framer page has no content of its own (an empty, zero-height body between the
 * fixed nav and the shared "Get up and running" block); lessons are only reachable at /academy-work-in-progress/<slug>.
 * Kept identical so the indexed URL still resolves.
 */
export default function AcademyIndexPage() {
  return null;
}
