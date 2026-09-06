import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { siteConfig } from "@/lib/config/site";

export type CampaignStage = "announcement" | "preorder_open" | "available";

const VALID_STAGES: CampaignStage[] = ["announcement", "preorder_open", "available"];

export interface EffectiveContact {
  phone: string | null;
  email: string | null;
  whatsappNumber: string | null;
  address: string | null;
  instagram: string | null;
  facebook: string | null;
  tiktok: string | null;
  linkedin: string | null;
}

/**
 * Resolves business contact details: env vars are the baseline, and any
 * non-empty row in `site_settings` (editable from the admin dashboard)
 * overrides it. Falls back cleanly to env-only when Supabase isn't
 * configured yet, so the site works before a backend is connected.
 *
 * Wrapped in `cache()` — the footer and the floating WhatsApp button both
 * call this on every single page, so without per-request memoization a
 * single page load fires this same query 2-4 times.
 */
export const getEffectiveContact = cache(async function getEffectiveContact(): Promise<EffectiveContact> {
  const base: EffectiveContact = {
    phone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    whatsappNumber: siteConfig.contact.whatsappNumber,
    address: siteConfig.contact.address,
    instagram: siteConfig.social.instagram,
    facebook: siteConfig.social.facebook,
    tiktok: siteConfig.social.tiktok,
    linkedin: siteConfig.social.linkedin,
  };

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return base;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("site_settings").select("key, value");
    if (error || !data) return base;

    const map = new Map(data.map((row) => [row.key, row.value]));
    return {
      phone: map.get("phone") || base.phone,
      email: map.get("email") || base.email,
      whatsappNumber: map.get("whatsapp_number") || base.whatsappNumber,
      address: map.get("address") || base.address,
      instagram: map.get("instagram_url") || base.instagram,
      facebook: map.get("facebook_url") || base.facebook,
      tiktok: map.get("tiktok_url") || base.tiktok,
      linkedin: map.get("linkedin_url") || base.linkedin,
    };
  } catch {
    return base;
  }
});

/**
 * Reads the iPhone 18 campaign stage from `site_settings` (key
 * `iphone18_campaign_stage`). Defaults to `"announcement"` — the safe,
 * least-revealing state — whenever unset or Supabase isn't configured.
 */
export const getCampaignStage = cache(async function getCampaignStage(): Promise<CampaignStage> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return "announcement";

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "iphone18_campaign_stage")
      .maybeSingle();
    if (error || !data?.value) return "announcement";
    return VALID_STAGES.includes(data.value as CampaignStage) ? (data.value as CampaignStage) : "announcement";
  } catch {
    return "announcement";
  }
});
