import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import {
  Button,
  InitiationModal,
  Nav,
  ReceptionModal,
  Tile,
} from "./components";
import yellowArm from "./pictures/yellow-arm.png";
import greenArm from "./pictures/green-arm.png";

import contractABI from "./NftHighFives.json";

const App = () => {
  const [signer, setSigner] = useState();
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [provider, setProvider] = useState();
  const [bannerMsg, setBannerMsg] = useState(false);

  useEffect(() => {
    console.log(events);
  }, [events]);

  const connectWallet = async () => {
    setLoading(true);
    const newProvider = new ethers.providers.Web3Provider(window.ethereum);

    setProvider(newProvider);

    try {
      await newProvider.send("eth_requestAccounts", []);
      const newSigner = newProvider.getSigner();
      setSigner(newSigner);
      const contract = new ethers.Contract(
        "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        contractABI.abi,
        newSigner
      );
      contract.on("InteractionInitiated", (token, tokenId, receiver) => {
        let info = {
          token,
          tokenId: ethers.utils.formatUnits(tokenId).replace(".0", ""),
          receiver,
          type: "initiated",
        };
        setEvents([...events, info]);
      });
      contract.on("InteractionReceived", (token, tokenId, receiver) => {
        let info = {
          token,
          tokenId: ethers.utils.formatUnits(tokenId).replace(".0", ""),
          receiver,
          type: "received",
        };
        setEvents([...events, info]);
      });
      contract.on("InteractionRejected", (token, tokenId, receiver) => {
        let info = {
          token,
          tokenId: ethers.utils.formatUnits(tokenId).replace(".0", ""),
          receiver,
          type: "rejected",
        };
        setEvents([...events, info]);
      });
      setTimeout(() => setLoading(false), 1500);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {bannerMsg && (
        <div
          className={`bg-red-400 p-3 sticky top-0 -translate-y-12 transition z-50 leading-loose flex justify-between items-center ${
            bannerMsg && "translate-y-0"
          }`}
        >
          <div />
          <p className="text-center">{bannerMsg}</p>
          <div><button
          className="hover:opacity-50 active:opacity-30 rounded"
          onClick={() => setBannerMsg("")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button></div>

        </div>
      )}
      <div className="px-5 py-5 md:px-10">
        <Nav loading={loading} signer={signer} />
        {modalOpen && (
          <InitiationModal
            setBannerMsg={setBannerMsg}
            setModalOpen={setModalOpen}
            signer={signer}
          />
        )}
        {receiptModalOpen && (
          <ReceptionModal
            setBannerMsg={setBannerMsg}
            setModalOpen={setReceiptModalOpen}
            signer={signer}
          />
        )}
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
                <Button
                  secondary
                  onClick={() => setReceiptModalOpen(true)}
                  disabled={modalOpen}
                >
                  Receive Highfive
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
          <div className="min-w-[40%] mx-5">
            <div className="max-h-[330px] ">
              {events.map((eventData) => {
                return <Tile eventData={eventData} />;
              })}
            </div>
            {/* {events.length > 0 && (
              <>
                <div className="bg-gradient-to-t from-diamond-500 via-diamond-500 to-transparent h-[50px] min-w-full mt-[-48px] z-10" />
                <a href="/">
                  <div className="flex items-center text-xs hover:text-diamond-700">
                    See all interactions
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
              </>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
