import { CURATED_GALLERIES } from "@/lib/data/gallery-images";
import type { ProductImage } from "@/types/database";

/** The product page's photos for the selected colour, from the curated set —
 * or null when the product has no curated gallery (it then uses its database
 * images). Lead photos come first, then photos for the chosen colour, then
 * the colour-neutral ones; a colour with no photo of its own falls back to
 * the neutral photos, or to the first photo of each colour. */
export function curatedGalleryImages(slug: string, name: string, colour: string | null): ProductImage[] | null {
  const entries = CURATED_GALLERIES[slug];
  if (!entries) return null;

  const lead = entries.filter((e) => e.lead);
  const rest = entries.filter((e) => !e.lead);
  const matching = colour ? rest.filter((e) => e.colour === colour) : [];
  const neutral = rest.filter((e) => e.colour === null);

  let picked = [...lead, ...matching, ...neutral];
  if (picked.length === 0) {
    const seen = new Set<string | null>();
    picked = rest.filter((e) => (seen.has(e.colour) ? false : (seen.add(e.colour), true)));
  }

  return picked.map((e, i) => ({
    id: `curated-${slug}-${e.url}`,
    product_id: slug,
    variant_id: null,
    colour: e.colour,
    url: e.url,
    alt_text: e.colour ? `${name} in ${e.colour}` : name,
    sort_order: i,
    is_primary: i === 0,
    object_position: null,
    object_fit: "cover",
  }));
}
