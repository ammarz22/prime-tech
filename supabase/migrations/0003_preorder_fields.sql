-- Extends `enquiries` to support the iPhone 18 pre-order / register-interest
-- flow, which captures a preferred model/storage/colour even though no
-- iPhone 18 product row exists (it's deliberately not modelled as a
-- catalogue product — see the pre-order page). Also persists
-- `configuration`, which the enquiry schema already accepted but the insert
-- silently dropped before this migration.
alter table enquiries
  add column if not exists configuration text,
  add column if not exists preferred_model text,
  add column if not exists preferred_storage text,
  add column if not exists preferred_colour text,
  add column if not exists consent boolean not null default false;
