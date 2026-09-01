"use client";

import { useTransition } from "react";
import { Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateReviewStatusAction, toggleReviewVerifiedAction, deleteReviewAction } from "@/lib/actions/admin-reviews";
import type { ReviewStatus } from "@/types/database";

interface ReviewRowProps {
  id: string;
  customerName: string;
  rating: number;
  title: string | null;
  body: string;
  productName: string | null;
  status: ReviewStatus;
  verified: boolean;
  createdAt: string;
}

export function ReviewRow({ id, customerName, rating, title, body, productName, status, verified, createdAt }: ReviewRowProps) {
  const [pending, startTransition] = useTransition();

  function handleStatusChange(value: string | null) {
    if (!value) return;
    startTransition(() => {
      void updateReviewStatusAction(id, value as ReviewStatus);
    });
  }

  function handleVerifiedChange(next: boolean) {
    startTransition(() => {
      void toggleReviewVerifiedAction(id, next);
    });
  }

  function handleDelete() {
    startTransition(() => {
      void deleteReviewAction(id);
    });
  }

  return (
    <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-[1fr_auto] sm:items-start">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-medium">{customerName}</p>
          <span className="flex items-center gap-0.5 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-3.5" fill={i < rating ? "currentColor" : "none"} strokeWidth={1.5} />
            ))}
          </span>
          {productName && <span className="text-xs text-brand">{productName}</span>}
        </div>
        {title && <p className="mt-1 text-sm font-medium">{title}</p>}
        <p className="mt-1 text-sm text-ink/60">{body}</p>
        <p className="mt-2 text-xs text-ink/35">{new Date(createdAt).toLocaleString("en-LK")}</p>
        <label className="mt-2 flex items-center gap-2 text-xs text-ink/55">
          <Checkbox checked={verified} onCheckedChange={handleVerifiedChange} disabled={pending} />
          Mark as verified customer
        </label>
      </div>
      <div className="flex items-center gap-2">
        <Select value={status} onValueChange={handleStatusChange} disabled={pending}>
          <SelectTrigger className="w-[130px]">
            <SelectValue>
              {(value: string) => ({ pending: "Pending", approved: "Approved", rejected: "Rejected" })[value] ?? value}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="ghost" size="icon" onClick={handleDelete} disabled={pending} aria-label="Delete review">
          <Trash2 className="size-4 text-destructive" />
        </Button>
      </div>
    </div>
  );
}
