import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Branch } from "@/types/database";

function isSupabaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
}

// Wrapped in `cache()` since multiple components on the same page (e.g. the
// Contact page and the FAQ generator) each call this independently — without
// per-request memoization that's a duplicate round-trip every time.
export const getBranches = cache(async function getBranches(): Promise<Branch[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data } = await supabase.from("branches").select("*").order("name");
  return data ?? [];
});

export const getBranchBySlug = cache(async function getBranchBySlug(slug: string): Promise<Branch | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data } = await supabase.from("branches").select("*").eq("slug", slug).maybeSingle();
  return data ?? null;
});
