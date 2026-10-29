import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { InvoiceEditor } from "@/components/admin/invoice/invoice-editor";
import { getAccessorySaleById, getPhoneSaleById, getTrackerSettings } from "@/lib/db/sales";
import {
  blankInvoice,
  formatInvoiceNumber,
  invoiceFromAccessorySale,
  invoiceFromPhoneSale,
  paperBusiness,
  type InvoiceDraft,
} from "@/lib/utils/invoice";

export const metadata: Metadata = { title: "New invoice" };

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** `/admin/invoices/new` — blank, or pre-filled from `?sale=<id>&kind=phone|accessory`. */
export default async function NewInvoicePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const saleId = first(params.sale);
  const kind = first(params.kind);
  const settings = await getTrackerSettings();

  let draft: InvoiceDraft = blankInvoice(settings);

  if (saleId) {
    if (!UUID.test(saleId) || (kind !== "phone" && kind !== "accessory")) notFound();
    if (kind === "phone") {
      const sale = await getPhoneSaleById(saleId);
      if (!sale) notFound();
      // Each sale gets one invoice — reopen the existing one.
      if (sale.invoice_id) redirect(`/admin/invoices/${sale.invoice_id}`);
      draft = invoiceFromPhoneSale(sale, settings);
    } else {
      const sale = await getAccessorySaleById(saleId);
      if (!sale) notFound();
      if (sale.invoice_id) redirect(`/admin/invoices/${sale.invoice_id}`);
      draft = invoiceFromAccessorySale(sale, settings);
    }
  }

  return (
    <InvoiceEditor
      key={saleId ?? "blank"}
      initial={draft}
      settings={settings}
      nextNumber={formatInvoiceNumber(settings)}
      business={paperBusiness(settings)}
    />
  );
}
