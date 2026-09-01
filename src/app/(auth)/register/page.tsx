"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordStrength } from "@/components/auth/password-strength";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";
import { registerAction } from "@/lib/actions/auth";

export default function RegisterPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  async function onSubmit(data: RegisterInput) {
    setServerError(null);
    const result = await registerAction(data);
    if (!result.success) {
      setServerError(result.error ?? "Something went wrong.");
      return;
    }
    setSuccess(true);
  }

  if (success) {
    return (
      <div className="rounded-3xl border border-ink/8 bg-paper p-8 text-center">
        <CheckCircle2 className="mx-auto size-12 text-emerald-500" strokeWidth={1.5} />
        <h1 className="mt-4 text-xl font-semibold">Check your email</h1>
        <p className="mt-1.5 text-sm text-ink/55">
          We&apos;ve sent a confirmation link to finish creating your account.
        </p>
        <Button className="mt-6 w-full" render={<Link href="/login" />}>
          Back to Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-ink/8 bg-paper p-8">
      <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
      <p className="mt-1.5 text-sm text-ink/55">Join Prime Tech to save products and track enquiries.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="register-name">Full Name</Label>
          <Input id="register-name" {...register("fullName")} aria-invalid={!!errors.fullName} />
          {errors.fullName && <p className="text-xs text-destructive">{errors.fullName.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="register-email">Email</Label>
          <Input id="register-email" type="email" {...register("email")} aria-invalid={!!errors.email} />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="register-phone">Phone</Label>
          <Input id="register-phone" type="tel" {...register("phone")} aria-invalid={!!errors.phone} />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="register-password">Password</Label>
          <Input id="register-password" type="password" {...register("password")} aria-invalid={!!errors.password} />
          <PasswordStrength password={watch("password") ?? ""} />
          {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="register-confirm">Confirm Password</Label>
          <Input id="register-confirm" type="password" {...register("confirmPassword")} aria-invalid={!!errors.confirmPassword} />
          {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>}
        </div>

        {serverError && <p className="text-sm text-destructive">{serverError}</p>}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
          Create Account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink/55">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-brand hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
