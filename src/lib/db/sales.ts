import { createClient } from "@/lib/supabase/server";
import { colomboToday } from "@/lib/utils/sales-format";
import type {
  AccessorySaleRow,
  BusinessExpense,
  PhoneSaleRow,
  TrackerSettings,
} from "@/types/database";

/** Row cap per page; the list pages offer "Show more" past it. */
export const LIST_PAGE_SIZE = 100;

// ---------------------------------------------------------------------------
// Number coercion — PostgREST returns numeric columns as numbers, but be
// defensive so a string never leaks into arithmetic.
// ---------------------------------------------------------------------------
const n = (v: unknown) => {
  const x = Number(v);
  return Number.isFinite(x) ? x : 0;
};

function normalisePhone(row: Record<string, unknown>): PhoneSaleRow {
  return {
    ...(row as unknown as PhoneSaleRow),
    cost_price: n(row.cost_price),
    selling_price: n(row.selling_price),
    profit: n(row.profit),
  };
}

function normaliseAccessory(row: Record<string, unknown>): AccessorySaleRow {
  return {
    ...(row as unknown as AccessorySaleRow),
    qty: n(row.qty),
    unit_cost: n(row.unit_cost),
    unit_price: n(row.unit_price),
    total_cost: n(row.total_cost),
    total_sale: n(row.total_sale),
    profit: n(row.profit),
  };
}

function normaliseExpense(row: Record<string, unknown>): BusinessExpense {
  return { ...(row as unknown as BusinessExpense), amount: n(row.amount) };
}

/**
 * Builds a PostgREST `or=` filter that ILIKE-matches `q` against each column.
 * Characters that are syntax in a filter string are stripped from the term.
 */
