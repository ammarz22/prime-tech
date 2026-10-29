"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BTN, CONTROL, Field } from "@/components/admin/sales/shared";
import { updateTrackerSettingsAction } from "@/lib/actions/admin-sales";
import { trackerSettingsSchema, type TrackerSettingsInput } from "@/lib/validations/sales";
import { formatInvoiceNumber } from "@/lib/utils/invoice";
import type { TrackerSettings } from "@/types/database";

function SettingsCard({ title, aside, children, className }: { title: string; aside?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-ink/8 bg-paper p-4 sm:p-5 ${className ?? ""}`}>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h2 className="text-sm font-bold">{title}</h2>
        {aside && <span className="text-xs text-ink/45">{aside}</span>}
      </div>
      {children}
    </section>
  );
}

const EXPORTS = [
  { kind: "phones", label: "Phone sales" },
  { kind: "accessories", label: "Accessory sales" },
  { kind: "expenses", label: "Expenses" },
  { kind: "invoices", label: "Invoices" },
] as const;

export function TrackerSettingsForm({ settings }: { settings: TrackerSettings }) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<TrackerSettingsInput>({
    resolver: zodResolver(trackerSettingsSchema),
    defaultValues: {
      address: settings.address ?? "",
      phone: settings.phone ?? "",
      email: settings.email ?? "",
      footer: settings.footer ?? "",
      terms: settings.terms ?? "",
      bankDetails: settings.bank_details ?? "",
      invoicePrefix: settings.invoice_prefix,
      nextInvoiceNumber: settings.next_invoice_number,
      bankChargePercent: settings.bank_charge_percent,
      suppliers: settings.suppliers.join("\n"),
      paymentMethods: settings.payment_methods.join("\n"),
      accessoryTypes: settings.accessory_types.join("\n"),
      expenseCategories: settings.expense_categories.join("\n"),
    },
  });

  const [prefix, next] = useWatch({ control, name: ["invoicePrefix", "nextInvoiceNumber"] });
  const nextPreview = formatInvoiceNumber({
    invoice_prefix: prefix || "INV-",
    next_invoice_number: Number.isFinite(next) && next > 0 ? next : 1,
  });

  async function onSubmit(values: TrackerSettingsInput) {
    setServerError(null);
    const result = await updateTrackerSettingsAction(values);
    if (!result.success) {
      setServerError(result.error ?? "Couldn't save the settings — your edits are still here, try again.");
      return;
    }
    toast.success("Settings saved");
    router.refresh();
  }

  const listField = (name: "suppliers" | "paymentMethods" | "accessoryTypes" | "expenseCategories", label: string, aside = "One per line") => (
    <SettingsCard title={label} aside={aside}>
      <Textarea aria-label={label} rows={7} {...register(name)} />
    </SettingsCard>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <SettingsCard title="Business details" aside="Shown on invoices">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Address" htmlFor="st-address" className="sm:col-span-2" error={errors.address?.message}>
              <Input id="st-address" className={CONTROL} {...register("address")} />
            </Field>
            <Field label="Phone" htmlFor="st-phone" error={errors.phone?.message}>
              <Input id="st-phone" className={CONTROL} {...register("phone")} />
            </Field>
            <Field label="Email" htmlFor="st-email" error={errors.email?.message}>
              <Input id="st-email" className={CONTROL} {...register("email")} />
            </Field>
            <Field label="Invoice footer" htmlFor="st-footer" className="sm:col-span-2" error={errors.footer?.message}>
              <Input id="st-footer" className={CONTROL} {...register("footer")} />
            </Field>
          </div>
        </SettingsCard>

        <SettingsCard title="Invoice defaults">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Number prefix" htmlFor="st-prefix" error={errors.invoicePrefix?.message}>
              <Input id="st-prefix" className={CONTROL} {...register("invoicePrefix")} />
            </Field>
            <Field label="Next invoice number" htmlFor="st-next" hint={`Next: ${nextPreview}`} error={errors.nextInvoiceNumber?.message}>
              <Input id="st-next" type="number" inputMode="numeric" min={1} step={1} className={CONTROL} {...register("nextInvoiceNumber", { valueAsNumber: true })} />
            </Field>
            <Field label="Bank charge %" htmlFor="st-bank" hint="Added for installment payments" error={errors.bankChargePercent?.message}>
              <Input id="st-bank" type="number" inputMode="decimal" min={0} step="any" className={CONTROL} {...register("bankChargePercent", { valueAsNumber: true })} />
            </Field>
            <Field label="Notes / terms" htmlFor="st-terms" className="sm:col-span-2" error={errors.terms?.message}>
              <Textarea id="st-terms" rows={6} {...register("terms")} />
            </Field>
            <Field
              label="Bank details (optional)"
              htmlFor="st-bankd"
              className="sm:col-span-2"
              hint="If filled in, shown under “Payment information”. If empty, the payment method is shown there."
              error={errors.bankDetails?.message}
            >
              <Textarea id="st-bankd" rows={4} placeholder={"Bank: …\nAccount name: Prime Tech\nAccount no: …"} {...register("bankDetails")} />
            </Field>
          </div>
        </SettingsCard>

        {listField("suppliers", "Your suppliers")}
        {listField("paymentMethods", "Payment methods")}
        {listField("accessoryTypes", "Accessory types")}
        {listField("expenseCategories", "Expense categories")}

        <SettingsCard title="Backup" aside="Download your records as spreadsheets (CSV)" className="lg:col-span-2">
          <div className="flex flex-wrap gap-2">
            {EXPORTS.map((e) => (
              <Button key={e.kind} render={<a href={`/admin/sales/export/${e.kind}`} download />} variant="outline" className={`${BTN} gap-1.5`}>
                <Download className="size-4" />
                {e.label}
              </Button>
            ))}
          </div>
        </SettingsCard>
      </div>

      {serverError && (
        <p role="alert" className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {serverError}
        </p>
      )}

      <div className="sticky bottom-20 z-10 flex justify-end lg:bottom-4">
        <Button type="submit" className={`${BTN} px-6 shadow-lg`} disabled={isSubmitting || !isDirty}>
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
          Save settings
        </Button>
      </div>
    </form>
  );
}
