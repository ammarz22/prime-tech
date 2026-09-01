-- Prime Tech — Apple catalog seed.
-- Specs sourced from official apple.com pages (iphone-17, iphone-air,
-- iphone-17-pro, iphone-17e specs pages; macbook-air, macbook-pro,
-- newsroom "Say hello to MacBook Neo") as of 2026-08-21.
-- LKR prices are directly-observed current listings from Sri Lankan
-- retailers (Celltronics.lk, Singer Sri Lanka), stored as `starting_from`.
-- Where no reliable LK price could be confirmed, price_label is
-- `on_request` rather than an invented figure — see SETUP.md.
-- Note: the spec referenced "iPhone 17 Air" — Apple's actual official name
-- is "iPhone Air" (no "17"), used here as the authoritative source dictates.
-- Re-run safe: upserts keyed on product/variant slug and sku.

-- ---------------------------------------------------------------------------
-- iPhone 17
-- ---------------------------------------------------------------------------
insert into products (name, slug, brand_id, category_id, product_group, description, short_description, status, featured, new_arrival, base_price, currency, price_label)
select 'iPhone 17', 'iphone-17', b.id, c.id, 'APPLE',
  'iPhone 17 runs the A19 chip with a 5-core GPU and 120Hz ProMotion, with a 2x optical-quality telephoto in every shot and up to 30 hours of video playback.',
  'A19 chip · 6.3" 120Hz display · 48MP Dual Fusion camera',
  'published', true, true, 319900, 'LKR', 'starting_from'
from brands b, categories c where b.slug = 'apple' and c.slug = 'iphone'
on conflict (slug) do nothing;

-- One row per (storage × real colour) — colour is price-parity across the
-- board here, matching Apple's real retail pricing (colour never changes
-- iPhone price); only storage moves the price.
insert into product_variants (product_id, name, sku, storage, colour, price, availability, sort_order)
select p.id, v.name, v.sku, v.storage, v.colour, v.price, v.avail::availability, v.sort
from products p, (values
  ('256GB · Black', 'IP17-256-BLACK', '256GB', 'Black', 319900, 'in_stock', 1),
  ('256GB · White', 'IP17-256-WHITE', '256GB', 'White', 319900, 'in_stock', 2),
  ('256GB · Mist Blue', 'IP17-256-MISTBLUE', '256GB', 'Mist Blue', 319900, 'in_stock', 3),
  ('256GB · Sage', 'IP17-256-SAGE', '256GB', 'Sage', 319900, 'in_stock', 4),
  ('256GB · Lavender', 'IP17-256-LAVENDER', '256GB', 'Lavender', 319900, 'in_stock', 5),
  ('512GB · Black', 'IP17-512-BLACK', '512GB', 'Black', null, 'available_on_request', 6),
  ('512GB · White', 'IP17-512-WHITE', '512GB', 'White', null, 'available_on_request', 7),
  ('512GB · Mist Blue', 'IP17-512-MISTBLUE', '512GB', 'Mist Blue', null, 'available_on_request', 8),
  ('512GB · Sage', 'IP17-512-SAGE', '512GB', 'Sage', null, 'available_on_request', 9),
  ('512GB · Lavender', 'IP17-512-LAVENDER', '512GB', 'Lavender', null, 'available_on_request', 10)
) as v(name, sku, storage, colour, price, avail, sort)
where p.slug = 'iphone-17'
on conflict (sku) do nothing;

insert into product_images (product_id, url, alt_text, sort_order, is_primary)
select p.id, '/products/apple/iphone-17.jpg', 'iPhone 17', 1, true
from products p where p.slug = 'iphone-17'
on conflict (product_id, url) do nothing;

-- ---------------------------------------------------------------------------
-- iPhone 17 Pro
-- ---------------------------------------------------------------------------
insert into products (name, slug, brand_id, category_id, product_group, description, short_description, status, featured, new_arrival, base_price, currency, price_label)
select 'iPhone 17 Pro', 'iphone-17-pro', b.id, c.id, 'APPLE',
  'iPhone 17 Pro pairs the A19 Pro chip and vapor chamber cooling with four optical focal lengths up to 8x telephoto (200mm). Heat-forged aluminum unibody, IP68, up to 33 hours of video playback.',
  'A19 Pro chip · Triple 48MP camera, 8x optical-quality zoom',
  'published', true, false, 449900, 'LKR', 'starting_from'