export function searchFilter(columns: string[], q: string | undefined): string | null {
  const term = (q ?? "").replace(/[%*,()"\\]/g, " ").replace(/\s+/g, " ").trim();
  if (!term) return null;
  return columns.map((c) => `${c}.ilike.%${term}%`).join(",");
}

const PHONE_SEARCH = ["model", "storage", "customer_name", "customer_phone", "imei", "serial_no", "supplier"];
const ACCESSORY_SEARCH = ["name", "type", "customer_name", "customer_phone", "supplier"];
const EXPENSE_SEARCH = ["category", "description", "paid_to"];
export const INVOICE_SEARCH = ["invoice_no", "customer_name", "customer_phone"];

// ---------------------------------------------------------------------------
// Lists
// ---------------------------------------------------------------------------
export async function getPhoneSales(opts: { q?: string; limit?: number } = {}): Promise<PhoneSaleRow[]> {
  const supabase = await createClient();
  let query = supabase
    .from("phone_sales")
    .select("*, invoice:invoices(invoice_no)")
    .order("sale_date", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(opts.limit ?? LIST_PAGE_SIZE);
  const filter = searchFilter(PHONE_SEARCH, opts.q);
  if (filter) query = query.or(filter);
  const { data } = await query;
  return (data ?? []).map(normalisePhone);
}

export async function getAccessorySales(opts: { q?: string; limit?: number } = {}): Promise<AccessorySaleRow[]> {
  const supabase = await createClient();
  let query = supabase
    .from("accessory_sales")
    .select("*, invoice:invoices(invoice_no)")
    .order("sale_date", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(opts.limit ?? LIST_PAGE_SIZE);
  const filter = searchFilter(ACCESSORY_SEARCH, opts.q);
  if (filter) query = query.or(filter);
  const { data } = await query;
  return (data ?? []).map(normaliseAccessory);
}

export async function getExpenses(opts: { q?: string; limit?: number } = {}): Promise<BusinessExpense[]> {
  const supabase = await createClient();
  let query = supabase
    .from("business_expenses")
    .select("*")
    .order("expense_date", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(opts.limit ?? LIST_PAGE_SIZE);
  const filter = searchFilter(EXPENSE_SEARCH, opts.q);
  if (filter) query = query.or(filter);
  const { data } = await query;
  return (data ?? []).map(normaliseExpense);
}

export async function getPhoneSaleById(id: string): Promise<PhoneSaleRow | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("phone_sales").select("*, invoice:invoices(invoice_no)").eq("id", id).maybeSingle();
  return data ? normalisePhone(data) : null;
}

export async function getAccessorySaleById(id: string): Promise<AccessorySaleRow | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("accessory_sales")
    .select("*, invoice:invoices(invoice_no)")
    .eq("id", id)
    .maybeSingle();
  return data ? normaliseAccessory(data) : null;
}

// ---------------------------------------------------------------------------
// Summary strip (count / sales / cost / profit) over the same search
// ---------------------------------------------------------------------------
export interface ListSummary {
  count: number;
  items?: number;
  sales?: number;
  cost?: number;
  profit?: number;
  total?: number;
}

export async function getListSummary(kind: "phones" | "accessories" | "expenses" | "invoices", q?: string): Promise<ListSummary> {
  const supabase = await createClient();
  const { data } = await supabase.rpc("sales_list_summary", { p_kind: kind, p_q: (q ?? "").trim() });
  const row = (data ?? {}) as Record<string, unknown>;
  return {
    count: n(row.count),
    items: n(row.items),
    sales: n(row.sales),
    cost: n(row.cost),
    profit: n(row.profit),
    total: n(row.total),
  };
}

// ---------------------------------------------------------------------------
// Settings + suggestions
// ---------------------------------------------------------------------------
export const DEFAULT_TRACKER_SETTINGS: TrackerSettings = {
  id: 1,
  address: "Colombo, Sri Lanka",
  phone: "+94 76 661 5623",
  email: "support@primetechnology.lk",
  footer: "Prime Tech Colombo • Technology that fits your world",
  terms: "",
  bank_details: "",
  invoice_prefix: "INV-",
  next_invoice_number: 61,
  bank_charge_percent: 3,
  suppliers: [],
  payment_methods: [],
  accessory_types: [],
  expense_categories: [],
};

export async function getTrackerSettings(): Promise<TrackerSettings> {
  const supabase = await createClient();
  const { data } = await supabase.from("tracker_settings").select("*").eq("id", 1).maybeSingle();
  if (!data) return DEFAULT_TRACKER_SETTINGS;
  return {
    ...(data as TrackerSettings),
    next_invoice_number: n(data.next_invoice_number),
    bank_charge_percent: n(data.bank_charge_percent),
    suppliers: data.suppliers ?? [],
    payment_methods: data.payment_methods ?? [],
    accessory_types: data.accessory_types ?? [],
    expense_categories: data.expense_categories ?? [],
  };
}

export interface SalesSuggestions {
  models: string[];
  storages: string[];
  customers: string[];
  suppliers: string[];
  accessories: string[];
}

export async function getSalesSuggestions(): Promise<SalesSuggestions> {
  const supabase = await createClient();
  const { data } = await supabase.rpc("sales_suggestions");
  const row = (data ?? {}) as Partial<SalesSuggestions>;
  return {
    models: row.models ?? [],
    storages: row.storages ?? [],
    customers: row.customers ?? [],
    suppliers: row.suppliers ?? [],
    accessories: row.accessories ?? [],
  };
}

// ---------------------------------------------------------------------------
// Dashboard
// ---------------------------------------------------------------------------
export type Period = "month" | "last" | "year" | "all";
export const PERIODS: { key: Period; label: string }[] = [
  { key: "month", label: "This month" },
  { key: "last", label: "Last month" },
  { key: "year", label: "This year" },
  { key: "all", label: "All time" },
];

export function parsePeriod(value: string | undefined): Period {
  return PERIODS.some((p) => p.key === value) ? (value as Period) : "month";
}

const pad = (x: number) => String(x).padStart(2, "0");
const lastDay = (y: number, m: number) => new Date(Date.UTC(y, m, 0)).getUTCDate(); // m is 1-based

/** Date bounds for a period, in Sri Lanka time. `null` means unbounded. */
export function periodRange(period: Period, today = colomboToday()): { from: string | null; to: string | null; label: string } {
  const [y, m] = today.split("-").map(Number);
  const monthName = (yy: number, mm: number) =>
    new Date(Date.UTC(yy, mm - 1, 1)).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });

  if (period === "month") {
    return { from: `${y}-${pad(m)}-01`, to: `${y}-${pad(m)}-${pad(lastDay(y, m))}`, label: monthName(y, m) };
  }
  if (period === "last") {
    const py = m === 1 ? y - 1 : y;
    const pm = m === 1 ? 12 : m - 1;
    return { from: `${py}-${pad(pm)}-01`, to: `${py}-${pad(pm)}-${pad(lastDay(py, pm))}`, label: monthName(py, pm) };
  }
  if (period === "year") return { from: `${y}-01-01`, to: `${y}-12-31`, label: String(y) };
  return { from: null, to: null, label: "All time" };
}

export interface DashboardRecent {
  kind: "phone" | "accessory";
  id: string;
  date: string;
  title: string;
  who: string | null;
  amount: number;
  profit: number;
}

export interface Dashboard {
  phoneCount: number;
  phoneIncome: number;
  phoneProfit: number;
  accQty: number;
  accIncome: number;
  accProfit: number;
  expenseTotal: number;
  expenseCount: number;
  income: number;
  gross: number;
  net: number;
  monthly: { month: number; phoneProfit: number; accProfit: number; expenses: number }[];
  recent: DashboardRecent[];
  topModels: { model: string; n: number; profit: number }[];
  suppliers: { supplier: string; spent: number; profit: number }[];
  expenseCategories: { category: string; total: number }[];
  years: number[];
}

export async function getDashboard(period: Period, year: number): Promise<Dashboard | null> {
  const supabase = await createClient();
  const range = periodRange(period);
  const { data, error } = await supabase.rpc("sales_dashboard", { p_from: range.from, p_to: range.to, p_year: year });
  if (error || !data) return null;
  const d = data as Record<string, unknown>;
  const arr = <T,>(v: unknown) => (Array.isArray(v) ? (v as T[]) : []);

  const phoneIncome = n(d.phone_income);
  const phoneProfit = n(d.phone_profit);
  const accIncome = n(d.acc_income);
  const accProfit = n(d.acc_profit);
  const expenseTotal = n(d.expense_total);

  return {
    phoneCount: n(d.phone_count),
    phoneIncome,
    phoneProfit,
    accQty: n(d.acc_qty),
    accIncome,
    accProfit,
    expenseTotal,
    expenseCount: n(d.expense_count),
    income: phoneIncome + accIncome,
    gross: phoneProfit + accProfit,
    net: phoneProfit + accProfit - expenseTotal,
    monthly: arr<Record<string, unknown>>(d.monthly).map((m) => ({
      month: n(m.month),
      phoneProfit: n(m.phone_profit),
      accProfit: n(m.acc_profit),
      expenses: n(m.expenses),
    })),
    recent: arr<Record<string, unknown>>(d.recent).map((r) => ({
      kind: r.kind === "accessory" ? "accessory" : "phone",
      id: String(r.id),
      date: String(r.date ?? ""),
      title: String(r.title ?? ""),
      who: (r.who as string | null) ?? null,
      amount: n(r.amount),
      profit: n(r.profit),
    })),
    topModels: arr<Record<string, unknown>>(d.top_models).map((m) => ({ model: String(m.model), n: n(m.n), profit: n(m.profit) })),
    suppliers: arr<Record<string, unknown>>(d.suppliers).map((s) => ({
      supplier: String(s.supplier),
      spent: n(s.spent),
      profit: n(s.profit),
    })),
    expenseCategories: arr<Record<string, unknown>>(d.expense_categories).map((c) => ({
      category: String(c.category),
      total: n(c.total),
    })),
    years: arr<number>(d.years).map(Number),
  };
}

// ---------------------------------------------------------------------------
// Whole-table reads for CSV export (pages past PostgREST's row cap)
// ---------------------------------------------------------------------------
export async function fetchAllRows(table: string, orderBy: string): Promise<Record<string, unknown>[]> {
  const supabase = await createClient();
  const rows: Record<string, unknown>[] = [];
  const size = 1000;
  for (let from = 0; ; from += size) {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order(orderBy, { ascending: false })
      .order("created_at", { ascending: false })
      .range(from, from + size - 1);
    if (error || !data || data.length === 0) break;
    rows.push(...(data as Record<string, unknown>[]));
    if (data.length < size) break;
  }
  return rows;
}
