insert into public.users (id, name, email)
values
  ('11111111-1111-1111-1111-111111111111', 'Sara', 'sara@famsync.app'),
  ('22222222-2222-2222-2222-222222222222', 'Mika', 'mika@famsync.app')
on conflict (id) do nothing;

insert into public.families (id, name, created_by)
values ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Nordlund Family', '11111111-1111-1111-1111-111111111111')
on conflict (id) do nothing;

insert into public.family_members (id, family_id, user_id, role)
values
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'parent'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb2', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '22222222-2222-2222-2222-222222222222', 'co-parent')
on conflict (family_id, user_id) do nothing;

insert into public.family_invites (id, family_id, email, invited_by, status)
values ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'mika@famsync.app', '11111111-1111-1111-1111-111111111111', 'accepted')
on conflict (id) do nothing;

insert into public.children (id, family_id, name, birth_year, color_tag)
values
  ('dddddddd-dddd-dddd-dddd-dddddddddd01', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Ella', 2016, '#FDB63F'),
  ('dddddddd-dddd-dddd-dddd-dddddddddd02', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Leo', 2019, '#4A90E2')
on conflict (id) do nothing;

insert into public.events (
  id,
  family_id,
  child_id,
  title,
  description,
  event_type,
  date,
  start_time,
  end_time,
  location,
  assigned_user_id,
  created_by,
  updated_by,
  reminder_minutes_before,
  recurrence_rule,
  status
)
values
  (
    'eeeeeeee-eeee-eeee-eeee-eeeeeeeeee01',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'dddddddd-dddd-dddd-dddd-dddddddddd01',
    'Piano lesson',
    'Bring practice notebook and payment card.',
    'hobby',
    current_date,
    '15:30',
    '16:15',
    'Helsinki Music House',
    '22222222-2222-2222-2222-222222222222',
    '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222',
    60,
    'FREQ=WEEKLY;BYDAY=TH',
    'updated'
  ),
  (
    'eeeeeeee-eeee-eeee-eeee-eeeeeeeeee02',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'dddddddd-dddd-dddd-dddd-dddddddddd02',
    'Daycare pickup',
    'Take indoor shoes and art folder home.',
    'task',
    current_date,
    '17:00',
    '17:20',
    'Little Pines Daycare',
    '11111111-1111-1111-1111-111111111111',
    '11111111-1111-1111-1111-111111111111',
    '11111111-1111-1111-1111-111111111111',
    30,
    'FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR',
    'scheduled'
  ),
  (
    'eeeeeeee-eeee-eeee-eeee-eeeeeeeeee03',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'dddddddd-dddd-dddd-dddd-dddddddddd01',
    'Dentist check-up',
    'Check if Mika can leave work early.',
    'doctor',
    current_date + interval '1 day',
    '09:00',
    '10:00',
    'City Dental',
    null,
    '11111111-1111-1111-1111-111111111111',
    '11111111-1111-1111-1111-111111111111',
    1440,
    null,
    'scheduled'
  )
on conflict (id) do nothing;

insert into public.event_changes (id, event_id, changed_by, change_type, previous_value_json, new_value_json)
values
  (
    'ffffffff-ffff-ffff-ffff-fffffffffff1',
    'eeeeeeee-eeee-eeee-eeee-eeeeeeeeee01',
    '22222222-2222-2222-2222-222222222222',
    'edited',
    '{"start_time":"16:00"}',
    '{"start_time":"15:30"}'
  ),
  (
    'ffffffff-ffff-ffff-ffff-fffffffffff2',
    'eeeeeeee-eeee-eeee-eeee-eeeeeeeeee02',
    '11111111-1111-1111-1111-111111111111',
    'created',
    '{}',
    '{"title":"Daycare pickup"}'
  )
on conflict (id) do nothing;

insert into public.notifications (id, user_id, family_id, type, title, body, is_read)
values
  (
    '99999999-9999-9999-9999-999999999991',
    '11111111-1111-1111-1111-111111111111',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'event_updated',
    'Piano lesson updated',
    'Mika moved Ella''s lesson earlier. New time: 15:30.',
    false
  ),
  (
    '99999999-9999-9999-9999-999999999992',
    '11111111-1111-1111-1111-111111111111',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'event_conflict',
    'One unassigned pickup',
    'Tomorrow''s dentist check-up still needs an adult owner.',
    false
  )
on conflict (id) do nothing;
