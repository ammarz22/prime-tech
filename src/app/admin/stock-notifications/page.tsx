import { BellRing } from "lucide-react";
import { EmptyState } from "@/components/common/empty-state";
import { StockNotificationRow } from "@/components/admin/stock-notification-row";
import { createClient } from "@/lib/supabase/server";

export default async function AdminStockNotificationsPage() {
  const supabase = await createClient();
  const { data: notifications } = await supabase
    .from("stock_notifications")
    .select("id, email, notified, created_at, product:products(name), variant:product_variants(storage, colour)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Stock Notifications</h1>
      <p className="mt-1 text-sm text-ink/55">
        Customers who asked to be notified when an out-of-stock item is back. Tick "Notified" once you've reached out.
      </p>

      <div className="mt-8">
        {!notifications || notifications.length === 0 ? (
          <EmptyState
            icon={BellRing}
            title="No stock notification requests yet."
            description="Requests submitted from out-of-stock product pages will appear here."
          />
        ) : (
          <div className="divide-y divide-ink/6 rounded-2xl border border-ink/8 bg-paper">
            {notifications.map((n) => {
              const product = n.product as unknown as { name: string } | null;
              const variant = n.variant as unknown as { storage: string | null; colour: string | null } | null;
              const variantLabel = variant ? [variant.storage, variant.colour].filter(Boolean).join(" · ") || null : null;
              return (
                <StockNotificationRow
                  key={n.id}
                  id={n.id}
                  email={n.email}
                  productName={product?.name ?? "Unknown product"}
                  variantLabel={variantLabel}
                  notified={n.notified}
                  createdAt={n.created_at}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
