import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/motion/animated-section";

/** No real Prime Tech storefront photo exists in the project yet, so this
 * deliberately doesn't claim to show one — real product/lifestyle imagery
 * paired with honest copy about the service experience instead of a
 * fabricated interior shot. Links to `/branches` (real, DB-driven). */
export function StoreExperience() {
  return (
    <section className="bg-paper-soft py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <AnimatedSection className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-ink">
          <Image
            src="/products/mac-mini/angles/lifestyle.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
          />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Prime Tech</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            More than a store.
            <br />A technology experience.
          </h2>
          <p className="mt-4 max-w-md text-ink/60">
            Prime Tech is a Colombo-based technology retailer dedicated to bringing you the latest Apple, Samsung and
            premium devices — with real guidance from real people, not just a checkout page.
          </p>
          <Button render={<Link href="/branches" />} size="lg" className="mt-7 h-12 gap-2 rounded-full px-7 text-base">
            Visit Us
            <ArrowRight className="size-4" />
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
