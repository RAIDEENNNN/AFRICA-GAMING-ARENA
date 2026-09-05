import { AppShell, PageHero } from "../components";
import { currentPlayer } from "../competitive-core";
import { PredictionConsole } from "./predictions-client";

export default function PredictionsPage() {
  return (
    <AppShell>
      <PageHero
        eyebrow="Non-cash picks"
        title="AGA Predictions"
        copy="Predict match winners, tournament winners, MVPs, map winners and series scores for XP, badges, streaks and leaderboard points only."
        primary={["Make picks", "#prediction-console"]}
        secondary={["View live matches", "/live"]}
      />
      <section className="core-command-strip">
        <article className="product-card"><small>Prediction streak</small><strong>4</strong><p>{currentPlayer.gamerTag} has four correct non-cash predictions in a row.</p></article>
        <article className="product-card"><small>Weekly points</small><strong>320</strong><p>Prediction leaderboard points do not transfer to wallet balance.</p></article>
        <article className="product-card"><small>Rewards</small><strong>XP + badges</strong><p>No deposits, withdrawals or wager payouts are connected.</p></article>
        <article className="product-card"><small>Leaderboards</small><strong>Global / Weekly / Season</strong><p>Prediction boards are separate from ranked MMR.</p></article>
      </section>
      <div id="prediction-console">
        <PredictionConsole />
      </div>
    </AppShell>
  );
}
