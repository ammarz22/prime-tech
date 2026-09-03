import { z } from "zod";

export const variantSchema = z.object({
  name: z.string().trim().min(1, "Enter a variant name").max(120),
  sku: z.string().trim().max(60).optional().or(z.literal("")),
  storage: z.string().trim().max(40).optional().or(z.literal("")),
  memory: z.string().trim().max(40).optional().or(z.literal("")),
  colour: z.string().trim().max(120).optional().or(z.literal("")),
  screenSize: z.string().trim().max(40).optional().or(z.literal("")),
  chip: z.string().trim().max(60).optional().or(z.literal("")),
  simType: z.string().trim().max(60).optional().or(z.literal("")),
  price: z
    .string()
    .optional()
    .refine((v) => !v || (!Number.isNaN(Number(v)) && Number(v) >= 0), "Enter a valid price"),
  availability: z.enum(["in_stock", "out_of_stock", "available_on_request", "coming_soon"]),
});

export type VariantInput = z.infer<typeof variantSchema>;
