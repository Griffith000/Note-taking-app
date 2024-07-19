import React from "react";

const EmptyCard = ({ image, caption }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <img src={image} alt="empty" className="w-1/4 h-1/4" />
      <p className="text-slate-400 text-lg mt-5">{caption}</p>
    </div>
  );
};

export default EmptyCard;
