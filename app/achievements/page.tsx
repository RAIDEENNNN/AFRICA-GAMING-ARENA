import { AppShell, PageHero } from "../components";
import { achievementsForPlayer, currentPlayer } from "../competitive-core";

export default function AchievementsPage() {
  const items = achievementsForPlayer(currentPlayer.id);
  const unlocked = items.filter((item) => item.unlocked);
  return (
    <AppShell>
      <PageHero
        eyebrow="Player progression"
        title="Achievements"
        copy="Track unlocks, rarity, XP rewards and milestone progress across matches, tournaments, clips, rankings and clan activity."
        primary={["Play ranked", "/ranked"]}
        secondary={["View profile", "/profile"]}
      />
      <section className="core-command-strip">
        <article className="product-card"><small>Unlocked</small><strong>{unlocked.length}/{items.length}</strong><p>Current player achievement collection.</p></article>
        <article className="product-card"><small>XP rewards earned</small><strong>{unlocked.reduce((sum, item) => sum + item.xpReward, 0)}</strong><p>Achievement XP is earned through play, not purchased.</p></article>
        <article className="product-card"><small>Highest rarity</small><strong>Legendary</strong><p>Mythic unlocks require full-season domination.</p></article>
        <article className="product-card"><small>Next target</small><strong>AGA Champion</strong><p>Finish a season in Champion tier.</p></article>
      </section>
      <section className="achievement-board">
        {items.map((achievement) => (
          <article className={`product-card achievement-card rarity-${achievement.rarity.toLowerCase()} ${achievement.unlocked ? "unlocked" : "locked"}`} key={achievement.id}>
            <span>{achievement.icon}</span>
            <div>
              <small>{achievement.rarity} / {achievement.unlocked ? `Unlocked ${achievement.unlockDate}` : "Locked"}</small>
              <h2>{achievement.title}</h2>
              <p>{achievement.description}</p>
              <strong>{achievement.xpReward} XP</strong>
            </div>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
