import { AGAPageShell, PagePanel } from "../aga-navigation";

export default function RulesPage() {
  return (
    <AGAPageShell active="/rules" eyebrow="Fair play" title="RULES" copy="AGA rules protect match integrity, tournament fairness and player safety.">
      <section className="aga-info-grid">
        {["No cheating", "No fake results", "Evidence required", "Respect opponents", "Organiser decisions", "Account safety"].map((rule) => (
          <PagePanel title={rule} key={rule}><p>Detailed enforcement text will be published before public competition opens.</p></PagePanel>
        ))}
      </section>
    </AGAPageShell>
  );
}
