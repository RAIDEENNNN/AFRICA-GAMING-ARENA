import { CreateChallengeFlow } from "../../arena-client";
import { AppShell, PageHero } from "../../components";

export default function MatchRequestPage() {
  return (
    <AppShell>
      <PageHero eyebrow="Create challenge" title="Build the exact match you want." copy="Choose game, player/team/clan format, weapon class, specific weapon, map, mode, rules, time, region and optional non-cash prize." />
      <CreateChallengeFlow />
    </AppShell>
  );
}
