import { AnimatedSection } from "@/components/motion/animated-section";
import { ConceptVideoPlayer } from "@/components/common/concept-video-player";

/** A single honest "reveal moment" using a fan-made concept trailer — not a
 * multi-stage reveal system, since there's no real lineup content yet to
 * justify one. Clearly labelled as unofficial in both copy and the player's
 * own badge, never presented as genuine Prime Tech or Apple footage. */
export function Iphone18ConceptTrailer() {
  return (
    <div className="border-t border-ink/8 bg-ink py-16 text-white">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <AnimatedSection>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-cyan">Concept Trailer — Not Official</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">A Look at What Might Be Coming</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/55">
            A fan-made concept trailer, not genuine Apple or Prime Tech footage. Nothing shown here is confirmed.
          </p>

          <div className="mx-auto mt-8">
            <ConceptVideoPlayer
              src="/videos/iphone-18-pro-max-trailer.mp4"
              title="iPhone 18 Pro Max — Unofficial Concept Trailer"
              disclaimer="Unofficial concept — not affiliated with Apple"
            />
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