from brands b, categories c where b.slug = 'apple' and c.slug = 'iphone'
on conflict (slug) do nothing;

insert into product_variants (product_id, name, sku, storage, colour, price, availability, sort_order)
select p.id, v.name, v.sku, v.storage, v.colour, v.price, v.avail::availability, v.sort
from products p, (values
  ('256GB · Silver', 'IP17PRO-256-SILVER', '256GB', 'Silver', 449900, 'in_stock', 1),
  ('256GB · Cosmic Orange', 'IP17PRO-256-ORANGE', '256GB', 'Cosmic Orange', 449900, 'in_stock', 2),
  ('256GB · Deep Blue', 'IP17PRO-256-BLUE', '256GB', 'Deep Blue', 449900, 'in_stock', 3),
  ('512GB · Silver', 'IP17PRO-512-SILVER', '512GB', 'Silver', null, 'available_on_request', 4),
  ('512GB · Cosmic Orange', 'IP17PRO-512-ORANGE', '512GB', 'Cosmic Orange', null, 'available_on_request', 5),
  ('512GB · Deep Blue', 'IP17PRO-512-BLUE', '512GB', 'Deep Blue', null, 'available_on_request', 6),
  ('1TB · Silver', 'IP17PRO-1TB-SILVER', '1TB', 'Silver', null, 'available_on_request', 7),
  ('1TB · Cosmic Orange', 'IP17PRO-1TB-ORANGE', '1TB', 'Cosmic Orange', null, 'available_on_request', 8),
  ('1TB · Deep Blue', 'IP17PRO-1TB-BLUE', '1TB', 'Deep Blue', null, 'available_on_request', 9)
) as v(name, sku, storage, colour, price, avail, sort)
where p.slug = 'iphone-17-pro'
on conflict (sku) do nothing;

insert into product_images (product_id, url, alt_text, sort_order, is_primary)
select p.id, '/products/apple/iphone-17-pro.jpg', 'iPhone 17 Pro', 1, true
from products p where p.slug = 'iphone-17-pro'
on conflict (product_id, url) do nothing;

-- ---------------------------------------------------------------------------
-- iPhone 17 Pro Max
-- ---------------------------------------------------------------------------
insert into products (name, slug, brand_id, category_id, product_group, description, short_description, status, featured, new_arrival, base_price, currency, price_label)
select 'iPhone 17 Pro Max', 'iphone-17-pro-max', b.id, c.id, 'APPLE',
  'The longest-lasting iPhone: 120Hz ProMotion, the same A19 Pro triple-camera system as iPhone 17 Pro, up to 39 hours of video playback, and up to 2TB of storage.',
  'A19 Pro chip · 6.9" display · up to 39hr battery',
  'published', true, true, 601999, 'LKR', 'starting_from'
from brands b, categories c where b.slug = 'apple' and c.slug = 'iphone'
on conflict (slug) do nothing;

insert into product_variants (product_id, name, sku, storage, colour, price, availability, sort_order)
select p.id, v.name, v.sku, v.storage, v.colour, v.price, v.avail::availability, v.sort
from products p, (values
  ('256GB · Silver', 'IP17PM-256-SILVER', '256GB', 'Silver', 601999, 'in_stock', 1),
  ('256GB · Cosmic Orange', 'IP17PM-256-ORANGE', '256GB', 'Cosmic Orange', 601999, 'in_stock', 2),
  ('256GB · Deep Blue', 'IP17PM-256-BLUE', '256GB', 'Deep Blue', 601999, 'in_stock', 3),
  ('512GB · Silver', 'IP17PM-512-SILVER', '512GB', 'Silver', null, 'available_on_request', 4),
  ('512GB · Cosmic Orange', 'IP17PM-512-ORANGE', '512GB', 'Cosmic Orange', null, 'available_on_request', 5),
  ('512GB · Deep Blue', 'IP17PM-512-BLUE', '512GB', 'Deep Blue', null, 'available_on_request', 6),
  ('1TB · Silver', 'IP17PM-1TB-SILVER', '1TB', 'Silver', null, 'available_on_request', 7),
  ('1TB · Cosmic Orange', 'IP17PM-1TB-ORANGE', '1TB', 'Cosmic Orange', null, 'available_on_request', 8),
  ('1TB · Deep Blue', 'IP17PM-1TB-BLUE', '1TB', 'Deep Blue', null, 'available_on_request', 9),
  ('2TB · Silver', 'IP17PM-2TB-SILVER', '2TB', 'Silver', null, 'available_on_request', 10),
  ('2TB · Cosmic Orange', 'IP17PM-2TB-ORANGE', '2TB', 'Cosmic Orange', null, 'available_on_request', 11),
  ('2TB · Deep Blue', 'IP17PM-2TB-BLUE', '2TB', 'Deep Blue', null, 'available_on_request', 12)
) as v(name, sku, storage, colour, price, avail, sort)
where p.slug = 'iphone-17-pro-max'
on conflict (sku) do nothing;

