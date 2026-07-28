import { ProfileLive } from "../arena-client";
import { AppShell, PageHero } from "../components";

export default function ProfilePage() {
  return (
    <AppShell>
      <PageHero eyebrow="Player profile" title="PlayerOne" copy="Legendary CODM player, Xclusive officer, objective support, available evenings in Europe." primary={["Edit settings", "/settings"]} />
      <ProfileLive />
    </AppShell>
  );
}
