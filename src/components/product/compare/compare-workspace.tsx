"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
  X,
  ArrowRight,
  MessageCircle,
  SquareCheckBig,
  Smartphone,
  Cpu,
  Camera,
  BatteryCharging,
  Ruler,
  Wifi,
  Volume2,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductPrice } from "@/components/product/product-price";
import { cn } from "@/lib/utils";
import { cardImageUrl } from "@/lib/utils/card-image";
import { getColourSwatch } from "@/lib/utils/colour-swatches";
import { getDisplayPrice } from "@/lib/utils/pricing";
import { getFullSpecs, type FullSpecGroup } from "@/lib/data/product-specs";
import type { ProductWithRelations } from "@/types/database";

const MAX_COMPARE = 3;

const GROUP_ORDER = [
  "Display",
  "Performance",
  "Camera",
  "Battery",
  "Design",
  "Connectivity",
  "Audio",
  "Dimensions",
  "What's in the Box",
] as const;

const GROUP_ICONS: Record<string, typeof Smartphone> = {
  Display: Smartphone,
  Performance: Cpu,
  Camera: Camera,
  Battery: BatteryCharging,
  Design: Ruler,
  Connectivity: Wifi,
  Audio: Volume2,
  Dimensions: Ruler,
  "What's in the Box": Package,
};

function productHref(product: ProductWithRelations) {
  return product.product_group === "APPLE"
    ? `/products/apple/product/${product.slug}`
    : `/products/${product.slug}`;
}

/** Case-only inconsistencies in how a variant's storage was entered
 * ("256GB" vs "256Gb") shouldn't read as two different capacities — this
 * normalizes the unit casing before it's ever deduped or displayed. Doesn't
 * touch the database, and doesn't merge genuinely different capacities. */
function normalizeStorage(label: string): string {
  return label.replace(/(\d+(?:\.\d+)?)\s*(gb|tb)/i, (_, n, unit) => `${n}${unit.toUpperCase()}`);
}

function uniqueValues(product: ProductWithRelations, key: "chip" | "storage" | "colour"): string[] {
  const values = product.variants.map((v) => v[key]).filter((v): v is string => Boolean(v));
  const normalized = key === "storage" ? values.map(normalizeStorage) : values;
  return Array.from(new Set(normalized));
}

function firstNumber(text: string): number | null {
  const m = text.match(/(\d+(?:\.\d+)?)/);
  return m ? parseFloat(m[1]) : null;
}

function findSpecValue(groups: FullSpecGroup[] | undefined, groupLabel: string, rowLabel?: string) {
  const group = groups?.find((g) => g.label === groupLabel);
  if (!group) return null;
  const row = rowLabel ? group.rows.find((r) => r.label === rowLabel) : group.rows[0];
  return row ?? group.rows[0] ?? null;
}

function storageGB(label: string): number {
  const n = firstNumber(label) ?? 0;
  return /tb/i.test(label) ? n * 1024 : n;
}

function storageRangeLabel(product: ProductWithRelations): string | null {
  const storages = uniqueValues(product, "storage");
  if (storages.length === 0) return null;
  const sorted = [...storages].sort((a, b) => storageGB(a) - storageGB(b));
  return sorted.length === 1 ? sorted[0] : `${sorted[0]} – ${sorted[sorted.length - 1]}`;
}

/** The three "at a glance" rows worth flagging a leader on — each backed by
 * a real, parseable number from the product's own data, never a subjective
 * call (Chip/Camera differ across products too, but "better" there isn't a
 * single number, so those rows are shown without a highlight). */
function computeLeaders(compared: ProductWithRelations[]) {
  const leaders: Record<"display" | "battery" | "storage", string | null> = {
    display: null,
    battery: null,
    storage: null,
  };
  if (compared.length < 2) return leaders;

  const displayVals = compared.map((p) => {
    const specs = getFullSpecs(p.slug);
    const value = findSpecValue(specs, "Display", "Size")?.value;
    return { id: p.id, n: value ? firstNumber(value) : null };
  });
  const batteryVals = compared.map((p) => {
    const specs = getFullSpecs(p.slug);
    const value = findSpecValue(specs, "Battery")?.value;
    return { id: p.id, n: value ? firstNumber(value) : null };
  });
  const storageVals = compared.map((p) => {
    const range = storageRangeLabel(p);
    const max = range ? storageGB(range.split("–").pop() ?? range) : null;
    return { id: p.id, n: max };
  });

  const pickLeader = (vals: { id: string; n: number | null }[]) => {
    const known = vals.filter((v): v is { id: string; n: number } => v.n != null);
    if (known.length < 2) return null;
    const max = Math.max(...known.map((v) => v.n));
    const withMax = known.filter((v) => v.n === max);
    return withMax.length === 1 ? withMax[0].id : null;
  };

  leaders.display = pickLeader(displayVals);
  leaders.battery = pickLeader(batteryVals);
  leaders.storage = pickLeader(storageVals);
  return leaders;
}

