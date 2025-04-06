import React from "react";

const Card = (props) => {
  const Png = props.png;
  return (
    <div
      className="flex justify-between items-center p-4 rounded-md h-40 text-white relative overflow-hidden shadow-lg"
      style={{
        background: props.color.backGround,
        boxShadow: props.color.boxShadow,
      }}
    >
      <div className="flex flex-col gap-2">
        <div>
          <h1 className="text-5xl font-bold">{props.value}</h1>
        </div>
        <div>
          <span className="text-sm">{props.title}</span>
        </div>
      </div>
      <div className="opacity-30 absolute right-0 -rotate-12">
        <Png className="w-32 h-32" />
      </div>
    </div>
  );
};

export default Card;
