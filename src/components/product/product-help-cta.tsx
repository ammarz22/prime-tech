import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink, productEnquiryMessage } from "@/lib/config/site";
import type { ProductWithRelations } from "@/types/database";

/** Closing WhatsApp CTA for a product page — category name comes from the
 * product's own real category, never a fabricated one. */
export function ProductHelpCta({
  product,
  whatsappNumber,
}: {
  product: ProductWithRelations;
  whatsappNumber: string | null;
}) {
  const ctaHref = whatsappLink(productEnquiryMessage(product.name), whatsappNumber) ?? "#";

  return (
    <div className="border-t border-ink/8 py-14">
      <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-10 text-white sm:px-10 sm:py-12">
        <div
          className="pointer-events-none absolute -right-10 top-1/2 size-64 -translate-y-1/2 rounded-full bg-brand/20 blur-[90px]"
          aria-hidden
        />

        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Need help choosing?</h2>
          <p className="mt-2 max-w-sm text-sm text-white/60">
            Talk to our team on WhatsApp. We&apos;ll help you find the right fit for your needs.
          </p>
          <Button
            render={<a href={ctaHref} target="_blank" rel="noopener noreferrer" />}
            size="lg"
            className="mt-5 h-11 gap-2 rounded-full px-6 text-sm"
          >
            <MessageCircle className="size-4" />
            Chat with an Expert
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
