"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product360Frame } from "@/types/database";

/**
 * Drag/swipe-to-rotate 360° viewer. Uses plain `<img>` tags (not
 * `next/image`) deliberately — every frame must be preloaded and held in
 * the DOM so switching the active frame on drag is instant with no
 * per-frame network/layout cost; next/image's lazy-loading works against
 * that here.
 */
export function Product360Viewer({ frames, productName }: { frames: Product360Frame[]; productName: string }) {
  const [loadedCount, setLoadedCount] = useState(0);
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    frames.forEach((frame) => {
      const img = new window.Image();
      img.src = frame.url;
      img.onload = () => {
        if (!cancelled) setLoadedCount((c) => c + 1);
      };
      img.onerror = () => {
        if (!cancelled) setLoadedCount((c) => c + 1);
      };
    });
    return () => {
      cancelled = true;
    };
  }, [frames]);

  const allLoaded = loadedCount >= frames.length;

  function step(direction: 1 | -1) {
    setIndex((i) => (i + direction + frames.length) % frames.length);
  }

  function handlePointerDown(e: React.PointerEvent) {
    draggingRef.current = true;
    setIsDragging(true);
    lastXRef.current = e.clientX;
    velocityRef.current = 0;
    containerRef.current?.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!draggingRef.current) return;
    const dx = e.clientX - lastXRef.current;
    if (Math.abs(dx) < 6) return;
    lastXRef.current = e.clientX;
    velocityRef.current = dx;
    step(dx > 0 ? -1 : 1);
  }

  function handlePointerUp() {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setIsDragging(false);
    let velocity = velocityRef.current;
    let frame = 0;
    function tick() {
      frame += 1;
      velocity *= 0.82;
      if (Math.abs(velocity) > 1.2 && frame < 18) {
        step(velocity > 0 ? -1 : 1);
        requestAnimationFrame(tick);
      }
    }
    if (Math.abs(velocity) > 2) requestAnimationFrame(tick);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  }

  return (
    <div
      ref={containerRef}
      role="group"
      tabIndex={0}
      aria-label={`360 degree view of ${productName} — drag to rotate`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
      className="relative aspect-square w-full touch-none select-none overflow-hidden rounded-3xl border border-ink/8 bg-paper-soft"
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      {!allLoaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-paper-soft">
          <Loader2 className="size-6 animate-spin text-brand" />
          <p className="text-xs text-ink/50">
            Loading {loadedCount}/{frames.length}
          </p>
        </div>
      )}

      {frames.map((frame, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={frame.id}
          src={frame.url}
          alt={i === index ? `${productName}, rotation frame ${i + 1} of ${frames.length}` : ""}
          draggable={false}
          className={cn(
            "absolute inset-0 h-full w-full object-contain",
            i === index ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        />
      ))}

      {allLoaded && (
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-ink/60 px-3 py-1 text-xs text-white backdrop-blur">
          Drag to rotate
        </div>
      )}
    </div>
  );
}
