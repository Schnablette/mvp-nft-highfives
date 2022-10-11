import React from "react";

import { Button } from "./Button";

export const Nav = () => {
  return (
    <div className="flex justify-between items-center">
      <a className="text-diamond-900 hover:text-diamond-700 font-semi" href="/">
        FrenFive
      </a>
      <Button>Connect Wallet</Button>
    </div>
  );
};
