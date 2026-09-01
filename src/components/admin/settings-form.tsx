"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateSiteSettingsAction } from "@/lib/actions/admin-settings";

const FIELDS: { key: string; label: string; placeholder: string }[] = [
  { key: "phone", label: "Phone", placeholder: "+94 XX XXX XXXX" },
  { key: "email", label: "Email", placeholder: "hello@primetech.lk" },
  { key: "whatsapp_number", label: "WhatsApp Number", placeholder: "+94 XX XXX XXXX" },
  { key: "address", label: "Address", placeholder: "Colombo, Sri Lanka" },
  { key: "instagram_url", label: "Instagram URL", placeholder: "https://instagram.com/primetech" },
  { key: "facebook_url", label: "Facebook URL", placeholder: "https://facebook.com/primetech" },
  { key: "tiktok_url", label: "TikTok URL", placeholder: "https://tiktok.com/@primetech" },
  { key: "linkedin_url", label: "LinkedIn URL", placeholder: "https://linkedin.com/company/primetech" },
];

const CAMPAIGN_STAGE_OPTIONS = [
  { value: "announcement", label: "Announcement — hero & register interest only" },
  { value: "preorder_open", label: "Pre-Order Open — lineup, packages & reservations" },
  { value: "available", label: "Available — full catalogue live" },
];

export function SettingsForm({ initialValues }: { initialValues: Record<string, string> }) {
  const [saved, setSaved] = useState(false);
  const { register, handleSubmit, setValue, watch, formState: { isSubmitting } } = useForm<Record<string, string>>({
    defaultValues: { iphone18_campaign_stage: "announcement", ...initialValues },
  });

  async function onSubmit(data: Record<string, string>) {
    setSaved(false);
    await updateSiteSettingsAction(data);
    setSaved(true);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="iphone18_campaign_stage">iPhone 18 Campaign Stage</Label>
        <Select
          value={watch("iphone18_campaign_stage")}
          onValueChange={(value) => setValue("iphone18_campaign_stage", value as string)}
        >
          <SelectTrigger id="iphone18_campaign_stage" className="w-full">
            <SelectValue>
              {(value: string) => CAMPAIGN_STAGE_OPTIONS.find((o) => o.value === value)?.label ?? value}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {CAMPAIGN_STAGE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {FIELDS.map((field) => (
        <div key={field.key} className="space-y-1.5">
          <Label htmlFor={field.key}>{field.label}</Label>
          <Input id={field.key} placeholder={field.placeholder} {...register(field.key)} />
        </div>
      ))}

      <Button type="submit" disabled={isSubmitting} className="gap-2">
        {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : saved ? <Check className="size-4" /> : null}
        Save Settings
      </Button>
    </form>
  );
}
