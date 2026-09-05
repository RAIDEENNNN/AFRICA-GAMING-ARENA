import { mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("/Users/raiden./.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");

const baseUrl = process.env.BASE_URL ?? "http://localhost:3002";
const outDir = path.resolve("validation-screenshots");
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});

const pages = [
  ["/", 1440, "redesign-01-home-desktop.png"],
  ["/", 375, "redesign-02-home-mobile.png"],
  ["/games", 1440, "redesign-03-game-portals.png"],
  ["/dashboard", 1440, "redesign-04-dashboard.png"],
  ["/ranked", 1440, "redesign-04b-ranked.png"],
  ["/achievements", 1440, "redesign-04c-achievements.png"],
  ["/matches", 1440, "redesign-05-find-match.png"],
  ["/matches/request", 1440, "redesign-06-create-flow.png"],
  ["/matches/ca-1024", 1440, "redesign-07-match-room.png"],
  ["/matches/ca-1024", 1100, "redesign-08-agreement-panel.png"],
  ["/leaderboard", 1440, "redesign-09-leaderboard.png"],
  ["/profile", 1440, "redesign-10-player-profile.png"],
  ["/clans/xclusive", 1440, "redesign-11-clan-page.png"],
  ["/clips", 1440, "redesign-12-clips-page.png"],
  ["/marketplace", 1440, "redesign-13-marketplace.png"],
  ["/marketplace/category/cod-points", 1440, "redesign-13b-marketplace-cod-points.png"],
  ["/betting-arena", 1440, "redesign-13c-betting-arena.png"],
  ["/scout", 1440, "redesign-13d-scout.png"],
  ["/championships", 1440, "redesign-13e-championships.png"],
  ["/predictions", 1440, "redesign-13f-predictions.png"],
  ["/live", 1440, "redesign-13g-live.png"],
  ["/tournaments/codm-championship", 1440, "redesign-14-tournament.png"],
  ["/matches/ca-1024", 375, "redesign-15-mobile-match-room.png"],
  ["/clips", 375, "redesign-16-mobile-clips-feed.png"],
  ["/tournaments/create", 1440, "redesign-17-create-tournament.png"],
  ["/find-clans", 1440, "redesign-18-find-clans.png"],
  ["/clans/create", 1440, "redesign-19-create-clan.png"],
  ["/clips/upload", 1440, "redesign-20-upload-clip.png"],
  ["/orders", 1440, "redesign-21-order-history.png"],
  ["/tournaments/create", 375, "redesign-22-mobile-create-tournament.png"],
  ["/clans/create", 375, "redesign-23-mobile-create-clan.png"],
  ["/clips/upload", 375, "redesign-24-mobile-upload-clip.png"],
  ["/login", 1440, "redesign-25-login-options.png"],
  ["/register", 1440, "redesign-26-register-options.png"],
  ["/leaderboard", 375, "redesign-27-mobile-leaderboard.png"],
  ["/marketplace/category/verified-vendors", 375, "redesign-28-mobile-marketplace-category.png"],
  ["/profile/loading", 375, "redesign-29-mobile-profile-loading.png"],
  ["/marketplace/cod-points", 375, "redesign-30-mobile-cod-points.png"],
  ["/wallet", 375, "redesign-31-mobile-wallet.png"],
  ["/betting-arena", 375, "redesign-32-mobile-betting-arena.png"],
  ["/ranked", 375, "redesign-33-mobile-ranked.png"],
  ["/achievements", 375, "redesign-34-mobile-achievements.png"],
  ["/scout", 375, "redesign-35-mobile-scout.png"],
  ["/championships", 375, "redesign-36-mobile-championships.png"],
  ["/predictions", 375, "redesign-37-mobile-predictions.png"],
  ["/live", 375, "redesign-38-mobile-live.png"],
];

for (const [route, width, file] of pages) {
  const page = await browser.newPage({ viewport: { width, height: 1000 } });
  await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(outDir, file), fullPage: true });
  await page.close();
}

await browser.close();
console.log(JSON.stringify({ ok: true, screenshotDir: outDir, count: pages.length }, null, 2));
