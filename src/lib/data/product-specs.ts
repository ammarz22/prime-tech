import { APPLE_FULL_SPECS, type FullSpecGroup } from "@/lib/data/apple-full-specs";
import { SAMSUNG_FULL_SPECS } from "@/lib/data/samsung-full-specs";

export type { FullSpecGroup };

/** Looks up verified full specifications for a product by slug, across
 * every brand's static spec data. Returns undefined if none exists (e.g. a
 * product not yet researched) — callers should render nothing rather than
 * a fabricated fallback. */
export function getFullSpecs(slug: string): FullSpecGroup[] | undefined {
  return APPLE_FULL_SPECS[slug] ?? SAMSUNG_FULL_SPECS[slug];
}

/** Derives a short highlight list from the same verified spec data — the
 * first row of each spec group, capped — so highlights never introduce a
 * fact that isn't already backed by the full spec sheet. */
export function getHighlights(slug: string, max = 3): string[] {
  const groups = getFullSpecs(slug);
  if (!groups) return [];
  return groups
    .map((group) => group.rows[0])
    .filter((row): row is { label: string; value: string } => Boolean(row))
    .map((row) => `${row.label}: ${row.value}`)
    .slice(0, max);
}
