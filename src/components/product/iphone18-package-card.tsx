import Image from "next/image";
import { Check } from "lucide-react";
import { ImagePending } from "@/components/product/image-pending";
import { formatLKR } from "@/components/product/product-price";
import { WhatsAppButton } from "@/components/common/whatsapp-button";
import { packageEnquiryMessage } from "@/lib/config/site";
import { cn } from "@/lib/utils";
import type { Package } from "@/types/database";

export function Iphone18PackageCard({
  pkg,
  whatsappNumber,
}: {
  pkg: Package;
  whatsappNumber: string | null;
}) {
  const soldOut = pkg.availability === "out_of_stock";

  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-3xl border bg-paper transition",
        pkg.is_featured ? "border-brand/40 shadow-[0_24px_60px_-32px_rgba(46,125,255,0.35)]" : "border-ink/8",
      )}
    >
      <div className="relative">
        {pkg.image_url ? (
          <div className="relative aspect-video w-full overflow-hidden bg-paper-soft">
            <Image src={pkg.image_url} alt={pkg.name} fill className="object-cover" />
          </div>
        ) : (
          <ImagePending className="aspect-video rounded-none border-0" label="Image Coming Soon" />
        )}
        {pkg.is_featured && (
          <span className="absolute left-3 top-3 rounded-full bg-brand px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
            Most Popular
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          {pkg.tier && <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand">{pkg.tier}</p>}
          <h3 className="mt-1 text-xl font-semibold tracking-tight">{pkg.name}</h3>
          {pkg.description && <p className="mt-1.5 text-sm text-ink/55">{pkg.description}</p>}
        </div>

        {pkg.included_items.length > 0 && (
          <ul className="space-y-2">
            {pkg.included_items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-ink/70">
                <Check className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={2} />
                {item}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto space-y-3 pt-2">
          {pkg.benefit && <p className="text-sm font-medium text-brand">{pkg.benefit}</p>}
          <p className="text-2xl font-semibold tabular-nums">
            {pkg.price != null ? formatLKR(pkg.price) : "Price on Request"}
          </p>
          <WhatsAppButton
            number={whatsappNumber}
            message={packageEnquiryMessage(pkg.name)}
            label={soldOut ? "Currently Unavailable" : "Enquire About This Package"}
            variant={pkg.is_featured ? "default" : "outline"}
            disabled={soldOut}
            className="w-full rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
