import Image from "next/image";
import { Play } from "lucide-react";
import type { ProductWithRelations } from "@/types/database";

/**
 * A lifestyle-style panel matching the reference design — but only renders
 * when the product actually has a real description and a real photo to
 * show; there's no per-product marketing copy invented here. "Watch the
 * film" only appears when a real `video_url` exists (opens it in a new
 * tab — this panel doesn't embed a player itself).
 */
export function ProductCampaignPanel({ product }: { product: ProductWithRelations }) {
  if (!product.description) return null;
  const image = product.images.find((img) => img.is_primary) ?? product.images[0];
  if (!image) return null;

  return (
    <div className="overflow-hidden rounded-3xl bg-paper-soft">
      <div className="grid grid-cols-1 items-center gap-8 p-8 sm:p-10 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">Made for more.</h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/60">{product.description}</p>
          {product.video_url && (
            <a
              href={product.video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand/80"
            >
              <span className="flex size-7 items-center justify-center rounded-full bg-brand/10">
                <Play className="size-3 fill-brand text-brand" />
              </span>
              Watch the film
            </a>
          )}
        </div>

        <div className="relative aspect-[4/3] w-full">
          <Image
            src={image.url}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className={image.object_fit === "contain" ? "object-contain" : "object-cover"}
            style={image.object_position ? { objectPosition: image.object_position } : undefined}
          />
        </div>
      </div>
    </div>
  );
}
