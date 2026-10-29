import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { createClient } from "@/lib/supabase/server";

// The sidebar `LINKS` (including the "Sales" group) live in
// `components/admin/admin-shell.tsx` — the nav needs client state for the
// phone menu, and icon components can't cross the server/client boundary.
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) redirect("/login");

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) redirect("/login");

  const { data: adminRow } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", userData.user.id)
    .maybeSingle();

  if (!adminRow) redirect("/");

  return <AdminShell>{children}</AdminShell>;
}
