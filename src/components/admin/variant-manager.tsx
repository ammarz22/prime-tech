"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Pencil, Trash2, Loader2, History, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { variantSchema, type VariantInput } from "@/lib/validations/variant";
import { createVariantAction, updateVariantAction, deleteVariantAction } from "@/lib/actions/admin-variants";
import { getPriceHistory } from "@/lib/actions/price-history";
import type { ProductVariant, ProductImage, PriceHistory } from "@/types/database";

const AVAILABILITY_LABEL: Record<string, string> = {
  in_stock: "In Stock",
  out_of_stock: "Out of Stock",
  available_on_request: "On Request",
  coming_soon: "Coming Soon",
};

const EMPTY_VALUES: VariantInput = {
  name: "",
  sku: "",
  storage: "",
  memory: "",
  colour: "",
  screenSize: "",
  chip: "",
  simType: "",
  price: "",
  availability: "coming_soon",
};

export function VariantManager({
  productId,
  variants,
  images = [],
}: {
  productId: string;
  variants: ProductVariant[];
  images?: ProductImage[];
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<ProductVariant | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [historyOpenId, setHistoryOpenId] = useState<string | null>(null);
  const [history, setHistory] = useState<Record<string, PriceHistory[]>>({});
  const [historyLoading, setHistoryLoading] = useState(false);

  function openCreate() {
    setEditing(null);
    setDialogOpen(true);
  }

  function openEdit(variant: ProductVariant) {
    setEditing(variant);
    setDialogOpen(true);
  }

  async function handleDelete(variantId: string) {
    if (!confirm("Delete this variant?")) return;
    setDeletingId(variantId);
    await deleteVariantAction(productId, variantId);
    setDeletingId(null);
  }

  async function toggleHistory(variantId: string) {
    if (historyOpenId === variantId) {
      setHistoryOpenId(null);
      return;
    }
    setHistoryOpenId(variantId);
    if (!history[variantId]) {
      setHistoryLoading(true);
      const rows = await getPriceHistory(variantId);
      setHistory((prev) => ({ ...prev, [variantId]: rows }));
      setHistoryLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-ink/8">
      <div className="flex items-center justify-between border-b border-ink/8 px-5 py-3">
        <p className="text-sm font-medium">Variants</p>
        <Button size="sm" className="gap-1.5" onClick={openCreate}>
          <Plus className="size-3.5" />
          Add Variant
        </Button>
      </div>

      {variants.length === 0 ? (
        <p className="px-5 py-8 text-center text-sm text-ink/45">
          No variants yet. Add one, or use the generator above to create a full matrix at once.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-ink/8 text-left text-xs font-medium uppercase tracking-wide text-ink/40">
                <th className="px-5 py-2.5">Image</th>
                <th className="px-2 py-2.5">Colour</th>
                <th className="px-2 py-2.5">Storage / Config</th>
                <th className="px-2 py-2.5">Price</th>
                <th className="px-2 py-2.5">Availability</th>
                <th className="px-2 py-2.5">SKU</th>
                <th className="px-5 py-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {variants.map((variant) => {
                const variantImage = images.find((img) => img.variant_id === variant.id);
                return (
                  <Fragment key={variant.id}>
                    <tr className="border-b border-ink/6">
                      <td className="px-5 py-2.5">
                        {variantImage ? (
                          <div className="relative size-10 overflow-hidden rounded-lg border border-ink/8">
                            <Image src={variantImage.url} alt="" fill sizes="40px" className="object-cover" />
                          </div>
                        ) : (
                          <div className="flex size-10 items-center justify-center rounded-lg border border-dashed border-ink/12 text-ink/25">
                            <ImageOff className="size-4" />
                          </div>
                        )}
                      </td>
                      <td className="px-2 py-2.5">{variant.colour || "—"}</td>
                      <td className="px-2 py-2.5 text-ink/60">
                        {[variant.storage, variant.memory, variant.chip, variant.screen_size, variant.sim_type].filter(Boolean).join(" · ") || "—"}
                      </td>
                      <td className="px-2 py-2.5 tabular-nums">
                        {variant.price != null ? `LKR ${variant.price.toLocaleString()}` : <span className="text-ink/40">—</span>}
                      </td>
                      <td className="px-2 py-2.5">
                        <Badge variant="secondary">{AVAILABILITY_LABEL[variant.availability]}</Badge>
                      </td>
                      <td className="px-2 py-2.5 text-xs text-ink/40">{variant.sku ?? "—"}</td>
                      <td className="px-5 py-2.5">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon-sm" onClick={() => toggleHistory(variant.id)} aria-label="View price history">
                            <History className="size-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon-sm" onClick={() => openEdit(variant)} aria-label="Edit variant">
                            <Pencil className="size-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(variant.id)}
                            disabled={deletingId === variant.id}
                            aria-label="Delete variant"
                          >
                            {deletingId === variant.id ? <Loader2 className="size-3.5 animate-spin" /> : <Trash2 className="size-3.5" />}
                          </Button>
                        </div>
                      </td>
                    </tr>
                    {historyOpenId === variant.id && (
                      <tr className="border-b border-ink/6 bg-paper-soft">
                        <td colSpan={7} className="px-5 py-3">
                          {historyLoading && !history[variant.id] ? (
                            <p className="text-xs text-ink/45">Loading…</p>
                          ) : (history[variant.id]?.length ?? 0) === 0 ? (
                            <p className="text-xs text-ink/45">No price changes recorded yet.</p>
                          ) : (
                            <ul className="space-y-1 text-xs text-ink/55">
                              {history[variant.id].map((h) => (
                                <li key={h.id}>
                                  {new Date(h.changed_at).toLocaleString("en-LK")} — {h.old_price != null ? `LKR ${h.old_price.toLocaleString()}` : "—"} →{" "}
                                  {h.new_price != null ? `LKR ${h.new_price.toLocaleString()}` : "—"}
                                </li>
                              ))}
                            </ul>
                          )}
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <VariantFormDialog open={dialogOpen} onOpenChange={setDialogOpen} productId={productId} variant={editing} />
    </div>
  );
}

function VariantFormDialog({
  open,
  onOpenChange,
  productId,
  variant,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId: string;
  variant: ProductVariant | null;
}) {
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<VariantInput>({
    resolver: zodResolver(variantSchema),
    values: variant
      ? {
          name: variant.name,
          sku: variant.sku ?? "",
          storage: variant.storage ?? "",
          memory: variant.memory ?? "",
          colour: variant.colour ?? "",
          screenSize: variant.screen_size ?? "",
          chip: variant.chip ?? "",
          simType: variant.sim_type ?? "",
          price: variant.price != null ? String(variant.price) : "",
          availability: variant.availability,
        }
      : EMPTY_VALUES,
  });

  async function onSubmit(data: VariantInput) {
    setServerError(null);
    const result = variant
      ? await updateVariantAction(productId, variant.id, data)
      : await createVariantAction(productId, data);
    if (!result.success) {
      setServerError(result.error ?? "Something went wrong.");
      return;
    }
    reset(EMPTY_VALUES);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{variant ? "Edit Variant" : "Add Variant"}</DialogTitle>
          <DialogDescription>Storage, colour, price and availability for this configuration.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="v-name">Name</Label>
            <Input id="v-name" placeholder="e.g. 256GB" {...register("name")} />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="v-storage">Storage</Label>
              <Input id="v-storage" {...register("storage")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="v-memory">Memory</Label>
              <Input id="v-memory" {...register("memory")} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="v-colour">Colour</Label>
              <Input id="v-colour" {...register("colour")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="v-screen">Screen Size</Label>
              <Input id="v-screen" {...register("screenSize")} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="v-chip">Chip</Label>
              <Input id="v-chip" {...register("chip")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="v-sku">SKU</Label>
              <Input id="v-sku" {...register("sku")} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="v-sim-type">SIM Type</Label>
            <Input id="v-sim-type" placeholder="e.g. Physical SIM + eSIM, or eSIM Only" {...register("simType")} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="v-price">Price (LKR)</Label>
              <Input id="v-price" type="number" step="1" {...register("price")} />
              {errors.price && <p className="text-xs text-destructive">{errors.price.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label>Availability</Label>
              <Controller
                control={control}
                name="availability"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue>{(value: string) => AVAILABILITY_LABEL[value] ?? value}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in_stock">In Stock</SelectItem>
                      <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                      <SelectItem value="available_on_request">Available on Request</SelectItem>
                      <SelectItem value="coming_soon">Coming Soon</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {serverError && <p className="text-sm text-destructive">{serverError}</p>}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="size-4 animate-spin" />}
            {variant ? "Save Changes" : "Add Variant"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
