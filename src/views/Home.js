import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../Assets/logo.png";
import Datasheet from "./Datasheet";

const Home = () => {
  // const column = [];
  const navigate = useNavigate();

  return (
    <div>
      <nav class="bg-white shadow-lg">
        <div class="max-w-6xl mx-auto px-4">
          <div class="flex justify-between">
            <div class="flex space-x-7">
              <div>
                <a href="#" class="flex items-center py-4 px-2">
                  <img src={Logo} alt="Logo" class="h-20 w-30 mr-2" />
                  <span class="font-semibold text-gray-500 text-lg">
                    Dashboard
                  </span>
                </a>
              </div>

              <div class="hidden md:flex items-center space-x-1">
                <a
                  href=""
                  class="py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold "
                >
                  All Tasks
                </a>
                <a
                  href=""
                  class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
                >
                  My Tasks
                </a>
              </div>
            </div>

            <div class="hidden md:flex items-center space-x-3 ">
              <a
                class="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300"
                onClick={() => navigate("createQuery")}
              >
                Raise a Query
              </a>
            </div>

            <div class="md:hidden flex items-center">
              <button class="outline-none mobile-menu-button">
                <svg
                  class=" w-6 h-6 text-gray-500 hover:text-green-500 "
                  x-show="!showMenu"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
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
      <Datasheet />
    </div>
  );
};

export default Home;
