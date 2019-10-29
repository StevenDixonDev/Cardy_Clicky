import React from 'react';
import "./card.css";

function Card({card, click, show, showSelected, isShuffling}){
  const cardBack = "https://cdn.shopify.com/s/files/1/0200/7616/products/playing-cards-bicycle-rider-back-1_1024x1024.png?v=1535755695";

  const getClass = () => {
    return isShuffling ? "cardImage" : "cardImage ready"; 
  }

  return <div onClick={() => click(card)} className="card" >
    <img className={getClass()} src={show || showSelected? card.image: cardBack} alt={card.code}></img>
  </div>
}

export default Card;