import type { CatalogueCategory } from "@/lib/config/catalogue-types";

/** Finds the catalogue tab whose `categorySlugs` covers a given real DB
 * category slug — e.g. a product filed under "iphone-18" still belongs on
 * the "iphone" tab. Falls back to the first category so a caller always
 * gets something valid rather than needing to handle `undefined`. */
export function findCategoryForSlug(
  categories: CatalogueCategory[],
  categorySlug: string | null | undefined,
): CatalogueCategory {
  return categories.find((c) => categorySlug != null && c.categorySlugs.includes(categorySlug)) ?? categories[0];
}
