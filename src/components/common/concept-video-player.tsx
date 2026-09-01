"use client";

import { useRef, useState } from "react";
import { Play, Pause, VideoOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Plays a video with a mandatory disclaimer baked in as a required prop —
 * not left to each call site to remember — since every current use of this
 * component is the unofficial iPhone 18 concept trailer, never genuine
 * Prime Tech or Apple footage.
 */
export function ConceptVideoPlayer({
  src,
  poster,
  title,
  disclaimer,
  className,
}: {
  src: string;
  poster?: string;
  title: string;
  disclaimer: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(!reduced);
  const [failed, setFailed] = useState(false);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }

  if (failed) {
    return (
      <div className={cn("flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-2xl bg-white/5 text-white/40", className)}>
        <VideoOff className="size-8" strokeWidth={1.5} />
        <p className="text-sm">{title}</p>
      </div>
    );
  }

  return (
    <div className={cn("group relative overflow-hidden rounded-2xl bg-black", className)}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        aria-label={title}
        muted
        loop
        playsInline
        autoPlay={!reduced}
        onError={() => setFailed(true)}
        className="aspect-video w-full object-cover"
      />

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause video" : "Play video"}
        className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/20"
      >
        <span
          className={cn(
            "flex size-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition",
            playing ? "opacity-0 group-hover:opacity-100" : "opacity-100",
          )}
        >
          {playing ? <Pause className="size-5 text-white" /> : <Play className="ml-0.5 size-5 text-white" />}
        </span>
      </button>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-1.5 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
        <span className="size-1.5 shrink-0 rounded-full bg-amber-400" aria-hidden />
        <p className="text-[11px] font-medium uppercase tracking-wide text-white/70">{disclaimer}</p>
      </div>
    </div>
  );
}
