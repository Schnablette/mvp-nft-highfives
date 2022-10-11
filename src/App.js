import React from "react";

import { Button, Nav, Tile } from "./components";
import yellowArm from "./pictures/yellow-arm.png";
import greenArm from "./pictures/green-arm.png";

const App = () => {
  return (
    <div className="px-5 py-5 md:px-10">
      <Nav />
      <div className="sm:flex mt-20 justify-between max-w-[1137px]">
        <div className="sm:ml-10">
          <h1>NFTs with a Past will Build the Future.</h1>
          <div className="flex mt-4">
            <Button className="mr-4">Highfive Someone</Button>
            <Button secondary>View Highfives</Button>
          </div>
          <img id="yellow" src={yellowArm} alt="hand receiving highfive" />
          <img id="green" src={greenArm} alt="hand giving highfive" />
        </div>

        <div className="min-w-[40%] mx-5 sm:mx-0 -z-10">
          <div className="max-h-[80%] overflow-y-scroll">
            <Tile />
            <Tile />
            <Tile />
            <Tile />
            <Tile />
          </div>
          <div className="bg-gradient-to-t from-diamond-500 via-diamond-500 to-transparent h-[50px] min-w-full mt-[-48px]" />
          <a className="flex items-center text-xs" href="/">
            See more interactions
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
