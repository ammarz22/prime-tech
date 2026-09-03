"use client";

import { useTransition } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { setStockNotificationNotifiedAction } from "@/lib/actions/admin-stock-notifications";

interface StockNotificationRowProps {
  id: string;
  email: string;
  productName: string;
  variantLabel: string | null;
  notified: boolean;
  createdAt: string;
}

export function StockNotificationRow({ id, email, productName, variantLabel, notified, createdAt }: StockNotificationRowProps) {
  const [pending, startTransition] = useTransition();

  function handleToggle(checked: boolean) {
    startTransition(() => {
      void setStockNotificationNotifiedAction(id, checked);
    });
  }

  return (
    <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-[1fr_auto] sm:items-center">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-medium">{email}</p>
        </div>
        <p className="mt-1 text-sm text-brand">
          {productName}
          {variantLabel && <span className="text-ink/50"> — {variantLabel}</span>}
        </p>
        <p className="mt-2 text-xs text-ink/35">{new Date(createdAt).toLocaleString("en-LK")}</p>
      </div>
      <label className="flex items-center gap-2 text-sm text-ink/70">
        <Checkbox checked={notified} onCheckedChange={handleToggle} disabled={pending} />
        Notified
      </label>
    </div>
  );
}
