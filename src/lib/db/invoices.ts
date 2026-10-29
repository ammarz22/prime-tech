import { createClient } from "@/lib/supabase/server";
import { INVOICE_SEARCH, LIST_PAGE_SIZE, searchFilter } from "@/lib/db/sales";
import type { Invoice, InvoiceItem } from "@/types/database";

const n = (v: unknown) => {
  const x = Number(v);
  return Number.isFinite(x) ? x : 0;
};

function normalise(row: Record<string, unknown>): Invoice {
  const items = Array.isArray(row.items) ? (row.items as Record<string, unknown>[]) : [];
  return {
    ...(row as unknown as Invoice),
    discount: n(row.discount),
    tax_percent: n(row.tax_percent),
    total: n(row.total),
    items: items.map(
      (i): InvoiceItem => ({
        desc: String(i.desc ?? ""),
        qty: n(i.qty),
        unit_price: n(i.unit_price),
        sale_kind: i.sale_kind === "phone" || i.sale_kind === "accessory" ? i.sale_kind : null,
        sale_id: typeof i.sale_id === "string" ? i.sale_id : null,
        unit_cost: i.unit_cost === null || i.unit_cost === undefined ? null : n(i.unit_cost),
        linked: i.linked === true,
      }),
    ),
  };
}

export async function getInvoices(opts: { q?: string; limit?: number } = {}): Promise<Invoice[]> {
  const supabase = await createClient();
  let query = supabase
    .from("invoices")
    .select("*")
    .order("invoice_no", { ascending: false })
    .limit(opts.limit ?? LIST_PAGE_SIZE);
  const filter = searchFilter(INVOICE_SEARCH, opts.q);
  if (filter) query = query.or(filter);
  const { data } = await query;
  return (data ?? []).map(normalise);
}

export async function getInvoiceById(id: string): Promise<Invoice | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("invoices").select("*").eq("id", id).maybeSingle();
  return data ? normalise(data) : null;
}
