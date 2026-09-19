import type { LucideIcon } from "lucide-react";

export interface CatalogueCategory {
  /** URL segment for this tab — unique within its brand's catalogue. */
  slug: string;
  /** Real DB category slugs to fetch for this tab (`getProducts({
   * categorySlug })`, one call per entry, merged). Almost always one
   * entry; a tab spanning more than one real category — iPhone 18 living
   * separately from the general `iphone` category, or "Galaxy Phones"
   * covering both the `galaxy-s25` and `galaxy-s26` generations — just
   * lists more than one slug here. Nothing is moved or duplicated in the
   * database, this only widens the query. */
  categorySlugs: string[];
  label: string;
  icon: LucideIcon;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroBackground: string;
  /** Device photo placed on the right of the hero, over the background.
   * Omitted for categories with no matching device art. */
  heroDevice?: string;
  /** "float" keeps the whole device in view; "bleed" anchors it to the
   * bottom edge so a tightly-cropped device runs off the hero. */
  heroDeviceFit?: "float" | "bleed";
  heroSideWords: string[];
}
