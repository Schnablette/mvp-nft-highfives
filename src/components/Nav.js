import React from "react";
import { ethers } from "ethers";

import { Button } from "./Button";

export const Nav = ({ loading, signer }) => {
  return (
    <div className="flex justify-between items-center">
      <a className="text-diamond-900 hover:text-diamond-700 font-semi" href="/">
        FrenFive
      </a>
      <div className="border border-diamond-800 rounded-full px-2 text-[10px] ">
        <span>{(!signer || loading) && "Not"} Connected</span>
      </div>
    </div>
  );
};
