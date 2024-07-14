import React, { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
const Navbar = ({userInfo}) => {
  const navigate = useNavigate();
  const onLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    setSearchQuery(searchQuery);
  };
  const onClearSearch = () => {
    setSearchQuery("");
  };
  return (
    <div className="flex justify-between items-center sm:text-2xl md:text-3xl font-semibold py-4 md:py-5 px-7 md:px-11 shadow-md transition-all ease-in-out">
      <div className="flex items-center justify-center">Note</div>
      <SearchBar
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
      <ProfileInfo userInfo={userInfo} onLogOut={onLogOut} />
    </div>
  );
};

export default Navbar;
