-- Prime Tech — initial schema
-- Run against a Supabase project via `supabase db push` or the SQL editor.
-- See SETUP.md for the full setup walkthrough.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
create type product_group as enum ('APPLE', 'OTHER');
create type product_status as enum ('draft', 'published');
create type price_label as enum ('exact', 'starting_from', 'approx_market', 'on_request', 'coming_soon');
create type availability as enum ('in_stock', 'out_of_stock', 'available_on_request', 'coming_soon');
create type enquiry_status as enum ('new', 'contacted', 'closed');
create type branch_status as enum ('active', 'coming_soon');

-- ---------------------------------------------------------------------------
-- Core tables
-- ---------------------------------------------------------------------------

create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  avatar_url text,
  created_at timestamptz not null default now()
);

create table admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  logo_url text,
  created_at timestamptz not null default now()
);

create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  parent_id uuid references categories (id) on delete set null,
  sort_order int not null default 0
);

create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  brand_id uuid references brands (id) on delete set null,
  category_id uuid references categories (id) on delete set null,
  product_group product_group not null default 'OTHER',
  description text,
  short_description text,
  status product_status not null default 'draft',
  featured boolean not null default false,
  new_arrival boolean not null default false,
  base_price numeric(12, 2),
  currency text not null default 'LKR',
  price_label price_label not null default 'on_request',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index products_status_idx on products (status);
create index products_group_idx on products (product_group);
create index products_category_idx on products (category_id);
create index products_brand_idx on products (brand_id);

create table product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products (id) on delete cascade,
  name text not null,
  sku text unique,
  storage text,
  memory text,
  colour text,
  screen_size text,
  chip text,
  price numeric(12, 2),
  availability availability not null default 'coming_soon',
  image_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index product_variants_product_idx on product_variants (product_id);

create table product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products (id) on delete cascade,
  variant_id uuid references product_variants (id) on delete cascade,
  url text not null,
  alt_text text,
  sort_order int not null default 0,
  is_primary boolean not null default false,
  unique (product_id, url)
);
create index product_images_product_idx on product_images (product_id);

create table branches (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  address text,
  city text,
  phone text,
  whatsapp text,
  hours jsonb,
  maps_url text,
  services text[],
  status branch_status not null default 'coming_soon',
  created_at timestamptz not null default now()
);

create table enquiries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  name text not null,
  email text not null,
  phone text,
  product_id uuid references products (id) on delete set null,
  variant_id uuid references product_variants (id) on delete set null,
  preferred_branch_id uuid references branches (id) on delete set null,
  message text,
  status enquiry_status not null default 'new',
  created_at timestamptz not null default now()
);
create index enquiries_user_idx on enquiries (user_id);
create index enquiries_status_idx on enquiries (status);

create table saved_products (
  user_id uuid not null references auth.users (id) on delete cascade,
  product_id uuid not null references products (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, product_id)
);

create table recently_viewed (
  user_id uuid not null references auth.users (id) on delete cascade,
  product_id uuid not null references products (id) on delete cascade,
  viewed_at timestamptz not null default now(),
  primary key (user_id, product_id)
);

create table site_settings (
  key text primary key,
  value text,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Helper functions
-- ---------------------------------------------------------------------------

create function is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from admin_users where user_id = auth.uid()
  );
$$;

create function handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (new.id, new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'phone');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

create function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger products_set_updated_at before update on products
  for each row execute procedure set_updated_at();
create trigger product_variants_set_updated_at before update on product_variants
  for each row execute procedure set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table profiles enable row level security;
alter table admin_users enable row level security;
alter table brands enable row level security;
alter table categories enable row level security;
alter table products enable row level security;
alter table product_variants enable row level security;
alter table product_images enable row level security;
alter table branches enable row level security;
alter table enquiries enable row level security;
alter table saved_products enable row level security;
alter table recently_viewed enable row level security;
alter table site_settings enable row level security;

-- profiles: owner read/update, admin read all
create policy "profiles_select_own_or_admin" on profiles for select
  using (auth.uid() = id or is_admin());
create policy "profiles_update_own" on profiles for update
  using (auth.uid() = id);

-- admin_users: only admins can read; no client writes (managed via SQL/service role)
create policy "admin_users_select_admin_only" on admin_users for select
  using (is_admin());

-- catalog: public read of published/active rows, admin full access
create policy "brands_public_read" on brands for select using (true);
create policy "brands_admin_write" on brands for all using (is_admin()) with check (is_admin());

create policy "categories_public_read" on categories for select using (true);
create policy "categories_admin_write" on categories for all using (is_admin()) with check (is_admin());

create policy "products_public_read_published" on products for select
  using (status = 'published' or is_admin());
create policy "products_admin_write" on products for all using (is_admin()) with check (is_admin());

create policy "variants_public_read" on product_variants for select
  using (
    is_admin() or exists (
      select 1 from products p where p.id = product_id and p.status = 'published'
    )
  );
create policy "variants_admin_write" on product_variants for all using (is_admin()) with check (is_admin());

create policy "images_public_read" on product_images for select
  using (
    is_admin() or exists (
      select 1 from products p where p.id = product_id and p.status = 'published'
    )
  );
create policy "images_admin_write" on product_images for all using (is_admin()) with check (is_admin());

create policy "branches_public_read" on branches for select using (true);
create policy "branches_admin_write" on branches for all using (is_admin()) with check (is_admin());

-- enquiries: anyone (incl. anonymous) may submit; only the submitter or admin may read
create policy "enquiries_insert_anyone" on enquiries for insert with check (true);
create policy "enquiries_select_own_or_admin" on enquiries for select
  using (auth.uid() = user_id or is_admin());
create policy "enquiries_admin_update" on enquiries for update using (is_admin());

-- saved_products / recently_viewed: owner only
create policy "saved_products_owner" on saved_products for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "recently_viewed_owner" on recently_viewed for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- site_settings: public read, admin write
create policy "site_settings_public_read" on site_settings for select using (true);
create policy "site_settings_admin_write" on site_settings for all using (is_admin()) with check (is_admin());
