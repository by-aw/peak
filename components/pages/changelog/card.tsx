import { Reveal } from "@/components/ui/reveal";
import { ChangelogFeed } from "./feed";
import type { ChangelogPage } from "./api";

/**
 * Framer "Change Log Section": the page wrapper (80px 100px padding on desktop, 64px 48px on tablet, 20px on
 * phone) around a white card (max 900px wide, 32px radius and 32px 48px padding; 16px and 20px on phone, 1px
 * 5% ink ring) that fades up on load, holding the changelog feed.
 */
export function ChangelogCard({ initial }: { initial: ChangelogPage | null }) {
  return (
    <section className="relative z-[1] flex w-full items-center justify-center overflow-clip">
      <div className="flex w-1 flex-[1_0_0px] items-center justify-center overflow-clip p-5 md:px-12 md:py-16 lg:px-[100px] lg:py-20">
        <Reveal
          y={48}
          delay={0}
          viewport={{ once: true, amount: "some" }}
          className="relative flex w-1 max-w-[900px] flex-[1_0_0px] flex-col items-center justify-center overflow-clip rounded-2xl bg-white p-5 shadow-[0_0_0_1px_rgba(23,23,24,0.05)] md:rounded-[32px] md:px-12 md:py-8"
        >
          <ChangelogFeed initial={initial} />
        </Reveal>
      </div>
    </section>
  );
}
