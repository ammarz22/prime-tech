import { Check } from "lucide-react";
import { getHighlights } from "@/lib/data/product-specs";

/** Key-feature bullets for a product, derived from the same verified full
 * spec data (never a separately maintained, driftable list). */
export function ProductHighlights({ slug }: { slug: string }) {
  const highlights = getHighlights(slug);
  if (highlights.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
      {highlights.map((highlight) => (
        <div key={highlight} className="flex items-start gap-2 rounded-xl border border-ink/8 bg-paper-soft p-3.5">
          <Check className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={2} />
          <span className="text-sm text-ink/75">{highlight}</span>
        </div>
      ))}
    </div>
  );
}
