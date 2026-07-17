import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-3 text-forest-700">
        <Loader2 className="h-8 w-8 animate-spin" aria-hidden />
        <span className="text-sm font-medium">Loading…</span>
      </div>
    </div>
  );
}
