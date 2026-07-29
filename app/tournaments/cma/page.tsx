import Link from "next/link";

const awards = [
  ["Best Player", "MVP of the Week", "CMAXGhostYT", "Kills", "248", "Matches", "12"],
  ["Best Team", "Team of the Week", "Revenant Esports", "Points", "1,248", "Matches", "15"],
  ["Longest Survival", "BR Survival King", "LoneWolfXD", "Survival", "32:47", "Matches", "10"],
  ["Most Skilled", "Skill King", "SkillzMaster", "Accuracy", "78%", "K/D", "6.35"],
  ["Most Improved", "Climb of the Week", "RogueNinja", "Improvement", "+125", "Matches", "8"],
];

const liveTournaments = [
  ["CMA MP Night Cup", "Multiplayer", "5v5", "Registration open", "/tournaments/cma/register"],
  ["CMA BR Solo Cup", "Battle Royale", "Solo", "Under review", "/tournaments/cma/register"],
  ["CMA BR Squad Cup", "Battle Royale", "Squad", "Opens tonight", "/tournaments/cma/schedule"],
];

const winners = ["Team Venom", "SilentKiller", "Revenant Esports", "OverPower"];

export default function CMATournamentsPage() {
  return (
    <main className="cma-page">
      <CMANav />
      <section className="cma-hero">
        <picture className="cma-hero-art">
          <source media="(max-width: 640px)" srcSet="/images/cma/cma-hero-mobile.avif" type="image/avif" />
          <source media="(max-width: 1024px)" srcSet="/images/cma/cma-hero-tablet.avif" type="image/avif" />
          <source srcSet="/images/cma/cma-hero-desktop.avif" type="image/avif" />
          <img src="/images/cma/cma-hero-desktop.webp" alt="CMA CODM tournament stage" />
        </picture>
        <div className="cma-hero-copy">
          <span>Official CODM Tournament Partner</span>
          <h1>Compete.<em>Dominate.</em>Become Legendary.</h1>
          <p>Daily Call of Duty: Mobile tournaments for MP and BR players inside Africa Gaming Arena. Use your AGA profile, register once, and track status from dashboard to results.</p>
          <div className="cma-benefits"><b>Daily MP & BR</b><b>AGA profile login</b><b>Fair play rules</b><b>Powered by AGA</b></div>
          <Link className="cma-primary" href="/tournaments/cma/register">Join Tournament</Link><Link className="cma-secondary" href="/tournaments/cma/schedule">View Schedule</Link>
        </div>
        <aside>
          <h2>Upcoming Tournaments</h2>
          {["CMA Daily MP Cup", "CMA Daily BR Cup"].map((name, index) => (
            <article key={name}><small>{index ? "Battle Royale" : "Multiplayer"}</small><h3>{name}</h3><p><b>{index ? "05" : "02"}</b> hrs <b>34</b> mins <b>15</b> secs</p><Link href="/tournaments/cma/register">Register</Link></article>
          ))}
        </aside>
      </section>
      <section className="cma-stat-strip">{["Demo tournaments hosted", "Demo registered players", "Demo prize pool awarded", "Demo matches played"].map((label, index) => <article key={label}><strong>{["1,250+", "25,000+", "₦15M+", "87,000+"][index]}</strong><span>{label}</span></article>)}</section>
      <section className="cma-weekly" id="weekly"><h2>Weekly Reports - Best of CMA</h2><div>{awards.map((award) => <article key={award[0]}><h3>{award[0]}</h3><small>{award[1]}</small><b>{award[2]}</b><dl><div><dt>{award[3]}</dt><dd>{award[4]}</dd></div><div><dt>{award[5]}</dt><dd>{award[6]}</dd></div></dl></article>)}</div><Link href="/tournaments/cma/weekly-reports">View Full Weekly Report</Link></section>
      <section className="cma-info-grid">
        <article><h2>Why Join CMA?</h2>{["Daily CODM tournaments", "Demo rewards and recognition", "Weekly player reports", "Rules-first competition", "Grow your mobile skill"].map((item) => <p key={item}>{item}</p>)}</article>
        <article><h2>Live Tournaments</h2>{liveTournaments.map((item) => <p key={item[0]}><b>{item[0]}</b><span>{item[1]} · {item[2]} · {item[3]}</span><Link href={item[4]}>Open</Link></p>)}<Link href="/tournaments/cma/schedule">View All Live Tournaments</Link></article>
        <article><h2>Daily Schedule</h2>{["09:00 AM CMA MP Morning Cup", "02:00 PM CMA BR Afternoon Cup", "08:00 PM CMA MP Night Cup", "11:00 PM CMA BR Late Night Cup"].map((item) => <p key={item}>{item}</p>)}<Link href="/tournaments/cma/schedule">Full Tournament Schedule</Link></article>
      </section>
      <section className="cma-lower"><article><h2>Recent Tournament Winners</h2>{winners.map((name) => <span key={name}>{name} — demo prize</span>)}</article><aside><h2>Your Skill. Your Name. Your Legacy.</h2><p>Play today. Be featured tomorrow.</p><Link href="/tournaments/cma/register">Get Started</Link></aside></section>
      <section className="cma-rules-preview"><h2>Tournament Rules</h2><p>Call of Duty: Mobile only. No emulators unless the tournament specifically allows them. Player UID, roster lock, check-in, evidence, anti-cheat review and organiser approval are required.</p><Link href="/tournaments/cma/rules">Read CMA Rules</Link></section>
      <footer className="cma-footer"><b>CMA</b><p>CMA tournaments powered by Africa Gaming Arena.</p><p>Contact and support flows route through AGA until CMA organiser permissions go live.</p></footer>
    </main>
  );
}

export function CMANav() {
  return (
    <header className="cma-nav">
      <Link className="cma-mark" href="/tournaments/cma"><b>CMA</b><small>Call of Duty Mobile Tournaments</small></Link>
      <nav>
        <Link href="/tournaments/cma">Home</Link><Link href="/tournaments/cma/schedule">Schedule</Link><Link href="/tournaments/cma/leaderboard">Leaderboard</Link><Link href="/tournaments/cma/weekly-reports">Weekly Reports</Link><Link href="/tournaments/cma/rules">Rules</Link><Link href="/">Back to AGA</Link>
      </nav>
      <Link className="cma-login" href="/login">Login</Link><Link className="cma-register" href="/tournaments/cma/register">Register</Link>
    </header>
  );
}
