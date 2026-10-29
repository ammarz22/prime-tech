"use client";

import { useState } from "react";
import { Controller, useForm, useWatch, type Control, type FieldValues, type Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { BTN, CONTROL, Field, FormSection, SELECT_TRIGGER } from "@/components/admin/sales/shared";
import {
  createAccessorySaleAction,
  createExpenseAction,
  createPhoneSaleAction,
  updateAccessorySaleAction,
  updateExpenseAction,
  updatePhoneSaleAction,
  type SalesActionResult,
} from "@/lib/actions/admin-sales";
import {
  accessorySaleSchema,
  expenseSchema,
  phoneSaleSchema,
  type AccessorySaleInput,
  type ExpenseInput,
  type PhoneSaleInput,
} from "@/lib/validations/sales";
import { rs, todayISO } from "@/lib/utils/sales-format";
import type { SalesSuggestions } from "@/lib/db/sales";
import type { AccessorySaleRow, BusinessExpense, PhoneSaleRow, TrackerSettings } from "@/types/database";
import { cn } from "@/lib/utils";

const uniq = (list: (string | null | undefined)[]) =>
  Array.from(new Set(list.map((s) => (s ?? "").trim()).filter(Boolean)));

function DataList({ id, options }: { id: string; options: string[] }) {
  return (
    <datalist id={id}>
      {options.map((o) => (
        <option key={o} value={o} />
      ))}
    </datalist>
  );
}

/** Keeps the saved value selectable even if it was later removed from the settings list. */
function withCurrent(options: string[], current: string | undefined) {
  return current && !options.includes(current) ? [...options, current] : options;
}

function SheetFormShell({
  title,
  description,
  submitLabel,
  submitting,
  error,
  onSubmit,
  onCancel,
  children,
}: {
  title: string;
  description: string;
  submitLabel: string;
  submitting: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  children: React.ReactNode;
}) {
  return (
    <form onSubmit={onSubmit} noValidate className="flex min-h-0 flex-1 flex-col">
      <SheetHeader className="border-b border-ink/8 pr-14">
        <SheetTitle className="text-lg font-semibold">{title}</SheetTitle>
        <SheetDescription>{description}</SheetDescription>
      </SheetHeader>
      <div className="flex-1 space-y-6 overflow-y-auto px-4 py-5">{children}</div>
      {error && (
        <p role="alert" className="border-t border-ink/8 bg-destructive/5 px-4 py-2.5 text-sm text-destructive">
          {error}
        </p>
      )}
      <SheetFooter className="flex-row justify-end gap-2 border-t border-ink/8 bg-paper pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <Button type="button" variant="outline" className={cn(BTN, "flex-1 sm:flex-none")} onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" className={cn(BTN, "flex-1 sm:flex-none")} disabled={submitting}>
          {submitting && <Loader2 className="size-4 animate-spin" />}
          {submitLabel}
        </Button>
      </SheetFooter>
    </form>
  );
}

function ProfitPreview({ cost, sale }: { cost: number; sale: number }) {
  const c = Number.isFinite(cost) ? cost : 0;
  const s = Number.isFinite(sale) ? sale : 0;
  const profit = s - c;
  const margin = s ? (profit / s) * 100 : null;
  return (
    <div className="col-span-full grid grid-cols-2 gap-3" aria-live="polite">
      <div className="rounded-xl bg-ink/5 px-3 py-2.5">
        <p className="text-xs font-semibold text-ink/50">Profit</p>
        <p className={cn("mt-0.5 text-lg font-bold tabular-nums", profit < 0 ? "text-red-600" : "text-green-700")}>{rs(profit)}</p>
      </div>
      <div className="rounded-xl bg-ink/5 px-3 py-2.5">
        <p className="text-xs font-semibold text-ink/50">Margin</p>
        <p className="mt-0.5 text-lg font-bold tabular-nums">{margin === null ? "—" : `${margin.toFixed(1)}%`}</p>
      </div>
    </div>
  );
}

function OptionSelect<T extends FieldValues>({
  control,
  name,
  id,
  options,
}: {
  control: Control<T>;
  name: Path<T>;
  id: string;
  options: string[];
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select value={field.value as string} onValueChange={(v) => field.onChange(v ?? "")}>
          <SelectTrigger id={id} className={SELECT_TRIGGER}>
            <SelectValue>{(value: string) => value || "Choose…"}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {options.map((o) => (
              <SelectItem key={o} value={o}>
                {o}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
}

const moneyAttrs = { type: "number", inputMode: "decimal", step: "any", min: 0 } as const;

// ---------------------------------------------------------------------------
// Phone sale
// ---------------------------------------------------------------------------
export function PhoneSaleForm({
  row,
  settings,
  suggestions,
  onSaved,
  onCancel,
}: {
  row?: PhoneSaleRow;
  settings: TrackerSettings;
  suggestions: SalesSuggestions;
  onSaved: (result: SalesActionResult, values: PhoneSaleInput, isNew: boolean) => void;
  onCancel: () => void;
}) {
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PhoneSaleInput>({
    resolver: zodResolver(phoneSaleSchema),
    defaultValues: {
      saleDate: row?.sale_date ?? todayISO(),
      model: row?.model ?? "",
      storage: row?.storage ?? "",
      colour: row?.colour ?? "",
      modelNo: row?.model_no ?? "",
      serialNo: row?.serial_no ?? "",
      imei: row?.imei ?? "",
      customerName: row?.customer_name ?? "",
      customerPhone: row?.customer_phone ?? "",
      customerAddress: row?.customer_address ?? "",
      customerEmail: row?.customer_email ?? "",
      supplier: row?.supplier ?? "",
      costPrice: row ? row.cost_price : (undefined as unknown as number),
      sellingPrice: row ? row.selling_price : (undefined as unknown as number),
      paymentMethod: row?.payment_method ?? "",
      notes: row?.notes ?? "",
    },
  });
  const [cost, sale] = useWatch({ control, name: ["costPrice", "sellingPrice"] });

  async function submit(values: PhoneSaleInput) {
    setServerError(null);
    const result = row ? await updatePhoneSaleAction(row.id, values) : await createPhoneSaleAction(values);
    if (!result.success) {
      setServerError(result.error ?? "Something went wrong. Your entries are still here — try again.");
      return;
    }
    onSaved(result, values, !row);
  }

  const err = (k: keyof PhoneSaleInput) => errors[k]?.message as string | undefined;

  return (
    <SheetFormShell
      title={row ? "Edit phone sale" : "Add phone sale"}
      description="Profit is worked out as you type."
      submitLabel={row ? "Save changes" : "Save sale"}
      submitting={isSubmitting}
      error={serverError}
      onSubmit={handleSubmit(submit)}
      onCancel={onCancel}
    >
      <FormSection title="Phone">
        <Field label="Date" htmlFor="ps-date" required error={err("saleDate")}>
          <Input id="ps-date" type="date" className={CONTROL} aria-invalid={!!errors.saleDate} {...register("saleDate")} />
        </Field>
        <Field label="Phone model" htmlFor="ps-model" required error={err("model")}>
          <Input id="ps-model" list="dl-models" placeholder="iPhone 17 Pro" autoComplete="off" className={CONTROL} aria-invalid={!!errors.model} {...register("model")} />
        </Field>
        <Field label="Storage" htmlFor="ps-storage" error={err("storage")}>
          <Input id="ps-storage" list="dl-storage" placeholder="256GB" autoComplete="off" className={CONTROL} {...register("storage")} />
        </Field>
        <Field label="Colour" htmlFor="ps-colour" error={err("colour")}>
          <Input id="ps-colour" placeholder="Silver" autoComplete="off" className={CONTROL} {...register("colour")} />
        </Field>
        <Field label="Model no." htmlFor="ps-modelno" hint="Shown on the invoice" error={err("modelNo")}>
          <Input id="ps-modelno" placeholder="A3256" autoComplete="off" className={CONTROL} {...register("modelNo")} />
        </Field>
        <Field label="Serial no." htmlFor="ps-serial" error={err("serialNo")}>
          <Input id="ps-serial" placeholder="DKF092HGWL" autoComplete="off" className={CONTROL} {...register("serialNo")} />
        </Field>
        <Field label="IMEI" htmlFor="ps-imei" className="sm:col-span-2" error={err("imei")}>
          <Input id="ps-imei" inputMode="numeric" placeholder="35…" autoComplete="off" className={CONTROL} {...register("imei")} />
        </Field>
      </FormSection>

      <FormSection title="Customer">
        <Field label="Customer name" htmlFor="ps-cname" error={err("customerName")}>
          <Input id="ps-cname" list="dl-customers" placeholder="Lahiru Rupasinghe" autoComplete="off" className={CONTROL} {...register("customerName")} />
        </Field>
        <Field label="Phone" htmlFor="ps-cphone" error={err("customerPhone")}>
          <Input id="ps-cphone" type="tel" placeholder="+94 7X XXX XXXX" autoComplete="off" className={CONTROL} {...register("customerPhone")} />
        </Field>
        <Field label="Address" htmlFor="ps-caddr" className="sm:col-span-2" error={err("customerAddress")}>
          <Input id="ps-caddr" placeholder="Street, City" autoComplete="off" className={CONTROL} {...register("customerAddress")} />
        </Field>
        <Field label="Email" htmlFor="ps-cemail" className="sm:col-span-2" error={err("customerEmail")}>
          <Input id="ps-cemail" type="email" placeholder="Optional" autoComplete="off" className={CONTROL} aria-invalid={!!errors.customerEmail} {...register("customerEmail")} />
        </Field>
      </FormSection>

      <FormSection title="Money">
        <Field label="Sourced from" htmlFor="ps-supplier" className="sm:col-span-2" error={err("supplier")}>
          <Input id="ps-supplier" list="dl-suppliers" placeholder="Supplier name" autoComplete="off" className={CONTROL} {...register("supplier")} />
        </Field>
        <Field label="Cost price (Rs)" htmlFor="ps-cost" required error={err("costPrice")}>
          <Input id="ps-cost" {...moneyAttrs} placeholder="0" className={CONTROL} aria-invalid={!!errors.costPrice} {...register("costPrice", { valueAsNumber: true })} />
        </Field>
        <Field label="Selling price (Rs)" htmlFor="ps-price" required error={err("sellingPrice")}>
          <Input id="ps-price" {...moneyAttrs} placeholder="0" className={CONTROL} aria-invalid={!!errors.sellingPrice} {...register("sellingPrice", { valueAsNumber: true })} />
        </Field>
        <ProfitPreview cost={cost} sale={sale} />
        <Field label="Payment method" htmlFor="ps-pay" className="sm:col-span-2" error={err("paymentMethod")}>
          <Input id="ps-pay" list="dl-pay" placeholder="Cash" autoComplete="off" className={CONTROL} {...register("paymentMethod")} />
        </Field>
        <Field label="Notes" htmlFor="ps-notes" className="sm:col-span-2" error={err("notes")}>
          <Textarea id="ps-notes" rows={3} placeholder="Warranty, condition, anything else" {...register("notes")} />
        </Field>
      </FormSection>

      <DataList id="dl-models" options={uniq(suggestions.models)} />
      <DataList id="dl-storage" options={uniq(["64GB", "128GB", "256GB", "512GB", "1TB", ...suggestions.storages])} />
      <DataList id="dl-customers" options={uniq(suggestions.customers)} />
      <DataList id="dl-suppliers" options={uniq([...settings.suppliers, ...suggestions.suppliers])} />
      <DataList id="dl-pay" options={uniq(settings.payment_methods)} />
    </SheetFormShell>
  );
}

// ---------------------------------------------------------------------------
// Accessory sale
// ---------------------------------------------------------------------------
export function AccessorySaleForm({
  row,
  settings,
  suggestions,
  onSaved,
  onCancel,
}: {
  row?: AccessorySaleRow;
  settings: TrackerSettings;
  suggestions: SalesSuggestions;
  onSaved: (result: SalesActionResult, values: AccessorySaleInput, isNew: boolean) => void;
  onCancel: () => void;
}) {
  const [serverError, setServerError] = useState<string | null>(null);
  const types = withCurrent(settings.accessory_types, row?.type ?? undefined);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AccessorySaleInput>({
    resolver: zodResolver(accessorySaleSchema),
    defaultValues: {
      saleDate: row?.sale_date ?? todayISO(),
      type: row?.type ?? settings.accessory_types[0] ?? "",
      name: row?.name ?? "",
      qty: row?.qty ?? 1,
      supplier: row?.supplier ?? "",
      customerName: row?.customer_name ?? "",
      customerPhone: row?.customer_phone ?? "",
      unitCost: row ? row.unit_cost : (undefined as unknown as number),
      unitPrice: row ? row.unit_price : (undefined as unknown as number),
      paymentMethod: row?.payment_method ?? "",
      notes: row?.notes ?? "",
    },
  });
  const [qty, unitCost, unitPrice] = useWatch({ control, name: ["qty", "unitCost", "unitPrice"] });
  const q = Number.isFinite(qty) ? qty : 0;

  async function submit(values: AccessorySaleInput) {
    setServerError(null);
    const result = row ? await updateAccessorySaleAction(row.id, values) : await createAccessorySaleAction(values);
    if (!result.success) {
      setServerError(result.error ?? "Something went wrong. Your entries are still here — try again.");
      return;
    }
    onSaved(result, values, !row);
  }

  const err = (k: keyof AccessorySaleInput) => errors[k]?.message as string | undefined;

  return (
    <SheetFormShell
      title={row ? "Edit accessory sale" : "Add accessory sale"}
      description="Cases, chargers, earbuds and everything else."
      submitLabel={row ? "Save changes" : "Save sale"}
      submitting={isSubmitting}
      error={serverError}
      onSubmit={handleSubmit(submit)}
      onCancel={onCancel}
    >
      <FormSection title="Item">
        <Field label="Date" htmlFor="as-date" required error={err("saleDate")}>
          <Input id="as-date" type="date" className={CONTROL} aria-invalid={!!errors.saleDate} {...register("saleDate")} />
        </Field>
        <Field label="Type" htmlFor="as-type" error={err("type")}>
          <OptionSelect control={control} name="type" id="as-type" options={types} />
        </Field>
        <Field label="Accessory name" htmlFor="as-name" required className="sm:col-span-2" error={err("name")}>
          <Input id="as-name" list="dl-acc" placeholder="Clear MagSafe Case (iPhone 17)" autoComplete="off" className={CONTROL} aria-invalid={!!errors.name} {...register("name")} />
        </Field>
        <Field label="Quantity" htmlFor="as-qty" required error={err("qty")}>
          <Input id="as-qty" type="number" inputMode="numeric" step={1} min={1} placeholder="1" className={CONTROL} aria-invalid={!!errors.qty} {...register("qty", { valueAsNumber: true })} />
        </Field>
        <Field label="Sourced from" htmlFor="as-supplier" error={err("supplier")}>
          <Input id="as-supplier" list="dl-suppliers" placeholder="Supplier name" autoComplete="off" className={CONTROL} {...register("supplier")} />
        </Field>
      </FormSection>

      <FormSection title="Customer">
        <Field label="Customer name" htmlFor="as-cname" error={err("customerName")}>
          <Input id="as-cname" list="dl-customers" autoComplete="off" className={CONTROL} {...register("customerName")} />
        </Field>
        <Field label="Phone" htmlFor="as-cphone" error={err("customerPhone")}>
          <Input id="as-cphone" type="tel" placeholder="+94 7X XXX XXXX" autoComplete="off" className={CONTROL} {...register("customerPhone")} />
        </Field>
      </FormSection>

      <FormSection title="Money">
        <Field label="Cost per item (Rs)" htmlFor="as-cost" required error={err("unitCost")}>
          <Input id="as-cost" {...moneyAttrs} placeholder="0" className={CONTROL} aria-invalid={!!errors.unitCost} {...register("unitCost", { valueAsNumber: true })} />
        </Field>
        <Field label="Selling price per item (Rs)" htmlFor="as-price" required error={err("unitPrice")}>
          <Input id="as-price" {...moneyAttrs} placeholder="0" className={CONTROL} aria-invalid={!!errors.unitPrice} {...register("unitPrice", { valueAsNumber: true })} />
        </Field>
        <ProfitPreview cost={q * (Number.isFinite(unitCost) ? unitCost : 0)} sale={q * (Number.isFinite(unitPrice) ? unitPrice : 0)} />
        <Field label="Payment method" htmlFor="as-pay" className="sm:col-span-2" error={err("paymentMethod")}>
          <Input id="as-pay" list="dl-pay" placeholder="Cash" autoComplete="off" className={CONTROL} {...register("paymentMethod")} />
        </Field>
        <Field label="Notes" htmlFor="as-notes" className="sm:col-span-2" error={err("notes")}>
          <Textarea id="as-notes" rows={3} {...register("notes")} />
        </Field>
      </FormSection>

      <DataList id="dl-acc" options={uniq(suggestions.accessories)} />
      <DataList id="dl-customers" options={uniq(suggestions.customers)} />
      <DataList id="dl-suppliers" options={uniq([...settings.suppliers, ...suggestions.suppliers])} />
      <DataList id="dl-pay" options={uniq(settings.payment_methods)} />
    </SheetFormShell>
  );
}

// ---------------------------------------------------------------------------
// Expense
// ---------------------------------------------------------------------------
export function ExpenseForm({
  row,
  settings,
  onSaved,
  onCancel,
}: {
  row?: BusinessExpense;
  settings: TrackerSettings;
  onSaved: (result: SalesActionResult, values: ExpenseInput, isNew: boolean) => void;
  onCancel: () => void;
}) {
  const [serverError, setServerError] = useState<string | null>(null);
  const categories = withCurrent(settings.expense_categories, row?.category);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ExpenseInput>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      expenseDate: row?.expense_date ?? todayISO(),
      category: row?.category ?? settings.expense_categories[0] ?? "",
      description: row?.description ?? "",
      paidTo: row?.paid_to ?? "",
      amount: row ? row.amount : (undefined as unknown as number),
      paymentMethod: row?.payment_method ?? "",
      notes: row?.notes ?? "",
    },
  });

  async function submit(values: ExpenseInput) {
    setServerError(null);
    const result = row ? await updateExpenseAction(row.id, values) : await createExpenseAction(values);
    if (!result.success) {
      setServerError(result.error ?? "Something went wrong. Your entries are still here — try again.");
      return;
    }
    onSaved(result, values, !row);
  }

  const err = (k: keyof ExpenseInput) => errors[k]?.message as string | undefined;

  return (
    <SheetFormShell
      title={row ? "Edit expense" : "Add expense"}
      description="Running costs that aren't stock — rent, ads, transport, salaries."
      submitLabel={row ? "Save changes" : "Save expense"}
      submitting={isSubmitting}
      error={serverError}
      onSubmit={handleSubmit(submit)}
      onCancel={onCancel}
    >
      <FormSection title="Expense">
        <Field label="Date" htmlFor="ex-date" required error={err("expenseDate")}>
          <Input id="ex-date" type="date" className={CONTROL} aria-invalid={!!errors.expenseDate} {...register("expenseDate")} />
        </Field>
        <Field label="Category" htmlFor="ex-cat" required error={err("category")}>
          <OptionSelect control={control} name="category" id="ex-cat" options={categories} />
        </Field>
        <Field label="Description" htmlFor="ex-desc" className="sm:col-span-2" error={err("description")}>
          <Input id="ex-desc" placeholder="Facebook boost — iPhone 17 post" autoComplete="off" className={CONTROL} {...register("description")} />
        </Field>
        <Field label="Paid to" htmlFor="ex-paidto" error={err("paidTo")}>
          <Input id="ex-paidto" placeholder="Meta" autoComplete="off" className={CONTROL} {...register("paidTo")} />
        </Field>
        <Field label="Amount (Rs)" htmlFor="ex-amount" required error={err("amount")}>
          <Input id="ex-amount" {...moneyAttrs} placeholder="0" className={CONTROL} aria-invalid={!!errors.amount} {...register("amount", { valueAsNumber: true })} />
        </Field>
        <Field label="Payment method" htmlFor="ex-pay" className="sm:col-span-2" error={err("paymentMethod")}>
          <Input id="ex-pay" list="dl-pay" autoComplete="off" className={CONTROL} {...register("paymentMethod")} />
        </Field>
        <Field label="Notes" htmlFor="ex-notes" className="sm:col-span-2" error={err("notes")}>
          <Textarea id="ex-notes" rows={3} {...register("notes")} />
        </Field>
      </FormSection>
      <DataList id="dl-pay" options={uniq(settings.payment_methods)} />
    </SheetFormShell>
  );
}
