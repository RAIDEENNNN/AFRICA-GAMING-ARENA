import { AGAPageShell, EmptyState, FilterTabs, SupabaseNotice } from "../aga-navigation";

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
      <EmptyState
        title="No clips have been uploaded yet"
        copy="Share the first legendary moment. Clip uploads will use Supabase Storage for videos and thumbnails."
        action="Upload Clip"
        href="/clips/upload"
      />
    </AGAPageShell>
  );
}
