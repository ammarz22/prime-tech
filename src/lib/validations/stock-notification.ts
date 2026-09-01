import { z } from "zod";

export const stockNotificationSchema = z.object({
  productId: z.string().uuid(),
  variantId: z.string().uuid().optional(),
  email: z.string().trim().email("Enter a valid email address"),
});

export type StockNotificationInput = z.infer<typeof stockNotificationSchema>;
