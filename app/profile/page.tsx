import { ProfileLive } from "../arena-client";
import { AppShell, PageHero } from "../components";
import { achievementsForPlayer, coreClips, coreMatches, currentPlayer, currentSeason, levelProgress, rankForMmr, winRate } from "../competitive-core";

export default function ProfilePage() {
  const xp = levelProgress(currentPlayer.xp);
  const achievements = achievementsForPlayer(currentPlayer.id);
  return (
    <AppShell>
      <PageHero eyebrow="Player profile" title="Your AGA identity" copy="Your authenticated player profile, rating, stats, clan and recent competitive activity." primary={["Edit settings", "/settings"]} />
      <section className="profile-2-cover">
        <div className="profile-banner-copy">
          <span className="avatar-ring">{currentPlayer.gamerTag.slice(0, 2).toUpperCase()}</span>
          <div>
            <small>{currentPlayer.verified ? "Verified player" : "Unverified"} / {currentPlayer.country} / @{currentPlayer.username}</small>
            <h2>{currentPlayer.gamerTag}</h2>
            <p>{currentPlayer.mainGame} main / {currentPlayer.secondaryGames.join(", ")} secondary / {currentPlayer.role} for {currentPlayer.clanName}</p>
          </div>
        </div>
        <div className="profile-rank-plate">
          <small>Current rank</small>
          <strong>{rankForMmr(currentPlayer.mmr)}</strong>
          <span>{currentPlayer.mmr} MMR / peak {currentPlayer.peakRank}</span>
        </div>
      </section>
      <nav className="core-tabs" aria-label="Profile tabs">
        {["Overview", "Stats", "Matches", "Tournaments", "Achievements", "Clips", "Clan", "Activity"].map((tab) => <a href={`#${tab.toLowerCase()}`} key={tab}>{tab}</a>)}
      </nav>
      <section className="core-command-strip" id="overview">
        <article className="product-card"><small>AGA level</small><strong>{xp.level}</strong><p>{xp.current}/{xp.needed} XP. XP cannot be purchased.</p><progress value={xp.percent} max={100} aria-label="Player XP progress" /></article>
        <article className="product-card"><small>Leaderboard</small><strong>#{currentPlayer.leaderboardPosition}</strong><p>Rank movement +{currentPlayer.rankMovement} this week.</p></article>
        <article className="product-card"><small>Reputation</small><strong>{currentPlayer.reputationScore}</strong><p>Sportsmanship {currentPlayer.sportsmanshipRating}/100.</p></article>
        <article className="product-card"><small>Followers</small><strong>{currentPlayer.followers}</strong><p>Following {currentPlayer.following} players.</p></article>
      </section>
      <section className="profile-2-grid" id="stats">
        <article className="product-card profile-stat-sheet">
          <h2>Career statistics</h2>
          <dl>
            {[
              ["Total matches", currentPlayer.totalMatches],
              ["Wins", currentPlayer.wins],
              ["Losses", currentPlayer.losses],
              ["Win rate", `${winRate(currentPlayer)}%`],
              ["MVP count", currentPlayer.mvpCount],
              ["Tournament wins", currentPlayer.tournamentWins],
              ["Current streak", currentPlayer.currentStreak],
              ["Best streak", currentPlayer.bestStreak],
            ].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
          </dl>
        </article>
        <article className="product-card" id="achievements">
          <h2>Achievements</h2>
          <div className="achievement-rack">{achievements.filter((item) => item.unlocked).slice(0, 8).map((item) => <span key={item.id}>{item.title}</span>)}</div>
          <a className="btn ghost small" href="/achievements">Open all achievements</a>
        </article>
        <article className="product-card" id="matches">
          <h2>Recent matches</h2>
          {coreMatches.slice(0, 3).map((match) => <p key={match.id}><b>{match.score}</b> / {match.teamA} vs {match.teamB} / {match.lifecycle}</p>)}
        </article>
        <article className="product-card" id="clips">
          <h2>Clips</h2>
          {coreClips.slice(0, 3).map((clip) => <p key={clip.id}>{clip.title} / {clip.reactions} reactions</p>)}
          <a className="btn ghost small" href="/clips/upload">Upload clip</a>
        </article>
        <article className="product-card" id="tournaments"><h2>Tournaments</h2><p>{currentSeason.name} tournament history and placements attach to this profile as official results are completed.</p></article>
        <article className="product-card" id="clan"><h2>Clan</h2><p>{currentPlayer.clanName} / {currentPlayer.role} / {currentPlayer.clanHistory}</p><a className="btn ghost small" href={`/clans/${currentPlayer.clanSlug}`}>Open Clan HQ</a></article>
        <article className="product-card" id="activity"><h2>Activity</h2><p>Recent follows, clip reactions, match confirmations and scouting invites will stream here from notifications.</p></article>
      </section>
      <ProfileLive />
    </AppShell>
  );
}
