import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-xs font-semibold uppercase tracking-[0.2em]",
            tone === "dark" ? "text-brand-cyan" : "text-brand",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-balance text-base sm:text-lg",
            tone === "dark" ? "text-white/70" : "text-ink/65",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
