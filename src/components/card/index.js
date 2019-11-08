import React from "react";
import "./card.css";

function Card({ card, click, show, showSelected, isShuffling }) {
  const cardBack =
    "https://cdn.shopify.com/s/files/1/0200/7616/products/playing-cards-bicycle-rider-back-1_1024x1024.png?v=1535755695";

  const getClass = () => {
    let classN = "card ";
    if(!isShuffling){
      classN += "ready ";
    }
    if(!show && !showSelected){
      classN += "is-flipped";
    }

    return classN;
  };
  return (
      <div className={getClass()} onClick={() => click(card)}>
        <div
          className="card__face card__face--front"
          style={{ background: `url(${card.image})` }}
        ></div>
        <div
          className="card__face card__face--back"
          style={{ background: `url(${cardBack})` }}
        ></div>
      </div>
  );
}

//<img className={getClass()} src={show || showSelected? card.image: cardBack} alt={card.code}></img>

export default Card;
