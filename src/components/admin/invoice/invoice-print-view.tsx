"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Pencil, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InvoicePaper, ScaledPaper, type PaperBusiness, type PaperData } from "@/components/admin/invoice/invoice-paper";

/**
 * A clean A4 page: no admin chrome, a toolbar that disappears when printing,
 * and `document.title` set to `INV-0061 - Customer Name` so "Save as PDF"
 * proposes that file name.
 */
export function InvoicePrintView({
  invoiceId,
  title,
  data,
  business,
}: {
  invoiceId: string;
  title: string;
  data: PaperData;
  business: PaperBusiness;
}) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div className="min-h-dvh bg-ink/[0.06] print:bg-white">
      {/* A4, no margins — the paper draws its own padding. */}
      <style>{`@page { size: A4; margin: 0; } @media print { html, body { margin: 0 !important; background: #fff !important; } }`}</style>

      <div className="sticky top-0 z-20 flex flex-wrap items-center gap-2 border-b border-ink/10 bg-paper px-3 py-2.5 print:hidden sm:px-6">
        <Button render={<Link href="/admin/invoices" />} variant="outline" className="h-11 gap-1.5 sm:h-9">
          <ArrowLeft className="size-4" />
          Back
        </Button>
        <Button render={<Link href={`/admin/invoices/${invoiceId}`} />} variant="outline" className="h-11 gap-1.5 sm:h-9">
          <Pencil className="size-4" />
          Edit
        </Button>
        <Button
          type="button"
          onClick={() => window.print()}
          className="ml-auto h-11 gap-1.5 bg-brand px-4 text-white hover:bg-brand/90 sm:h-9"
        >
          <Printer className="size-4" />
          Print / Save as PDF
        </Button>
      </div>

      <div className="px-3 py-5 print:p-0 sm:px-6">
        <div className="mx-auto max-w-[794px] print:max-w-none">
          <ScaledPaper>
            <InvoicePaper data={data} business={business} />
          </ScaledPaper>
        </div>
      </div>
    </div>
  );
}
