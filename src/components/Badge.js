import React from "react";

export const Badge = ({ children, className }) => {
  return (
    <span className={`bg-yellow-400 px-2 py-[2px] border border-diamond-800 rounded text-[10px] ${className}`}>
      {children}
    </span>
  );
};
