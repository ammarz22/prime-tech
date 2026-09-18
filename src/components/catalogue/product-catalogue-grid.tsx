"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Cpu, Camera, Smartphone, BatteryCharging, Sparkles, RotateCcw } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImagePending } from "@/components/product/image-pending";
import { ProductPrice, formatLKR } from "@/components/product/product-price";
import { getDisplayPrice } from "@/lib/utils/pricing";
import { cn } from "@/lib/utils";
import type { ProductWithRelations } from "@/types/database";

const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
] as const;

/** Groups a phone by generation ("iPhone 18 Series", "Galaxy S26 Series")
 * the way the reference design's "Model" filter does; every other
 * Apple/Samsung category has no such multi-SKU-per-generation issue, so
 * its products are each their own "model" — no per-category config
 * required. */
function deriveModelGroup(productName: string): string {
  const iphone = productName.match(/^iPhone (\d+)/);
  if (iphone) return `iPhone ${iphone[1]} Series`;
  if (productName === "iPhone Duo") return "iPhone 18 Series";
  const galaxyS = productName.match(/^Galaxy S(\d+)/);
  if (galaxyS) return `Galaxy S${galaxyS[1]} Series`;
  return productName;
}

/** Picks an icon for a spec line by keyword — the spec text itself always
 * comes straight from the product's real `short_description`, never
 * invented; this only chooses how to illustrate it. */
