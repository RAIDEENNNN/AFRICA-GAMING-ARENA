import { AGAPageShell, PagePanel } from "../aga-navigation";

export default function AboutPage() {
  return (
    <AGAPageShell active="/about" eyebrow="AGA" title="ABOUT AFRICA GAMING ARENA" copy="A competitive home for African mobile gamers across clans, tournaments, clips, rankings and community growth.">
      <PagePanel title="Built for players">
        <p>AGA is being built as a real esports platform, not a fake activity board. The product will grow from verified users, matches, clans and organisers.</p>
      </PagePanel>
    </AGAPageShell>
  );
}
