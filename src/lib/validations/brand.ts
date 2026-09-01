import { z } from "zod";

export const brandSchema = z.object({
  name: z.string().trim().min(2).max(80),
  slug: z.string().trim().min(2).regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers and hyphens only"),
  logoUrl: z.string().url("Enter a valid URL").optional().or(z.literal("")),
});

export type BrandInput = z.infer<typeof brandSchema>;
