-- ---------------------------------------------------------------------------
-- 0009: Sales tracker + invoice generator (admin only)
--
-- Five private tables (phone sales, accessory sales, expenses, invoices and a
-- single-row settings table). Every table is RLS-locked to admins: there is no
-- public read and nothing for anon, because the rows hold customer names,
-- phone numbers and IMEIs.
-- ---------------------------------------------------------------------------

-- Invoices come first because both sales tables reference them.
create table invoices (
  id uuid primary key default gen_random_uuid(),
  invoice_no text unique not null,
  invoice_date date not null,
  due_date date,
  customer_name text,
  customer_phone text,
  customer_email text,
  customer_address text,
  items jsonb not null default '[]'::jsonb,
  discount numeric(12,2) not null default 0,
  tax_percent numeric(6,2) not null default 0,
  total numeric(12,2) not null,
  payment_method text,
  notes text,
  sale_kind text check (sale_kind in ('phone', 'accessory')),
  sale_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id) default auth.uid()
);

create table phone_sales (
  id uuid primary key default gen_random_uuid(),
  sale_date date not null,
  model text not null,
  storage text,
  colour text,
  model_no text,
  serial_no text,
  imei text,
  customer_name text,
  customer_phone text,
  customer_address text,
  customer_email text,
  supplier text,
  cost_price numeric(12,2) not null,
  selling_price numeric(12,2) not null,
  profit numeric(12,2) generated always as (selling_price - cost_price) stored,
  payment_method text,
  notes text,
  invoice_id uuid references invoices(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id) default auth.uid()
);

create table accessory_sales (
  id uuid primary key default gen_random_uuid(),
  sale_date date not null,
  name text not null,
  type text,
  qty integer not null check (qty >= 1),
  customer_name text,
  customer_phone text,
  supplier text,
  unit_cost numeric(12,2) not null,
  unit_price numeric(12,2) not null,
  total_cost numeric(12,2) generated always as (qty * unit_cost) stored,
  total_sale numeric(12,2) generated always as (qty * unit_price) stored,
  profit numeric(12,2) generated always as (qty * unit_price - qty * unit_cost) stored,
  payment_method text,
  notes text,
  invoice_id uuid references invoices(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id) default auth.uid()
);

create table business_expenses (
  id uuid primary key default gen_random_uuid(),
  expense_date date not null,
  category text not null,
  description text,
  paid_to text,
  amount numeric(12,2) not null,
  payment_method text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id) default auth.uid()
);

-- A single-row settings table (id is pinned to 1).
create table tracker_settings (
  id int primary key default 1 check (id = 1),
  address text,
  phone text,
  email text,
  footer text,
  terms text,
  bank_details text,
  invoice_prefix text not null default 'INV-',
  next_invoice_number int not null default 61,
  bank_charge_percent numeric(6,2) not null default 3,
  suppliers text[] not null default '{}',
  payment_methods text[] not null default '{}',
  accessory_types text[] not null default '{}',
  expense_categories text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id) default auth.uid()
);

-- Seed defaults mirror DEFAULT_SETTINGS in the reference app. The last real
-- invoice issued was INV-0060, so numbering continues at INV-0061.
insert into tracker_settings (
  id, address, phone, email, footer, terms, bank_details, invoice_prefix,
  next_invoice_number, bank_charge_percent, suppliers, payment_methods,
  accessory_types, expense_categories
) values (
  1,
  'Colombo, Sri Lanka',
  '+94 76 661 5623',
  'support@primetechnology.lk',
  'Prime Tech Colombo • Technology that fits your world',
  E'Thank you for choosing Prime Tech Colombo.\n\nOne-year manufacturer''s warranty is applicable from the date of purchase. In the event of any manufacturing defect or warranty claim, the customer will be responsible for all applicable courier and transportation charges.',
  '',
  'INV-',
  61,
  3,
  '{}',
  array['Cash', 'Bank Transfer', 'Card Payment', 'Card Payment - 12 Months Installment', 'Card Payment - 24 Months Installment', 'Koko / Mintpay', 'Credit (Pay Later)'],
  array['Back Cover / Case', 'Screen Protector', 'Charger / Adapter', 'Cable', 'Earbuds / Headphones', 'Power Bank', 'Smart Watch', 'Memory Card', 'Phone Stand / Holder', 'Other'],
  array['Shop Rent', 'Transport / Delivery', 'Advertising / Social Media', 'Staff / Salary', 'Utilities (Power, Water, Internet)', 'Repairs & Parts', 'Packaging', 'Other']
);

