import { isDraftMode } from "@/lib/cms/read";

/** Shown on public CMS pages while an editor is previewing drafts (draft mode on); renders nothing otherwise. */
export async function PreviewBanner({ path }: { path: string }) {
  if (!(await isDraftMode())) return null;
  return (
    <div className="fixed inset-x-0 bottom-4 z-[100] flex justify-center px-4">
      <div className="flex items-center gap-3 rounded-full bg-black px-4 py-2 text-sm text-white shadow-lg">
        <span>Previewing drafts</span>
        <a href={`/api/admin/preview/exit?to=${encodeURIComponent(path)}`} className="font-semibold underline underline-offset-2">
          Exit preview
        </a>
      </div>
    </div>
  );
}