function decisionCopy(
  product: ProductWithRelations,
  compared: ProductWithRelations[],
  leaders: ReturnType<typeof computeLeaders>,
  categoryLabel: string,
) {
  if (compared.length < 2) {
    return {
      title: "A closer look.",
      body: `Add another ${categoryLabel} above to see how the ${product.name} compares.`,
    };
  }

  const leads: string[] = [];
  if (leaders.display === product.id) leads.push("our largest display");
  if (leaders.battery === product.id) leads.push("the longest battery life");
  if (leaders.storage === product.id) leads.push("the most storage");

  if (leads.length > 0) {
    const title = leaders.display === product.id ? "For the biggest display." : "For power users.";
    const body =
      leads.length === 1
        ? `Maximum performance, with ${leads[0]}.`
        : `Maximum performance, with ${leads.slice(0, -1).join(", ")} and ${leads[leads.length - 1]}.`;
    return { title, body };
  }

  const prices = compared.map((p) => getDisplayPrice(p).price).filter((p): p is number => p != null);
  const ownPrice = getDisplayPrice(product).price;
  if (ownPrice != null && prices.length > 1 && ownPrice === Math.min(...prices)) {
    return {
      title: "For everyday use.",
      body: "A dependable choice with everything you need, at the most accessible price.",
    };
  }

  return {
    title: "For creators and power users.",
    body: "Advanced capability and pro-level features for those who want more.",
  };
}

function DeviceCard({
  product,
  active,
  disabled,
  onToggle,
}: {
  product: ProductWithRelations;
  active: boolean;
  disabled: boolean;
  onToggle: () => void;
}) {
  const original = product.images.find((img) => img.is_primary) ?? product.images[0];
  const imageUrl = cardImageUrl(product.slug, original?.url);

  return (
    <button
      type="button"
      data-device-card
      onClick={onToggle}
      disabled={disabled}
      className={cn(
        "group relative flex w-[128px] shrink-0 flex-col items-center gap-2 rounded-2xl border-2 bg-white p-3 text-center shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition sm:w-[136px]",
        active ? "border-brand" : "border-ink/8 hover:border-ink/20",
        disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer",
      )}
    >
      {active && (
        <span className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-brand text-white">
          <Check className="size-3" strokeWidth={3} />
        </span>
      )}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-paper-soft">
        {imageUrl && (
          <Image src={imageUrl} alt={product.name} fill sizes="136px" className="object-contain p-3 mix-blend-multiply" />
        )}
      </div>
      <p className="line-clamp-2 min-h-[2lh] w-full text-xs font-medium text-ink">{product.name}</p>
      <span
        className={cn("size-4 rounded-full border-2 transition", active ? "border-brand bg-brand" : "border-ink/20")}
        aria-hidden
      />
    </button>
  );
}

/**
 * The compare tool itself — device picker, comparison table, and a
 * decision-guide CTA at the bottom. Scoped to a single category's product
 * list (the page passes only products from the active tab), so there's no
 * cross-category disabling logic to reason about here.
 */
