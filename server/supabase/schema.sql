-- Run this in the Supabase SQL editor (Project > SQL Editor > New query).

create extension if not exists "pgcrypto";

create table if not exists public.preps (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null check (category in ('Syrup', 'Puree', 'Juice', 'Garnish', 'BatchCocktail', 'Other')),
  area text not null default 'Bar Principal',
  responsible text not null,
  made_at date not null,
  expires_at date not null,
  lifecycle_status text not null default 'active' check (lifecycle_status in ('active', 'consumed', 'discarded')),
  quantity numeric,
  unit text,
  notes text,
  created_by uuid references auth.users (id) default auth.uid(),
  created_at timestamptz not null default now()
);

create index if not exists preps_expires_at_idx on public.preps (expires_at);
create index if not exists preps_lifecycle_status_idx on public.preps (lifecycle_status);

alter table public.preps enable row level security;

create policy "Authenticated users can read preps"
  on public.preps for select
  to authenticated
  using (true);

create policy "Authenticated users can create preps"
  on public.preps for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update preps"
  on public.preps for update
  to authenticated
  using (true)
  with check (true);

create table if not exists public.stock_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  current_quantity numeric not null default 0,
  minimum_quantity numeric not null default 0,
  unit text not null,
  created_by uuid references auth.users (id) default auth.uid(),
  created_at timestamptz not null default now()
);

create index if not exists stock_items_name_idx on public.stock_items (name);

alter table public.stock_items enable row level security;

create policy "Authenticated users can read stock items"
  on public.stock_items for select
  to authenticated
  using (true);

create policy "Authenticated users can create stock items"
  on public.stock_items for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update stock items"
  on public.stock_items for update
  to authenticated
  using (true)
  with check (true);
