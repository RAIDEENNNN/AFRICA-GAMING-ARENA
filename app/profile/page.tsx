import { ProfileLive } from "../arena-client";
import { AppShell, PageHero } from "../components";

export default function ProfilePage() {
  return (
    <AppShell>
      <PageHero eyebrow="Player profile" title="Your AGA identity" copy="Your authenticated player profile, rating, stats, clan and recent competitive activity." primary={["Edit settings", "/settings"]} />
      <ProfileLive />
    </AppShell>
  );
}
