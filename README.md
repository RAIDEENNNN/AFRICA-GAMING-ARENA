# Clan Arena

Clan Arena is a dark esports platform prototype for CODM, PUBG Mobile and Free Fire players. The current local build supports a playable challenge journey: create a CODM 1v1 wager challenge, accept it as another demo player, chat in the match room, approve terms, check in, submit results and update the leaderboard/demo wallet state.

## Status

- UI/UX and responsive routing: working.
- Playable local flow: working.
- Backend boundary: `/api/arena` now owns challenge, room, chat, approval, check-in, result and demo wallet state for local development.
- Production database: Drizzle schema exists, but Cloudflare D1 is not bound yet.
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

Local runtime state is currently an in-process server store behind `/api/arena`, not browser `localStorage`. This is a bridge for two-browser local testing until a D1 binding is configured in `.openai/hosting.json`.

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

## Cleanup Notes

Duplicate root files such as `README 2.md` and `package 2.json` were archived to `.backup/duplicate-root-files/` and ignored from git.
