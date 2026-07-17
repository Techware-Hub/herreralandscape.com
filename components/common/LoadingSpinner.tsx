import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoadingSpinner({
  className,
  label = "Loading",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <span role="status" className={cn("inline-flex items-center gap-2", className)}>
      <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
      <span className="sr-only">{label}</span>
    </span>
  );
}
