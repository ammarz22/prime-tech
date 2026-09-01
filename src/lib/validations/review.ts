import { z } from "zod";

export const reviewSchema = z.object({
  productId: z.string().uuid(),
  customerName: z.string().trim().min(2, "Enter your name").max(80),
  rating: z.number().int().min(1, "Choose a rating").max(5),
  title: z.string().trim().max(120).optional().or(z.literal("")),
  body: z.string().trim().min(10, "Share a few more details").max(2000),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
