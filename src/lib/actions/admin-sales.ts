"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  accessorySaleSchema,
  expenseSchema,
  phoneSaleSchema,
  splitLines,
  trackerSettingsSchema,
  type AccessorySaleInput,
  type ExpenseInput,
  type PhoneSaleInput,
  type TrackerSettingsInput,
} from "@/lib/validations/sales";

export interface SalesActionResult {
  success: boolean;
  error?: string;
  id?: string;
  /** Profit of the saved sale, for the "Sale saved" dialog. */
  profit?: number;
}

const blank = (v: string | undefined) => (v && v.trim() ? v.trim() : null);

function refresh() {
  revalidatePath("/admin/sales", "layout");
  revalidatePath("/admin/invoices", "layout");
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
  if (!adminRow) return { supabase, error: "Only admins can change sales data." };
  return { supabase, error: null };
}

const firstIssue = (e: { issues: { message: string }[] }) => e.issues[0]?.message ?? "Please check the form.";

// ---------------------------------------------------------------------------
// Phone sales
// ---------------------------------------------------------------------------
function phoneRow(d: PhoneSaleInput) {
  return {
    sale_date: d.saleDate,
    model: d.model,
    storage: blank(d.storage),
    colour: blank(d.colour),
    model_no: blank(d.modelNo),
    serial_no: blank(d.serialNo),
    imei: blank(d.imei),
    customer_name: blank(d.customerName),
    customer_phone: blank(d.customerPhone),
    customer_address: blank(d.customerAddress),
    customer_email: blank(d.customerEmail),
    supplier: blank(d.supplier),
    cost_price: d.costPrice,
    selling_price: d.sellingPrice,
    payment_method: blank(d.paymentMethod),
    notes: blank(d.notes),
  };
}

export async function createPhoneSaleAction(input: PhoneSaleInput): Promise<SalesActionResult> {
  const parsed = phoneSaleSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: firstIssue(parsed.error) };
  const { supabase, error: authError } = await adminCheck();
  if (authError) return { success: false, error: authError };

  const { data, error } = await supabase.from("phone_sales").insert(phoneRow(parsed.data)).select("id, profit").single();
  if (error) return { success: false, error: error.message };
  refresh();
  return { success: true, id: data.id, profit: Number(data.profit) };
}

export async function updatePhoneSaleAction(id: string, input: PhoneSaleInput): Promise<SalesActionResult> {
  const parsed = phoneSaleSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: firstIssue(parsed.error) };
  const { supabase, error: authError } = await adminCheck();
  if (authError) return { success: false, error: authError };

  const { data, error } = await supabase.from("phone_sales").update(phoneRow(parsed.data)).eq("id", id).select("id, profit").single();
  if (error) return { success: false, error: error.message };
  refresh();
  return { success: true, id: data.id, profit: Number(data.profit) };
}

export async function deletePhoneSaleAction(id: string): Promise<SalesActionResult> {
  const { supabase, error: authError } = await adminCheck();
  if (authError) return { success: false, error: authError };
  const { error } = await supabase.from("phone_sales").delete().eq("id", id);
  if (error) return { success: false, error: error.message };
  refresh();
  return { success: true };
}

// ---------------------------------------------------------------------------
// Accessory sales
// ---------------------------------------------------------------------------
function accessoryRow(d: AccessorySaleInput) {
  return {
    sale_date: d.saleDate,
    name: d.name,
    type: blank(d.type),
    qty: d.qty,
    customer_name: blank(d.customerName),
    customer_phone: blank(d.customerPhone),
    supplier: blank(d.supplier),
    unit_cost: d.unitCost,
    unit_price: d.unitPrice,
    payment_method: blank(d.paymentMethod),
    notes: blank(d.notes),
  };
}

export async function createAccessorySaleAction(input: AccessorySaleInput): Promise<SalesActionResult> {
  const parsed = accessorySaleSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: firstIssue(parsed.error) };
  const { supabase, error: authError } = await adminCheck();
  if (authError) return { success: false, error: authError };

  const { data, error } = await supabase
    .from("accessory_sales")
    .insert(accessoryRow(parsed.data))
    .select("id, profit")
    .single();
  if (error) return { success: false, error: error.message };
  refresh();
  return { success: true, id: data.id, profit: Number(data.profit) };
}

