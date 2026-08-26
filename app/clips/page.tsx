import { AGAPageShell, DataCard, EmptyState, FilterTabs, SectionHeader, StatCard, SupabaseNotice } from "../aga-navigation";
import { clips } from "../data";

export default function ClipsPage() {
  return (
    <AGAPageShell
      active="Clips"
      eyebrow="Highlights"
      title="GAME CLIPS"
      copy="Watch, share and get featured by game, clan, tournament, weapon and map. Mobile will use a vertical feed once Supabase Storage is connected."
      actions={[{ label: "Upload Clip", href: "/clips/upload" }]}
    >
      <SupabaseNotice />
      <FilterTabs tabs={["Trending", "Recent", "Popular", "CODM", "PUBG Mobile", "Free Fire", "Following"]} />
      <section className="aga-stat-grid">
        <StatCard label="Uploaded clips" value="0" copy="Real clips require storage and moderation." />
        <StatCard label="Engagement" value="Off" copy="No fake likes, views or comments." />
        <StatCard label="Feed mode" value="Mobile" copy="Vertical feed layout is prepared." />
        <StatCard label="Upload" value="Ready UI" copy="Persistence connects in the storage phase." />
      </section>
      <SectionHeader eyebrow="Feed preview" title="Clip cards are ready for real uploads" copy="These entries demonstrate feed structure only. Real engagement counts will appear after clip persistence exists." />
      <section className="aga-card-grid">
        {clips.map((clip, index) => (
          <DataCard
            action="View Clip"
            copy={`${clip.creator} clip preview for ${clip.game}. Likes and views are not shown as official metrics until persisted.`}
            eyebrow={clip.game}
            href={`/clips/${index + 1}`}
            key={clip.title}
            meta={[`Creator: ${clip.creator}`, "Views: pending real analytics", "Likes: pending real backend"]}
            title={clip.title}
            tone={index === 1 ? "cyan" : index === 2 ? "purple" : "gold"}
          />
        ))}
      </section>
      <EmptyState title="No persisted clips yet" copy="Share the first legendary moment. Clip uploads will use storage for videos and thumbnails." action="Upload Clip" href="/clips/upload" />
    </AGAPageShell>
  );
}
