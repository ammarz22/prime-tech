-- iPhone 18 Series category + four "Coming Soon" placeholder products, so the
-- /iphone-18-preorder lineup grid has real, admin-editable rows instead of a
-- hardcoded fallback. Model names (18 / 18 Air / 18 Pro / 18 Pro Max) are a
-- rumour-based assumption, not Apple-confirmed — every row stays
-- `price_label = 'coming_soon'` and carries a `coming_soon` variant, and the
-- short description says so explicitly. `product_group = 'APPLE'` with
-- `category_id` scoped to this new `iphone-18` slug (distinct from the
-- existing `iphone` category) keeps these four rows out of every other
-- Apple/general grid, search, comparison and "related products" query —
-- they only ever appear where a caller explicitly opts in with
-- `includeComingSoon: true` and `categorySlug: "iphone-18"`, which today is
-- only the iPhone 18 page itself. When Apple's real lineup is confirmed,
-- edit these same rows: add variants/images, flip `price_label` and
-- `availability`, and the page reveals them automatically — no rebuild.

insert into categories (name, slug, sort_order) values
  ('iPhone 18 Series', 'iphone-18', 9)
on conflict (slug) do nothing;

with cat as (
  select id from categories where slug = 'iphone-18'
),
new_products (name, slug, short_description) as (
  values
    ('iPhone 18', 'iphone-18', 'Expected model — full specifications confirmed after Apple''s official announcement.'),
    ('iPhone 18 Air', 'iphone-18-air', 'Expected model — full specifications confirmed after Apple''s official announcement.'),
    ('iPhone 18 Pro', 'iphone-18-pro', 'Expected model — full specifications confirmed after Apple''s official announcement.'),
    ('iPhone 18 Pro Max', 'iphone-18-pro-max', 'Expected model — full specifications confirmed after Apple''s official announcement.')
),
inserted_products as (
  insert into products (name, slug, category_id, product_group, short_description, status, base_price, price_label)
  select np.name, np.slug, cat.id, 'APPLE', np.short_description, 'published', null, 'coming_soon'
  from new_products np, cat
  on conflict (slug) do nothing
  returning id, name
)
insert into product_variants (product_id, name, availability)
select id, 'To Be Announced', 'coming_soon' from inserted_products;
