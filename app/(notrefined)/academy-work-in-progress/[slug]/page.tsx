import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AcademyLesson } from "@/components/pages/academy/lesson";
import { academyMetadata } from "@/components/pages/academy/metadata";
import { AcademySideNav } from "@/components/pages/academy/side-nav";
import { getAcademyLesson, getAcademyModule, getAllAcademyLessons, getAllAcademySlugs } from "@/lib/academy";
import { PreviewBanner } from "@/components/admin/preview-banner";

type Props = { params: Promise<{ slug: string }> };

// Lessons published after the build render on first request (and are then cached); unknown slugs 404 via notFound().
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getAllAcademySlugs()).map((slug) => ({ slug }));
}

/** Live lesson pages keep the site defaults ("The Mochi App" and the site description); only canonical / og:url are per page. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lesson = await getAcademyLesson(slug);
  if (!lesson) return {};
  return academyMetadata(`/academy-work-in-progress/${slug}`);
}

/**
 * /academy-work-in-progress/<slug>: the Framer "Lessons" CMS template. Side nav (320px) and lesson column side by side
 * inside 1012px from tablet up; stacked on phone (side nav first). 58px nav spacer, then 96px / 100px of padding.
 */
export default async function AcademyLessonPage({ params }: Props) {
  const { slug } = await params;
  const lesson = await getAcademyLesson(slug);
  if (!lesson) notFound();
  const lessons = await getAllAcademyLessons();
  return (
    <>
      <PreviewBanner path={`/academy-work-in-progress/${slug}`} />
      <div className="flex w-full flex-col items-center pt-[58px]">
        <div className="flex w-full flex-col items-center gap-4 px-4 pt-24 pb-[100px] md:px-8">
          <div className="flex w-full max-w-[1012px] flex-col items-start justify-between md:flex-row">
            <AcademySideNav lessons={lessons} current={slug} />
            <div className="flex w-full flex-col items-start md:w-px md:flex-1">
              <AcademyLesson lesson={lesson} module={getAcademyModule(lesson.module)} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