insert into product_images (product_id, url, alt_text, sort_order, is_primary)
select p.id, '/products/apple/iphone-17-pro-max.jpg', 'iPhone 17 Pro Max', 1, true
from products p where p.slug = 'iphone-17-pro-max'
on conflict (product_id, url) do nothing;

-- ---------------------------------------------------------------------------
-- iPhone 17e
-- ---------------------------------------------------------------------------
insert into products (name, slug, brand_id, category_id, product_group, description, short_description, status, featured, new_arrival, base_price, currency, price_label)
select 'iPhone 17e', 'iphone-17e', b.id, c.id, 'APPLE',
  'The most affordable current iPhone: A19 chip, no ProMotion or Dynamic Island, and a single 48MP Fusion Main camera with a 2x optical-quality crop.',
  'A19 chip · 6.1" display · essential iPhone',
  'published', false, false, null, 'LKR', 'on_request'
from brands b, categories c where b.slug = 'apple' and c.slug = 'iphone'
on conflict (slug) do nothing;

insert into product_variants (product_id, name, sku, storage, colour, price, availability, sort_order)
select p.id, v.name, v.sku, v.storage, v.colour, null, 'available_on_request', v.sort
from products p, (values
  ('256GB · Black', 'IP17E-256-BLACK', '256GB', 'Black', 1),
  ('256GB · White', 'IP17E-256-WHITE', '256GB', 'White', 2),
  ('256GB · Soft Pink', 'IP17E-256-PINK', '256GB', 'Soft Pink', 3),
  ('512GB · Black', 'IP17E-512-BLACK', '512GB', 'Black', 4),
  ('512GB · White', 'IP17E-512-WHITE', '512GB', 'White', 5),
  ('512GB · Soft Pink', 'IP17E-512-PINK', '512GB', 'Soft Pink', 6)
) as v(name, sku, storage, colour, sort)
where p.slug = 'iphone-17e'
on conflict (sku) do nothing;

insert into product_images (product_id, url, alt_text, sort_order, is_primary)
select p.id, '/products/apple/iphone-17e.jpg', 'iPhone 17e', 1, true
from products p where p.slug = 'iphone-17e'
on conflict (product_id, url) do nothing;

-- ---------------------------------------------------------------------------
-- MacBook Neo — Apple's A18 Pro-based entry laptop (confirmed official product)
-- ---------------------------------------------------------------------------
insert into products (name, slug, brand_id, category_id, product_group, description, short_description, status, featured, new_arrival, base_price, currency, price_label)
select 'MacBook Neo', 'macbook-neo', b.id, c.id, 'APPLE',
  'Apple''s most affordable Mac laptop, with 8GB unified memory built in.',
  'A18 Pro chip · 13" display · Apple''s entry Mac',
  'published', false, true, null, 'LKR', 'on_request'
from brands b, categories c where b.slug = 'apple' and c.slug = 'mac'
on conflict (slug) do nothing;

insert into product_variants (product_id, name, sku, storage, memory, colour, chip, price, availability, sort_order)
select p.id, v.name, v.sku, v.storage, '8GB', 'Silver / Blush / Citrus / Indigo', 'A18 Pro', null, 'available_on_request', v.sort
from products p, (values ('256GB','MBNEO-256','256GB',1), ('512GB','MBNEO-512','512GB',2)) as v(name, sku, storage, sort)
where p.slug = 'macbook-neo'
on conflict (sku) do nothing;

