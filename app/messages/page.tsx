import { AppShell, PageHero } from "../components";

export default function MessagesPage() {
  return (
    <AppShell>
      <PageHero eyebrow="Messages" title="Clan, direct and match conversations." copy="Realtime chat will connect here for clan rooms, match rooms and tournament announcements." />
      <section className="chat-layout">
        <aside className="product-card"><h2>Conversations</h2><p>No clan chats yet</p><p>No direct messages yet</p><p>No organiser threads yet</p></aside>
        <article className="product-card chat-window"><h2>No conversation selected</h2><p>Messages will appear only after authenticated clan rooms, direct threads or match rooms exist.</p><input className="field" placeholder="Messaging backend coming soon" disabled /></article>
      </section>
    </AppShell>
  );
}
