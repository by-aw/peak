import Link from "next/link";
import { countByState, DatabaseNotConnectedError } from "@/lib/cms/admin-queries";
import { requireEditor } from "@/lib/auth";
import { COLLECTIONS } from "@/components/admin/shell/collections";
import { DbNotice } from "@/components/admin/shell/db-notice";
import { Badge } from "@/components/admin/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/card";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  await requireEditor();
  let counts;
  try {
    counts = await Promise.all(COLLECTIONS.map((c) => countByState(c.id)));
  } catch (e) {
    if (e instanceof DatabaseNotConnectedError) return <DbNotice />;
    throw e;
  }
  return (
    <div>
      <h1 className="text-2xl font-semibold">What would you like to edit?</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {COLLECTIONS.map((c, i) => (
          <Link key={c.id} href={`/admin/${c.id}`} className="rounded-xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50">
            <Card className="h-full transition-colors hover:border-primary/50">
              <CardHeader>
                <CardTitle className="text-lg">{c.label}</CardTitle>
                <CardDescription>{c.blurb}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Badge className="border-transparent bg-green-100 text-green-800">{counts[i].published} published</Badge>
                <Badge variant="secondary">{counts[i].draft} drafts</Badge>
                <Badge className="border-transparent bg-blue-100 text-blue-800">{counts[i].scheduled} scheduled</Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
