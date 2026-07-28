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

const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
await page.evaluate(() => fetch("/api/arena", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ action: "reset", actor: "Admin" }),
}));

async function shot(name) {
  await page.screenshot({ path: path.join(outDir, name), fullPage: true });
}

await page.goto(`${baseUrl}/matches/request`, { waitUntil: "networkidle" });
const selects = page.locator(".flow-grid select");
await selects.nth(0).selectOption("CODM");
await selects.nth(1).selectOption("Player vs player");
await selects.nth(2).selectOption("1v1");
await selects.nth(3).selectOption("Assault Rifle");
await selects.nth(4).selectOption("DR-H");
await selects.nth(5).selectOption("Shipment");
await selects.nth(6).selectOption("Gunfight");
await selects.nth(7).selectOption("Europe");
await page.getByLabel("Server").fill("EU-West");
await page.getByLabel("Date").fill("2026-08-02");
await page.getByLabel("Time").fill("20:30");
await selects.nth(8).selectOption("Wager");
await page.getByLabel("Wager amount").fill("20");
await page.getByLabel("Match rules").fill("No scorestreaks, no operator skills, screenshots required.");
await shot("proof-01-create-codm-1v1.png");
await shot("proof-02-wager-visible.png");
await page.getByRole("button", { name: "Publish Battle Contract" }).click();
await page.waitForURL("**/matches?created=1");
await shot("proof-03-find-match-published.png");
await page.getByRole("button", { name: "Accept" }).first().click();
await page.waitForURL("**/matches/match-*");
await shot("proof-04-opponent-accepted.png");
await page.locator(".chat-window input.field").fill("Terms look good. Uploading scoreboard after match.");
await page.getByRole("button", { name: "Send" }).click();
await shot("proof-05-match-chat.png");
await shot("proof-06-agreement-panel.png");
await page.getByRole("button", { name: "PlayerOne accept terms" }).click();
await page.getByRole("button", { name: "NovaAce accept terms" }).click();
await page.getByRole("button", { name: "PlayerOne confirm wager" }).click();
await page.getByRole("button", { name: "NovaAce confirm wager" }).click();
await shot("proof-07-both-approved.png");
await page.getByRole("button", { name: "PlayerOne check in" }).click();
await page.getByRole("button", { name: "NovaAce check in" }).click();
await shot("proof-08-check-in.png");
await page.getByRole("button", { name: "Submit as PlayerOne" }).click();
await page.getByRole("button", { name: "Submit as NovaAce" }).click();
await shot("proof-09-result-submission.png");
await page.goto(`${baseUrl}/leaderboard`, { waitUntil: "networkidle" });
await shot("proof-10-updated-leaderboard.png");
await page.goto(`${baseUrl}/marketplace`, { waitUntil: "networkidle" });
await shot("proof-11-cod-points-vendor.png");

for (const [route, width, name] of [
  ["/matches", 375, "proof-12-mobile-find-match.png"],
  ["/matches/request", 768, "proof-13-tablet-create.png"],
  ["/dashboard", 1440, "proof-14-desktop-dashboard.png"],
]) {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
  await shot(name);
}

await browser.close();
console.log(JSON.stringify({ ok: true, screenshotDir: outDir }, null, 2));
