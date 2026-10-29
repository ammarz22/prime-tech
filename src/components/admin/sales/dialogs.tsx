"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, FileText, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Profit } from "@/components/admin/sales/shared";
import { BTN } from "@/components/admin/sales/shared";

/**
 * "Delete sale" / "Keep it" — names exactly what is about to be removed.
 * The caller does the delete and reports back an error string (or null).
 */
export function ConfirmDeleteDialog({
  open,
  onOpenChange,
  noun,
  label,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  noun: "sale" | "expense" | "invoice";
  label: string;
  onConfirm: () => Promise<string | null>;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function confirm() {
    setBusy(true);
    setError(null);
    const message = await onConfirm();
    setBusy(false);
    if (message) setError(message);
    else onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!busy) {
          setError(null);
          onOpenChange(next);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg">Delete this {noun}?</DialogTitle>
          <DialogDescription>
            <b className="text-foreground">{label}</b> will be removed for good. This can&apos;t be undone.
          </DialogDescription>
        </DialogHeader>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <DialogFooter>
          <Button type="button" variant="outline" className={BTN} onClick={() => onOpenChange(false)} disabled={busy}>
            Keep it
          </Button>
          <Button type="button" variant="destructive" className={BTN} onClick={confirm} disabled={busy}>
            {busy ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
            Delete {noun}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/** Shown after saving a NEW phone / accessory sale. */
export function AfterSaleDialog({
  saved,
  onClose,
}: {
  saved: { id: string; kind: "phone" | "accessory"; title: string; customer: string | null; profit: number } | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={saved !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        {saved && (
          <>
            <div className="flex size-11 items-center justify-center rounded-full bg-green-100 text-green-700">
              <Check className="size-6" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-lg">Sale saved — profit <Profit value={saved.profit} /></DialogTitle>
              <DialogDescription>
                {saved.title}
                {saved.customer ? ` for ${saved.customer}` : ""}. Do you want to make an invoice for this sale?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="button" variant="outline" className={BTN} onClick={onClose}>
                Not now
              </Button>
              <Button
                render={<Link href={`/admin/invoices/new?sale=${saved.id}&kind=${saved.kind}`} />}
                className={`${BTN} bg-brand text-white hover:bg-brand/90`}
              >
                <FileText className="size-4" />
                Create invoice
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
