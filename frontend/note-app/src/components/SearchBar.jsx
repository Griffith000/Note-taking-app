import React from "react";
import { IoMdClose } from "react-icons/io";
import { FaMagnifyingGlass } from "react-icons/fa6";
const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="relative flex items-center text-slate-400 md:min-w-screen-md sm:max-w-screen-sm">
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={onChange}
        className=" px-4 py-2 text-base text-slate-700 bg-slate-100 border  border-gray-200 rounded-md focus:outline-none"
      />
      {value && (
        <IoMdClose
          onClick={onClearSearch}
          size={22}
          className="absolute right-14 cursor-pointer"
        />
      )}
      <FaMagnifyingGlass
        onClick={handleSearch}
        size={22}
        className="absolute right-4 cursor-pointer"
      />
    </div>
  );
};

export default SearchBar;
