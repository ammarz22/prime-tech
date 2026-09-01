"use client";

import { useTransition } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateEnquiryStatusAction } from "@/lib/actions/admin-enquiries";
import type { EnquiryStatus } from "@/types/database";

interface EnquiryRowProps {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  configuration?: string | null;
  productName: string | null;
  status: EnquiryStatus;
  createdAt: string;
}

export function EnquiryRow({ id, name, email, phone, message, configuration, productName, status, createdAt }: EnquiryRowProps) {
  const [pending, startTransition] = useTransition();

  function handleStatusChange(value: string | null) {
    if (!value) return;
    startTransition(() => {
      void updateEnquiryStatusAction(id, value as EnquiryStatus);
    });
  }

  return (
    <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-[1fr_auto] sm:items-start">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-medium">{name}</p>
          <span className="text-xs text-ink/40">{email}</span>
          {phone && <span className="text-xs text-ink/40">· {phone}</span>}
        </div>
        {productName && <p className="mt-1 text-sm text-brand">{productName}</p>}
        {configuration && (
          <p className="mt-1 whitespace-pre-line rounded-lg bg-paper-soft px-2.5 py-1.5 text-xs text-ink/55">{configuration}</p>
        )}
        {message && <p className="mt-1 text-sm text-ink/60">{message}</p>}
        <p className="mt-2 text-xs text-ink/35">{new Date(createdAt).toLocaleString("en-LK")}</p>
      </div>
      <Select value={status} onValueChange={handleStatusChange} disabled={pending}>
        <SelectTrigger className="w-[140px]">
          <SelectValue>
            {(value: string) => ({ new: "New", contacted: "Contacted", closed: "Closed" })[value] ?? value}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="new">New</SelectItem>
          <SelectItem value="contacted">Contacted</SelectItem>
          <SelectItem value="closed">Closed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
