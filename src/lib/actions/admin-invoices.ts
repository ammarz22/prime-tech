"use server";

import { revalidatePath } from "next/cache";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { invoiceSchema, type InvoiceInput, type InvoiceItemInput } from "@/lib/validations/invoice";
import { BANK_CHARGE_RE, invoiceTotals, phoneInvoiceDesc } from "@/lib/utils/invoice";
import { detectSaleKind, guessAccessoryType, parsePhoneDescription } from "@/lib/utils/sale-detect";
import type { InvoiceItem, SaleKind } from "@/types/database";

export interface InvoiceActionResult {
  success: boolean;
  error?: string;
  id?: string;
  invoiceNo?: string;
  /** The invoice was saved, but something alongside it (recording a line as a sale) needs a look. */
  warning?: string;
}

const blank = (v: string | undefined) => (v && v.trim() ? v.trim() : null);
const tableFor = (kind: SaleKind) => (kind === "phone" ? "phone_sales" : "accessory_sales");

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

type Line = InvoiceItemInput;

/** The line as it is stored in the invoice (price list only — the paper ignores the extra keys). */
function baseItem(line: Line): InvoiceItem {
  const item: InvoiceItem = { desc: line.desc.trim(), qty: line.qty, unit_price: line.unit_price };
  if (line.saleKind && line.saleId) {
    item.sale_kind = line.saleKind;
    item.sale_id = line.saleId;
    if (line.linked) item.linked = true;
    const cost = Number(line.unitCost);
    if (line.unitCost.trim() !== "" && Number.isFinite(cost)) item.unit_cost = cost;
  }
  return item;
}

function invoiceRow(d: InvoiceInput, items: InvoiceItem[]) {
  const { total } = invoiceTotals(items, d.discount, d.taxPercent);
  return {
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
  };
}

/**
 * Records one invoice line in the sales tabs — as a phone sale or an accessory
 * sale — or updates the sale it is already linked to. Returns the sale's id.
 * The customer, payment method and invoice link come from the invoice; a new
 * sale takes the invoice date, an existing one keeps its own date.
 */
async function recordLine(
  supabase: SupabaseClient,
  line: Line,
  invoiceId: string,
  d: InvoiceInput,
  accessoryTypes: string[],
): Promise<{ kind: SaleKind; id: string }> {
  // A sale picked from the existing sales keeps the kind it already has.
  const kind: SaleKind =
    line.linked && line.saleKind ? line.saleKind : line.recordKind === "auto" ? detectSaleKind(line.desc) : line.recordKind;
  const cost = Number(line.unitCost);
  const existingId = line.saleKind && line.saleId ? line.saleId : null;
  const sameKind = existingId !== null && line.saleKind === kind;

  // The line switched between phone and accessory: the old sale goes, a new one is made.
  if (existingId && !sameKind && line.saleKind) {
    await supabase.from(tableFor(line.saleKind)).delete().eq("id", existingId);
  }

  // A sale picked from the sales tabs must not be on some other invoice already.
  if (existingId && sameKind && line.saleKind) {
    const { data: current } = await supabase.from(tableFor(line.saleKind)).select("invoice_id").eq("id", existingId).maybeSingle();
    if (!current) throw new Error("that sale no longer exists");
    if (current.invoice_id && current.invoice_id !== invoiceId) throw new Error("that sale is already on another invoice");
  }

  // Only fill in what the invoice knows — never blank out details the sale already has.
  const customer = {
    ...(blank(d.customerName) ? { customer_name: blank(d.customerName) } : {}),
    ...(blank(d.customerPhone) ? { customer_phone: blank(d.customerPhone) } : {}),
    ...(blank(d.paymentMethod) ? { payment_method: blank(d.paymentMethod) } : {}),
    invoice_id: invoiceId,
  };

  if (kind === "phone") {
    if (line.qty !== 1) throw new Error("phones are recorded one per line — set the quantity to 1");
    const p = parsePhoneDescription(line.desc);
    const row = {
      model: p.model || line.desc.trim(),
      storage: blank(p.storage),
      colour: blank(p.colour),
      model_no: blank(p.modelNo),
      serial_no: blank(p.serialNo),
      imei: blank(p.imei),
      ...customer,
      ...(blank(d.customerAddress) ? { customer_address: blank(d.customerAddress) } : {}),
      ...(blank(d.customerEmail) ? { customer_email: blank(d.customerEmail) } : {}),
      cost_price: cost,
      selling_price: line.unit_price,
    };
    if (sameKind && existingId) {
      const { error } = await supabase.from("phone_sales").update(row).eq("id", existingId);
      if (error) throw new Error(error.message);
      return { kind, id: existingId };
    }
    const { data, error } = await supabase
      .from("phone_sales")
      .insert({ ...row, sale_date: d.invoiceDate })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { kind, id: data.id };
  }

  if (!Number.isInteger(line.qty) || line.qty < 1) throw new Error("accessories need a whole-number quantity of at least 1");
  const row = {
    name: line.desc.trim(),
    type: blank(guessAccessoryType(line.desc, accessoryTypes)),
    qty: line.qty,
    ...customer,
    unit_cost: cost,
    unit_price: line.unit_price,
  };
  if (sameKind && existingId) {
    const { error } = await supabase.from("accessory_sales").update(row).eq("id", existingId);
    if (error) throw new Error(error.message);
    return { kind, id: existingId };
  }
  const { data, error } = await supabase
    .from("accessory_sales")
    .insert({ ...row, sale_date: d.invoiceDate })
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  return { kind, id: data.id };
}

