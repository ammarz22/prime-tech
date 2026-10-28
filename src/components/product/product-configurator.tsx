"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ShieldCheck, Truck, Headset } from "lucide-react";
import { AvailabilityBadge, availabilityCta, availabilityLabel } from "@/components/product/availability-badge";
import { ProductPrice, formatLKR } from "@/components/product/product-price";
import { SaveButton } from "@/components/product/save-button";
import { ShareButton } from "@/components/product/share-button";
import { WhatsAppButton } from "@/components/common/whatsapp-button";
import { StockNotifyForm } from "@/components/product/stock-notify-form";
import { Link2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { resolveVariant } from "@/lib/utils/pricing";
import { getColourSwatch } from "@/lib/utils/colour-swatches";
import { productEnquiryMessage } from "@/lib/config/site";
import type { Product, ProductVariant } from "@/types/database";

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: "100% Genuine Products" },
  { icon: Truck, label: "Islandwide Delivery" },
  { icon: Headset, label: "Expert Guidance" },
] as const;

const CONFIG_DIMENSIONS = ["chip", "screen_size", "memory", "storage", "sim_type", "colour"] as const;
type ConfigDimension = (typeof CONFIG_DIMENSIONS)[number];

function dimension<K extends keyof ProductVariant>(variants: ProductVariant[], key: K) {
  const values = Array.from(new Set(variants.map((v) => v[key]).filter(Boolean)));
  return values as NonNullable<ProductVariant[K]>[];
}

