# Africa Gaming Arena

Africa Gaming Arena is a dark esports platform prototype for CODM, PUBG Mobile and Free Fire players. The current local build supports a playable challenge journey: create a CODM 1v1 wager challenge, accept it as another demo player, chat in the match room, approve terms, check in, submit results and update the leaderboard/demo wallet state.

## Status

- UI/UX and responsive routing: working.
- Playable local flow: working.
- Backend boundary: `/api/arena` now owns challenge, room, chat, approval, check-in, result and demo wallet state.
- Persistence: local development uses the Cloudflare D1 `DB` binding declared in `.openai/hosting.json`.
- Real auth, payments, escrow, sockets and file storage: not production-ready.

## Requirements

- Node.js `>=22.13.0`

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open the local site at `http://localhost:3002/` when the dev server chooses that port.

## Useful Commands

```bash
npm test
node tests/proof-flow.mjs
node tests/responsive-check.mjs
npm run db:generate
```

## Database Direction

This project is standardized on Cloudflare D1 with Drizzle. The schema is in `db/schema.ts` and covers users, games, game options, clans, challenges, participants, match rooms, messages, agreements, approvals, check-ins, results, evidence, disputes, statistics, leaderboards, vendors, products, orders, wallet transactions and notifications.

The current playable flow persists its aggregate state in the D1-backed `arena_state_snapshots` table while the normalized tables are migrated and ready for the next repository split. This is a transitional implementation, not the final production data model.

## Authentication Direction

`app/chatgpt-auth.ts` includes Sign in with ChatGPT helpers. Production protected routes should use signed-in identity plus role checks for:

- Player
- Clan leader
- Clan officer
- Vendor
- Tournament organiser
- Moderator
- Administrator

The `/admin` page currently has a development guard and only renders admin content with `?role=admin`. Replace this with real session roles before deployment.

## Wager Safety

Real-money processing is disabled. Demo wallet values are labelled as demo data and server-calculated. Browser-submitted payout math is not trusted.

Before enabling real wagers, add age verification, jurisdiction checks, KYC, payment provider approval, escrow, dispute operations, audit logging and legal review.

## D1 Commands

Migration files:

- `drizzle/0000_fair_la_nuit.sql`
- `drizzle/0001_complex_iron_patriot.sql`
- `drizzle/0002_natural_energizer.sql`

Useful local commands:

```bash
npm run db:generate
npm run db:seed
npm run db:reset
npm run db:inspect
```

Cloudflare D1 commands once real database IDs exist:

```bash
wrangler d1 create clan-arena-local
wrangler d1 create clan-arena-staging
wrangler d1 create clan-arena-production
wrangler d1 execute clan-arena-local --local --file drizzle/0000_fair_la_nuit.sql
wrangler d1 execute clan-arena-local --local --file drizzle/0001_complex_iron_patriot.sql
wrangler d1 execute clan-arena-local --local --file drizzle/0002_natural_energizer.sql
wrangler d1 execute clan-arena-local --local --command "select id, updated_at from arena_state_snapshots"
```

## Cleanup Notes

Duplicate root files such as `README 2.md` and `package 2.json` were archived to `.backup/duplicate-root-files/` and ignored from git.
