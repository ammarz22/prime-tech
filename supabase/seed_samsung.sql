-- Prime Tech — Samsung catalog seed.
-- Samsung is deliberately smartphones-only at Prime Tech: Galaxy S25 series
-- (S25, S25+, S25 Ultra, S25 Edge) and Galaxy S26 series (S26, S26+, S26
-- Ultra — no Edge model exists for S26; Samsung cancelled it in December
-- 2025 before launch). Specs sourced from Samsung's own spec pages and
-- GSMArena as of 2026-08-24. LKR prices are directly-observed current
-- listings from Celltronics.lk where confirmed; `on_request` elsewhere —
-- never an invented figure. Colour is intentionally left as a neutral
-- "confirm at enquiry" note rather than guessed shade names.
--
-- Product photography supplied by the user on 2026-08-24 and verified
-- against each model's known design (camera layout, S Pen on Ultra models,
-- dual-camera Edge) before being wired in.
-- Re-run safe: upserts keyed on product/variant slug and sku.

-- ---------------------------------------------------------------------------
-- Galaxy S25
-- ---------------------------------------------------------------------------
insert into products (name, slug, brand_id, category_id, product_group, description, short_description, status, featured, new_arrival, base_price, currency, price_label)
select 'Galaxy S25', 'galaxy-s25', b.id, c.id, 'OTHER',
  'Galaxy S25 — Samsung''s standard flagship size.',
  'Snapdragon 8 Elite · 6.2" 120Hz display · 50MP triple camera',
  'published', false, true, null, 'LKR', 'on_request'
from brands b, categories c where b.slug = 'samsung' and c.slug = 'galaxy-s25'
on conflict (slug) do nothing;

insert into product_variants (product_id, name, sku, storage, colour, price, availability, sort_order)
select p.id, v.name, v.sku, v.storage, 'Multiple colours — confirm at enquiry', v.price, v.avail::availability, v.sort
from products p, (values ('128GB','GS25-128',null,'available_on_request',1), ('256GB','GS25-256',null,'available_on_request',2)) as v(name, sku, price, avail, sort)
where p.slug = 'galaxy-s25'
on conflict (sku) do nothing;

-- ---------------------------------------------------------------------------
-- Galaxy S25+
-- ---------------------------------------------------------------------------
insert into products (name, slug, brand_id, category_id, product_group, description, short_description, status, featured, new_arrival, base_price, currency, price_label)
select 'Galaxy S25+', 'galaxy-s25-plus', b.id, c.id, 'OTHER',
  'Galaxy S25+ scales the S25 up with a larger battery and up to 30 hours of video playback.',
  'Snapdragon 8 Elite · 6.7" 120Hz display · up to 30hr video',
  'published', false, true, null, 'LKR', 'on_request'
from brands b, categories c where b.slug = 'samsung' and c.slug = 'galaxy-s25'
on conflict (slug) do nothing;

insert into product_variants (product_id, name, sku, storage, colour, price, availability, sort_order)
select p.id, v.name, v.sku, v.storage, 'Multiple colours — confirm at enquiry', v.price, v.avail::availability, v.sort
from products p, (values ('256GB','GS25P-256',null,'available_on_request',1), ('512GB','GS25P-512',null,'available_on_request',2)) as v(name, sku, price, avail, sort)
where p.slug = 'galaxy-s25-plus'
on conflict (sku) do nothing;

-- ---------------------------------------------------------------------------
-- Galaxy S25 Ultra
-- ---------------------------------------------------------------------------
insert into products (name, slug, brand_id, category_id, product_group, description, short_description, status, featured, new_arrival, base_price, currency, price_label)
select 'Galaxy S25 Ultra', 'galaxy-s25-ultra', b.id, c.id, 'OTHER',
  'Galaxy S25 Ultra is Samsung''s S Pen flagship, with up to 1TB storage and up to 16GB RAM.',
  'Snapdragon 8 Elite · 200MP quad camera · S Pen',
  'published', true, true, 389900, 'LKR', 'starting_from'
from brands b, categories c where b.slug = 'samsung' and c.slug = 'galaxy-s25'
on conflict (slug) do nothing;

