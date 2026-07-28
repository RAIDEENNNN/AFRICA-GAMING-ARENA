import { AppShell, FormNotice, PageHero, WagerSafetyPanel } from "../../components";

export default function MatchRequestPage() {
  return (
    <AppShell>
      <PageHero eyebrow="Create challenge" title="Build the exact match you want." copy="Choose game, player/team/clan format, weapon class, specific weapon, map, mode, rules, time, region and optional non-cash prize." />
      <form className="product-form">
        <FormNotice>Real-money wagering is disabled pending legal review. This form supports friendly, ranked, tournament and non-cash prize challenges first.</FormNotice>
        <label>Match category<select className="field"><option>Free friendly match</option><option>Ranked match</option><option>Tournament match</option><option disabled>Wager match - disabled pending legal approval</option></select></label>
        <label>Match type<select className="field"><option>Player vs player</option><option>Team vs team</option><option>Clan vs clan</option><option>Open challenge</option><option>Private challenge</option><option>Tournament qualifier</option></select></label>
        <label>Game<select className="field"><option>Call of Duty: Mobile</option><option>PUBG Mobile</option><option>Free Fire</option></select></label>
        <label>Team size<select className="field"><option>1v1</option><option>2v2</option><option>3v3</option><option>4v4</option><option>5v5</option><option>Custom team size</option></select></label>
        <label>Weapon category<select className="field"><option>Assault Rifle</option><option>SMG</option><option>Sniper</option><option>Shotgun</option><option>LMG</option><option>Pistol</option><option>Melee</option><option>Mixed weapons</option><option>Any weapon</option></select></label>
        <label>Specific weapon<select className="field"><option>DR-H</option><option>AK-47</option><option>M4</option><option>Kilo 141</option><option>Any Assault Rifle</option></select></label>
        <label>Map selection<select className="field"><option>Select one map</option><option>Suggest multiple maps</option><option>Opponent chooses</option><option>Best-of-three map veto</option><option>Random map</option></select></label>
        <label>Game mode<select className="field"><option>Gunfight</option><option>Search and Destroy</option><option>Hardpoint</option><option>Team Deathmatch</option><option>Battle Royale</option><option>Custom Room</option></select></label>
        <div className="form-grid">
          <label>Date<input className="field" placeholder="2026-08-12" /></label>
          <label>Time<input className="field" placeholder="20:00" /></label>
          <label>Ruleset<input className="field" placeholder="Best of 3 / score limit 40" /></label>
          <label>Server<input className="field" placeholder="Europe" /></label>
        </div>
        <label>Rules<textarea className="field" placeholder="Operator skills disabled, scorestreaks disabled, spectators allowed, evidence required..." /></label>
        <label>Optional prize<select className="field"><option>No prize</option><option>Platform points</option><option>Tournament qualification</option><option>Custom non-cash reward</option></select></label>
        <WagerSafetyPanel />
        <button className="btn primary" disabled>Create challenge when backend is connected</button>
      </form>
    </AppShell>
  );
}
