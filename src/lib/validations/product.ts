import { z } from "zod";

export const productSchema = z.object({
  name: z.string().trim().min(2, "Enter a product name").max(200),
  slug: z
    .string()
    .trim()
    .min(2, "Enter a slug")
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers and hyphens only"),
  brandId: z.string().uuid().optional().or(z.literal("")),
  categoryId: z.string().uuid().optional().or(z.literal("")),
  productGroup: z.enum(["APPLE", "OTHER"]),
  shortDescription: z.string().max(300).optional().or(z.literal("")),
  description: z.string().max(4000).optional().or(z.literal("")),
  status: z.enum(["draft", "published"]),
  featured: z.boolean(),
  newArrival: z.boolean(),
  basePrice: z
    .string()
    .optional()
    .refine((v) => !v || (!Number.isNaN(Number(v)) && Number(v) >= 0), "Enter a valid price"),
  priceLabel: z.enum(["exact", "starting_from", "approx_market", "on_request", "coming_soon"]),
});

export type ProductInput = z.infer<typeof productSchema>;
