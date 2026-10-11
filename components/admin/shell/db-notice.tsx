import { Database } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/admin/ui/alert";

export function DbNotice() {
  return (
    <Alert role="status" className="border-amber-300 bg-amber-50 text-amber-900 *:data-[slot=alert-description]:text-amber-900/90">
      <Database />
      <AlertTitle>Database not connected yet</AlertTitle>
      <AlertDescription>Add Neon in Vercel → Storage (or set DATABASE_URL locally), then reload this page.</AlertDescription>
    </Alert>
  );
}
