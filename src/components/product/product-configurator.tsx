"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { AvailabilityBadge, availabilityCta, availabilityLabel } from "@/components/product/availability-badge";
import { ProductPrice, formatLKR } from "@/components/product/product-price";
import { ProductSpecifications } from "@/components/product/product-specifications";
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
  const chips = dimension(variants, "chip");
  const [selectedChip, setSelectedChip] = useState<string | null>(chips[0] ?? null);

  const byChip = chips.length > 1 ? variants.filter((v) => v.chip === selectedChip) : variants;

  const storages = dimension(byChip, "storage");
  const [selectedStorage, setSelectedStorage] = useState<string | null>(storages[0] ?? null);

  const byStorage = storages.length > 1 ? byChip.filter((v) => v.storage === selectedStorage) : byChip;

  const simTypes = dimension(byStorage, "sim_type");
  const [selectedSimType, setSelectedSimType] = useState<string | null>(simTypes[0] ?? null);

  const bySimType = simTypes.length > 1 ? byStorage.filter((v) => v.sim_type === selectedSimType) : byStorage;

  const colours = dimension(bySimType, "colour");
  const [selectedColour, setSelectedColour] = useState<string | null>(colours[0] ?? null);

  // Only constrain on dimensions this product actually has more than one
  // value for — resolveVariant never guesses a nearest match, so a missing
  // combination shows "Configuration Not Available" rather than a wrong price.
  const selected = resolveVariant(variants, {
    chip: chips.length > 1 ? selectedChip : undefined,
    storage: storages.length > 1 ? selectedStorage : undefined,
    simType: simTypes.length > 1 ? selectedSimType : undefined,
    colour: colours.length > 1 ? selectedColour : undefined,
  });

  // Changing a dimension keeps the user's other selections whenever they're
  // still valid for the new combination, and only falls back to the first
  // available option when the prior pick genuinely doesn't exist anymore —
  // switching storage shouldn't silently reset a colour that's still in stock.
  function handleChipSelect(chip: string) {
    setSelectedChip(chip);
    const nextByChip = variants.filter((v) => v.chip === chip);
    const nextStorages = dimension(nextByChip, "storage");
    const nextStorage = selectedStorage && nextStorages.includes(selectedStorage) ? selectedStorage : (nextStorages[0] ?? null);
    setSelectedStorage(nextStorage);
    const nextByStorage = nextStorages.length > 1 ? nextByChip.filter((v) => v.storage === nextStorage) : nextByChip;
    const nextSimTypes = dimension(nextByStorage, "sim_type");
    const nextSimType = selectedSimType && nextSimTypes.includes(selectedSimType) ? selectedSimType : (nextSimTypes[0] ?? null);
    setSelectedSimType(nextSimType);
    const nextBySimType = nextSimTypes.length > 1 ? nextByStorage.filter((v) => v.sim_type === nextSimType) : nextByStorage;
    const nextColours = dimension(nextBySimType, "colour");
    setSelectedColour(selectedColour && nextColours.includes(selectedColour) ? selectedColour : (nextColours[0] ?? null));
  }

  function handleStorageSelect(storage: string) {
    setSelectedStorage(storage);
    const nextByStorage = byChip.filter((v) => v.storage === storage);
    const nextSimTypes = dimension(nextByStorage, "sim_type");
    const nextSimType = selectedSimType && nextSimTypes.includes(selectedSimType) ? selectedSimType : (nextSimTypes[0] ?? null);
    setSelectedSimType(nextSimType);
    const nextBySimType = nextSimTypes.length > 1 ? nextByStorage.filter((v) => v.sim_type === nextSimType) : nextByStorage;
    const nextColours = dimension(nextBySimType, "colour");
    setSelectedColour(selectedColour && nextColours.includes(selectedColour) ? selectedColour : (nextColours[0] ?? null));
  }

  function handleSimTypeSelect(simType: string) {
    setSelectedSimType(simType);
    const nextBySimType = byStorage.filter((v) => v.sim_type === simType);
    const nextColours = dimension(nextBySimType, "colour");
    setSelectedColour(selectedColour && nextColours.includes(selectedColour) ? selectedColour : (nextColours[0] ?? null));
  }

  function isStorageAvailable(storage: string) {
    return byChip.some((v) => v.storage === storage);
  }

  function isSimTypeAvailable(simType: string) {
    return byStorage.some((v) => v.sim_type === simType);
  }

  function isColourAvailable(colour: string) {
    return bySimType.some((v) => v.colour === colour);
  }

  const configurationLabel = selected
    ? [
        selected.colour && `Colour: ${selected.colour}`,
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

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-ink/45">{product.name}</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">{selected?.chip ? `${product.name} (${selected.chip})` : product.name}</h1>
          {product.short_description && <p className="mt-2 text-ink/60">{product.short_description}</p>}
        </div>
        <div className="mt-1 flex shrink-0 items-center gap-1.5">
          <ShareButton productName={product.name} className="border border-ink/8" />
          <SaveButton productId={product.id} className="border border-ink/8" />
        </div>
      </div>

      {chips.length > 1 && (
        <div>
          <p className="mb-2 text-sm font-medium text-ink">Chip</p>
          <div className="flex flex-wrap gap-2">
            {chips.map((chip) => (
              <SelectPill key={chip} active={chip === selectedChip} onClick={() => handleChipSelect(chip)}>
                {chip}
              </SelectPill>
            ))}
          </div>
        </div>
      )}

      {storages.length > 1 && (
        <div>
          <p className="mb-2 text-sm font-medium text-ink">Storage</p>
          <div className="flex flex-wrap gap-2">
            {storages.map((storage) => (
              <SelectPill
                key={storage}
                active={storage === selectedStorage}
                disabled={!isStorageAvailable(storage)}
                onClick={() => handleStorageSelect(storage)}
              >
                {storage}
              </SelectPill>
            ))}
          </div>
        </div>
      )}

      {simTypes.length > 1 && (
        <div>
          <p className="mb-2 text-sm font-medium text-ink">SIM Type</p>
          <div className="flex flex-wrap gap-2">
            {simTypes.map((simType) => (
              <SelectPill
                key={simType}
                active={simType === selectedSimType}
                disabled={!isSimTypeAvailable(simType)}
                onClick={() => handleSimTypeSelect(simType)}
              >
                {simType}
              </SelectPill>
            ))}
          </div>
        </div>
      )}

      {colours.length > 1 ? (
        <div>
          <p className="mb-2 text-sm font-medium text-ink">Colour</p>
          <div className="flex flex-wrap gap-2">
            {colours.map((colour) => (
              <SelectPill
                key={colour}
                active={colour === selectedColour}
                disabled={!isColourAvailable(colour)}
                onClick={() => setSelectedColour(colour)}
                swatch={getColourSwatch(colour)}
              >
                {colour}
              </SelectPill>
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

      <motion.div
        key={selected?.id ?? "unavailable"}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="rounded-2xl border border-ink/8 bg-paper-soft p-4"
      >
        {selected ? (
          <>
            <p className="text-xs font-medium uppercase tracking-wide text-ink/40">Selected Configuration</p>
            <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-0.5 text-sm text-ink/60">
              {selected.colour && (
                <span>
                  Colour: <span className="font-medium text-ink">{selected.colour}</span>
                </span>
              )}
              {selected.storage && (
                <span>
                  Storage: <span className="font-medium text-ink">{selected.storage}</span>
                </span>
              )}
              {selected.sim_type && (
                <span>
                  SIM Type: <span className="font-medium text-ink">{selected.sim_type}</span>
                </span>
              )}
            </div>
            <div className="mt-3 flex items-center justify-between">
              <ProductPrice price={selected.price} label={selected.price != null ? "exact" : product.price_label} size="lg" />
              <AvailabilityBadge status={selected.availability} />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-between">
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

      <ProductSpecifications variant={selected} />

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

function SelectPill({
  active,
  disabled,
  onClick,
  swatch,
  children,
}: {
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  swatch?: string | null;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={disabled ? "Not available in this configuration" : undefined}
      className={cn(
        "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition",
        active ? "border-ink bg-ink text-white" : "border-ink/15 text-ink/70 hover:border-ink/30",
        disabled && "cursor-not-allowed opacity-35 line-through hover:border-ink/15",
      )}
    >
      {swatch && (
        <span
          className="size-3.5 shrink-0 rounded-full border border-black/10"
          style={{ backgroundColor: swatch }}
          aria-hidden
        />
      )}
      {children}
    </button>
  );
}
