import type { ReactNode } from "react";
import { AnimatedSection } from "@/components/motion/animated-section";
import { cn } from "@/lib/utils";

interface ProductStoryProps {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  tone?: "light" | "dark";
  children?: ReactNode;
}

export function ProductStory({ id, eyebrow, title, description, highlights, tone = "light", children }: ProductStoryProps) {
  return (
    <div id={id} className={cn("scroll-mt-32 py-16 sm:py-20", tone === "dark" && "text-white")}>
      <AnimatedSection className="max-w-2xl">
        <p className={cn("text-xs font-semibold uppercase tracking-[0.2em]", tone === "dark" ? "text-brand-cyan" : "text-brand")}>
          {eyebrow}
        </p>
        <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h2>
        <p className={cn("mt-5 text-balance text-lg", tone === "dark" ? "text-white/60" : "text-ink/60")}>
          {description}
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {highlights.map((highlight) => (
            <li key={highlight} className="flex items-center gap-2 text-sm">
              <span className="size-1 shrink-0 rounded-full bg-current opacity-40" />
              <span className={tone === "dark" ? "text-white/75" : "text-ink/70"}>{highlight}</span>
            </li>
          ))}
        </ul>
      </AnimatedSection>
      <div className="mt-10">{children}</div>
    </div>
  );
}
