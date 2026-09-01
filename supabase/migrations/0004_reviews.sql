-- Genuine Prime Tech customer reviews. No review is ever seeded/fabricated —
-- this migration only creates the architecture; the table starts empty and
-- products show "No customer reviews yet" until real customers submit one.
create type review_status as enum ('pending', 'approved', 'rejected');

create table reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products (id) on delete cascade,
  user_id uuid references auth.users (id) on delete set null,
  customer_name text not null,
  rating smallint not null check (rating between 1 and 5),
  title text,
  body text not null,
  -- Set manually by an admin during moderation — there's no purchase/
  -- checkout system to auto-verify against, so this is a considered human
  -- judgement call, not an automated claim.
  verified boolean not null default false,
  helpful_count integer not null default 0,
  status review_status not null default 'pending',
  created_at timestamptz not null default now()
);
create index reviews_product_idx on reviews (product_id);
create index reviews_status_idx on reviews (status);

alter table reviews enable row level security;

-- Anyone can submit a review (goes to `pending` by default).
create policy reviews_insert_anyone on reviews for insert with check (true);
-- Public can only read approved reviews; admins can read everything for moderation.
create policy reviews_select_approved on reviews for select using (status = 'approved' or is_admin());
-- Only admins can moderate (update status/verified) or delete.
create policy reviews_admin_write on reviews for update using (is_admin()) with check (is_admin());
create policy reviews_admin_delete on reviews for delete using (is_admin());
