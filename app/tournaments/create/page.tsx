import Link from "next/link";
import { AGAPageShell, SectionHeader, StatCard, StatusBadge, SupabaseNotice } from "../../aga-navigation";

const requirementGroups = [
  ["Identity", "Verified organiser account", "Required before publishing"],
  ["Rules", "Evidence, dispute and no-show policy", "Required before check-in"],
  ["Format", "Game, teams, bracket and schedule", "Draftable now"],
  ["Safety", "No real-money payments in tournament setup", "Locked by policy"],
];

export default function CreateTournamentPage() {
  return (
    <AGAPageShell
      active="Tournaments"
      eyebrow="Organiser Studio"
      title="CREATE TOURNAMENT"
      copy="Set up an AGA tournament draft with clean rules, game format, schedule and registration requirements. Publishing stays locked until organiser auth and persistence are connected."
      actions={[{ label: "Back to Tournaments", href: "/tournaments", variant: "secondary" }, { label: "View CMA Hub", href: "/tournaments/cma" }]}
    >
      <SupabaseNotice />

      <section className="aga-stat-grid">
        <StatCard label="Publish status" value="Locked" copy="Organiser approval is required before a public event can open." />
        <StatCard label="Payments" value="Disabled" copy="No entry fees, escrow or payouts are enabled from this form." />
        <StatCard label="Draft data" value="Local preview" copy="Fields are UI-ready and waiting for persistent tournament storage." />
        <StatCard label="Compliance" value="Required" copy="Rules, evidence and dispute flows must be confirmed first." />
      </section>

      <section className="aga-tournament-create-layout">
        <form className="aga-tournament-form">
          <div className="aga-form-heading">
            <StatusBadge tone="purple">Draft builder</StatusBadge>
            <h2>Tournament details</h2>
            <p>Keep the setup focused: game, format, rules, registration window and match evidence.</p>
          </div>

          <div className="aga-form-grid">
            <label>
              Tournament name
              <input placeholder="Example: AGA CODM Invitational" />
            </label>
            <label>
              Game
              <select defaultValue="CODM">
                <option>CODM</option>
                <option>PUBG Mobile</option>
                <option>Free Fire</option>
              </select>
            </label>
            <label>
              Format
              <select defaultValue="Double elimination">
                <option>Single elimination</option>
                <option>Double elimination</option>
                <option>Round robin</option>
                <option>Group stage into playoffs</option>
              </select>
            </label>
            <label>
              Team size
              <select defaultValue="5v5">
                <option>1v1</option>
                <option>2v2</option>
                <option>4v4</option>
                <option>5v5</option>
              </select>
            </label>
            <label>
              Region
              <select defaultValue="Africa">
                <option>Africa</option>
                <option>Europe</option>
                <option>MENA</option>
                <option>Global</option>
              </select>
            </label>
            <label>
              Registration closes
              <input type="date" />
            </label>
          </div>

          <label>
            Rules summary
            <textarea placeholder="Add match rules, allowed maps, weapon restrictions, check-in rules and evidence requirements." rows={5} />
          </label>

          <div className="aga-checklist-panel">
            <label><input type="checkbox" /> Require every team captain to accept tournament rules.</label>
            <label><input type="checkbox" /> Require result screenshots or clip evidence.</label>
            <label><input type="checkbox" /> Allow organiser review before standings update.</label>
          </div>

          <div className="aga-form-actions">
            <button className="aga-page-btn primary" type="button" disabled>Save Draft Soon</button>
            <button className="aga-page-btn secondary" type="button" disabled>Publish Locked</button>
            <Link className="aga-page-btn secondary" href="/dashboard/cma-organiser">Open Organiser Dashboard</Link>
          </div>
        </form>

        <aside className="aga-create-side">
          <SectionHeader eyebrow="Before publishing" title="Organiser checks" copy="Tournament creation is visible and arranged now, while real publishing waits for authenticated organiser permissions." />
          <div className="aga-requirement-list">
            {requirementGroups.map(([title, copy, state]) => (
              <article key={title}>
                <strong>{title}</strong>
                <span>{copy}</span>
                <small>{state}</small>
              </article>
            ))}
          </div>
          <div className="aga-create-preview">
            <StatusBadge>Preview card</StatusBadge>
            <h3>AGA CODM Invitational</h3>
            <p>Draft event preview. Real teams, brackets and standings appear only after organiser publishing is connected.</p>
            <dl>
              <div><dt>Game</dt><dd>CODM</dd></div>
              <div><dt>Format</dt><dd>Double elimination</dd></div>
              <div><dt>Entry fee</dt><dd>Not enabled</dd></div>
            </dl>
          </div>
        </aside>
      </section>
    </AGAPageShell>
  );
}
