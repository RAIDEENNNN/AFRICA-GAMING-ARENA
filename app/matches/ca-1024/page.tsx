import { AgreementPanel, AppShell, PageHero, WagerSafetyPanel } from "../../components";

export default function MatchRoomPage() {
  return (
    <AppShell>
      <PageHero eyebrow="Match room" title="Xclusive vs Nova" copy="Private room for terms, chat, check-in, lobby details, evidence, result submission and disputes." primary={["Submit result soon", "/matches/ca-1024"]} />
      <section className="match-room-tabs">
        {["Overview", "Chat", "Agreement", "Evidence", "Results"].map((tab) => <a href={`#${tab.toLowerCase()}`} key={tab}>{tab}</a>)}
      </section>
      <section className="match-room-layout">
        <article className="product-card" id="overview"><h2>Match details</h2><p>CODM / 5v5 / Search and Destroy / Europe / check-in required 15 minutes before match.</p></article>
        <article className="product-card chat-window" id="chat"><h2>Match chat</h2><p><b>System:</b> Challenge created.</p><p><b>System:</b> Terms updated. Both sides must approve again.</p><p><b>XCL Venom:</b> Firing Range works for us.</p><input className="field chat-input" placeholder="Realtime match chat coming soon" disabled /></article>
        <div id="agreement"><AgreementPanel /></div>
      </section>
      <section className="card-grid three">
        <article className="product-card"><h2>Check-in</h2><p>Xclusive checked in. Nova pending. Missing teams receive reminders before forfeit rules apply.</p></article>
        <article className="product-card" id="evidence"><h2>Evidence</h2><p>Final score, round scores, lobby screenshot, match screenshots and recording can be required by admins.</p></article>
        <article className="product-card" id="results"><h2>Result logic</h2><p>If both submissions match, confirm result, update stats and leaderboard. If not, open dispute.</p></article>
      </section>
      <WagerSafetyPanel />
    </AppShell>
  );
}
