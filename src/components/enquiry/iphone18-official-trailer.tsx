import { AnimatedSection } from "@/components/motion/animated-section";
import { OfficialVideoPlayer } from "@/components/common/official-video-player";

/** Apple's own official iPhone 18 Pro launch video, published after Apple's
 * September 9, 2026 announcement — genuine footage, not a fan-made concept. */
export function Iphone18OfficialTrailer() {
  return (
    <div className="border-t border-ink/8 bg-ink py-16 text-white">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <AnimatedSection>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-cyan">Official Apple Video</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">iPhone 18 Pro</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/55">
            The ultimate performance and camera of any iPhone, with exceptional battery life.
          </p>

          <div className="mx-auto mt-8">
            <OfficialVideoPlayer src="/videos/iphone-18-pro-official-trailer.mp4" title="iPhone 18 Pro — Official Apple Video" />
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
