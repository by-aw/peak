import { McpSection } from "@/components/pages/mcp/section-frame";
import { QuestionBubble, type QuestionBubbleProps } from "@/components/pages/mcp/question-bubble";
import { Reveal } from "@/components/ui/reveal";

/**
 * Same seven bubbles, positions and typing phases as /mcp (they sit in the same 767px-tall "Content (new)" canvas):
 * phone stacks them along the left/right edges; tablet and desktop share the same offsets.
 */
const BUBBLES: QuestionBubbleProps[] = [
  { text: "When are leads most active?", avatar: "/framer/iik7kd2zmAYcmV0fgLRg217ElE.jpg", delay: 300, className: "top-8 left-0 md:top-[47px] md:left-[119px]" },
  { text: "How did Sarah do last week?", avatar: "/framer/qWDk33yG9iC3FoKf9hiflpvF0.jpg", delay: 500, className: "top-[192px] left-0 md:top-[230px] md:left-[18px]" },
  { text: "Which scripts convert best?", avatar: "/framer/25CAYW0XtwJAeGe63QBqAlfw5bA.jpg", delay: 200, className: "top-[500px] left-0 md:top-[501px] md:left-[-27px]" },
  {
    text: "What are leads asking about?",
    avatar: "/framer/Q24eVJitIpDi4rMlk8fW4We66I.jpg",
    delay: 2600,
    className: "top-[658px] left-0 md:top-[657px] md:left-1/2 md:-translate-x-1/2",
  },
  { text: "What percentile is our close rate?", avatar: "/framer/Dw7jpYsgXIvwDkqGfEmyUoivAJk.jpg", reverse: true, delay: 4200, className: "top-28 right-0 md:top-[97px] md:right-[100px]" },
  { text: "Where are we losing deals?", avatar: "/framer/EoWVM4pQ7qXt3MnWI7nkQhfQGv4.jpg", reverse: true, delay: 100, className: "top-[272px] right-0 md:top-[233px] md:right-[-13px]" },
  { text: "Show me our weak spots", avatar: "/framer/IVwGHEMAo3x76HsRFYSH2b76T8.jpg", reverse: true, delay: 3600, className: "top-[580px] right-0 md:top-[523px] md:right-[31px]" },
];

/**
 * Framer "Questions Section" of /agent (`#questions`): "What can you ask your agent" (36px at every breakpoint, all
 * dark; /mcp has an orange "Claude") centered in a 767px canvas surrounded by seven typing chat bubbles.
 * 1440x927 / 1024x895 / 390x863.
 */
export function AgentQuestions() {
  return (
    <div id="questions" className="w-full">
      <McpSection label="What can you ask your agent">
        <div className="relative h-[767px] w-full">
          <div className="absolute top-[55%] left-1/2 w-full -translate-x-1/2 -translate-y-1/2 md:top-1/2 md:w-[554px]">
            <Reveal y={64} delay={0} className="flex w-full flex-col items-center gap-3">
              <p className="text-center font-fraunces text-[36px] leading-[41.4px] font-semibold whitespace-pre-wrap text-[#0d0d12]">What can you ask your agent</p>
              <p className="max-w-[302px] text-center font-dm text-[14px] leading-[21px] font-normal whitespace-pre-wrap text-[rgba(51,51,51,0.8)] md:max-w-[488px] md:text-[16px] md:leading-6 lg:text-[18px] lg:leading-[27px]">
                Connect Mochi so agents can read live leads, pipeline, and revenue — then push humans to the right next step.
              </p>
            </Reveal>
          </div>
          {BUBBLES.map((b) => (
            <QuestionBubble key={b.text} {...b} />
          ))}
        </div>
      </McpSection>
    </div>
  );
}
