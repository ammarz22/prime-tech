import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const TILES = [
  {
    label: "Mac",
    href: "/products/apple/mac",
    title: "Built to go beyond.",
    cta: "Explore Mac",
    background: "/apple-page/mac-background.png",
    device: "/apple-page/mac-device-cutout.png",
    imageClassName: "w-[54%]",
  },
  {
    label: "iPad",
    href: "/products/apple/ipad",
    title: "More possibility.",
    cta: "Explore iPad",
    background: "/apple-page/ipad-background.png",
    device: "/apple-page/ipad-device-cutout.png",
    imageClassName: "w-[40%]",
  },
  {
    label: "Apple Watch",
    href: "/products/apple/apple-watch",
    title: "A healthier you. A brighter tomorrow.",
    cta: "Explore Watch",
    background: "/apple-page/watch-background.png",
    device: "/apple-page/watch-device-cutout.png",
    imageClassName: "w-[26%]",
  },
  {
    label: "AirPods",
    href: "/products/apple/airpods",
    title: "Sound that moves you.",
    cta: "Explore AirPods",
    background: "/apple-page/airpods-background.png",
    device: "/apple-page/airpods-device-cutout.png",
    imageClassName: "w-[32%]",
  },
] as const;

/** Four dark promo tiles from the reference design, each built on the
 * client-supplied background + device photography for this page
 * (Images/Apple Page), linking to that category's real catalogue page. */
export function AppleEcosystemGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-10 xl:px-16">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {TILES.map((tile) => (
          <Link
            key={tile.label}
            href={tile.href}
            className="group relative flex min-h-[220px] items-center overflow-hidden rounded-3xl bg-ink p-7 text-white sm:min-h-[260px] sm:p-10"
          >
            <Image
              src={tile.background}
              alt=""
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-transparent" />

            <div className="relative z-10 max-w-[46%]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{tile.label}</p>
              <h3 className="mt-2 text-xl font-bold leading-tight tracking-tight sm:text-2xl">{tile.title}</h3>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition group-hover:text-white">
                {tile.cta}
                <ArrowRight className="size-3.5 transition group-hover:translate-x-1" />
              </span>
            </div>

            <div
              className={`pointer-events-none absolute right-4 z-0 aspect-square ${tile.imageClassName}`}
              aria-hidden
            >
              <Image
                src={tile.device}
                alt=""
                fill
                sizes="280px"
                className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
