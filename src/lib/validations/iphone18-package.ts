import { z } from "zod";

export const packageAvailabilityOptions = ["available", "out_of_stock", "coming_soon"] as const;

export const iphone18PackageSchema = z.object({
  name: z.string().trim().min(2).max(80),
  tier: z.string().trim().max(40).optional().or(z.literal("")),
  description: z.string().trim().max(500).optional().or(z.literal("")),
  // Comma or newline separated — split into `included_items text[]` on write.
  includedItems: z.string().trim().max(1000).optional().or(z.literal("")),
  price: z.number().nonnegative().optional(),
  benefit: z.string().trim().max(120).optional().or(z.literal("")),
  availability: z.enum(packageAvailabilityOptions),
  isFeatured: z.boolean(),
  sortOrder: z.number().int().nonnegative(),
});

export type Iphone18PackageInput = z.infer<typeof iphone18PackageSchema>;