-- updated_at triggers (set_updated_at() comes from 0001)
create trigger invoices_set_updated_at before update on invoices
  for each row execute procedure set_updated_at();
create trigger phone_sales_set_updated_at before update on phone_sales
  for each row execute procedure set_updated_at();
create trigger accessory_sales_set_updated_at before update on accessory_sales
  for each row execute procedure set_updated_at();
create trigger business_expenses_set_updated_at before update on business_expenses
  for each row execute procedure set_updated_at();
create trigger tracker_settings_set_updated_at before update on tracker_settings
  for each row execute procedure set_updated_at();

-- Indexes on the columns the lists and the dashboard filter / sort by.
create index phone_sales_sale_date_idx on phone_sales (sale_date desc);
create index phone_sales_invoice_id_idx on phone_sales (invoice_id);
create index accessory_sales_sale_date_idx on accessory_sales (sale_date desc);
create index accessory_sales_invoice_id_idx on accessory_sales (invoice_id);
create index business_expenses_expense_date_idx on business_expenses (expense_date desc);
create index invoices_invoice_date_idx on invoices (invoice_date desc);

-- ---------------------------------------------------------------------------
-- RLS: admins only. No public read, nothing for anon.
-- ---------------------------------------------------------------------------
alter table invoices enable row level security;
alter table phone_sales enable row level security;
alter table accessory_sales enable row level security;
alter table business_expenses enable row level security;
alter table tracker_settings enable row level security;

create policy "invoices_admin_all" on invoices
  for all using (is_admin()) with check (is_admin());
create policy "phone_sales_admin_all" on phone_sales
  for all using (is_admin()) with check (is_admin());
create policy "accessory_sales_admin_all" on accessory_sales
  for all using (is_admin()) with check (is_admin());
create policy "business_expenses_admin_all" on business_expenses
  for all using (is_admin()) with check (is_admin());
create policy "tracker_settings_admin_all" on tracker_settings
  for all using (is_admin()) with check (is_admin());

-- Belt and braces: the anon role gets no table privileges at all.
revoke all on invoices, phone_sales, accessory_sales, business_expenses, tracker_settings from anon;

-- ---------------------------------------------------------------------------
-- Atomic invoice numbers. Locks the settings row, so two people saving at the
-- same moment can never be handed the same number.
-- ---------------------------------------------------------------------------
create function claim_invoice_number()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  s tracker_settings;
  n int;
  candidate text;
begin
  if not is_admin() then
    raise exception 'Not authorised';
  end if;

  select * into s from tracker_settings where id = 1 for update;
  if not found then
    raise exception 'Sales settings are missing';
  end if;

  n := s.next_invoice_number;
  loop
    candidate := s.invoice_prefix || lpad(n::text, 4, '0');
    exit when not exists (select 1 from invoices where invoice_no = candidate);
    n := n + 1;
  end loop;

  update tracker_settings set next_invoice_number = n + 1 where id = 1;
  return candidate;
end;
$$;

revoke all on function claim_invoice_number() from public, anon;
grant execute on function claim_invoice_number() to authenticated;

-- ---------------------------------------------------------------------------
-- Dashboard aggregation (SQL, so the browser never receives every row).
-- SECURITY INVOKER: RLS applies, so a non-admin gets an error / nothing.
-- p_from / p_to bound the period (null = unbounded); p_year drives the
-- profit-by-month chart.
-- ---------------------------------------------------------------------------
create function sales_dashboard(p_from date, p_to date, p_year int)
returns jsonb
language plpgsql
stable
set search_path = public
as $$
declare
  result jsonb;
