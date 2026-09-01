import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(120),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  productId: z.string().uuid().optional(),
  productName: z.string().optional(),
  variantId: z.string().uuid().optional(),
  configuration: z.string().optional(),
  preferredBranchId: z.string().uuid().optional(),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  // Pre-order-specific fields (e.g. iPhone 18 register-interest) — unused
  // by the standard product enquiry form.
  preferredModel: z.string().optional(),
  preferredStorage: z.string().optional(),
  preferredColour: z.string().optional(),
  consent: z.boolean().optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
