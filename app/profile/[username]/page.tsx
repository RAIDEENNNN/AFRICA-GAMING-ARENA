import { ProfileLive } from "../../arena-client";
import { AppShell, PageHero } from "../../components";

export function generateStaticParams() {
  return [{ username: "PlayerOne" }, { username: "NovaAce" }, { username: "RivalUser" }];
}

export default async function PlayerProfileRoute({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  return (
    <AppShell>
      <PageHero eyebrow="Player profile" title={`@${username}`} copy="Authenticated player stats, clan status and competitive activity from AGA account data where available." primary={["Find match", "/matches"]} />
      <ProfileLive />
    </AppShell>
  );
}