export async function updateAccessorySaleAction(id: string, input: AccessorySaleInput): Promise<SalesActionResult> {
  const parsed = accessorySaleSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: firstIssue(parsed.error) };
  const { supabase, error: authError } = await adminCheck();
  if (authError) return { success: false, error: authError };

  const { data, error } = await supabase
    .from("accessory_sales")
    .update(accessoryRow(parsed.data))
    .eq("id", id)
    .select("id, profit")
    .single();
  if (error) return { success: false, error: error.message };
  refresh();
  return { success: true, id: data.id, profit: Number(data.profit) };
}

export async function deleteAccessorySaleAction(id: string): Promise<SalesActionResult> {
  const { supabase, error: authError } = await adminCheck();
  if (authError) return { success: false, error: authError };
  const { error } = await supabase.from("accessory_sales").delete().eq("id", id);
  if (error) return { success: false, error: error.message };
  refresh();
  return { success: true };
}

// ---------------------------------------------------------------------------
// Expenses
// ---------------------------------------------------------------------------
function expenseRow(d: ExpenseInput) {
  return {
    expense_date: d.expenseDate,
    category: d.category,
    description: blank(d.description),
    paid_to: blank(d.paidTo),
    amount: d.amount,
    payment_method: blank(d.paymentMethod),
    notes: blank(d.notes),
  };
}

export async function createExpenseAction(input: ExpenseInput): Promise<SalesActionResult> {
  const parsed = expenseSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: firstIssue(parsed.error) };
  const { supabase, error: authError } = await adminCheck();
  if (authError) return { success: false, error: authError };

  const { data, error } = await supabase.from("business_expenses").insert(expenseRow(parsed.data)).select("id").single();
  if (error) return { success: false, error: error.message };
  refresh();
  return { success: true, id: data.id };
}

export async function updateExpenseAction(id: string, input: ExpenseInput): Promise<SalesActionResult> {
  const parsed = expenseSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: firstIssue(parsed.error) };
  const { supabase, error: authError } = await adminCheck();
  if (authError) return { success: false, error: authError };

  const { error } = await supabase.from("business_expenses").update(expenseRow(parsed.data)).eq("id", id);
  if (error) return { success: false, error: error.message };
  refresh();
  return { success: true, id };
}

export async function deleteExpenseAction(id: string): Promise<SalesActionResult> {
  const { supabase, error: authError } = await adminCheck();
  if (authError) return { success: false, error: authError };
  const { error } = await supabase.from("business_expenses").delete().eq("id", id);
  if (error) return { success: false, error: error.message };
  refresh();
  return { success: true };
}

// ---------------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------------
export async function updateTrackerSettingsAction(input: TrackerSettingsInput): Promise<SalesActionResult> {
  const parsed = trackerSettingsSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: firstIssue(parsed.error) };
  const { supabase, error: authError } = await adminCheck();
  if (authError) return { success: false, error: authError };

  const d = parsed.data;
  // Never save an empty dropdown — fall back to what is already stored.
  const { data: current } = await supabase.from("tracker_settings").select("*").eq("id", 1).maybeSingle();
  const list = (value: string, fallback: string[] | undefined) => {
    const lines = splitLines(value);
    return lines.length ? lines : (fallback ?? []);
  };

  const { error } = await supabase
    .from("tracker_settings")
    .update({
      address: blank(d.address),
      phone: blank(d.phone),
      email: blank(d.email),
      footer: blank(d.footer),
      terms: d.terms,
      bank_details: blank(d.bankDetails),
      invoice_prefix: d.invoicePrefix,
      next_invoice_number: d.nextInvoiceNumber,
      bank_charge_percent: d.bankChargePercent,
      suppliers: splitLines(d.suppliers),
      payment_methods: list(d.paymentMethods, current?.payment_methods),
      accessory_types: list(d.accessoryTypes, current?.accessory_types),
      expense_categories: list(d.expenseCategories, current?.expense_categories),
    })
    .eq("id", 1);
  if (error) return { success: false, error: error.message };
  refresh();
  return { success: true };
}
