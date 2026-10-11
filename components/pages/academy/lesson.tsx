import Image from "next/image";
import { interFeatures } from "@/components/shared/inter-features";
import type { AcademyFile, AcademyModule } from "@/lib/academy";
import { ChevronLeft, ChevronRight, Clock, Play } from "./icons";

/**
 * Right column of the Framer academy template: video frame, "Lesson <order> / <lessons in module>" counter, title,
 * description and the Previous / Next Lesson buttons. As on live, the frame is a static thumbnail with a play badge
 * (its "Dashboard Overview" label is template copy, the duration is the lesson's), and the buttons do nothing.
 */
export function AcademyLesson({ lesson, module }: { lesson: AcademyFile; module: AcademyModule | null }) {
  return (
    <div className="flex w-full flex-col items-center gap-12">
      <div className="flex w-full max-w-[1000px] flex-col items-start gap-12 overflow-hidden pl-12">
        <div className="relative aspect-[1.77778] w-full overflow-hidden rounded-[12px]">
          <Image
            src="/framer/3yN0WrSObwFuSNzTIm9uKys8hlQ.png"
            alt=""
            fill
            preload
            sizes="(min-width: 810px) 644px, calc(100vw - 80px)"
            className="rounded-[12px] object-fill"
          />
          <div className="absolute top-[calc(50.0539%-50px)] left-[calc(50%-50px)] size-[100px]">
            <div className="absolute top-[calc(50%-58px)] left-[calc(50%-58px)] size-[116px] overflow-hidden rounded-full bg-[#ffffff03] backdrop-blur-[2px]" />
            <div className="absolute top-[calc(50%-50px)] left-[calc(50%-50px)] size-[100px] overflow-hidden rounded-full bg-white shadow-[0_0_0_8px_#0000000d,0_4px_16px_#e9e0ff,0_4px_16px_#ab86ff52] after:pointer-events-none after:absolute after:inset-0 after:rounded-full after:border after:border-[#e0e0e0]">
              <Play />
            </div>
          </div>
          <div className="absolute top-[73%] left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-[16px] bg-[#3d3d3d] px-6 py-2 after:pointer-events-none after:absolute after:inset-0 after:rounded-[16px] after:border after:border-[#ffffff40]">
            <p className="text-[14px] leading-[20px] font-semibold whitespace-pre text-white">Dashboard Overview</p>
            <div className="relative flex items-center justify-center gap-1 px-4 pt-1 after:pointer-events-none after:absolute after:inset-0 after:border-t after:border-[#ffffff26]">
              <Clock />
              <p className={`text-[14px] leading-[20px] font-semibold whitespace-pre text-white ${interFeatures}`}>{lesson.duration}</p>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start bg-white">
          <div className="flex w-full flex-col items-start">
            <p className={`flex items-center justify-center gap-1.5 pb-3 text-[14px] leading-[20px] font-medium text-purple-500 ${interFeatures}`}>
              <span>Lesson</span>
              <span className="flex items-center justify-center gap-0.5 overflow-clip">
                <span>{lesson.order}</span>
                <span>/</span>
                <span>{module?.lessonCount ?? ""}</span>
              </span>
            </p>
            <h1 className="w-full font-display text-[28px] leading-[32px] font-semibold tracking-[0.48px] whitespace-pre-wrap [word-break:break-word] text-ink-3 md:text-[36px] md:leading-[54px] md:tracking-[0.6px]">
              {lesson.title}
            </h1>
          </div>
          <div className="flex w-full items-center gap-2 pt-6">
            <div
              className={`min-w-0 flex-1 text-[16px] leading-[24px] font-normal whitespace-pre-wrap [word-break:break-word] text-[#383840] ${interFeatures} [&_a]:text-purple-500 [&_a]:underline [&_li]:ml-5 [&_ol]:list-decimal [&_strong]:font-bold [&_ul]:list-disc [&>*:not(:first-child)]:mt-4`}
              dangerouslySetInnerHTML={{ __html: lesson.description }}
            />
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-4 pl-12">
        <div className="flex w-full items-start gap-3">
          <button
            type="button"
            className="flex min-w-0 flex-1 items-center justify-center gap-1 overflow-hidden rounded-[10px] bg-white px-3 py-2.5 shadow-[0_0_0_1px_#122b6914,0_1px_2px_#122b6914,0_2px_6px_#122b690a]"
          >
            <ChevronLeft />
            <span className="px-1 text-[14px] leading-[18px] font-medium whitespace-pre text-gray-500">Previous</span>
          </button>
          <button
            type="button"
            className="flex min-w-0 flex-1 items-center justify-center gap-1 overflow-hidden rounded-[10px] bg-purple-500 px-3 py-2.5 shadow-[0_0_0_1px_#122b6914,0_1px_2px_#122b6914,0_2px_6px_#122b690a]"
          >
            <span className="px-1 text-[14px] leading-[18px] font-medium whitespace-pre text-white">Next Lesson</span>
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
