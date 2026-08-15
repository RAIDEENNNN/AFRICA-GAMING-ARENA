import { AppShell, PageHero } from "../components";
import { NotificationsPanel } from "../player-client";

export default function NotificationsPage() {
  return (
    <AppShell>
      <PageHero eyebrow="Notifications" title="Requests, approvals, disputes and follows." copy="Users control notification categories for matches, clans, tournaments, clips, warnings and billing." />
      <NotificationsPanel />
    </AppShell>
  );
}
