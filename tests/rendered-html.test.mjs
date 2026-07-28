import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Clan Arena homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Clan Arena \| Competitive Clan Command Centre<\/title>/i);
  assert.match(html, /Built for clans/i);
  assert.match(html, /Featured clans/i);
  assert.match(html, /Recent matches/i);
  assert.match(html, /Create account/i);
  assert.match(html, /Game portals/i);
  assert.match(html, /Call of Duty: Mobile/i);
  assert.match(html, /PUBG Mobile/i);
  assert.match(html, /Free Fire/i);
  assert.match(html, /Wallet/i);
  assert.doesNotMatch(html, /Full-stack roadmap|Mobile and backend planning|Clip upload/i);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
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