insert into product_images (product_id, url, alt_text, sort_order, is_primary)
select p.id, '/products/apple/macbook-neo-13.jpg', 'MacBook Neo', 1, true
from products p where p.slug = 'macbook-neo'
on conflict (product_id, url) do nothing;

-- ---------------------------------------------------------------------------
-- MacBook Air (M5)
-- ---------------------------------------------------------------------------
insert into products (name, slug, brand_id, category_id, product_group, description, short_description, status, featured, new_arrival, base_price, currency, price_label)
select 'MacBook Air', 'macbook-air', b.id, c.id, 'APPLE',
  'MacBook Air''s M5 chip adds up to a 10-core GPU and 16-core Neural Engine.',
  'M5 chip · 13"/15" · up to 18hr battery',
  'published', true, false, 424900, 'LKR', 'starting_from'
from brands b, categories c where b.slug = 'apple' and c.slug = 'mac'
on conflict (slug) do nothing;

insert into product_variants (product_id, name, sku, storage, memory, screen_size, colour, chip, price, availability, sort_order)
select p.id, v.name, v.sku, v.storage, v.memory, v.screen, 'Sky Blue / Silver / Starlight / Midnight', 'M5', v.price, v.avail::availability, v.sort
from products p, (values
  ('13" · 16GB/512GB','MBA13-16-512','512GB','16GB','13"', 424900, 'in_stock', 1),
  ('13" · 24GB/1TB','MBA13-24-1TB','1TB','24GB','13"', null, 'available_on_request', 2),
  ('15" · 16GB/512GB','MBA15-16-512','512GB','16GB','15"', null, 'available_on_request', 3)
) as v(name, sku, storage, memory, screen, price, avail, sort)
where p.slug = 'macbook-air'
on conflict (sku) do nothing;

-- MacBook Air images: one photo per screen size (13"/15" share the same
-- body either way); the 13" shot is the product-level primary.
insert into product_images (product_id, variant_id, url, alt_text, sort_order, is_primary)
select p.id, v.id, '/products/apple/macbook-air-13.jpg', 'MacBook Air 13-inch', 1, true
from products p join product_variants v on v.product_id = p.id and v.sku = 'MBA13-16-512'
where p.slug = 'macbook-air'
on conflict (product_id, url) do nothing;
insert into product_images (product_id, variant_id, url, alt_text, sort_order, is_primary)
select p.id, v.id, '/products/apple/macbook-air-15.jpg', 'MacBook Air 15-inch', 2, false
from products p join product_variants v on v.product_id = p.id and v.sku = 'MBA15-16-512'
where p.slug = 'macbook-air'
on conflict (product_id, url) do nothing;

-- ---------------------------------------------------------------------------
-- MacBook Pro 14"
-- ---------------------------------------------------------------------------
insert into products (name, slug, brand_id, category_id, product_group, description, short_description, status, featured, new_arrival, base_price, currency, price_label)
select 'MacBook Pro 14"', 'macbook-pro-14', b.id, c.id, 'APPLE',
  'MacBook Pro 14" scales from the base M5 up through M5 Pro and M5 Max, with up to 24 hours of battery life.',
  'M5 / M5 Pro / M5 Max · 14.2" Liquid Retina XDR',
  'published', true, true, 599900, 'LKR', 'starting_from'
from brands b, categories c where b.slug = 'apple' and c.slug = 'mac'
on conflict (slug) do nothing;

insert into product_variants (product_id, name, sku, storage, memory, screen_size, colour, chip, price, availability, sort_order)
select p.id, v.name, v.sku, v.storage, v.memory, '14"', 'Space Black / Silver', v.chip, v.price, v.avail::availability, v.sort
from products p, (values
  ('M5 · 16GB/512GB','MBP14-M5-16-512','512GB','16GB','M5', 599900, 'in_stock', 1),
  ('M5 Pro · 24GB/512GB','MBP14-M5PRO-24-512','512GB','24GB','M5 Pro', null, 'available_on_request', 2),
  ('M5 Max · 36GB/1TB','MBP14-M5MAX-36-1TB','1TB','36GB','M5 Max', null, 'available_on_request', 3)
) as v(name, sku, storage, memory, chip, price, avail, sort)
where p.slug = 'macbook-pro-14'
on conflict (sku) do nothing;

