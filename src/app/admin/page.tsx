import Link from "next/link";
import {
  Package,
  Building2,
  Inbox,
  Users,
  Plus,
  ListTree,
  ImageIcon,
  RotateCw,
  Star,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

const QUICK_ACTIONS = [
  { label: "Add Product", href: "/admin/products/new", icon: Plus },
  { label: "Manage Variants", href: "/admin/products", icon: ListTree },
  { label: "Upload Images", href: "/admin/products", icon: ImageIcon },
  { label: "Upload 360° Frames", href: "/admin/products", icon: RotateCw },
  { label: "View Enquiries", href: "/admin/enquiries", icon: Inbox },
  { label: "View Pre-Orders", href: "/admin/enquiries?filter=preorder", icon: Bell },
  { label: "Moderate Reviews", href: "/admin/reviews", icon: Star },
];

export default async function AdminOverviewPage() {
  const supabase = await createClient();

  const [{ count: productCount }, { count: branchCount }, { count: newEnquiryCount }, { count: userCount }] =
    await Promise.all([
      supabase.from("products").select("id", { count: "exact", head: true }),
      supabase.from("branches").select("id", { count: "exact", head: true }),
      supabase.from("enquiries").select("id", { count: "exact", head: true }).eq("status", "new"),
      supabase.from("profiles").select("id", { count: "exact", head: true }),
    ]);

  const stats = [
    { label: "Products", value: productCount ?? 0, icon: Package, href: "/admin/products" },
    { label: "Branches", value: branchCount ?? 0, icon: Building2, href: "/admin/branches" },
    { label: "New Enquiries", value: newEnquiryCount ?? 0, icon: Inbox, href: "/admin/enquiries" },
    { label: "Registered Users", value: userCount ?? 0, icon: Users, href: null },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
      <p className="mt-1 text-sm text-ink/55">A snapshot of Prime Tech&apos;s catalogue and activity.</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const content = (
            <div className="rounded-2xl border border-ink/8 bg-paper p-5">
              <div className="flex items-center justify-between">
                <stat.icon className="size-5 text-brand" strokeWidth={1.5} />
              </div>
              <p className="mt-4 text-3xl font-semibold tabular-nums">{stat.value}</p>
              <p className="mt-1 text-sm text-ink/50">{stat.label}</p>
            </div>
          );
          return stat.href ? (
            <Link key={stat.label} href={stat.href} className="transition hover:opacity-80">
              {content}
            </Link>
          ) : (
            <div key={stat.label}>{content}</div>
          );
        })}
      </div>

      <div className="mt-10">
        <p className="text-sm font-medium text-ink/70">Quick Actions</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {QUICK_ACTIONS.map((action) => (
            <Button key={action.label} variant="outline" size="sm" className="gap-1.5" render={<Link href={action.href} />}>
              <action.icon className="size-3.5" />
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
