# Prime Tech — Setup Guide

This app runs without a backend connected (the marketing pages render with
empty states), but auth, the catalogue, enquiries, saved products and the
admin dashboard all need a real Supabase project. This is the walkthrough.

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. In **Project Settings → API**, copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (server-only, never expose to the client)
3. Copy `.env.example` to `.env.local` and fill these in.

## 2. Run the database migrations

In the Supabase SQL Editor, run these in order (or `supabase db push` if you
have the Supabase CLI linked to the project):

1. `supabase/migrations/0001_init.sql` — every table, RLS policy, and the `is_admin()` helper.
2. `supabase/migrations/0002_storage.sql` — the `product-images` storage bucket
   the admin image uploader writes to, with RLS so only admins can upload.
3. Run any later-numbered files in `supabase/migrations/` in order, including
   `0006_iphone18_packages.sql` and `0007_iphone18_category.sql` (the latter
   adds the `iPhone 18 Series` category and four "Coming Soon" placeholder
   products so `/iphone-18-preorder` has a real, admin-editable lineup).

## 3. Seed reference and catalogue data

Run, in order:

1. `supabase/seed.sql` — brands, categories, a placeholder branch, empty site settings.
2. `supabase/seed_apple.sql` — the iPhone 17 family and current Mac lineup, with
   specs sourced from apple.com and Sri Lankan retail pricing where it could be
   verified (see the comments at the top of that file for sourcing notes).

## 4. Make yourself an admin

Sign up for an account on the running site, then in the Supabase SQL Editor:

```sql
insert into admin_users (user_id)
values ('YOUR-USER-UUID-FROM-auth.users');
```

You'll then be able to reach `/admin`.

## 5. Configure business details

Nothing about Prime Tech's real phone number, WhatsApp number, email, address,
branches, or social links has been invented — they're all placeholders. Set them
either via environment variables (`.env.local`, see `.env.example`) or, once an
admin user exists, via `/admin/settings` (which writes to the `site_settings`
table and takes priority over the env vars).

Branch records are similarly placeholder-only (`supabase/seed.sql` inserts one
row marked `status = 'coming_soon'` with no real address or phone). Add real
branches via `/admin/branches`.

## Product image policy

No product photography has been downloaded or embedded anywhere in this app.
Every product without a verified image shows a styled "Image Pending"
placeholder (`src/components/product/image-pending.tsx`) instead of a stand-in
or AI-generated image. Two ways images get attached:

1. **Static seed images** — `public/products/apple/*` holds the photos supplied
   directly for this project. `supabase/seed_apple.sql` inserts `product_images`
   rows pointing at them (e.g. `/products/apple/iphone-17.jpg`) as local paths,
   so they appear the moment the seed script runs — no Storage upload needed.
   Every one of these was visually checked against the product it's assigned
   to (chip-era camera layout, colour, body design) before being wired in.
   One supplied photo was **not** used: the "iMac" image was the older
   thick-bezel design, not Apple's current all-in-one — that product keeps
   the placeholder rather than showing the wrong generation. A supplied
   "Apple Cover" case photo was also skipped because it didn't read as
   genuine Apple-branded product photography.
2. **Admin uploads** — for anything added later, open the product in
   `/admin/products/[id]` and use the Images panel — it uploads directly to
   the `product-images` Supabase Storage bucket (JPEG/PNG/WebP, up to 5MB)
   and sets the public URL on a new `product_images` row. The first image
   uploaded for a product is automatically marked primary; use the star icon
   to change it.

Never substitute a different model's photo for a missing one — see the seed
file comments for why (wrong generation/colour/camera layout is worse than no
image at all).

## Managing variants and images

Every product's edit page (`/admin/products/[id]`) has two panels below the
main form:

- **Variants** — storage/memory/colour/screen size/chip/price/availability
  combinations (e.g. "256GB" vs "512GB"). Add/edit through a dialog; deleting
  is immediate (confirmed first).
- **Images** — upload, delete, and mark-as-primary. Deleting an image removes
  its database row; the underlying file in Storage is left in place (a manual
  or scheduled cleanup is a reasonable follow-up if storage usage matters to you).

New products redirect straight to this edit page after saving so you can add
a variant and photo before the product goes live.

## What's intentionally out of scope for V1

- The general `/products` catalogue is empty by design — no vendor
  partnerships have been invented. Add `OTHER`-group products via
  `/admin/products` as real brand relationships are established.
- Brand and category management still happens in Supabase Studio, not
  `/admin` — the category list used in navigation/filters is a short, fixed
  set (Apple, Smartphones, Laptops, Tablets, Accessories, Smart Devices) that
  would need matching UI updates if it grows.
- No image reordering UI (images keep upload order; only primary/delete are
  supported) and no drag-and-drop uploads (standard file picker only).
- No analytics event tracking (`product_view`, `whatsapp_clicked`, etc.) is
  wired up yet — only the architecture assumption that it could be added.
- No automated tests.
- Formal cross-browser QA matrices and a full WCAG audit — the app follows
  accessible patterns throughout (semantic HTML, focus states, labelled
  forms, `prefers-reduced-motion`), but a dedicated audit pass is recommended
  before launch.

## Everyday commands

```bash
npm run dev      # start the dev server
npm run lint      # eslint
npx tsc --noEmit  # typecheck
npm run build     # production build
```
