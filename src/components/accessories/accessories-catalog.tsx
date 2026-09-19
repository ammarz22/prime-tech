"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LayoutGrid, Smartphone, Zap, Cable, BatteryCharging, Headphones, Plug, Package } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImagePending } from "@/components/product/image-pending";
import { ProductPrice } from "@/components/product/product-price";
import { getDisplayPrice } from "@/lib/utils/pricing";
import { formatLKR } from "@/components/product/product-price";
import { cardImageUrl } from "@/lib/utils/card-image";
import { cn } from "@/lib/utils";
import type { ProductWithRelations } from "@/types/database";

type AccessoryCategory = "Cases" | "Chargers" | "Cables" | "Power Banks" | "Audio" | "Adapters" | "Others";

const CATEGORIES: { label: AccessoryCategory; icon: typeof Smartphone }[] = [
  { label: "Cases", icon: Smartphone },
  { label: "Chargers", icon: Zap },
  { label: "Cables", icon: Cable },
  { label: "Power Banks", icon: BatteryCharging },
  { label: "Audio", icon: Headphones },
  { label: "Adapters", icon: Plug },
  { label: "Others", icon: Package },
];

const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

/**
 * Derives a real category from what the product actually is — no fabricated
 * per-product tagging, just keyword matching against the real name. A
 * product this doesn't recognise falls into "Others" rather than being
 * force-fit somewhere wrong.
 */
function deriveCategory(name: string): AccessoryCategory {
  const n = name.toLowerCase();
  if (n.includes("case")) return "Cases";
  if (n.includes("cable")) return "Cables";
  if (n.includes("power bank")) return "Power Banks";
  if (n.includes("adapter")) return "Adapters";
  if (n.includes("charger") || n.includes("charging")) return "Chargers";
  if (n.includes("buds") || n.includes("airpods") || n.includes("headphone") || n.includes("earphone")) return "Audio";
  return "Others";
}

