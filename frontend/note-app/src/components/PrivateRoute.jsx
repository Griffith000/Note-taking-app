import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const updateLoginStatus = () => {
      // Assuming the token is stored with the key 'authToken' in localStorage
      const token = localStorage.getItem("authToken");
      setIsLoggedIn(!!token); // Sets isLoggedIn to true if token exists, false otherwise

      if (!token) {
        navigate("/login");
      }
    };

    // Initial check
    updateLoginStatus();

    // Setup listener for changes in localStorage
    window.addEventListener("storage", updateLoginStatus);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("storage", updateLoginStatus);
  }, [navigate]);

  return isLoggedIn ? <Outlet /> : null;
};

export default PrivateRoute;
