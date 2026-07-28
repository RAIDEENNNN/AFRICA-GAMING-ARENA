import { AppShell, ClipCard, PageHero } from "../components";
import { clips } from "../data";

export default function ClipsPage() {
  return (
    <AppShell>
      <PageHero eyebrow="Clips" title="Gameplay content with clan context." copy="Browse trending, latest and followed clips by game, clan, tournament and region." primary={["Upload clip", "/clips/upload"]} />
      <section className="clips-feed">
        {clips.map((clip) => <ClipCard clip={clip} key={clip.title} />)}
      </section>
    </AppShell>
  );
}
