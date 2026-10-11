export function DbNotice() {
  return (
    <div role="status" className="rounded-xl border border-amber-300 bg-amber-50 p-5 text-sm text-amber-900">
      <p className="font-semibold">Database not connected yet</p>
      <p className="mt-1">Add Neon in Vercel → Storage (or set DATABASE_URL locally), then reload this page.</p>
    </div>
  );
}
