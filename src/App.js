import React, { useState } from "react";
import { ethers } from "ethers";

import { Button, Modal, Nav, Tile } from "./components";
import yellowArm from "./pictures/yellow-arm.png";
import greenArm from "./pictures/green-arm.png";

const App = () => {
  const [signer, setSigner] = useState();
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const connectWallet = async () => {
    setLoading(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    try {
      await provider.send("eth_requestAccounts", []);
      setSigner(provider.getSigner);
      setTimeout(() => setLoading(false), 1500);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="px-5 py-5 md:px-10">
      <Nav loading={loading} signer={signer} />
      {modalOpen && <Modal setModalOpen={setModalOpen} />}
      <div className="sm:flex mt-20 justify-between max-w-[1137px] ">
        {/** Left Side */}
        <div className="sm:ml-10">
          <h1 className="mb-4">NFTs with a Past will Build the Future.</h1>
          {signer && !loading ? (
            <div className="flex">
              <Button
                className="mr-4"
                onClick={() => setModalOpen(true)}
                disabled={modalOpen}
              >
                Highfive Someone
              </Button>
              <Button secondary disabled={modalOpen}>
                View Highfives
              </Button>
            </div>
          ) : (
            <Button
              className="min-w-[280px] disabled:hover:bg-diamond-800"
              onClick={connectWallet}
              disabled={loading}
              loading={loading}
            >
              Connect Wallet
            </Button>
          )}
          <img id="yellow" src={yellowArm} alt="hand receiving highfive" />
          <img id="green" src={greenArm} alt="hand giving highfive" />
        </div>

        {/** Right Side */}
        <div className="min-w-[40%] mx-5 sm:mx-0">
          <div className="max-h-[330px] overflow-scroll">
            <Tile />
            <Tile />
            <Tile />
            <Tile />
            <Tile />
            <Tile />
            <Tile />
          </div>
          <div className="bg-gradient-to-t from-diamond-500 via-diamond-500 to-transparent h-[50px] min-w-full mt-[-48px]" />
          <a href="/">
            <div className="flex items-center text-xs hover:text-diamond-700">
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
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
