"use client";

import { useRef, useState } from "react";
import { Play, Pause, VideoOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/** Plays genuine, officially-sourced video (e.g. a manufacturer's own
 * published launch video) — no disclaimer badge, since there's nothing to
 * disclaim. Use `ConceptVideoPlayer` instead for anything fan-made or
 * unofficial. */
export function OfficialVideoPlayer({
  src,
  poster,
  title,
  className,
}: {
  src: string;
  poster?: string;
  title: string;
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
    </div>
  );
}
