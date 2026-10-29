import { z } from "zod";

const dateField = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a date");
const text = (max: number) => z.string().trim().max(max, `Keep this under ${max} characters`);
const requiredText = (label: string, max = 200) =>
  z.string().trim().min(1, `${label} is required`).max(max, `Keep this under ${max} characters`);
const money = (label: string) =>
  z
    .number({ error: `Enter ${label}` })
    .refine((n) => Number.isFinite(n), `Enter ${label}`)
    .refine((n) => n >= 0, `${label} can't be negative`);

export const phoneSaleSchema = z.object({
  saleDate: dateField,
  model: requiredText("Phone model"),
  storage: text(40),
  colour: text(60),
  modelNo: text(60),
  serialNo: text(80),
  imei: text(40),
  customerName: text(200),
  customerPhone: text(40),
  customerAddress: text(300),
  customerEmail: z.union([z.literal(""), z.string().trim().email("Enter a valid email")]),
  supplier: text(200),
  costPrice: money("the cost price"),
  sellingPrice: money("the selling price"),
  paymentMethod: text(100),
  notes: text(1000),
});
export type PhoneSaleInput = z.infer<typeof phoneSaleSchema>;

export const accessorySaleSchema = z.object({
  saleDate: dateField,
  type: text(100),
  name: requiredText("Accessory name"),
  qty: z
    .number({ error: "Enter a quantity" })
    .int("Whole numbers only")
    .min(1, "At least 1"),
  supplier: text(200),
  customerName: text(200),
  customerPhone: text(40),
  unitCost: money("the cost per item"),
  unitPrice: money("the selling price per item"),
  paymentMethod: text(100),
  notes: text(1000),
});
export type AccessorySaleInput = z.infer<typeof accessorySaleSchema>;

export const expenseSchema = z.object({
  expenseDate: dateField,
  category: requiredText("Category", 100),
  description: text(300),
  paidTo: text(200),
  amount: money("the amount"),
  paymentMethod: text(100),
  notes: text(1000),
});
export type ExpenseInput = z.infer<typeof expenseSchema>;

/** Settings form: dropdown lists arrive as one-per-line text and are split in the action. */
export const trackerSettingsSchema = z.object({
  address: text(300),
  phone: text(60),
  email: text(200),
  footer: text(300),
  terms: text(4000),
  bankDetails: text(2000),
  invoicePrefix: requiredText("Prefix", 20),
  nextInvoiceNumber: z
    .number({ error: "Enter a number" })
    .int("Whole numbers only")
    .min(1, "At least 1"),
  bankChargePercent: z.number({ error: "Enter a percentage" }).min(0, "Can't be negative").max(100, "Can't be over 100"),
  suppliers: z.string().max(10000),
  paymentMethods: z.string().max(10000),
  accessoryTypes: z.string().max(10000),
  expenseCategories: z.string().max(10000),
});
export type TrackerSettingsInput = z.infer<typeof trackerSettingsSchema>;

/** One entry per non-empty, de-duplicated line. */
export function splitLines(value: string): string[] {
  return Array.from(new Set(value.split("\n").map((l) => l.trim()).filter(Boolean)));
}