export function AccessoriesCatalog({ products }: { products: ProductWithRelations[] }) {
  const enriched = useMemo(
    () =>
      products.map((product) => ({
        product,
        category: deriveCategory(product.name),
        brand: product.brand?.name ?? "Others",
        displayPrice: getDisplayPrice(product),
      })),
    [products],
  );

  const realBrands = useMemo(
    () => Array.from(new Set(enriched.map((p) => p.brand))).sort(),
    [enriched],
  );

  const priceCeiling = useMemo(() => {
    const prices = enriched.map((p) => p.displayPrice.price).filter((p): p is number => p != null);
    if (prices.length === 0) return 100000;
    return Math.max(...prices);
  }, [enriched]);

  const [activeCategories, setActiveCategories] = useState<AccessoryCategory[]>([]);
  const [activeBrands, setActiveBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(priceCeiling);
  const [sort, setSort] = useState("latest");

  const hasActiveFilter = activeCategories.length > 0 || activeBrands.length > 0 || maxPrice < priceCeiling;

  function toggleCategory(category: AccessoryCategory) {
    setActiveCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    );
  }

  function toggleBrand(brand: string) {
    setActiveBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]));
  }

  function clearAll() {
    setActiveCategories([]);
    setActiveBrands([]);
    setMaxPrice(priceCeiling);
  }

  const filtered = useMemo(() => {
    let list = enriched.filter((p) => {
      if (activeCategories.length > 0 && !activeCategories.includes(p.category)) return false;
      if (activeBrands.length > 0 && !activeBrands.includes(p.brand)) return false;
      if (p.displayPrice.price != null && p.displayPrice.price > maxPrice) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      if (sort === "price_asc") return (a.displayPrice.price ?? Infinity) - (b.displayPrice.price ?? Infinity);
      if (sort === "price_desc") return (b.displayPrice.price ?? -Infinity) - (a.displayPrice.price ?? -Infinity);
      return new Date(b.product.created_at).getTime() - new Date(a.product.created_at).getTime();
    });

    return list;
  }, [enriched, activeCategories, activeBrands, maxPrice, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10 xl:px-16">
      {/* Quick-jump category tabs — single-tap shortcuts into the same
          category filter the sidebar checkboxes control. */}
      <div className="overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto flex w-max gap-2">
        <button
          type="button"
          onClick={() => setActiveCategories([])}
          className={cn(
            "flex shrink-0 flex-col items-center gap-1.5 rounded-2xl border px-5 py-3 text-xs font-medium transition",
            activeCategories.length === 0
              ? "border-brand/40 bg-brand/5 text-brand"
              : "border-ink/8 bg-paper-soft text-ink/60 hover:border-ink/15 hover:text-ink",
          )}
        >
          <LayoutGrid className="size-4.5" strokeWidth={1.5} />
          All Accessories
        </button>
        {CATEGORIES.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            onClick={() => setActiveCategories([label])}
            className={cn(
              "flex shrink-0 flex-col items-center gap-1.5 rounded-2xl border px-5 py-3 text-xs font-medium transition",
              activeCategories.length === 1 && activeCategories[0] === label
                ? "border-brand/40 bg-brand/5 text-brand"
                : "border-ink/8 bg-paper-soft text-ink/60 hover:border-ink/15 hover:text-ink",
            )}
          >
            <Icon className="size-4.5" strokeWidth={1.5} />
            {label}
          </button>
        ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr]">
        {/* Filter sidebar */}
        <aside className="space-y-8">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-ink">Filter</p>
            {hasActiveFilter && (
              <button type="button" onClick={clearAll} className="text-xs font-medium text-brand hover:text-brand/80">
                Clear all
              </button>
            )}
          </div>

          {realBrands.length > 0 && (
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-ink/50">Brand</p>
              <ul className="space-y-2.5">
                {realBrands.map((brand) => (
                  <li key={brand}>
                    <label className="flex items-center gap-2.5 text-sm text-ink/75">
                      <Checkbox checked={activeBrands.includes(brand)} onCheckedChange={() => toggleBrand(brand)} />
                      {brand}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-ink/50">Category</p>
            <ul className="space-y-2.5">
              {CATEGORIES.map(({ label }) => (
                <li key={label}>
                  <label className="flex items-center gap-2.5 text-sm text-ink/75">
                    <Checkbox
                      checked={activeCategories.includes(label)}
                      onCheckedChange={() => toggleCategory(label)}
                    />
                    {label}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-ink/50">Price Range</p>
            <input
              type="range"
              min={0}
              max={priceCeiling}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-brand"
            />
            <p className="mt-1 text-xs text-ink/50">
              LKR 0 &ndash; {formatLKR(maxPrice)}
            </p>
          </div>
        </aside>

        {/* Product grid */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-ink/55">
              Showing {filtered.length} product{filtered.length === 1 ? "" : "s"}
            </p>
            <Select value={sort} onValueChange={(v) => v && setSort(v)}>
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
              <p className="text-sm text-ink/50">No accessories match this filter yet.</p>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map(({ product, brand, displayPrice }) => {
                const original = product.images.find((img) => img.is_primary) ?? product.images[0];
                const imageUrl = cardImageUrl(product.slug, original?.url);
                const href =
                  product.product_group === "APPLE"
                    ? `/products/apple/product/${product.slug}`
                    : `/products/${product.slug}`;

                return (
                  <Link
                    key={product.id}
                    href={href}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-ink/8 bg-white transition hover:border-ink/20 hover:shadow-[0_16px_40px_-20px_rgba(0,0,0,0.2)]"
                  >
                    {imageUrl ? (
                      <div className="relative aspect-square w-full bg-paper-soft">
                        <Image
                          src={imageUrl}
                          alt={product.name}
                          fill
                          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
                          className="object-contain p-5 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <ImagePending className="aspect-square rounded-none border-0" />
                    )}
                    <div className="flex items-start justify-between gap-2 p-4">
                      <div className="min-w-0">
                        <p className="text-xs text-ink/45">{brand}</p>
                        <p className="truncate text-sm font-semibold text-ink">{product.name}</p>
                        <ProductPrice
                          price={displayPrice.price}
                          label={displayPrice.label}
                          size="sm"
                          className="mt-0.5"
                        />
                      </div>
                      <span className="mt-4 flex size-8 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink/50 transition group-hover:border-brand group-hover:bg-brand group-hover:text-white">
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
