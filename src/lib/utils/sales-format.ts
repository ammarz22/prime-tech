/**
 * Money / date formatting for the sales tracker. Tracker screens show
 * `Rs 383,000` (whole rupees); invoices show `LKR 383,000.00` (en-LK).
 */

export function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

/** `Rs 383,000` — negative values read `-Rs 5,000`. */
export function rs(n: number | null | undefined): string {
  const value = Number(n ?? 0);
  const rounded = Math.round(value);
  return (rounded < 0 ? "-" : "") + "Rs " + Math.abs(rounded).toLocaleString("en-LK");
}

/** `LKR 383,000.00` */
export function lkr(n: number | null | undefined): string {
  return (
    "LKR " +
    Number(n ?? 0).toLocaleString("en-LK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  );
}

/** `2026-10-29` → `29/10/2026` (invoice style). */
export function dmy(value: string | null | undefined): string {
  if (!value) return "—";
  const [y, m, d] = value.slice(0, 10).split("-");
  return `${d}/${m}/${y}`;
}

/** `2026-10-29` → `29 Oct 2026` (list style). Pure string maths, so no timezone drift. */
export function niceDate(value: string | null | undefined): string {
  if (!value) return "";
  const [y, m, d] = value.slice(0, 10).split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${d} ${months[Number(m) - 1] ?? m} ${y}`;
}

/** Today as `YYYY-MM-DD` in the viewer's own timezone (used for form defaults). */
export function todayISO(): string {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

/** Today as `YYYY-MM-DD` in Sri Lanka time, for server-side period maths. */
export function colomboToday(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Colombo" }).format(new Date());
}

export const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