/**
 * Creates or updates an invoice. On first save the number comes from
 * `claim_invoice_number()` (atomic — two people saving at once never get the
 * same one), and the invoice is linked back onto its sale.
 *
 * Any extra line flagged "record in sales" becomes its own phone or accessory
 * sale (the type is detected from the description unless overridden) and stays
 * in step with the invoice: edit the line and the sale follows; remove the line
 * or untick it and that sale is removed.
 */
export async function saveInvoiceAction(id: string | null, input: InvoiceInput): Promise<InvoiceActionResult> {
  const parsed = invoiceSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Please check the invoice." };
  const { supabase, error: authError } = await adminCheck();
  if (authError) return { success: false, error: authError };

  const d = parsed.data;
  // Blank placeholder lines are dropped; a line counts if it has text or a price.
  const lines = d.items.filter((i) => i.desc.trim() || i.unit_price);
  if (lines.length === 0) return { success: false, error: "Add at least one item to the invoice." };

  let previous: InvoiceItem[] = [];
  let mainSaleId = d.saleId;
  if (id) {
    const { data: existing } = await supabase.from("invoices").select("items, sale_id").eq("id", id).maybeSingle();
    if (!existing) return { success: false, error: "That invoice no longer exists." };
    previous = Array.isArray(existing.items) ? (existing.items as InvoiceItem[]) : [];
    mainSaleId = existing.sale_id;
  }

  // ---- 1. Save the invoice itself --------------------------------------------------------
  let invoiceId = id;
  let invoiceNo = "";
  const firstPassItems = lines.map(baseItem);

  if (id) {
    const { data, error } = await supabase
      .from("invoices")
      .update(invoiceRow(d, firstPassItems))
      .eq("id", id)
      .select("id, invoice_no")
      .single();
    if (error) return { success: false, error: error.message };
    invoiceNo = data.invoice_no;
  } else {
    if (d.saleKind && d.saleId) {
      const { data: sale } = await supabase.from(tableFor(d.saleKind)).select("invoice_id").eq("id", d.saleId).maybeSingle();
      if (!sale) return { success: false, error: "That sale no longer exists." };
      if (sale.invoice_id) return { success: false, error: "This sale already has an invoice." };
    }

    const { data: claimed, error: claimError } = await supabase.rpc("claim_invoice_number");
    if (claimError || !claimed) {
      return { success: false, error: claimError?.message ?? "Couldn't get an invoice number — please try again." };
    }

    const { data: created, error } = await supabase
      .from("invoices")
      .insert({ ...invoiceRow(d, firstPassItems), invoice_no: claimed as string, sale_kind: d.saleKind, sale_id: d.saleId })
      .select("id, invoice_no")
      .single();
    if (error) return { success: false, error: error.message };
    invoiceId = created.id;
    invoiceNo = created.invoice_no;

    if (d.saleKind && d.saleId) {
      const { error: linkError } = await supabase.from(tableFor(d.saleKind)).update({ invoice_id: created.id }).eq("id", d.saleId);
      if (linkError) {
        return {
          success: true,
          id: created.id,
          invoiceNo,
          warning: `Invoice ${invoiceNo} was saved, but linking it to the sale failed: ${linkError.message}`,
        };
      }
    }
  }

  // ---- 2. Keep the sales tabs in step with the flagged lines ------------------------------
  const warnings: string[] = [];
  const finalItems: InvoiceItem[] = [];
  const keep = new Set<string>();

  const { data: settingsRow } = await supabase.from("tracker_settings").select("accessory_types").eq("id", 1).maybeSingle();
  const accessoryTypes: string[] = settingsRow?.accessory_types ?? [];

  for (const line of lines) {
    const item = baseItem(line);
    const isMain = !!mainSaleId && line.saleId === mainSaleId;
    if (isMain) {
      finalItems.push(item);
      continue;
    }
    // Start clean: only a successful record below puts the link back.
    delete item.sale_kind;
    delete item.sale_id;
    delete item.unit_cost;
    delete item.linked;

    if (!line.record || BANK_CHARGE_RE.test(line.desc.trim())) {
      finalItems.push(item);
      continue;
    }
    try {
      const recorded = await recordLine(supabase, line, invoiceId as string, d, accessoryTypes);
      keep.add(recorded.id);
      finalItems.push({
        ...item,
        sale_kind: recorded.kind,
        sale_id: recorded.id,
        unit_cost: Number(line.unitCost),
        ...(line.linked ? { linked: true } : {}),
      });
    } catch (e) {
      warnings.push(`“${line.desc.trim() || "Item"}” wasn't recorded in sales: ${e instanceof Error ? e.message : "unknown error"}.`);
      // Keep its old link if it had one, so nothing is lost silently.
      if (line.saleKind && line.saleId) {
        keep.add(line.saleId);
        finalItems.push({ ...item, sale_kind: line.saleKind, sale_id: line.saleId, ...(line.linked ? { linked: true } : {}) });
      } else {
        finalItems.push(item);
      }
    }
  }

  // Lines that were recorded before and no longer are (removed or unticked): drop their sales.
  for (const old of previous) {
    if (!old.sale_id || !old.sale_kind || old.sale_id === mainSaleId || keep.has(old.sale_id)) continue;
    if (old.linked) {
      // It was an existing sale added to this invoice: just detach it, never delete it.
      await supabase.from(tableFor(old.sale_kind)).update({ invoice_id: null }).eq("id", old.sale_id).eq("invoice_id", invoiceId as string);
    } else {
      await supabase.from(tableFor(old.sale_kind)).delete().eq("id", old.sale_id);
    }
  }

  // ---- 3. Store the final lines (with their sale links) -----------------------------------
  const { error: finalError } = await supabase
    .from("invoices")
    .update({ items: finalItems, total: invoiceTotals(finalItems, d.discount, d.taxPercent).total })
    .eq("id", invoiceId as string);
  if (finalError) warnings.push(`The invoice was saved but its sale links weren't stored: ${finalError.message}`);

  refresh();
  return {
    success: true,
    id: invoiceId as string,
    invoiceNo,
    ...(warnings.length ? { warning: warnings.join(" ") } : {}),
  };
}

