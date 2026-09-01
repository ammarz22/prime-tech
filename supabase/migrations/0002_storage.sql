-- Prime Tech — product image storage.
-- Creates a public "product-images" bucket for admin-uploaded photos, with
-- RLS so anyone can view images but only admins can upload/replace/delete.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-images', 'product-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

create policy "product_images_public_read" on storage.objects for select
  using (bucket_id = 'product-images');

create policy "product_images_admin_insert" on storage.objects for insert
  with check (bucket_id = 'product-images' and is_admin());

create policy "product_images_admin_update" on storage.objects for update
  using (bucket_id = 'product-images' and is_admin());

create policy "product_images_admin_delete" on storage.objects for delete
  using (bucket_id = 'product-images' and is_admin());
