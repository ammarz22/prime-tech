import Link from "next/link";
import { cn } from "@/lib/utils";
import { rs } from "@/lib/utils/sales-format";

/** Tailwind sizes shared by every sales form control: 44px tall on phones. */
export const CONTROL = "h-11 sm:h-9";
export const SELECT_TRIGGER = "w-full data-[size=default]:h-11 sm:data-[size=default]:h-9";
export const BTN = "h-11 sm:h-9";

export function PageHead({
  title,
  description,
  actions,
}: {
  title: string;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div className="min-w-0">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description && <p className="mt-1 text-sm text-ink/55">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

/** Labelled form field with an inline error under the control. */
export function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  className,
  children,
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={htmlFor} className="block text-[13px] font-semibold text-ink/80">
        {label}
        {required && <span className="ml-0.5 text-brand">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-ink/40">{hint}</p>}
      {error && (
        <p role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink/45">{title}</h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{children}</div>
    </section>
  );
}

/** Red when negative, green when positive. */
export function Profit({ value, className, signed }: { value: number; className?: string; signed?: boolean }) {
  return (
    <span className={cn("font-semibold tabular-nums", value < 0 ? "text-red-600" : "text-green-700", className)}>
      {signed && value > 0 ? "+" : ""}
      {rs(value)}
    </span>
  );
}

export function SummaryStrip({ items }: { items: { label: string; value: React.ReactNode }[] }) {
  return (
    <div className="flex flex-wrap gap-x-8 gap-y-3 rounded-2xl border border-ink/8 bg-paper px-4 py-3">
      {items.map((item) => (
        <div key={item.label} className="min-w-20">
          <p className="text-xs text-ink/50">{item.label}</p>
          <p className="mt-0.5 text-base font-semibold tabular-nums">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

/** "Show more" for lists capped at one page of rows. */
export function ShowMore({ href }: { href: string }) {
  return (
    <div className="flex justify-center pt-4">
      <Link
        href={href}
        scroll={false}
        className="inline-flex h-11 items-center rounded-lg border border-ink/12 bg-paper px-5 text-sm font-medium hover:bg-ink/5 sm:h-9"
      >
        Show more
      </Link>
    </div>
  );
}

/** Builds `/path?q=..&limit=..` while dropping empty values. */
export function listHref(path: string, params: Record<string, string | number | undefined>) {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== "") qs.set(k, String(v));
  const s = qs.toString();
  return s ? `${path}?${s}` : path;
}
