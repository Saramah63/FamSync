# FamSync MVP

FamSync is a mobile-first Expo + TypeScript MVP for shared family scheduling. This scaffold focuses on the first delivery in the brief:

- app architecture and folder structure
- onboarding and sign-in flow
- create family, invite co-parent, and child setup flow
- today dashboard
- month / week / day calendar MVP
- quick-add and edit event modals
- assignments and notifications screens
- reusable component primitives
- React Query provider and Zustand state
- Supabase schema and seed data

## Stack

- Expo + Expo Router
- TypeScript
- Zustand with persisted local state
- Supabase-ready schema and client bootstrap
- React Native `StyleSheet` UI system

## Project structure

```text
app/
  (auth)/
  (tabs)/
  add-event.tsx
components/
constants/
features/
lib/
store/
supabase/
  migrations/
  seed/
types/
```

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment values:

```bash
cp .env.example .env
```

3. Start Expo:

```bash
npm run start
```

## Supabase setup

1. Create a Supabase project.
2. Run [`001_famsync_schema.sql`](/Users/sara/FamSync/supabase/migrations/001_famsync_schema.sql).
3. Run [`001_seed.sql`](/Users/sara/FamSync/supabase/seed/001_seed.sql).
4. Fill `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` in `.env`.

When env vars are missing, the app stays in mock mode so the MVP flow still works end-to-end.

## Current MVP behavior

- Email sign-in persists locally.
- Family setup creates a local family state and child profiles.
- Onboarding is split into create family, invite co-parent, and child setup screens.
- Today screen highlights next events, updates, unassigned items, and overlaps.
- Calendar includes month / week / day filtering and owner filters.
- Add Event and Edit Event create update logs and notification entries.
- Tasks screen supports quick reassignment for unowned items.
- Notifications screen tracks unread changes.

## Next build steps

- Replace local auth with Supabase Auth
- Store and subscribe to events with Supabase Realtime
- Add local notifications with `expo-notifications`
- Add edit / cancel event flow and event history details
- Add conflict resolution UX and invite acceptance flow
# FamSync
