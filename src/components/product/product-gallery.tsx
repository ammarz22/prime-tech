"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, X, RotateCw } from "lucide-react";
import { ImagePending } from "@/components/product/image-pending";
import { Product360Viewer } from "@/components/product/product-360-viewer";
import { cn } from "@/lib/utils";
import type { ProductImage, Product360Frame } from "@/types/database";

export function ProductGallery({
  images,
  productName,
  frames360,
}: {
  images: ProductImage[];
  productName: string;
  frames360?: Product360Frame[] | null;
}) {
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [viewing360, setViewing360] = useState(false);
  const has360 = Boolean(frames360 && frames360.length > 0);

  if (viewing360 && frames360) {
    return (
      <div>
        <Product360Viewer frames={frames360} productName={productName} />
        <button
          type="button"
          onClick={() => setViewing360(false)}
          className="mt-3 text-sm font-medium text-brand hover:underline"
        >
          ← Back to photos
        </button>
      </div>
    );
  }

  if (images.length === 0) {
    return <ImagePending className="rounded-3xl" />;
  }

  const active = images[index];

  function next() {
    setIndex((i) => (i + 1) % images.length);
  }
  function prev() {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  }

  return (
    <div>
      <div
        className="group relative aspect-square w-full overflow-hidden rounded-3xl border border-ink/8 bg-paper-soft"
        tabIndex={0}
        role="group"
        aria-label={`${productName} image ${index + 1} of ${images.length}`}
        onKeyDown={handleKeyDown}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-full w-full"
          >
            <Image
              src={active.url}
              alt={active.alt_text ?? productName}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              style={active.object_position ? { objectPosition: active.object_position } : undefined}
              priority={index === 0}
            />
          </motion.div>
        </AnimatePresence>

        {has360 && (
          <button
            type="button"
            onClick={() => setViewing360(true)}
            className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-ink/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur transition hover:bg-ink/75"
          >
            <RotateCw className="size-3.5" />
            360° View
          </button>
        )}

        <button
          type="button"
          onClick={() => setFullscreen(true)}
          className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-ink/60 text-white opacity-0 backdrop-blur transition group-hover:opacity-100"
          aria-label="View fullscreen"
        >
          <Expand className="size-4" />
        </button>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink/50 text-white opacity-0 backdrop-blur transition group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink/50 text-white opacity-0 backdrop-blur transition group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="size-4" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "relative size-16 shrink-0 overflow-hidden rounded-xl border-2 transition",
                i === index ? "border-brand" : "border-transparent opacity-60 hover:opacity-100",
              )}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={img.url}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
                style={img.object_position ? { objectPosition: img.object_position } : undefined}
              />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
            onClick={() => setFullscreen(false)}
          >
            <button
              type="button"
              onClick={() => setFullscreen(false)}
              className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-full bg-white/10 text-white"
              aria-label="Close fullscreen"
            >
              <X className="size-5" />
            </button>
            <div className="relative h-full max-h-[85vh] w-full max-w-3xl">
              <Image src={active.url} alt={active.alt_text ?? productName} fill sizes="90vw" className="object-contain" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
