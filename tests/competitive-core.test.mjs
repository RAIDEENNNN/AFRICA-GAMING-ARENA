import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("competitive core 2.0 routes and data stay connected", async () => {
  const [core, ranked, profile, clan, matchRoom, dashboard, schema] = await Promise.all([
    readFile(new URL("../app/competitive-core.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/ranked/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/profile/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/clans/[clan-name]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/matches/[match-id]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/dashboard/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../db/schema.ts", import.meta.url), "utf8"),
  ]);

  assert.match(core, /export const corePlayers/);
  assert.match(core, /export const coreClans/);
  assert.match(core, /export const coreMatches/);
  assert.match(core, /export const achievements/);
  assert.match(core, /export const rankedQueues/);
  assert.match(ranked, /AGA Ranked/);
  assert.match(ranked, /Join ranked queue/);
  assert.match(profile, /Overview.*Stats.*Matches.*Tournaments.*Achievements.*Clips.*Clan.*Activity/s);
  assert.match(clan, /Clan HQ 2\.0/);
  assert.match(clan, /Applications/);
  assert.match(matchRoom, /Match Room 2\.0/);
  assert.match(matchRoom, /Created -> Waiting -> Check-In -> Ready -> Live -> Result Pending -> Under Review -> Completed/);
  assert.match(dashboard, /Authenticated Player -> Challenge -> Opponent -> Match -> Result -> Stats -> Leaderboard -> Match History/);

  for (const model of ["clanMembers", "rankSeasons", "rankedRatings", "xpTransactions", "achievementsCatalog", "playerAchievements", "scoutingProfiles", "predictions", "championships", "championshipStandings"]) {
    assert.match(schema, new RegExp(`export const ${model}`));
  }
});
