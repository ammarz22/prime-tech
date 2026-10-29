import type { AccessorySale, Invoice, InvoiceItem, PhoneSale, SaleKind, TrackerSettings } from "@/types/database";
import { round2, todayISO } from "@/lib/utils/sales-format";

/** The invoice as the editor works with it (camelCase, one object). */
export interface InvoiceDraft {
  id: string | null;
  invoiceNo: string | null;
  invoiceDate: string;
  dueDate: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  items: InvoiceItem[];
  discount: number;
  taxPercent: number;
  paymentMethod: string;
  notes: string;
  saleKind: SaleKind | null;
  saleId: string | null;
}

export function invoiceTotals(items: InvoiceItem[], discount: number, taxPercent: number) {
  const sub = items.reduce((sum, i) => sum + (Number(i.qty) || 0) * (Number(i.unit_price) || 0), 0);
  const dis = Number(discount) || 0;
  const taxable = Math.max(0, sub - dis);
  const tax = (taxable * (Number(taxPercent) || 0)) / 100;
  return { sub, dis, tax, total: round2(taxable + tax) };
}

/** `iPhone 17 Pro 256GB – Silver` */
export function phoneTitle(p: Pick<PhoneSale, "model" | "storage" | "colour">): string {
  return [p.model, p.storage].filter(Boolean).join(" ") + (p.colour ? " – " + p.colour : "");
}

/** `{model} {storage} – {colour} | Model {model_no} | Serial No. {serial} | IMEI: {imei}` (empty parts skipped). */
export function phoneInvoiceDesc(
  p: Pick<PhoneSale, "model" | "storage" | "colour" | "model_no" | "serial_no" | "imei">,
): string {
  const parts = [phoneTitle(p)];
  if (p.model_no) parts.push("Model " + p.model_no);
  if (p.serial_no) parts.push("Serial No. " + p.serial_no);
  if (p.imei) parts.push("IMEI: " + p.imei);
  return parts.join(" | ");
}

export const BANK_CHARGE_RE = /^bank charge/i;

export function isInstallment(paymentMethod: string | null | undefined): boolean {
  return /install/i.test(paymentMethod ?? "");
}

/** The `Bank Charge {pct}%` line: pct of the item total, rounded to 2 decimals. */
export function bankChargeItem(base: number, pct: number): InvoiceItem {
  return { desc: `Bank Charge ${pct}%`, qty: 1, unit_price: round2((base * pct) / 100) };
}

export function blankInvoice(settings: Pick<TrackerSettings, "terms">): InvoiceDraft {
  const today = todayISO();
  return {
    id: null,
    invoiceNo: null,
    invoiceDate: today,
    dueDate: today,
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    customerAddress: "",
    items: [{ desc: "", qty: 1, unit_price: 0 }],
    discount: 0,
    taxPercent: 0,
    paymentMethod: "",
    notes: settings.terms ?? "",
    saleKind: null,
    saleId: null,
  };
}

/** Pre-fills a new invoice from a phone sale. */
export function invoiceFromPhoneSale(sale: PhoneSale, settings: TrackerSettings): InvoiceDraft {
  const items: InvoiceItem[] = [
    { desc: phoneInvoiceDesc(sale), qty: 1, unit_price: Number(sale.selling_price), sale_kind: "phone", sale_id: sale.id },
  ];
  if (isInstallment(sale.payment_method)) {
    const pct = Number(settings.bank_charge_percent) || 3;
    items.push(bankChargeItem(items[0].qty * items[0].unit_price, pct));
  }
  return {
    ...blankInvoice(settings),
    invoiceDate: sale.sale_date,
    dueDate: sale.sale_date,
    customerName: sale.customer_name ?? "",
    customerPhone: sale.customer_phone ?? "",
    customerEmail: sale.customer_email ?? "",
    customerAddress: sale.customer_address ?? "",
    items,
    paymentMethod: sale.payment_method ?? "",
    saleKind: "phone",
    saleId: sale.id,
  };
}

/** Pre-fills a new invoice from an accessory sale. */
export function invoiceFromAccessorySale(sale: AccessorySale, settings: TrackerSettings): InvoiceDraft {
  const items: InvoiceItem[] = [
    { desc: sale.name, qty: Number(sale.qty) || 1, unit_price: Number(sale.unit_price), sale_kind: "accessory", sale_id: sale.id },
  ];
  if (isInstallment(sale.payment_method)) {
    const pct = Number(settings.bank_charge_percent) || 3;
    items.push(bankChargeItem(items[0].qty * items[0].unit_price, pct));
  }
  return {
    ...blankInvoice(settings),
    invoiceDate: sale.sale_date,
    dueDate: sale.sale_date,
    customerName: sale.customer_name ?? "",
    customerPhone: sale.customer_phone ?? "",
    items,
    paymentMethod: sale.payment_method ?? "",
    saleKind: "accessory",
    saleId: sale.id,
  };
}

/** `INV-0061 - Customer Name` — used as the page title so the saved PDF gets this file name. */
export function invoiceFileTitle(invoiceNo: string, customerName: string | null | undefined): string {
  return `${invoiceNo}${customerName ? " - " + customerName : ""}`.replace(/[\\/:*?"<>|]/g, "");
}

/**
 * Invoices made before lines could be linked to sales have no link on the line
 * that came from the invoice's own sale — it is always the first line, so mark it.
 */
function markMainLine(inv: Invoice): InvoiceItem[] {
  if (!inv.sale_id || !inv.sale_kind) return inv.items;
  if (inv.items.some((i) => i.sale_id === inv.sale_id)) return inv.items;
  return inv.items.map((item, index) => (index === 0 ? { ...item, sale_kind: inv.sale_kind, sale_id: inv.sale_id } : item));
}

/** The editor's working copy of a saved invoice. */
export function draftFromInvoice(inv: Invoice): InvoiceDraft {
  return {
    id: inv.id,
    invoiceNo: inv.invoice_no,
    invoiceDate: inv.invoice_date,
    dueDate: inv.due_date ?? "",
    customerName: inv.customer_name ?? "",
    customerPhone: inv.customer_phone ?? "",
    customerEmail: inv.customer_email ?? "",
    customerAddress: inv.customer_address ?? "",
    items: markMainLine(inv),
    discount: inv.discount,
    taxPercent: inv.tax_percent,
    paymentMethod: inv.payment_method ?? "",
    notes: inv.notes ?? "",
    saleKind: inv.sale_kind,
    saleId: inv.sale_id,
  };
}

/** The business block printed at the top / bottom of every invoice. */
export function paperBusiness(settings: TrackerSettings) {
  return {
    businessName: "PRIME TECH",
    address: settings.address ?? "",
    phone: settings.phone ?? "",
    email: settings.email ?? "",
    footer: settings.footer ?? "",
    bankDetails: settings.bank_details ?? "",
  };
}

/** What the next invoice will be called, e.g. `INV-0061`. */
export function formatInvoiceNumber(settings: Pick<TrackerSettings, "invoice_prefix" | "next_invoice_number">): string {
  return `${settings.invoice_prefix}${String(settings.next_invoice_number).padStart(4, "0")}`;
}
