import { mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("/Users/raiden./.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");

const outDir = path.resolve("validation-screenshots");
const baseUrl = process.env.BASE_URL ?? "http://localhost:3002";
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});

const widths = [320, 375, 430, 640, 768, 1024, 1280, 1440, 1920];
const routes = [
  "/",
  "/dashboard",
  "/games",
  "/games/codm",
  "/games/pubg-mobile",
  "/games/free-fire",
  "/betting-arena",
  "/matches",
  "/matches/request",
  "/matches/ca-1024",
  "/clips",
  "/clips/upload",
  "/leaderboard",
  "/marketplace",
  "/marketplace/category/cod-points",
  "/marketplace/category/pubg-uc",
  "/marketplace/category/free-fire-diamonds",
  "/marketplace/cod-points",
  "/marketplace/pubg-uc",
  "/marketplace/free-fire-diamonds",
  "/marketplace/sell",
  "/marketplace/listing/not-live-yet",
  "/marketplace/category/coaching",
  "/marketplace/category/graphics",
  "/marketplace/category/editing",
  "/marketplace/category/tournament-services",
  "/marketplace/category/verified-vendors",
  "/orders",
  "/wallet",
  "/admin",
  "/login",
  "/register",
  "/profile/loading",
  "/settings",
  "/find-clans",
  "/clans/create",
  "/tournaments/create",
];

const failures = [];

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  for (const route of routes) {
    await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(250);
    const metrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      bodyScrollWidth: document.body.scrollWidth,
      overflowingControls: [...document.querySelectorAll("a,button,input,select,textarea")].filter((el) => {
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && (rect.left < -1 || rect.right > window.innerWidth + 1);
      }).length,
    }));

    if (
      metrics.scrollWidth > metrics.clientWidth + 1 ||
      metrics.bodyScrollWidth > metrics.clientWidth + 1 ||
      metrics.overflowingControls > 0
    ) {
      failures.push({ width, route, metrics });
    }
  }
  await page.close();
}

const screenshots = [
  ["/", 375, "mobile-home-375.png"],
  ["/matches/request", 375, "mobile-create-challenge-375.png"],
  ["/matches/ca-1024", 375, "mobile-match-room-375.png"],
  ["/tournaments/create", 375, "mobile-create-tournament-375.png"],
  ["/clans/create", 375, "mobile-create-clan-375.png"],
  ["/clips/upload", 375, "mobile-upload-clip-375.png"],
  ["/profile/loading", 375, "mobile-profile-loading-375.png"],
  ["/betting-arena", 375, "mobile-betting-arena-375.png"],
  ["/wallet", 375, "mobile-wallet-375.png"],
  ["/marketplace/category/verified-vendors", 375, "mobile-marketplace-category-375.png"],
  ["/games", 768, "tablet-games-768.png"],
  ["/", 1440, "desktop-home-1440.png"],
];

for (const [route, width, file] of screenshots) {
  const page = await browser.newPage({ viewport: { width, height: 1000 } });
  await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(250);
  await page.screenshot({ path: path.join(outDir, file), fullPage: true });
  await page.close();
}

await browser.close();

if (failures.length) {
  console.error(JSON.stringify({ failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ ok: true, widths, routes, screenshotDir: outDir }, null, 2));
