"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { Wallet } from "lucide-react";
import { EmptyState } from "@/components/common/empty-state";
import { ConfirmDeleteDialog } from "@/components/admin/sales/dialogs";
import { AddButton, FormSheet, IconActions, NothingFound } from "@/components/admin/sales/list-parts";
import { ListSearch } from "@/components/admin/sales/list-search";
import { ExpenseForm } from "@/components/admin/sales/sales-forms";
import { PageHead, ShowMore, SummaryStrip } from "@/components/admin/sales/shared";
import { deleteExpenseAction } from "@/lib/actions/admin-sales";
import { niceDate, rs } from "@/lib/utils/sales-format";
import type { ListSummary } from "@/lib/db/sales";
import type { BusinessExpense, TrackerSettings } from "@/types/database";

type SheetState = { row?: BusinessExpense } | null;

export function ExpensesManager({
  rows,
  summary,
  settings,
  q,
  showMoreHref,
  autoOpenNew,
  hasAny,
}: {
  rows: BusinessExpense[];
  summary: ListSummary;
  settings: TrackerSettings;
  q: string;
  showMoreHref: string | null;
  autoOpenNew: boolean;
  hasAny: boolean;
}) {
  const pathname = usePathname();
  const [sheet, setSheet] = useState<SheetState>(autoOpenNew ? {} : null);
  const [toDelete, setToDelete] = useState<BusinessExpense | null>(null);

  useEffect(() => {
    if (autoOpenNew) window.history.replaceState(null, "", pathname);
  }, [autoOpenNew, pathname]);

  const label = (r: BusinessExpense) => r.description || r.category;

  return (
    <div className="space-y-5">
      <PageHead
        title="Expenses"
        description="Running costs that aren't stock — rent, ads, transport, salaries."
        actions={<AddButton label="Add expense" onClick={() => setSheet({})} />}
      />

      {!hasAny ? (
        <EmptyState
          icon={Wallet}
          title="No expenses yet"
          description="Add rent, transport, Facebook ads and other running costs."
          action={<AddButton label="Add expense" onClick={() => setSheet({})} />}
        />
      ) : (
        <>
          <SummaryStrip
            items={[
              { label: "Entries", value: summary.count },
              { label: "Total spent", value: rs(summary.total) },
            ]}
          />
          <ListSearch initial={q} placeholder="Search category, description, paid to…" />

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
                        <th className="px-3 py-3 font-bold">Category</th>
                        <th className="px-3 py-3 font-bold">Description</th>
                        <th className="px-3 py-3 font-bold">Paid to</th>
                        <th className="px-3 py-3 text-right font-bold">Amount</th>
                        <th className="px-3 py-3 font-bold">Payment</th>
                        <th className="px-3 py-3" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ink/6">
                      {rows.map((r) => (
                        <tr key={r.id} className="hover:bg-paper-soft/60">
                          <td className="whitespace-nowrap px-3 py-3">{niceDate(r.expense_date)}</td>
                          <td className="px-3 py-3">
                            <span className="inline-block rounded-full bg-ink/6 px-2 py-0.5 text-xs font-medium">{r.category}</span>
                          </td>
                          <td className="px-3 py-3 font-semibold">{r.description || "—"}</td>
                          <td className="px-3 py-3">{r.paid_to || "—"}</td>
                          <td className="whitespace-nowrap px-3 py-3 text-right font-bold tabular-nums">{rs(r.amount)}</td>
                          <td className="px-3 py-3">{r.payment_method || ""}</td>
                          <td className="whitespace-nowrap px-3 py-2 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <IconActions label={label(r)} onEdit={() => setSheet({ row: r })} onDelete={() => setToDelete(r)} />
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
                        <p className="font-semibold">{label(r)}</p>
                        <p className="mt-0.5 text-xs text-ink/55">
                          {niceDate(r.expense_date)} · {r.category}
                        </p>
                        <div className="mt-2.5 flex items-center gap-1.5">
                          <IconActions label={label(r)} onEdit={() => setSheet({ row: r })} onDelete={() => setToDelete(r)} />
                        </div>
                      </div>
                      <p className="shrink-0 font-bold tabular-nums">{rs(r.amount)}</p>
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
          <ExpenseForm
            key={sheet.row?.id ?? "new"}
            row={sheet.row}
            settings={settings}
            onCancel={() => setSheet(null)}
            onSaved={(_result, _values, isNew) => {
              setSheet(null);
              toast.success(isNew ? "Expense saved" : "Changes saved");
            }}
          />
        )}
      </FormSheet>

      <ConfirmDeleteDialog
        open={toDelete !== null}
        onOpenChange={(open) => !open && setToDelete(null)}
        noun="expense"
        label={toDelete ? label(toDelete) : ""}
        onConfirm={async () => {
          if (!toDelete) return null;
          const result = await deleteExpenseAction(toDelete.id);
          if (!result.success) return result.error ?? "Couldn't delete — try again.";
          toast.success("Expense deleted");
          return null;
        }}
      />
    </div>
  );
}
