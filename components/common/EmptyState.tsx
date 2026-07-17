import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";

export default function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-white/60 px-6 py-14 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-forest-50 text-forest-600">
        <Icon className="h-7 w-7" aria-hidden />
      </div>
      <h3 className="text-lg font-semibold text-forest-900">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm text-stone-600">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
