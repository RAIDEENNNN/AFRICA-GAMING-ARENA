import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("keeps the AGA homepage focused on the approved blueprint", async () => {
  const [home, agaHome, layout] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/aga-home.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /Africa Gaming Arena \| Compete\. Dominate\. Become Legendary\./);
  assert.match(home, /AGAHome/);
  assert.match(agaHome, /Africa Gaming Arena/i);
  assert.match(agaHome, /PLAY\. COMPETE\./i);
  assert.match(agaHome, /Payments unavailable/i);
  assert.match(agaHome, /No live matches yet/i);
  assert.match(agaHome, /Registered clans/i);
  assert.match(agaHome, /CMA Tournaments/i);
  assert.match(agaHome, /Call of Duty Mobile/i);
  assert.match(agaHome, /PUBG Mobile/i);
  assert.match(agaHome, /Free Fire/i);
  assert.match(agaHome, /Live Now/i);
  assert.doesNotMatch(agaHome, /25,873|1,247|3,458|78M|FearlessYT|24,850/);
  assert.doesNotMatch(home + agaHome + layout, /Full-stack roadmap|Mobile and backend planning|codex-preview|SkeletonPreview|react-loading-skeleton/i);
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
  assert.match(layout, /Africa Gaming Arena \| Compete\. Dominate\. Become Legendary\./);
  assert.doesNotMatch(page, /Live 128|Wagers 12|2,914 online|PlayerOne<\/b>/);
  assert.match(page, /ShellPlayerPanel/);
  assert.match(page, /TopbarPlayerLinks/);
  assert.doesNotMatch(page + layout + packageJson, /codex-preview|SkeletonPreview|react-loading-skeleton/);
  assert.doesNotMatch(arenaClient, /localStorage|sessionStorage/);
  assert.match(apiRoute, /acceptChallenge/);
  assert.match(arenaStore, /demo_payout/);
  for (const table of ["users", "challenges", "matchRooms", "messages", "agreementVersions", "walletTransactions", "notifications"]) {
    assert.match(schema, new RegExp(`export const ${table}`));
  }
});

test("keeps the main AGA navigation ecosystem connected", async () => {
  const files = await Promise.all([
    "../app/aga-navigation.tsx",
    "../app/competitive-core.ts",
    "../app/search/page.tsx",
    "../app/betting-arena/page.tsx",
    "../app/ranked/page.tsx",
    "../app/ranked/ranked-client.tsx",
    "../app/achievements/page.tsx",
    "../app/scout/page.tsx",
    "../app/championships/page.tsx",
    "../app/predictions/page.tsx",
    "../app/predictions/predictions-client.tsx",
    "../app/live/page.tsx",
    "../app/notifications/page.tsx",
    "../app/games/page.tsx",
    "../app/games/pubgm/page.tsx",
    "../app/tournaments/page.tsx",
    "../app/tournaments/create/page.tsx",
    "../app/clans/page.tsx",
    "../app/leaderboard/page.tsx",
    "../app/marketplace/page.tsx",
    "../app/marketplace/categories.ts",
    "../app/marketplace/category/[category]/page.tsx",
    "../app/marketplace/cod-points/page.tsx",
    "../app/marketplace/pubg-uc/page.tsx",
    "../app/marketplace/free-fire-diamonds/page.tsx",
    "../app/marketplace/sell/page.tsx",
    "../app/marketplace/listing/[slug]/page.tsx",
    "../app/wallet/page.tsx",
    "../app/clips/page.tsx",
    "../app/(auth)/login/page.tsx",
    "../app/(auth)/register/page.tsx",
    "../app/profile/loading/page.tsx",
    "../app/find-clans/page.tsx",
    "../app/clans/create/page.tsx",
    "../app/clips/upload/page.tsx",
    "../app/orders/page.tsx",
    "../app/news/page.tsx",
    "../app/news/[slug]/page.tsx",
    "../app/clips/[id]/page.tsx",
    "../app/marketplace/[id]/page.tsx",
  ].map((path) => readFile(new URL(path, import.meta.url), "utf8")));
  const source = files.join("\n");

  for (const route of ["/games", "/ranked", "/achievements", "/scout", "/championships", "/predictions", "/live", "/betting-arena", "/tournaments", "/clans", "/find-clans", "/clans/create", "/leaderboards", "/marketplace", "/marketplace/category/", "/orders", "/wallet", "/clips", "/clips/upload", "/news", "/search", "/login", "/register", "/profile/loading"]) {
    assert.match(source, new RegExp(route.replace("/", "\\/")));
  }
  assert.match(source, /AGA Ranked/);
  assert.match(source, /Simulated matchmaking engine/);
  assert.match(source, /Accept Match/);
  assert.match(source, /Achievements/);
  assert.match(source, /First Blood/);
  assert.match(source, /AGA Scout/);
  assert.match(source, /Invite to Trial/);
  assert.match(source, /AGA Championships/);
  assert.match(source, /Open Qualifier/);
  assert.match(source, /AGA Predictions/);
  assert.match(source, /No cash betting is connected to predictions/);
  assert.match(source, /AGA Live/);
  assert.match(source, /Embed pending/);
  assert.match(source, /Notification Centre 2\.0/);
  assert.match(source, /FIND ANYTHING IN AGA/);
  assert.match(source, /CREATE TOURNAMENT/);
  assert.match(source, /Publish Locked/);
  assert.match(source, /FIND CLAN/);
  assert.match(source, /CREATE CLAN/);
  assert.match(source, /UPLOAD CLIP/);
  assert.match(source, /ORDER HISTORY/);
  assert.match(source, /AGA WALLET/);
  assert.match(source, /No wallet activity yet/);
  assert.match(source, /BETTING ARENA/);
  assert.match(source, /No real betting is enabled/);
  assert.match(source, /Compliance lock active/);
  assert.match(source, /Champion slot/);
  assert.match(source, /Google/);
  assert.match(source, /Apple/);
  assert.match(source, /LOGGING INTO YOUR PROFILE/);
  assert.match(source, /router\.push\("\/profile\/loading"\)/);
  assert.match(source, /Activision/);
  assert.match(source, /Level Infinite/);
  assert.match(source, /Garena/);
  assert.match(source, /COD POINTS/);
  assert.match(source, /cod-points/);
  assert.match(source, /pubg-uc/);
  assert.match(source, /free-fire-diamonds/);
  assert.match(source, /PUBG UC/);
  assert.match(source, /FREE FIRE DIAMONDS/);
  assert.match(source, /VERIFIED VENDORS/);
  assert.match(source, /SELL ON AGA/);
  assert.match(source, /LISTING NOT AVAILABLE/);
  assert.match(source, /generateStaticParams/);
  assert.match(source, /No live listing/);
  assert.match(source, /No fake likes, views or comments/);
  assert.match(source, /No buy-now, deposits, withdrawals or escrow/);
  assert.match(source, /aga-mobile-native-menu/);
});
