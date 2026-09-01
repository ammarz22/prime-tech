import { cn } from "@/lib/utils";
import type { Availability } from "@/types/database";

const CONFIG: Record<Availability, { label: string; className: string }> = {
  in_stock: { label: "In Stock", className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  out_of_stock: { label: "Out of Stock", className: "bg-red-500/10 text-red-600 dark:text-red-400" },
  available_on_request: {
    label: "Available on Request",
    className: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  coming_soon: { label: "Coming Soon", className: "bg-neutral-500/10 text-neutral-500" },
};

export function AvailabilityBadge({ status, className }: { status: Availability; className?: string }) {
  const config = CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium",
        config.className,
        className,
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          status === "in_stock" && "bg-emerald-500",
          status === "out_of_stock" && "bg-red-500",
          status === "available_on_request" && "bg-amber-500",
          status === "coming_soon" && "bg-neutral-400",
        )}
        aria-hidden
      />
      {config.label}
    </span>
  );
}

export function availabilityLabel(status: Availability): string {
  return CONFIG[status].label;
}

export function availabilityCta(status: Availability): string {
  switch (status) {
    case "in_stock":
      return "Enquire on WhatsApp";
    case "out_of_stock":
      return "Ask About Availability on WhatsApp";
    case "available_on_request":
      return "Enquire on WhatsApp";
    case "coming_soon":
      return "Notify Me";
  }
}
