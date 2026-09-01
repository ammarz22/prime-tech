"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordStrength } from "@/components/auth/password-strength";
import { resetPasswordSchema, type ResetPasswordInput } from "@/lib/validations/auth";
import { resetPasswordAction } from "@/lib/actions/auth";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({ resolver: zodResolver(resetPasswordSchema) });

  async function onSubmit(data: ResetPasswordInput) {
    setServerError(null);
    const result = await resetPasswordAction(data);
    if (!result.success) {
      setServerError(result.error ?? "Something went wrong.");
      return;
    }
    router.push("/login");
  }

  return (
    <div className="rounded-3xl border border-ink/8 bg-paper p-8">
      <h1 className="text-2xl font-semibold tracking-tight">Set a new password</h1>
      <p className="mt-1.5 text-sm text-ink/55">Choose a strong password for your account.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="reset-password">New Password</Label>
          <Input id="reset-password" type="password" {...register("password")} aria-invalid={!!errors.password} />
          <PasswordStrength password={watch("password") ?? ""} />
          {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="reset-confirm">Confirm Password</Label>
          <Input id="reset-confirm" type="password" {...register("confirmPassword")} aria-invalid={!!errors.confirmPassword} />
          {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>}
        </div>

        {serverError && <p className="text-sm text-destructive">{serverError}</p>}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
          Update Password
        </Button>
      </form>
    </div>
  );
}
