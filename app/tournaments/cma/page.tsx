import Link from "next/link";
import Image from "next/image";

const awards = [
  ["Best Player", "MVP of the Week", "CMAXGhostYT", "Kills", "248", "Matches", "12"],
  ["Best Team", "Team of the Week", "Revenant Esports", "Points", "1,248", "Matches", "15"],
  ["Longest Survival", "BR Survival King", "LoneWolfXD", "Survival", "32:47", "Matches", "10"],
  ["Most Skilled", "Skill King", "SkillzMaster", "Accuracy", "78%", "K/D", "6.35"],
  ["Most Improved", "Climb of the Week", "RogueNinja", "Improvement", "+125", "Matches", "8"],
];

export default function CMATournamentsPage() {
  return (
    <main className="cma-page">
      <header className="cma-nav">
        <Link className="cma-mark" href="/tournaments/cma"><b>CMA</b><small>Call of Duty Mobile Tournaments</small></Link>
        <nav>
          <Link href="/tournaments/cma">Home</Link><Link href="/tournaments">Tournaments</Link><Link href="/leaderboard">Leaderboard</Link><Link href="#weekly">Weekly Reports</Link><Link href="/notifications">News</Link><Link href="/">Back to AGA</Link>
        </nav>
        <Link className="cma-login" href="/login">Login</Link><Link className="cma-register" href="/register">Register</Link>
      </header>
      <section className="cma-hero">
        <div>
          <span>Daily Tournaments</span>
          <h1>Compete.<em>Dominate.</em>Become Legendary.</h1>
          <p>Daily Call of Duty: Mobile tournaments for MP and BR players. Show your skill, earn demo rewards and get recognised.</p>
          <div className="cma-benefits"><b>Daily MP & BR</b><b>Rewards</b><b>Fair Play</b><b>Community</b></div>
          <Link className="cma-primary" href="/register">Join Tournament</Link><Link className="cma-secondary" href="#schedule">View Schedule</Link>
        </div>
        <Image src="/images/aga/codm-portal.webp" alt="Original tactical Call of Duty: Mobile style CMA artwork" width={720} height={420} priority unoptimized />
        <aside>
          <h2>Upcoming Tournaments</h2>
          {["CMA Daily MP Cup", "CMA Daily BR Cup"].map((name, index) => (
            <article key={name}><small>{index ? "Battle Royale" : "Multiplayer"}</small><h3>{name}</h3><p><b>02</b> hrs <b>34</b> mins <b>15</b> secs</p><Link href="/register">Register</Link></article>
          ))}
        </aside>
      </section>
      <section className="cma-stat-strip">{["Demo tournaments hosted", "Demo registered players", "Demo prize pool awarded", "Demo matches played"].map((label, index) => <article key={label}><strong>{["1,250+", "25,000+", "₦15M+", "87,000+"][index]}</strong><span>{label}</span></article>)}</section>
      <section className="cma-weekly" id="weekly"><h2>Weekly Reports - Best of CMA</h2><div>{awards.map((award) => <article key={award[0]}><h3>{award[0]}</h3><small>{award[1]}</small><b>{award[2]}</b><dl><div><dt>{award[3]}</dt><dd>{award[4]}</dd></div><div><dt>{award[5]}</dt><dd>{award[6]}</dd></div></dl></article>)}</div><Link href="/leaderboard">View Full Weekly Report</Link></section>
      <section className="cma-info-grid">
        <article><h2>Why Join CMA?</h2>{["Daily tournaments", "Rewards and prizes", "Weekly recognition", "Fair and competitive", "Grow your skills"].map((item) => <p key={item}>{item}</p>)}</article>
        <article><h2>Live Tournaments</h2>{["CMA MP Night Cup", "CMA BR Solo Cup", "CMA BR Squad Cup"].map((item) => <p key={item}><b>{item}</b><Link href="/register">Join Now</Link></p>)}<Link href="/tournaments">View All Live Tournaments</Link></article>
        <article id="schedule"><h2>Tournament Schedule</h2>{["09:00 AM CMA MP Morning Cup", "02:00 PM CMA BR Afternoon Cup", "08:00 PM CMA MP Night Cup", "11:00 PM CMA BR Late Night Cup"].map((item) => <p key={item}>{item}</p>)}<Link href="/tournaments">Full Tournament Schedule</Link></article>
      </section>
      <section className="cma-lower"><article><h2>Recent Tournament Winners</h2>{["Team Venom", "SilentKiller", "Revenant Esports", "OverPower"].map((name) => <span key={name}>🏆 {name} — demo prize</span>)}</article><aside><h2>Your Skill. Your Name. Your Legacy.</h2><p>Play today. Be featured tomorrow.</p><Link href="/register">Get Started</Link></aside></section>
      <footer className="cma-footer"><b>CMA</b><p>CMA tournaments powered by Africa Gaming Arena.</p><p>Contact details pending confirmation. Newsletter and social links will be connected before launch.</p></footer>
    </main>
  );
}
