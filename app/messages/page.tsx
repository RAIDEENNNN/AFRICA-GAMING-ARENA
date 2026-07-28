import { AppShell, PageHero } from "../components";

export default function MessagesPage() {
  return (
    <AppShell>
      <PageHero eyebrow="Messages" title="Clan, direct and match conversations." copy="Realtime chat will connect here for clan rooms, match rooms and tournament announcements." />
      <section className="chat-layout">
        <aside className="product-card"><h2>Conversations</h2><p>Xclusive clan chat</p><p>Match room CA-1024</p><p>Tournament organisers</p></aside>
        <article className="product-card chat-window"><h2>Xclusive clan chat</h2><p><b>XCL Venom:</b> Good luck in today's scrim.</p><p><b>XCL Shadow:</b> New clip posted.</p><input className="field" placeholder="Messaging backend coming soon" disabled /></article>
      </section>
    </AppShell>
  );
}
