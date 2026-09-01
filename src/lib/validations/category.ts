import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().trim().min(2).max(80),
  slug: z.string().trim().min(2).regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers and hyphens only"),
  sortOrder: z.number().int().min(0).max(999),
});

export type CategoryInput = z.infer<typeof categorySchema>;