-- MacBook Pro 14" images: one per chip tier; the base M5 shot is primary.
insert into product_images (product_id, variant_id, url, alt_text, sort_order, is_primary)
select p.id, v.id, '/products/apple/macbook-pro-14-m5.jpg', 'MacBook Pro 14" (M5)', 1, true
from products p join product_variants v on v.product_id = p.id and v.sku = 'MBP14-M5-16-512'
where p.slug = 'macbook-pro-14'
on conflict (product_id, url) do nothing;
insert into product_images (product_id, variant_id, url, alt_text, sort_order, is_primary)
select p.id, v.id, '/products/apple/macbook-pro-14-m5pro.jpg', 'MacBook Pro 14" (M5 Pro)', 2, false
from products p join product_variants v on v.product_id = p.id and v.sku = 'MBP14-M5PRO-24-512'
where p.slug = 'macbook-pro-14'
on conflict (product_id, url) do nothing;
insert into product_images (product_id, variant_id, url, alt_text, sort_order, is_primary)
select p.id, v.id, '/products/apple/macbook-pro-14-m5max.jpg', 'MacBook Pro 14" (M5 Max)', 3, false
from products p join product_variants v on v.product_id = p.id and v.sku = 'MBP14-M5MAX-36-1TB'
where p.slug = 'macbook-pro-14'
on conflict (product_id, url) do nothing;

-- ---------------------------------------------------------------------------
-- MacBook Pro 16"
-- ---------------------------------------------------------------------------
insert into products (name, slug, brand_id, category_id, product_group, description, short_description, status, featured, new_arrival, base_price, currency, price_label)
select 'MacBook Pro 16"', 'macbook-pro-16', b.id, c.id, 'APPLE',
  'The largest MacBook Pro, offered only with M5 Pro or M5 Max — no base M5 option.',
  'M5 Pro / M5 Max · 16.2" Liquid Retina XDR',
  'published', false, false, null, 'LKR', 'on_request'
from brands b, categories c where b.slug = 'apple' and c.slug = 'mac'
on conflict (slug) do nothing;

insert into product_variants (product_id, name, sku, storage, memory, screen_size, colour, chip, price, availability, sort_order)
select p.id, v.name, v.sku, v.storage, v.memory, '16"', 'Space Black / Silver', v.chip, null, 'available_on_request', v.sort
from products p, (values
  ('M5 Pro · 24GB/512GB','MBP16-M5PRO-24-512','512GB','24GB','M5 Pro',1),
  ('M5 Max · 36GB/1TB','MBP16-M5MAX-36-1TB','1TB','36GB','M5 Max',2)
) as v(name, sku, storage, memory, chip, sort)
where p.slug = 'macbook-pro-16'
on conflict (sku) do nothing;

-- MacBook Pro 16" images: one per chip tier; M5 Pro shot is primary (16"
-- is only sold with M5 Pro or M5 Max — no base M5 option).
insert into product_images (product_id, variant_id, url, alt_text, sort_order, is_primary)
select p.id, v.id, '/products/apple/macbook-pro-16-m5pro.jpg', 'MacBook Pro 16" (M5 Pro)', 1, true
from products p join product_variants v on v.product_id = p.id and v.sku = 'MBP16-M5PRO-24-512'
where p.slug = 'macbook-pro-16'
on conflict (product_id, url) do nothing;
insert into product_images (product_id, variant_id, url, alt_text, sort_order, is_primary)
select p.id, v.id, '/products/apple/macbook-pro-16-m5max.jpg', 'MacBook Pro 16" (M5 Max)', 2, false
from products p join product_variants v on v.product_id = p.id and v.sku = 'MBP16-M5MAX-36-1TB'
where p.slug = 'macbook-pro-16'
on conflict (product_id, url) do nothing;

