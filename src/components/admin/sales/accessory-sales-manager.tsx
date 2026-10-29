"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { Plug } from "lucide-react";
import { EmptyState } from "@/components/common/empty-state";
import { AfterSaleDialog, ConfirmDeleteDialog } from "@/components/admin/sales/dialogs";
import { AddButton, FormSheet, IconActions, InvoiceLink, NothingFound } from "@/components/admin/sales/list-parts";
import { ListSearch } from "@/components/admin/sales/list-search";
import { AccessorySaleForm } from "@/components/admin/sales/sales-forms";
import { PageHead, Profit, ShowMore, SummaryStrip } from "@/components/admin/sales/shared";
import { deleteAccessorySaleAction } from "@/lib/actions/admin-sales";
import { niceDate, rs } from "@/lib/utils/sales-format";
import type { ListSummary, SalesSuggestions } from "@/lib/db/sales";
import type { AccessorySaleRow, TrackerSettings } from "@/types/database";

type SheetState = { row?: AccessorySaleRow } | null;
type Saved = { id: string; kind: "phone" | "accessory"; title: string; customer: string | null; profit: number } | null;

export function AccessorySalesManager({
  rows,
  summary,
  settings,
  suggestions,
  q,
  showMoreHref,
  autoOpenNew,
  hasAny,
}: {
  rows: AccessorySaleRow[];
  summary: ListSummary;
  settings: TrackerSettings;
  suggestions: SalesSuggestions;
  q: string;
  showMoreHref: string | null;
  autoOpenNew: boolean;
  hasAny: boolean;
}) {
  const pathname = usePathname();
  const [sheet, setSheet] = useState<SheetState>(autoOpenNew ? {} : null);
  const [saved, setSaved] = useState<Saved>(null);
  const [toDelete, setToDelete] = useState<AccessorySaleRow | null>(null);

  useEffect(() => {
    if (autoOpenNew) window.history.replaceState(null, "", pathname);
  }, [autoOpenNew, pathname]);

  const heading = (r: AccessorySaleRow) => (r.qty > 1 ? `${r.qty} × ${r.name}` : r.name);

  return (
    <div className="space-y-5">
      <PageHead
        title="Accessory Sales"
        description="Cases, chargers, earbuds and everything else."
        actions={<AddButton label="Add accessory sale" onClick={() => setSheet({})} />}
      />

      {!hasAny ? (
        <EmptyState
          icon={Plug}
          title="No accessory sales yet"
          description="Log cases, chargers, earbuds and more."
          action={<AddButton label="Add accessory sale" onClick={() => setSheet({})} />}
        />
      ) : (
        <>
          <SummaryStrip
            items={[
              { label: "Items", value: summary.items ?? 0 },
              { label: "Sales", value: rs(summary.sales) },
              { label: "Stock cost", value: rs(summary.cost) },
              { label: "Profit", value: <Profit value={summary.profit ?? 0} /> },
            ]}
          />
          <ListSearch initial={q} placeholder="Search accessory, customer, supplier…" />

          <div className="overflow-hidden rounded-2xl border border-ink/8 bg-paper">
            {rows.length === 0 ? (
              <NothingFound q={q} />
            ) : (
              <>
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-ink/8 bg-paper-soft text-left text-[11px] uppercase tracking-wider text-ink/50">
                        <th className="px-3 py-3 font-bold">Date</th>
                        <th className="px-3 py-3 font-bold">Accessory</th>
                        <th className="px-3 py-3 text-right font-bold">Qty</th>
                        <th className="px-3 py-3 font-bold">Customer</th>
                        <th className="px-3 py-3 font-bold">Sourced from</th>
                        <th className="px-3 py-3 text-right font-bold">Cost</th>
                        <th className="px-3 py-3 text-right font-bold">Sold for</th>
                        <th className="px-3 py-3 text-right font-bold">Profit</th>
                        <th className="px-3 py-3" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ink/6">
                      {rows.map((r) => (
                        <tr key={r.id} className="hover:bg-paper-soft/60">
                          <td className="whitespace-nowrap px-3 py-3">{niceDate(r.sale_date)}</td>
                          <td className="px-3 py-3">
                            <p className="font-semibold">{r.name}</p>
                            {r.type && <p className="text-xs text-ink/50">{r.type}</p>}
                          </td>
                          <td className="px-3 py-3 text-right tabular-nums">{r.qty}</td>
                          <td className="px-3 py-3">{r.customer_name || "—"}</td>
                          <td className="px-3 py-3">{r.supplier || "—"}</td>
                          <td className="whitespace-nowrap px-3 py-3 text-right tabular-nums">{rs(r.total_cost)}</td>
                          <td className="whitespace-nowrap px-3 py-3 text-right tabular-nums">{rs(r.total_sale)}</td>
                          <td className="whitespace-nowrap px-3 py-3 text-right">
                            <Profit value={r.profit} />
                          </td>
                          <td className="whitespace-nowrap px-3 py-2 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <InvoiceLink saleId={r.id} kind="accessory" invoiceId={r.invoice_id} invoiceNo={r.invoice?.invoice_no ?? null} />
                              <IconActions label={r.name} onEdit={() => setSheet({ row: r })} onDelete={() => setToDelete(r)} />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <ul className="divide-y divide-ink/6 md:hidden">
                  {rows.map((r) => (
                    <li key={r.id} className="flex gap-3 p-4">
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold">{heading(r)}</p>
                        <p className="mt-0.5 text-xs text-ink/55">
                          {niceDate(r.sale_date)} · {r.customer_name || "No customer"}
                        </p>
                        <p className="text-xs text-ink/55">
                          From {r.supplier || "—"} · cost {rs(r.total_cost)}
                        </p>
                        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                          <InvoiceLink saleId={r.id} kind="accessory" invoiceId={r.invoice_id} invoiceNo={r.invoice?.invoice_no ?? null} />
                          <IconActions label={r.name} onEdit={() => setSheet({ row: r })} onDelete={() => setToDelete(r)} />
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="font-bold tabular-nums">{rs(r.total_sale)}</p>
                        <Profit value={r.profit} signed className="text-xs" />
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          {showMoreHref && <ShowMore href={showMoreHref} />}
        </>
      )}

      <FormSheet open={sheet !== null} onOpenChange={(open) => !open && setSheet(null)}>
        {sheet && (
          <AccessorySaleForm
            key={sheet.row?.id ?? "new"}
            row={sheet.row}
            settings={settings}
            suggestions={suggestions}
            onCancel={() => setSheet(null)}
            onSaved={(result, values, isNew) => {
              setSheet(null);
              if (isNew && result.id) {
                setSaved({
                  id: result.id,
                  kind: "accessory",
                  title: values.qty > 1 ? `${values.qty} × ${values.name}` : values.name,
                  customer: values.customerName || null,
                  profit: result.profit ?? values.qty * (values.unitPrice - values.unitCost),
                });
              } else {
                toast.success("Changes saved");
              }
            }}
          />
        )}
      </FormSheet>

      <AfterSaleDialog saved={saved} onClose={() => setSaved(null)} />

      <ConfirmDeleteDialog
        open={toDelete !== null}
        onOpenChange={(open) => !open && setToDelete(null)}
        noun="sale"
        label={toDelete ? heading(toDelete) : ""}
        onConfirm={async () => {
          if (!toDelete) return null;
          const result = await deleteAccessorySaleAction(toDelete.id);
          if (!result.success) return result.error ?? "Couldn't delete — try again.";
          toast.success("Sale deleted");
          return null;
        }}
      />
    </div>
  );
}
