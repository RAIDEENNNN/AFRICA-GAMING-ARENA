import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("competitive core data is deterministic and connected", async () => {
  const data = await readFile(new URL("../app/data.ts", import.meta.url), "utf8");
  const core = await readFile(new URL("../app/competitive-core.ts", import.meta.url), "utf8");

  for (const exportName of ["clans", "tournaments", "matches", "challenges", "clips"]) {
    assert.match(data, new RegExp(`export const ${exportName}: .*\\[\\] =`));
  }
  assert.match(core, /AGA COMPETITIVE CORE|AGA Season 2|rankedQueues|championshipStandings|predictionCards|scoutProfiles/s);
  assert.match(core, /First Blood|1000 Matches|Clip Creator|Rising Star/s);
  assert.doesNotMatch(core, /Lorem Ipsum/i);
  assert.doesNotMatch(core, /\$5,000|cash payout|real-money stake/i);
  assert.match(data, /Challenges supported/);
});

test("marketplace has routes without fabricated sellers or inventory", async () => {
  const [home, category, sell, listing, schema] = await Promise.all([
    readFile(new URL("../app/marketplace/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/marketplace/category-view.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/marketplace/sell/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/marketplace/listing/[slug]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../db/schema.ts", import.meta.url), "utf8"),
  ]);
  const source = `${home}\n${category}\n${sell}\n${listing}`;

  assert.match(source, /No verified marketplace listings yet/);
  assert.match(source, /No live .* vendors yet/);
  assert.match(source, /SELL ON AGA/);
  assert.match(source, /Account sales.*Blocked/s);
  assert.match(source, /LISTING NOT AVAILABLE/);
  assert.doesNotMatch(source, /Approved vendor<\/span>|starter pack|seller rating|5 stars|Create demo order/);
  assert.match(schema, /export const marketplaceListings/);
});

test("wallet and public leaderboard do not show invented balances or ranks", async () => {
  const [wallet, leaderboard, homepage] = await Promise.all([
    readFile(new URL("../app/wallet/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/leaderboard/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/aga-home.tsx", import.meta.url), "utf8"),
  ]);
  const source = `${wallet}\n${leaderboard}\n${homepage}`;

  assert.match(source, /£0\.00/);
  assert.match(source, /Payments unavailable/);
  assert.match(source, /Official live leaderboard sync is still gated/);
  assert.match(source, /Deterministic demo ladder mirrors the normalized player model/);
  assert.doesNotMatch(source, /5\.5K|18K|Simulated balance|Demo balance/);
});

test("tournament and competitive schemas cover the next platform core", async () => {
  const [schema, tournaments, legacyTournament] = await Promise.all([
    readFile(new URL("../db/schema.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/tournaments/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/tournaments/codm-championship/page.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(schema, /export const tournamentArchiveEntries/);
  for (const model of ["rankSeasons", "rankedRatings", "achievementsCatalog", "playerAchievements", "xpTransactions", "scoutingProfiles", "predictions", "championships", "championshipStandings", "tournamentMatches"]) {
    assert.match(schema, new RegExp(`export const ${model}`));
  }
  assert.match(tournaments, /Tournament Engine 2\.0/);
  assert.match(tournaments, /Groups \+ Knockout/);
  assert.match(legacyTournament, /No verified tournament record exists/);
  assert.doesNotMatch(`${tournaments}\n${legacyTournament}`, /\$5,000/);
});
