import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InvoiceEditor } from "@/components/admin/invoice/invoice-editor";
import { getInvoiceById } from "@/lib/db/invoices";
import { getTrackerSettings } from "@/lib/db/sales";
import { draftFromInvoice, formatInvoiceNumber, paperBusiness } from "@/lib/utils/invoice";

export const metadata: Metadata = { title: "Invoice" };

export default async function EditInvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [invoice, settings] = await Promise.all([getInvoiceById(id), getTrackerSettings()]);
  if (!invoice) notFound();

  return (
    <InvoiceEditor
      key={invoice.id + invoice.updated_at}
      initial={draftFromInvoice(invoice)}
      settings={settings}
      nextNumber={formatInvoiceNumber(settings)}
      business={paperBusiness(settings)}
    />
  );
}
