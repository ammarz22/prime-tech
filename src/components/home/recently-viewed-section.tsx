"use client";

import { useEffect, useState } from "react";
import { SectionHeading } from "@/components/common/section-heading";
import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/motion/animated-section";
import { ProductCard } from "@/components/product/product-card";
import { useLocalIds } from "@/hooks/use-local-ids";
import { getProductsByIds } from "@/lib/actions/products-by-ids";
import type { ProductWithRelations } from "@/types/database";

/** Renders nothing until this device has actually viewed something — no
 * empty-state placeholder needed on the homepage. Sits last on the page now,
 * directly after Help Me Choose (`bg-paper-soft`) — uses `bg-paper` here so
 * the two don't collide as identically-toned adjacent sections. */
export function RecentlyViewedSection() {
  const { ids } = useLocalIds("primetech:recently-viewed", { max: 12 });
  const [products, setProducts] = useState<ProductWithRelations[]>([]);

  useEffect(() => {
    let cancelled = false;
    if (ids.length === 0) {
      // The last recently-viewed item was removed — clear the stale list.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProducts([]);
      return;
    }
    getProductsByIds(ids).then((data) => {
      if (!cancelled) setProducts(data);
    });
    return () => {
      cancelled = true;
    };
  }, [ids]);

  if (products.length === 0) return null;

  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading eyebrow="Recently Viewed" title="Pick up where you left off." />
        </AnimatedSection>
        <StaggerGroup className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
