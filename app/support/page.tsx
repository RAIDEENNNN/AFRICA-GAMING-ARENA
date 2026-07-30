import { AGAPageShell, PagePanel } from "../aga-navigation";

const supportTopics = [
  "Account support",
  "Match dispute",
  "Clip report",
  "Vendor verification",
  "Tournament organiser access",
  "Technical support",
  "Community guidelines",
  "Safety review",
];

export default function SupportPage() {
  return (
    <AGAPageShell active="/support" eyebrow="Help" title="SUPPORT" copy="Support for accounts, match disputes, reports, organisers, vendors and platform access.">
      <section className="aga-info-grid">
        {supportTopics.map((topic) => (
          <PagePanel title={topic} key={topic}>
            <p>Ticket handling will connect to Supabase before public launch.</p>
          </PagePanel>
        ))}
      </section>
    </AGAPageShell>
  );
}
