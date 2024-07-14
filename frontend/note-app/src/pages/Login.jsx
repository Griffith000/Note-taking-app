import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput.jsx";
import { validateEmail, validatePassword } from "../utils/helper.js";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Invalid Email");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password must be atleast 6 characters long");
      return;
    }
    setError("");
    // use axios to fetch
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      console.log(res.data);
      navigate("/dashboard");
    } catch (error) {
      setError("An error occurred while logging in");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center  w-[30rem] shadow-md mx-auto mt-24 py-4 rounded-lg ">
        <div className=" w-3/4 text-2xl font-semibold -ml-5 py-5 ">Login</div>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-4">
            <input
              className="input-box"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-6">
            <PasswordInput
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button className="btn-primary" type="submit">
            Log In
          </button>
          <p className="py-3 px-2 text-sm">
            havent registered yet?
            <Link
              to="/signup"
              className="text-primary font-medium ml-2 hover:text-blue-700 transition underline"
            >
              sign up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
