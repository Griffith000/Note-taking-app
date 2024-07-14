import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import { validateEmail, validatePassword } from "../utils/helper";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("Name is required");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid Email");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password must be atleast 6 characters long");
      return;
    }
    setError("");
    try {
      const res = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      console.log(res.data);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center  w-[30rem] shadow-md mx-auto mt-24 py-4 rounded-lg ">
        <div className=" w-3/4 text-2xl font-semibold -ml-5 py-5 ">SignUp</div>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-4">
            <input
              className="input-box"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
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
            Sign up
          </button>
          <p className="py-3 px-2 text-sm">
            already have an account?
            <Link
              to="/login"
              className="text-primary font-medium ml-2 hover:text-blue-700 transition underline"
            >
              login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;
