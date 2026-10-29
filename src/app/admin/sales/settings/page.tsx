import type { Metadata } from "next";
import { PageHead } from "@/components/admin/sales/shared";
import { TrackerSettingsForm } from "@/components/admin/sales/tracker-settings-form";
import { getTrackerSettings } from "@/lib/db/sales";

export const metadata: Metadata = { title: "Sales Settings" };

export default async function SalesSettingsPage() {
  const settings = await getTrackerSettings();

  return (
    <div className="space-y-5">
      <PageHead title="Sales Settings" description="Your business details, invoice defaults and dropdown lists." />
      <TrackerSettingsForm settings={settings} />
    </div>
  );
}
