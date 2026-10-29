export type ProductGroup = "APPLE" | "OTHER";
export type ProductStatus = "draft" | "published";
export type PriceLabel =
  | "exact"
  | "starting_from"
  | "approx_market"
  | "on_request"
  | "coming_soon";
export type Availability =
  | "in_stock"
  | "out_of_stock"
  | "available_on_request"
  | "coming_soon";
export type EnquiryStatus = "new" | "contacted" | "closed";
export type BranchStatus = "active" | "coming_soon";
export type ReviewStatus = "pending" | "approved" | "rejected";

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  sort_order: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand_id: string | null;
  category_id: string | null;
  product_group: ProductGroup;
  description: string | null;
  short_description: string | null;
  status: ProductStatus;
  featured: boolean;
  new_arrival: boolean;
  base_price: number | null;
  currency: string;
  price_label: PriceLabel;
  video_url: string | null;
  video_poster_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  sku: string | null;
  storage: string | null;
  memory: string | null;
  colour: string | null;
  screen_size: string | null;
  chip: string | null;
  sim_type: string | null;
  price: number | null;
  compare_at_price: number | null;
  availability: Availability;
  image_url: string | null;
  sort_order: number;
}

export interface ProductImage {
  id: string;
  product_id: string;
  variant_id: string | null;
  colour: string | null;
  url: string;
  alt_text: string | null;
  sort_order: number;
  is_primary: boolean;
  /** CSS object-position (e.g. "75% 50%") for off-center source photos, so a
   * square crop doesn't cut off the subject. Null uses the default center. */
  object_position: string | null;
  /** CSS object-fit override ("contain") for photos that would lose their
   * subject entirely if cropped to a square. Null uses the default "cover". */
  object_fit: "cover" | "contain" | null;
}

export interface Branch {
  id: string;
  name: string;
  slug: string;
  address: string | null;
  city: string | null;
  phone: string | null;
  whatsapp: string | null;
  hours: Record<string, string> | null;
  maps_url: string | null;
  services: string[] | null;
  status: BranchStatus;
}

export interface Enquiry {
  id: string;
  user_id: string | null;
  name: string;
  email: string;
  phone: string | null;
  product_id: string | null;
  variant_id: string | null;
  preferred_branch_id: string | null;
  message: string | null;
  configuration: string | null;
  preferred_model: string | null;
  preferred_storage: string | null;
  preferred_colour: string | null;
  consent: boolean;
  status: EnquiryStatus;
  created_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string | null;
  customer_name: string;
  rating: number;
  title: string | null;
  body: string;
  verified: boolean;
  helpful_count: number;
  status: ReviewStatus;
  created_at: string;
}

export interface PriceHistory {
  id: string;
  variant_id: string;
  old_price: number | null;
  new_price: number | null;
  changed_by: string | null;
  changed_at: string;
}

export interface Product360Set {
  id: string;
  product_id: string;
  variant_id: string | null;
  label: string | null;
  enabled: boolean;
  created_at: string;
}

export interface Product360Frame {
  id: string;
  set_id: string;
  sort_order: number;
  url: string;
  created_at: string;
}

export interface StockNotification {
  id: string;
  product_id: string;
  variant_id: string | null;
  email: string;
  created_at: string;
  notified: boolean;
}

export interface SavedComparison {
  id: string;
  user_id: string;
  product_ids: string[];
  label: string | null;
  created_at: string;
}

export interface SavedProduct {
  user_id: string;
  product_id: string;
  created_at: string;
}

export interface RecentlyViewed {
  user_id: string;
  product_id: string;
  viewed_at: string;
}

export interface SiteSetting {
  key: string;
  value: string | null;
}

export type PackageAvailability = "available" | "out_of_stock" | "coming_soon";

export interface Package {
  id: string;
  name: string;
  tier: string | null;
  description: string | null;
  included_items: string[];
  price: number | null;
  benefit: string | null;
  image_url: string | null;
  availability: PackageAvailability;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

/** Product joined with its brand/category/variants/images, as read from the catalog. */
export interface ProductWithRelations extends Product {
  brand: Brand | null;
  category: Category | null;
  variants: ProductVariant[];
  images: ProductImage[];
}

// ---------------------------------------------------------------------------
// Sales tracker (admin only — see supabase/migrations/0009_sales_tracker.sql)
// Money columns come back from PostgREST as numbers.
// ---------------------------------------------------------------------------

export type SaleKind = "phone" | "accessory";

export interface InvoiceItem {
  desc: string;
  qty: number;
  unit_price: number;
}

export interface Invoice {
  id: string;
  invoice_no: string;
  invoice_date: string;
  due_date: string | null;
  customer_name: string | null;
  customer_phone: string | null;
  customer_email: string | null;
  customer_address: string | null;
  items: InvoiceItem[];
  discount: number;
  tax_percent: number;
  total: number;
  payment_method: string | null;
  notes: string | null;
  sale_kind: SaleKind | null;
  sale_id: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

export interface PhoneSale {
  id: string;
  sale_date: string;
  model: string;
  storage: string | null;
  colour: string | null;
  model_no: string | null;
  serial_no: string | null;
  imei: string | null;
  customer_name: string | null;
  customer_phone: string | null;
  customer_address: string | null;
  customer_email: string | null;
  supplier: string | null;
  cost_price: number;
  selling_price: number;
  profit: number;
  payment_method: string | null;
  notes: string | null;
  invoice_id: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

export interface AccessorySale {
  id: string;
  sale_date: string;
  name: string;
  type: string | null;
  qty: number;
  customer_name: string | null;
  customer_phone: string | null;
  supplier: string | null;
  unit_cost: number;
  unit_price: number;
  total_cost: number;
  total_sale: number;
  profit: number;
  payment_method: string | null;
  notes: string | null;
  invoice_id: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

export interface BusinessExpense {
  id: string;
  expense_date: string;
  category: string;
  description: string | null;
  paid_to: string | null;
  amount: number;
  payment_method: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

export interface TrackerSettings {
  id: 1;
  address: string | null;
  phone: string | null;
  email: string | null;
  footer: string | null;
  terms: string | null;
  bank_details: string | null;
  invoice_prefix: string;
  next_invoice_number: number;
  bank_charge_percent: number;
  suppliers: string[];
  payment_methods: string[];
  accessory_types: string[];
  expense_categories: string[];
}

/** A sale row joined with the number of the invoice made for it (if any). */
export type PhoneSaleRow = PhoneSale & { invoice: { invoice_no: string } | null };
export type AccessorySaleRow = AccessorySale & { invoice: { invoice_no: string } | null };
