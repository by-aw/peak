import type { FormId } from "./config";
import { DemoForm } from "./demo-form";
import { FunnelSky } from "./funnel-sky";
import { FunnelLogo } from "./icons";

/**
 * Framer "Demo" / "Demo Jia" page body: the sky strip behind a hero with 99px top and bottom padding, holding the
 * 88x20 logo (links home) and, right under it, the multi-step form in an 840px column. The hero clips overflow
 * like Framer's.
 */
export function DemoFormPage({ formId }: { formId: FormId }) {
  return (
    <div className="relative flex w-full flex-col items-center">
      <FunnelSky />
      <div className="relative flex w-full flex-col items-center overflow-hidden py-[99px]">
        <FunnelLogo href="/" />
        <div className="flex w-full max-w-[840px] flex-col items-center">
          <DemoForm formId={formId} />
        </div>
      </div>
    </div>
  );
}
