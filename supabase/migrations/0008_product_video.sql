-- Product video support. One video per product (not a sequence like 360°
-- frames), so plain nullable columns on `products` rather than a new table —
-- matches the `iphone18_packages.image_url` precedent. Poster image reuses
-- the existing `product-images` bucket/action (it's a plain JPEG); the video
-- itself needs its own bucket since it's a different mime type and a much
-- larger size cap than the 5MB image limit.

alter table products add column if not exists video_url text;
alter table products add column if not exists video_poster_url text;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-videos', 'product-videos', true, 52428800, array['video/mp4', 'video/webm'])
on conflict (id) do nothing;

create policy "product_videos_public_read" on storage.objects for select
  using (bucket_id = 'product-videos');

create policy "product_videos_admin_insert" on storage.objects for insert
  with check (bucket_id = 'product-videos' and is_admin());

create policy "product_videos_admin_update" on storage.objects for update
  using (bucket_id = 'product-videos' and is_admin());

create policy "product_videos_admin_delete" on storage.objects for delete
  using (bucket_id = 'product-videos' and is_admin());
