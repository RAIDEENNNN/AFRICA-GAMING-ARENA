"use client";

import { useState } from "react";
import { predictionCards } from "../competitive-core";

export function PredictionConsole() {
  const [picks, setPicks] = useState<Record<string, string>>({});

  return (
    <section className="core-grid three prediction-grid">
      {predictionCards.map((card) => {
        const pick = picks[card.id];
        return (
          <article className="product-card prediction-card" key={card.id}>
            <span className="tag">{card.type}</span>
            <h2>{card.title}</h2>
            <p>{card.game} / closes {card.closes} / reward {card.reward}. No cash betting is connected to predictions.</p>
            <div className="prediction-options">
              {card.options.map((option) => (
                <button className={pick === option ? "active" : ""} type="button" onClick={() => setPicks({ ...picks, [card.id]: option })} key={option}>
                  {option}
                </button>
              ))}
            </div>
            <strong>{pick ? `Pick saved locally: ${pick}` : "Choose a prediction"}</strong>
          </article>
        );
      })}
    </section>
  );
}
