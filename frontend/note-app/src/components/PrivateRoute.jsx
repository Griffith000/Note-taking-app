import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const navigate = useNavigate();
  let auth = { token: localStorage.getItem("token") }; // Assuming the token is stored in localStorage

  useEffect(() => {
    if (!auth.token) {
      navigate("/login");
    }
  }, [auth.token, navigate]); // Dependency array to re-run the effect if these values change

  return auth.token ? <Outlet /> : null; // Render Outlet if authenticated, otherwise render nothing
};

export default PrivateRoute;
