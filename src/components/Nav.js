import React from "react";
import { ethers } from "ethers";

import { Badge } from "./Badge";
import { Button } from "./Button";

export const Nav = ({ loading, signer }) => {
  return (
    <div className="flex justify-between items-center">
      <a className="text-diamond-900 hover:text-diamond-700 font-semi" href="/">
        FrenFive
      </a>
      <Badge className='bg-diamond-200'>{(!signer || loading) && "Not"} Connected</Badge>
    </div>
  );
};
