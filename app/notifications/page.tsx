import { AppShell, PageHero } from "../components";

export default function NotificationsPage() {
  return (
    <AppShell>
      <PageHero eyebrow="Notifications" title="Requests, approvals, disputes and follows." copy="Users control notification categories for matches, clans, tournaments, clips, warnings and billing." />
      <section className="stack">
        {["Match request received from Nova", "Clan application accepted", "Tournament registration approved", "Clip liked by GhostKing"].map((item) => (
          <article className="product-card" key={item}>{item}</article>
        ))}
      </section>
    </AppShell>
  );
}
