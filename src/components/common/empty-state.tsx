import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon: Icon = Inbox, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink/10 px-6 py-16 text-center",
        className,
      )}
    >
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-ink/5">
        <Icon className="size-5 text-ink/40" aria-hidden />
      </div>
      <p className="text-base font-medium text-ink">{title}</p>
      {description && <p className="mt-1.5 max-w-sm text-sm text-ink/55">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
