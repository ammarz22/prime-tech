"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/lib/validations/auth";
import { forgotPasswordAction } from "@/lib/actions/auth";

export default function ForgotPasswordPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({ resolver: zodResolver(forgotPasswordSchema) });

  async function onSubmit(data: ForgotPasswordInput) {
    setServerError(null);
    const result = await forgotPasswordAction(data);
    if (!result.success) {
      setServerError(result.error ?? "Something went wrong.");
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-3xl border border-ink/8 bg-paper p-8 text-center">
        <CheckCircle2 className="mx-auto size-12 text-emerald-500" strokeWidth={1.5} />
        <h1 className="mt-4 text-xl font-semibold">Check your email</h1>
        <p className="mt-1.5 text-sm text-ink/55">
          If an account exists for that address, we&apos;ve sent a password reset link.
        </p>
        <Button className="mt-6 w-full" render={<Link href="/login" />}>
          Back to Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-ink/8 bg-paper p-8">
      <h1 className="text-2xl font-semibold tracking-tight">Reset your password</h1>
      <p className="mt-1.5 text-sm text-ink/55">We&apos;ll email you a link to reset it.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="forgot-email">Email</Label>
          <Input id="forgot-email" type="email" {...register("email")} aria-invalid={!!errors.email} />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>

        {serverError && <p className="text-sm text-destructive">{serverError}</p>}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
          Send Reset Link
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink/55">
        <Link href="/login" className="font-medium text-brand hover:underline">
          Back to Sign In
        </Link>
      </p>
    </div>
  );
}
