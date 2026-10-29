"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowLeft, Eye, ListPlus, Loader2, Pencil, Plus, Printer, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InvoicePaper, ScaledPaper, type PaperBusiness } from "@/components/admin/invoice/invoice-paper";
import { BTN, CONTROL, Field } from "@/components/admin/sales/shared";
import { AddFromSalesDialog } from "@/components/admin/invoice/add-from-sales-dialog";
import { saveInvoiceAction, type PickableSale } from "@/lib/actions/admin-invoices";
import { BANK_CHARGE_RE, bankChargeItem, type InvoiceDraft } from "@/lib/utils/invoice";
import { detectSaleKind } from "@/lib/utils/sale-detect";
import { invoiceSchema, type InvoiceInput } from "@/lib/validations/invoice";
import { invoiceTotals } from "@/lib/utils/invoice";
import { lkr } from "@/lib/utils/sales-format";
import type { InvoiceItem, TrackerSettings } from "@/types/database";
import { cn } from "@/lib/utils";

const finite = (n: unknown) => (typeof n === "number" && Number.isFinite(n) ? n : 0);

type FormItem = InvoiceInput["items"][number];

/** An editor line from a stored/pre-filled invoice line. `mainSaleId` is the sale this invoice belongs to. */
function toFormItem(item: InvoiceItem, mainSaleId: string | null): FormItem {
  const linkedExtra = !!item.sale_id && item.sale_id !== mainSaleId;
  return {
    desc: item.desc,
    qty: item.qty,
    unit_price: item.unit_price,
    record: linkedExtra,
    recordKind: linkedExtra && item.sale_kind ? item.sale_kind : "auto",
    unitCost: item.unit_cost != null ? String(item.unit_cost) : "",
    saleKind: item.sale_kind ?? "",
    saleId: item.sale_id ?? "",
    linked: !!item.linked,
  };
}

const NEW_ITEM: FormItem = {
  desc: "",
  qty: 1,
  unit_price: 0,
  record: false,
  recordKind: "auto",
  unitCost: "",
  saleKind: "",
  saleId: "",
  linked: false,
};

