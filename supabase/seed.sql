-- Prime Tech — reference/seed data.
-- Safe to re-run: uses upsert-style inserts keyed on unique slugs.
-- Product catalog seed lives in seed_products.sql (Apple) and is generated
-- separately once specs/pricing are verified.

-- ---------------------------------------------------------------------------
-- Brands
-- ---------------------------------------------------------------------------
insert into brands (name, slug) values
  ('Apple', 'apple'),
  ('Samsung', 'samsung'),
  ('Sony', 'sony'),
  ('JBL', 'jbl'),
  ('Anker', 'anker')
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- Categories
-- ---------------------------------------------------------------------------
insert into categories (name, slug, sort_order) values
  ('iPhone', 'iphone', 10),
  ('Mac', 'mac', 11),
  ('iPad', 'ipad', 12),
  ('Apple Watch', 'apple-watch', 13),
  ('AirPods', 'airpods', 14),
  ('Apple Accessories', 'apple-accessories', 15),
  ('Galaxy S25 Series', 'galaxy-s25', 20),
  ('Galaxy S26 Series', 'galaxy-s26', 21)
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- Branches — PLACEHOLDER records only. Replace with real Prime Tech branch
-- details before going live; nothing here is a real address or phone number.
-- ---------------------------------------------------------------------------
insert into branches (name, slug, address, city, phone, whatsapp, hours, maps_url, services, status) values
  (
    'Prime Tech — Colombo (Main Branch)',
    'colombo-main',
    'Address to be confirmed, Colombo',
    'Colombo',
    null,
    null,
    '{"mon_fri": "9:00 AM - 7:00 PM", "sat": "9:00 AM - 6:00 PM", "sun": "Closed"}',
    null,
    array['Device Consultation', 'Device Setup', 'Technical Support'],
    'coming_soon'
  )
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- Site settings — all placeholders. Configure real values in Supabase or
-- via the admin dashboard once available.
-- ---------------------------------------------------------------------------
insert into site_settings (key, value) values
  ('whatsapp_number', null),
  ('phone', null),
  ('email', null),
  ('address', null),
  ('instagram_url', null),
  ('facebook_url', null),
  ('tiktok_url', null),
  ('linkedin_url', null)
on conflict (key) do nothing;
