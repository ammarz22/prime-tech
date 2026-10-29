import type { Metadata } from "next";
import { ExpensesManager } from "@/components/admin/sales/expenses-manager";
import { listHref } from "@/components/admin/sales/shared";
import { getExpenses, getListSummary, getTrackerSettings, LIST_PAGE_SIZE } from "@/lib/db/sales";
import { parseListParams } from "@/lib/utils/list-params";

export const metadata: Metadata = { title: "Expenses" };

export default async function ExpensesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { q, limit, autoNew } = parseListParams(await searchParams);
  const [rows, summary, totalSummary, settings] = await Promise.all([
    getExpenses({ q, limit }),
    getListSummary("expenses", q),
    q ? getListSummary("expenses") : Promise.resolve(null),
    getTrackerSettings(),
  ]);

  return (
    <ExpensesManager
      rows={rows}
      summary={summary}
      settings={settings}
      q={q}
      hasAny={(totalSummary ?? summary).count > 0}
      autoOpenNew={autoNew}
      showMoreHref={rows.length >= limit ? listHref("/admin/sales/expenses", { q, limit: limit + LIST_PAGE_SIZE }) : null}
    />
  );
}