-- ---------------------------------------------------------------------------
-- iPad, Apple Watch, AirPods & Accessories — promoted from "coming soon"
-- placeholders to live catalogue entries. Specs sourced from Apple's own
-- support/spec pages; LKR prices are directly-observed current listings
-- from Sri Lankan retailers (Celltronics.lk, LuxuryX.lk) as of 2026-08-24
-- where confirmed, `on_request` elsewhere — never an invented figure.
-- iMac is deliberately left out of this pass: no verified current-design
-- photo exists (only an older, discontinued model was available), so it
-- stays as-is rather than being promoted without a real image. The
-- generic "Apple Accessories" placeholder row is dropped outright now
-- that chargers/cables/Studio Display represent the category for real.
-- ---------------------------------------------------------------------------
insert into products (name, slug, brand_id, category_id, product_group, description, short_description, status, featured, new_arrival, base_price, currency, price_label)
select v.name, v.slug, b.id, c.id, 'APPLE', v.description, v.short, 'published', v.featured, false, v.base_price, 'LKR', v.price_label
from brands b, (values
  ('iPad Air', 'ipad-air', 'ipad',
    'iPad Air supports Apple Pencil Pro and Magic Keyboard for everyday creativity and productivity.',
    'M3 chip · 11"/13" Liquid Retina · Apple Pencil Pro', true, 339900::numeric, 'approx_market'),
  ('iPad mini', 'ipad-mini', 'ipad',
    'Apple''s most portable iPad, with Apple Intelligence and full Apple Pencil Pro support.',
    'A17 Pro chip · 8.3" display · Apple Pencil Pro', false, null, 'on_request'),
  ('iPad Pro', 'ipad-pro', 'ipad',
    'Apple''s most powerful iPad for professional workflows, with ProMotion and Face ID.',
    'M5 chip · OLED Ultra Retina XDR · Face ID', true, null, 'on_request'),
  ('Apple Watch SE 3', 'apple-watch-se-3', 'apple-watch',
    'Apple''s most accessible current Watch, with a more crack-resistant design.',
    'S10 chip · Always-On display · optional 5G cellular', false, null, 'on_request'),
  ('Apple Watch Series 11', 'apple-watch-series-11', 'apple-watch',
    'Apple Watch Series 11 — Apple''s current standard Watch, updated with 5G cellular and Hypertension notifications.',
    '5G cellular · Hypertension notifications · Always-On Retina', true, 127000::numeric, 'approx_market'),
  ('Apple Watch Ultra 3', 'apple-watch-ultra-3', 'apple-watch',
    'Apple''s most rugged Watch, built for extreme conditions.',
    'Titanium case · 3000-nit display · 5G cellular', false, null, 'on_request'),
  ('AirPods 4', 'airpods-4', 'airpods',
    'AirPods 4 pair the H2 chip with Adaptive Audio and Transparency mode in a USB-C charging case, available with or without Active Noise Cancellation.',
    'H2 chip · Adaptive Audio · USB-C case', true, 52900::numeric, 'approx_market'),
  ('Mac mini', 'mac-mini', 'mac',
    'Mac mini — Apple''s most compact desktop.',
    'M4 chip · Thunderbolt 4 · Compact desktop', false, null, 'on_request'),
  ('Mac Studio', 'mac-studio', 'mac',
    'Mac Studio scales from M4 Max to M3 Ultra for the most demanding creative and technical workloads.',
    'M4 Max or M3 Ultra · up to 96GB unified memory', true, null, 'on_request'),
  ('Studio Display', 'studio-display', 'apple-accessories',
    'Studio Display pairs with Mac via Thunderbolt/USB-C, with a 12MP Center Stage camera.',
    '27" 5K Retina · Center Stage camera · Thunderbolt', false, null, 'on_request'),
  ('20W USB-C Power Adapter', 'power-adapter-20w', 'apple-accessories',
    'Apple''s compact 20W USB-C Power Adapter delivers fast, efficient charging for iPhone, iPad and AirPods.',
    '20W USB-C · compact fast charger', false, null, 'on_request'),
  ('USB-C Charge Cable', 'usb-c-cable', 'apple-accessories',
    'A durable USB-C to USB-C charge cable for fast charging and data transfer between Apple devices.',
    'USB-C to USB-C · 1m', false, null, 'on_request')
) as v(name, slug, category_slug, description, short, featured, base_price, price_label)
join categories c on c.slug = v.category_slug
where b.slug = 'apple'
on conflict (slug) do nothing;

