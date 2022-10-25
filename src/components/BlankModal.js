import React from "react";

export const BlankModal = ({ children, setModalOpen }) => {
  return (
    <>
      <div
        className="absolute cursor-pointer top-0 left-0 right-0 min-w-screen min-h-screen bg-diamond-800 opacity-70 mx-auto z-40"
        type="button"
        onClick={() => setModalOpen(false)}
      ></div>
      <div className="absolute top-[50%] left-0 right-0 translate-y-[-50%] bg-white mt-5 p-5 rounded w-[80%] mx-auto shadow-md z-40">
        {children}
      </div>
    </>
  );
};
