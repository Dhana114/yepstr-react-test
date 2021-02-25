import React from "react";
import "./App.css";

/* Importing other components */

import API from "./api_services/api";
import { comparision } from "./utils/compare";
import { Card } from "./api_services/api_types";

export default function App() {
  const TOTAL_CARDS = 52;
  const [deckID, setDeckID] = React.useState("");
  const [cardCount, setcardCount] = React.useState(TOTAL_CARDS);
  const [wins, setwins] = React.useState(0);
  const [ongoingCard, setongoingCard] = React.useState<Card>({
    image: "",
    value: "",
  });

  //Updating the cards shuffle when needed
  React.useEffect(() => {
    shuffle();
  }, []);

  // Shuffle Cards
  const shuffle = () => {
    API.shuffleCards()
      .then((res) => {
        setDeckID(res.deck_id);
        return res.deck_id;
      })
      .then((deck_id) =>
        API.drawCard(deck_id).then((res) => {
          setongoingCard({
            image: res.cards[0].image,
            value: res.cards[0].value,
          });
          setcardCount(res.remaining);
        })
      );
  };
  // Comparing highest and lowest value
  const handlineComparision = (isHigher: number): void => {
    API.drawCard(deckID).then((res) => {
      const nextCard = res.cards[0];
      if (comparision(nextCard.value, ongoingCard.value) === isHigher) {
        setwins((wins) => wins + 1);
      }

      setongoingCard({
        image: nextCard.image,
        value: nextCard.value,
      });
      setcardCount(res.remaining);
    });
  };

  // Resetting to start new game
  const handleNewGame = () => {
    setcardCount(TOTAL_CARDS);
    setwins(0);
    shuffle();
  };

  // =====================================================================
  // Content in Home page
  const isFinalGame = cardCount === 0;
  return (
    <div className="App">
      <header className="header">
        <h1>Have fun with Game</h1>
      </header>

      <section className="App-content">
        <div className="game">
          <img src={ongoingCard.image} alt="card" />
          <div className="main-content">
            <h2 className="wins">Wins: {wins}</h2>
            <p className="remaninig-cards"> Remaining Cards: {cardCount}</p>
          </div>
          {!isFinalGame && (
            <button onClick={() => handlineComparision(-1)}>Lower Value</button>
          )}
          {!isFinalGame && (
            <button onClick={() => handlineComparision(1)}>Higher Value</button>
          )}
        </div>
        <div>
          {isFinalGame && (
            <button className="btn-newGame" onClick={handleNewGame}>
              Continue Playing
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
