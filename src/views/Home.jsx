import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../Assets/logo.png";
import Datasheet from "../components/Datasheet";
import { signout } from "../helper/authApis";

const Home = () => {
  // const column = [];
  const navigate = useNavigate();
  const [type, setType] = useState("all"); // all, my

  const specialEffects = "text-green-500 border-b-4 border-green-500";
  const noEffects = "";

  return (
    <div>
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-7">
              <div>
                <a href="#" className="flex items-center py-4 px-2">
                  <img src={Logo} alt="Logo" className="h-20 w-30 mr-2" />
                  <span className="font-semibold text-gray-500 text-lg">
                    Dashboard
                  </span>
                </a>
              </div>

              <div className="hidden md:flex items-center space-x-1 cursor-pointer">
                <a
                  onClick={() => setType("all")}
                  className={`py-4 px-2  font-semibold ${
                    type == "all" ? specialEffects : noEffects
                  }`}
                >
                  All Tasks
                </a>
                <a
                  onClick={() => setType("my")}
                  className={`py-4 px-2 font-semibold ${
                    type == "my" ? specialEffects : noEffects
                  }`}
                >
                  My Tasks
                </a>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-3 ">
              <a
                className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-800 transition duration-300 hover:cursor-pointer"
                onClick={() => navigate("createQuery")}
              >
                Raise a Query
              </a>
              <a
                className="py-2 px-2 font-medium text-white bg-red-400 rounded hover:bg-red-700 transition duration-300 hover:cursor-pointer"
                onClick={() => {
                  signout();
                  navigate("/signin");
                }}
              >
                Log out
              </a>
            </div>

            <div className="md:hidden flex items-center">
              <button className="outline-none mobile-menu-button">
                <svg
                  className=" w-6 h-6 text-gray-500 hover:text-green-500 "
                  x-show="!showMenu"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <Datasheet type={type} />
    </div>
  );
};

export default Home;
