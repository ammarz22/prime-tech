import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export function ErrorState({
  title = "Something went wrong",
  description = "Please try again in a moment.",
  className,
}: {
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-red-500/15 bg-red-500/5 px-6 py-16 text-center",
        className,
      )}
    >
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-red-500/10">
        <AlertTriangle className="size-5 text-red-500" aria-hidden />
      </div>
      <p className="text-base font-medium text-ink">{title}</p>
      <p className="mt-1.5 max-w-sm text-sm text-ink/55">{description}</p>
    </div>
  );
}
