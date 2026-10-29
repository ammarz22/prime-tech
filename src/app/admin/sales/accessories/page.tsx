import type { Metadata } from "next";
import { AccessorySalesManager } from "@/components/admin/sales/accessory-sales-manager";
import { listHref } from "@/components/admin/sales/shared";
import { getAccessorySales, getListSummary, getSalesSuggestions, getTrackerSettings, LIST_PAGE_SIZE } from "@/lib/db/sales";
import { parseListParams } from "@/lib/utils/list-params";

export const metadata: Metadata = { title: "Accessory Sales" };

export default async function AccessorySalesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { q, limit, autoNew } = parseListParams(await searchParams);
  const [rows, summary, totalSummary, settings, suggestions] = await Promise.all([
    getAccessorySales({ q, limit }),
    getListSummary("accessories", q),
    q ? getListSummary("accessories") : Promise.resolve(null),
    getTrackerSettings(),
    getSalesSuggestions(),
  ]);

  return (
    <AccessorySalesManager
      rows={rows}
      summary={summary}
      settings={settings}
      suggestions={suggestions}
      q={q}
      hasAny={(totalSummary ?? summary).count > 0}
      autoOpenNew={autoNew}
      showMoreHref={rows.length >= limit ? listHref("/admin/sales/accessories", { q, limit: limit + LIST_PAGE_SIZE }) : null}
    />
  );
}
