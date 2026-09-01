import { cn } from "@/lib/utils";
import type { PriceLabel } from "@/types/database";

const LABEL_PREFIX: Record<PriceLabel, string> = {
  exact: "",
  starting_from: "Starting from",
  approx_market: "Approx. market price",
  on_request: "",
  coming_soon: "",
};

export function formatLKR(value: number) {
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function ProductPrice({
  price,
  label,
  className,
  size = "md",
}: {
  price: number | null;
  label: PriceLabel;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  if (label === "coming_soon") {
    return <span className={cn("font-medium text-ink/50", className)}>Coming Soon</span>;
  }
  if (label === "on_request" || price == null) {
    return <span className={cn("font-medium text-ink/70", className)}>Price on Request</span>;
  }

  const prefix = LABEL_PREFIX[label];
  return (
    <span className={cn("inline-flex flex-col", className)}>
      {prefix && <span className="text-xs text-ink/50">{prefix}</span>}
      <span
        className={cn(
          "font-semibold tabular-nums text-ink",
          size === "sm" && "text-sm",
          size === "md" && "text-base",
          size === "lg" && "text-2xl",
        )}
      >
        {formatLKR(price)}
      </span>
    </span>
  );
}
