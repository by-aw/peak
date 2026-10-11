import type { Metadata } from "next";
import { WatchHero } from "@/components/pages/watch/watch-hero";

const TITLE = "The Mochi App";
const DESCRIPTION =
  "Mochi gives your team one workspace to manage conversations, prioritize buyers, follow up faster, and see what is actually happening in your inbox.";
const PATH = "/watch/welcome-to-mochi";
const OG_IMAGE = "/framer/Jsk23XVU85vp3CsElYuAEpGnsE.png";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: "website", url: PATH, title: TITLE, description: DESCRIPTION, images: [{ url: OG_IMAGE }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [OG_IMAGE] },
};

/**
 * /watch/welcome-to-mochi: a static Framer page (not a "WistiaLessons" entry) built on the same template with a
 * YouTube embed. Live serves it with `<meta name="viewport" content="width=1200">` and only a desktop layout, so phones
 * get a scaled-down desktop page; here it uses the lessons' responsive template.
 */
export default function WelcomeToMochiPage() {
  return (
    <WatchHero title="Welcome to Mochi" videoUrl="https://www.youtube-nocookie.com/embed/1jIxhxvHUr0" />
  );
}
