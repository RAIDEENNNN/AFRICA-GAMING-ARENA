import Link from "next/link";

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
          <article><small>Multiplayer</small><h3>No MP tournament open</h3><p><b>0</b> registered teams</p><Link href="/tournaments/cma/schedule">View schedule</Link></article>
          <article><small>Battle Royale</small><h3>No BR tournament open</h3><p><b>0</b> registered players</p><Link href="/tournaments/cma/register">Join waitlist</Link></article>
        </aside>
      </section>
      <section className="cma-stat-strip">{["Tournaments hosted", "Registered players", "Prize pool awarded", "Matches played"].map((label) => <article key={label}><strong>{label === "Prize pool awarded" ? "$0" : "0"}</strong><span>{label}</span></article>)}</section>
      <section className="cma-weekly" id="weekly"><h2>Weekly Reports - Best of CMA</h2><div>{["Best Player", "Best Team", "Longest Survival", "Most Skilled", "Most Improved"].map((award) => <article key={award}><h3>{award}</h3><small>Waiting for first verified CMA event</small><b>No winner yet</b><p>Weekly award data will appear after real tournament results are approved.</p></article>)}</div><Link href="/tournaments/cma/weekly-reports">View Weekly Reports</Link></section>
      <section className="cma-info-grid">
        <article><h2>Why Join CMA?</h2>{["Daily CODM tournaments", "Demo rewards and recognition", "Weekly player reports", "Rules-first competition", "Grow your mobile skill"].map((item) => <p key={item}>{item}</p>)}</article>
        <article><h2>Live Tournaments</h2><p><b>No live CMA tournaments</b><span>Events will appear here after organiser publishing.</span><Link href="/tournaments/cma/register">Join waitlist</Link></p><Link href="/tournaments/cma/schedule">View schedule</Link></article>
        <article><h2>Daily Schedule</h2><p>No CMA schedule is published yet.</p><Link href="/tournaments/cma/schedule">Full Tournament Schedule</Link></article>
      </section>
      <section className="cma-lower"><article><h2>Recent Tournament Winners</h2><span>No winners yet. The first verified CMA champions will appear here.</span></article><aside><h2>Your Skill. Your Name. Your Legacy.</h2><p>Create your AGA profile now and get notified when CMA opens registration.</p><Link href="/tournaments/cma/register">Join Waitlist</Link></aside></section>
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
