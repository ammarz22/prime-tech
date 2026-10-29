"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { invoiceSchema, type InvoiceInput } from "@/lib/validations/invoice";
import { invoiceTotals } from "@/lib/utils/invoice";

export interface InvoiceActionResult {
  success: boolean;
  error?: string;
  id?: string;
  invoiceNo?: string;
}

const blank = (v: string | undefined) => (v && v.trim() ? v.trim() : null);

function refresh() {
  revalidatePath("/admin/invoices", "layout");
  revalidatePath("/admin/sales", "layout");
}

async function adminCheck() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return { supabase, error: "Please sign in again." };
  const { data: adminRow } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", userData.user.id)
    .maybeSingle();
  if (!adminRow) return { supabase, error: "Only admins can change invoices." };
  return { supabase, error: null };
}

function invoiceRow(d: InvoiceInput) {
  // Blank placeholder lines are dropped; a line counts if it has text or a price.
  const items = d.items
    .map((i) => ({ desc: i.desc.trim(), qty: i.qty, unit_price: i.unit_price }))
    .filter((i) => i.desc || i.unit_price);
  const { total } = invoiceTotals(items, d.discount, d.taxPercent);
  return {
    items,
    row: {
      invoice_date: d.invoiceDate,
      due_date: blank(d.dueDate),
      customer_name: blank(d.customerName),
      customer_phone: blank(d.customerPhone),
      customer_email: blank(d.customerEmail),
      customer_address: blank(d.customerAddress),
      items,
      discount: d.discount,
      tax_percent: d.taxPercent,
      total,
      payment_method: blank(d.paymentMethod),
      notes: blank(d.notes),
    },
  };
}

/**
 * Creates or updates an invoice. On first save the number comes from
 * `claim_invoice_number()` (atomic — two people saving at once never get the
 * same one), and the invoice is linked back onto its sale.
 */
export async function saveInvoiceAction(id: string | null, input: InvoiceInput): Promise<InvoiceActionResult> {
  const parsed = invoiceSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Please check the invoice." };
  const { supabase, error: authError } = await adminCheck();
  if (authError) return { success: false, error: authError };

  const { items, row } = invoiceRow(parsed.data);
  if (items.length === 0) return { success: false, error: "Add at least one item to the invoice." };

  if (id) {
    const { data, error } = await supabase
      .from("invoices")
      .update(row)
      .eq("id", id)
      .select("id, invoice_no")
      .single();
    if (error) return { success: false, error: error.message };
    refresh();
    return { success: true, id: data.id, invoiceNo: data.invoice_no };
  }

  const { saleKind, saleId } = parsed.data;
  if (saleKind && saleId) {
    const table = saleKind === "phone" ? "phone_sales" : "accessory_sales";
    const { data: sale } = await supabase.from(table).select("invoice_id").eq("id", saleId).maybeSingle();
    if (!sale) return { success: false, error: "That sale no longer exists." };
    if (sale.invoice_id) return { success: false, error: "This sale already has an invoice." };
  }

  const { data: invoiceNo, error: claimError } = await supabase.rpc("claim_invoice_number");
  if (claimError || !invoiceNo) {
    return { success: false, error: claimError?.message ?? "Couldn't get an invoice number — please try again." };
  }

  const { data: created, error } = await supabase
    .from("invoices")
    .insert({ ...row, invoice_no: invoiceNo as string, sale_kind: saleKind, sale_id: saleId })
    .select("id, invoice_no")
    .single();
  if (error) return { success: false, error: error.message };

  if (saleKind && saleId) {
    const table = saleKind === "phone" ? "phone_sales" : "accessory_sales";
    const { error: linkError } = await supabase.from(table).update({ invoice_id: created.id }).eq("id", saleId);
    if (linkError) {
      return { success: false, error: `Invoice ${created.invoice_no} was saved, but linking it to the sale failed: ${linkError.message}` };
    }
  }

  refresh();
  return { success: true, id: created.id, invoiceNo: created.invoice_no };
}

/** Deleting an invoice frees its sale (the FK is `on delete set null`). */
export async function deleteInvoiceAction(id: string): Promise<InvoiceActionResult> {
  const { supabase, error: authError } = await adminCheck();
  if (authError) return { success: false, error: authError };
  const { error } = await supabase.from("invoices").delete().eq("id", id);
  if (error) return { success: false, error: error.message };
  refresh();
  return { success: true };
}