export function CompareWorkspace({
  products,
  categoryLabel,
  whatsappHref,
  initialSlug,
}: {
  products: ProductWithRelations[];
  categoryLabel: string;
  whatsappHref: string;
  initialSlug?: string;
}) {
  const initial = initialSlug ? products.find((p) => p.slug === initialSlug) : undefined;
  const [selected, setSelected] = useState<string[]>(initial ? [initial.id] : []);
  const [search, setSearch] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const scrollerRef = useRef<HTMLDivElement>(null);

  const compared = useMemo(
    () => selected.map((id) => products.find((p) => p.id === id)).filter((p): p is ProductWithRelations => Boolean(p)),
    [selected, products],
  );
  const leaders = useMemo(() => computeLeaders(compared), [compared]);

  const filtered = useMemo(
    () => (search.trim() ? products.filter((p) => p.name.toLowerCase().includes(search.trim().toLowerCase())) : products),
    [products, search],
  );

  const specGroups = useMemo(() => {
    if (compared.length === 0) return [];
    const present = new Set<string>();
    compared.forEach((p) => getFullSpecs(p.slug)?.forEach((g) => present.add(g.label)));
    return GROUP_ORDER.filter((label) => present.has(label));
  }, [compared]);

  function toggle(id: string) {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((p) => p !== id);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, id];
    });
  }

  function toggleGroup(label: string) {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  }

  function scrollByPage(direction: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-device-card]");
    const step = (card?.offsetWidth ?? 128) + 12;
    el.scrollBy({ left: direction * step * 3, behavior: "smooth" });
  }

  return (
    <div>
      {/* Step 1 — device picker */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-semibold text-ink">
          1. Select up to {MAX_COMPARE} devices to compare
        </p>
        <div className="relative w-full max-w-[220px] sm:max-w-[240px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink/30" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${categoryLabel} models…`}
            className="w-full rounded-full border border-ink/10 bg-white py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink/35 focus:border-brand/40 focus:outline-none"
          />
        </div>
      </div>

      <div className="relative mt-4">
        <div
          ref={scrollerRef}
          className="flex gap-3 overflow-x-auto pb-2 pl-1 pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {filtered.map((p) => {
            const active = selected.includes(p.id);
            return (
              <DeviceCard
                key={p.id}
                product={p}
                active={active}
                disabled={!active && selected.length >= MAX_COMPARE}
                onToggle={() => toggle(p.id)}
              />
            );
          })}
          {filtered.length === 0 && <p className="py-8 text-sm text-ink/45">No models match &quot;{search}&quot;.</p>}
        </div>

        {filtered.length > 4 && (
          <>
            <button
              type="button"
              aria-label="Scroll left"
              onClick={() => scrollByPage(-1)}
              className="absolute left-0 top-1/2 hidden size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink/10 bg-white text-ink/60 shadow-sm transition hover:text-ink sm:flex"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Scroll right"
              onClick={() => scrollByPage(1)}
              className="absolute right-0 top-1/2 hidden size-8 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-ink/10 bg-white text-ink/60 shadow-sm transition hover:text-ink sm:flex"
            >
              <ChevronRight className="size-4" />
            </button>
          </>
        )}
      </div>

      {/* Step 2 — compare */}
      <div className="mt-10 flex items-center justify-between">
        <p className="font-semibold text-ink">2. Compare</p>
        {compared.length > 0 && (
          <button type="button" onClick={() => setSelected([])} className="text-sm font-medium text-brand hover:text-brand/80">
            Clear all
          </button>
        )}
      </div>

      {compared.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-ink/12 py-12 text-center text-sm text-ink/45">
          Select devices above to see them compared side by side.
        </div>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <div className="min-w-[640px]">
            {/* device cards row */}
            <div className="grid gap-3" style={{ gridTemplateColumns: `220px repeat(${compared.length}, minmax(180px, 1fr))` }}>
              <div className="flex flex-col justify-center rounded-2xl bg-paper-soft p-5">
                <p className="font-semibold text-ink">
                  {compared.length} device{compared.length === 1 ? "" : "s"} selected
                </p>
                <p className="mt-1 text-sm text-ink/55">Compare key specifications and features side by side.</p>
              </div>
              {compared.map((p) => {
                const displayPrice = getDisplayPrice(p);
                const original = p.images.find((img) => img.is_primary) ?? p.images[0];
                const imageUrl = cardImageUrl(p.slug, original?.url);
                const colours = uniqueValues(p, "colour").slice(0, 5);
                return (
                  <div key={p.id} className="relative rounded-2xl border border-ink/8 bg-white p-4">
                    <button
                      type="button"
                      onClick={() => toggle(p.id)}
                      aria-label={`Remove ${p.name}`}
                      className="absolute right-3 top-3 text-ink/30 hover:text-ink"
                    >
                      <X className="size-4" />
                    </button>
                    <div className="relative mx-auto aspect-square w-full max-w-[120px]">
                      {imageUrl && (
                        <Image src={imageUrl} alt={p.name} fill sizes="120px" className="object-contain mix-blend-multiply" />
                      )}
                    </div>
                    <p className="mt-2 text-center font-semibold text-ink">{p.name}</p>
                    <div className="mt-1 text-center">
                      <ProductPrice price={displayPrice.price} label={displayPrice.label} size="sm" />
                    </div>
                    {colours.length > 0 && (
                      <div className="mt-2 flex items-center justify-center gap-1.5">
                        {colours.map((c) => (
                          <span
                            key={c}
                            title={c}
                            className="size-3.5 rounded-full border border-ink/10"
                            style={{ background: getColourSwatch(c) ?? "#9ca3af" }}
                          />
                        ))}
                      </div>
                    )}
                    <Link
                      href={productHref(p)}
                      className="mt-3 flex items-center justify-center gap-1.5 rounded-full border border-ink/12 py-2 text-xs font-medium text-ink transition hover:border-ink/25"
                    >
                      View Product
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* at a glance */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-ink/8">
              <div className="flex items-center gap-2 bg-paper-soft px-4 py-3">
                <SquareCheckBig className="size-4 text-ink/50" strokeWidth={1.5} />
                <p className="flex-1 text-sm font-semibold text-ink">At a glance</p>
                <ChevronDown className="size-4 rotate-180 text-ink/40" />
              </div>
              <table className="w-full border-collapse text-sm">
                <tbody>
                  {(
                    [
                      { label: "Display", get: (p: ProductWithRelations) => findSpecValue(getFullSpecs(p.slug), "Display", "Size")?.value ?? null, leader: "display" as const },
                      {
                        label: "Chip",
                        get: (p: ProductWithRelations) =>
                          findSpecValue(getFullSpecs(p.slug), "Performance", "Chip")?.value ?? uniqueValues(p, "chip").join(", ") ?? null,
                        leader: null,
                      },
                      { label: "Main camera", get: (p: ProductWithRelations) => findSpecValue(getFullSpecs(p.slug), "Camera")?.value ?? null, leader: null },
                      { label: "Battery life", get: (p: ProductWithRelations) => findSpecValue(getFullSpecs(p.slug), "Battery")?.value ?? null, leader: "battery" as const },
                      { label: "Storage options", get: storageRangeLabel, leader: "storage" as const },
                    ] as const
                  ).map((row) => (
                    <tr key={row.label} className="border-t border-ink/6">
                      <td className="w-40 py-3 pl-4 pr-3 align-top text-ink/50">{row.label}</td>
                      {compared.map((p) => {
                        const value = row.get(p);
                        const isLeader = row.leader != null && leaders[row.leader] === p.id;
                        return (
                          <td
                            key={p.id}
                            className={cn(
                              "px-4 py-3 align-top",
                              isLeader ? "bg-brand/[0.06] font-semibold text-brand" : "text-ink",
                            )}
                          >
                            {value ?? "—"}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* detailed groups */}
            <div className="mt-3 divide-y divide-ink/6 rounded-2xl border border-ink/8">
              {specGroups.map((groupLabel) => {
                const Icon = GROUP_ICONS[groupLabel] ?? Package;
                const isOpen = expandedGroups.has(groupLabel);
                const subLabels = Array.from(
                  new Set(compared.flatMap((p) => getFullSpecs(p.slug)?.find((g) => g.label === groupLabel)?.rows.map((r) => r.label) ?? [])),
                );
                return (
                  <div key={groupLabel}>
                    <button
                      type="button"
                      onClick={() => toggleGroup(groupLabel)}
                      className="flex w-full items-center gap-2 px-4 py-3.5 text-left"
                    >
                      <Icon className="size-4 text-ink/50" strokeWidth={1.5} />
                      <span className="flex-1 text-sm font-semibold text-ink">{groupLabel === "What's in the Box" ? "What's in the box" : groupLabel}</span>
                      <ChevronRight className={cn("size-4 text-ink/40 transition-transform", isOpen && "rotate-90")} />
                    </button>
                    {isOpen && (
                      <table className="w-full border-collapse text-sm">
                        <tbody>
                          {subLabels.map((subLabel) => (
                            <tr key={subLabel} className="border-t border-ink/6">
                              <td className="w-40 py-3 pl-4 pr-3 align-top text-ink/50">{subLabel}</td>
                              {compared.map((p) => {
                                const value = getFullSpecs(p.slug)
                                  ?.find((g) => g.label === groupLabel)
                                  ?.rows.find((r) => r.label === subLabel)?.value;
                                return (
                                  <td key={p.id} className="px-4 py-3 align-top text-ink">
                                    {value ?? "—"}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* decision CTA */}
      {compared.length > 0 && (
        <div className="mt-10 overflow-hidden rounded-3xl bg-paper-soft">
          <div className="grid grid-cols-1 gap-6 p-6 sm:p-8 lg:grid-cols-[280px_1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">Still deciding?</p>
              <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl">
                Which {categoryLabel} model is right for you?
              </h2>
              <p className="mt-2 text-sm text-ink/55">
                A quick guide to help you choose the right {categoryLabel} model for your needs.
              </p>
              <Button
                render={<a href={whatsappHref} target="_blank" rel="noopener noreferrer" />}
                className="mt-5 h-11 gap-2 rounded-full px-6 text-sm"
              >
                <MessageCircle className="size-4" />
                Chat with an Expert
                <ArrowRight className="size-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {compared.map((p) => {
                const original = p.images.find((img) => img.is_primary) ?? p.images[0];
                const imageUrl = cardImageUrl(p.slug, original?.url);
                const copy = decisionCopy(p, compared, leaders, categoryLabel);
                return (
                  <div key={p.id} className="rounded-2xl bg-white p-4">
                    <div className="relative mx-auto aspect-square w-full max-w-[96px]">
                      {imageUrl && (
                        <Image src={imageUrl} alt={p.name} fill sizes="96px" className="object-contain mix-blend-multiply" />
                      )}
                    </div>
                    <p className="mt-2 font-semibold text-ink">{p.name}</p>
                    <p className="mt-0.5 text-sm font-medium text-ink/70">{copy.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-ink/50">{copy.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
