import React, { useState } from "react";

import { Badge } from "./Badge";

export const Tile = ({ children, className, eventData, ...rest }) => {
  const [token] = useState(
    `${eventData.token.slice(0, 5)}...${eventData.token.slice(39)}`
  );
  const [receiver] = useState(
    `${eventData.receiver.slice(0, 5)}...${eventData.receiver.slice(39)}`
  );

  const message = () => {
    switch (eventData.type) {
      case "initiated":
        return (
          <>
            <span className="text-diamond-700 mr-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 -rotate-[20deg]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </span>
            <p className="text-xs leading-5">
              <Badge>{`NFT #${eventData.tokenId} of ${token}`}</Badge> sent a
              highfive to <Badge className="bg-lime-400">{receiver}</Badge>
            </p>
          </>
        );
        break;
      case "received":
        return (
          <>
            <span className="text-lime-600 mr-5">
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
                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                />
              </svg>
            </span>
            <p className="text-xs leading-5">
              <Badge className="bg-lime-400">{receiver}</Badge> accepted a
              highfive from{" "}
              <Badge>{`NFT #${eventData.tokenId} of ${token}`}</Badge>
            </p>
          </>
        );
        break;
      case "rejected":
        return (
          <>
            <span className="text-red-400 mr-5">
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
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            <p className="text-xs leading-5 ">
              <Badge className="bg-lime-400">{receiver}</Badge> rejected a
              highfive from{" "}
              <Badge>{`NFT #${eventData.tokenId} of ${token}`}</Badge>
            </p>
          </>
        );
        break;
      default:
        return <p className="text-xs">An interaction occurred</p>;
    }
  };

  return (
    <div
      className={`bg-white mt-5 p-5 min-w-full rounded flex items-center max-w-[30%] ${className}`}
    >
      {message()}
    </div>
  );
};
