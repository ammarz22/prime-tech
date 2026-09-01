-- Variant-level pricing support: compare-at price, an automatic price-change
-- audit trail, real 360° product photography assets, back-in-stock capture,
-- and saved comparisons for signed-in users.

-- ---------------------------------------------------------------------------
-- product_variants: compare-at price (nullable, unused until a real sale
-- exists — never populated with an invented "was" price)
-- ---------------------------------------------------------------------------
alter table product_variants add column if not exists compare_at_price numeric(12, 2);

-- ---------------------------------------------------------------------------
-- Price history — logged automatically by trigger so it can't be bypassed by
-- an app-code path that forgets to call a logging function.
-- ---------------------------------------------------------------------------
create table price_history (
  id uuid primary key default gen_random_uuid(),
  variant_id uuid not null references product_variants (id) on delete cascade,
  old_price numeric(12, 2),
  new_price numeric(12, 2),
  changed_by uuid references auth.users (id) on delete set null,
  changed_at timestamptz not null default now()
);
create index price_history_variant_idx on price_history (variant_id);

create function log_price_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if old.price is distinct from new.price then
    insert into price_history (variant_id, old_price, new_price, changed_by)
    values (new.id, old.price, new.price, auth.uid());
  end if;
  return new;
end;
$$;

create trigger product_variants_log_price_change
  after update on product_variants
  for each row execute procedure log_price_change();

-- ---------------------------------------------------------------------------
-- 360° product photography — a product (or a specific variant) can have one
-- enabled frame set. No live data ships with this migration; the viewer and
-- its "360° View" toggle stay invisible until an admin uploads real frames.
-- ---------------------------------------------------------------------------
create table product_360_sets (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products (id) on delete cascade,
  variant_id uuid references product_variants (id) on delete cascade,
  label text,
  enabled boolean not null default false,
  created_at timestamptz not null default now()
);
create index product_360_sets_product_idx on product_360_sets (product_id);
create index product_360_sets_variant_idx on product_360_sets (variant_id);

create table product_360_frames (
  id uuid primary key default gen_random_uuid(),
  set_id uuid not null references product_360_sets (id) on delete cascade,
  sort_order int not null default 0,
  url text not null,
  created_at timestamptz not null default now(),
  unique (set_id, sort_order)
);

-- ---------------------------------------------------------------------------
-- Back-in-stock capture — no email sending is wired up anywhere in this
-- project; this is capture + admin visibility only.
-- ---------------------------------------------------------------------------
create table stock_notifications (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products (id) on delete cascade,
  variant_id uuid references product_variants (id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now(),
  notified boolean not null default false
);
create index stock_notifications_product_idx on stock_notifications (product_id);

-- ---------------------------------------------------------------------------
-- Saved comparisons — signed-in users can persist a compare-page selection.
-- ---------------------------------------------------------------------------
create table saved_comparisons (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  product_ids uuid[] not null,
  label text,
  created_at timestamptz not null default now()
);
create index saved_comparisons_user_idx on saved_comparisons (user_id);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table price_history enable row level security;
alter table product_360_sets enable row level security;
alter table product_360_frames enable row level security;
alter table stock_notifications enable row level security;
alter table saved_comparisons enable row level security;

-- price_history: admin-only, operational visibility, never public
create policy "price_history_admin_only" on price_history for select using (is_admin());

-- product_360_sets / frames: public read of enabled sets, admin write
create policy "product_360_sets_public_read" on product_360_sets for select
  using (enabled or is_admin());
create policy "product_360_sets_admin_write" on product_360_sets for all
  using (is_admin()) with check (is_admin());

create policy "product_360_frames_public_read" on product_360_frames for select
  using (
    is_admin() or exists (
      select 1 from product_360_sets s where s.id = set_id and s.enabled
    )
  );
create policy "product_360_frames_admin_write" on product_360_frames for all
  using (is_admin()) with check (is_admin());

-- stock_notifications: anyone may submit, only admin may read
create policy "stock_notifications_insert_anyone" on stock_notifications for insert with check (true);
create policy "stock_notifications_admin_read" on stock_notifications for select using (is_admin());
create policy "stock_notifications_admin_update" on stock_notifications for update using (is_admin());

-- saved_comparisons: owner only
create policy "saved_comparisons_owner" on saved_comparisons for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
