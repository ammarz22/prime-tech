"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { FileText, Pencil, Plus, Printer, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common/empty-state";
import { ConfirmDeleteDialog } from "@/components/admin/sales/dialogs";
import { ListSearch } from "@/components/admin/sales/list-search";
import { NothingFound } from "@/components/admin/sales/list-parts";
import { BTN, PageHead, ShowMore, SummaryStrip } from "@/components/admin/sales/shared";
import { deleteInvoiceAction } from "@/lib/actions/admin-invoices";
import { lkr, niceDate } from "@/lib/utils/sales-format";
import type { ListSummary } from "@/lib/db/sales";
import type { Invoice } from "@/types/database";

function NewInvoiceButton() {
  return (
    <Button render={<Link href="/admin/invoices/new" />} className={`${BTN} gap-1.5 bg-brand px-4 text-white hover:bg-brand/90`}>
      <Plus className="size-4" />
      New invoice
    </Button>
  );
}

function InvoiceActions({ invoice, onDelete }: { invoice: Invoice; onDelete: () => void }) {
  return (
    <div className="flex items-center gap-1">
      <Button render={<Link href={`/admin/invoices/${invoice.id}/print`} />} variant="outline" className="h-11 gap-1.5 sm:h-8">
        <Printer className="size-3.5" />
        Print
      </Button>
      <Button render={<Link href={`/admin/invoices/${invoice.id}`} />} variant="ghost" size="icon" aria-label={`Open ${invoice.invoice_no}`} title="Open / edit">
        <Pencil className="size-4" />
      </Button>
      <Button type="button" variant="ghost" size="icon" onClick={onDelete} aria-label={`Delete ${invoice.invoice_no}`} title="Delete">
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}

export function InvoicesManager({
  rows,
  summary,
  q,
  showMoreHref,
  nextNumber,
  hasAny,
}: {
  rows: Invoice[];
  summary: ListSummary;
  q: string;
  showMoreHref: string | null;
  nextNumber: string;
  hasAny: boolean;
}) {
  const [toDelete, setToDelete] = useState<Invoice | null>(null);

  return (
    <div className="space-y-5">
      <PageHead
        title="Invoices"
        description={
          <>
            Every invoice you&apos;ve made. Next number: <b className="text-ink">{nextNumber}</b>
          </>
        }
        actions={<NewInvoiceButton />}
      />

      {!hasAny ? (
        <EmptyState
          icon={FileText}
          title="No invoices yet"
          description="Save a sale and choose “Create invoice”, or start a blank one."
          action={<NewInvoiceButton />}
        />
      ) : (
        <>
          <SummaryStrip
            items={[
              { label: "Invoices", value: summary.count },
              { label: "Total billed", value: lkr(summary.total) },
            ]}
          />
          <ListSearch initial={q} placeholder="Search invoice no., customer, phone…" />

          <div className="overflow-hidden rounded-2xl border border-ink/8 bg-paper">
            {rows.length === 0 ? (
              <NothingFound q={q} />
            ) : (
              <>
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-ink/8 bg-paper-soft text-left text-[11px] uppercase tracking-wider text-ink/50">
                        <th className="px-3 py-3 font-bold">Invoice</th>
                        <th className="px-3 py-3 font-bold">Date</th>
                        <th className="px-3 py-3 font-bold">Customer</th>
                        <th className="px-3 py-3 font-bold">Items</th>
                        <th className="px-3 py-3 text-right font-bold">Total</th>
                        <th className="px-3 py-3" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ink/6">
                      {rows.map((r) => (
                        <tr key={r.id} className="hover:bg-paper-soft/60">
                          <td className="whitespace-nowrap px-3 py-3">
                            <Link href={`/admin/invoices/${r.id}`} className="rounded-full bg-brand/10 px-2.5 py-1 text-xs font-bold text-brand">
                              {r.invoice_no}
                            </Link>
                          </td>
                          <td className="whitespace-nowrap px-3 py-3">{niceDate(r.invoice_date)}</td>
                          <td className="px-3 py-3">
                            <p className="font-semibold">{r.customer_name || "—"}</p>
                            {r.customer_phone && <p className="text-xs text-ink/50">{r.customer_phone}</p>}
                          </td>
                          <td className="max-w-xs px-3 py-3">
                            <p className="truncate text-xs text-ink/55">{r.items.map((i) => i.desc).join(", ")}</p>
                          </td>
                          <td className="whitespace-nowrap px-3 py-3 text-right font-bold tabular-nums">{lkr(r.total)}</td>
                          <td className="whitespace-nowrap px-3 py-2 text-right">
                            <div className="flex justify-end">
                              <InvoiceActions invoice={r} onDelete={() => setToDelete(r)} />
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
                        <p className="font-semibold">
                          {r.invoice_no} · {r.customer_name || "—"}
                        </p>
                        <p className="mt-0.5 text-xs text-ink/55">{niceDate(r.invoice_date)}</p>
                        <div className="mt-2.5">
                          <InvoiceActions invoice={r} onDelete={() => setToDelete(r)} />
                        </div>
                      </div>
                      <p className="shrink-0 font-bold tabular-nums">{lkr(r.total)}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          {showMoreHref && <ShowMore href={showMoreHref} />}
        </>
      )}

      <ConfirmDeleteDialog
        open={toDelete !== null}
        onOpenChange={(open) => !open && setToDelete(null)}
        noun="invoice"
        label={toDelete ? `${toDelete.invoice_no}${toDelete.customer_name ? " · " + toDelete.customer_name : ""}` : ""}
        onConfirm={async () => {
          if (!toDelete) return null;
          const result = await deleteInvoiceAction(toDelete.id);
          if (!result.success) return result.error ?? "Couldn't delete — try again.";
          toast.success("Invoice deleted — its sale is free for a new invoice");
          return null;
        }}
      />
    </div>
  );
}
