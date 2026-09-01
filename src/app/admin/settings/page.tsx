import { SettingsForm } from "@/components/admin/settings-form";
import { createClient } from "@/lib/supabase/server";

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("key, value");
  const initialValues = Object.fromEntries((data ?? []).map((row) => [row.key, row.value ?? ""]));

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Site Settings</h1>
      <p className="mt-1 text-sm text-ink/55">
        These values power contact details and links across the public site.
      </p>
      <div className="mt-8">
        <SettingsForm initialValues={initialValues} />
      </div>
    </div>
  );
}