begin
  if not is_admin() then
    raise exception 'Not authorised';
  end if;

  with
  ph as (
    select * from phone_sales
    where (p_from is null or sale_date >= p_from) and (p_to is null or sale_date <= p_to)
  ),
  ac as (
    select * from accessory_sales
    where (p_from is null or sale_date >= p_from) and (p_to is null or sale_date <= p_to)
  ),
  ex as (
    select * from business_expenses
    where (p_from is null or expense_date >= p_from) and (p_to is null or expense_date <= p_to)
  ),
  months as (
    select m as month,
      coalesce((select sum(profit) from phone_sales
                where extract(year from sale_date) = p_year and extract(month from sale_date) = m), 0) as phone_profit,
      coalesce((select sum(profit) from accessory_sales
                where extract(year from sale_date) = p_year and extract(month from sale_date) = m), 0) as acc_profit,
      coalesce((select sum(amount) from business_expenses
                where extract(year from expense_date) = p_year and extract(month from expense_date) = m), 0) as expenses
    from generate_series(1, 12) as m
  ),
  recent as (
    select * from (
      select 'phone'::text as kind, id, sale_date as date, created_at,
             concat_ws(' ', model, storage) || coalesce(' – ' || nullif(colour, ''), '') as title,
             customer_name as who, selling_price as amount, profit
      from phone_sales
      union all
      select 'accessory', id, sale_date, created_at,
             case when qty > 1 then qty::text || ' × ' || name else name end,
             customer_name, total_sale, profit
      from accessory_sales
    ) r
    order by date desc, created_at desc
    limit 6
  ),
  models as (
    select coalesce(nullif(trim(model), ''), 'Unknown') as model, count(*) as n, sum(profit) as profit
    from ph group by 1 order by n desc, profit desc limit 5
  ),
  suppliers as (
    select supplier, sum(spent) as spent, sum(profit) as profit from (
      select coalesce(nullif(trim(supplier), ''), 'Not set') as supplier, cost_price as spent, profit from ph
      union all
      select coalesce(nullif(trim(supplier), ''), 'Not set'), total_cost, profit from ac
    ) s group by supplier order by spent desc limit 5
  ),
  cats as (
    select coalesce(nullif(trim(category), ''), 'Other') as category, sum(amount) as total
    from ex group by 1 order by total desc limit 6
  ),
  yrs as (
    select distinct y from (
      select extract(year from sale_date)::int as y from phone_sales
      union select extract(year from sale_date)::int from accessory_sales
      union select extract(year from expense_date)::int from business_expenses
      union select extract(year from now())::int
    ) q order by y desc
  )
  select jsonb_build_object(
    'phone_count', (select count(*) from ph),
    'phone_income', (select coalesce(sum(selling_price), 0) from ph),
    'phone_profit', (select coalesce(sum(profit), 0) from ph),
    'acc_qty', (select coalesce(sum(qty), 0) from ac),
    'acc_income', (select coalesce(sum(total_sale), 0) from ac),
    'acc_profit', (select coalesce(sum(profit), 0) from ac),
    'expense_total', (select coalesce(sum(amount), 0) from ex),
    'expense_count', (select count(*) from ex),
    'monthly', (select coalesce(jsonb_agg(jsonb_build_object(
        'month', month, 'phone_profit', phone_profit, 'acc_profit', acc_profit, 'expenses', expenses
      ) order by month), '[]'::jsonb) from months),
    'recent', (select coalesce(jsonb_agg(to_jsonb(recent) order by date desc, created_at desc), '[]'::jsonb) from recent),
    'top_models', (select coalesce(jsonb_agg(to_jsonb(models) order by n desc, profit desc), '[]'::jsonb) from models),
    'suppliers', (select coalesce(jsonb_agg(to_jsonb(suppliers) order by spent desc), '[]'::jsonb) from suppliers),
    'expense_categories', (select coalesce(jsonb_agg(to_jsonb(cats) order by total desc), '[]'::jsonb) from cats),
    'years', (select coalesce(jsonb_agg(y order by y desc), '[]'::jsonb) from yrs)
  ) into result;

  return result;
end;
$$;