export function InvoiceEditor({
  initial,
  settings,
  nextNumber,
  business,
}: {
  initial: InvoiceDraft;
  settings: TrackerSettings;
  /** What the next invoice will be called (shown in the preview until it is saved). */
  nextNumber: string;
  business: PaperBusiness;
}) {
  const router = useRouter();
  const [view, setView] = useState<"edit" | "preview">("edit");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [saving, setSaving] = useState<"save" | "print" | null>(null);
  const isNew = !initial.id;

  const form = useForm<InvoiceInput>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      invoiceDate: initial.invoiceDate,
      dueDate: initial.dueDate,
      customerName: initial.customerName,
      customerPhone: initial.customerPhone,
      customerEmail: initial.customerEmail,
      customerAddress: initial.customerAddress,
      items: initial.items.map((i) => toFormItem(i, initial.saleId)),
      discount: initial.discount,
      taxPercent: initial.taxPercent,
      paymentMethod: initial.paymentMethod,
      notes: initial.notes,
      saleKind: initial.saleKind,
      saleId: initial.saleId,
    },
  });
  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = form;
  const { fields, append, remove, replace } = useFieldArray({ control, name: "items" });
  const watched = useWatch({ control });

  const items = (watched.items ?? []).map((i) => ({
    desc: i?.desc ?? "",
    qty: finite(i?.qty),
    unit_price: finite(i?.unit_price),
  }));
  const totals = invoiceTotals(items, finite(watched.discount), finite(watched.taxPercent));
  const bankPct = Number(settings.bank_charge_percent) || 3;

  /** Adds sales picked in the dialog as invoice lines already linked to those sales. */
  function addPickedSales(sales: PickableSale[]) {
    const kept = getValues("items").filter((i) => i.desc.trim() || i.unit_price);
    const added: FormItem[] = sales.map((s) => ({
      desc: s.desc,
      qty: s.qty,
      unit_price: s.unitPrice,
      record: true,
      recordKind: s.kind,
      unitCost: String(s.unitCost),
      saleKind: s.kind,
      saleId: s.id,
      linked: true,
    }));
    replace([...kept, ...added]);
    // First customer name from the picks, if the invoice doesn't have one yet.
    const name = sales.map((s) => s.customer?.trim()).find(Boolean);
    if (name && !getValues("customerName").trim()) setValue("customerName", name, { shouldDirty: true });
    toast.success(`${sales.length} ${sales.length === 1 ? "sale" : "sales"} added to the invoice`);
  }

  function addBankCharge() {
    const current = getValues("items").filter((i) => !BANK_CHARGE_RE.test(i.desc ?? ""));
    const base = current.reduce((sum, i) => sum + finite(i.qty) * finite(i.unit_price), 0);
    replace([...current, toFormItem(bankChargeItem(base, bankPct), null)]);
  }

  async function save(values: InvoiceInput, andPrint: boolean) {
    setServerError(null);
    setSaving(andPrint ? "print" : "save");
    const result = await saveInvoiceAction(initial.id, values);
    setSaving(null);
    if (!result.success || !result.id) {
      setServerError(result.error ?? "Couldn't save the invoice — your entries are still here, try again.");
      return;
    }
    toast.success(`${result.invoiceNo} saved`);
    if (result.warning) toast.warning(result.warning, { duration: 12000 });
    if (andPrint) router.push(`/admin/invoices/${result.id}/print`);
    else if (isNew) router.replace(`/admin/invoices/${result.id}`);
    else router.refresh();
  }

  // Never fail silently: say so when a field is invalid (even one that is scrolled out of view).
  const onInvalid = () => setServerError("Please fix the highlighted fields, then save again.");
  const onSave = handleSubmit((v) => save(v, false), onInvalid);
  const onSavePrint = handleSubmit((v) => save(v, true), onInvalid);

  const paperData = {
    invoiceNo: initial.invoiceNo ?? nextNumber,
    invoiceDate: watched.invoiceDate ?? "",
    dueDate: watched.dueDate ?? "",
    customerName: watched.customerName ?? "",
    customerPhone: watched.customerPhone ?? "",
    customerEmail: watched.customerEmail ?? "",
    customerAddress: watched.customerAddress ?? "",
    items,
    discount: finite(watched.discount),
    taxPercent: finite(watched.taxPercent),
    paymentMethod: watched.paymentMethod ?? "",
    notes: watched.notes ?? "",
  };

  const busy = saving !== null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/invoices"
          aria-label="Back to invoices"
          className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-ink/10 bg-paper hover:bg-ink/5 sm:size-9"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-semibold tracking-tight">{isNew ? "New invoice" : `Invoice ${initial.invoiceNo}`}</h1>
          <p className="text-sm text-ink/55">
            {isNew ? `Number ${nextNumber} is assigned when you save.` : "Changes update the invoice, not the sale it came from."}
          </p>
        </div>
      </div>

      <div className="sticky top-14 z-20 -mx-4 flex flex-wrap items-center gap-2 border-y border-ink/8 bg-paper-soft/95 px-4 py-2 backdrop-blur sm:-mx-8 sm:px-8 lg:top-0">
        <Button
          type="button"
          variant="outline"
          className={cn(BTN, "lg:hidden")}
          onClick={() => setView((v) => (v === "edit" ? "preview" : "edit"))}
        >
          {view === "edit" ? <Eye className="size-4" /> : <Pencil className="size-4" />}
          {view === "edit" ? "Preview" : "Edit"}
        </Button>
        <div className="ml-auto flex items-center gap-2">
          <p className="mr-2 hidden text-sm text-ink/55 sm:block">
            Total <b className="text-ink tabular-nums">{lkr(totals.total)}</b>
          </p>
          <Button type="button" variant="outline" className={BTN} onClick={onSave} disabled={busy}>
            {saving === "save" ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            Save
          </Button>
          <Button type="button" className={`${BTN} bg-brand text-white hover:bg-brand/90`} onClick={onSavePrint} disabled={busy}>
            {saving === "print" ? <Loader2 className="size-4 animate-spin" /> : <Printer className="size-4" />}
            Save &amp; Print
          </Button>
        </div>
      </div>

      {serverError && (
        <p role="alert" className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {serverError}
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,430px)_minmax(0,1fr)]">
        <form
          onSubmit={onSave}
          noValidate
          className={cn("space-y-6 rounded-2xl border border-ink/8 bg-paper p-4 sm:p-5", view === "preview" && "hidden lg:block")}
        >
          <section className="space-y-3">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink/45">Invoice</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Invoice number" htmlFor="inv-no">
                <Input id="inv-no" readOnly value={initial.invoiceNo ?? "Assigned on save"} className={cn(CONTROL, "bg-ink/5")} />
              </Field>
              <Field label="Payment" htmlFor="inv-pay" error={errors.paymentMethod?.message}>
                <Input id="inv-pay" list="dl-inv-pay" placeholder="Card Payment - 24 Months Installment" autoComplete="off" className={CONTROL} {...register("paymentMethod")} />
              </Field>
              <Field label="Invoice date" htmlFor="inv-date" error={errors.invoiceDate?.message}>
                <Input id="inv-date" type="date" className={CONTROL} {...register("invoiceDate")} />
              </Field>
              <Field label="Due date" htmlFor="inv-due" error={errors.dueDate?.message}>
                <Input id="inv-due" type="date" className={CONTROL} {...register("dueDate")} />
              </Field>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink/45">Customer</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Name" htmlFor="inv-cname" className="sm:col-span-2" error={errors.customerName?.message}>
                <Input id="inv-cname" placeholder="Customer name" autoComplete="off" className={CONTROL} {...register("customerName")} />
              </Field>
              <Field label="Phone" htmlFor="inv-cphone" error={errors.customerPhone?.message}>
                <Input id="inv-cphone" type="tel" placeholder="+94 …" autoComplete="off" className={CONTROL} {...register("customerPhone")} />
              </Field>
              <Field label="Email" htmlFor="inv-cemail" error={errors.customerEmail?.message}>
                <Input id="inv-cemail" type="email" placeholder="Optional" autoComplete="off" className={CONTROL} aria-invalid={!!errors.customerEmail} {...register("customerEmail")} />
              </Field>
              <Field label="Address" htmlFor="inv-caddr" className="sm:col-span-2" error={errors.customerAddress?.message}>
                <Textarea id="inv-caddr" rows={2} placeholder="Billing address" {...register("customerAddress")} />
              </Field>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink/45">Items</h2>
            <div className="space-y-3">
              {fields.map((field, i) => {
                const line = watched.items?.[i];
                const isMain = !!field.saleId && field.saleId === initial.saleId;
                const isBankCharge = BANK_CHARGE_RE.test((line?.desc ?? field.desc ?? "").trim());
                const recording = !!line?.record;
                const detected = detectSaleKind(line?.desc ?? "");
                const kind = line?.recordKind && line.recordKind !== "auto" ? line.recordKind : detected;
                const itemErrors = errors.items?.[i];
                return (
                <div key={field.id} className="space-y-2.5 rounded-xl border border-ink/10 bg-paper-soft p-3">
                  <input type="hidden" {...register(`items.${i}.saleKind`)} />
                  <input type="hidden" {...register(`items.${i}.saleId`)} />
                  <input type="checkbox" hidden {...register(`items.${i}.linked`)} />
                  <Field label="Description" htmlFor={`item-desc-${i}`} error={errors.items?.[i]?.desc?.message}>
                    <Textarea id={`item-desc-${i}`} rows={2} placeholder="iPhone 17 Pro 256GB – Silver" {...register(`items.${i}.desc`)} />
                  </Field>
                  <div className="grid grid-cols-[88px_minmax(0,1fr)_44px] items-end gap-2">
                    <Field label="Qty" htmlFor={`item-qty-${i}`} error={errors.items?.[i]?.qty?.message}>
                      <Input id={`item-qty-${i}`} type="number" inputMode="numeric" min={0} step={1} className={CONTROL} {...register(`items.${i}.qty`, { valueAsNumber: true })} />
                    </Field>
                    <Field label="Unit price" htmlFor={`item-price-${i}`} error={errors.items?.[i]?.unit_price?.message}>
                      <Input id={`item-price-${i}`} type="number" inputMode="decimal" min={0} step="any" className={CONTROL} {...register(`items.${i}.unit_price`, { valueAsNumber: true })} />
                    </Field>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="h-11 w-11 sm:h-9 sm:w-9"
                      onClick={() => remove(i)}
                      aria-label="Remove item"
                    >
                      <X className="size-4" />
                    </Button>
                  </div>

                  {isMain ? (
                    <p className="rounded-lg bg-ink/5 px-3 py-2 text-xs text-ink/55">
                      This is the {field.saleKind === "accessory" ? "accessory" : "phone"} sale you&apos;re invoicing — it&apos;s already in
                      your sales.
                    </p>
                  ) : isBankCharge ? null : (
                    <div className="space-y-2.5 border-t border-ink/8 pt-2.5">
                      <label className="flex min-h-11 cursor-pointer items-center gap-2.5 text-[13px] font-semibold text-ink/80 sm:min-h-8">
                        <input type="checkbox" className="size-5 accent-[var(--brand)] sm:size-4" {...register(`items.${i}.record`)} />
                        Also record this in sales
                      </label>
                      {recording && (
                        <div className="space-y-2.5 rounded-lg bg-paper p-2.5">
                          <p className="text-xs text-ink/60">
                            {field.linked ? (
                              <>
                                Picked from your <b className="text-ink">{kind === "phone" ? "Phone Sales" : "Accessories"}</b> — it&apos;s linked to this
                                invoice, so editing it here updates the sale.
                              </>
                            ) : (
                            <>Detected as{" "}
                            <b className={kind === "phone" ? "text-brand" : "text-ink"}>
                              {kind === "phone" ? "a phone sale" : "an accessory sale"}
                            </b>
                            {line?.recordKind === "auto" ? "" : " (you chose this)"} — it&apos;ll be added to{" "}
                            {kind === "phone" ? "Phone Sales" : "Accessories"} with this invoice&apos;s customer and date.</>
                            )}
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            <Field label="Cost each (Rs)" htmlFor={`item-cost-${i}`} required error={itemErrors?.unitCost?.message}>
                              <Input
                                id={`item-cost-${i}`}
                                type="number"
                                inputMode="decimal"
                                min={0}
                                step="any"
                                placeholder="0"
                                className={CONTROL}
                                aria-invalid={!!itemErrors?.unitCost}
                                {...register(`items.${i}.unitCost`)}
                              />
                            </Field>
                            {!field.linked && (
                            <Field label="Type" htmlFor={`item-kind-${i}`}>
                              <select
                                id={`item-kind-${i}`}
                                className={cn(
                                  "w-full rounded-lg border border-input bg-transparent px-2.5 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm",
                                  CONTROL,
                                )}
                                {...register(`items.${i}.recordKind`)}
                              >
                                <option value="auto">Auto ({detected === "phone" ? "phone" : "accessory"})</option>
                                <option value="phone">Phone</option>
                                <option value="accessory">Accessory</option>
                              </select>
                            </Field>
                            )}
                          </div>
                          {field.saleId && !field.linked && (
                            <p className="text-xs text-ink/45">Already in your sales — changes here update it.</p>
                          )}
                        </div>
                      )}
                      {!recording && field.saleId && (
                        <p className="text-xs text-amber-700">
                          {field.linked
                            ? "Saving will take this off the invoice's sales link — the sale itself stays in your sales."
                            : "Saving will remove this item's sale record, since it's unticked."}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" className={`${BTN} w-full gap-1.5`} onClick={() => setPickerOpen(true)}>
                <ListPlus className="size-4" />
                Add from your sales
              </Button>
              <Button type="button" variant="outline" className={`${BTN} flex-1 border-dashed`} onClick={() => append(NEW_ITEM)}>
                <Plus className="size-4" />
                Add item
              </Button>
              <Button type="button" variant="outline" className={`${BTN} flex-1 border-dashed`} onClick={addBankCharge}>
                <Plus className="size-4" />
                Bank charge {bankPct}%
              </Button>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink/45">Adjustments</h2>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Discount (LKR)" htmlFor="inv-discount" error={errors.discount?.message}>
                <Input id="inv-discount" type="number" inputMode="decimal" min={0} step="any" className={CONTROL} {...register("discount", { valueAsNumber: true })} />
              </Field>
              <Field label="Tax / VAT %" htmlFor="inv-tax" error={errors.taxPercent?.message}>
                <Input id="inv-tax" type="number" inputMode="decimal" min={0} step="any" className={CONTROL} {...register("taxPercent", { valueAsNumber: true })} />
              </Field>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink/45">Notes / terms</h2>
            <Textarea aria-label="Notes and terms" rows={6} {...register("notes")} />
          </section>

          <AddFromSalesDialog
            open={pickerOpen}
            onOpenChange={setPickerOpen}
            invoiceDate={watched.invoiceDate || initial.invoiceDate}
            customerName={watched.customerName ?? ""}
            excludeIds={[initial.saleId, ...(watched.items ?? []).map((i) => i?.saleId)].filter((v): v is string => !!v)}
            onAdd={addPickedSales}
          />

          <datalist id="dl-inv-pay">
            {settings.payment_methods.map((m) => (
              <option key={m} value={m} />
            ))}
          </datalist>
          <button type="submit" className="hidden" aria-hidden tabIndex={-1} />
        </form>

        <div className={cn("min-w-0", view === "edit" && "hidden lg:block")}>
          <div className="lg:sticky lg:top-16">
            <div className="rounded-2xl bg-ink/[0.04] p-2 sm:p-4">
              <ScaledPaper>
                <InvoicePaper data={paperData} business={business} />
              </ScaledPaper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
