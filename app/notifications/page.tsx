import { AppShell, PageHero } from "../components";
import { notificationTypes } from "../competitive-core";
import { NotificationsPanel } from "../player-client";

export default function NotificationsPage() {
  return (
    <AppShell>
      <PageHero eyebrow="Notifications" title="Requests, approvals, disputes and follows." copy="Users control notification categories for matches, clans, tournaments, clips, warnings and billing." />
      <section className="notification-preferences product-card">
        <h2>Notification Centre 2.0</h2>
        <p>Read, unread, mark all read and preference controls are grouped around the events that matter in the competitive ecosystem.</p>
        <div>{notificationTypes.map((type) => <span key={type}>{type}</span>)}</div>
      </section>
      <NotificationsPanel />
    </AppShell>
  );
}
