import React from "react";
import Card from "../Card/Card";

const Cards = ({ CardsData }) => {
  console.log(CardsData);
  return (
    <div className="flex mt-4 py-4 flex-col sm:flex-row flex-wrap gap-4 w-full">
      {CardsData.map((card, index) => (
        <div
          key={index}
          className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.67rem)]"
        >
          <Card
            title={card.title}
            color={card.color}
            value={card.value}
            png={card.png}
          />
        </div>
      ))}
    </div>
  );
};

export default Cards;
