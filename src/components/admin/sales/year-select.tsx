"use client";

import { useRouter } from "next/navigation";

/** Year picker for the profit-by-month chart. Keeps the chosen period in the URL. */
export function YearSelect({ years, value, period }: { years: number[]; value: number; period: string }) {
  const router = useRouter();
  const options = years.includes(value) ? years : [value, ...years];

  return (
    <select
      aria-label="Year"
      value={value}
      onChange={(e) => router.push(`/admin/sales?period=${period}&year=${e.target.value}`, { scroll: false })}
      className="h-11 rounded-lg border border-input bg-paper px-3 text-sm font-medium sm:h-8"
    >
      {options.map((y) => (
        <option key={y} value={y}>
          {y}
        </option>
      ))}
    </select>
  );
}
