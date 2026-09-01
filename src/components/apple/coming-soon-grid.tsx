import Image from "next/image";
import { Clock } from "lucide-react";
import type { ProductWithRelations } from "@/types/database";

export function ComingSoonGrid({ products }: { products: ProductWithRelations[] }) {
  if (products.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {products.map((product) => {
        const image = product.images.find((img) => img.is_primary) ?? product.images[0];
        return (
          <div
            key={product.id}
            id={product.slug}
            className="scroll-mt-32 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-ink/12 px-4 py-8 text-center"
          >
            {image ? (
              <div className="relative size-16">
                <Image src={image.url} alt={image.alt_text ?? product.name} fill sizes="64px" className="object-contain" />
              </div>
            ) : (
              <div className="flex size-10 items-center justify-center rounded-full bg-ink/5">
                <Clock className="size-4 text-ink/40" strokeWidth={1.5} />
              </div>
            )}
            <div>
              <p className="font-medium text-ink">{product.name}</p>
              <p className="mt-1 text-xs text-ink/45">Coming Soon</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
