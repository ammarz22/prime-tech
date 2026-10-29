import { z } from "zod";

const text = (max: number) => z.string().trim().max(max, `Keep this under ${max} characters`);

export const invoiceItemSchema = z.object({
  desc: z.string().max(600, "Keep the description under 600 characters"),
  qty: z.number({ error: "Enter a quantity" }).min(0, "Can't be negative"),
  unit_price: z.number({ error: "Enter a price" }).min(0, "Can't be negative"),
});

export const invoiceSchema = z.object({
  invoiceDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a date"),
  dueDate: z.union([z.literal(""), z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a date")]),
  customerName: text(200),
  customerPhone: text(60),
  customerEmail: z.union([z.literal(""), z.string().trim().email("Enter a valid email")]),
  customerAddress: text(300),
  items: z.array(invoiceItemSchema),
  discount: z.number({ error: "Enter a discount" }).min(0, "Can't be negative"),
  taxPercent: z.number({ error: "Enter a percentage" }).min(0, "Can't be negative").max(100, "Can't be over 100"),
  paymentMethod: text(100),
  notes: text(4000),
  saleKind: z.enum(["phone", "accessory"]).nullable(),
  saleId: z.string().uuid().nullable(),
});
export type InvoiceInput = z.infer<typeof invoiceSchema>;
