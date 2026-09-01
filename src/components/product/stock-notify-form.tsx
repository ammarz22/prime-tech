"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BellRing, CheckCircle2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { stockNotificationSchema, type StockNotificationInput } from "@/lib/validations/stock-notification";
import { submitStockNotification } from "@/lib/actions/stock-notifications";

/** Captures a "notify me" request for an out-of-stock variant. No automated
 * email is sent — this is capture + admin visibility only, since no email
 * service is wired up anywhere in this project. */
export function StockNotifyForm({ productId, variantId }: { productId: string; variantId: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StockNotificationInput>({
    resolver: zodResolver(stockNotificationSchema),
    defaultValues: { productId, variantId },
  });

  async function onSubmit(data: StockNotificationInput) {
    setServerError(null);
    const result = await submitStockNotification(data);
    if (!result.success) {
      setServerError(result.error ?? "Something went wrong.");
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="flex items-center gap-2 rounded-2xl border border-ink/8 bg-paper-soft p-4 text-sm text-ink/60">
        <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
        We&apos;ll notify you when this configuration is back in stock.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 rounded-2xl border border-ink/8 bg-paper-soft p-4 sm:flex-row sm:items-start">
      <div className="flex-1">
        <p className="flex items-center gap-1.5 text-sm font-medium text-ink">
          <BellRing className="size-3.5 text-brand" />
          Notify me when back in stock
        </p>
        <Input type="email" placeholder="you@example.com" className="mt-2 h-9" {...register("email")} aria-invalid={!!errors.email} />
        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
        {serverError && <p className="mt-1 text-xs text-destructive">{serverError}</p>}
      </div>
      <Button type="submit" variant="outline" size="sm" className="mt-0.5 gap-1.5 sm:mt-6" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="size-3.5 animate-spin" />}
        Notify Me
      </Button>
    </form>
  );
}