-- One row per (storage × real colour) — price parity across colours,
-- matching Samsung's real retail pricing.
insert into product_variants (product_id, name, sku, storage, colour, price, availability, sort_order)
select p.id, v.name, v.sku, v.storage, v.colour, v.price, v.avail::availability, v.sort
from products p, (values
  ('256GB · Titanium Silverblue', 'GS25U-256-SILVERBLUE', '256GB', 'Titanium Silverblue', 389900, 'in_stock', 1),
  ('256GB · Titanium Whitesilver', 'GS25U-256-WHITESILVER', '256GB', 'Titanium Whitesilver', 389900, 'in_stock', 2),
  ('256GB · Titanium Gray', 'GS25U-256-GRAY', '256GB', 'Titanium Gray', 389900, 'in_stock', 3),
  ('256GB · Titanium Black', 'GS25U-256-BLACK', '256GB', 'Titanium Black', 389900, 'in_stock', 4),
  ('512GB · Titanium Silverblue', 'GS25U-512-SILVERBLUE', '512GB', 'Titanium Silverblue', null, 'available_on_request', 5),
  ('512GB · Titanium Whitesilver', 'GS25U-512-WHITESILVER', '512GB', 'Titanium Whitesilver', null, 'available_on_request', 6),
  ('512GB · Titanium Gray', 'GS25U-512-GRAY', '512GB', 'Titanium Gray', null, 'available_on_request', 7),
  ('512GB · Titanium Black', 'GS25U-512-BLACK', '512GB', 'Titanium Black', null, 'available_on_request', 8),
  ('1TB · Titanium Silverblue', 'GS25U-1TB-SILVERBLUE', '1TB', 'Titanium Silverblue', null, 'available_on_request', 9),
  ('1TB · Titanium Whitesilver', 'GS25U-1TB-WHITESILVER', '1TB', 'Titanium Whitesilver', null, 'available_on_request', 10),
  ('1TB · Titanium Gray', 'GS25U-1TB-GRAY', '1TB', 'Titanium Gray', null, 'available_on_request', 11),
  ('1TB · Titanium Black', 'GS25U-1TB-BLACK', '1TB', 'Titanium Black', null, 'available_on_request', 12)
) as v(name, sku, storage, colour, price, avail, sort)
where p.slug = 'galaxy-s25-ultra'
on conflict (sku) do nothing;

-- ---------------------------------------------------------------------------
-- Galaxy S25 Edge
-- ---------------------------------------------------------------------------
insert into products (name, slug, brand_id, category_id, product_group, description, short_description, status, featured, new_arrival, base_price, currency, price_label)
select 'Galaxy S25 Edge', 'galaxy-s25-edge', b.id, c.id, 'OTHER',
  'Galaxy S25 Edge is Samsung''s thinnest phone to date at 5.8mm, in an ultra-slim titanium frame.',
  'Snapdragon 8 Elite · 5.8mm thin · 6.7" display',
  'published', false, true, null, 'LKR', 'on_request'
from brands b, categories c where b.slug = 'samsung' and c.slug = 'galaxy-s25'
on conflict (slug) do nothing;

insert into product_variants (product_id, name, sku, storage, colour, price, availability, sort_order)
select p.id, v.name, v.sku, v.storage, 'Multiple colours — confirm at enquiry', v.price, v.avail::availability, v.sort
from products p, (values ('256GB','GS25E-256',null,'available_on_request',1)) as v(name, sku, price, avail, sort)
where p.slug = 'galaxy-s25-edge'
on conflict (sku) do nothing;

-- ---------------------------------------------------------------------------
-- Galaxy S26
-- ---------------------------------------------------------------------------
insert into products (name, slug, brand_id, category_id, product_group, description, short_description, status, featured, new_arrival, base_price, currency, price_label)
select 'Galaxy S26', 'galaxy-s26', b.id, c.id, 'OTHER',
  'Galaxy S26 — Samsung''s current standard flagship.',
  'Exynos 2600 · 6.3" display · 50MP camera',
  'published', true, true, 414900, 'LKR', 'starting_from'
from brands b, categories c where b.slug = 'samsung' and c.slug = 'galaxy-s26'
on conflict (slug) do nothing;

insert into product_variants (product_id, name, sku, storage, colour, price, availability, sort_order)
select p.id, v.name, v.sku, v.storage, 'Multiple colours — confirm at enquiry', v.price, v.avail::availability, v.sort
from products p, (values ('256GB','GS26-256',414900,'in_stock',1), ('512GB','GS26-512',null,'available_on_request',2)) as v(name, sku, price, avail, sort)
where p.slug = 'galaxy-s26'
on conflict (sku) do nothing;

-- ---------------------------------------------------------------------------
-- Galaxy S26+
-- ---------------------------------------------------------------------------
insert into products (name, slug, brand_id, category_id, product_group, description, short_description, status, featured, new_arrival, base_price, currency, price_label)
select 'Galaxy S26+', 'galaxy-s26-plus', b.id, c.id, 'OTHER',
  'Galaxy S26+ scales the S26 up with a larger battery.',
  'Exynos 2600 · 6.7" display · larger battery',
  'published', false, true, null, 'LKR', 'on_request'
