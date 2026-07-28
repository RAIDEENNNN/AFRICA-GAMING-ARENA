import { LeaderboardLive } from "../arena-client";
import { AppShell, PageHero } from "../components";

export default function LeaderboardPage() {
  return (
    <AppShell>
      <PageHero eyebrow="Leaderboard" title="Verified ranking, not manually edited points." copy="Rankings consider wins, losses, opponent strength, tournaments, forfeits, disputes and activity." />
      <LeaderboardLive />
    </AppShell>
  );
}