export function ProductConfigurator({
  product,
  variants,
  whatsappNumber,
  onVariantChange,
}: {
  product: Product;
  variants: ProductVariant[];
  whatsappNumber: string | null;
  /** Notified whenever the selected configuration changes, so the gallery
   * can switch to that variant's photo. */
  onVariantChange?: (variant: ProductVariant | undefined) => void;
}) {
  // Each dimension's options come from the variants still matching every
  // earlier pick, and a pick that no longer exists falls back to the first
  // option — so changing one choice keeps the others whenever they remain
  // valid. Only dimensions with more than one value constrain the match;
  // resolveVariant never guesses a nearest match, so a missing combination
  // shows "Configuration Not Available" rather than a wrong price.
  const [picks, setPicks] = useState<Partial<Record<ConfigDimension, string>>>({});

  let pool = variants;
  const options = {} as Record<ConfigDimension, string[]>;
  const active = {} as Record<ConfigDimension, string | null>;
  for (const dim of CONFIG_DIMENSIONS) {
    const values = dimension(pool, dim);
    const pick = picks[dim];
    const current = pick && values.includes(pick) ? pick : (values[0] ?? null);
    options[dim] = values;
    active[dim] = current;
    if (values.length > 1) pool = pool.filter((v) => v[dim] === current);
  }

  const chips = options.chip;
  const screenSizes = options.screen_size;
  const memories = options.memory;
  const storages = options.storage;
  const simTypes = options.sim_type;
  const colours = options.colour;
  const selectedChip = active.chip;
  const selectedScreenSize = active.screen_size;
  const selectedMemory = active.memory;
  const selectedStorage = active.storage;
  const selectedSimType = active.sim_type;
  const selectedColour = active.colour;

  const selected = resolveVariant(variants, {
    chip: chips.length > 1 ? selectedChip : undefined,
    screenSize: screenSizes.length > 1 ? selectedScreenSize : undefined,
    memory: memories.length > 1 ? selectedMemory : undefined,
    storage: storages.length > 1 ? selectedStorage : undefined,
    simType: simTypes.length > 1 ? selectedSimType : undefined,
    colour: colours.length > 1 ? selectedColour : undefined,
  });

  function pick(dim: ConfigDimension, value: string) {
    setPicks((prev) => ({ ...prev, [dim]: value }));
  }

  const configurationLabel = selected
    ? [
        selected.screen_size && `Size: ${selected.screen_size}`,
        selected.colour && `Colour: ${selected.colour}`,
        selected.memory && `Memory: ${selected.memory}`,
        selected.storage && `Storage: ${selected.storage}`,
        selected.sim_type && `SIM Type: ${selected.sim_type}`,
        selected.chip && `Chip: ${selected.chip}`,
        `Price: ${selected.price != null ? formatLKR(selected.price) : "Price on Request"}`,
        `Status: ${availabilityLabel(selected.availability)}`,
      ]
        .filter(Boolean)
        .join("\n")
    : "Configuration not available";

  useEffect(() => {
    onVariantChange?.(selected);
    // onVariantChange identity isn't expected to change per-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected?.id]);

  const displayName = selected?.screen_size
    ? `${product.name} ${selected.screen_size}`
    : selected?.chip
      ? `${product.name} (${selected.chip})`
      : product.name;

  return (
    <div className="space-y-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink/45">{product.name}</p>
          <h1 className="mt-1.5 text-3xl font-semibold tracking-tight sm:text-4xl">{displayName}</h1>
          {product.short_description && (
            <p className="mt-2 text-base font-medium text-ink/70">{product.short_description}</p>
          )}
        </div>
        <div className="mt-1 flex shrink-0 items-center gap-1.5">
          <ShareButton productName={product.name} className="border border-ink/8" />
          <SaveButton productId={product.id} className="border border-ink/8" />
        </div>
      </div>

      {chips.length > 1 && (
        <div>
          <p className="mb-2.5 text-sm font-medium text-ink">Choose your chip</p>
          <div className="flex flex-wrap gap-2">
            {chips.map((chip) => (
              <BoxOption key={chip} active={chip === selectedChip} onClick={() => pick("chip", chip)}>
                {chip}
              </BoxOption>
            ))}
          </div>
        </div>
      )}

      {screenSizes.length > 1 && (
        <div>
          <p className="mb-2.5 text-sm font-medium text-ink">Choose your size</p>
          <div className="flex flex-wrap gap-2">
            {screenSizes.map((screenSize) => (
              <BoxOption
                key={screenSize}
                active={screenSize === selectedScreenSize}
                onClick={() => pick("screen_size", screenSize)}
              >
                {screenSize}
              </BoxOption>
            ))}
          </div>
        </div>
      )}

      {memories.length > 1 && (
        <div>
          <p className="mb-2.5 text-sm font-medium text-ink">Choose your memory</p>
          <div className="flex flex-wrap gap-2">
            {memories.map((memory) => (
              <BoxOption key={memory} active={memory === selectedMemory} onClick={() => pick("memory", memory)}>
                {memory}
              </BoxOption>
            ))}
          </div>
        </div>
      )}

      {storages.length > 1 && (
        <div>
          <p className="mb-2.5 text-sm font-medium text-ink">Choose your storage</p>
          <div className="flex flex-wrap gap-2">
            {storages.map((storage) => (
              <BoxOption
                key={storage}
                active={storage === selectedStorage}
                onClick={() => pick("storage", storage)}
              >
                {storage}
              </BoxOption>
            ))}
          </div>
        </div>
      )}

      {simTypes.length > 1 && (
        <div>
          <p className="mb-2.5 text-sm font-medium text-ink">SIM Type</p>
          <div className="flex flex-wrap gap-2">
            {simTypes.map((simType) => (
              <BoxOption
                key={simType}
                active={simType === selectedSimType}
                onClick={() => pick("sim_type", simType)}
              >
                {simType}
              </BoxOption>
            ))}
          </div>
        </div>
      )}

      {colours.length > 1 ? (
        <div>
          <p className="mb-2.5 text-sm font-medium text-ink">Choose your colour</p>
          <div className="flex flex-wrap gap-4">
            {colours.map((colour) => (
              <ColourOption
                key={colour}
                active={colour === selectedColour}
                onClick={() => pick("colour", colour)}
                swatch={getColourSwatch(colour)}
                label={colour}
              />
            ))}
          </div>
        </div>
      ) : (
        selected?.colour && (
          <div>
            <p className="mb-1.5 text-sm font-medium text-ink">Colour</p>
            <p className="text-sm text-ink/60">{selected.colour}</p>
          </div>
        )
      )}

      <motion.div key={selected?.id ?? "unavailable"} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        {selected ? (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <ProductPrice price={selected.price} label={selected.price != null ? "exact" : product.price_label} size="lg" />
            <div className="flex flex-col gap-0.5">
              <AvailabilityBadge status={selected.availability} />
              {selected.availability === "in_stock" && (
                <span className="text-xs text-ink/45">Ready for Islandwide Delivery</span>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between rounded-2xl border border-ink/8 bg-paper-soft p-4">
            <p className="font-medium text-ink/60">Configuration Not Available</p>
            <span className="text-xs text-ink/40">Try a different combination</span>
          </div>
        )}
      </motion.div>

      {selected?.availability === "out_of_stock" && <StockNotifyForm productId={product.id} variantId={selected.id} />}

      <WhatsAppButton
        number={whatsappNumber}
        message={productEnquiryMessage(product.name, configurationLabel)}
        label={selected ? availabilityCta(selected.availability) : "Configuration Not Available"}
        disabled={!selected}
        size="lg"
        variant="default"
        className="h-12 w-full rounded-full text-base"
      />

      <ul className="grid grid-cols-3 gap-3 border-t border-ink/8 pt-5">
        {TRUST_ITEMS.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-1.5 text-xs text-ink/60">
            <Icon className="size-4 shrink-0 text-ink/40" strokeWidth={1.5} />
            {label}
          </li>
        ))}
      </ul>

      {selected?.price != null && (
        <p className="flex items-center gap-1.5 text-xs text-ink/40">
          <Link2 className="size-3" />
          Price confirmed for this configuration. Final availability confirmed by Prime Tech at enquiry.
        </p>
      )}
      {selected?.price == null && (
        <p className="flex items-center gap-1.5 text-xs text-ink/40">
          <Link2 className="size-3" />
          Prices shown are {product.price_label === "starting_from" ? "starting from" : "approximate"} and confirmed by Prime Tech at enquiry.
        </p>
      )}
    </div>
  );
}

function BoxOption({
  active,
  disabled,
  onClick,
  children,
}: {
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={disabled ? "Not available in this configuration" : undefined}
      className={cn(
        "rounded-xl border-2 px-4 py-2.5 text-sm font-medium transition",
        active ? "border-brand text-ink" : "border-ink/12 text-ink/70 hover:border-ink/25",
        disabled && "cursor-not-allowed opacity-35 line-through hover:border-ink/12",
      )}
    >
      {children}
    </button>
  );
}

function ColourOption({
  active,
  disabled,
  onClick,
  swatch,
  label,
}: {
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  swatch?: string | null;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={disabled ? "Not available in this configuration" : label}
      className={cn("flex flex-col items-center gap-1.5", disabled && "cursor-not-allowed opacity-35")}
    >
      <span
        className={cn(
          "flex size-9 items-center justify-center rounded-full border-2 transition",
          active ? "border-brand" : "border-transparent hover:border-ink/20",
        )}
      >
        <span
          className="size-7 rounded-full border border-black/10"
          style={{ backgroundColor: swatch ?? "#9ca3af" }}
          aria-hidden
        />
      </span>
      <span className="text-[11px] text-ink/55">{label}</span>
    </button>
  );
}
