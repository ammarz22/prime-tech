import { createClient } from "@/lib/supabase/server";
import type { Branch } from "@/types/database";

function isSupabaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
}

export async function getBranches(): Promise<Branch[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data } = await supabase.from("branches").select("*").order("name");
  return data ?? [];
}

export async function getBranchBySlug(slug: string): Promise<Branch | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data } = await supabase.from("branches").select("*").eq("slug", slug).maybeSingle();
  return data ?? null;
}
