import Link from "next/link";
import { AGAPageShell, EmptyState, FilterTabs, PagePanel, SupabaseNotice } from "../aga-navigation";

export default function TournamentsPage() {
  return (
    <AGAPageShell
      active="Tournaments"
      eyebrow="Events"
      title="ALL TOURNAMENTS"
      copy="Browse official and partner tournaments by game, format, status and organiser. Real events will appear here from Supabase."
      actions={[{ label: "View CMA Tournaments", href: "/tournaments/cma" }, { label: "Create Tournament", href: "/dashboard/cma-organiser", variant: "secondary" }]}
    >
      <SupabaseNotice />
      <FilterTabs tabs={["All", "CODM", "PUBG Mobile", "Free Fire", "CMA", "Upcoming", "Live", "Completed"]} />
      <EmptyState
        title="No tournaments are open yet"
        copy="Be the first organiser to prepare the arena. Tournament cards will show organiser, start date, entry type, capacity, registration status and rewards once real records exist."
        action="Open CMA Hub"
        href="/tournaments/cma"
      />
      <PagePanel title="CMA tournaments">
        <p>CMA tournament registration will appear here when CODM events are opened by an authorised organiser.</p>
        <Link className="aga-page-btn secondary" href="/tournaments/cma">View CMA Tournaments</Link>
      </PagePanel>
    </AGAPageShell>
  );
}
