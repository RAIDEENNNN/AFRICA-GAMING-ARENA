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
  ["/matches", 1440, "redesign-05-find-match.png"],
  ["/matches/request", 1440, "redesign-06-create-flow.png"],
  ["/matches/ca-1024", 1440, "redesign-07-match-room.png"],
  ["/matches/ca-1024", 1100, "redesign-08-agreement-panel.png"],
  ["/leaderboard", 1440, "redesign-09-leaderboard.png"],
  ["/profile", 1440, "redesign-10-player-profile.png"],
  ["/clans/xclusive", 1440, "redesign-11-clan-page.png"],
  ["/clips", 1440, "redesign-12-clips-page.png"],
  ["/marketplace", 1440, "redesign-13-marketplace.png"],
  ["/tournaments/codm-championship", 1440, "redesign-14-tournament.png"],
  ["/matches/ca-1024", 375, "redesign-15-mobile-match-room.png"],
  ["/clips", 375, "redesign-16-mobile-clips-feed.png"],
];

for (const [route, width, file] of pages) {
  const page = await browser.newPage({ viewport: { width, height: 1000 } });
  await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(outDir, file), fullPage: true });
  await page.close();
}

await browser.close();
console.log(JSON.stringify({ ok: true, screenshotDir: outDir, count: pages.length }, null, 2));
