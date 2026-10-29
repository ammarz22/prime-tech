import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InvoicePrintView } from "@/components/admin/invoice/invoice-print-view";
import { getInvoiceById } from "@/lib/db/invoices";
import { getTrackerSettings } from "@/lib/db/sales";
import { invoiceFileTitle, paperBusiness } from "@/lib/utils/invoice";

type Props = { params: Promise<{ id: string }> };

// `document.title` becomes the saved PDF's file name: `INV-0061 - Customer Name`.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const invoice = await getInvoiceById(id);
  return { title: { absolute: invoice ? invoiceFileTitle(invoice.invoice_no, invoice.customer_name) : "Invoice" } };
}

export default async function PrintInvoicePage({ params }: Props) {
  const { id } = await params;
  const [invoice, settings] = await Promise.all([getInvoiceById(id), getTrackerSettings()]);
  if (!invoice) notFound();

  return (
    <InvoicePrintView
      invoiceId={invoice.id}
      title={invoiceFileTitle(invoice.invoice_no, invoice.customer_name)}
      business={paperBusiness(settings)}
      data={{
        invoiceNo: invoice.invoice_no,
        invoiceDate: invoice.invoice_date,
        dueDate: invoice.due_date ?? "",
        customerName: invoice.customer_name ?? "",
        customerPhone: invoice.customer_phone ?? "",
        customerEmail: invoice.customer_email ?? "",
        customerAddress: invoice.customer_address ?? "",
        items: invoice.items,
        discount: invoice.discount,
        taxPercent: invoice.tax_percent,
        paymentMethod: invoice.payment_method ?? "",
        notes: invoice.notes ?? "",
      }}
    />
  );
}
