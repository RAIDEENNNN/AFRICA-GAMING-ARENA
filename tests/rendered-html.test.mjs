import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("keeps the Clan Arena homepage focused on the product", async () => {
  const [home, layout] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /Clan Arena \| Competitive Clan Command Centre/);
  assert.match(home, /Enter the Arena/i);
  assert.match(home, /Featured clans/i);
  assert.match(home, /Recent matches/i);
  assert.match(home, /Create account/i);
  assert.match(home, /Game portals/i);
  assert.match(home, /GamePortalCard/i);
  assert.doesNotMatch(home + layout, /Full-stack roadmap|Mobile and backend planning|codex-preview|SkeletonPreview|react-loading-skeleton/i);
});

test("keeps starter preview code removed", async () => {
  const [page, layout, packageJson, arenaClient, arenaStore, schema, apiRoute] = await Promise.all([
    readFile(new URL("../app/components.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/arena-client.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/arena-store.ts", import.meta.url), "utf8"),
    readFile(new URL("../db/schema.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/api/arena/route.ts", import.meta.url), "utf8"),
  ]);

  assert.match(page, /product-shell/);
  assert.match(layout, /Clan Arena \| Competitive Clan Command Centre/);
  assert.doesNotMatch(page + layout + packageJson, /codex-preview|SkeletonPreview|react-loading-skeleton/);
  assert.doesNotMatch(arenaClient, /localStorage|sessionStorage/);
  assert.match(apiRoute, /acceptChallenge/);
  assert.match(arenaStore, /demo_payout/);
  for (const table of ["users", "challenges", "matchRooms", "messages", "agreementVersions", "walletTransactions", "notifications"]) {
    assert.match(schema, new RegExp(`export const ${table}`));
  }
});
