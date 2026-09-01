-- iPhone 18 pre-order packages. Admin-managed bundles (product + accessories
-- + optional benefit) shown on the iPhone 18 page once the campaign stage
-- moves past "announcement". `included_items` is a freeform text list rather
-- than a join to real accessory products — there are zero real packages to
-- populate yet, and this keeps the system simple and honest until Prime Tech
-- has confirmed real bundle contents to link.

create table iphone18_packages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  tier text,
  description text,
  included_items text[] not null default '{}',
  price numeric(12, 2),
  benefit text,
  image_url text,
  availability text not null default 'coming_soon' check (availability in ('available', 'out_of_stock', 'coming_soon')),
  is_featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index iphone18_packages_sort_idx on iphone18_packages (sort_order);

alter table iphone18_packages enable row level security;

create policy "iphone18_packages_public_read" on iphone18_packages for select using (true);
create policy "iphone18_packages_admin_write" on iphone18_packages for all
  using (is_admin()) with check (is_admin());