revoke all on function sales_dashboard(date, date, int) from public, anon;
grant execute on function sales_dashboard(date, date, int) to authenticated;

-- ---------------------------------------------------------------------------
-- Summary strip for the list pages (count / sales / cost / profit) over the
-- same search the list uses, so the numbers match the rows underneath.
-- ---------------------------------------------------------------------------
create function sales_list_summary(p_kind text, p_q text default '')
returns jsonb
language plpgsql
stable
set search_path = public
as $$
declare
  pat text := '%' || coalesce(trim(p_q), '') || '%';
  result jsonb;
begin
  if not is_admin() then
    raise exception 'Not authorised';
  end if;

  if p_kind = 'phones' then
    select jsonb_build_object('count', count(*), 'sales', coalesce(sum(selling_price), 0),
                              'cost', coalesce(sum(cost_price), 0), 'profit', coalesce(sum(profit), 0))
    into result from phone_sales
    where p_q is null or trim(p_q) = '' or model ilike pat or storage ilike pat or customer_name ilike pat
       or customer_phone ilike pat or imei ilike pat or serial_no ilike pat or supplier ilike pat;
  elsif p_kind = 'accessories' then
    select jsonb_build_object('count', count(*), 'items', coalesce(sum(qty), 0), 'sales', coalesce(sum(total_sale), 0),
                              'cost', coalesce(sum(total_cost), 0), 'profit', coalesce(sum(profit), 0))
    into result from accessory_sales
    where p_q is null or trim(p_q) = '' or name ilike pat or type ilike pat or customer_name ilike pat
       or customer_phone ilike pat or supplier ilike pat;
  elsif p_kind = 'expenses' then
    select jsonb_build_object('count', count(*), 'total', coalesce(sum(amount), 0))
    into result from business_expenses
    where p_q is null or trim(p_q) = '' or category ilike pat or description ilike pat or paid_to ilike pat;
  elsif p_kind = 'invoices' then
    select jsonb_build_object('count', count(*), 'total', coalesce(sum(total), 0))
    into result from invoices
    where p_q is null or trim(p_q) = '' or invoice_no ilike pat or customer_name ilike pat or customer_phone ilike pat;
  else
    raise exception 'Unknown list %', p_kind;
  end if;

  return result;
end;
$$;

revoke all on function sales_list_summary(text, text) from public, anon;
grant execute on function sales_list_summary(text, text) to authenticated;

-- ---------------------------------------------------------------------------
-- Autocomplete suggestions built from past entries.
-- ---------------------------------------------------------------------------
create function sales_suggestions()
returns jsonb
language plpgsql
stable
set search_path = public
as $$
begin
  if not is_admin() then
    raise exception 'Not authorised';
  end if;

  return jsonb_build_object(
    'models', (select coalesce(jsonb_agg(v), '[]'::jsonb) from (
      select distinct trim(model) as v from phone_sales where trim(coalesce(model, '')) <> '' order by 1 limit 300) q),
    'storages', (select coalesce(jsonb_agg(v), '[]'::jsonb) from (
      select distinct trim(storage) as v from phone_sales where trim(coalesce(storage, '')) <> '' order by 1 limit 100) q),
    'customers', (select coalesce(jsonb_agg(v), '[]'::jsonb) from (
      select distinct v from (
        select trim(customer_name) as v from phone_sales
        union select trim(customer_name) from accessory_sales
      ) c where coalesce(v, '') <> '' order by 1 limit 500) q),
    'suppliers', (select coalesce(jsonb_agg(v), '[]'::jsonb) from (
      select distinct v from (
        select trim(supplier) as v from phone_sales
        union select trim(supplier) from accessory_sales
      ) c where coalesce(v, '') <> '' order by 1 limit 200) q),
    'accessories', (select coalesce(jsonb_agg(v), '[]'::jsonb) from (
      select distinct trim(name) as v from accessory_sales where trim(coalesce(name, '')) <> '' order by 1 limit 300) q)
  );
end;
$$;

revoke all on function sales_suggestions() from public, anon;
grant execute on function sales_suggestions() to authenticated;