function specIcon(spec: string) {
  const s = spec.toLowerCase();
  if (s.includes("chip")) return Cpu;
  if (s.includes("camera")) return Camera;
  if (s.includes("battery") || s.includes("hr")) return BatteryCharging;
  if (s.includes("display") || /\d(\.\d)?["“]/.test(spec)) return Smartphone;
  return Sparkles;
}

/**
 * The reusable catalogue grid — sidebar filters (Model / Storage / Colour /
 * Price, each shown only when the current category's real data has more
 * than one option), sort, live count and the product grid itself. Works
 * for any `ProductWithRelations[]`, so the same component serves every
 * Apple category today and Samsung/Accessories catalogues later — nothing
 * here is Apple-specific.
 */
/** Mirrors the real routing split used everywhere else on the site: Apple
 * products get their own PDP nesting, everything else is flat under
 * `/products/[slug]`. A function prop can't cross the server/client
 * boundary, so this is computed here rather than passed in. */
function productHref(product: ProductWithRelations) {
  return product.product_group === "APPLE"
    ? `/products/apple/product/${product.slug}`
    : `/products/${product.slug}`;
}

export function ProductCatalogueGrid({ products }: { products: ProductWithRelations[] }) {
  const enriched = useMemo(
    () =>
      products.map((product) => ({
        product,
        model: deriveModelGroup(product.name),
        specs: (product.short_description ?? "")
          .split("·")
          .map((s) => s.trim())
          .filter(Boolean)
          .slice(0, 3),
        displayPrice: getDisplayPrice(product),
      })),
    [products],
  );

  const models = useMemo(() => Array.from(new Set(enriched.map((p) => p.model))), [enriched]);
  const storages = useMemo(
    () => Array.from(new Set(enriched.flatMap((p) => p.product.variants.map((v) => v.storage).filter((s): s is string => !!s)))),
    [enriched],
  );
  const colours = useMemo(
    () => Array.from(new Set(enriched.flatMap((p) => p.product.variants.map((v) => v.colour).filter((c): c is string => !!c)))),
    [enriched],
  );
  const priceCeiling = useMemo(() => {
    const prices = enriched.map((p) => p.displayPrice.price).filter((p): p is number => p != null);
    return prices.length > 0 ? Math.max(...prices) : 0;
  }, [enriched]);

  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedStorages, setSelectedStorages] = useState<string[]>([]);
  const [selectedColours, setSelectedColours] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(priceCeiling);
  const [sort, setSort] = useState<(typeof SORT_OPTIONS)[number]["value"]>("latest");
  const [priceTouched, setPriceTouched] = useState(false);

  const effectiveMaxPrice = priceTouched ? maxPrice : priceCeiling;

  function toggle(list: string[], setList: (v: string[]) => void, value: string) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  const hasActiveFilter =
    selectedModels.length > 0 || selectedStorages.length > 0 || selectedColours.length > 0 || priceTouched;

  function clearFilters() {
    setSelectedModels([]);
    setSelectedStorages([]);
    setSelectedColours([]);
    setPriceTouched(false);
  }

  const filtered = useMemo(() => {
    let list = enriched.filter(({ model, product, displayPrice }) => {
      if (selectedModels.length > 0 && !selectedModels.includes(model)) return false;
      if (selectedStorages.length > 0 && !product.variants.some((v) => v.storage && selectedStorages.includes(v.storage)))
        return false;
      if (selectedColours.length > 0 && !product.variants.some((v) => v.colour && selectedColours.includes(v.colour)))
        return false;
      if (displayPrice.price != null && displayPrice.price > effectiveMaxPrice) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      if (sort === "price_asc") return (a.displayPrice.price ?? Infinity) - (b.displayPrice.price ?? Infinity);
      if (sort === "price_desc") return (b.displayPrice.price ?? -Infinity) - (a.displayPrice.price ?? -Infinity);
      return new Date(b.product.created_at).getTime() - new Date(a.product.created_at).getTime();
    });

    return list;
  }, [enriched, selectedModels, selectedStorages, selectedColours, effectiveMaxPrice, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10 xl:px-16">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="space-y-8">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-ink">Filter</p>
            {hasActiveFilter && (
              <button
                type="button"
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs font-medium text-brand hover:text-brand/80"
              >
                <RotateCcw className="size-3" />
                Clear Filters
              </button>
            )}
          </div>

          {models.length > 1 && (
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-ink/50">Model</p>
              <ul className="space-y-2.5">
                {models.map((model) => (
                  <li key={model}>
                    <label className="flex items-center gap-2.5 text-sm text-ink/75">
                      <Checkbox
                        checked={selectedModels.includes(model)}
                        onCheckedChange={() => toggle(selectedModels, setSelectedModels, model)}
                      />
                      {model}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {storages.length > 1 && (
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-ink/50">Storage</p>
              <ul className="space-y-2.5">
                {storages.map((storage) => (
                  <li key={storage}>
                    <label className="flex items-center gap-2.5 text-sm text-ink/75">
                      <Checkbox
                        checked={selectedStorages.includes(storage)}
                        onCheckedChange={() => toggle(selectedStorages, setSelectedStorages, storage)}
                      />
                      {storage}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {colours.length > 1 && (
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-ink/50">Colour</p>
              <div className="flex flex-wrap gap-2">
                {colours.map((colour) => {
                  const active = selectedColours.includes(colour);
                  return (
                    <button
                      key={colour}
                      type="button"
                      title={colour}
                      onClick={() => toggle(selectedColours, setSelectedColours, colour)}
                      className={cn(
                        "size-7 rounded-full border-2 transition",
                        active ? "border-brand" : "border-transparent hover:border-ink/20",
                      )}
                    >
                      <span
                        className="block size-full rounded-full border border-ink/10"
                        style={{ background: colourSwatch(colour) }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {priceCeiling > 0 && (
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-ink/50">Price Range</p>
              <input
                type="range"
                min={0}
                max={priceCeiling}
                step={500}
                value={effectiveMaxPrice}
                onChange={(e) => {
                  setPriceTouched(true);
                  setMaxPrice(Number(e.target.value));
                }}
                className="w-full accent-brand"
              />
              <p className="mt-1 text-xs text-ink/50">LKR 0 &ndash; {formatLKR(effectiveMaxPrice)}</p>
            </div>
          )}
        </aside>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-ink/55">
              Showing {filtered.length} product{filtered.length === 1 ? "" : "s"}
            </p>
            <Select value={sort} onValueChange={(v) => v && setSort(v as (typeof SORT_OPTIONS)[number]["value"])}>
              <SelectTrigger className="w-[190px]">
                <SelectValue placeholder="Sort">
                  {(value: string) => `Sort by: ${SORT_OPTIONS.find((o) => o.value === value)?.label ?? value}`}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {filtered.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-dashed border-ink/15 py-16 text-center">
              <p className="text-sm text-ink/50">No products match this filter yet.</p>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map(({ product, specs, displayPrice }) => {
                const primaryImage = product.images.find((img) => img.is_primary) ?? product.images[0];

                return (
                  <Link
                    key={product.id}
                    href={productHref(product)}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/8 bg-white transition hover:border-ink/20 hover:shadow-[0_16px_40px_-20px_rgba(0,0,0,0.2)]"
                  >
                    {primaryImage ? (
                      <div className="relative aspect-square w-full bg-paper-soft">
                        {product.new_arrival && (
                          <span className="absolute left-3 top-3 z-10 rounded-full bg-brand px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                            New
                          </span>
                        )}
                        <Image
                          src={primaryImage.url}
                          alt={product.name}
                          fill
                          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
                          className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <ImagePending className="aspect-square rounded-none border-0" />
                    )}

                    <div className="flex flex-1 flex-col gap-2 p-4">
                      <p className="text-sm font-semibold text-ink">{product.name}</p>
                      <ProductPrice price={displayPrice.price} label={displayPrice.label} size="sm" />

                      {specs.length > 0 && (
                        <ul className="mt-1 space-y-1">
                          {specs.map((spec) => {
                            const Icon = specIcon(spec);
                            return (
                              <li key={spec} className="flex items-center gap-1.5 text-xs text-ink/50">
                                <Icon className="size-3.5 shrink-0" strokeWidth={1.5} />
                                <span className="truncate">{spec}</span>
                              </li>
                            );
                          })}
                        </ul>
                      )}

                      <span className="mt-auto flex size-8 shrink-0 items-center justify-center self-end rounded-full border border-ink/15 text-ink/50 transition group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                        <ArrowRight className="size-3.5" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** Best-effort swatch colour for a real variant colour name — cosmetic
 * only (which dot to paint), not a claim about anything. Falls back to a
 * neutral grey for a name not in the map rather than guessing wrong. */
function colourSwatch(name: string): string {
  const map: Record<string, string> = {
    black: "#1d1d1f",
    white: "#f5f5f7",
    silver: "#e3e4e5",
    "space black": "#2b2b2d",
    "space gray": "#5f5f60",
    "space grey": "#5f5f60",
    "mist blue": "#a9c2d1",
    sage: "#a7b596",
    lavender: "#cfc6e0",
    "deep blue": "#2b3a55",
    "cosmic orange": "#c9622e",
    "soft pink": "#f0c9cf",
    "rose gold": "#e6c2c2",
    gold: "#e7d2a7",
    graphite: "#54524f",
    starlight: "#f0e6d3",
    midnight: "#1e2130",
    "sky blue": "#bcd6e8",
    "pink gold": "#e9c7c0",
    "cobalt violet": "#5c4a8a",
    "silver-shadow": "#c6c7c9",
    "jet black": "#0a0a0a",
    natural: "#c9bfae",
    slate: "#54524f",
    titanium: "#8a8a86",
  };
  return map[name.toLowerCase()] ?? "#9ca3af";
}
