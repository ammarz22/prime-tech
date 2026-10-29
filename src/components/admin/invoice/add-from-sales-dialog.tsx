"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { BTN, CONTROL } from "@/components/admin/sales/shared";
import { listUninvoicedSalesAction, type PickableSale } from "@/lib/actions/admin-invoices";
import { lkr, niceDate } from "@/lib/utils/sales-format";
import { cn } from "@/lib/utils";

interface Loaded {
  /** The date this result is for (`""` = "any date"), so a stale answer is never shown. */
  key: string;
  sales: PickableSale[];
  error?: string;
}

/**
 * "Add from sales": lists the phone and accessory sales that aren't on an invoice
 * yet — for a chosen date, or any date — so a customer's phone, cover and
 * screen protector can all go on one invoice without retyping them.
 */
export function AddFromSalesDialog({
  open,
  onOpenChange,
  invoiceDate,
  customerName,
  excludeIds,
  onAdd,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoiceDate: string;
  customerName: string;
  /** Sales already on this invoice. */
  excludeIds: string[];
  onAdd: (sales: PickableSale[]) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[88dvh] flex-col gap-3 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg">Add from your sales</DialogTitle>
          <DialogDescription>
            Pick a day and tick what this customer bought. Sales already on an invoice aren&apos;t shown.
          </DialogDescription>
        </DialogHeader>
        {/* Mounted only while open, so it starts fresh (and loads) every time. */}
        {open && (
          <PickerBody
            defaultDate={invoiceDate}
            customerName={customerName}
            excludeIds={excludeIds}
            onCancel={() => onOpenChange(false)}
            onAdd={(sales) => {
              onAdd(sales);
              onOpenChange(false);
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function PickerBody({
  defaultDate,
  customerName,
  excludeIds,
  onCancel,
  onAdd,
}: {
  defaultDate: string;
  customerName: string;
  excludeIds: string[];
  onCancel: () => void;
  onAdd: (sales: PickableSale[]) => void;
}) {
  const [date, setDate] = useState(defaultDate);
  const [anyDate, setAnyDate] = useState(false);
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState<Loaded | null>(null);

  const key = anyDate ? "" : date;
  const loading = loaded?.key !== key;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const result = await listUninvoicedSalesAction(key === "" ? null : key);
      if (!cancelled) setLoaded({ key, sales: result.sales, error: result.success ? undefined : result.error });
    })();
    return () => {
      cancelled = true;
    };
  }, [key]);

  const exclude = new Set(excludeIds);
  const customer = customerName.trim().toLowerCase();
  const sales = (loaded?.key === key ? loaded.sales : [])
    .filter((s) => !exclude.has(s.id))
    // This customer's sales first.
    .sort((a, b) => Number(isMatch(b, customer)) - Number(isMatch(a, customer)));

  const chosen = sales.filter((s) => picked.has(s.id));
  const total = chosen.reduce((sum, s) => sum + s.qty * s.unitPrice, 0);

  function toggle(id: string) {
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <>
      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-40 flex-1 space-y-1.5">
          <label htmlFor="pick-date" className="block text-[13px] font-semibold text-ink/80">
            Sale date
          </label>
          <Input id="pick-date" type="date" value={date} disabled={anyDate} onChange={(e) => setDate(e.target.value)} className={CONTROL} />
        </div>
        <label className="flex min-h-11 cursor-pointer items-center gap-2 text-[13px] font-medium text-ink/70 sm:min-h-9">
          <input type="checkbox" className="size-5 accent-[var(--brand)] sm:size-4" checked={anyDate} onChange={(e) => setAnyDate(e.target.checked)} />
          Any date
        </label>
      </div>

      <div className="min-h-24 flex-1 overflow-y-auto rounded-xl border border-ink/8">
        {loading ? (
          <p className="flex items-center justify-center gap-2 py-10 text-sm text-ink/50">
            <Loader2 className="size-4 animate-spin" /> Loading sales…
          </p>
        ) : loaded?.error ? (
          <p role="alert" className="px-4 py-8 text-center text-sm text-destructive">
            {loaded.error}
          </p>
        ) : sales.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-ink/50">
            {anyDate ? "No sales are waiting for an invoice." : `No uninvoiced sales on ${niceDate(date) || "that date"}. Try another date, or “Any date”.`}
          </p>
        ) : (
          <ul className="divide-y divide-ink/6">
            {sales.map((s) => {
              const on = picked.has(s.id);
              const match = isMatch(s, customer);
              return (
                <li key={s.id}>
                  <label className={cn("flex min-h-14 cursor-pointer items-start gap-3 p-3", on ? "bg-brand/5" : "hover:bg-ink/[0.03]")}>
                    <input type="checkbox" className="mt-0.5 size-5 shrink-0 accent-[var(--brand)]" checked={on} onChange={() => toggle(s.id)} />
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-1.5">
                        <span className="rounded-full bg-ink/8 px-2 py-0.5 text-[11px] font-semibold">
                          {s.kind === "phone" ? "Phone" : "Accessory"}
                        </span>
                        {match && <span className="rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-semibold text-green-700">Same customer</span>}
                      </span>
                      <span className="mt-1 line-clamp-2 block text-sm font-medium">{s.desc}</span>
                      <span className="mt-0.5 block text-xs text-ink/50">
                        {niceDate(s.date)} · {s.customer || "No customer"}
                      </span>
                    </span>
                    <span className="shrink-0 text-right text-sm font-semibold tabular-nums">
                      {lkr(s.qty * s.unitPrice)}
                      {s.qty > 1 && <span className="block text-xs font-normal text-ink/50">{s.qty} × {lkr(s.unitPrice)}</span>}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-ink/60">
          {chosen.length ? (
            <>
              <b className="text-ink">{chosen.length}</b> selected · <b className="text-ink tabular-nums">{lkr(total)}</b>
            </>
          ) : (
            "Nothing selected"
          )}
        </p>
        <div className="flex gap-2">
          <Button type="button" variant="outline" className={BTN} onClick={onCancel}>
            Cancel
          </Button>
          <Button type="button" className={`${BTN} gap-1.5`} disabled={chosen.length === 0} onClick={() => onAdd(chosen)}>
            <Plus className="size-4" />
            Add to invoice
          </Button>
        </div>
      </div>
    </>
  );
}

function isMatch(sale: PickableSale, customer: string) {
  return customer !== "" && (sale.customer ?? "").trim().toLowerCase() === customer;
}
