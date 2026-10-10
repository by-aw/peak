import { McpSection } from "./section-frame";
import { QuestionBubble, type QuestionBubbleProps } from "./question-bubble";

/**
 * Positions of the seven bubbles inside the 767px-tall "Content (new)" canvas, measured on the live site:
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
 * Framer "Questions Section" of /mcp: "What can you ask Claude" centered in a 767px canvas surrounded by
 * seven typing chat bubbles. 1440x927 / 1024x895 / 390x863.
 */
export function McpQuestions() {
  return (
    <McpSection label="What can you ask Claude">
      <div className="relative h-[767px] w-full">
        <div className="absolute top-[55%] left-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 md:top-1/2 md:w-[554px]">
          <p className="text-center font-fraunces text-[20px] leading-[23px] font-semibold whitespace-pre-wrap text-[#0d0d12] md:text-[32px] md:leading-[36.8px] lg:text-[36px] lg:leading-[41.4px]">
            What can you ask <span className="text-[#da7756]">Claude</span>
          </p>
          <p className="max-w-[302px] text-center font-dm text-[14px] leading-[21px] font-normal whitespace-pre-wrap text-[rgba(51,51,51,0.8)] md:max-w-[488px] md:text-[16px] md:leading-6 lg:text-[18px] lg:leading-[27px]">
            With Mochi connected, Claude becomes an AI consultant that knows your specific team, leads, and numbers.
          </p>
        </div>
        {BUBBLES.map((b) => (
          <QuestionBubble key={b.text} {...b} />
        ))}
      </div>
    </McpSection>
  );
}
