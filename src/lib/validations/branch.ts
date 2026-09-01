import { z } from "zod";

export const branchSchema = z.object({
  name: z.string().trim().min(2).max(200),
  slug: z.string().trim().min(2).regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers and hyphens only"),
  address: z.string().max(300).optional().or(z.literal("")),
  city: z.string().max(100).optional().or(z.literal("")),
  phone: z.string().max(30).optional().or(z.literal("")),
  whatsapp: z.string().max(30).optional().or(z.literal("")),
  mapsUrl: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  status: z.enum(["active", "coming_soon"]),
});

export type BranchInput = z.infer<typeof branchSchema>;
