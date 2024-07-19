import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { getinitals } from "../utils/helper";
const ProfileInfo = ({ userInfo, onLogOut }) => {
  return (
    <div className="flex gap-5">
      <div className="bg-slate-300 text-lg text-slate-700 rounded-full w-12 h-12 flex items-center justify-center">
        {getinitals(userInfo.name)}
      </div>
      <div className="flex flex-col items-center  text-base font-normal text-black">
        <div className="">{userInfo.name}</div>
        <button className="underline " onClick={onLogOut}>
          log out
        </button>
      </div>
    </div>
  );
};

ProfileInfo.propTypes = {
  userInfo: PropTypes.shape({
    name: PropTypes.string.isRequired, // Add prop validation for 'name'
  }).isRequired,
  onLogOut: PropTypes.func.isRequired,
};

export default ProfileInfo;
