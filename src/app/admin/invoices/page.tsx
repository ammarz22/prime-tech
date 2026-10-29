import type { Metadata } from "next";
import { InvoicesManager } from "@/components/admin/invoice/invoices-manager";
import { listHref } from "@/components/admin/sales/shared";
import { getInvoices } from "@/lib/db/invoices";
import { getListSummary, getTrackerSettings, LIST_PAGE_SIZE } from "@/lib/db/sales";
import { formatInvoiceNumber } from "@/lib/utils/invoice";
import { parseListParams } from "@/lib/utils/list-params";

export const metadata: Metadata = { title: "Invoices" };

export default async function InvoicesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { q, limit } = parseListParams(await searchParams);
  const [rows, summary, totalSummary, settings] = await Promise.all([
    getInvoices({ q, limit }),
    getListSummary("invoices", q),
    q ? getListSummary("invoices") : Promise.resolve(null),
    getTrackerSettings(),
  ]);

  return (
    <InvoicesManager
      rows={rows}
      summary={summary}
      q={q}
      nextNumber={formatInvoiceNumber(settings)}
      hasAny={(totalSummary ?? summary).count > 0}
      showMoreHref={rows.length >= limit ? listHref("/admin/invoices", { q, limit: limit + LIST_PAGE_SIZE }) : null}
    />
  );
}
