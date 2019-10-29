import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../card";
import "./table.css";

function CardTable() {
  const [cards, setCards] = useState([]);
  const [deck, setDeck] = useState("");
  const [selectedCards, setSelectedCards] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [showFace, setShowFace] = useState(false);
  const [showSelectedCard, setShowSelectedCard] = useState(false);
  const [shuffling, setShuffling] = useState(false);
  const [lose, setLose] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    getDeck();
  });

  function getDeck(reset) {
    if (deck === "" || reset) {
      axios
        .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(response => {
          setDeck(response.data.deck_id);
          getCards(response.data.deck_id);
        });
    }
  }

  function getCards(id) {
    axios
      .get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=8`)
      .then(response => setCards(response.data.cards));
  }

  function handleCardClick(card) {
    if (hasWon || lose) {
      return;
    }
    if (selectedCards.length === 0) {
      // handle first card picked
      setSelectedCards([...selectedCards, card]);
      setShowSelectedCard(true);
      setCorrectCount(correctCount + 1);
      //setShowFace(true);
    } else if (!shuffling) {
      if (!selectedCards.includes(card)) {
        setSelectedCards([...selectedCards, card]);
        setCorrectCount(correctCount + 1);
        if (correctCount === 7) {
          return setHasWon(true);
        }
      } else {
        return setLose(true);
      }
    }
    if (!shuffling) {
      shuffleCardsEvent();
    }
  }

  function shuffleCardsEvent() {
    setShuffling(true);
    setTimeout(() => {
      setShowSelectedCard(false);
      setShowFace(false);
      setCards(shuffleArray(cards));
      setTimeout(() => {
        setShowFace(true);
        setShuffling(false);
      }, 1000);
    }, 1000);
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  function reset() {
    setShuffling(false);
    setShowFace(false);
    setSelectedCards([]);
    setLose(false);
    setHasWon(false);
    setShowSelectedCard(false);
    setCorrectCount(0);
    getDeck(true);
  }

  return (
    <div className="table">
      <div className="tableText">
        {!lose && selectedCards.length === 0 ? (
          <p>
            Goal: Pick Cards from the shown cards and try not to pick one you
            picked before!
          </p>
        ) : (
          ""
        )}
        {!lose && selectedCards.length === 0 ? <p>Pick the first Card</p> : ""}
        {!lose && selectedCards.length > 0 ? (
          <p>Now pick a card you have not picked before</p>
        ) : (
          ""
        )}
        {lose ? <h3>You Lost!</h3> : ""}
        {hasWon ? <h3>You Won!</h3> : ""}
        {lose || hasWon ? (
          <button className="playAgainButton" onClick={reset}>
            Play Again?
          </button>
        ) : (
          ""
        )}
        <p className="score">SCORE: {correctCount}</p>
      </div>
      <div className="tableWrapper">
        {cards.map(card => (
          <Card
            card={card}
            click={handleCardClick}
            show={showFace}
            showSelected={
              showSelectedCard && selectedCards[0].code === card.code
            }
            isShuffling={shuffling}
          />
        ))}
      </div>
    </div>
  );
}

export default CardTable;
