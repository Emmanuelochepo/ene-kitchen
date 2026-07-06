-- Ene's Kitchen — Orders table
-- Run this in your Supabase dashboard:
-- https://supabase.com/dashboard/project/fdelhkwzyyszwyplrpht/sql/new

create table if not exists orders (
  id            uuid primary key default gen_random_uuid(),
  ref           text not null unique,
  status        text not null default 'pending',  -- pending | confirmed | preparing | delivered
  payment_method text not null,                   -- paystack | bank-transfer

  -- Customer
  customer_name    text not null,
  customer_phone   text not null,
  customer_email   text,
  delivery_address text not null,
  note             text,

  -- Financials (in kobo/naira as integers to avoid float issues)
  subtotal      integer not null,
  delivery_fee  integer not null default 1500,
  total         integer not null,

  -- Items snapshot (JSON array)
  items         jsonb not null,

  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Auto-update updated_at on row changes
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger orders_updated_at
  before update on orders
  for each row execute procedure update_updated_at();

-- Row Level Security — allow anon to insert orders (place order)
-- and read their own order by ref (for status page later)
alter table orders enable row level security;

create policy "Anyone can place an order"
  on orders for insert
  to anon
  with check (true);

create policy "Anyone can read order by ref"
  on orders for select
  to anon
  using (true);

-- Index for quick lookup by ref
create index if not exists orders_ref_idx on orders (ref);
create index if not exists orders_status_idx on orders (status);
create index if not exists orders_created_at_idx on orders (created_at desc);
