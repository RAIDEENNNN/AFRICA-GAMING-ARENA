import { AGAPageShell, DataCard, EmptyState, PagePanel, SectionHeader } from "../../aga-navigation";
import { clips } from "../../data";

export function generateStaticParams() {
  return clips.map((_, index) => ({ id: String(index + 1) }));
}

export default async function ClipDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const clip = clips[Number(id) - 1] ?? clips[0];
  return (
    <AGAPageShell active="Clips" eyebrow={clip.game} title={clip.title} copy="Clip detail pages are prepared for video playback, comments and sharing once storage and engagement persistence are connected.">
      <PagePanel title="Clip preview">
        <p>Creator: {clip.creator}. Official views, likes and comments are hidden until real analytics exist.</p>
      </PagePanel>
      <SectionHeader eyebrow="Actions" title="Engagement coming with persistence" />
      <section className="aga-card-grid two">
        <DataCard title="View creator profile" copy="Profiles will show verified stats, clips, achievements and clan history." href={`/profile/${clip.creator.replaceAll(" ", "")}`} action="View Profile" />
        <DataCard title="Share flow" copy="Sharing UI will be enabled once clip URLs and moderation states are persistent." tone="cyan" />
      </section>
      <EmptyState title="Comments are not enabled yet" copy="Real comments require authenticated persistence and moderation." />
    </AGAPageShell>
  );
}
