"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { ProductPrice } from "@/components/product/product-price";
import { AvailabilityBadge } from "@/components/product/availability-badge";
import { cn } from "@/lib/utils";
import { getDisplayPrice } from "@/lib/utils/pricing";
import { getFullSpecs } from "@/lib/data/product-specs";
import type { ProductWithRelations } from "@/types/database";

const MAX_COMPARE = 3;

const ROWS: { label: string; get: (p: ProductWithRelations) => string }[] = [
  { label: "Chip", get: (p) => Array.from(new Set(p.variants.map((v) => v.chip).filter(Boolean))).join(", ") || "—" },
  { label: "Storage", get: (p) => Array.from(new Set(p.variants.map((v) => v.storage).filter(Boolean))).join(", ") || "—" },
  { label: "Memory", get: (p) => Array.from(new Set(p.variants.map((v) => v.memory).filter(Boolean))).join(", ") || "—" },
  { label: "Screen Size", get: (p) => Array.from(new Set(p.variants.map((v) => v.screen_size).filter(Boolean))).join(", ") || "—" },
  { label: "Colours", get: (p) => Array.from(new Set(p.variants.map((v) => v.colour).filter(Boolean))).join(", ") || "—" },
];

/** Verified-spec comparison rows, sourced from the same `getFullSpecs()`
 * data that already powers highlight chips — no new facts, just surfaced
 * differently. Battery matches either a group exactly labelled "Battery"
 * (Samsung) or just the "Battery" row within Apple's combined "Design &
 * Battery" group — not the whole group, which would otherwise pull in
 * unrelated Dimensions/Weight rows under a "Battery" heading. */
const SPEC_BUCKETS: { label: string; matches: (groupLabel: string, rowLabel: string) => boolean }[] = [
  { label: "Display", matches: (g) => g === "Display" },
  { label: "Camera", matches: (g) => g === "Camera" },
  { label: "Battery", matches: (g, r) => g === "Battery" || r === "Battery" },
];

function specRows(compared: ProductWithRelations[]) {
  const groups = compared.map((p) => getFullSpecs(p.slug));
  if (groups.every((g) => !g)) return [];

  return SPEC_BUCKETS.map((bucket) => {
    const subLabels = new Set<string>();
    groups.forEach((productGroups) => {
      productGroups?.forEach((g) => g.rows.forEach((r) => bucket.matches(g.label, r.label) && subLabels.add(r.label)));
    });
    if (subLabels.size === 0) return null;

    return {
      groupLabel: bucket.label,
      rows: Array.from(subLabels).map((subLabel) => ({
        label: subLabel,
        get: (p: ProductWithRelations) => {
          const productGroups = getFullSpecs(p.slug);
          const value = productGroups
            ?.flatMap((g) => g.rows.map((r) => ({ groupLabel: g.label, ...r })))
            .find((r) => bucket.matches(r.groupLabel, r.label) && r.label === subLabel)?.value;
          return value ?? "—";
        },
      })),
    };
  }).filter((g): g is { groupLabel: string; rows: { label: string; get: (p: ProductWithRelations) => string }[] } => g !== null);
}

/**
 * Generic comparison tool for any brand/category grouping (Apple, Samsung).
 * Comparisons are restricted to a single category at a time — comparing an
 * iPhone against a MacBook isn't a useful comparison, so picking a product
 * from one category disables products from every other category until the
 * selection is cleared.
 */
export function ComparisonTool({
  products,
  label = "products",
  initialSelectedId,
}: {
  products: ProductWithRelations[];
  label?: string;
  initialSelectedId?: string;
}) {
  const [selected, setSelected] = useState<string[]>(initialSelectedId ? [initialSelectedId] : []);

  const compared = products.filter((p) => selected.includes(p.id));
  const activeCategoryId = compared[0]?.category_id ?? null;
  const groups = specRows(compared);

  function toggle(id: string) {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((p) => p !== id);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, id];
    });
  }

  return (
    <div>
      <p className="text-sm text-ink/55">
        Select up to {MAX_COMPARE} {label} to compare ({selected.length}/{MAX_COMPARE} selected).
        {activeCategoryId && " Only products in the same category can be compared together."}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
        {products.map((p) => {
          const active = selected.includes(p.id);
          const wrongCategory = activeCategoryId !== null && p.category_id !== activeCategoryId;
          const disabled = !active && (selected.length >= MAX_COMPARE || wrongCategory);
          return (
            <button
              key={p.id}
              onClick={() => toggle(p.id)}
              disabled={disabled}
              title={wrongCategory ? "Comparisons are limited to one category at a time" : undefined}
              className={cn(
                "rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition",
                active ? "border-brand bg-brand/5 text-brand" : "border-ink/10 text-ink/70 hover:border-ink/25",
                disabled && "opacity-40",
              )}
            >
              {p.name}
            </button>
          );
        })}
      </div>

      {compared.length > 0 && (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[560px] border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="w-32" />
                {compared.map((p) => {
                  const displayPrice = getDisplayPrice(p);
                  const thumbnail = p.images.find((img) => img.is_primary)?.url ?? p.images[0]?.url;
                  return (
                    <th key={p.id} className="border-b border-ink/8 px-4 pb-4 text-left align-bottom">
                      <div className="flex items-start justify-between gap-2">
                        {thumbnail ? (
                          <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-paper-soft">
                            <Image src={thumbnail} alt="" fill sizes="48px" className="object-cover" />
                          </div>
                        ) : (
                          <div className="size-12 shrink-0 rounded-lg bg-paper-soft" />
                        )}
                        <button onClick={() => toggle(p.id)} aria-label={`Remove ${p.name}`} className="text-ink/30 hover:text-ink">
                          <X className="size-3.5" />
                        </button>
                      </div>
                      <p className="mt-2 font-semibold">{p.name}</p>
                      <div className="mt-1.5">
                        <ProductPrice price={displayPrice.price} label={displayPrice.label} size="sm" />
                        {displayPrice.isRange && <p className="mt-0.5 text-[11px] text-ink/40">Price varies by configuration</p>}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label}>
                  <td className="border-b border-ink/6 py-3 pr-4 text-sm font-medium text-ink/50">{row.label}</td>
                  {compared.map((p) => (
                    <td key={p.id} className="border-b border-ink/6 px-4 py-3 text-sm">
                      {row.get(p)}
                    </td>
                  ))}
                </tr>
              ))}
              {groups.map((group) => (
                <Fragment key={group.groupLabel}>
                  <tr>
                    <td
                      colSpan={compared.length + 1}
                      className="border-b border-ink/6 bg-paper-soft px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ink/40"
                    >
                      {group.groupLabel}
                    </td>
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={row.label}>
                      <td className="border-b border-ink/6 py-3 pr-4 text-sm font-medium text-ink/50">{row.label}</td>
                      {compared.map((p) => (
                        <td key={p.id} className="border-b border-ink/6 px-4 py-3 text-sm">
                          {row.get(p)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}
              <tr>
                <td className="py-3 pr-4 text-sm font-medium text-ink/50">Availability</td>
                {compared.map((p) => (
                  <td key={p.id} className="px-4 py-3">
                    <AvailabilityBadge status={p.variants[0]?.availability ?? "coming_soon"} />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {compared.length === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed border-ink/12 py-12 text-center text-sm text-ink/45">
          Select products above to see them compared side by side.
        </div>
      )}
    </div>
  );
}
