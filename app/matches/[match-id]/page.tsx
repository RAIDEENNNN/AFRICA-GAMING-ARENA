import { MatchRoomClient } from "../../arena-client";
import { AppShell, PageHero } from "../../components";

export default async function DynamicMatchPage({ params }: { params: Promise<{ "match-id": string }> }) {
  const { "match-id": id } = await params;
  return (
    <AppShell>
      <PageHero
        eyebrow="Match room"
        title="Private challenge room"
        copy="Accept terms, confirm wager, chat, check in, upload evidence and submit verified results."
        primary={["Find another match", "/matches"]}
      />
      <MatchRoomClient roomId={id} />
    </AppShell>
  );
}
