import React from "react";
import Navbar from "../components/Navbar";
import Lottie from "lottie-react";
import notePaper from "../lottie animations/notePaper.json";
import arrow from "../lottie animations/arrow.json";
import { Link } from "react-router-dom";
const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <div className="container flex md:justify-center items-center md:gap-2 gap-8 content-center h-svh mx-auto -mt-20 transition-all duration-300 ">
        <div className="flex flex-col md:justify-center justify-end items-center tracking-wide ">
          <h1 className="md:text-6xl text-4xl font-bold text-center">
            Welcome to Note App
          </h1>
          <p
            className="md:text-xl text-lg md:self-start self-center"
            style={{ lineHeight: "3" }}
          >
            A simple note taking app
          </p>

          <button className="relative md:self-start self-center  text-lg text-white bg-primary border border-slate-200 rounded-lg px-3 py-3 mx-10 mt-5 hover:bg-blue-600 hover:tansition-all duration-200 cursor-pointer">
            <Link to="/login">Get Started</Link>
            <Lottie
              className="absolute top-11 left-20 "
              animationData={arrow}
            />
          </button>
        </div>
        <div className="flex md:justify-center justify-around">
          <Lottie animationData={notePaper} className="w-1/2 h-1/2" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
