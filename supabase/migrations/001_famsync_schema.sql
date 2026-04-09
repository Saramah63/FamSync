create extension if not exists "pgcrypto";

create type family_role as enum ('parent', 'co-parent', 'caregiver');
create type event_type as enum ('school', 'hobby', 'doctor', 'family', 'task');
create type event_status as enum ('scheduled', 'updated', 'cancelled', 'completed');
create type notification_type as enum ('event_created', 'event_updated', 'event_conflict', 'event_reminder');
create type invite_status as enum ('pending', 'accepted');
create type change_type as enum ('created', 'edited', 'cancelled', 'reassigned');

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.families (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_by uuid not null references public.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.family_members (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.families(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  role family_role not null default 'parent',
  unique (family_id, user_id)
);

create table if not exists public.family_invites (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.families(id) on delete cascade,
  email text not null,
  invited_by uuid not null references public.users(id) on delete cascade,
  status invite_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists public.children (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.families(id) on delete cascade,
  name text not null,
  birth_year integer not null,
  color_tag text not null,
  avatar text,
  created_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.families(id) on delete cascade,
  child_id uuid references public.children(id) on delete set null,
  title text not null,
  description text not null default '',
  event_type event_type not null,
  date date not null,
  start_time time not null,
  end_time time not null,
  location text not null default '',
  assigned_user_id uuid references public.users(id) on delete set null,
  created_by uuid not null references public.users(id) on delete cascade,
  updated_by uuid not null references public.users(id) on delete cascade,
  reminder_minutes_before integer not null default 30,
  recurrence_rule text,
  status event_status not null default 'scheduled',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.event_changes (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  changed_by uuid not null references public.users(id) on delete cascade,
  change_type change_type not null,
  previous_value_json jsonb not null default '{}'::jsonb,
  new_value_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  family_id uuid not null references public.families(id) on delete cascade,
  type notification_type not null,
  title text not null,
  body text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_events_family_date on public.events (family_id, date, start_time);
create index if not exists idx_events_assigned_user on public.events (assigned_user_id, date);
create index if not exists idx_notifications_user on public.notifications (user_id, is_read, created_at desc);
create index if not exists idx_event_changes_event on public.event_changes (event_id, created_at desc);
