import React from "react";

export const Button = ({
  children,
  className,
  loading,
  secondary,
  ...rest
}) => {
  return (
    <button
      className={`relative text-white text-xs sm:text-sm font-semi py-1 px-4 rounded box-border ${
        secondary
          ? `border-diamond-900 border-solid border-[2px] bg-diamond hover:bg-diamond-200 active:bg-diamond-300 text-diamond-900 ${className}`
          : `bg-diamond-800 hover:bg-diamond-700 active:bg-diamond-600 ${className}`
      }`}
      {...rest}
    >
      {loading ? (
        <>
          <div class="loading"></div>
          <span className="p-6" />
        </>
      ) : (
        children
      )}
    </button>
  );
};
