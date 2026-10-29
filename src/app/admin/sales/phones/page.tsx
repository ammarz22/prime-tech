import type { Metadata } from "next";
import { PhoneSalesManager } from "@/components/admin/sales/phone-sales-manager";
import { listHref } from "@/components/admin/sales/shared";
import { getListSummary, getPhoneSales, getSalesSuggestions, getTrackerSettings, LIST_PAGE_SIZE } from "@/lib/db/sales";
import { parseListParams } from "@/lib/utils/list-params";

export const metadata: Metadata = { title: "Phone Sales" };

export default async function PhoneSalesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { q, limit, autoNew } = parseListParams(await searchParams);
  const [rows, summary, totalSummary, settings, suggestions] = await Promise.all([
    getPhoneSales({ q, limit }),
    getListSummary("phones", q),
    q ? getListSummary("phones") : Promise.resolve(null),
    getTrackerSettings(),
    getSalesSuggestions(),
  ]);

  return (
    <PhoneSalesManager
      rows={rows}
      summary={summary}
      settings={settings}
      suggestions={suggestions}
      q={q}
      hasAny={(totalSummary ?? summary).count > 0}
      autoOpenNew={autoNew}
      showMoreHref={rows.length >= limit ? listHref("/admin/sales/phones", { q, limit: limit + LIST_PAGE_SIZE }) : null}
    />
  );
}
