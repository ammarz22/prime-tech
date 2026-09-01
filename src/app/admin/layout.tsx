import Link from "next/link";
import { redirect } from "next/navigation";
import { LayoutDashboard, Package, Tag, LayoutGrid, Building2, Inbox, Star, Settings, ExternalLink, Boxes } from "lucide-react";
import { PrimeTechLogo } from "@/components/brand/prime-tech-logo";
import { createClient } from "@/lib/supabase/server";

const LINKS = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Brands", href: "/admin/brands", icon: Tag },
  { label: "Categories", href: "/admin/categories", icon: LayoutGrid },
  { label: "Branches", href: "/admin/branches", icon: Building2 },
  { label: "Enquiries", href: "/admin/enquiries", icon: Inbox },
  { label: "Reviews", href: "/admin/reviews", icon: Star },
  { label: "iPhone 18 Packages", href: "/admin/iphone18-packages", icon: Boxes },
  { label: "Site Settings", href: "/admin/settings", icon: Settings },
];

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

  return (
    <div className="flex min-h-screen bg-paper-soft">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-ink/8 bg-paper p-5 lg:flex">
        <Link href="/">
          <PrimeTechLogo className="h-8" />
        </Link>
        <nav className="mt-8 flex flex-col gap-1">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-ink/65 transition hover:bg-ink/5 hover:text-ink"
            >
              <link.icon className="size-4" />
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/" className="mt-auto flex items-center gap-2 text-sm text-ink/45 hover:text-ink">
          <ExternalLink className="size-3.5" />
          View site
        </Link>
      </aside>
      <main className="flex-1 p-6 sm:p-8">{children}</main>
    </div>
  );
}
