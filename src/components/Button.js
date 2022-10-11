import React from "react";

export const Button = ({ children, className, secondary, ...rest }) => {
  return (
    <button
      className={` text-white text-xs sm:text-sm font-semi py-1 px-4 rounded ${
        secondary
          ? `border-diamond-900 border-solid border-[2px] bg-diamond hover:bg-diamond-200 active:bg-diamond-300 text-diamond-900 ${className}`
          : `bg-diamond-900 hover:bg-diamond-700 active:bg-diamond-600 ${className}`
      }`}
      {...rest}
    >
      {children}
    </button>
  );
};
