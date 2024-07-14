import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ value, placeholder, onChange }) => {
  const [isPasswordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(!isPasswordShown);
  };

  return (
    <div className="relative flex justify-between items-center">
      <input
        className="input-box"
        type={isPasswordShown ? "text" : "password"}
        value={value}
        placeholder={placeholder || "Password"}
        onChange={onChange}
      />
      {isPasswordShown ? (
        <FaRegEye
          size="22"
          onClick={togglePasswordVisiblity}
          className="absolute left-[21rem] text-gray-500 cursor-pointer"
        />
      ) : (
        <FaRegEyeSlash
          size="22"
          onClick={togglePasswordVisiblity}
          className="absolute left-[21rem] text-gray-500 cursor-pointer"
        />
      )}
    </div>
  );
};

PasswordInput.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default PasswordInput;
