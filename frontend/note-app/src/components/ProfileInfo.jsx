import React from "react";
import { getinitals } from "../utils/helper";
const ProfileInfo = ({ onLogOut }) => {
  return (
    <div className="flex gap-5">
      <div className="bg-slate-300 text-lg text-slate-700 rounded-full w-12 h-12 flex items-center justify-center">
        {getinitals("Harry Potter")}
      </div>
      <div className="flex flex-col items-center  text-base font-normal text-black">
        <div className="">Harry Potter</div>
        <button className="underline " onClick={onLogOut}>
          log out
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
