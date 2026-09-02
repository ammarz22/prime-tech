"use server";

import { createClient } from "@/lib/supabase/server";
import {
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  type LoginInput,
  type ForgotPasswordInput,
  type ResetPasswordInput,
} from "@/lib/validations/auth";
import { siteConfig } from "@/lib/config/site";

export interface AuthResult {
  success: boolean;
  error?: string;
}

function backendNotConfigured(): AuthResult {
  return {
    success: false,
    error: "Sign-in isn't connected yet — the site owner needs to configure Supabase.",
  };
}

export async function loginAction(input: LoginInput): Promise<AuthResult> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message };
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return backendNotConfigured();

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) return { success: false, error: "Incorrect email or password." };
  return { success: true };
}

export async function logoutAction(): Promise<void> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;
  const supabase = await createClient();
  await supabase.auth.signOut();
}

export async function forgotPasswordAction(input: ForgotPasswordInput): Promise<AuthResult> {
  const parsed = forgotPasswordSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message };
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return backendNotConfigured();

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${siteConfig.url}/reset-password`,
  });
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function resetPasswordAction(input: ResetPasswordInput): Promise<AuthResult> {
  const parsed = resetPasswordSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message };
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return backendNotConfigured();

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
  if (error) return { success: false, error: error.message };
  return { success: true };
}
