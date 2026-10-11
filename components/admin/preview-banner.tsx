import { Eye } from "lucide-react";
import { isDraftMode } from "@/lib/cms/read";
import { Button } from "@/components/admin/ui/button";

/** Shown on public CMS pages while an editor is previewing drafts (draft mode on); renders nothing otherwise. */
export async function PreviewBanner({ path }: { path: string }) {
  if (!(await isDraftMode())) return null;
  return (
    <div className="fixed inset-x-0 bottom-4 z-[100] flex justify-center px-4">
      <div className="flex items-center gap-3 rounded-full bg-black py-1.5 pr-1.5 pl-4 text-sm text-white shadow-lg">
        <Eye aria-hidden className="size-4" />
        <span>Previewing drafts</span>
        <Button asChild size="sm" variant="secondary" className="rounded-full">
          <a href={`/api/admin/preview/exit?to=${encodeURIComponent(path)}`}>Exit preview</a>
        </Button>
      </div>
    </div>
  );
}
