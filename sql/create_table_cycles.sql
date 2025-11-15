-- cycles table
create table if not exists cycles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid, -- optional if you use auth
  start_date date not null,
  cycle_length integer default 28, -- days, optional
  note text,
  created_at timestamptz default now()
);