from brands b, categories c where b.slug = 'samsung' and c.slug = 'galaxy-s26'
on conflict (slug) do nothing;

insert into product_variants (product_id, name, sku, storage, colour, price, availability, sort_order)
select p.id, v.name, v.sku, v.storage, 'Multiple colours — confirm at enquiry', v.price, v.avail::availability, v.sort
from products p, (values ('256GB','GS26P-256',null,'available_on_request',1), ('512GB','GS26P-512',null,'available_on_request',2)) as v(name, sku, price, avail, sort)
where p.slug = 'galaxy-s26-plus'
on conflict (sku) do nothing;

-- ---------------------------------------------------------------------------
-- Galaxy S26 Ultra
-- ---------------------------------------------------------------------------
insert into products (name, slug, brand_id, category_id, product_group, description, short_description, status, featured, new_arrival, base_price, currency, price_label)
select 'Galaxy S26 Ultra', 'galaxy-s26-ultra', b.id, c.id, 'OTHER',
  'Galaxy S26 Ultra — Samsung''s current top-tier flagship, with 60W wired charging.',
  'Snapdragon 8 Elite Gen 5 · 200MP camera · 60W charging',
  'published', true, true, 653999, 'LKR', 'starting_from'
from brands b, categories c where b.slug = 'samsung' and c.slug = 'galaxy-s26'
on conflict (slug) do nothing;

insert into product_variants (product_id, name, sku, storage, colour, price, availability, sort_order)
select p.id, v.name, v.sku, v.storage, v.colour, v.price, v.avail::availability, v.sort
from products p, (values
  ('256GB · Black', 'GS26U-256-BLACK', '256GB', 'Black', 653999, 'in_stock', 1),
  ('256GB · White', 'GS26U-256-WHITE', '256GB', 'White', 653999, 'in_stock', 2),
  ('256GB · Cobalt Violet', 'GS26U-256-VIOLET', '256GB', 'Cobalt Violet', 653999, 'in_stock', 3),
  ('256GB · Sky Blue', 'GS26U-256-SKYBLUE', '256GB', 'Sky Blue', 653999, 'in_stock', 4),
  ('512GB · Black', 'GS26U-512-BLACK', '512GB', 'Black', null, 'available_on_request', 5),
  ('512GB · White', 'GS26U-512-WHITE', '512GB', 'White', null, 'available_on_request', 6),
  ('512GB · Cobalt Violet', 'GS26U-512-VIOLET', '512GB', 'Cobalt Violet', null, 'available_on_request', 7),
  ('512GB · Sky Blue', 'GS26U-512-SKYBLUE', '512GB', 'Sky Blue', null, 'available_on_request', 8),
  ('1TB · Black', 'GS26U-1TB-BLACK', '1TB', 'Black', null, 'available_on_request', 9),
  ('1TB · White', 'GS26U-1TB-WHITE', '1TB', 'White', null, 'available_on_request', 10),
  ('1TB · Cobalt Violet', 'GS26U-1TB-VIOLET', '1TB', 'Cobalt Violet', null, 'available_on_request', 11),
  ('1TB · Sky Blue', 'GS26U-1TB-SKYBLUE', '1TB', 'Sky Blue', null, 'available_on_request', 12)
) as v(name, sku, storage, colour, price, avail, sort)
where p.slug = 'galaxy-s26-ultra'
on conflict (sku) do nothing;

-- ---------------------------------------------------------------------------
-- Product images
-- ---------------------------------------------------------------------------
insert into product_images (product_id, url, alt_text, sort_order, is_primary)
select p.id, v.url, p.name, 1, true
from products p, (values
  ('galaxy-s25', '/products/samsung/galaxy-s25.jpg'),
  ('galaxy-s25-plus', '/products/samsung/galaxy-s25-plus.jpg'),
  ('galaxy-s25-ultra', '/products/samsung/galaxy-s25-ultra.jpg'),
  ('galaxy-s25-edge', '/products/samsung/galaxy-s25-edge.jpg'),
  ('galaxy-s26', '/products/samsung/galaxy-s26.webp'),
  ('galaxy-s26-plus', '/products/samsung/galaxy-s26-plus.webp'),
  ('galaxy-s26-ultra', '/products/samsung/galaxy-s26-ultra.webp')
) as v(slug, url)
where p.slug = v.slug
on conflict (product_id, url) do nothing;
