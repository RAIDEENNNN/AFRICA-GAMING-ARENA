import Link from "next/link";
import { AGAPageShell, SectionHeader, StatCard, StatusBadge, SupabaseNotice } from "../../aga-navigation";

const moderationSteps = [
  ["Storage", "Direct upload and transcoding must be connected before publishing."],
  ["Moderation", "Clips should be scanned and reviewed before public feeds."],
  ["Attribution", "Creator, game, clan and match-room links need real account data."],
];

export default function ClipUploadPage() {
  return (
    <AGAPageShell
      active="Clips"
      eyebrow="Creator Studio"
      title="UPLOAD CLIP"
      copy="Prepare highlight clips with game tags, creator attribution and match context. Real upload is locked until storage and moderation are connected."
      actions={[{ label: "View Clips", href: "/clips" }, { label: "Player Profile", href: "/profile", variant: "secondary" }]}
    >
      <SupabaseNotice />
      <section className="aga-stat-grid">
        <StatCard label="Upload status" value="Locked" copy="No file storage is connected in this phase." />
        <StatCard label="Feed status" value="Preview" copy="Clip cards are UI-ready without fake engagement." />
        <StatCard label="Moderation" value="Required" copy="Public media needs review before release." />
        <StatCard label="Attribution" value="Account-based" copy="Creator identity should come from login sessions." />
      </section>

      <section className="aga-tournament-create-layout">
        <form className="aga-tournament-form">
          <div className="aga-form-heading">
            <StatusBadge tone="cyan">Clip draft</StatusBadge>
            <h2>Highlight details</h2>
            <p>Give every play enough context to feel like a real esports feed item.</p>
          </div>

          <div className="aga-upload-dropzone">
            <strong>Drop gameplay file here</strong>
            <span>MP4, MOV or WebM. Upload remains disabled until storage is connected.</span>
          </div>

          <div className="aga-form-grid">
            <label>Clip title<input placeholder="Example: Ranked round highlight" /></label>
            <label>
              Game
              <select defaultValue="CODM">
                <option>CODM</option>
                <option>PUBG Mobile</option>
                <option>Free Fire</option>
              </select>
            </label>
            <label>Match room ID<input placeholder="Optional match reference" /></label>
            <label>Tagged clan<input placeholder="Optional clan tag" /></label>
          </div>

          <label>
            Description
            <textarea placeholder="Add the rotation, weapon, map, tagged players and what made the clip worth watching." rows={5} />
          </label>

          <div className="aga-checklist-panel">
            <label><input type="checkbox" /> I own or have permission to upload this clip.</label>
            <label><input type="checkbox" /> This clip follows AGA community and tournament rules.</label>
            <label><input type="checkbox" /> Attach this clip to my player profile after approval.</label>
          </div>

          <div className="aga-form-actions">
            <button className="aga-page-btn primary" type="button" disabled>Upload Locked</button>
            <button className="aga-page-btn secondary" type="button" disabled>Save Draft Soon</button>
            <Link className="aga-page-btn secondary" href="/clips">Back to Clips</Link>
          </div>
        </form>

        <aside className="aga-create-side">
          <SectionHeader eyebrow="Publishing pipeline" title="Clip safety" copy="The page now has a real creator workflow without pretending video storage is live." />
          <div className="aga-requirement-list">
            {moderationSteps.map(([title, copy]) => (
              <article key={title}>
                <strong>{title}</strong>
                <span>{copy}</span>
                <small>Required before public release</small>
              </article>
            ))}
          </div>
          <div className="aga-create-preview">
            <StatusBadge tone="cyan">Feed preview</StatusBadge>
            <h3>Clip preview pending</h3>
            <p>No fake likes, views or comments. Engagement should only appear after real users interact with published clips.</p>
            <dl>
              <div><dt>Game</dt><dd>CODM</dd></div>
              <div><dt>Visibility</dt><dd>Draft</dd></div>
              <div><dt>Upload</dt><dd>Locked</dd></div>
            </dl>
          </div>
        </aside>
      </section>
    </AGAPageShell>
  );
}
