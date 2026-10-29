"use client";

import Link from "next/link";
import { FileText, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { BTN } from "@/components/admin/sales/shared";

/** Right-hand drawer on desktop, full screen on phones. */
export function FormSheet({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="gap-0 data-[side=right]:w-full data-[side=right]:sm:max-w-[560px]"
      >
        {children}
      </SheetContent>
    </Sheet>
  );
}

export function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <Button type="button" onClick={onClick} className={`${BTN} gap-1.5 bg-brand px-4 text-white hover:bg-brand/90`}>
      <Plus className="size-4" />
      {label}
    </Button>
  );
}

/** `+ Invoice` for a sale without one, or a link to the existing invoice (showing its number). */
export function InvoiceLink({
  saleId,
  kind,
  invoiceId,
  invoiceNo,
}: {
  saleId: string;
  kind: "phone" | "accessory";
  invoiceId: string | null;
  invoiceNo: string | null;
}) {
  const className =
    "inline-flex h-11 items-center gap-1.5 rounded-lg border border-ink/12 bg-paper px-3 text-[13px] font-semibold hover:bg-ink/5 sm:h-8";
  if (invoiceId) {
    return (
      <Link href={`/admin/invoices/${invoiceId}`} className={className} title="Open invoice">
        <FileText className="size-3.5" />
        {invoiceNo ?? "Invoice"}
      </Link>
    );
  }
  return (
    <Link href={`/admin/invoices/new?sale=${saleId}&kind=${kind}`} className={className} title="Create invoice">
      <Plus className="size-3.5" />
      Invoice
    </Link>
  );
}

export function IconActions({ onEdit, onDelete, label }: { onEdit: () => void; onDelete: () => void; label: string }) {
  return (
    <>
      <Button type="button" variant="ghost" size="icon" onClick={onEdit} aria-label={`Edit ${label}`} title="Edit">
        <Pencil className="size-4" />
      </Button>
      <Button type="button" variant="ghost" size="icon" onClick={onDelete} aria-label={`Delete ${label}`} title="Delete">
        <Trash2 className="size-4" />
      </Button>
    </>
  );
}

export function NothingFound({ q }: { q: string }) {
  return <p className="px-4 py-12 text-center text-sm text-ink/50">Nothing matches &ldquo;{q}&rdquo;.</p>;
}