insert into product_images (product_id, url, alt_text, sort_order, is_primary)
select p.id, v.url, p.name, 1, true
from products p, (values
  ('ipad-air', '/products/apple/ipad-air.jpg'),
  ('ipad-mini', '/products/apple/ipad-mini.jpg'),
  ('ipad-pro', '/products/apple/ipad-pro.jpg'),
  ('apple-watch-se-3', '/products/apple/apple-watch-se-3.jpg'),
  ('apple-watch-series-11', '/products/apple/apple-watch-series-11.jpg'),
  ('apple-watch-ultra-3', '/products/apple/apple-watch-ultra-3.jpg'),
  ('airpods-4', '/products/apple/airpods-4.jpg'),
  ('mac-mini', '/products/apple/mac-mini.jpg'),
  ('mac-studio', '/products/apple/mac-studio.jpg'),
  ('studio-display', '/products/apple/studio-display.jpg'),
  ('power-adapter-20w', '/products/apple/power-adapter-20w.jpg'),
  ('usb-c-cable', '/products/apple/usb-c-cable.jpg')
) as v(slug, url)
where p.slug = v.slug
on conflict (product_id, url) do nothing;

insert into product_variants (product_id, name, sku, storage, colour, price, availability, sort_order)
select p.id, v.name, v.sku, v.storage, v.colour, v.price, v.avail::availability, v.sort
from products p, (
  values
    ('ipad-air', '11" · 128GB · Wi-Fi', 'IPADAIR-11-128-WIFI', '128GB (11")', 'Space Grey / Blue / Purple / Starlight', null, 'available_on_request', 1),
    ('ipad-air', '11" · 256GB · Wi-Fi + Cellular', 'IPADAIR-11-256-CELL', '256GB (11", Cellular)', 'Space Grey / Blue / Purple / Starlight', 339900, 'in_stock', 2),
    ('ipad-air', '13" · 256GB · Wi-Fi', 'IPADAIR-13-256-WIFI', '256GB (13")', 'Space Grey / Blue / Purple / Starlight', null, 'available_on_request', 3)
) as v(slug, name, sku, storage, colour, price, avail, sort)
where p.slug = v.slug
on conflict (sku) do nothing;

insert into product_variants (product_id, name, sku, storage, colour, price, availability, sort_order)
select p.id, v.name, v.sku, v.storage, v.colour, v.price, v.avail::availability, v.sort
from products p, (
  values
    ('ipad-mini', '128GB · Wi-Fi', 'IPADMINI-128', '128GB', 'Space Grey / Blue / Purple / Starlight', null, 'available_on_request', 1),
    ('ipad-mini', '256GB · Wi-Fi', 'IPADMINI-256', '256GB', 'Space Grey / Blue / Purple / Starlight', null, 'available_on_request', 2),
    ('ipad-mini', '512GB · Wi-Fi', 'IPADMINI-512', '512GB', 'Space Grey / Blue / Purple / Starlight', null, 'available_on_request', 3)
) as v(slug, name, sku, storage, colour, price, avail, sort)
where p.slug = v.slug
on conflict (sku) do nothing;

insert into product_variants (product_id, name, sku, storage, colour, price, availability, sort_order)
select p.id, v.name, v.sku, v.storage, v.colour, v.price, v.avail::availability, v.sort
from products p, (
  values
    ('ipad-pro', '11" · 256GB', 'IPADPRO-11-256', '256GB (11")', 'Space Black / Silver', null, 'available_on_request', 1),
    ('ipad-pro', '13" · 256GB', 'IPADPRO-13-256', '256GB (13")', 'Space Black / Silver', null, 'available_on_request', 2)
) as v(slug, name, sku, storage, colour, price, avail, sort)
where p.slug = v.slug
on conflict (sku) do nothing;

insert into product_variants (product_id, name, sku, colour, price, availability, sort_order)
select p.id, v.name, v.sku, v.colour, v.price, v.avail::availability, v.sort
from products p, (
  values
    ('apple-watch-se-3', '40mm', 'AWSE3-40', 'Midnight / Starlight / Silver', null, 'available_on_request', 1),
    ('apple-watch-se-3', '44mm', 'AWSE3-44', 'Midnight / Starlight / Silver', null, 'available_on_request', 2)
) as v(slug, name, sku, colour, price, avail, sort)
where p.slug = v.slug
on conflict (sku) do nothing;

