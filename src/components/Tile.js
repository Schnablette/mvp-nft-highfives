import React from "react";

export const Tile = ({ children, className, ...rest }) => {
  return (
    <div className={`bg-white mt-5 p-5 min-w-full rounded flex items-center max-w-[30%] ${className}`}>
        <div className="rounded-full w-5 h-5 bg-green-500" />
        <p className="text-xs ml-2">Name here</p>
    </div>
  );
};
