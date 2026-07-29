# Supabase Migration Plan

Africa Gaming Arena is moving to Supabase as the primary production backend.
Cloudflare D1 snapshot storage remains temporary for the local playable demo and must not become a second production source of truth.

## Status

- Supabase project connection: not configured
- Supabase credentials committed: no
- Supabase schema starter: `supabase/schema.sql`
- D1 snapshot dependency: still used by the local demo flow
- Public homepage activity figures: zero or empty state
- Real authentication: remaining
- RLS policies: drafted in SQL, not applied to a live project
- Storage buckets: documented, not created
- Realtime channels: documented, not connected

## Required Environment

Set these in `.env.local` or the deployment environment only:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_JWT_SECRET=
DATABASE_URL=
DIRECT_URL=
SUPABASE_PROJECT_REF=
SUPABASE_ACCESS_TOKEN=
```

Never expose `SUPABASE_SERVICE_ROLE_KEY` through a `NEXT_PUBLIC_` variable.

## Migration Sequence

1. Create the Supabase project and provide non-secret project URL plus anon key.
2. Apply `supabase/schema.sql` in a staging database.
3. Create private storage buckets: `match-evidence`, `dispute-evidence`, `vendor-deliveries`.
4. Create public/profile buckets with constrained upload policies: `avatars`, `clan-emblems`, `tournament-banners`, `clips`.
5. Implement Supabase Auth routes for register, login, logout, email verification, forgot password and reset.
6. Create real `profiles` rows linked to `auth.users`.
7. Move CMA tournaments and registrations from static UI to Supabase `tournaments` and `tournament_registrations`.
8. Add CMA organiser approval/reject/waitlist APIs using server session identity only.
9. Move challenges, rooms, messages, approvals, results and notifications one domain at a time.
10. Replace homepage counts with Supabase aggregate queries.
11. Add Supabase Realtime subscriptions for messages, challenge acceptance, registration status changes and notifications.
12. Migrate or archive D1 `arena_state_snapshots`.
13. Remove unused D1 bindings only after staging restart and regression tests pass.

## Public Data Rule

If a count or activity card is not backed by a real production record, show `0`, a clear empty state, or a labelled development-only demo state.
