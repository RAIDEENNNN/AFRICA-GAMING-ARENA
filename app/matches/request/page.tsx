import { AppShell, FormNotice, PageHero, WagerSafetyPanel } from "../../components";

export default function MatchRequestPage() {
  return (
    <AppShell>
      <PageHero eyebrow="Create challenge" title="Build the exact match you want." copy="Choose game, player/team/clan format, weapon class, specific weapon, map, mode, rules, time, region and optional non-cash prize." />
      <form className="product-form">
        <FormNotice>Real-money wagering is disabled pending legal review. This form supports friendly, ranked, tournament and non-cash prize challenges first.</FormNotice>
        <div className="step-progress"><span>1 Game</span><span>2 Setup</span><span>3 Weapon</span><span>4 Map</span><span>5 Rules</span><span>6 Schedule</span><span>7 Wager</span><span>8 Review</span></div>
        <fieldset className="form-step"><legend>Step 1 - Game</legend><label>Game<select className="field"><option>Call of Duty: Mobile</option><option>PUBG Mobile</option><option>Free Fire</option></select></label></fieldset>
        <fieldset className="form-step"><legend>Step 2 - Match setup</legend><label>Match type<select className="field"><option>Player vs player</option><option>Team vs team</option><option>Clan vs clan</option><option>Open challenge</option><option>Private challenge</option><option>Tournament qualifier</option></select></label><label>Team size<select className="field"><option>1v1</option><option>2v2</option><option>3v3</option><option>4v4</option><option>5v5</option><option>Custom team size</option></select></label></fieldset>
        <fieldset className="form-step"><legend>Step 3 - Weapon and mode</legend><label>Weapon category<select className="field"><option>Assault Rifle</option><option>SMG</option><option>Sniper</option><option>Shotgun</option><option>LMG</option><option>Pistol</option><option>Melee</option><option>Mixed weapons</option><option>Any weapon</option></select></label><label>Specific weapon<select className="field"><option>DR-H</option><option>AK-47</option><option>M4</option><option>Kilo 141</option><option>Any Assault Rifle</option></select></label><label>Game mode<select className="field"><option>Gunfight</option><option>Search and Destroy</option><option>Hardpoint</option><option>Team Deathmatch</option><option>Battle Royale</option><option>Custom Room</option></select></label></fieldset>
        <fieldset className="form-step"><legend>Step 4 - Map selection</legend><label>Map selection<select className="field"><option>Select one map</option><option>Suggest multiple maps</option><option>Map bans</option><option>Opponent chooses</option><option>Best-of-three map veto</option><option>Random map</option></select></label></fieldset>
        <fieldset className="form-step"><legend>Step 5 - Match rules</legend><label>Rules<textarea className="field" placeholder="Score limit, rounds, operator skills, scorestreaks, attachments, emulator/controller rules..." /></label></fieldset>
        <fieldset className="form-step"><legend>Step 6 - Schedule</legend><div className="form-grid"><label>Date<input className="field" placeholder="2026-08-12" /></label><label>Time<input className="field" placeholder="20:00" /></label><label>Time zone<input className="field" placeholder="GMT" /></label><label>Region/server<input className="field" placeholder="Europe" /></label></div></fieldset>
        <fieldset className="form-step"><legend>Step 7 - Wager</legend><label>Match category<select className="field"><option>Free match</option><option>Ranked match</option><option disabled>Wager match - disabled pending legal approval</option></select></label><WagerSafetyPanel /></fieldset>
        <fieldset className="form-step"><legend>Step 8 - Review</legend><p>Review shows the complete Agreement Panel before publishing. Both sides must approve changes before confirmation.</p></fieldset>
        <button className="btn primary" disabled>Create challenge when backend is connected</button>
      </form>
    </AppShell>
  );
}