insert into product_variants (product_id, name, sku, colour, price, availability, sort_order)
select p.id, v.name, v.sku, v.colour, v.price, v.avail::availability, v.sort
from products p, (
  values
    ('apple-watch-series-11', '42mm', 'AWS11-42', 'Jet Black / Silver / Rose Gold', null, 'available_on_request', 1),
    ('apple-watch-series-11', '46mm', 'AWS11-46', 'Jet Black / Silver / Rose Gold', 127000, 'in_stock', 2)
) as v(slug, name, sku, colour, price, avail, sort)
where p.slug = v.slug
on conflict (sku) do nothing;

insert into product_variants (product_id, name, sku, colour, price, availability, sort_order)
select p.id, v.name, v.sku, v.colour, v.price, v.avail::availability, v.sort
from products p, (
  values
    ('apple-watch-ultra-3', '49mm', 'AWU3-49', 'Natural Titanium / Black Titanium', null, 'available_on_request', 1)
) as v(slug, name, sku, colour, price, avail, sort)
where p.slug = v.slug
on conflict (sku) do nothing;

insert into product_variants (product_id, name, sku, colour, price, availability, sort_order)
select p.id, v.name, v.sku, v.colour, v.price, v.avail::availability, v.sort
from products p, (
  values
    ('airpods-4', 'Standard', 'AP4-STD', 'White', null, 'available_on_request', 1),
    ('airpods-4', 'With Active Noise Cancellation', 'AP4-ANC', 'White', 52900, 'in_stock', 2)
) as v(slug, name, sku, colour, price, avail, sort)
where p.slug = v.slug
on conflict (sku) do nothing;

insert into product_variants (product_id, name, sku, memory, storage, chip, price, availability, sort_order)
select p.id, v.name, v.sku, v.memory, v.storage, v.chip, v.price, v.avail::availability, v.sort
from products p, (
  values
    ('mac-mini', 'M4 · 16GB · 512GB', 'MACMINI-M4-16-512', '16GB', '512GB', 'M4', null, 'available_on_request', 1),
    ('mac-mini', 'M4 Pro · 24GB · 512GB', 'MACMINI-M4PRO-24-512', '24GB', '512GB', 'M4 Pro', null, 'available_on_request', 2)
) as v(slug, name, sku, memory, storage, chip, price, avail, sort)
where p.slug = v.slug
on conflict (sku) do nothing;

insert into product_variants (product_id, name, sku, memory, storage, chip, price, availability, sort_order)
select p.id, v.name, v.sku, v.memory, v.storage, v.chip, v.price, v.avail::availability, v.sort
from products p, (
  values
    ('mac-studio', 'M4 Max · 36GB · 512GB', 'MACSTUDIO-M4MAX-36-512', '36GB', '512GB', 'M4 Max', null, 'available_on_request', 1),
    ('mac-studio', 'M3 Ultra · 96GB · 1TB', 'MACSTUDIO-M3ULTRA-96-1TB', '96GB', '1TB', 'M3 Ultra', null, 'available_on_request', 2)
) as v(slug, name, sku, memory, storage, chip, price, avail, sort)
where p.slug = v.slug
on conflict (sku) do nothing;

-- Single-SKU accessories still need one variant row each, since the
-- availability badge reads variants[0] — without one they'd default to
-- "coming soon" even though the product itself is a live, real listing.
insert into product_variants (product_id, name, sku, price, availability, sort_order)
select p.id, v.name, v.sku, v.price, v.avail::availability, v.sort
from products p, (
  values
    ('studio-display', 'Standard', 'STUDIODISPLAY', null, 'available_on_request', 1),
    ('power-adapter-20w', 'Standard', 'POWERADAPTER20W', null, 'available_on_request', 1),
    ('usb-c-cable', 'Standard', 'USBCCABLE', null, 'available_on_request', 1)
) as v(slug, name, sku, price, avail, sort)
where p.slug = v.slug
on conflict (sku) do nothing;
