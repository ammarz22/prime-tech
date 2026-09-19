import { CARD_IMAGES } from "@/lib/data/card-images";

/** The image a product card should show: the product's tightly-cropped card
 * photo when one exists, otherwise the original primary image. */
export function cardImageUrl(slug: string, fallbackUrl?: string | null): string | null {
  return CARD_IMAGES[slug] ?? fallbackUrl ?? null;
}