/** A recorded sale that isn't on an invoice yet, as the editor's "Add from sales" picker shows it. */
export interface PickableSale {
  kind: SaleKind;
  id: string;
  date: string;
  /** What goes on the invoice line. */
  desc: string;
  customer: string | null;
  qty: number;
  unitPrice: number;
  unitCost: number;
}

/**
 * Sales (phones and accessories) that don't have an invoice yet — for one date,
 * or the most recent ones when `date` is null — so they can be added to an
 * invoice without typing them in again.
 */
export async function listUninvoicedSalesAction(date: string | null): Promise<{ success: boolean; error?: string; sales: PickableSale[] }> {
  if (date !== null && !/^\d{4}-\d{2}-\d{2}$/.test(date)) return { success: false, error: "Pick a valid date.", sales: [] };
  const { supabase, error: authError } = await adminCheck();
  if (authError) return { success: false, error: authError, sales: [] };

  let phones = supabase.from("phone_sales").select("*").is("invoice_id", null).order("sale_date", { ascending: false }).order("created_at", { ascending: false }).limit(100);
  let accessories = supabase.from("accessory_sales").select("*").is("invoice_id", null).order("sale_date", { ascending: false }).order("created_at", { ascending: false }).limit(100);
  if (date) {
    phones = phones.eq("sale_date", date);
    accessories = accessories.eq("sale_date", date);
  }
  const [phoneRes, accRes] = await Promise.all([phones, accessories]);
  if (phoneRes.error || accRes.error) return { success: false, error: (phoneRes.error ?? accRes.error)?.message, sales: [] };

  const sales: PickableSale[] = [
    ...(phoneRes.data ?? []).map((p): PickableSale => ({
      kind: "phone",
      id: p.id,
      date: p.sale_date,
      desc: phoneInvoiceDesc(p),
      customer: p.customer_name,
      qty: 1,
      unitPrice: Number(p.selling_price),
      unitCost: Number(p.cost_price),
    })),
    ...(accRes.data ?? []).map((a): PickableSale => ({
      kind: "accessory",
      id: a.id,
      date: a.sale_date,
      desc: a.name,
      customer: a.customer_name,
      qty: Number(a.qty),
      unitPrice: Number(a.unit_price),
      unitCost: Number(a.unit_cost),
    })),
  ].sort((x, y) => y.date.localeCompare(x.date));

  return { success: true, sales };
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
