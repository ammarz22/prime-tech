import type { ProductVariant } from "@/types/database";

export function ProductSpecifications({ variant }: { variant?: ProductVariant }) {
  const rows: { label: string; value: string }[] = [];

  if (variant?.chip) rows.push({ label: "Chip", value: variant.chip });
  if (variant?.screen_size) rows.push({ label: "Screen Size", value: variant.screen_size });
  if (variant?.storage) rows.push({ label: "Storage", value: variant.storage });
  if (variant?.memory) rows.push({ label: "Memory", value: variant.memory });
  if (variant?.colour) rows.push({ label: "Colour Options", value: variant.colour });
  if (variant?.sku) rows.push({ label: "SKU", value: variant.sku });

  if (rows.length === 0) return null;

  return (
    <div className="rounded-2xl border border-ink/8">
      <div className="border-b border-ink/8 px-5 py-3">
        <p className="text-sm font-medium">Specifications</p>
      </div>
      <dl className="divide-y divide-ink/6">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4 px-5 py-3 text-sm">
            <dt className="text-ink/50">{row.label}</dt>
            <dd className="text-right font-medium text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
