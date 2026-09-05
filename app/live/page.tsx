import Link from "next/link";
import { AppShell, PageHero } from "../components";
import { championshipEvents, liveCards } from "../competitive-core";

export default function LivePage() {
  return (
    <AppShell>
      <PageHero
        eyebrow="AGA Live"
        title="Watch the arena"
        copy="Follow live matches, upcoming matches, live tournaments, featured streams and AGA Championship events without hardcoding fake real streams."
        primary={["View matches", "/matches"]}
        secondary={["Championships", "/championships"]}
      />
      <section className="live-grid">
        {liveCards.map((card) => (
          <article className="product-card live-card" key={card.id}>
            <div className="video-thumb"><button type="button" disabled title="Video embeds are not connected yet">Embed pending</button><span>{card.status}</span></div>
            <span className="tag live">{card.game}</span>
            <h2>{card.title}</h2>
            <p>{card.teams} / {card.tournament} / viewers: {card.viewers}</p>
            <div className="button-row">
              <Link className="btn primary small" href={card.href}>Open Event</Link>
              <button className="btn secondary small" type="button" disabled title="YouTube/Twitch embeds are not configured">Watch disabled</button>
            </div>
          </article>
        ))}
      </section>
      <section className="page-section">
        <div className="section-heading"><span className="eyebrow">Championship watchlist</span><h2>Upcoming official stages</h2></div>
        <div className="core-grid five">
          {championshipEvents.map((event) => (
            <article className="product-card compact-core-card" key={event.stage}>
              <small>{event.status}</small>
              <h3>{event.stage}</h3>
              <p>{event.game} / {event.date}</p>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
