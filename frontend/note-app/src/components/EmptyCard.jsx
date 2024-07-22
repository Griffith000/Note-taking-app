import React from "react";

const EmptyCard = ({ image, caption }) => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-[350px] col-span-4">
      <div className="flex flex-col items-center justify-center mt-10 ">
        <img src={image} alt="empty" className="h-2/4" />
        <p className="text-center text-slate-400 w-2/3 text-lg mt-4">
          {caption}
        </p>
      </div>
    </div>
  );
};

export default EmptyCard;
