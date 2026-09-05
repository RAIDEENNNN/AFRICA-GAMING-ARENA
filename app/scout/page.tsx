import { AppShell, PageHero } from "../components";
import { rankForMmr, scoutProfiles, winRate } from "../competitive-core";

export default function ScoutPage() {
  return (
    <AppShell>
      <PageHero
        eyebrow="AGA Scout"
        title="Looking for team"
        copy="Discover eligible players by game, rank, country, role, region, availability, experience, stats and clips."
        primary={["Create clan", "/clans/create"]}
        secondary={["Find clans", "/find-clans"]}
      />
      <section className="product-card scout-filters">
        <label>Game<select className="field"><option>All games</option><option>CODM</option><option>PUBG Mobile</option><option>Free Fire</option></select></label>
        <label>Rank<select className="field"><option>All ranks</option><option>Master+</option><option>Diamond</option><option>Platinum</option></select></label>
        <label>Role<select className="field"><option>All roles</option><option>IGL</option><option>Slayer</option><option>Sniper</option><option>Support</option><option>Flex</option><option>Entry</option><option>Anchor</option></select></label>
        <label>Region<select className="field"><option>All regions</option><option>Africa West</option><option>Africa East</option><option>Africa South</option><option>MENA</option><option>EU West</option></select></label>
      </section>
      <section className="scout-grid">
        {scoutProfiles.map((player) => (
          <article className="product-card scout-card" key={player.id}>
            <div className="scout-card-head">
              <span className="avatar-ring">{player.gamerTag.slice(0, 2).toUpperCase()}</span>
              <div>
                <small>{player.lookingForTeam ? "Looking for team" : "Open to trials"}</small>
                <h2>{player.gamerTag}</h2>
                <p>{player.country} / {player.region} / {player.language}</p>
              </div>
              <strong>{rankForMmr(player.mmr)}</strong>
            </div>
            <dl>
              <div><dt>Game</dt><dd>{player.mainGame}</dd></div>
              <div><dt>Role</dt><dd>{player.role}</dd></div>
              <div><dt>Win rate</dt><dd>{winRate(player)}%</dd></div>
              <div><dt>Availability</dt><dd>{player.availability}</dd></div>
              <div><dt>Eligibility</dt><dd>{player.ageEligibility}</dd></div>
              <div><dt>Experience</dt><dd>{player.tournamentExperience}</dd></div>
            </dl>
            <p>{player.clanHistory}. Clips and trial notes stay attached to the profile once real media storage is connected.</p>
            <div className="button-row">
              <button className="btn secondary small" type="button" disabled title="Requires verified clan manager role">Invite to Trial</button>
              <button className="btn secondary small" type="button" disabled title="Requires verified clan manager role">Invite to Clan</button>
              <button className="btn ghost small" type="button" disabled title="Saved players require login-backed profiles">Save Player</button>
            </div>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
