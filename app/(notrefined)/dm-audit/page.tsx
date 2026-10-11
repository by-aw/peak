import type { Metadata } from "next";
import { AuditHero } from "@/components/pages/dm-audit/hero";
import { AuditSteps } from "@/components/pages/dm-audit/steps";
import { AuditCriteria } from "@/components/pages/dm-audit/criteria";
import { AuditAfter } from "@/components/pages/dm-audit/after-audit";

const TITLE = "Free Instagram DM Audit | See How Much Revenue You're Losing";
const DESCRIPTION =
  "Mochi gives your team one workspace to manage conversations, prioritize buyers, follow up faster, and see what is actually happening in your inbox.";
const PATH = "/dm-audit";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: "website", url: PATH, title: TITLE, description: DESCRIPTION, images: [{ url: "/og/dm-audit.png", width: 1920, height: 1080 }] },
};

export default function DmAuditPage() {
  return (
    <>
      <AuditHero />
      <AuditSteps />
      <AuditCriteria />
      <AuditAfter />
    </>
  );
}
