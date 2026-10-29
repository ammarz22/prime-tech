import { createClient } from "@/lib/supabase/server";
import { fetchAllRows } from "@/lib/db/sales";
import { todayISO } from "@/lib/utils/sales-format";

type Column = [header: string, value: (row: Record<string, unknown>) => unknown];

const col = (header: string, key: string): Column => [header, (r) => r[key]];

const EXPORTS: Record<string, { table: string; orderBy: string; label: string; columns: Column[] }> = {
  phones: {
    table: "phone_sales",
    orderBy: "sale_date",
    label: "phones",
    columns: [
      col("Date", "sale_date"),
      col("Phone Model", "model"),
      col("Storage", "storage"),
      col("Colour", "colour"),
      col("Model No", "model_no"),
      col("Serial No", "serial_no"),
      col("IMEI", "imei"),
      col("Customer", "customer_name"),
      col("Customer Phone", "customer_phone"),
      col("Customer Address", "customer_address"),
      col("Customer Email", "customer_email"),
      col("Sourced From", "supplier"),
      col("Cost (Rs)", "cost_price"),
      col("Selling Price (Rs)", "selling_price"),
      col("Profit (Rs)", "profit"),
      col("Payment", "payment_method"),
      col("Notes", "notes"),
    ],
  },
  accessories: {
    table: "accessory_sales",
    orderBy: "sale_date",
    label: "accessories",
    columns: [
      col("Date", "sale_date"),
      col("Accessory", "name"),
      col("Type", "type"),
      col("Qty", "qty"),
      col("Customer", "customer_name"),
      col("Customer Phone", "customer_phone"),
      col("Sourced From", "supplier"),
      col("Unit Cost (Rs)", "unit_cost"),
      col("Unit Price (Rs)", "unit_price"),
      col("Total Cost (Rs)", "total_cost"),
      col("Total Sale (Rs)", "total_sale"),
      col("Profit (Rs)", "profit"),
      col("Payment", "payment_method"),
      col("Notes", "notes"),
    ],
  },
  expenses: {
    table: "business_expenses",
    orderBy: "expense_date",
    label: "expenses",
    columns: [
      col("Date", "expense_date"),
      col("Category", "category"),
      col("Description", "description"),
      col("Paid To", "paid_to"),
      col("Amount (Rs)", "amount"),
      col("Payment", "payment_method"),
      col("Notes", "notes"),
    ],
  },
  invoices: {
    table: "invoices",
    orderBy: "invoice_date",
    label: "invoices",
    columns: [
      col("Invoice", "invoice_no"),
      col("Date", "invoice_date"),
      col("Due Date", "due_date"),
      col("Customer", "customer_name"),
      col("Phone", "customer_phone"),
      [
        "Items",
        (r) =>
          (Array.isArray(r.items) ? (r.items as { qty: number; desc: string }[]) : [])
            .map((i) => `${i.qty} x ${i.desc}`)
            .join("; "),
      ],
      col("Discount (LKR)", "discount"),
      col("Tax %", "tax_percent"),
      col("Total (LKR)", "total"),
      col("Payment", "payment_method"),
    ],
  },
};

/** CSV-escape one cell. */
function cell(value: unknown): string {
  const s = value === null || value === undefined ? "" : String(value);
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export async function GET(_request: Request, { params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params;
  const spec = EXPORTS[kind];
  if (!spec) return new Response("Unknown export", { status: 404 });

  // The proxy already gates /admin; check again here since this returns customer data.
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return new Response("Please sign in", { status: 401 });
  const { data: adminRow } = await supabase.from("admin_users").select("user_id").eq("user_id", userData.user.id).maybeSingle();
  if (!adminRow) return new Response("Forbidden", { status: 403 });

  const rows = await fetchAllRows(spec.table, spec.orderBy);
  const lines = [spec.columns.map(([h]) => cell(h)).join(",")];
  for (const row of rows) lines.push(spec.columns.map(([, get]) => cell(get(row))).join(","));

  // UTF-8 BOM so Excel opens the file with the right encoding.
  const body = "﻿" + lines.join("\r\n") + "\r\n";
  return new Response(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="Prime Tech ${spec.label} ${todayISO()}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
