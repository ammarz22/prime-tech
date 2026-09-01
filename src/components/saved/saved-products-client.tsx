"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useLocalIds } from "@/hooks/use-local-ids";
import { getProductsByIds } from "@/lib/actions/products-by-ids";
import { ProductGrid } from "@/components/product/product-grid";
import type { ProductWithRelations } from "@/types/database";

export function SavedProductsClient() {
  const { ids } = useLocalIds("primetech:saved");
  const [products, setProducts] = useState<ProductWithRelations[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getProductsByIds(ids).then((data) => {
      if (!cancelled) {
        setProducts(data);
        setLoaded(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [ids]);

  return (
    <div className="pt-28">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Heart className="size-5 text-brand" />
          <h1 className="text-2xl font-semibold tracking-tight">Saved Products</h1>
        </div>
        <p className="mt-1 text-sm text-ink/55">Products you&apos;ve bookmarked for later, saved on this device.</p>

        <div className="mt-8">
          {loaded && (
            <ProductGrid
              products={products}
              emptyTitle="You haven't saved any products yet."
              emptyDescription="Tap the heart icon on any product to save it here."
            />
          )}
        </div>
      </div>
    </div>
  );
}
