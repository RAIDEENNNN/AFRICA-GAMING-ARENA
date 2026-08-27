import Link from "next/link";
import { AGAPageShell, SectionHeader, StatCard, StatusBadge, SupabaseNotice } from "../../aga-navigation";

const roleCards = [
  ["Owner", "Controls clan identity, recruitment and captain permissions."],
  ["Captain", "Can schedule matches, approve rosters and submit evidence."],
  ["Member", "Can join matches, upload clips and build match history."],
];

export default function CreateClanPage() {
  return (
    <AGAPageShell
      active="Clans"
      eyebrow="Clan Studio"
      title="CREATE CLAN"
      copy="Build a clan profile with identity, recruitment rules, game focus and role structure. Publishing remains locked until authenticated clan ownership is connected."
      actions={[{ label: "Find Clans", href: "/find-clans", variant: "secondary" }, { label: "Clan Directory", href: "/clans" }]}
    >
      <SupabaseNotice />
      <section className="aga-stat-grid">
        <StatCard label="Publish status" value="Locked" copy="Clan creation needs authenticated ownership before going live." />
        <StatCard label="Roster" value="Draft" copy="Invites and join requests will write to persistent clan tables." />
        <StatCard label="Games" value="3" copy="CODM, PUBG Mobile and Free Fire." />
        <StatCard label="Moderation" value="Required" copy="Names, badges and recruitment copy should be reviewable." />
      </section>

      <section className="aga-tournament-create-layout">
        <form className="aga-tournament-form">
          <div className="aga-form-heading">
            <StatusBadge tone="gold">Clan draft</StatusBadge>
            <h2>Clan identity</h2>
            <p>Set the basics players see before they request to join your squad.</p>
          </div>

          <div className="aga-form-grid">
            <label>Clan name<input placeholder="Example: Xclusive" /></label>
            <label>Clan tag<input placeholder="XCL" /></label>
            <label>
              Primary game
              <select defaultValue="CODM">
                <option>CODM</option>
                <option>PUBG Mobile</option>
                <option>Free Fire</option>
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
              Recruitment
              <select defaultValue="Application only">
                <option>Application only</option>
                <option>Open recruitment</option>
                <option>Invite only</option>
              </select>
            </label>
            <label>Minimum rank<input placeholder="Legendary, Master, Pro or open" /></label>
          </div>

          <label>
            Clan bio
            <textarea placeholder="Tell players what your clan competes in, what roles you need and what standards you expect." rows={5} />
          </label>

          <div className="aga-checklist-panel">
            <label><input type="checkbox" /> Require captains to approve new members.</label>
            <label><input type="checkbox" /> Show clan match history on profile pages.</label>
            <label><input type="checkbox" /> Allow clip submissions from members.</label>
          </div>

          <div className="aga-form-actions">
            <button className="aga-page-btn primary" type="button" disabled>Save Clan Draft Soon</button>
            <button className="aga-page-btn secondary" type="button" disabled>Publish Locked</button>
            <Link className="aga-page-btn secondary" href="/find-clans">Preview Directory</Link>
          </div>
        </form>

        <aside className="aga-create-side">
          <SectionHeader eyebrow="Roster roles" title="Clan permissions" copy="The page now shows the role structure players expect from a real esports clan tool." />
          <div className="aga-requirement-list">
            {roleCards.map(([title, copy]) => (
              <article key={title}>
                <strong>{title}</strong>
                <span>{copy}</span>
                <small>Permission model planned</small>
              </article>
            ))}
          </div>
          <div className="aga-create-preview">
            <StatusBadge tone="purple">Preview card</StatusBadge>
            <h3>XCL / Xclusive</h3>
            <p>Draft clan profile preview. Real owner, roster, applications and match record will appear after persistence is connected.</p>
            <dl>
              <div><dt>Game</dt><dd>CODM</dd></div>
              <div><dt>Recruitment</dt><dd>Application</dd></div>
              <div><dt>Publish</dt><dd>Locked</dd></div>
            </dl>
          </div>
        </aside>
      </section>
    </AGAPageShell>
  );
}
