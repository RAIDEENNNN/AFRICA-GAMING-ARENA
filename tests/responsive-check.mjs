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
  "/matches",
  "/matches/request",
  "/matches/ca-1024",
  "/clips",
  "/leaderboard",
  "/marketplace",
  "/wallet",
  "/admin",
  "/login",
  "/register",
  "/settings",
];

const failures = [];

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  for (const route of routes) {
    await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
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
  ["/games", 768, "tablet-games-768.png"],
  ["/", 1440, "desktop-home-1440.png"],
];

for (const [route, width, file] of screenshots) {
  const page = await browser.newPage({ viewport: { width, height: 1000 } });
  await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(outDir, file), fullPage: true });
  await page.close();
}

await browser.close();

if (failures.length) {
  console.error(JSON.stringify({ failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ ok: true, widths, routes, screenshotDir: outDir }, null, 2));
