import { MatchRoomClient } from "../../arena-client";
import { AppShell, PageHero } from "../../components";

export default function MatchRoomPage() {
  return (
    <AppShell>
      <PageHero
        eyebrow="Match room"
        title="Private challenge room"
        copy="Accept terms, confirm wager, chat, check in, upload evidence and submit verified results."
        primary={["Find another match", "/matches"]}
      />
      <MatchRoomClient roomId="ca-1024" />
    </AppShell>
  );
}
