import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("public launch data starts from truthful empty records", async () => {
  const data = await readFile(new URL("../app/data.ts", import.meta.url), "utf8");

  for (const exportName of ["clans", "tournaments", "matches", "challenges", "clips"]) {
    assert.match(data, new RegExp(`export const ${exportName}: .*\\[\\] = \\[\\];`));
  }

  assert.doesNotMatch(data, /Xclusive|Immortals|CODM Championship|Insane 1v4|1\.2K|12,460|\$5,000/);
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
  assert.match(source, /No official leaderboard records yet/);
  assert.doesNotMatch(source, /2,450|1000 RP|5\.5K|18K|Simulated balance|Demo balance/);
});

test("tournament archive schema exists without unverified historical inserts", async () => {
  const [schema, tournaments, legacyTournament] = await Promise.all([
    readFile(new URL("../db/schema.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/tournaments/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/tournaments/codm-championship/page.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(schema, /export const tournamentArchiveEntries/);
  assert.match(tournaments, /No tournaments are open yet/);
  assert.match(legacyTournament, /No verified tournament record exists/);
  assert.doesNotMatch(`${tournaments}\n${legacyTournament}`, /\$5,000|32\/64|XCL|NOVA/);
});
